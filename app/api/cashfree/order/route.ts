import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getProduct } from '@/lib/products'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Please sign in to continue.' }, { status: 401 })

  const body = await request.json().catch(() => null)
  const product = getProduct(typeof body?.productId === 'string' ? body.productId : '')
  if (!product) return NextResponse.json({ error: 'Invalid plan.' }, { status: 400 })

  const clientId = process.env.CASHFREE_APP_ID
  const clientSecret = process.env.CASHFREE_SECRET_KEY
  if (!clientId || !clientSecret) return NextResponse.json({ error: 'Cashfree is not configured.' }, { status: 503 })

  const origin = request.headers.get('origin') ?? new URL(request.url).origin
  const orderId = `mv_${user.id.slice(0, 8)}_${Date.now()}`
  const response = await fetch('https://sandbox.cashfree.com/pg/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-version': '2026-01-01',
      'x-client-id': clientId,
      'x-client-secret': clientSecret,
    },
    body: JSON.stringify({
      order_id: orderId,
      order_amount: product.priceInCents / 100,
      order_currency: 'INR',
      customer_details: {
        customer_id: user.id,
        customer_email: user.email,
        customer_phone: '9999999999',
      },
      order_meta: { return_url: `${origin}/dashboard/parent?cashfree_order_id={order_id}` },
      order_note: `${product.name} subscription`,
    }),
  })

  if (!response.ok) return NextResponse.json({ error: 'Unable to start Cashfree checkout.' }, { status: 502 })
  const order = await response.json()
  return NextResponse.json({ paymentSessionId: order.payment_session_id })
}
