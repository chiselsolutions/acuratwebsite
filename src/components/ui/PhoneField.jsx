import { forwardRef, useCallback, useId, useMemo, useRef, useState } from 'react'
import PhoneInputWithCountry, {
  getCountryCallingCode,
} from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import { cn } from '../../lib/cn'
import { CheckIcon, ChevronDownIcon, GlobeIcon } from '../icons'
import { FieldError, FieldLabel } from './Field'
import { PANEL_BASE, optionState, useDropUp } from './Select'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

/** Countries floated to the top of the list — Acurat's core + offshore markets. */
const PREFERRED = ['US', 'CA', 'GB', 'IN', 'PH', 'AU']

function Flag({ country, countryName, className }) {
  const Component = flags[country]
  if (!Component) {
    return <GlobeIcon size={16} className={cn('text-ink-tertiary', className)} />
  }
  return (
    <Component
      title={countryName}
      className={cn('h-3.5 w-5 shrink-0 rounded-[2px] object-cover ring-1 ring-black/10', className)}
    />
  )
}

/**
 * Country picker rendered into `react-phone-number-input`.
 *
 * The library hands us `{ value, onChange, options, … }`; everything visual is
 * ours, so the list uses the same brand tokens as the rest of the form. With
 * ~250 entries a filter box is the difference between usable and not.
 */
function CountrySelect({
  value,
  onChange,
  options,
  disabled,
  readOnly,
  name,
  onFocus,
  onBlur,
  // `iconComponent` is the library's own flag renderer and the generic
  // `aria-label` its default copy — we supply both ourselves, and neither is a
  // valid DOM attribute, so they must not reach the <button>.
  iconComponent: _iconComponent,
  'aria-label': _ariaLabel,
}) {
  const id = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const wrapperRef = useRef(null)
  const triggerRef = useRef(null)
  const listRef = useRef(null)

  const dropUp = useDropUp(triggerRef, isOpen, 300)
  const close = useCallback(() => {
    setIsOpen(false)
    setQuery('')
  }, [])
  useOnClickOutside(wrapperRef, close, isOpen)

  // Drop the library's "International" entry, then float preferred countries up.
  const countries = useMemo(() => {
    const real = options.filter((option) => option.value)
    const rank = (code) => {
      const index = PREFERRED.indexOf(code)
      return index === -1 ? PREFERRED.length : index
    }
    return [...real].sort(
      (a, b) => rank(a.value) - rank(b.value) || a.label.localeCompare(b.label),
    )
  }, [options])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return countries
    return countries.filter(
      (country) =>
        country.label.toLowerCase().includes(term) ||
        country.value.toLowerCase().startsWith(term) ||
        `+${getCountryCallingCode(country.value)}`.startsWith(term),
    )
  }, [countries, query])

  const selected = countries.find((country) => country.value === value)

  const commit = (country) => {
    if (!country) return
    onChange(country.value)
    close()
    triggerRef.current?.focus()
  }

  const handleListKeyDown = (event) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault()
        close()
        triggerRef.current?.focus()
        break
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
        break
      case 'Enter':
        event.preventDefault()
        commit(filtered[activeIndex])
        break
      default:
    }
  }

  return (
    // Deliberately not `relative`: the panel anchors to the phone field box
    // above it so it spans the full control width, not just the flag button.
    <div ref={wrapperRef} className="flex items-stretch">
      <button
        ref={triggerRef}
        type="button"
        name={name}
        disabled={disabled || readOnly}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Country code${selected ? `: ${selected.label}` : ''}`}
        onClick={() => {
          setActiveIndex(Math.max(filtered.findIndex((c) => c.value === value), 0))
          setIsOpen((open) => !open)
        }}
        className="flex shrink-0 cursor-pointer items-center gap-1 rounded-l-[10px] pr-2 pl-3 transition-colors hover:bg-light focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-green disabled:cursor-not-allowed"
      >
        <Flag country={value} countryName={selected?.label} />
        <ChevronDownIcon
          size={14}
          className={cn(
            'text-ink-tertiary transition-transform duration-150',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {/* Static dial code, sitting between the flag and the number input */}
      {value && (
        <span className="pointer-events-none flex select-none items-center pr-1 text-[15px] font-medium text-ink-secondary">
          +{getCountryCallingCode(value)}
        </span>
      )}

      {isOpen && (
        <div
          className={cn(
            PANEL_BASE,
            // Anchored to the whole phone field (its box is the positioned
            // ancestor), so the panel is exactly as wide as the input.
            'inset-x-0 flex flex-col overflow-hidden',
            dropUp ? 'bottom-full mb-1.5' : 'top-full mt-1.5',
          )}
          onKeyDown={handleListKeyDown}
        >
          <div className="shrink-0 border-b border-border bg-white px-2.5 pt-2 pb-2">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setActiveIndex(0)
              }}
              placeholder="Search country or code"
              aria-label="Search countries"
              className="h-9 w-full rounded-lg border border-border bg-white px-3 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-tertiary/70 focus:border-green focus:ring-2 focus:ring-green/15"
            />
          </div>

          {/* The only scroll container in the panel. */}
          <ul role="listbox" id={id} ref={listRef} className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-3.5 py-3 text-[13px] text-ink-tertiary">
                No countries match “{query}”.
              </li>
            )}
            {filtered.map((country, index) => {
              const isSelected = country.value === value
              return (
                <li key={country.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={-1}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => commit(country)}
                    className={optionState(index === activeIndex, isSelected)}
                  >
                    <Flag country={country.value} countryName={country.label} />
                    <span className="flex-1 truncate">{country.label}</span>
                    <span className="shrink-0 text-ink-tertiary">
                      +{getCountryCallingCode(country.value)}
                    </span>
                    {isSelected && <CheckIcon size={15} className="shrink-0" />}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

/** Bare input — the surrounding box is drawn by PhoneField itself. */
const PhoneTextInput = forwardRef(function PhoneTextInput({ className, ...rest }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full min-w-0 rounded-r-[10px] bg-transparent pr-3.5 pl-1 text-[15px] text-ink outline-none placeholder:text-ink-tertiary/70',
        className,
      )}
      {...rest}
    />
  )
})

/**
 * Phone number field backed by `react-phone-number-input` (libphonenumber-js),
 * so numbers are parsed, formatted as you type and validated per country.
 *
 * `value` is E.164 (e.g. `+12015550123`) — the format the API should receive.
 * The country dial code is rendered as its own static segment to match the
 * design, so the input itself only holds the national number.
 */
export function PhoneField({
  label = 'Phone number',
  required,
  error,
  value,
  onChange,
  country,
  onCountryChange,
  className,
}) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className={className}>
      <FieldLabel htmlFor={id} label={label} required={required} />

      <div
        className={cn(
          // `relative` makes this box the anchor for the country panel below.
          'relative flex h-12 items-stretch rounded-[10px] border border-border bg-white transition-colors duration-150',
          'focus-within:border-green focus-within:ring-2 focus-within:ring-green/15',
          error && 'border-danger focus-within:border-danger focus-within:ring-danger/15',
        )}
      >
        <PhoneInputWithCountry
          id={id}
          value={value}
          onChange={(next) => onChange(next ?? '')}
          defaultCountry={country}
          onCountryChange={(next) => onCountryChange?.(next ?? 'US')}
          international={false}
          addInternationalOption={false}
          countrySelectComponent={CountrySelect}
          inputComponent={PhoneTextInput}
          numberInputProps={{
            'aria-invalid': error ? 'true' : undefined,
            'aria-describedby': error ? errorId : undefined,
          }}
          autoComplete="tel"
          className="flex flex-1 items-stretch"
        />
      </div>

      <FieldError id={errorId}>{error}</FieldError>
    </div>
  )
}
