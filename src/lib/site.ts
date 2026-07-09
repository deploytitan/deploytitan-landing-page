export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://deploytitan.com'
export const SITE_NAME = 'DeployTitan'
export const SITE_DESCRIPTION =
  'Practical AI delivery research, products, and consulting for startups and scaleups that need to move faster, verify more, and ship safer.'
export const SITE_OG_DESCRIPTION =
  'Guidance for AI-adopting engineering teams facing review, verification, throughput, and deployment bottlenecks.'
export const SITE_OG_IMAGE = `${SITE_URL}/favicon.svg`
export const ORGANIZATION_NAME = 'DeployTitan'
export const ORGANIZATION_LEGAL_NAME = 'ASTRALFORGE LABS LLP'
export const ORGANIZATION_LOGO = `${SITE_URL}/favicon.svg`
export const ORGANIZATION_SAME_AS = [
  'https://x.com/deploytitan',
  'https://www.linkedin.com/company/deploytitan',
]

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString()
}

export function isProductionSite() {
  return process.env.VERCEL_ENV === 'production' || SITE_URL === 'https://deploytitan.com'
}
