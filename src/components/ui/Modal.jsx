import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from '../icons'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { cn } from '../../lib/cn'

/**
 * Portal-rendered dialog: overlay click, Escape, scroll lock, focus restore
 * and a simple Tab focus trap.
 */
export function Modal({ isOpen, onClose, labelledBy, className, children }) {
  const panelRef = useRef(null)
  const previouslyFocused = useRef(null)

  useLockBodyScroll(isOpen)

  useEffect(() => {
    if (!isOpen) return

    previouslyFocused.current = document.activeElement

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        // Let an open popover inside the dialog (e.g. the country picker)
        // swallow the first Escape instead of dismissing the whole dialog.
        if (panelRef.current?.querySelector('[aria-expanded="true"]')) return
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusables = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused.current?.focus?.()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="fixed inset-0 z-200 flex items-start justify-center overflow-y-auto overscroll-contain bg-dark/60 p-4 backdrop-blur-[6px] sm:items-center sm:p-6"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={cn(
          'relative my-auto w-full animate-[modalIn_0.3s_ease] rounded-2xl bg-white shadow-[0_24px_64px_rgba(0,0,0,0.2)]',
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-ink-tertiary transition-colors hover:bg-light hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
        >
          <CloseIcon size={18} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
