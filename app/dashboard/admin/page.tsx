import { redirect } from 'next/navigation'
import { Activity, CreditCard, ShieldCheck, Users } from 'lucide-react'
import { DashboardShell, SectionCard, StatCard } from '@/components/dashboard-shell'
import { getAdminDashboardData } from '@/lib/dashboard-data'

export default async function AdminDashboard() {
  const data = await getAdminDashboardData()
  if (!data) redirect('/auth/login')
  if (!data.isAdmin) redirect('/dashboard/parent')

  return <DashboardShell role="Admin" name="Operations" eyebrow="Platform overview">
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Families" value={`${data.families}`} detail="Registered parents" tone="violet" />
      <StatCard label="Learners" value={`${data.learners}`} detail="Active profiles" tone="blue" />
      <StatCard label="Instructors" value={`${data.instructors}`} detail="Teaching accounts" tone="green" />
      <StatCard label="Payments" value={`${data.payments}`} detail="Recorded transactions" tone="orange" />
    </div>
    <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
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
