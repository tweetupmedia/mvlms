import type { Metadata } from 'next'
import { PublicPage } from '@/components/public-page'

export const metadata: Metadata = { title: 'Platform features', description: 'Adaptive maths practice, Socratic hints, live challenges, and meaningful progress.' }
export default function Page() { return <PublicPage path="/features" /> }
