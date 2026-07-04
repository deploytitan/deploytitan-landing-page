import type { MetadataRoute } from 'next'
import { SITE_URL, isProductionSite } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite()) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      host: SITE_URL,
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
