'use client'

import { useState, useTransition } from 'react'
import { ArrowLeft, ChevronRight, Sparkles, Timer, Trophy } from 'lucide-react'
import { submitSessionResult, type PracticeProfile, type PracticeTopic } from '@/actions/progress'
import SmartHintBox from '@/components/practice/smart-hint-box'
import MathScratchpad from '@/components/practice/math-scratchpad'

const questions = [
  { prompt: 'What is 7 × 8?', answer: '56', options: ['48', '54', '56', '64'], hints: ['What multiplication fact uses seven groups?', 'Break 7 × 8 into 5 × 8 and 2 × 8.', '5 × 8 is 40. What is 2 × 8?'] },
  { prompt: 'What is 125 + 75?', answer: '200', options: ['180', '190', '200', '210'], hints: ['Can you combine the hundreds before the tens?', '125 is 100 + 25, and 75 completes the next hundred.', '25 + 75 makes a full hundred.'] },
  { prompt: 'Half of 86 is…', answer: '43', options: ['36', '42', '43', '46'], hints: ['What does half mean?', 'Split 86 into 80 and 6.', 'Half of 80 is 40 and half of 6 is 3.'] },
  { prompt: 'Which fraction is largest?', answer: '3/4', options: ['1/2', '2/3', '3/4', '1/4'], hints: ['Compare each fraction to one whole.', 'Give the fractions a common denominator.', 'Three quarters is larger than two thirds.'] },
  { prompt: 'What is 9 × 6?', answer: '54', options: ['45', '50', '54', '63'], hints: ['Count nine groups of six.', 'Use 10 × 6, then subtract one group of six.', '60 − 6 gives the answer.'] },
]

export function PracticeSession({ profile, topic }: { profile: PracticeProfile; topic: PracticeTopic }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [startedAt] = useState(() => Date.now())
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const question = questions[index]
  const finished = index >= questions.length

  const choose = (option: string) => {
    if (selected) return
    setSelected(option)
    if (option === question.answer) setScore((value) => value + 1)
  }

  const next = () => {
    if (!selected || isPending) return
    if (index === questions.length - 1) {
      startTransition(async () => {
        await submitSessionResult({ childId: profile?.id ?? '', topicId: topic?.id, questionsAnswered: questions.length, correctAnswers: score + (selected === question.answer ? 1 : 0), durationSeconds: Math.max(1, Math.round((Date.now() - startedAt) / 1000)) })
        setSaved(true)
        setIndex(questions.length)
      })
      return
    }
    setIndex((value) => value + 1)
    setSelected(null)
  }

  if (finished) return <div className="mx-auto max-w-2xl rounded-[28px] bg-white p-8 text-center shadow-[0_18px_50px_rgba(56,45,120,.1)]"><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#fff0dc] text-[#e99c37]"><Trophy size={30} /></div><p className="mt-5 text-xs font-extrabold uppercase tracking-[.18em] text-[#9997aa]">Sprint complete</p><h1 className="mt-2 text-3xl font-extrabold tracking-[-.04em]">Great work, {profile?.display_name ?? 'learner'}.</h1><p className="mt-3 text-[#77758a]">You got <strong className="text-[#6257e9]">{score} out of {questions.length}</strong> correct and earned {score * 4 + 4} gems.</p><a href="/dashboard/student" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#6257e9] px-5 py-3 text-sm font-extrabold text-white">Back to dashboard <ChevronRight size={16} /></a>{saved && <p className="mt-4 text-xs font-bold text-[#5caf82]">Progress saved to your profile.</p>}</div>

  return <div className="mx-auto max-w-3xl"><div className="mb-6 flex items-center justify-between"><a href="/dashboard/student" className="inline-flex items-center gap-2 text-sm font-bold text-[#77758a]"><ArrowLeft size={16} /> Exit sprint</a><div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-[#6257e9] shadow-sm"><Timer size={16} /> 60-second sprint</div></div><div className="mb-6 h-2 overflow-hidden rounded-full bg-white/70"><div className="h-full rounded-full bg-[#6257e9] transition-all" style={{ width: `${(index / questions.length) * 100}%` }} /></div><div className="rounded-[28px] bg-white p-7 shadow-[0_18px_50px_rgba(56,45,120,.1)] sm:p-10"><div className="flex items-center justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#9997aa]">Question {index + 1} of {questions.length}</p><p className="mt-2 text-sm font-bold text-[#6257e9]">{topic?.name ?? 'Mental Math'}</p></div><div className="flex items-center gap-1 rounded-full bg-[#fff0dc] px-3 py-1.5 text-xs font-extrabold text-[#d68d24]"><Sparkles size={14} /> {score * 4} gems</div></div><h1 className="mt-10 text-center text-3xl font-extrabold tracking-[-.04em] text-[#25233a] sm:text-4xl">{question.prompt}</h1><div className="mt-9 grid gap-3 sm:grid-cols-2">{question.options.map((option, optionIndex) => <button key={option} type="button" onClick={() => choose(option)} className={`rounded-2xl border-2 px-5 py-4 text-left text-base font-extrabold transition ${selected === option ? option === question.answer ? 'border-[#5caf82] bg-[#eefaf2] text-[#32815a]' : 'border-[#ef8a8a] bg-[#fff2f2] text-[#bf5555]' : 'border-[#eceaf3] bg-[#fcfbff] hover:border-[#b8b2f4]'}`}><span className="mr-3 text-[#aaa8b8]">{String.fromCharCode(65 + optionIndex)}</span>{option}</button>)}</div><SmartHintBox hints={question.hints as [string, string, string]} /><MathScratchpad /><div className="mt-7 flex items-center justify-between gap-3"><p className="text-xs font-semibold text-[#9997aa]">{selected ? selected === question.answer ? 'Correct! Nice work.' : 'Good try. Keep learning.' : 'Choose an answer to continue.'}</p><button type="button" disabled={!selected || isPending} onClick={next} className="inline-flex items-center gap-2 rounded-xl bg-[#6257e9] px-5 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-50">{isPending ? 'Saving...' : index === questions.length - 1 ? 'Finish sprint' : 'Next question'} <ChevronRight size={16} /></button></div></div></div>
}

export default PracticeSession
