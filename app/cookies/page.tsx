import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
export const metadata: Metadata = { title: 'Cookie policy', description: 'Learn how Ask uses essential cookies and analytics.' }
export default function CookiesPage() { return <LegalPage kind="cookies" /> }
