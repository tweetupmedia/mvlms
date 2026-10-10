import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
export const metadata: Metadata = { title: 'Terms and conditions', description: 'The terms for using Maths Vertex learning services.' }
export default function TermsPage() { return <LegalPage kind="terms" /> }
