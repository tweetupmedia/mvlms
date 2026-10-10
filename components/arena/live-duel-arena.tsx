'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, Bolt, Clock3, Crown, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LiveDuelArena({ matchId, childId }: { matchId: string; childId: string }) {
  const [myScore, setMyScore] = useState(12)
  const [opponentScore, setOpponentScore] = useState(9)
  const [seconds, setSeconds] = useState(180)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel(`match:${matchId}`)
      .on('broadcast', { event: 'score_update' }, ({ payload }: { payload: { childId?: string; score?: number } }) => {
        if (payload?.childId !== childId && typeof payload?.score === 'number') setOpponentScore(payload.score)
      })
      .subscribe((status: string) => setConnected(status === 'SUBSCRIBED'))

    return () => { void supabase.removeChannel(channel) }
  }, [childId, matchId])

  useEffect(() => {
    if (seconds <= 0) return
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [seconds])

  const answer = async (correct: boolean) => {
    if (seconds <= 0) return
    const nextScore = myScore + (correct ? 3 : 0)
    setMyScore(nextScore)
    const supabase = createClient()
    await supabase.channel(`match:${matchId}`).send({ type: 'broadcast', event: 'score_update', payload: { childId, score: nextScore } })
  }

  const time = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

  return <main className="mx-auto max-w-4xl">
    <div className="mb-6 flex items-center justify-between gap-4"><a href="/dashboard/student" className="inline-flex items-center gap-2 text-sm font-bold text-[#77758a]"><ArrowLeft size={16} /> Exit arena</a><div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-[#6257e9] shadow-sm"><Clock3 size={16} /> {time}</div></div>
    <section className="overflow-hidden rounded-[30px] bg-[#25233a] p-6 text-white shadow-[0_18px_50px_rgba(56,45,120,.18)] sm:p-9">
      <div className="flex items-center justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#aaa7d8]">Global speed arena</p><h1 className="mt-2 text-3xl font-extrabold tracking-[-.04em]">Beat the clock</h1></div><div className="flex items-center gap-2 text-xs font-bold text-[#aaa7d8]"><span className={`h-2 w-2 rounded-full ${connected ? 'bg-[#69d598]' : 'bg-[#efbf68]'}`} />{connected ? 'Live connection' : 'Connecting'}</div></div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-white/10 p-4"><div className="flex items-center gap-2 text-sm font-bold text-[#cfcbf5]"><Crown size={16} /> You</div><p className="mt-2 text-4xl font-black">{myScore}</p></div><div className="rounded-2xl bg-white/10 p-4"><div className="flex items-center gap-2 text-sm font-bold text-[#cfcbf5]"><Users size={16} /> Opponent</div><p className="mt-2 text-4xl font-black">{opponentScore}</p></div></div>
      <div className="mt-7 rounded-3xl bg-white p-6 text-center text-[#25233a]"><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#9997aa]">Quick round</p><h2 className="mt-3 text-3xl font-extrabold">What is 14 × 6?</h2><div className="mt-6 grid grid-cols-2 gap-3"><button type="button" onClick={() => void answer(false)} className="rounded-2xl border-2 border-[#eceaf3] px-4 py-4 text-lg font-extrabold hover:border-[#b8b2f4]">72</button><button type="button" onClick={() => void answer(true)} className="rounded-2xl border-2 border-[#eceaf3] px-4 py-4 text-lg font-extrabold hover:border-[#b8b2f4]">84</button></div></div>
      <div className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-[#cfcbf5]"><Bolt size={16} className="text-[#f2ba58]" /> Every correct answer adds 3 points</div>
    </section>
  </main>
}
