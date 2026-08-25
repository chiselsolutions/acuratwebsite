import { useEffect, useRef, useState } from 'react'

/**
 * Types out an array of `{ text, accent }` segments one character at a time.
 *
 * Returns the segments truncated to however much has been typed so far, so the
 * caller can render each piece with its own styling instead of injecting HTML.
 * Respects `prefers-reduced-motion` by rendering the full headline immediately.
 *
 * @param {{ text: string, accent?: boolean }[]} segments
 * @param {{ startDelay?: number, speed?: number, accentSpeed?: number }} options
 */
export function useTypewriter(segments, options = {}) {
  const { startDelay = 600, speed = 35, accentSpeed = 70 } = options

  const totalChars = segments.reduce((sum, s) => sum + s.text.length, 0)
  const [typedCount, setTypedCount] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    // No matchMedia (non-browser render) → skip the animation rather than throw.
    const reduceMotion =
      typeof window === 'undefined' ||
      (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? true)

    if (reduceMotion) {
      setTypedCount(totalChars)
      return
    }

    let count = 0

    /** Per-character delay depends on which segment that character falls in. */
    const delayForIndex = (index) => {
      let offset = 0
      for (const segment of segments) {
        offset += segment.text.length
        if (index < offset) return segment.accent ? accentSpeed : speed
      }
      return speed
    }

    const tick = () => {
      count += 1
      setTypedCount(count)
      if (count < totalChars) {
        timerRef.current = setTimeout(tick, delayForIndex(count))
      }
    }

    timerRef.current = setTimeout(tick, startDelay)
    return () => clearTimeout(timerRef.current)
  }, [segments, totalChars, startDelay, speed, accentSpeed])

  // Slice the segments down to the number of characters typed so far.
  let remaining = typedCount
  const visible = segments.map((segment) => {
    const take = Math.max(0, Math.min(segment.text.length, remaining))
    remaining -= take
    return { ...segment, text: segment.text.slice(0, take) }
  })

  return { visible, isDone: typedCount >= totalChars }
}
