'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PostCard } from './PostCard'
import { Container } from '@/components/shared/Container'
import { trackEvent } from '@/lib/analytics'

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

  const updateCategoryFilter = (categorySlug?: string) => {
    const payload = {
      selected_category: categorySlug ?? 'all',
      current_category: selectedCategory ?? 'all',
      page_path: pathname,
    }
    trackEvent('blog_category_filter_selected', payload)

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
                  'min-h-11 px-4 py-3 font-mono text-[10px] tracking-widest whitespace-nowrap uppercase transition-colors',
                  !selectedCategory
                    ? 'bg-surface-alt text-primary-accessible'
                    : 'text-ink-secondary hover:text-ink hover:bg-surface-alt',
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
                      'min-h-11 px-4 py-3 font-mono text-[10px] tracking-widest whitespace-nowrap uppercase transition-colors',
                      isActive
                        ? 'bg-surface-alt text-primary-accessible'
                        : 'text-ink-secondary hover:text-ink hover:bg-surface-alt',
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 [grid-auto-flow:dense]">
              {filtered.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-ink-secondary font-mono text-sm">No articles in this category yet.</p>
              <p className="text-ink-secondary mt-1 text-sm">Check back soon.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
