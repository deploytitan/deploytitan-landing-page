// Shared environment constants — replaces `import.meta.env.VITE_*` throughout the codebase.
// In Next.js, public env vars must be prefixed NEXT_PUBLIC_. These fall back to hard-coded
// defaults so the marketing site works out-of-the-box without any .env file.

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'https://app.deploytitan.com'

export const DEMO_URL =
  process.env.NEXT_PUBLIC_DEMO_URL || 'https://demo.deploytitan.com'

export const DOCS_URL =
  process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.deploytitan.com'

export const FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT as string | undefined
