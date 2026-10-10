'use client'

import { useEffect, useState } from 'react'

type RequestRow = { id: string; parent_name: string; email: string; phone: string; child_grade: number; preferred_date: string; preferred_time: string; status: string; notes: string; assigned_instructor_id?: string | null }
type Instructor = { id: string; full_name: string }

export function FreeClassRequests() {
  const [requests, setRequests] = useState<RequestRow[]>([])
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [error, setError] = useState('')
  useEffect(() => { fetch('/api/admin/free-class-requests').then(async (response) => { if (!response.ok) throw new Error('Unable to load requests'); return response.json() }).then((data) => { setRequests(data.requests); setInstructors(data.instructors ?? []) }).catch((err: Error) => setError(err.message)) }, [])
  async function update(id: string, patch: Partial<RequestRow>) {
    const response = await fetch('/api/admin/free-class-requests', { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id, ...patch }) })
    if (!response.ok) return setError('Unable to update request')
    setRequests((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item))
  }
  return <div className="space-y-3">{error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}{requests.length === 0 && !error && <p className="rounded-xl bg-[#f7f6fd] p-4 text-sm text-[#77758c]">No free-class requests yet.</p>}{requests.map((item) => <article key={item.id} className="grid gap-4 rounded-2xl border border-[#ebeaf3] bg-[#fbfaff] p-4 lg:grid-cols-[1fr_auto_auto] lg:items-center"><div><p className="font-extrabold">{item.parent_name} · Grade {item.child_grade}</p><p className="text-xs text-[#77758c]">{item.email} · {item.phone}</p><p className="mt-1 text-xs font-semibold text-[#6257e9]">{item.preferred_date} at {item.preferred_time}</p></div><select aria-label={`Status for ${item.parent_name}`} value={item.status} onChange={(event) => update(item.id, { status: event.target.value })} className="rounded-lg border border-[#dedbf4] bg-white px-3 py-2 text-sm"><option value="new">New</option><option value="contacted">Contacted</option><option value="scheduled">Scheduled</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select><div className="flex flex-wrap gap-2"><select aria-label={`Assign instructor for ${item.parent_name}`} value={item.assigned_instructor_id ?? ''} onChange={(event) => update(item.id, { assigned_instructor_id: event.target.value || null })} className="rounded-lg border border-[#dedbf4] bg-white px-3 py-2 text-sm"><option value="">Unassigned</option>{instructors.map((instructor) => <option key={instructor.id} value={instructor.id}>{instructor.full_name}</option>)}</select><input aria-label={`Reschedule date for ${item.parent_name}`} type="date" value={item.preferred_date} onChange={(event) => update(item.id, { preferred_date: event.target.value })} className="rounded-lg border border-[#dedbf4] bg-white px-3 py-2 text-sm" /><input aria-label={`Reschedule time for ${item.parent_name}`} value={item.preferred_time} onChange={(event) => update(item.id, { preferred_time: event.target.value })} className="w-28 rounded-lg border border-[#dedbf4] bg-white px-3 py-2 text-sm" /></div></article>)}</div>
}
