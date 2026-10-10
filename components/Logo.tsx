import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" aria-label="MathsVertex home" className="inline-flex items-center">
      <video
        aria-label="Maths Vertex logo"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="h-14 w-[208px] object-cover sm:h-16 sm:w-[240px]"
      >
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/M-bAmC7esAHW62vIKq56q7o8LP03k6v1.mp4" type="video/mp4" />
      </video>
    </Link>
  )
}
