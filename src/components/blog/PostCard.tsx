import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { trackEvent } from '@/lib/analytics'

interface PostCardProps {
  post: {
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
}

export function PostCard({ post }: PostCardProps) {
  const href = `/blog/${post.slug.current}`
  const isFeatured = post.cardLayout === 'featured'
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <article
      className={[
        'group relative overflow-hidden standard-card border border-line transition-all duration-200 hover:border-primary/20',
        isFeatured ? 'sm:col-span-2 lg:col-span-3' : '',
      ].join(' ')}
    >
      <div className={isFeatured ? 'flex flex-col lg:flex-row' : 'flex flex-col'}>
        {post.coverImage?.asset && (
          <div
            className={[
              'relative overflow-hidden bg-surface-alt',
              isFeatured
                ? 'aspect-[16/9] lg:min-h-[320px] lg:w-[48%] lg:shrink-0 lg:aspect-auto'
                : 'aspect-[16/9]',
            ].join(' ')}
          >
            <Image
              src={urlFor(post.coverImage).width(isFeatured ? 1200 : 800).height(isFeatured ? 680 : 450).url()}
              alt={post.coverImage.alt ?? post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes={isFeatured ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
            />
          </div>
        )}

        <div className={['flex flex-1 flex-col gap-3', isFeatured ? 'p-8 lg:p-10' : 'p-6'].join(' ')}>
          {post.categories && post.categories.length > 0 && (
            <div className="relative z-10 flex flex-wrap gap-1.5">
              {post.categories.map((cat) => (
                <Link
                  key={cat.slug.current}
                  href={`/blog?category=${cat.slug.current}`}
                  scroll={false}
                  className="inline-flex min-h-11 items-center border border-primary/25 px-3 py-2 font-mono text-[10px] tracking-widest text-primary-accessible uppercase transition-colors hover:border-primary/50 hover:text-primary"
                  style={{ borderRadius: 'var(--radius-pill)' }}
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}

          <h2
            className={[
              'leading-snug font-semibold text-ink transition-colors group-hover:text-primary',
              isFeatured ? 'text-2xl lg:text-3xl' : 'text-base',
            ].join(' ')}
          >
            <Link
              href={href}
              className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-primary/30"
              onClick={() => {
                const payload = {
                  post_slug: post.slug.current,
                  post_title: post.title,
                  click_source: isFeatured ? 'featured-grid' : 'grid',
                  categories: post.categories?.map((cat) => cat.slug.current) ?? [],
                }
                trackEvent('relatedArticleClicked', payload)
              }}
            >
              {post.title}
            </Link>
          </h2>

          {post.excerpt && (
            <p
              className={[
                'leading-relaxed text-ink-secondary',
                isFeatured ? 'max-w-xl text-base line-clamp-4' : 'text-sm line-clamp-3',
              ].join(' ')}
            >
              {post.excerpt}
            </p>
          )}

          <div className="mt-auto flex items-center gap-2 border-t border-line-subtle pt-3">
            {post.author?.name && (
              <span className="text-xs text-ink-secondary">{post.author.name}</span>
            )}
            {post.author?.name && date && (
              <span className="text-ink-secondary text-xs">·</span>
            )}
            {date && <span className="text-ink-secondary font-mono text-xs">{date}</span>}
            {isFeatured && (
              <span className="text-ink-secondary ml-auto font-mono text-[10px] tracking-widest uppercase">
                Featured
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
