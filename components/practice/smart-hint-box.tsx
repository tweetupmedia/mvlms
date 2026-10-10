'use client'

import { useState } from 'react'
import { ChevronRight, Lightbulb } from 'lucide-react'

type HintLevels = [string, string, string]

export function SmartHintBox({ hints }: { hints: HintLevels }) {
  const [level, setLevel] = useState(0)
  const hasHint = level > 0
  const isComplete = level === hints.length

  return (
    <section aria-label="Smart hint guide" className="mt-7 rounded-2xl border border-[#f5dcae] bg-[#fffaf0] p-4 text-left">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#b8791d]"><Lightbulb size={16} /> Socratic mentor</div>
        {!isComplete && <button type="button" onClick={() => setLevel((current) => Math.min(hints.length, current + 1))} className="inline-flex items-center gap-1 rounded-full bg-[#e99c37] px-3 py-1.5 text-xs font-extrabold text-white transition hover:bg-[#d68d24]">{hasHint ? 'Still stuck?' : 'Need a hint?'} <ChevronRight size={14} /></button>}
      </div>
      {hasHint && <p className="mt-3 text-sm leading-6 text-[#8e641e]"><strong>{level === 1 ? 'Level 1 nudge:' : level === 2 ? 'Level 2 clue:' : 'Level 3 breakdown:'}</strong> {hints[level - 1]}</p>}
      {!hasHint && <p className="mt-2 text-xs font-semibold text-[#b8791d]">Hints guide your thinking without revealing the answer.</p>}
      {isComplete && <p className="mt-2 text-xs font-bold text-[#b8791d]">You have uncovered every helpful clue.</p>}
    </section>
  )
}

export default SmartHintBox
