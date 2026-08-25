import { useId } from 'react'
import { cn } from '../../lib/cn'
import { InfoIcon } from '../icons'

/* ─────────────────────────────────────────────────────────────
   Shared control chrome so inputs, the Select trigger and the
   phone field all sit on exactly the same box.
   ───────────────────────────────────────────────────────────── */
export const CONTROL =
  'w-full rounded-[10px] border border-border bg-white px-3.5 text-[15px] text-ink ' +
  'h-12 outline-none transition-colors duration-150 ' +
  'placeholder:text-ink-tertiary/70 ' +
  'focus:border-green focus:ring-2 focus:ring-green/15 ' +
  'disabled:cursor-not-allowed disabled:bg-light'

export const INVALID = 'border-danger focus:border-danger focus:ring-danger/15'

/** Label row: text, required marker and an optional info tooltip. */
export function FieldLabel({ htmlFor, label, required, hint }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-center gap-1.5 text-[14px] font-semibold text-dark"
    >
      <span>
        {label}
        {required && (
          <span className="ml-0.5 text-danger" aria-hidden="true">
            *
          </span>
        )}
      </span>
      {hint && (
        <span className="group relative inline-flex" tabIndex={0}>
          <InfoIcon size={14} className="text-ink-tertiary" />
          <span
            role="tooltip"
            className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-52 -translate-x-1/2 rounded-lg bg-dark px-3 py-2 text-[12px] leading-snug font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100"
          >
            {hint}
          </span>
        </span>
      )}
    </label>
  )
}

export function FieldError({ id, children }) {
  if (!children) return null
  return (
    <p id={id} className="mt-1.5 text-[12px] font-semibold text-danger">
      {children}
    </p>
  )
}

export function TextField({
  label,
  required,
  hint,
  error,
  className,
  as = 'input',
  ...rest
}) {
  const id = useId()
  const errorId = `${id}-error`
  const Tag = as

  return (
    <div className={className}>
      <FieldLabel htmlFor={id} label={label} required={required} hint={hint} />
      <Tag
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          CONTROL,
          as === 'textarea' && 'h-auto min-h-24 resize-y py-3 leading-relaxed',
          error && INVALID,
        )}
        {...rest}
      />
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  )
}
