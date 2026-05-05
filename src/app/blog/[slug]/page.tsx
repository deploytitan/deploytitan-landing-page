import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableTextRenderer } from '@/components/blog/PortableTextRenderer'
import { AuthorBadge } from '@/components/blog/AuthorBadge'
import { VisualEditing } from '@/components/blog/VisualEditing'
import { Container } from '@/components/shared/Container'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import Link from 'next/link'

interface PostData {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string | null
  publishedAt?: string | null
  coverImage?: { asset: object; alt?: string; hotspot?: object; crop?: object } | null
  author?: { name: string; image?: object; role?: string; bio?: string } | null
  categories?: { title: string; slug: { current: string } }[] | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[]
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { data: slugs } = await sanityFetch<{ slug: string }[]>({ query: postSlugsQuery })
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await sanityFetch<PostData | null>({ query: postBySlugQuery, params: { slug } })
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: post.coverImage?.asset
      ? { images: [{ url: urlFor(post.coverImage as object).width(1200).height(630).url() }] }
      : undefined,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const { data: post } = await sanityFetch<PostData | null>({ query: postBySlugQuery, params: { slug } })
  const { isEnabled: isDraft } = await draftMode()

  if (!post) notFound()

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <>
      <SanityLive />
      {isDraft && <VisualEditing />}

      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-12 border-b border-line">
        <Container width="3xl" padding="default">
          <Breadcrumbs className="mb-6" />

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat: { title: string; slug: { current: string } }) => (
                <span
                  key={cat.slug.current}
                  className="font-mono text-[10px] tracking-widest uppercase text-primary border border-primary/25 px-2 py-0.5"
                  style={{ borderRadius: '2px' }}
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl lg:text-4xl font-semibold text-ink leading-tight mb-5">
            {post.title}
          </h1>

          {post.author && (
            <AuthorBadge author={post.author} publishedAt={post.publishedAt ?? undefined} />
          )}
        </Container>
      </section>

      {/* Cover image */}
      {post.coverImage?.asset && (
        <div className="border-b border-line">
          <Container width="4xl" padding="default">
            <div className="relative aspect-[16/9] overflow-hidden sharp-card border border-line -mt-1">
              <Image
                src={urlFor(post.coverImage as object).width(1400).height(788).url()}
                alt={post.coverImage.alt ?? post.title}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 896px, 100vw"
              />
            </div>
          </Container>
        </div>
      )}

      {/* Body */}
      <section className="py-16">
        <Container width="2xl" padding="default">
          {post.body && <PortableTextRenderer value={post.body} />}

          {/* Author bio footer */}
          {post.author && (
            <div className="mt-16 pt-8 border-t border-line">
              <AuthorBadge
                author={post.author}
                publishedAt={post.publishedAt ?? undefined}
                showBio
              />
            </div>
          )}

          <div className="mt-10">
            <Link
              href="/blog"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              ← Back to blog
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
