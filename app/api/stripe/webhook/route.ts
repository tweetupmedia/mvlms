import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ error: 'Webhook is not configured' }, { status: 503 })

  const signature = (await headers()).get('stripe-signature')
  if (!signature) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, secret)
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
  }

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { autoRefreshToken: false, persistSession: false } })
  const object = event.data.object as Stripe.Checkout.Session | Stripe.Subscription
  const parentId = 'metadata' in object ? object.metadata?.parent_id : undefined
  const tier = 'metadata' in object ? object.metadata?.subscription_tier : undefined

  if (parentId && ['checkout.session.completed', 'customer.subscription.updated'].includes(event.type)) {
    await supabase.from('parents').update({ subscription_status: 'active', subscription_tier: tier ?? 'family', stripe_customer_id: typeof object.customer === 'string' ? object.customer : null }).eq('id', parentId)
  }

  if (event.type === 'customer.subscription.deleted' && parentId) {
    await supabase.from('parents').update({ subscription_status: 'cancelled', subscription_tier: 'free' }).eq('id', parentId)
  }

  return NextResponse.json({ received: true })
}
