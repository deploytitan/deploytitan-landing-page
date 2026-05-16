// Shared environment constants for the Next.js marketing site.
// Public vars must be prefixed NEXT_PUBLIC_. These fall back to hard-coded
// defaults so the site works out-of-the-box without any .env file.

// Console app — sign-in / sign-up destination
export const CONSOLE_URL =
  process.env.NEXT_PUBLIC_CONSOLE_URL || 'https://console.deploytitan.com'

// Legacy alias kept for any remaining references; points to console
export const APP_URL = CONSOLE_URL

export const DEMO_URL =
  process.env.NEXT_PUBLIC_DEMO_URL || 'https://demo.deploytitan.com'

// Primary conversion CTA — direct sign-up in the console
export const CREATE_ACCOUNT_URL =
  process.env.NEXT_PUBLIC_CREATE_ACCOUNT_URL ||
  'https://console.deploytitan.com/create-account'

export const DOCS_URL =
  process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.deploytitan.com'

// Google Apps Script endpoint for the footer waitlist form
export const FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT as string | undefined

// Stealth mode: hide products that are not yet validated for PMF.
// Set NEXT_PUBLIC_STEALTH_PRODUCTS=false in .env (or Vercel env vars) to reveal them.
// Defaults to true (hidden) so no accidental exposure on new deploys.
export const STEALTH_PRODUCTS =
  process.env.NEXT_PUBLIC_STEALTH_PRODUCTS !== 'false'
