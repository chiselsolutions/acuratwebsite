import { useCallback, useEffect, useState } from 'react'
import { fetchDemoChoices } from '../api'

/**
 * Module-level cache: the choices are the same for every visitor and never
 * change mid-session, so the request fires once no matter how many times the
 * modal is opened. `inFlight` also collapses the duplicate call that React
 * StrictMode's double-invoked effect would otherwise make in development.
 */
let cache = null
let inFlight = null

function load() {
  if (!inFlight) {
    inFlight = fetchDemoChoices()
      .then((result) => {
        if (result.ok) cache = result.choices
        return result
      })
      .finally(() => {
        inFlight = null
      })
  }
  return inFlight
}

/**
 * Fetches the demo-form dropdown options when `enabled` first becomes true.
 *
 * @returns {{ choices: object|null, isLoading: boolean, error: string, retry: () => void }}
 */
export function useDemoChoices(enabled) {
  const [choices, setChoices] = useState(cache)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const run = useCallback(async () => {
    setIsLoading(true)
    setError('')

    const result = await load()

    setIsLoading(false)
    if (result.ok) {
      setChoices(result.choices)
    } else {
      setError(result.error)
    }
  }, [])

  useEffect(() => {
    if (!enabled || cache) return
    let active = true

    setIsLoading(true)
    load().then((result) => {
      if (!active) return
      setIsLoading(false)
      if (result.ok) setChoices(result.choices)
      else setError(result.error)
    })

    return () => {
      active = false
    }
  }, [enabled])

  return { choices, isLoading, error, retry: run }
}
