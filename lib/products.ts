export type SubscriptionTier = 'free' | 'family' | 'plus'

export interface Product {
  id: SubscriptionTier
  name: string
  description: string
  priceInCents: number
  interval: 'month'
  seats: number
}

export const PRODUCTS: Product[] = [
  {
    id: 'family',
    name: 'Family plan',
    description: 'Practice for up to 2 children with weekly parent reports.',
    priceInCents: 4900,
    interval: 'month',
    seats: 2,
  },
  {
    id: 'plus',
    name: 'Family Plus',
    description: 'Practice for up to 4 children with live class access.',
    priceInCents: 7900,
    interval: 'month',
    seats: 4,
  },
]

export function getProduct(productId: string) {
  return PRODUCTS.find((product) => product.id === productId)
}

export function formatPrice(priceInCents: number) {
  return new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(priceInCents / 100)
}
