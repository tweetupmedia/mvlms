import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { buildParentBriefings } from '@/lib/parent-briefing'
import { sendParentBriefing } from '@/lib/send-parent-briefing'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const week = new Date()
  week.setUTCDate(week.getUTCDate() - 7)
  const weekStartDate = week.toISOString().slice(0, 10)
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { autoRefreshToken: false, persistSession: false } })
  const briefings = await buildParentBriefings(weekStartDate)
  for (const briefing of briefings) {
    const { error: reportError } = await supabase.from('parent_weekly_reports').upsert({ child_id: briefing.childId, week_start_date: weekStartDate, total_practice_mins: briefing.practiceMinutes, skills_mastered_count: briefing.skills, accuracy_percentage: briefing.accuracy, ai_summary_note: briefing.summary }, { onConflict: 'child_id,week_start_date' })
    if (reportError) return NextResponse.json({ error: 'Unable to save briefing' }, { status: 500 })
    const result = await sendParentBriefing(briefing, weekStartDate)
    if (result.error) return NextResponse.json({ error: 'Unable to send briefing' }, { status: 502 })
  }
  return NextResponse.json({ success: true, sent: briefings.length, weekStartDate })
}
