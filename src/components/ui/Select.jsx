import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { cn } from '../../lib/cn'
import { CheckIcon, ChevronDownIcon } from '../icons'
import { FieldError, FieldLabel } from './Field'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

/* ─────────────────────────────────────────────────────────────
   Shared dropdown chrome.
   A native <select> renders its option list with OS styling that
   CSS cannot touch, so both this control and the phone country
   picker paint their own list using these brand-token classes.
   ───────────────────────────────────────────────────────────── */

/**
 * Panel shell only — no height cap and no scrolling.
 *
 * Whichever element actually holds the options owns the scrollbar. Putting
 * `overflow-y-auto` here as well would give a panel with a scrolling list two
 * nested scrollbars.
 */
export const PANEL_BASE =
  'absolute z-50 rounded-xl border border-border bg-white ' +
  'shadow-[0_16px_40px_rgba(10,26,20,0.16)]'

/** Panel whose own box scrolls — used when the options are its direct children. */
export const PANEL_CLASS = `${PANEL_BASE} max-h-64 w-full min-w-[220px] overflow-y-auto py-1.5`

export const OPTION_CLASS =
  'flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2 text-left text-[14px] transition-colors'

/** Active = keyboard cursor, selected = current value. */
export function optionState(isActive, isSelected) {
  return cn(
    OPTION_CLASS,
    isSelected ? 'font-semibold text-green' : 'text-ink',
    isActive && 'bg-green-faint',
  )
}

export const TRIGGER_CLASS =
  'flex h-12 w-full cursor-pointer items-center gap-2 rounded-[10px] border border-border bg-white ' +
  'px-3.5 text-left text-[15px] outline-none transition-colors duration-150 ' +
  'hover:border-ink-tertiary/50 ' +
  'focus-visible:border-green focus-visible:ring-2 focus-visible:ring-green/15'

/**
 * Decides whether the panel opens downward or upward so it stays on screen —
 * matters inside the demo modal, where the last row sits near the fold.
 */
export function useDropUp(triggerRef, isOpen, estimatedHeight = 264) {
  const [dropUp, setDropUp] = useState(false)

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    setDropUp(spaceBelow < estimatedHeight && rect.top > spaceBelow)
  }, [isOpen, triggerRef, estimatedHeight])

  return dropUp
}

/** Normalises `['A', 'B']` and `[{ value, label }]` into the object form. */
function normalise(options) {
  return options.map((option) =>
    typeof option === 'string' ? { value: option, label: option } : option,
  )
}

/**
 * Accessible single-select listbox styled with the site tokens.
 *
 * Keyboard: Enter/Space/ArrowDown opens, arrows + Home/End move the cursor,
 * Enter/Space selects, Escape closes, and typing jumps to a matching option.
 */
export function Select({
  label,
  required,
  hint,
  error,
  placeholder = 'Select…',
  options = [],
  value,
  onChange,
  name,
  className,
  disabled = false,
  isLoading = false,
}) {
  const id = useId()
  const listId = `${id}-list`
  const errorId = `${id}-error`

  const items = normalise(options)
  const selectedIndex = items.findIndex((item) => item.value === value)
  const selected = selectedIndex >= 0 ? items[selectedIndex] : null

  // Nothing to open while the options are still being fetched.
  const isInert = disabled || isLoading || items.length === 0

  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(Math.max(selectedIndex, 0))

  const wrapperRef = useRef(null)
  const triggerRef = useRef(null)
  const listRef = useRef(null)
  const typeBuffer = useRef({ text: '', timer: null })

  const dropUp = useDropUp(triggerRef, isOpen)

  const close = useCallback(() => setIsOpen(false), [])
  useOnClickOutside(wrapperRef, close, isOpen)

  const open = () => {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
    setIsOpen(true)
  }

  const commit = (index) => {
    const item = items[index]
    if (!item) return
    onChange(item.value)
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  // Keep the keyboard cursor inside the scroll viewport.
  useEffect(() => {
    if (!isOpen || !listRef.current) return
    listRef.current
      .querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [isOpen, activeIndex])

  const jumpToTyped = (char) => {
    clearTimeout(typeBuffer.current.timer)
    typeBuffer.current.text += char.toLowerCase()
    typeBuffer.current.timer = setTimeout(() => {
      typeBuffer.current.text = ''
    }, 600)

    const match = items.findIndex((item) =>
      item.label.toLowerCase().startsWith(typeBuffer.current.text),
    )
    if (match >= 0) {
      setActiveIndex(match)
      if (!isOpen) commit(match)
    }
  }

  const handleKeyDown = (event) => {
    const { key } = event

    if (!isOpen) {
      if (key === 'Enter' || key === ' ' || key === 'ArrowDown' || key === 'ArrowUp') {
        event.preventDefault()
        open()
      } else if (key.length === 1 && /\S/.test(key)) {
        jumpToTyped(key)
      }
      return
    }

    switch (key) {
      case 'Escape':
        event.preventDefault()
        setIsOpen(false)
        break
      case 'Tab':
        setIsOpen(false)
        break
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, items.length - 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
        break
      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        event.preventDefault()
        setActiveIndex(items.length - 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        commit(activeIndex)
        break
      default:
        if (key.length === 1 && /\S/.test(key)) jumpToTyped(key)
    }
  }

  return (
    <div className={className}>
      <FieldLabel htmlFor={id} label={label} required={required} hint={hint} />

      <div ref={wrapperRef} className="relative">
        <button
          ref={triggerRef}
          id={id}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listId : undefined}
          aria-activedescendant={isOpen ? `${id}-opt-${activeIndex}` : undefined}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-busy={isLoading || undefined}
          disabled={isInert}
          onClick={() => (isOpen ? setIsOpen(false) : open())}
          onKeyDown={handleKeyDown}
          className={cn(
            TRIGGER_CLASS,
            isOpen && 'border-green ring-2 ring-green/15',
            error && 'border-danger focus-visible:border-danger focus-visible:ring-danger/15',
            isInert && 'cursor-not-allowed bg-light hover:border-border',
          )}
        >
          <span
            className={cn(
              'flex-1 truncate',
              selected ? 'text-ink' : 'text-ink-tertiary/70',
            )}
          >
            {isLoading ? 'Loading…' : selected ? selected.label : placeholder}
          </span>
          {isLoading ? (
            <span
              aria-hidden="true"
              className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-border border-t-green"
            />
          ) : (
            <ChevronDownIcon
              size={18}
              className={cn(
                'shrink-0 text-ink-secondary transition-transform duration-150',
                isOpen && 'rotate-180',
              )}
            />
          )}
        </button>

        {/* Mirrors the value for uncontrolled form serialisation. */}
        {name && <input type="hidden" name={name} value={value ?? ''} />}

        {isOpen && (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={id}
            className={cn(PANEL_CLASS, dropUp ? 'bottom-full mb-1.5' : 'top-full mt-1.5')}
          >
            {items.map((item, index) => {
              const isSelected = item.value === value
              return (
                <li key={item.value}>
                  <button
                    type="button"
                    id={`${id}-opt-${index}`}
                    data-index={index}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={-1}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => commit(index)}
                    className={optionState(index === activeIndex, isSelected)}
                  >
                    <span className="flex-1 truncate">{item.label}</span>
                    {isSelected && <CheckIcon size={15} className="shrink-0" />}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <FieldError id={errorId}>{error}</FieldError>
    </div>
  )
}
