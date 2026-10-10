import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET
  const authorization = request.headers.get('authorization')
  if (!cronSecret || authorization !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )

  const weekStart = new Date()
  weekStart.setUTCDate(weekStart.getUTCDate() - 7)
  const weekStartDate = weekStart.toISOString().slice(0, 10)

  const { data: children, error: childrenError } = await supabase
    .from('child_profiles')
    .select('id, display_name')

  if (childrenError) {
    return NextResponse.json({ error: 'Unable to load child profiles' }, { status: 500 })
  }

  let processed = 0
  for (const child of children ?? []) {
    const { data: logs, error: logsError } = await supabase
      .from('session_logs')
      .select('duration_seconds, questions_answered, correct_answers')
      .eq('child_id', child.id)
      .gte('created_at', `${weekStartDate}T00:00:00.000Z`)

    if (logsError) {
      return NextResponse.json({ error: 'Unable to aggregate session logs' }, { status: 500 })
    }

    if (!logs?.length) continue

    const totalPracticeMins = Math.round(logs.reduce((sum, log) => sum + (log.duration_seconds ?? 0), 0) / 60)
    const questionsAnswered = logs.reduce((sum, log) => sum + (log.questions_answered ?? 0), 0)
    const correctAnswers = logs.reduce((sum, log) => sum + (log.correct_answers ?? 0), 0)
    const accuracy = questionsAnswered ? Math.round((correctAnswers / questionsAnswered) * 10000) / 100 : 0
    const aiSummaryNote = `${child.display_name} completed ${totalPracticeMins} minutes of practice with ${accuracy}% accuracy this week. Keep building the daily streak.`

    const { error: reportError } = await supabase
      .from('parent_weekly_reports')
      .upsert({
        child_id: child.id,
        week_start_date: weekStartDate,
        total_practice_mins: totalPracticeMins,
        skills_mastered_count: logs.length,
        accuracy_percentage: accuracy,
        ai_summary_note: aiSummaryNote,
      }, { onConflict: 'child_id,week_start_date' })

    if (reportError) {
      return NextResponse.json({ error: 'Unable to save weekly report' }, { status: 500 })
    }

    processed += 1
  }

  return NextResponse.json({ success: true, processed, weekStartDate })
}
