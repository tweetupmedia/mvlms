"use client"

import { useState } from 'react'

export type ChildOption = { id: string; display_name: string; grade_level: string | null }

export function ChildSwitcher({ children }: { children: ChildOption[] }) {
  const [selected, setSelected] = useState(children[0]?.id ?? '')
  if (children.length < 2) return null
  return <div className="mb-6 flex flex-wrap gap-2" aria-label="Switch child">
    {children.map((child) => <button key={child.id} type="button" onClick={() => setSelected(child.id)} aria-pressed={selected === child.id} className={`rounded-full px-4 py-2 text-xs font-extrabold transition ${selected === child.id ? 'bg-[#6257e9] text-white' : 'border border-[#eceaf5] bg-white text-[#858399]'}`}>{child.display_name} · Grade {child.grade_level ?? '—'}</button>)}
  </div>
}

export function SeatSummary({ children, seats }: { children: ChildOption[]; seats: number }) {
  return <div className="mb-6 flex items-center justify-between rounded-2xl border border-[#eceaf5] bg-[#faf9ff] px-5 py-4"><div><p className="text-sm font-extrabold text-[#17172b]">Family seats</p><p className="mt-1 text-xs text-[#858399]">{children.length} of {seats} learner seats used</p></div><div className="h-2 w-28 overflow-hidden rounded-full bg-[#e8e6f4]"><div className="h-full rounded-full bg-[#6257e9]" style={{ width: `${Math.min(100, children.length / seats * 100)}%` }} /></div></div>
}

export default ChildSwitcher
