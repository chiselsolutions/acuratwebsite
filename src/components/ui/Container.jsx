import { cn } from '../../lib/cn'

/**
 * Page gutter + max width.
 * `narrow` matches the original .container-narrow (800px) used by the hero/CTA.
 */
export function Container({ narrow = false, className, children }) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-7',
        narrow ? 'max-w-[800px]' : 'max-w-[1100px]',
        className,
      )}
    >
      {children}
    </div>
  )
}
