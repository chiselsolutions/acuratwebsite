import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const DemoModalContext = createContext(null)

/**
 * Single source of truth for the "Request a Demo" modal.
 *
 * Every CTA on the page (nav, hero, footer CTA band) triggers the same modal,
 * so its open state lives in context rather than being threaded through props.
 */
export function DemoModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback((event) => {
    event?.preventDefault()
    setIsOpen(true)
  }, [])

  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])

  return <DemoModalContext.Provider value={value}>{children}</DemoModalContext.Provider>
}

export function useDemoModal() {
  const context = useContext(DemoModalContext)
  if (!context) {
    throw new Error('useDemoModal must be used inside <DemoModalProvider>')
  }
  return context
}
