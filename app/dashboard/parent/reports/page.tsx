import { ArrowLeft, BarChart3, CheckCircle2, Clock3, Sparkles } from 'lucide-react'
import { DashboardLink, DashboardShell, SectionCard } from '@/components/dashboard-shell'
import { getParentDashboardData, getParentWeeklyReports } from '@/lib/dashboard-data'

function formatWeek(value: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${value}T00:00:00`))
}

export default async function ParentReportsPage() {
  const [dashboard, reports] = await Promise.all([getParentDashboardData(), getParentWeeklyReports()])
  const name = dashboard?.parent?.full_name ?? 'Parent'

  return <DashboardShell role="Parent" name={name} eyebrow="Family reports">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div><DashboardLink href="/dashboard/parent"><ArrowLeft size={15} /> Back to command center</DashboardLink><h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#17172b]">Weekly progress reports</h1><p className="mt-2 text-sm text-[#8e8ca1]">A clear view of the habits and skills your learner is building.</p></div>
    </div>
    {reports.length === 0 ? <SectionCard title="Your first report is on the way" subtitle="Weekly summaries appear after learning activity is recorded."><div className="flex items-start gap-4 py-5"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#eeedff] text-[#6257e9]"><Sparkles size={21} /></div><div><p className="font-bold text-[#17172b]">Keep the momentum going</p><p className="mt-1 max-w-xl text-sm leading-6 text-[#8e8ca1]">Practice sessions, accuracy, and mastered skills will be collected into a simple Sunday briefing here.</p></div></div></SectionCard> : <div className="grid gap-5 lg:grid-cols-2">{reports.map((report) => <SectionCard key={report.id} title={`Week of ${formatWeek(report.week_start_date)}`} subtitle="Aarav&apos;s learning snapshot"><div className="grid grid-cols-3 gap-3"><div className="rounded-2xl bg-[#f7f6fc] p-3"><Clock3 size={16} className="text-[#6257e9]" /><p className="mt-3 text-xl font-extrabold text-[#17172b]">{report.total_practice_mins}m</p><p className="mt-1 text-[11px] font-semibold text-[#9997aa]">Practice time</p></div><div className="rounded-2xl bg-[#f7f6fc] p-3"><CheckCircle2 size={16} className="text-[#4da477]" /><p className="mt-3 text-xl font-extrabold text-[#17172b]">{report.accuracy_percentage}%</p><p className="mt-1 text-[11px] font-semibold text-[#9997aa]">Accuracy</p></div><div className="rounded-2xl bg-[#f7f6fc] p-3"><BarChart3 size={16} className="text-[#f1aa4d]" /><p className="mt-3 text-xl font-extrabold text-[#17172b]">{report.skills_mastered_count}</p><p className="mt-1 text-[11px] font-semibold text-[#9997aa]">Skills mastered</p></div></div><p className="mt-5 border-t border-[#f0eff5] pt-4 text-sm leading-6 text-[#66647c]">{report.ai_summary_note}</p></SectionCard>)}</div>}
  </DashboardShell>
}

export const metadata = { title: 'Weekly Reports | Ask' }

export const dynamic = 'force-dynamic'

