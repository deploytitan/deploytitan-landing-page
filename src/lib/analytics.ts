'use client'

import posthog from 'posthog-js'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(name: string, payload: Record<string, unknown>) {
  posthog.capture(name, payload)
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, payload)
  }
}
