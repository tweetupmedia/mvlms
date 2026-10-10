import type { Metadata } from 'next'
import { PublicPage } from '@/components/public-page'

export const metadata: Metadata = { title: 'For families', description: 'A calm, useful view of your learner’s progress and next steps.' }
export default function Page() { return <PublicPage path="/for-families" /> }
