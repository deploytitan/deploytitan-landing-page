import { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { postsQuery } from '@/sanity/lib/queries'
import { PostCard } from '@/components/blog/PostCard'
import { Container } from '@/components/shared/Container'

type PostListItem = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  coverImage?: { asset: object; alt?: string; hotspot?: object; crop?: object }
  author?: { name: string; image?: object; role?: string }
  categories?: { title: string; slug: { current: string } }[]
}

export const metadata: Metadata = {
  title: 'Blog | DeployTitan',
  description:
    'Engineering insights on progressive delivery, release safety, and deployment best practices from the DeployTitan team.',
}

export default async function BlogPage() {
  const { data: postsRaw } = await sanityFetch({ query: postsQuery })
  const posts = postsRaw as PostListItem[] | null

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid border-line border-b pt-28 pb-16">
        <Container width="4xl" padding="default">
          <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">Blog</p>
          <h1 className="text-ink mb-4 text-4xl leading-tight font-semibold lg:text-5xl">
            Engineering insights.
          </h1>
          <p className="text-ink-secondary max-w-xl text-lg leading-relaxed">
            Progressive delivery, release safety, and deployment best practices from the DeployTitan
            team.
          </p>
        </Container>
      </section>

      {/* Post grid */}
      <section className="py-20">
        <Container width="6xl" padding="default">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-ink-tertiary font-mono text-sm">No posts published yet.</p>
              <p className="text-ink-tertiary mt-1 text-sm">Check back soon.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
