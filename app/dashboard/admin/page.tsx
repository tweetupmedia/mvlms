import { redirect } from 'next/navigation'
import { Activity, CreditCard, ShieldCheck, Users } from 'lucide-react'
import { DashboardShell, SectionCard, StatCard } from '@/components/dashboard-shell'
import { CharacterIllustration, characterAssets } from '@/components/character-illustration'
import { FreeClassRequests } from '@/components/admin/free-class-requests'
import { getAdminDashboardData, getCurriculumData } from '@/lib/dashboard-data'

export default async function AdminDashboard() {
  const [data, curriculum] = await Promise.all([getAdminDashboardData(), getCurriculumData()])
  if (!data) redirect('/auth/login')
  if (!data.isAdmin) redirect('/dashboard/parent')

  return <DashboardShell role="Admin" name="Operations" eyebrow="Platform overview">
    <div className="relative isolate mb-6 flex flex-col justify-between gap-4 overflow-hidden rounded-[24px] border border-[#d9e4fb] bg-[#eaf1ff] p-6 text-[#172033] sm:flex-row sm:items-center"><CharacterIllustration src={characterAssets.ruler} alt="" className="-right-2 -top-8 w-36 opacity-20 sm:right-8 sm:w-44" /><div className="relative z-10"><p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#0057FF]">Admin control center</p><h2 className="mt-2 text-2xl font-extrabold tracking-[-.03em]">Everything important, in one calm view.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#52617a]">Manage families, review free-class requests, keep the Grade 1–8 curriculum healthy, and monitor payments from one protected workspace.</p></div><div className="shrink-0 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-[#e8e6ff]"><ShieldCheck size={18} className="mb-2 text-[#a9a3ff]" />Admin access verified</div></div>
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Families" value={`${data.families}`} detail="Registered parents" tone="violet" />
      <StatCard label="Learners" value={`${data.learners}`} detail="Active profiles" tone="blue" />
      <StatCard label="Instructors" value={`${data.instructors}`} detail="Teaching accounts" tone="green" />
      <StatCard label="Payments" value={`${data.payments}`} detail="Recorded transactions" tone="orange" />
    </div>
    <SectionCard title="Free-class operations" subtitle="Review, schedule, and update parent requests"><FreeClassRequests /></SectionCard>
    <div className="mt-6"><SectionCard title="Curriculum catalogue" subtitle="Courses and topic structure for Grades 1–8">
      <div className="grid gap-4 md:grid-cols-2">
        {(curriculum?.courses ?? []).map((course) => <details key={course.id} className="group rounded-2xl border border-[#ebeaf3] bg-[#fbfaff] p-4" open={course.grade === 1}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4"><div><span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#6257e9]">Grade {course.grade}</span><h3 className="mt-1 text-base font-extrabold">{course.name}</h3><p className="mt-1 text-xs leading-5 text-[#858399]">{course.description}</p></div><span className="rounded-full bg-[#eeedff] px-2.5 py-1 text-[11px] font-bold text-[#6257e9]">{course.course_topics.length} topics</span></summary>
          <ol className="mt-4 grid gap-3 border-t border-[#ebeaf3] pt-4">{course.course_topics.map((topic) => <li key={topic.id} className="rounded-xl bg-white/80 p-3"><div className="flex items-center gap-2 text-xs font-extrabold text-[#68667b]"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#eeedff] text-[10px] font-extrabold text-[#6257e9]">{topic.position}</span>{topic.title}</div>{topic.content ? <p className="mt-2 pl-7 text-xs leading-5 text-[#858399]">{topic.content}</p> : null}</li>)}</ol>
        </details>)}
      </div>
    </SectionCard></div>
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_1fr]">
      <SectionCard title="Platform health" subtitle="Production readiness signals">
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-xl bg-[#e7f7ef] p-4"><ShieldCheck className="text-[#4da477]" size={19} /><div><p className="text-sm font-extrabold">Authentication protected</p><p className="text-xs text-[#6d967d]">Dashboard routes require a Supabase session.</p></div></div>
          <div className="flex items-center gap-3 rounded-xl bg-[#e9f1ff] p-4"><Activity className="text-[#5c86e6]" size={19} /><div><p className="text-sm font-extrabold">Realtime learning enabled</p><p className="text-xs text-[#7186b2]">Live duel score broadcasts are available.</p></div></div>
          <div className="flex items-center gap-3 rounded-xl bg-[#fff4df] p-4"><CreditCard className="text-[#bd7810]" size={19} /><div><p className="text-sm font-extrabold">Payment providers connected</p><p className="text-xs text-[#9b7942]">Stripe and Cashfree routes are configured.</p></div></div>
        </div>
      </SectionCard>
      <SectionCard title="Operations checklist" subtitle="Final deployment tasks"><div className="space-y-3 text-sm font-bold text-[#5d5b70]"><p className="flex items-center gap-3"><Users size={17} className="text-[#6257e9]" /> Review new family accounts</p><p className="flex items-center gap-3"><CreditCard size={17} className="text-[#6257e9]" /> Reconcile payment webhooks</p><p className="flex items-center gap-3"><Activity size={17} className="text-[#6257e9]" /> Monitor weekly briefing runs</p></div></SectionCard>
    </div>
  </DashboardShell>
}
