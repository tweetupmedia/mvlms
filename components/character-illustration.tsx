type CharacterIllustrationProps = {
  src: string
  alt: string
  className?: string
  delay?: string
}

export function CharacterIllustration({ src, alt, className = '', delay = '0s' }: CharacterIllustrationProps) {
  return (
    <img
      src={src}
      alt={alt}
      aria-hidden={!alt}
      loading="lazy"
      className={`pointer-events-none absolute z-0 w-28 object-contain opacity-90 motion-safe:animate-[character-float_7s_ease-in-out_infinite] ${className}`}
      style={{ animationDelay: delay }}
    />
  )
}

export const characterAssets = {
  ruler: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/18-FB8hm1M3opjp8LPeXcRqZmh5V8jPJN.jpg',
  calculator: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/15-zY408R1YK0VQA5yp0K95FloTNmkQ2E.jpg',
  compass: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/17-Kr41LqRt4cm4VqHhXS71pzRZ9ONB4F.jpg',
  pencil: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/25-Wt7KRnJkevuupHaoEpA1TBtMDEHI45.jpg',
  helper: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/22-8EPXNPPBfSaOgZuRNGgqR8RZGV7Va9.jpg',
}
