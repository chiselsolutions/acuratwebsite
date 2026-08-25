import { useId } from 'react'
import { CheckIcon } from '../icons'
import { cn } from '../../lib/cn'

/** Custom-painted checkbox — native input stays for keyboard + form semantics. */
export function Checkbox({ label, checked, onChange, className }) {
  const id = useId()

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <span className="relative mt-px flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer h-5 w-5 cursor-pointer appearance-none rounded-[5px] border border-border bg-white transition-colors checked:border-green checked:bg-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
        />
        <CheckIcon
          size={13}
          className="pointer-events-none absolute text-white opacity-0 peer-checked:opacity-100"
        />
      </span>
      <label
        htmlFor={id}
        className="cursor-pointer text-[14px] leading-snug text-ink select-none"
      >
        {label}
      </label>
    </div>
  )
}
