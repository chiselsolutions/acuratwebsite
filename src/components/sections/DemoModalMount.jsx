import { Suspense, lazy, useEffect, useState } from 'react'
import { useDemoModal } from '../../context/DemoModalContext'

/**
 * The demo modal pulls in libphonenumber-js metadata and the country flag set —
 * ~100 kB gzipped that no visitor needs until they click a CTA. Splitting it out
 * keeps the landing page itself light.
 */
const RequestDemoModal = lazy(() =>
  import('./RequestDemoModal').then((module) => ({
    default: module.RequestDemoModal,
  })),
)

export function DemoModalMount() {
  const { isOpen } = useDemoModal()

  // Once loaded, keep it mounted so reopening is instant and the close
  // animation is not interrupted by an unmount.
  const [hasOpened, setHasOpened] = useState(false)
  useEffect(() => {
    if (isOpen) setHasOpened(true)
  }, [isOpen])

  if (!hasOpened) return null

  return (
    <Suspense fallback={<LoadingOverlay />}>
      <RequestDemoModal />
    </Suspense>
  )
}

/** Brief placeholder shown only on the very first open, while the chunk lands. */
function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-dark/60 backdrop-blur-[6px]">
      <span
        role="status"
        aria-label="Loading form"
        className="h-8 w-8 animate-spin rounded-full border-2 border-white/25 border-t-white"
      />
    </div>
  )
}
