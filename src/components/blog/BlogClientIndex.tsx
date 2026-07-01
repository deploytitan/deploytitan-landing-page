'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import posthog from 'posthog-js'
import { urlFor } from '@/sanity/lib/image'
import { PostCard } from './PostCard'
import { Container } from '@/components/shared/Container'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

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

type CategoryListItem = {
  _id: string
  title: string
  slug: { current: string }
}

interface BlogClientIndexProps {
  posts: PostListItem[]
  categories: CategoryListItem[]
}

export function BlogClientIndex({ posts, categories }: BlogClientIndexProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category')
  const activeCategoryExists = activeCategory
    ? categories.some((category) => category.slug.current === activeCategory)
    : false
  const selectedCategory = activeCategoryExists ? activeCategory : null

  const filtered = selectedCategory
    ? posts.filter((p) => p.categories?.some((c) => c.slug.current === selectedCategory))
    : posts

  const featured = filtered[0] ?? null
  const rest = filtered.slice(1)

  const featuredDate = featured?.publishedAt
    ? new Date(featured.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  const updateCategoryFilter = (categorySlug?: string) => {
    const payload = {
      selected_category: categorySlug ?? 'all',
      current_category: selectedCategory ?? 'all',
      page_path: pathname,
    }
    posthog.capture('blog_category_filter_selected', payload)
    window.gtag?.('event', 'blog_category_filter_selected', payload)

    const nextParams = new URLSearchParams(searchParams.toString())

    if (categorySlug) {
      nextParams.set('category', categorySlug)
    } else {
      nextParams.delete('category')
    }

    const query = nextParams.toString()
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  return (
    <>
      {/* Category nav strip */}
      {categories.length > 0 && (
        <div className="border-line overflow-x-auto border-b">
          <Container width="6xl" padding="default">
            <div className="divide-line flex items-stretch divide-x">
              <button
                type="button"
                onClick={() => updateCategoryFilter()}
                className={[
                  'px-4 py-3 font-mono text-[10px] tracking-widest whitespace-nowrap uppercase transition-colors',
                  !selectedCategory
                    ? 'bg-surface-alt text-primary-accessible'
                    : 'text-ink-tertiary hover:text-ink hover:bg-surface-alt',
                ].join(' ')}
                aria-current={!selectedCategory ? 'page' : undefined}
              >
                All
              </button>
              {categories.map((cat) => {
                const isActive = cat.slug.current === selectedCategory
                return (
                  <button
                    key={cat._id}
                    type="button"
                    onClick={() => updateCategoryFilter(cat.slug.current)}
                    className={[
                      'px-4 py-3 font-mono text-[10px] tracking-widest whitespace-nowrap uppercase transition-colors',
                      isActive
                        ? 'bg-surface-alt text-primary-accessible'
                        : 'text-ink-tertiary hover:text-ink hover:bg-surface-alt',
                    ].join(' ')}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {cat.title}
                  </button>
                )
              })}
            </div>
          </Container>
        </div>
      )}

      {/* Posts */}
      <section className="py-20">
        <Container width="6xl" padding="default">
          {filtered.length > 0 ? (
            <div className="flex flex-col gap-12">
              {/* Featured */}
              {featured && (
                <article className="group border-line sharp-card hover:border-primary/20 relative overflow-hidden border transition-all duration-200">
                  <div className="flex flex-col lg:flex-row">
                    {featured.coverImage?.asset && (
                      <div className="bg-surface-alt relative aspect-[16/9] shrink-0 overflow-hidden lg:aspect-auto lg:min-h-[360px] lg:w-1/2">
                        <Image
                          src={urlFor(featured.coverImage).width(1200).height(680).url()}
                          alt={featured.coverImage.alt ?? featured.title}
                          fill
                          priority
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-between gap-4 p-8 lg:p-10">
                      <div className="flex flex-col gap-3">
                        {featured.categories && featured.categories.length > 0 && (
                          <div className="relative z-10 flex flex-wrap gap-1.5">
                            {featured.categories.map((cat) => (
                              <Link
                                key={cat.slug.current}
                                href={`/blog?category=${cat.slug.current}`}
                                scroll={false}
                                className="text-primary-accessible border-primary/25 hover:border-primary/50 hover:text-primary border px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase transition-colors"
                                style={{ borderRadius: '2px' }}
                              >
                                {cat.title}
                              </Link>
                            ))}
                          </div>
                        )}

                        <h2 className="text-ink group-hover:text-primary text-2xl leading-snug font-semibold transition-colors lg:text-3xl">
                          <Link
                            href={`/blog/${featured.slug.current}`}
                            className="after:absolute after:inset-0 focus-visible:outline-none"
                            onClick={() => {
                              const payload = {
                                post_slug: featured.slug.current,
                                post_title: featured.title,
                                click_source: 'featured',
                                active_category: selectedCategory ?? 'all',
                              }
                              posthog.capture('blog_post_clicked', payload)
                              window.gtag?.('event', 'blog_post_clicked', payload)
                            }}
                          >
                            {featured.title}
                          </Link>
                        </h2>

                        {featured.excerpt && (
                          <p className="text-ink-secondary line-clamp-3 max-w-lg text-base leading-relaxed">
                            {featured.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="border-line-subtle flex items-center gap-2 border-t pt-4">
                        {featured.author?.name && (
                          <span className="text-ink-tertiary text-xs">{featured.author.name}</span>
                        )}
                        {featured.author?.name && featuredDate && (
                          <span className="text-ink-tertiary text-xs">·</span>
                        )}
                        {featuredDate && (
                          <span className="text-ink-tertiary font-mono text-xs">
                            {featuredDate}
                          </span>
                        )}
                        <span className="text-ink-quaternary ml-auto font-mono text-[10px] tracking-widest uppercase">
                          Latest
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* Remaining grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-ink-tertiary font-mono text-sm">No posts in this category yet.</p>
              <p className="text-ink-tertiary mt-1 text-sm">Check back soon.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
