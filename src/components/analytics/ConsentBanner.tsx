'use client'

import { useEffect, useState } from 'react'
import { ANALYTICS_CONSENT_COOKIE, type AnalyticsConsentState } from '@/lib/consent'

type ConsentBannerProps = {
  initialState: AnalyticsConsentState
}

function persistConsent(nextState: Exclude<AnalyticsConsentState, 'unset'>) {
  document.cookie = `${ANALYTICS_CONSENT_COOKIE}=${nextState}; Path=/; Max-Age=31536000; SameSite=Lax`
  try {
    localStorage.setItem(ANALYTICS_CONSENT_COOKIE, nextState)
  } catch {
    // Some browsers block localStorage; the cookie is enough for consent persistence.
  }
}

export function ConsentBanner({ initialState }: ConsentBannerProps) {
  const [state, setState] = useState<AnalyticsConsentState>(initialState)

  useEffect(() => {
    if (initialState !== 'unset') return
    try {
      const stored = localStorage.getItem(ANALYTICS_CONSENT_COOKIE)
      if (stored === 'granted' || stored === 'denied') {
        setState(stored)
      }
    } catch {
      // Some browsers block localStorage; keep the server-provided cookie state.
    }
  }, [initialState])

  if (state !== 'unset') return null

  return (
    <div className="fixed right-4 bottom-4 z-[70] max-w-md rounded-[2px] border border-line bg-surface px-5 py-4 shadow-[0_14px_40px_rgba(26,21,18,0.16)]">
      <p className="text-sm font-semibold text-ink">Analytics consent</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
        We use optional analytics to improve the site. No tracking unless you accept.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            persistConsent('denied')
            setState('denied')
          }}
          className="rounded-[2px] border border-line px-3 py-2 text-sm text-ink-secondary transition-colors hover:border-primary/30 hover:text-ink"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => {
            persistConsent('granted')
            setState('granted')
            window.location.reload()
          }}
          className="rounded-[2px] border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-primary-accessible transition-colors hover:border-primary/50 hover:text-primary"
        >
          Accept analytics
        </button>
      </div>
    </div>
  )
}
