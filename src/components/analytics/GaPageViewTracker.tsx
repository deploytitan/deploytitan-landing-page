'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type GaPageViewTrackerProps = {
  measurementId: string
}

export function GaPageViewTracker({ measurementId }: GaPageViewTrackerProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (!measurementId || typeof window === 'undefined' || typeof window.gtag !== 'function') {
      return
    }

    const page_location = window.location.href
    const page_path = `${pathname}${window.location.search}`
    const page_title = document.title

    window.gtag('event', 'page_view', {
      page_title,
      page_location,
      page_path,
      send_to: measurementId,
    })
  }, [measurementId, pathname])

  return null
}
