import { redirect } from 'next/navigation'
import { DashboardShell, SectionCard } from '@/components/dashboard-shell'
import { createClient } from '@/lib/supabase/server'

const labels: Record<string, { title: string; text: string }> = {
  progress: { title: 'Progress', text: 'Review learning trends, skill confidence, and the next recommended focus.' },
  classes: { title: 'Classes', text: 'See upcoming sessions, live challenges, and scheduled learning moments.' },
  learners: { title: 'Learners', text: 'Manage learner profiles, goals, and family or classroom progress.' },
}

export default async function DashboardTab({ params }: { params: Promise<{ role: string; tab: string }> }) {
  const { role, tab } = await params
  const config = labels[tab]
  if (!config) redirect(`/dashboard/${role}`)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  const displayRole = role === 'student' ? 'Student' : role === 'instructor' ? 'Instructor' : role === 'admin' ? 'Admin' : 'Parent'
  return <DashboardShell role={displayRole} name={user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'there'} eyebrow={config.title}><SectionCard title={config.title} subtitle={config.text}><div className="rounded-2xl bg-[#f7f6fd] p-8 text-sm leading-7 text-[#77758c]">This dedicated workspace is ready for live {config.title.toLowerCase()} data from your Supabase account.</div></SectionCard></DashboardShell>
}
