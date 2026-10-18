import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" aria-label="tutoring.courses home" className="inline-flex items-center">
      <img src="/tutoring-courses-logo.png" alt="tutoring.courses" className="h-11 w-[220px] object-cover object-center" />
    </Link>
  )
}
