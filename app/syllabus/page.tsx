import type { Metadata } from 'next'
import { SyllabusPage } from '@/components/public-page'

export const metadata: Metadata = { title: 'Maths syllabus', description: 'Explore the Maths Vertex Grade 1–8 curriculum and topic progression.' }
export default function Page() { return <SyllabusPage /> }
