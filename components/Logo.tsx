import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" aria-label="Ask home" className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="grid size-11 place-items-center overflow-hidden rounded-[13px] bg-transparent">
        <video
          src="/ask-logo.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="size-full object-contain mix-blend-screen"
        />
      </span>
      <span className="text-[25px] font-extrabold tracking-[-.06em] text-[#17172b]">Ask</span>
    </Link>
  )
}
