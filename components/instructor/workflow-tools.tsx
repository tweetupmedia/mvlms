"use client"

import { useState } from 'react'

export function WorkflowTools() {
  const [announcement, setAnnouncement] = useState('')
  const [sent, setSent] = useState(false)
  return <div className="grid gap-6 md:grid-cols-2"><div className="rounded-[22px] border border-[#eceaf5] bg-white p-6"><p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#6257e9]">Homework dispatch</p><h3 className="mt-2 text-lg font-extrabold text-[#17172b]">Send a class note</h3><textarea value={announcement} onChange={(event) => setAnnouncement(event.target.value)} placeholder="Share a practice focus or reminder..." className="mt-4 min-h-24 w-full resize-y rounded-xl border border-[#eceaf5] p-3 text-sm outline-none focus:border-[#6257e9]" /><button type="button" onClick={() => setSent(Boolean(announcement.trim()))} className="mt-3 rounded-xl bg-[#6257e9] px-4 py-2.5 text-xs font-extrabold text-white">{sent ? 'Queued for class' : 'Queue message'}</button></div><div className="rounded-[22px] border border-[#eceaf5] bg-white p-6"><p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#4da477]">Scheduler</p><h3 className="mt-2 text-lg font-extrabold text-[#17172b]">Next teaching windows</h3><div className="mt-4 space-y-3">{['Today · 4:00 PM · Mental Math','Tomorrow · 3:30 PM · Geometry','Friday · 5:00 PM · Olympiad Prep'].map((item) => <div key={item} className="rounded-xl bg-[#f7f6fb] px-4 py-3 text-sm font-bold text-[#55536b]">{item}</div>)}</div></div></div>
}
