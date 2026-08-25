import { useEffect } from 'react'

/**
 * Freezes page scroll while an overlay (modal / mobile menu) is open.
 * Ref-counted so the mobile menu and the demo modal can be open at the same
 * time without one unlocking the other on close.
 */
let lockCount = 0

export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return

    lockCount += 1
    document.body.style.overflow = 'hidden'

    return () => {
      lockCount -= 1
      if (lockCount === 0) document.body.style.overflow = ''
    }
  }, [locked])
}
