import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardEntry() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login?next=/dashboard')

  const role = user.app_metadata?.role
  redirect(role === 'admin' || role === 'instructor' || role === 'student' ? `/dashboard/${role}` : '/dashboard/parent')
}
