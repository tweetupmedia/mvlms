'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BarChart3, BookOpen, CalendarDays, ChevronDown, GraduationCap, LayoutDashboard, LogOut, Menu, ShieldCheck, Trophy, Users, X } from 'lucide-react'

const navigation = [
  { label: 'Overview', icon: LayoutDashboard, tab: '' },
  { label: 'Progress', icon: BarChart3, tab: 'progress' },
  { label: 'Classes', icon: CalendarDays, tab: 'classes' },
  { label: 'Learners', icon: Users, tab: 'learners' },
]

const adminNavigation = [
  { label: 'Overview', icon: LayoutDashboard, tab: '' },
  { label: 'Families', icon: Users, tab: 'families' },
  { label: 'Curriculum', icon: BookOpen, tab: 'curriculum' },
  { label: 'Requests', icon: CalendarDays, tab: 'requests' },
  { label: 'Payments', icon: ShieldCheck, tab: 'payments' },
]

export function DashboardShell({ role, name, eyebrow, children }: { role: 'Parent' | 'Student' | 'Instructor' | 'Admin'; name: string; eyebrow: string; children: React.ReactNode }) {
  const rolePath = role.toLowerCase() === 'student' ? 'student' : role.toLowerCase() === 'instructor' ? 'instructor' : role.toLowerCase() === 'admin' ? 'admin' : 'parent'
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const active = pathname.split('/')[3] ? pathname.split('/')[3].replace(/-/g, ' ').replace(/^./, (letter) => letter.toUpperCase()) : 'Overview'
  const links = role === 'Admin' ? adminNavigation : navigation

  async function signOut() {
    const { createClient } = await import('@/lib/supabase/client')
    await createClient().auth.signOut()
    window.location.href = '/auth/login'
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#172033]">
      <header className="sticky top-0 z-30 border-b border-[#e6e3dc] bg-[#F8F7F4]/95 backdrop-blur-md">
        <a href="#dashboard-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#0057FF]">Skip to dashboard content</a>
        <div className="mx-auto flex h-[74px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-xl p-2 text-[#6b6b84] lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} aria-controls="mobile-navigation">{mobileOpen ? <X size={21} /> : <Menu size={21} />}</button>
            <span className="grid size-10 place-items-center overflow-hidden rounded-[13px] bg-transparent" aria-hidden="true">
              <video src="/ask-logo.mp4" autoPlay loop muted playsInline aria-hidden="true" className="size-full object-contain mix-blend-screen" />
            </span>
            <span className="text-[20px] font-extrabold tracking-[-.04em]">Ask</span>
          </div>
          <div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-xs font-bold text-[#9997aa]">{role} workspace</p><p className="text-sm font-extrabold">{name}</p></div><button aria-label="Open profile" className="grid h-10 w-10 place-items-center rounded-full bg-[#dce5ff] text-sm font-extrabold text-[#536dc6]">{name.slice(0, 1)}</button></div>
        </div>
        {mobileOpen && <nav id="mobile-navigation" aria-label={`${role} workspace navigation`} className="border-t border-[#ecebf4] bg-white px-5 py-3 lg:hidden">{links.map(({ label, icon: Icon, tab }) => <Link key={label} href={`/dashboard/${rolePath}${tab ? `/${tab}` : ''}`} onClick={() => setMobileOpen(false)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold ${active === label ? 'bg-[#0057FF] text-white' : 'text-[#79778e]'}`}><Icon size={17} />{label}</Link>)}</nav>}
      </header>
      <div className="mx-auto flex max-w-[1500px]">
        <aside className="hidden min-h-[calc(100vh-74px)] w-[245px] shrink-0 border-r border-[#e6e3dc] bg-[#F8F7F4] px-5 py-8 lg:block">
          <div className="mb-9 rounded-2xl bg-[#f2f1ff] p-4"><div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-[#ffcb73] text-lg font-extrabold text-[#98690f]">{name.slice(0, 1)}</div><p className="text-sm font-extrabold">{name}&apos;s workspace</p><p className="mt-1 text-xs font-medium text-[#8d8ba2]">{eyebrow}</p></div>
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#aaa9bb]">Workspace</p>
          <div className="space-y-1">{links.map(({ label, icon: Icon, tab }) => <Link key={label} href={`/dashboard/${rolePath}${tab ? `/${tab}` : ''}`}  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${active === label ? 'bg-[#0057FF] text-white shadow-[0_6px_16px_rgba(0,87,255,.2)]' : 'text-[#79778e] hover:bg-[#f5f4fb]'}`}><Icon size={18} />{label}</Link>)}</div>
          <div className="mt-14 rounded-2xl bg-[#fff4df] p-4"><GraduationCap className="mb-3 text-[#bd7810]" size={20} /><p className="text-sm font-extrabold">Keep the momentum</p><p className="mt-1 text-xs leading-5 text-[#9b7942]">A little practice each day builds confident mathematicians.</p></div><button onClick={signOut} className="mt-5 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-[#79778e] transition hover:bg-[#fff0f0] hover:text-[#d45d67]"><LogOut size={18} />Sign out</button>
        </aside>
        <main id="dashboard-content" aria-labelledby="dashboard-title" className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-10"><div className="mb-8"><p className="mb-2 text-sm font-bold text-[#8e8ca1]">Wednesday, 14 June 2024</p><h1 id="dashboard-title" className="text-[32px] font-extrabold tracking-[-.045em] sm:text-[40px]">{eyebrow}, <span className="text-[#0057FF]">{name}</span></h1><p className="mt-2 text-[15px] text-[#858399]">Here&apos;s a clear view of what matters next.</p></div>{children}</main>
      </div>
    </div>
  )
}

export function StatCard({ label, value, detail, tone = 'violet' }: { label: string; value: string; detail: string; tone?: 'violet' | 'orange' | 'green' | 'blue' }) {
  const colors = { violet: 'bg-[#eeedff] text-[#0057FF]', orange: 'bg-[#fff0dc] text-[#e99c37]', green: 'bg-[#e7f7ef] text-[#4da477]', blue: 'bg-[#e9f1ff] text-[#5c86e6]' }
  return <div className="rounded-[22px] border border-[#e9e7f1] bg-white p-5"><div className={`mb-5 grid h-10 w-10 place-items-center rounded-xl ${colors[tone]}`}><Trophy size={18} /></div><p className="text-xs font-bold text-[#9997aa]">{label}</p><p className="mt-1 text-3xl font-extrabold tracking-tight">{value}</p><p className="mt-1 text-xs font-semibold text-[#5caf82]">{detail}</p></div>
}

export function ProgressRow({ label, value, color = 'bg-[#0057FF]' }: { label: string; value: number; color?: string }) { return <div><div className="mb-2 flex justify-between text-xs font-bold"><span id={`progress-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</span><span className="text-[#9997aa]">{value}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#efeff6]" role="progressbar" aria-labelledby={`progress-${label.toLowerCase().replaceAll(' ', '-')}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}><div aria-hidden="true" className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} /></div></div> }

export function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) { return <div className="rounded-[22px] border border-[#e9e7f1] bg-white p-6"><div className="mb-6"><h2 className="text-lg font-extrabold">{title}</h2>{subtitle && <p className="mt-1 text-xs text-[#9997aa]">{subtitle}</p>}</div>{children}</div> }

export function DashboardLink({ href, children }: { href: string; children: React.ReactNode }) { return <a href={href} className="inline-flex items-center gap-2 rounded-xl bg-[#0057FF] px-4 py-3 text-sm font-extrabold text-white shadow-[0_6px_16px_rgba(0,87,255,.2)] transition hover:bg-[#0047d6]">{children}<ChevronDown className="-rotate-90" size={16} /></a> }
