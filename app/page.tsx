'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Brain,
  ChevronDown,
  Flame,
  Gem,
  Home as HomeIcon,
  Lightbulb,
  Medal,
  Menu,
  Mic,
  MicOff,
  Pencil,
  Play,
  Sparkles,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react'

const lessons = [
  { title: 'Mental Math', detail: 'Build your speed', icon: Brain, tone: 'violet', progress: 72 },
  { title: 'Vedic Shortcuts', detail: 'Learn the magic', icon: Sparkles, tone: 'orange', progress: 48 },
  { title: 'Olympiad Prep', detail: 'Think like a champion', icon: Trophy, tone: 'blue', progress: 34 },
]

const activity = [
  ['Number Bonds', 'Completed', '2 min ago', 'green'],
  ['Multiplication Sprint', '18 / 20 correct', 'Yesterday', 'orange'],
  ['Shape Detective', 'New badge earned', 'Mon, 12 Jun', 'violet'],
]

export default function Home() {
  const [active, setActive] = useState('Home')
  const [showMenu, setShowMenu] = useState(false)
  const [showScratchpad, setShowScratchpad] = useState(false)
  const [theme, setTheme] = useState('Explorer')
  const [sprintStarted, setSprintStarted] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [heardText, setHeardText] = useState('')

  const toggleListening = () => {
    const speechWindow = window as typeof window & {
      SpeechRecognition?: new () => any
      webkitSpeechRecognition?: new () => any
    }
    const SpeechRecognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setHeardText('Voice listening is not supported in this browser.')
      return
    }

    if (isListening) {
      setIsListening(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => {
      setIsListening(false)
      setHeardText('I could not hear that. Please try again.')
    }
    recognition.onresult = (event: any) => {
      setHeardText(event.results[0][0].transcript)
      setIsListening(false)
    }
    recognition.start()
  }

  return (
    <main className="min-h-screen bg-[#f8f8fc] text-[#17172b]">
      <header className="sticky top-0 z-20 border-b border-[#e9e8f2] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <button className="rounded-xl p-2 text-[#6b6b84] lg:hidden" onClick={() => setShowMenu(!showMenu)} aria-label="Open menu">
              {showMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#6257e9] text-white shadow-[0_5px_12px_rgba(98,87,233,.25)]"><Sparkles size={21} fill="currentColor" /></div>
              <span className="text-[21px] font-extrabold tracking-[-.04em]">Maths<span className="text-[#6257e9]">Vertex</span></span>
            </div>
          </div>
          <div className="hidden items-center gap-7 text-[14px] font-semibold text-[#838298] lg:flex">
            {['Home', 'Learn', 'Practice', 'Compete'].map((item) => <button key={item} onClick={() => setActive(item)} className={`relative py-7 transition-colors ${active === item ? 'text-[#6257e9]' : 'hover:text-[#35344e]'}`}>{item}{active === item && <span className="absolute bottom-0 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-[#6257e9]" />}</button>)}
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden items-center gap-1.5 rounded-full bg-[#fff4d8] px-3 py-2 text-[13px] font-bold text-[#b87900] sm:flex"><Gem size={16} fill="currentColor" /> 240</div>
            <div className="flex items-center gap-1.5 rounded-full bg-[#fff0ef] px-3 py-2 text-[13px] font-bold text-[#ed6962]"><Flame size={16} fill="currentColor" /> 7 days</div>
            <button onClick={toggleListening} className={`grid h-10 w-10 place-items-center rounded-full transition ${isListening ? 'bg-[#ffe5e5] text-[#e35d66] animate-pulse' : 'bg-[#eeedff] text-[#6257e9] hover:bg-[#e3e1ff]'}`} aria-label={isListening ? 'Stop listening' : 'Start listening'} title={isListening ? 'Stop listening' : 'Start listening'}>{isListening ? <MicOff size={18} /> : <Mic size={18} />}</button>
            <button className="grid h-10 w-10 place-items-center rounded-full bg-[#dce5ff] text-[16px] font-extrabold text-[#536dc6]" aria-label="Profile">A</button>
          </div>
        </div>
        {showMenu && <nav className="border-t border-[#ecebf4] bg-white px-7 py-4 lg:hidden">{['Home', 'Learn', 'Practice', 'Compete'].map((item) => <button key={item} onClick={() => { setActive(item); setShowMenu(false) }} className="block w-full py-3 text-left font-semibold text-[#65647a]">{item}</button>)}</nav>}
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        <aside className="hidden w-[228px] shrink-0 border-r border-[#e9e8f2] bg-white px-5 py-8 lg:block">
          <div className="mb-10 flex items-center gap-3 rounded-2xl bg-[#f2f1ff] p-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#ffcb73] text-lg">A</div><div><p className="text-sm font-extrabold">Aarav</p><p className="text-xs font-medium text-[#8d8ba2]">Grade 4 explorer</p></div><ChevronDown className="ml-auto text-[#9997ae]" size={16} /></div>
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#aaa9bb]">Workspace</p>
          <div className="space-y-1">{[[HomeIcon, 'Home'], [BookOpen, 'My learning'], [Zap, 'Speed sprints'], [Users, 'Live arena']].map(([Icon, label]) => <button key={label as string} onClick={() => setActive(label as string)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${active === label ? 'bg-[#6257e9] text-white shadow-[0_6px_16px_rgba(98,87,233,.2)]' : 'text-[#79778e] hover:bg-[#f5f4fb]'}`}><Icon size={18} />{label as string}</button>)}</div>
          <div className="mt-14 rounded-2xl bg-[#fff4df] p-4"><div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#ffce7d] text-[#a46c10]"><Lightbulb size={18} fill="currentColor" /></div><p className="text-sm font-extrabold">Keep exploring!</p><p className="mt-1 text-xs leading-5 text-[#9b7942]">Complete one lesson to keep your streak alive.</p><button className="mt-3 text-xs font-extrabold text-[#bd7810]">View your goals <ArrowRight className="ml-1 inline" size={13} /></button></div>
        </aside>

        <section className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 text-sm font-bold text-[#8e8ca1]">Wednesday, 14 June 2024</p><h1 className="text-[32px] font-extrabold tracking-[-.045em] sm:text-[40px]">Ready to learn, <span className="text-[#6257e9]">Aarav?</span></h1><p className="mt-2 text-[15px] text-[#858399]">Your next adventure is waiting for you.</p></div><div className="flex items-center gap-2"><span className="text-xs font-bold text-[#9a98ad]">Learning style</span><select value={theme} onChange={(e) => setTheme(e.target.value)} className="rounded-xl border border-[#e5e3ef] bg-white px-3 py-2 text-xs font-bold text-[#6257e9] outline-none"><option>Explorer</option><option>Arcader</option><option>Tactician</option></select></div></div>

          <div className="mb-8 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
            <div className="relative overflow-hidden rounded-[25px] bg-[#6257e9] p-7 text-white shadow-[0_12px_30px_rgba(98,87,233,.18)] sm:p-9"><div className="relative z-10 max-w-[430px]"><div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold"><Zap size={14} fill="currentColor" /> Today&apos;s mission</div><h2 className="text-[27px] font-extrabold leading-tight tracking-[-.035em] sm:text-[32px]">Master your mental<br className="hidden sm:block" /> math speed</h2><p className="mt-3 max-w-[340px] text-sm leading-6 text-indigo-100">A quick 10-minute practice to sharpen your skills and earn 20 gems.</p><button onClick={() => setSprintStarted(true)} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[#6257e9] transition hover:bg-indigo-50">{sprintStarted ? 'Sprint started' : 'Start practice'} <ArrowRight size={17} /></button></div><div className="absolute -right-6 -bottom-16 h-56 w-56 rounded-full border-[28px] border-white/10" /><div className="absolute right-12 top-12 h-16 w-16 rounded-2xl border-2 border-white/20 rotate-12" /><div className="absolute right-20 bottom-10 text-8xl font-black text-white/10">+</div></div>
            <div className="rounded-[25px] border border-[#e9e7f1] bg-white p-7"><div className="flex items-center justify-between"><div><p className="text-sm font-extrabold">Your progress</p><p className="mt-1 text-xs text-[#9391a4]">This week&apos;s learning goal</p></div><div className="grid h-11 w-11 place-items-center rounded-full bg-[#eeedff] text-[#6257e9]"><Trophy size={21} /></div></div><div className="mt-8 flex items-end gap-3"><span className="text-4xl font-extrabold tracking-tight">68%</span><span className="mb-1 text-xs font-bold text-[#5caf82]">+12% this week</span></div><div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#efeff6]"><div className="h-full w-[68%] rounded-full bg-[#6257e9]" /></div><div className="mt-4 flex justify-between text-xs font-semibold text-[#aaa8b8]"><span>5 days active</span><span>Goal: 7 days</span></div></div>
          </div>

          <div className="mb-10 flex items-end justify-between"><div><h2 className="text-xl font-extrabold tracking-[-.02em]">Pick your path</h2><p className="mt-1 text-sm text-[#9290a4]">Small steps make big breakthroughs.</p></div><button className="hidden items-center gap-1 text-sm font-extrabold text-[#6257e9] sm:flex">View all <ArrowRight size={16} /></button></div>
          <div className="mb-11 grid gap-5 md:grid-cols-3">{lessons.map(({ title, detail, icon: Icon, tone, progress }) => <button key={title} className="group rounded-[22px] border border-[#e9e7f1] bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-lg"><div className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl ${tone === 'violet' ? 'bg-[#eeedff] text-[#6257e9]' : tone === 'orange' ? 'bg-[#fff0dc] text-[#e99c37]' : 'bg-[#e9f1ff] text-[#5c86e6]'}`}><Icon size={23} /></div><p className="text-[16px] font-extrabold">{title}</p><p className="mt-1 text-sm text-[#9694a7]">{detail}</p><div className="mt-6 flex items-center justify-between text-[11px] font-bold text-[#aaa8b8]"><span>{progress}% complete</span><span className="text-[#6257e9] opacity-0 transition group-hover:opacity-100">Continue <ArrowRight className="ml-1 inline" size={13} /></span></div><div className="mt-2 h-1.5 rounded-full bg-[#f0eff6]"><div className={`h-full rounded-full ${tone === 'violet' ? 'bg-[#6257e9]' : tone === 'orange' ? 'bg-[#f1aa4d]' : 'bg-[#6390ee]'}`} style={{ width: `${progress}%` }} /></div></button>)}</div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]"><div className="rounded-[22px] border border-[#e9e7f1] bg-white p-6"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-lg font-extrabold">Recent activity</h2><p className="mt-1 text-xs text-[#9997aa]">Your learning journey so far</p></div><button className="text-xs font-extrabold text-[#6257e9]">See all</button></div>{activity.map(([name, result, date, tone]) => <div key={name} className="flex items-center gap-3 border-t border-[#f0eff5] py-4"><div className={`grid h-9 w-9 place-items-center rounded-xl ${tone === 'green' ? 'bg-[#e7f7ef] text-[#4da477]' : tone === 'orange' ? 'bg-[#fff0dc] text-[#e7a043]' : 'bg-[#eeedff] text-[#6257e9]'}`}><Medal size={17} /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{name}</p><p className="mt-0.5 text-xs text-[#9997aa]">{result}</p></div><span className="text-[11px] font-semibold text-[#aaa8b8]">{date}</span></div>)}</div><div className="rounded-[22px] bg-[#1d1d38] p-6 text-white"><div className="flex items-center justify-between"><div><p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#9e9cc3]">Speed arena</p><h2 className="mt-2 text-xl font-extrabold">Ready, set, solve!</h2></div><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#37375a] text-[#f8c766]"><Zap size={21} fill="currentColor" /></div></div><p className="mt-4 text-sm leading-6 text-[#b8b7d0]">Challenge yourself with a 60-second sprint and beat your high score.</p><button onClick={() => setSprintStarted(true)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f6c766] py-3 text-sm font-extrabold text-[#27243e] hover:bg-[#ffd77e]"><Play size={16} fill="currentColor" /> {sprintStarted ? 'Sprint in progress' : 'Enter the arena'}</button></div></div>
        </section>
      </div>

      {heardText && <div role="status" className="fixed bottom-20 left-1/2 z-30 max-w-[min(90vw,420px)] -translate-x-1/2 rounded-full border border-[#e5e3ef] bg-white px-5 py-3 text-center text-sm font-semibold text-[#6257e9] shadow-xl">“{heardText}”</div>}
      <button onClick={() => setShowScratchpad(!showScratchpad)} className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-[#6257e9] px-4 py-3 text-sm font-extrabold text-white shadow-[0_8px_24px_rgba(98,87,233,.3)] transition hover:scale-105"><Pencil size={17} /> Scratchpad</button>
      {showScratchpad && <div className="fixed bottom-20 right-5 z-30 w-[min(350px,calc(100vw-40px))] rounded-2xl border border-[#e5e3ef] bg-white p-4 shadow-2xl"><div className="mb-3 flex items-center justify-between"><p className="font-extrabold">Your scratchpad</p><button onClick={() => setShowScratchpad(false)} aria-label="Close scratchpad"><X size={18} className="text-[#9997aa]" /></button></div><div className="grid h-44 place-items-center rounded-xl border-2 border-dashed border-[#dcd9f2] bg-[#fcfbff] text-center text-xs font-semibold text-[#aaa8b8]"><Pencil size={22} className="mb-2 text-[#6257e9]" /><span>Draw your working here</span></div></div>}
    </main>
  )
}
