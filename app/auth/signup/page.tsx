'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { getPortalConfig } from '@/lib/portal'

export default function SignupPage() {
  const portal = getPortalConfig()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setMessage(''); setLoading(true)
    const supabase = createClient()
    const { error: signupError } = await supabase.auth.signUp({ email, password, options: { data: { role: portal.role } } })
    if (signupError) setError(signupError.message)
    else setMessage('Check your email to confirm your account, then sign in.')
    setLoading(false)
  }

  return <main className="grid min-h-screen place-items-center bg-[#f8f8fc] px-5 text-[#17172b]"><div className="w-full max-w-md rounded-[28px] border border-[#e9e7f1] bg-white p-8 shadow-[0_18px_50px_rgba(46,40,110,.08)]"><Link href="/" className="mb-8 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#6257e9] text-white"><Sparkles size={20} fill="currentColor" /></span><span className="text-xl font-extrabold tracking-[-.04em]">Maths<span className="text-[#6257e9]">Vertex</span></span></Link><h1 className="text-3xl font-extrabold tracking-[-.04em]">Create your {portal.label.toLowerCase()} account</h1><p className="mt-2 text-sm text-[#858399]">Start a more confident maths journey today.</p><form onSubmit={handleSubmit} className="mt-7 space-y-4"><label className="block text-sm font-bold">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-[#e5e3ef] px-4 py-3 text-sm outline-none focus:border-[#6257e9] focus:ring-4 focus:ring-[#6257e9]/10" placeholder="you@example.com" /></label><label className="block text-sm font-bold">Password<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-[#e5e3ef] px-4 py-3 text-sm outline-none focus:border-[#6257e9] focus:ring-4 focus:ring-[#6257e9]/10" placeholder="At least 8 characters" /></label>{error && <p role="alert" className="text-sm font-semibold text-[#d45d67]">{error}</p>}{message && <p role="status" className="rounded-xl bg-[#e7f7ef] p-3 text-sm font-semibold text-[#3c976a]">{message}</p>}<button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6257e9] py-3.5 text-sm font-extrabold text-white disabled:opacity-60">{loading ? 'Creating account…' : 'Create account'} <ArrowRight size={17} /></button></form><p className="mt-6 text-center text-sm text-[#858399]">Already have an account? <Link href="/auth/login" className="font-extrabold text-[#6257e9]">Log in</Link></p></div></main>
}
