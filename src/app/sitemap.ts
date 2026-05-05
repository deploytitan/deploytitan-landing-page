import type { MetadataRoute } from 'next'

const BASE_URL = 'https://deploytitan.com'

/**
 * Static pages with their change frequency and priority.
 * Dynamic routes (e.g. /integrations/[slug]) would need to be
 * expanded here once slug data is available.
 */
const staticRoutes: Array<{
  url: string
  lastModified?: Date
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency']
  priority?: number
}> = [
  // Home
  { url: '/',              changeFrequency: 'weekly',  priority: 1.0 },

  // Products
  { url: '/products/titan-rollout',   changeFrequency: 'monthly', priority: 0.9 },
  { url: '/products/titan-shield',    changeFrequency: 'monthly', priority: 0.9 },
  { url: '/products/titan-foresight', changeFrequency: 'monthly', priority: 0.9 },
  { url: '/products/titan-ledger',    changeFrequency: 'monthly', priority: 0.9 },
  { url: '/products/titan-phoenix',   changeFrequency: 'monthly', priority: 0.9 },
  { url: '/products/titan-insight',   changeFrequency: 'monthly', priority: 0.7 },
  { url: '/products/titan-sandbox',   changeFrequency: 'monthly', priority: 0.7 },

  // Solutions
  { url: '/solutions',                        changeFrequency: 'monthly', priority: 0.8 },
  { url: '/solutions/progressive-delivery',   changeFrequency: 'monthly', priority: 0.8 },
  { url: '/solutions/multi-cloud-resilience', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/solutions/risk-intelligence',      changeFrequency: 'monthly', priority: 0.8 },
  { url: '/solutions/platform-engineering',   changeFrequency: 'monthly', priority: 0.8 },

  // Personas
  { url: '/for/sre',    changeFrequency: 'monthly', priority: 0.7 },
  { url: '/for/devops', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/for/cto',    changeFrequency: 'monthly', priority: 0.7 },

  // Developer
  { url: '/docs',          changeFrequency: 'weekly',  priority: 0.8 },
  { url: '/api-reference', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/cli',           changeFrequency: 'monthly', priority: 0.7 },
  { url: '/integrations',  changeFrequency: 'weekly',  priority: 0.7 },
  { url: '/roadmap',       changeFrequency: 'weekly',  priority: 0.7 },
  { url: '/changelog',     changeFrequency: 'weekly',  priority: 0.6 },
  { url: '/how-it-works',  changeFrequency: 'monthly', priority: 0.6 },

  // Resources
  { url: '/blog',          changeFrequency: 'weekly',  priority: 0.7 },
  { url: '/customers',     changeFrequency: 'monthly', priority: 0.7 },
  { url: '/pricing',       changeFrequency: 'monthly', priority: 0.8 },
  { url: '/early-access',  changeFrequency: 'monthly', priority: 0.8 },
  { url: '/status',        changeFrequency: 'always',  priority: 0.5 },
  { url: '/sitemap',       changeFrequency: 'monthly', priority: 0.3 },

  // Company
  { url: '/about',    changeFrequency: 'monthly', priority: 0.6 },
  { url: '/journey',  changeFrequency: 'monthly', priority: 0.5 },
  { url: '/careers',  changeFrequency: 'weekly',  priority: 0.6 },
  { url: '/contact',  changeFrequency: 'monthly', priority: 0.6 },
  { url: '/partners', changeFrequency: 'monthly', priority: 0.5 },
  { url: '/press',    changeFrequency: 'monthly', priority: 0.5 },
  { url: '/brand',    changeFrequency: 'yearly',  priority: 0.3 },

  // Trust & Compliance
  { url: '/security', changeFrequency: 'monthly', priority: 0.6 },

  // Legal
  { url: '/terms',   changeFrequency: 'yearly', priority: 0.3 },
  { url: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map(({ url, ...rest }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    ...rest,
  }))
}
