'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

type SessionResult = {
  childId: string
  topicId?: string
  questionsAnswered: number
  correctAnswers: number
  durationSeconds: number
}

export async function submitSessionResult(result: SessionResult) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  const { data: child } = await supabase
    .from('child_profiles')
    .select('id')
    .eq('id', result.childId)
    .eq('parent_id', user.id)
    .maybeSingle()

  if (!child) return { success: false, error: 'Profile not found' }

  const { error } = await supabase.from('session_logs').insert({
    child_id: result.childId,
    topic_id: result.topicId || null,
    duration_seconds: result.durationSeconds,
    questions_answered: result.questionsAnswered,
    correct_answers: result.correctAnswers,
  })

  if (error) return { success: false, error: 'Unable to save session' }
  revalidatePath('/dashboard/student')
  revalidatePath('/dashboard/student/practice')
  return { success: true }
}

export async function getPracticeProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase.from('child_profiles').select('id, display_name, gems_balance, current_streak').eq('parent_id', user.id).order('created_at').limit(1).maybeSingle()
  return data
}

export async function getPracticeTopic() {
  const supabase = await createClient()
  const { data } = await supabase.from('topics').select('id, name').order('created_at').limit(1).maybeSingle()
  return data
}

export type PracticeProfile = Awaited<ReturnType<typeof getPracticeProfile>>
export type PracticeTopic = Awaited<ReturnType<typeof getPracticeTopic>>
