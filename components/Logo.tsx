import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" aria-label="MathsVertex home" className="inline-flex items-center gap-2">
      <span className="text-2xl font-extrabold tracking-tight sm:text-3xl" style={{ fontFamily: 'var(--font-montserrat)' }}>
        <span className="text-[#0B1749]">maths</span>
        <span className="text-[#0057FF]">vertex</span>
      </span>
    </Link>
  )
}
