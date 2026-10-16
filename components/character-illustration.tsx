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
      className={`pointer-events-none absolute z-0 w-28 object-contain opacity-90 will-change-transform motion-safe:animate-[character-float_7s_ease-in-out_infinite] ${className}`}
      style={{ animationDelay: delay }}
    />
  )
}

export const characterAssets = {
  ruler: '/characters/blue-rectangle.png',
  calculator: '/characters/orange-bar.png',
  compass: '/characters/yellow-x.png',
  pencil: '/characters/green-plus.png',
  helper: '/characters/orange-face.png',
  pi: '/characters/purple-pi.png',
  numbers: '/characters/numbers.png',
  percentage: '/characters/percentage.png',
}
