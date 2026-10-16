import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" aria-label="Ask home" className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="grid size-11 place-items-center rounded-[13px] bg-[#6257e9] text-2xl font-extrabold tracking-[-.08em] text-white shadow-[0_7px_16px_rgba(98,87,233,.24)]">
        A
      </span>
      <span className="text-[25px] font-extrabold tracking-[-.06em] text-[#17172b]">Ask</span>
    </Link>
  )
}
