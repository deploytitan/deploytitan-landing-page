import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface PostCardProps {
  post: {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    publishedAt?: string
    coverImage?: { asset: object; alt?: string; hotspot?: object; crop?: object }
    author?: { name: string; image?: object; role?: string }
    categories?: { title: string; slug: { current: string } }[]
  }
}

export function PostCard({ post }: PostCardProps) {
  const href = `/blog/${post.slug.current}`
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <article className="group relative flex flex-col sharp-card border border-line hover:border-primary/20 transition-all duration-200 overflow-hidden">
      {/* Cover image */}
      {post.coverImage?.asset && (
        <div className="relative aspect-[16/9] bg-surface-alt overflow-hidden">
          <Image
            src={urlFor(post.coverImage).width(800).height(450).url()}
            alt={post.coverImage.alt ?? post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-6 gap-3">
        {/* Category chips — sit above the title's cover pseudo-link via z-10 */}
        {post.categories && post.categories.length > 0 && (
          <div className="relative z-10 flex flex-wrap gap-1.5">
            {post.categories.map((cat) => (
              <Link
                key={cat.slug.current}
                href={`/blog?category=${cat.slug.current}`}
                scroll={false}
                className="font-mono text-[10px] tracking-widest uppercase text-primary-accessible border border-primary/25 px-2 py-0.5 hover:border-primary/50 hover:text-primary transition-colors"
                style={{ borderRadius: '2px' }}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        )}

        {/* Title — after:absolute makes the whole card clickable */}
        <h2 className="text-base font-semibold text-ink leading-snug group-hover:text-primary transition-colors">
          <Link
            href={href}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-primary/30"
          >
            {post.title}
          </Link>
        </h2>

        {post.excerpt && (
          <p className="text-sm text-ink-secondary leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-line-subtle">
          {post.author?.name && (
            <span className="text-xs text-ink-tertiary">{post.author.name}</span>
          )}
          {post.author?.name && date && (
            <span className="text-ink-tertiary text-xs">·</span>
          )}
          {date && <span className="text-xs text-ink-tertiary font-mono">{date}</span>}
        </div>
      </div>
    </article>
  )
}
