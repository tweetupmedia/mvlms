import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
export const metadata: Metadata = { title: 'Privacy policy', description: 'Learn how Ask handles account, learner, and family information.' }
export default function PrivacyPage() { return <LegalPage kind="privacy" /> }
