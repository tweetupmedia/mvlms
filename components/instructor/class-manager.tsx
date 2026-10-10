'use client'

import { useState } from 'react'
import { CalendarDays, Check, Copy, ExternalLink, Play, Plus, Video, X } from 'lucide-react'

const starterClasses = [
  { title: 'Mental Math Masters', chapter: 'Chapter 3 · Multiplication', time: 'Today · 4:00 PM', learners: 24, link: 'https://meet.google.com/math-masters' },
  { title: 'Geometry Lab', chapter: 'Chapter 6 · Shapes', time: 'Tomorrow · 3:30 PM', learners: 18, link: 'https://zoom.us/j/math-geometry' },
]

export function ClassManager() {
  const [classes, setClasses] = useState(starterClasses)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [chapter, setChapter] = useState('')
  const [link, setLink] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  function addClass() {
    if (!title.trim() || !chapter.trim() || !link.trim()) return
    setClasses((current) => [...current, { title: title.trim(), chapter: chapter.trim(), time: 'New · Schedule pending', learners: 0, link: link.trim() }])
    setTitle(''); setChapter(''); setLink(''); setShowForm(false)
  }

  async function copyLink(value: string) {
    await navigator.clipboard?.writeText(value)
    setCopied(value)
    window.setTimeout(() => setCopied(null), 1600)
  }

  return <div className="rounded-[22px] border border-[#e9e7f1] bg-white p-6" id="classes">
    <div className="mb-5 flex items-start justify-between gap-4"><div><h2 className="text-lg font-extrabold">Live classroom manager</h2><p className="mt-1 text-xs text-[#9997aa]">Launch a room or share a lesson link with your learners.</p></div><button onClick={() => setShowForm((value) => !value)} className="inline-flex items-center gap-2 rounded-xl bg-[#6257e9] px-3 py-2 text-xs font-extrabold text-white"><Plus size={15} /> Schedule</button></div>
    {showForm && <div className="mb-5 rounded-2xl bg-[#f8f7ff] p-4"><div className="mb-3 flex items-center justify-between"><p className="text-sm font-extrabold">New live class</p><button onClick={() => setShowForm(false)} aria-label="Close class form"><X size={16} /></button></div><div className="grid gap-3 sm:grid-cols-3"><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Class title" className="rounded-xl border border-[#e5e3ef] bg-white px-3 py-2 text-sm outline-none focus:border-[#6257e9]" /><input value={chapter} onChange={(event) => setChapter(event.target.value)} placeholder="Chapter or topic" className="rounded-xl border border-[#e5e3ef] bg-white px-3 py-2 text-sm outline-none focus:border-[#6257e9]" /><input value={link} onChange={(event) => setLink(event.target.value)} placeholder="Video room URL" type="url" className="rounded-xl border border-[#e5e3ef] bg-white px-3 py-2 text-sm outline-none focus:border-[#6257e9]" /></div><button onClick={addClass} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#1d1d38] px-4 py-2 text-xs font-extrabold text-white"><Check size={14} /> Add class</button></div>}
    <div className="space-y-3">{classes.map((item) => <div key={`${item.title}-${item.link}`} className="rounded-2xl border border-[#f0eff5] p-4"><div className="flex items-start gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#eeedff] text-[#6257e9]"><Video size={18} /></div><div className="min-w-0 flex-1"><p className="text-sm font-extrabold">{item.title}</p><p className="mt-1 text-xs font-semibold text-[#9997aa]">{item.chapter} · {item.time}</p><p className="mt-1 text-xs text-[#aaa8b8]">{item.learners} learners enrolled</p></div><button onClick={() => copyLink(item.link)} className="rounded-lg p-2 text-[#8d8ba2] hover:bg-[#f4f3fb]" aria-label={`Copy ${item.title} link`}>{copied === item.link ? <Check size={16} className="text-[#4da477]" /> : <Copy size={16} />}</button></div><div className="mt-3 flex gap-2"><a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[#6257e9] px-3 py-2 text-xs font-extrabold text-white"><Play size={13} fill="currentColor" /> Launch room</a><a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-[#e8e6f0] px-3 py-2 text-xs font-extrabold text-[#6257e9]"><ExternalLink size={13} /> Open link</a></div></div>)}</div><div className="mt-5 flex items-center gap-2 rounded-xl bg-[#fff8e9] p-3 text-xs font-semibold text-[#9b7942]"><CalendarDays size={16} className="shrink-0" /> Add the meeting link from Zoom, Meet, or your WebRTC room.</div>
  </div>
}
