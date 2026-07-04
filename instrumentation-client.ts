import posthog from 'posthog-js'

if (
  typeof document !== 'undefined' &&
  document.cookie.split(';').some((part) => part.trim() === 'dt_analytics_consent=granted')
) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
    api_host: '/ingest',
    ui_host: 'https://us.posthog.com',
    defaults: '2026-01-30',
    capture_exceptions: true,
    debug: process.env.NODE_ENV === 'development',
  })
}
