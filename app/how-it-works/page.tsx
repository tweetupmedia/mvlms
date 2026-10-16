import type { Metadata } from 'next'
import { PublicPage } from '@/components/public-page'

export const metadata: Metadata = { title: 'How it works', description: 'See how Ask combines diagnostics, adaptive practice, and mentoring.' }
export default function Page() { return <PublicPage path="/how-it-works" /> }
