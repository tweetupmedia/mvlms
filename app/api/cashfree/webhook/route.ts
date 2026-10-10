import { NextResponse } from 'next/server'
import { createHmac } from 'node:crypto'
import { createAdminClient } from '@/lib/supabase/admin'

function verifySignature(rawBody: string, timestamp: string, signature: string, secret: string) {
  const expected = createHmac('sha256', secret).update(`${timestamp}${rawBody}`).digest('base64')
  if (expected.length !== signature.length) return false
  let difference = 0
  for (let index = 0; index < expected.length; index += 1) difference |= expected.charCodeAt(index) ^ signature.charCodeAt(index)
  return difference === 0
}

export async function POST(request: Request) {
  const rawBody = await request.text()
  const signature = request.headers.get('x-webhook-signature')
  const timestamp = request.headers.get('x-webhook-timestamp')
  const secret = process.env.CASHFREE_SECRET_KEY
  if (!signature || !timestamp || !secret || !verifySignature(rawBody, timestamp, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const payload = JSON.parse(rawBody) as {
    type?: string
    data?: { order?: { order_id?: string }; payment?: { payment_status?: string } }
  }
  const orderId = payload.data?.order?.order_id
  if (!orderId) return NextResponse.json({ received: true })

  const status = payload.data?.payment?.payment_status
  const normalizedStatus = status === 'SUCCESS' ? 'paid' : status === 'FAILED' ? 'failed' : undefined
  if (!normalizedStatus) return NextResponse.json({ received: true })

  const admin = createAdminClient()
  const { error } = await admin
    .from('payment_transactions')
    .update({ status: normalizedStatus, updated_at: new Date().toISOString() })
    .eq('provider', 'cashfree')
    .eq('provider_order_id', orderId)

  if (error) return NextResponse.json({ error: 'Unable to reconcile payment' }, { status: 500 })
  return NextResponse.json({ received: true })
}
