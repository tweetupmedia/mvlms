'use client'

import { FormEvent, Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { getPortalConfig } from '@/lib/portal'

function LoginPageContent() {
  const searchParams = useSearchParams()
  const portal = getPortalConfig()
  const isAdminLogin = searchParams.get('next')?.startsWith('/dashboard/admin')
  const portalLabel = isAdminLogin ? 'Admin' : portal.label
  const portalDashboard = isAdminLogin ? '/dashboard/admin' : portal.dashboard
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      setError(signInError.message.toLowerCase().includes('email not confirmed') ? 'Please confirm your email before signing in.' : 'Invalid email or password.')
      setLoading(false)
      return
    }
    window.location.href = portalDashboard
  }

  return <main className="grid min-h-screen place-items-center bg-[#f8f8fc] px-5 text-[#17172b]"><div className="w-full max-w-md rounded-[28px] border border-[#e9e7f1] bg-white p-8 shadow-[0_18px_50px_rgba(46,40,110,.08)]"><div className="mb-8 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#6257e9] text-white"><Sparkles size={20} fill="currentColor" /></div><span className="text-xl font-extrabold tracking-[-.04em]">Maths<span className="text-[#6257e9]">Vertex</span></span></div><h1 className="text-3xl font-extrabold tracking-[-.04em]">Welcome back, {portalLabel}</h1><p className="mt-2 text-sm text-[#858399]">Sign in to continue your {portalLabel.toLowerCase()} portal.</p><form onSubmit={handleSubmit} className="mt-7 space-y-4"><label className="block text-sm font-bold">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-[#e5e3ef] px-4 py-3 text-sm outline-none transition focus:border-[#6257e9] focus:ring-4 focus:ring-[#6257e9]/10" placeholder="you@example.com" /></label><label className="block text-sm font-bold">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-[#e5e3ef] px-4 py-3 text-sm outline-none transition focus:border-[#6257e9] focus:ring-4 focus:ring-[#6257e9]/10" placeholder="Your password" /></label>{error && <p role="alert" className="text-sm font-semibold text-[#d45d67]">{error}</p>}<button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6257e9] py-3.5 text-sm font-extrabold text-white transition hover:bg-[#5148d6] disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in'} <ArrowRight size={17} /></button></form></div></main>
}

export default function LoginPage() {
  return <Suspense fallback={<main className="grid min-h-screen place-items-center bg-[#f8f8fc] text-[#17172b]"><div className="text-sm font-semibold text-[#858399]">Loading sign in…</div></main>}><LoginPageContent /></Suspense>
}
