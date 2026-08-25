import { useEffect } from 'react'

/** Calls `handler` when a pointer press or Escape lands outside `ref`. */
export function useOnClickOutside(ref, handler, active = true) {
  useEffect(() => {
    if (!active) return

    const onPointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) handler(event)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') handler(event)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [ref, handler, active])
}
