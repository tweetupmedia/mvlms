'use client'

export default function GlobalError({ reset }: { reset: () => void }) {
  return <main className="grid min-h-screen place-items-center bg-[#faf9ff] px-6 text-center text-[#17172b]"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#6257e9]">Something went wrong</p><h1 className="mt-3 text-3xl font-extrabold">We&apos;re restoring your learning space.</h1><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#858399]">Your progress is safe. Try again, or come back in a moment.</p><button type="button" onClick={reset} className="mt-6 rounded-xl bg-[#6257e9] px-5 py-3 text-sm font-extrabold text-white">Try again</button></div></main>
}
