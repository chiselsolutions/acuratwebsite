import { cn } from '../../lib/cn'

/** Vertical rhythm wrapper for every page section. */
export function Section({ id, className, children }) {
  return (
    <section id={id} className={cn('py-16 sm:py-20 lg:py-25', className)}>
      {children}
    </section>
  )
}

/** Small uppercase eyebrow above a section heading. */
export function SectionTag({ className, children }) {
  return (
    <div
      className={cn(
        'mb-4 text-xs font-bold tracking-[1.5px] uppercase',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Section H2. Scales 26px → 40px across breakpoints, matching the original. */
export function SectionHeading({ as: Tag = 'h2', className, children }) {
  return (
    <Tag
      className={cn(
        'text-[26px] leading-[1.15] font-extrabold tracking-[-0.8px] text-dark sm:text-[32px] lg:text-[40px]',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export function SectionDescription({ className, children }) {
  return (
    <p
      className={cn(
        'text-[15px] leading-[1.7] text-ink-secondary sm:text-[17px]',
        className,
      )}
    >
      {children}
    </p>
  )
}

/** Centred tag + heading + description block used by most sections. */
export function SectionHeader({ tag, tagClass, heading, description, className }) {
  return (
    <div className={cn('mx-auto mb-12 text-center sm:mb-14', className)}>
      {tag && <SectionTag className={tagClass}>{tag}</SectionTag>}
      <SectionHeading className="mx-auto max-w-[560px]">{heading}</SectionHeading>
      {description && (
        <SectionDescription className="mx-auto mt-4 max-w-[460px]">
          {description}
        </SectionDescription>
      )}
    </div>
  )
}
