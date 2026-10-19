import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const isHeroLead = body?.lead_type === 'hero'
  const parentName = typeof body?.parent_name === 'string' ? body.parent_name.trim() : (typeof body?.learner_name === 'string' ? body.learner_name.trim() : '')
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : (typeof body?.whatsapp_number === 'string' ? body.whatsapp_number.trim() : '')
  const grade = Number(body?.child_grade ?? body?.grade)
  const preferredDate = typeof body?.preferred_date === 'string' ? body.preferred_date : (isHeroLead ? new Date().toISOString().slice(0, 10) : '')
  const preferredTime = typeof body?.preferred_time === 'string' ? body.preferred_time : (isHeroLead ? 'To be scheduled' : '')
  const board = typeof body?.board === 'string' ? body.board.trim() : ''
  const notes = `${board ? `Board: ${board}. ` : ''}${typeof body?.notes === 'string' ? body.notes.trim() : ''}`.slice(0, 1000)
  if (!parentName || parentName.length > 100 || !emailPattern.test(email) || phone.length < 7 || phone.length > 30 || !Number.isInteger(grade) || grade < 1 || grade > 8 || !preferredDate || !preferredTime) return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 })
  const supabase = await createClient()
  const { error } = await supabase.from('free_class_requests').insert({ parent_name: parentName, email, phone, child_grade: grade, preferred_date: preferredDate, preferred_time: preferredTime, notes })
  if (error) return NextResponse.json({ error: 'Unable to save request.' }, { status: 500 })
  return NextResponse.json({ ok: true }, { status: 201 })
}
