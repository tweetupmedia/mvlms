'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getProduct } from '@/lib/products'
import { getStripe } from '@/lib/stripe'

export async function startSubscriptionCheckout(productId: string) {
  const product = getProduct(productId)
  if (!product) throw new Error('Invalid subscription plan')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const requestHeaders = await headers()
  const origin = requestHeaders.get('origin') ?? 'http://localhost:3000'
  const session = await getStripe().checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price_data: { currency: 'aed', product_data: { name: product.name, description: product.description }, unit_amount: product.priceInCents, recurring: { interval: product.interval } }, quantity: 1 }],
    customer_email: user.email,
    success_url: `${origin}/dashboard/parent?billing=success`,
    cancel_url: `${origin}/dashboard/parent?billing=cancelled`,
    metadata: { parent_id: user.id, subscription_tier: product.id },
    subscription_data: { metadata: { parent_id: user.id, subscription_tier: product.id } },
  })

  if (!session.url) throw new Error('Unable to create checkout session')
  redirect(session.url)
}
