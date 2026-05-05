import { Metadata } from 'next'
import React from 'react'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { postsQuery } from '@/sanity/lib/queries'
import { PostCard } from '@/components/blog/PostCard'
import { Container } from '@/components/shared/Container'

type PostListItem = React.ComponentProps<typeof PostCard>['post']

export const metadata: Metadata = {
  title: 'Blog | DeployTitan',
  description: 'Engineering insights on progressive delivery, release safety, and deployment best practices from the DeployTitan team.',
}

export default async function BlogPage() {
  const { data: posts } = await sanityFetch<PostListItem[]>({ query: postsQuery })

  return (
    <>
      <SanityLive />

      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-16 border-b border-line">
        <Container width="4xl" padding="default">
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">Blog</p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-4">
            Engineering insights.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-xl">
            Progressive delivery, release safety, and deployment best practices from the
            DeployTitan team.
          </p>
        </Container>
      </section>

      {/* Post grid */}
      <section className="py-20">
        <Container width="6xl" padding="default">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="font-mono text-sm text-ink-quaternary">No posts published yet.</p>
              <p className="text-sm text-ink-tertiary mt-1">Check back soon.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
