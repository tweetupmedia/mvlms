import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

async function getAdminClient() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user?.app_metadata?.role === 'admin' ? supabase : null
}

export async function GET() {
  const supabase = await getAdminClient()
  if (!supabase) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const [{ data, error }, { data: instructors }] = await Promise.all([
    supabase.from('free_class_requests').select('*').order('created_at', { ascending: false }),
    supabase.from('instructors').select('id, full_name').order('full_name'),
  ])
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ requests: data ?? [], instructors: instructors ?? [] })
}

export async function PATCH(request: Request) {
  const supabase = await getAdminClient()
  if (!supabase) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const body = await request.json() as { id?: string; status?: string; preferred_date?: string; preferred_time?: string; assigned_instructor_id?: string | null }
  if (!body.id) return NextResponse.json({ error: 'Request id is required' }, { status: 400 })
  const update = Object.fromEntries(Object.entries(body).filter(([key, value]) => key !== 'id' && value !== undefined))
  const { error } = await supabase.from('free_class_requests').update(update).eq('id', body.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
