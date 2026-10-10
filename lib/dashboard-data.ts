import { createClient } from '@/lib/supabase/server'

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  return { supabase, user: data.user }
}

export async function getParentDashboardData() {
  const { supabase, user } = await getCurrentUser()
  if (!user) return null

  const [{ data: parent }, { data: children }] = await Promise.all([
    supabase.from('parents').select('full_name, subscription_status, subscription_tier').eq('id', user.id).maybeSingle(),
    supabase.from('child_profiles').select('id, display_name, grade_level, gems_balance, current_streak').eq('parent_id', user.id).order('created_at'),
  ])

  const child = children?.[0]
  if (!child) return { parent, child: null, children: children ?? [], progress: [], sessions: [] }

  const [{ data: progress }, { data: sessions }] = await Promise.all([
    supabase.from('student_progress').select('topic_id, mastery, questions_answered, correct_answers, last_activity_at, topics(name)').eq('child_id', child.id).order('mastery', { ascending: false }),
    supabase.from('session_logs').select('started_at, duration_seconds, questions_answered, correct_answers').eq('child_id', child.id).order('started_at', { ascending: false }).limit(5),
  ])

  return { parent, child, children: children ?? [], progress: progress ?? [], sessions: sessions ?? [] }
}

export async function getParentWeeklyReports() {
  const { supabase, user } = await getCurrentUser()
  if (!user) return []

  const { data } = await supabase
    .from('parent_weekly_reports')
    .select('id, child_id, week_start_date, total_practice_mins, skills_mastered_count, accuracy_percentage, ai_summary_note')
    .order('week_start_date', { ascending: false })
    .limit(12)

  return data ?? []
}

export async function getStudentDashboardData() {
  const data = await getParentDashboardData()
  if (!data?.child) return data
  return data
}

export async function getInstructorDashboardData() {
  const { supabase, user } = await getCurrentUser()
  if (!user) return null

  const [{ data: instructor }, { data: classes }] = await Promise.all([
    supabase.from('instructors').select('full_name').eq('id', user.id).maybeSingle(),
    supabase.from('live_classes').select('id, title, description, scheduled_at, duration_minutes, topic_id').eq('instructor_id', user.id).order('scheduled_at').limit(5),
  ])

  const classIds = classes?.map((item) => item.id) ?? []
  const { data: enrollments } = classIds.length
    ? await supabase.from('class_enrollments').select('class_id, child_id, child_profiles(display_name)').in('class_id', classIds)
    : { data: [] }

  return { instructor, classes: classes ?? [], enrollments: enrollments ?? [] }
}

export async function getPublicCurriculumData() {
  const { supabase } = await getCurrentUser()
  const { data } = await supabase.from('courses').select('id, grade, name, description, course_topics(id, title, position)').order('grade')
  return (data ?? []).map((course) => ({ ...course, course_topics: [...(course.course_topics ?? [])].sort((a, b) => a.position - b.position) }))
}

export async function getCurriculumData() {
  const { supabase, user } = await getCurrentUser()
  if (!user) return null
  const { data: courses, error } = await supabase.from('courses').select('id, grade, name, description, course_topics(id, title, position)').order('grade')
  if (error) return { courses: [] }
  return { courses: (courses ?? []).map((course) => ({ ...course, course_topics: [...(course.course_topics ?? [])].sort((a, b) => a.position - b.position) })) }
}

export async function getAdminDashboardData() {
  const { supabase, user } = await getCurrentUser()
  if (!user) return null
  const isAdmin = user.app_metadata?.role === 'admin'
  if (!isAdmin) return { isAdmin: false, families: 0, learners: 0, instructors: 0, payments: 0 }
  const [{ count: families }, { count: learners }, { count: instructors }, { count: payments }] = await Promise.all([
    supabase.from('parents').select('id', { count: 'exact', head: true }),
    supabase.from('child_profiles').select('id', { count: 'exact', head: true }),
    supabase.from('instructors').select('id', { count: 'exact', head: true }),
    supabase.from('payment_transactions').select('id', { count: 'exact', head: true }),
  ])
  return { isAdmin, families: families ?? 0, learners: learners ?? 0, instructors: instructors ?? 0, payments: payments ?? 0 }
}

export function formatClassTime(value: string) {
  return new Intl.DateTimeFormat('en', { weekday: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date(value))
}
