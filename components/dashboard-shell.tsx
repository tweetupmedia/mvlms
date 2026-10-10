'use client'

import { useState } from 'react'
import { BarChart3, BookOpen, CalendarDays, ChevronDown, GraduationCap, LayoutDashboard, Menu, Trophy, Users, X } from 'lucide-react'

const navigation = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Progress', icon: BarChart3 },
  { label: 'Classes', icon: CalendarDays },
  { label: 'Learners', icon: Users },
]

export function DashboardShell({ role, name, eyebrow, children }: { role: 'Parent' | 'Student' | 'Instructor' | 'Admin'; name: string; eyebrow: string; children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('Overview')

  return (
    <main className="min-h-screen bg-[#f8f8fc] text-[#17172b]">
      <header className="sticky top-0 z-30 border-b border-[#e9e8f2] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button className="rounded-xl p-2 text-[#6b6b84] lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">{mobileOpen ? <X size={21} /> : <Menu size={21} />}</button>
            <video className="h-10 w-10 rounded-[13px] object-cover shadow-[0_5px_12px_rgba(98,87,233,.25)]" src="/brand-logo.mp4" autoPlay muted loop playsInline aria-label="Maths Vertex logo" />
            <span className="text-[20px] font-extrabold tracking-[-.04em]">Maths<span className="text-[#6257e9]">Vertex</span></span>
          </div>
          <div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-xs font-bold text-[#9997aa]">{role} workspace</p><p className="text-sm font-extrabold">{name}</p></div><button aria-label="Open profile" className="grid h-10 w-10 place-items-center rounded-full bg-[#dce5ff] text-sm font-extrabold text-[#536dc6]">{name.slice(0, 1)}</button></div>
        </div>
        {mobileOpen && <nav className="border-t border-[#ecebf4] bg-white px-5 py-3 lg:hidden">{navigation.map(({ label, icon: Icon }) => <button key={label} onClick={() => { setActive(label); setMobileOpen(false) }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold ${active === label ? 'bg-[#6257e9] text-white' : 'text-[#79778e]'}`}><Icon size={17} />{label}</button>)}</nav>}
      </header>
      <div className="mx-auto flex max-w-[1500px]">
        <aside className="hidden min-h-[calc(100vh-74px)] w-[245px] shrink-0 border-r border-[#e9e8f2] bg-white px-5 py-8 lg:block">
          <div className="mb-9 rounded-2xl bg-[#f2f1ff] p-4"><div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-[#ffcb73] text-lg font-extrabold text-[#98690f]">{name.slice(0, 1)}</div><p className="text-sm font-extrabold">{name}&apos;s workspace</p><p className="mt-1 text-xs font-medium text-[#8d8ba2]">{eyebrow}</p></div>
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#aaa9bb]">Workspace</p>
          <div className="space-y-1">{navigation.map(({ label, icon: Icon }) => <button key={label} onClick={() => setActive(label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${active === label ? 'bg-[#6257e9] text-white shadow-[0_6px_16px_rgba(98,87,233,.2)]' : 'text-[#79778e] hover:bg-[#f5f4fb]'}`}><Icon size={18} />{label}</button>)}</div>
          <div className="mt-14 rounded-2xl bg-[#fff4df] p-4"><GraduationCap className="mb-3 text-[#bd7810]" size={20} /><p className="text-sm font-extrabold">Keep the momentum</p><p className="mt-1 text-xs leading-5 text-[#9b7942]">A little practice each day builds confident mathematicians.</p></div>
        </aside>
        <section className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-10"><div className="mb-8"><p className="mb-2 text-sm font-bold text-[#8e8ca1]">Wednesday, 14 June 2024</p><h1 className="text-[32px] font-extrabold tracking-[-.045em] sm:text-[40px]">{eyebrow}, <span className="text-[#6257e9]">{name}</span></h1><p className="mt-2 text-[15px] text-[#858399]">Here&apos;s a clear view of what matters next.</p></div>{children}</section>
      </div>
    </main>
  )
}

export function StatCard({ label, value, detail, tone = 'violet' }: { label: string; value: string; detail: string; tone?: 'violet' | 'orange' | 'green' | 'blue' }) {
  const colors = { violet: 'bg-[#eeedff] text-[#6257e9]', orange: 'bg-[#fff0dc] text-[#e99c37]', green: 'bg-[#e7f7ef] text-[#4da477]', blue: 'bg-[#e9f1ff] text-[#5c86e6]' }
  return <div className="rounded-[22px] border border-[#e9e7f1] bg-white p-5"><div className={`mb-5 grid h-10 w-10 place-items-center rounded-xl ${colors[tone]}`}><Trophy size={18} /></div><p className="text-xs font-bold text-[#9997aa]">{label}</p><p className="mt-1 text-3xl font-extrabold tracking-tight">{value}</p><p className="mt-1 text-xs font-semibold text-[#5caf82]">{detail}</p></div>
}

export function ProgressRow({ label, value, color = 'bg-[#6257e9]' }: { label: string; value: number; color?: string }) { return <div><div className="mb-2 flex justify-between text-xs font-bold"><span>{label}</span><span className="text-[#9997aa]">{value}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#efeff6]"><div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} /></div></div> }

export function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) { return <div className="rounded-[22px] border border-[#e9e7f1] bg-white p-6"><div className="mb-6"><h2 className="text-lg font-extrabold">{title}</h2>{subtitle && <p className="mt-1 text-xs text-[#9997aa]">{subtitle}</p>}</div>{children}</div> }

export function DashboardLink({ href, children }: { href: string; children: React.ReactNode }) { return <a href={href} className="inline-flex items-center gap-2 rounded-xl bg-[#6257e9] px-4 py-3 text-sm font-extrabold text-white shadow-[0_6px_16px_rgba(98,87,233,.2)] transition hover:bg-[#5148d6]">{children}<ChevronDown className="-rotate-90" size={16} /></a> }
