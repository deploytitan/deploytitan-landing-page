export const ANALYTICS_CONSENT_COOKIE = 'dt_analytics_consent'

export type AnalyticsConsentState = 'granted' | 'denied' | 'unset'

export function parseAnalyticsConsent(cookieValue?: string | null): AnalyticsConsentState {
  if (cookieValue === 'granted' || cookieValue === 'denied') return cookieValue
  return 'unset'
}

export function hasGrantedAnalyticsConsent(cookieValue?: string | null) {
  return parseAnalyticsConsent(cookieValue) === 'granted'
}
