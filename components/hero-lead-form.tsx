'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'

export function HeroLeadForm() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('loading')
    const form = event.currentTarget
    const response = await fetch('/api/free-class-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), lead_type: 'hero' }),
    })
    setState(response.ok ? 'success' : 'error')
    if (response.ok) form.reset()
  }

  if (state === 'success') return <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[24px] bg-[#f1fbf4] p-6 text-center"><div className="grid size-12 place-items-center rounded-full bg-[#d7f3df] text-[#25844a]"><Check /></div><h2 className="mt-5 text-xl font-extrabold text-[#205f39]">You&apos;re on the list.</h2><p className="mt-2 max-w-xs text-sm leading-6 text-[#4d765d]">Our learning team will reach out with the best next step for your learner.</p><button type="button" onClick={() => setState('idle')} className="mt-5 text-sm font-extrabold text-[#6257e9]">Add another learner</button></div>

  return <div className="rounded-[24px] border border-white/10 bg-[#1d1d38] p-5 text-white shadow-[0_26px_70px_rgba(43,37,100,.2)] sm:p-7"><div className="mb-5"><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#b7b0ff]">Find their next breakthrough</p><h2 className="mt-2 text-2xl font-extrabold tracking-[-.04em]">Let&apos;s get to know your learner.</h2><p className="mt-2 text-sm leading-6 text-[#b9b8cb]">Share a few details and we&apos;ll help you find the right starting point.</p></div><form onSubmit={submit} className="grid gap-3 sm:grid-cols-2"><label className="grid gap-1.5 text-xs font-bold text-[#e7e6f4]">Learner name<input required name="learner_name" autoComplete="name" className="rounded-xl border border-white/10 bg-white px-3 py-2.5 text-sm font-normal text-[#17172b] outline-none ring-[#8d85ff] focus:ring-2" placeholder="e.g. Aarav" /></label><label className="grid gap-1.5 text-xs font-bold text-[#e7e6f4]">Grade<select required name="grade" defaultValue="" className="rounded-xl border border-white/10 bg-white px-3 py-2.5 text-sm font-normal text-[#17172b] outline-none ring-[#8d85ff] focus:ring-2"><option value="" disabled>Select grade</option>{Array.from({ length: 8 }, (_, index) => <option key={index + 1} value={index + 1}>Grade {index + 1}</option>)}</select></label><label className="grid gap-1.5 text-xs font-bold text-[#e7e6f4]">Board<select required name="board" defaultValue="" className="rounded-xl border border-white/10 bg-white px-3 py-2.5 text-sm font-normal text-[#17172b] outline-none ring-[#8d85ff] focus:ring-2"><option value="" disabled>Select board</option><option>CBSE</option><option>ICSE</option><option>State board</option><option>Other</option></select></label><label className="grid gap-1.5 text-xs font-bold text-[#e7e6f4]">Email<input required type="email" name="email" autoComplete="email" className="rounded-xl border border-white/10 bg-white px-3 py-2.5 text-sm font-normal text-[#17172b] outline-none ring-[#8d85ff] focus:ring-2" placeholder="you@example.com" /></label><label className="grid gap-1.5 text-xs font-bold text-[#e7e6f4] sm:col-span-2">WhatsApp number<input required type="tel" name="whatsapp_number" autoComplete="tel" inputMode="tel" className="rounded-xl border border-white/10 bg-white px-3 py-2.5 text-sm font-normal text-[#17172b] outline-none ring-[#8d85ff] focus:ring-2" placeholder="+91 98765 43210" /></label><button type="submit" disabled={state === 'loading'} className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#8d85ff] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#776ef5] disabled:cursor-wait disabled:opacity-70 sm:col-span-2">{state === 'loading' ? <><Loader2 className="animate-spin" /> Sending...</> : <>Get started <ArrowRight /></>}</button>{state === 'error' && <p role="alert" className="text-xs font-semibold text-[#ffb4b4] sm:col-span-2">Something went wrong. Please try again.</p>}</form><p className="mt-4 text-center text-[11px] text-[#8e8da5]">We&apos;ll only use these details to help with your learning journey.</p></div>
}
