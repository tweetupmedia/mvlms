import { createClient } from '@supabase/supabase-js'

export type Briefing = {
  childId: string
  parentId: string
  email: string
  childName: string
  practiceMinutes: number
  accuracy: number
  skills: number
  summary: string
}

export async function buildParentBriefings(weekStartDate: string) {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { autoRefreshToken: false, persistSession: false } })
  const { data: children, error } = await supabase.from('child_profiles').select('id, display_name, parent_id')
  if (error) throw error
  const { data: users } = await supabase.auth.admin.listUsers({ perPage: 1000 })
  const emails = new Map((users?.users ?? []).map((user) => [user.id, user.email]).filter((entry): entry is [string, string] => Boolean(entry[1])))
  const briefings: Briefing[] = []
  for (const child of children ?? []) {
    const { data: logs } = await supabase.from('session_logs').select('duration_seconds, questions_answered, correct_answers').eq('child_id', child.id).gte('created_at', `${weekStartDate}T00:00:00.000Z`)
    if (!logs?.length) continue
    const minutes = Math.round(logs.reduce((sum, log) => sum + (log.duration_seconds ?? 0), 0) / 60)
    const questions = logs.reduce((sum, log) => sum + (log.questions_answered ?? 0), 0)
    const correct = logs.reduce((sum, log) => sum + (log.correct_answers ?? 0), 0)
    const accuracy = questions ? Math.round((correct / questions) * 100) : 0
    briefings.push({ childId: child.id, parentId: child.parent_id, email: emails.get(child.parent_id) ?? '', childName: child.display_name, practiceMinutes: minutes, accuracy, skills: logs.length, summary: `${child.display_name} practiced for ${minutes} minutes with ${accuracy}% accuracy this week. Keep the daily momentum going.` })
  }
  return briefings.filter((briefing) => briefing.email)
}

export function briefingHtml(briefing: Briefing) {
  return `<div style="font-family:Arial,sans-serif;color:#17172b;max-width:620px;margin:auto"><p style="color:#6257e9;font-weight:700">MATHSVERTEX · SUNDAY BRIEFING</p><h1>${briefing.childName}&apos;s learning snapshot</h1><p>${briefing.summary}</p><div style="display:flex;gap:12px"><b>${briefing.practiceMinutes}m<br><small>Practice</small></b><b>${briefing.accuracy}%<br><small>Accuracy</small></b><b>${briefing.skills}<br><small>Sessions</small></b></div><p style="margin-top:28px">Celebrate the process, then choose one small goal for next week.</p></div>`
}
