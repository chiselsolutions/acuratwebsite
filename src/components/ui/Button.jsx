import { cn } from '../../lib/cn'

const VARIANTS = {
  /** Near-black pill — the primary CTA everywhere on the page. */
  primary:
    'bg-[#1a1a1a] text-white hover:bg-[#333] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]',
  /** Outlined secondary, greens up on hover. */
  ghost:
    'bg-transparent text-ink border-[1.5px] border-border hover:border-green hover:text-green',
  /** White on the dark CTA band. */
  white:
    'bg-white text-green hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]',
}

const SIZES = {
  sm: 'px-5 py-2 text-[13px] rounded-lg',
  lg: 'px-7 py-3.5 text-[15px] rounded-[10px] sm:px-8',
}

/**
 * Renders an <a> when `href` is passed, otherwise a <button>.
 * Keeps CTA styling in one place — the original repeated it across five rules.
 */
export function Button({
  as,
  href,
  variant = 'primary',
  size = 'lg',
  className,
  children,
  ...rest
}) {
  const Tag = as ?? (href ? 'a' : 'button')

  return (
    <Tag
      href={href}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 border-none font-bold no-underline transition-all duration-200',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green',
        SIZES[size],
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
