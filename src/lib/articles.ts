import type { TypedObject } from 'sanity'

const BASE_URL = 'https://deploytitan.com'

export type ArticleRecord = {
  _id: string
  _type?: string
  title: string
  slug: { current: string }
  excerpt?: string | null
  directAnswer?: string | null
  primaryQuestion?: string | null
  publishedAt?: string | null
  _updatedAt?: string | null
  status?: string | null
  body?: TypedObject[]
  topicCluster?: { name?: string | null; slug?: { current?: string | null } | null } | null
  seo?: { title?: string | null; description?: string | null; canonicalUrl?: string | null; noIndex?: boolean | null } | null
  faq?: { question?: string | null; answer?: string | null }[] | null
  citations?: { label?: string | null; url?: string | null; publisher?: string | null; notes?: string | null }[] | null
  customerDiscoveryCta?: { question?: string | null; label?: string | null; href?: string | null; supportingText?: string | null } | null
  author?: { name?: string | null; slug?: { current?: string | null } | null; role?: string | null; bio?: string | null; image?: object | null } | null
  categories?: { title: string; slug: { current: string } }[] | null
  coverImage?: { asset?: object; alt?: string | null; hotspot?: object; crop?: object } | null
  relatedArticles?: { _id: string; title: string; slug: { current: string }; excerpt?: string | null }[] | null
  contentBrief?: {
    _id: string
    title: string
    marketQuestion?: { _id: string; question: string; status?: string | null } | null
  } | null
}

export function getArticleCanonicalUrl(article: Pick<ArticleRecord, 'slug' | 'seo'>) {
  return article.seo?.canonicalUrl || `${BASE_URL}/blog/${article.slug.current}/`
}

export function getArticleSeoTitle(article: Pick<ArticleRecord, 'title' | 'seo'>) {
  return article.seo?.title || article.title
}

export function getArticleSeoDescription(article: Pick<ArticleRecord, 'excerpt' | 'directAnswer' | 'seo'>) {
  return article.seo?.description || article.excerpt || article.directAnswer || undefined
}

export function portableTextToPlainText(blocks: TypedObject[] = []) {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !('children' in block) || !Array.isArray(block.children)) {
        return ''
      }
      return block.children
        .map((child) => (typeof child === 'object' && child && 'text' in child ? String(child.text ?? '') : ''))
        .join('')
    })
    .filter(Boolean)
    .join('\n\n')
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function extractArticleHeadings(blocks: TypedObject[] = []) {
  return blocks
    .filter((block) => block._type === 'block' && 'style' in block && /^h[1-6]$/.test(String(block.style ?? '')) && 'children' in block && Array.isArray(block.children))
    .map((block) => ({
      level: Number(String((block as { style?: string }).style).replace('h', '')),
      text: (block.children as Array<{ text?: string }>).map((child) => child.text ?? '').join(''),
      id: slugifyHeading(
        (block.children as Array<{ text?: string }>).map((child) => child.text ?? '').join(''),
      ),
    }))
    .filter((heading) => heading.text)
}

export function normalizeFaq(faq: ArticleRecord['faq']) {
  return (faq ?? []).filter((item): item is { question: string; answer: string } => Boolean(item?.question && item?.answer))
}

export function normalizeAuthor(author: ArticleRecord['author']) {
  if (!author?.name) return null
  return {
    name: author.name,
    image: author.image ?? undefined,
    role: author.role ?? undefined,
    bio: author.bio ?? undefined,
  }
}
