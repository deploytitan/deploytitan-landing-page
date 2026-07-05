'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

type PosthogInitProps = {
  apiKey: string
  apiHost: string
}

declare global {
  interface Window {
    __deployTitanPosthogInitialized?: boolean
  }
}

export function PosthogInit({ apiKey, apiHost }: PosthogInitProps) {
  useEffect(() => {
    if (!apiKey || !apiHost || typeof window === 'undefined') {
      return
    }

    if (!window.__deployTitanPosthogInitialized) {
      posthog.init(apiKey, {
        api_host: apiHost,
        capture_pageview: true,
        capture_pageleave: true,
        persistence: 'localStorage+cookie',
        person_profiles: 'identified_only',
      })
      window.__deployTitanPosthogInitialized = true
    }

    posthog.opt_in_capturing()
  }, [apiHost, apiKey])

  return null
}
