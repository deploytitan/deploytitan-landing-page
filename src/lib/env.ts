export const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || 'https://demo.deploytitan.com'

// Primary conversion CTA — send prospects to the in-site waitlist form.
export const WAITLIST_URL = process.env.NEXT_PUBLIC_WAITLIST_URL || '/waitlist'

// Browser forms submit to internal routes so provider credentials stay server-side.
export const FORM_ENDPOINT = '/api/waitlist'

export const NEWSLETTER_API_PATH = '/api/newsletter'
export const NEWSLETTER_PROVIDER = process.env.NEXT_PUBLIC_NEWSLETTER_PROVIDER || 'hubspot'

