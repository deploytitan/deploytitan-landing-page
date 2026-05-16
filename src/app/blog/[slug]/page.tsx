import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableTextRenderer } from '@/components/blog/PortableTextRenderer'
import { AuthorBadge } from '@/components/blog/AuthorBadge'
import { Container } from '@/components/shared/Container'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import Link from 'next/link'
import { TypedObject } from 'sanity'

interface PostData {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string | null
  publishedAt?: string | null
  coverImage?: { asset: object; alt?: string; hotspot?: object; crop?: object } | null
  author?: { name: string; image?: object; role?: string; bio?: string } | null
  categories?: { title: string; slug: { current: string } }[] | null
  body?: TypedObject[]
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postSlugsQuery,
    perspective: 'published',
    stega: false,
  })
  return ((data as { slug: string }[]) ?? []).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: postRaw } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
    stega: false,
  })
  const post = postRaw as PostData | null
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: post.coverImage?.asset
      ? {
          images: [
            {
              url: urlFor(post.coverImage as object)
                .width(1200)
                .height(630)
                .url(),
            },
          ],
        }
      : undefined,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const { data: postRaw } = await sanityFetch({ query: postBySlugQuery, params: { slug } })
  const post = postRaw as PostData | null

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
      {/* Hero */}
      <section className="blueprint-grid border-line border-b pt-28 pb-12">
        <Container width="3xl" padding="default">
          <Breadcrumbs className="mb-6" />

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.categories.map((cat: { title: string; slug: { current: string } }) => (
                <span
                  key={cat.slug.current}
                  className="text-primary-accessible border-primary/25 border px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase"
                  style={{ borderRadius: '2px' }}
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-ink mb-5 text-3xl leading-tight font-semibold lg:text-4xl">
            {post.title}
          </h1>

          {post.author && (
            <AuthorBadge author={post.author} publishedAt={post.publishedAt ?? undefined} />
          )}
        </Container>
      </section>

      {/* Cover image */}
      {post.coverImage?.asset && (
        <div className="border-line border-b">
          <Container width="4xl" padding="default">
            <div className="sharp-card border-line relative -mt-1 aspect-[16/9] overflow-hidden border">
              <Image
                src={urlFor(post.coverImage as object)
                  .width(1400)
                  .height(788)
                  .url()}
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
            <div className="border-line mt-16 border-t pt-8">
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
              className="text-primary-accessible hover:text-primary text-sm font-medium transition-colors"
            >
              ← Back to blog
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
