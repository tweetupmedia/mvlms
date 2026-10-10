'use client'

import Script from 'next/script'
import { useState } from 'react'

declare global {
  interface Window { Cashfree?: (options: { mode: 'sandbox' | 'production' }) => { checkout: (options: { paymentSessionId: string; redirectTarget: '_self' }) => Promise<void> } }
}

export function CashfreeCheckoutButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function startCheckout() {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/cashfree/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'Unable to start checkout.')
      if (!window.Cashfree) throw new Error('Cashfree checkout is still loading. Please try again.')
      await window.Cashfree({ mode: 'sandbox' }).checkout({ paymentSessionId: data.paymentSessionId, redirectTarget: '_self' })
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Unable to start checkout.')
      setLoading(false)
    }
  }

  return <>
    <Script src="https://sdk.cashfree.com/js/v3/cashfree.js" strategy="afterInteractive" />
    <button type="button" onClick={startCheckout} disabled={loading} className="rounded-xl border border-[#6257e9] px-4 py-2.5 text-xs font-extrabold text-[#6257e9] transition hover:bg-[#eeedff] disabled:cursor-wait disabled:opacity-60">
      {loading ? 'Opening checkout…' : 'Pay with Cashfree'}
    </button>
    {error ? <p role="alert" className="mt-2 text-xs font-semibold text-red-600">{error}</p> : null}
  </>
}
