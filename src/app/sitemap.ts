import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { articleSlugsQuery } from '@/sanity/lib/queries'
import { generatedNodes } from '@/data/siteGraph.generated'

const BASE_URL = 'https://deploytitan.com'

type SitemapEntryDefaults = Pick<MetadataRoute.Sitemap[number], 'changeFrequency' | 'priority'>

const routeOverrides = new Map<string, SitemapEntryDefaults>([
  ['/', { changeFrequency: 'weekly', priority: 1.0 }],
  ['/products/titan-rollout', { changeFrequency: 'monthly', priority: 0.9 }],
  ['/products/titan-foresight', { changeFrequency: 'monthly', priority: 0.9 }],
  ['/products/titan-phoenix', { changeFrequency: 'monthly', priority: 0.9 }],
  ['/solutions/release-coordination', { changeFrequency: 'monthly', priority: 0.9 }],

  ['/docs', { changeFrequency: 'weekly', priority: 0.8 }],
  ['/blog', { changeFrequency: 'weekly', priority: 0.8 }],
  ['/status', { changeFrequency: 'always', priority: 0.5 }],
  ['/sitemap', { changeFrequency: 'monthly', priority: 0.3 }],
  ['/terms', { changeFrequency: 'yearly', priority: 0.3 }],
  ['/privacy', { changeFrequency: 'yearly', priority: 0.3 }],
])

function getRouteDefaults(route: string): SitemapEntryDefaults {
  const override = routeOverrides.get(route)
  if (override) return override

  if (route.startsWith('/products/')) return { changeFrequency: 'monthly', priority: 0.8 }
  if (route === '/solutions') return { changeFrequency: 'monthly', priority: 0.8 }
  if (route.startsWith('/solutions/')) return { changeFrequency: 'monthly', priority: 0.7 }
  if (route.startsWith('/for/')) return { changeFrequency: 'monthly', priority: 0.7 }
  if (route === '/api-reference' || route === '/cli') return { changeFrequency: 'monthly', priority: 0.7 }
  if (route === '/how-it-works') return { changeFrequency: 'monthly', priority: 0.6 }
  if (route === '/about') return { changeFrequency: 'monthly', priority: 0.6 }
  if (route === '/journey') return { changeFrequency: 'monthly', priority: 0.5 }
  if (route === '/contact') return { changeFrequency: 'monthly', priority: 0.6 }
  if (route === '/security') return { changeFrequency: 'monthly', priority: 0.6 }
  if (route.startsWith('/blog/')) return { changeFrequency: 'weekly', priority: 0.7 }

  return { changeFrequency: 'monthly', priority: 0.5 }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const staticRoutes = generatedNodes.map(({ id }) => ({
    url: `${BASE_URL}${id}`,
    lastModified: now,
    ...getRouteDefaults(id),
  }))

  // Fetch published blog article slugs from Sanity
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const slugs = await client.fetch<{ slug: string }[]>(articleSlugsQuery)
    blogRoutes = (slugs ?? []).map(({ slug }) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: now,
      ...getRouteDefaults(`/blog/${slug}`),
    }))
  } catch {
    // Sanity unreachable at build time — skip blog article URLs gracefully
  }

  return [
    ...staticRoutes,
    ...blogRoutes,
  ]
}
