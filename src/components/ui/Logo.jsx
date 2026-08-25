import { cn } from '../../lib/cn'

/**
 * Wordmark + gradient "A" tile.
 * `tone="light"` is the footer variant (white text, flat green tile).
 */
export function Logo({ tone = 'dark', className }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2.5 text-[19px] font-extrabold tracking-[-0.3px]',
        tone === 'light' ? 'text-white' : 'text-dark',
        className,
      )}
    >
      <span
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg text-[17px] font-bold text-white',
          tone === 'light'
            ? 'bg-green'
            : 'bg-[linear-gradient(135deg,var(--color-green)_0%,#2a9a78_100%)]',
        )}
        aria-hidden="true"
      >
        A
      </span>
      Acurat
    </div>
  )
}
