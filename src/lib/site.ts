export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://deploytitan.com'
export const SITE_NAME = 'DeployTitan'
export const SITE_DESCRIPTION =
  'Coordinate complex multi-service releases, reduce freeze window chaos, and avoid painful rollback incidents. Release coordination and deployment safety for distributed systems.'
export const SITE_OG_DESCRIPTION =
  'Coordinate multi-service releases safely across teams and environments. Release DAGs, freeze windows, rollback coordination, and deployment visibility.'
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
