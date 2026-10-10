import { redirect } from 'next/navigation'
import { PracticeSession } from '@/components/practice-session'
import { getPracticeProfile, getPracticeTopic } from '@/actions/progress'

export default async function StudentPracticePage() {
  const [profile, topic] = await Promise.all([getPracticeProfile(), getPracticeTopic()])
  if (!profile) redirect('/auth/login?next=/dashboard/student/practice')
  return <main className="min-h-screen bg-[#f7f6fc] px-5 py-8 text-[#25233a] sm:px-8"><PracticeSession profile={profile} topic={topic} /></main>
}
