import { Resend } from 'resend'
import { briefingHtml, type Briefing } from '@/lib/parent-briefing'

export async function sendParentBriefing(briefing: Briefing, weekStartDate: string) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const from = process.env.RESEND_EMAIL_DOMAIN ? `MathsVertex <briefing@${process.env.RESEND_EMAIL_DOMAIN}>` : 'MathsVertex <onboarding@resend.dev>'
  return resend.emails.send({ from, to: [briefing.email], subject: `${briefing.childName}&apos;s Sunday learning briefing`, html: briefingHtml(briefing) }, { idempotencyKey: `parent-briefing/${briefing.parentId}/${weekStartDate}` })
}
