import { Suspense } from 'react'
import { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { articlesQuery, categoriesQuery } from '@/sanity/lib/queries'
import { BlogClientIndex } from '@/components/blog/BlogClientIndex'
import { Container } from '@/components/shared/Container'
import { SITE_URL } from '@/lib/site'

type PostListItem = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  cardLayout?: 'standard' | 'featured'
  coverImage?: { asset: object; alt?: string; hotspot?: object; crop?: object }
  author?: { name: string; image?: object; role?: string }
  categories?: { title: string; slug: { current: string } }[]
}

type CategoryListItem = {
  _id: string
  title: string
  slug: { current: string }
}

export const metadata: Metadata = {
  title: 'Blog | DeployTitan',
  description:
    'Engineering notes on release coordination, developer tooling, AI-assisted work, and the systems that keep teams shipping.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
}

export default async function BlogPage() {
  const [{ data: postsRaw }, { data: catsRaw }] = await Promise.all([
    sanityFetch({ query: articlesQuery }),
    sanityFetch({ query: categoriesQuery }),
  ])

  const posts = (postsRaw as PostListItem[] | null) ?? []
  const categories = (catsRaw as CategoryListItem[] | null) ?? []

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid border-b border-line pt-28 pb-16">
        <Container width="4xl" padding="default">
          <p className="mb-3 font-mono text-[10px] tracking-widest uppercase text-primary-accessible">
            Blog
          </p>
          <h1 className="mb-4 text-4xl font-semibold leading-tight text-ink lg:text-5xl">
            Engineering insights.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-ink-secondary">
            Notes on release coordination, developer tooling, AI-assisted work, and the systems
            that keep teams shipping.
          </p>
        </Container>
      </section>

      {/* Client-side filter + posts — Suspense required for useSearchParams */}
      <Suspense
        fallback={
          <div className="py-20">
            <Container width="6xl" padding="default">
              <p className="font-mono text-[10px] tracking-widest uppercase text-ink-quaternary">
                Loading…
              </p>
            </Container>
          </div>
        }
      >
        <BlogClientIndex posts={posts} categories={categories} />
      </Suspense>
    </>
  )
}
