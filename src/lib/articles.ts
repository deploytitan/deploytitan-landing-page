import type { TypedObject } from 'sanity'

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
  seo?: {
    title?: string | null
    description?: string | null
    canonicalUrl?: string | null
    noIndex?: boolean | null
  } | null
  faq?: { question?: string | null; answer?: string | null }[] | null
  citations?:
    | {
        label?: string | null
        url?: string | null
        publisher?: string | null
        notes?: string | null
      }[]
    | null
  customerDiscoveryCta?: {
    question?: string | null
    label?: string | null
    href?: string | null
    supportingText?: string | null
  } | null
  author?: {
    name?: string | null
    slug?: { current?: string | null } | null
    role?: string | null
    bio?: string | null
    image?: object | null
  } | null
  categories?: { title: string; slug: { current: string } }[] | null
  coverImage?: { asset?: object; alt?: string | null; hotspot?: object; crop?: object } | null
  relatedArticles?:
    | { _id: string; title: string; slug: { current: string }; excerpt?: string | null }[]
    | null
  contentBrief?: {
    _id: string
    title: string
    marketQuestion?: { _id: string; question: string; status?: string | null } | null
  } | null
}

export function getArticleCanonicalUrl(article: Pick<ArticleRecord, 'slug' | 'seo'>) {
  return article.seo?.canonicalUrl || `/blog/${article.slug.current}/`
}

export function getArticleLlmTextUrl(article: Pick<ArticleRecord, 'slug' | 'seo'>) {
  return `${getArticleCanonicalUrl(article).replace(/\/$/, '')}/llm.txt`
}

export function getArticleSeoTitle(article: Pick<ArticleRecord, 'title' | 'seo'>) {
  return article.seo?.title || article.title
}

export function getArticleSeoDescription(
  article: Pick<ArticleRecord, 'excerpt' | 'directAnswer' | 'seo'>,
) {
  return article.seo?.description || article.excerpt || article.directAnswer || undefined
}

export function portableTextToPlainText(blocks: TypedObject[] = []) {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !('children' in block) || !Array.isArray(block.children)) {
        return ''
      }
      return block.children
        .map((child) =>
          typeof child === 'object' && child && 'text' in child ? String(child.text ?? '') : '',
        )
        .join('')
    })
    .filter(Boolean)
    .join('\n\n')
}

function portableTextSpanText(children: unknown[] = []) {
  return children
    .map((child) => {
      if (!child || typeof child !== 'object' || !('text' in child)) return ''
      return String(child.text ?? '')
    })
    .join('')
    .trim()
}

function portableTextBlockToLines(block: TypedObject) {
  if (block._type === 'block' && 'children' in block && Array.isArray(block.children)) {
    const text = portableTextSpanText(block.children)
    if (!text) return []

    const style = 'style' in block ? String(block.style ?? 'normal') : 'normal'
    if (/^h[1-6]$/.test(style)) {
      return [text, '']
    }
    if (style === 'blockquote') {
      return [`> ${text}`, '']
    }

    const listPrefix =
      'listItem' in block && block.listItem === 'number'
        ? '1. '
        : 'listItem' in block && block.listItem
          ? '- '
          : ''
    return [`${listPrefix}${text}`, '']
  }

  if (block._type === 'code') {
    const code = 'code' in block ? String(block.code ?? '').trim() : ''
    if (!code) return []

    const filename = 'filename' in block ? String(block.filename ?? '').trim() : ''
    return [filename ? `Code sample (${filename})` : 'Code sample', '```', code, '```', '']
  }

  if (block._type === 'calloutBlock') {
    const title = 'title' in block ? String(block.title ?? '').trim() : ''
    const body = 'body' in block ? String(block.body ?? '').trim() : ''
    const parts = [title, body].filter(Boolean)
    return parts.length ? [parts.join(': '), ''] : []
  }

  if (block._type === 'diagramBlock') {
    const title = 'title' in block ? String(block.title ?? '').trim() : ''
    const description = 'description' in block ? String(block.description ?? '').trim() : ''
    const code = 'code' in block ? String(block.code ?? '').trim() : ''
    const lines = [title || 'Diagram']
    if (description) lines.push(description)
    if (code) lines.push('Diagram source:', '```', code, '```')
    lines.push('')
    return lines
  }

  if (block._type === 'tableBlock') {
    const caption = 'caption' in block ? String(block.caption ?? '').trim() : ''
    const columns =
      'columns' in block && Array.isArray(block.columns)
        ? block.columns.map((column) => String(column ?? '').trim()).filter(Boolean)
        : []
    const rows =
      'rows' in block && Array.isArray(block.rows)
        ? block.rows
            .map((row) => {
              if (
                !row ||
                typeof row !== 'object' ||
                !('cells' in row) ||
                !Array.isArray(row.cells)
              ) {
                return ''
              }
              return row.cells.map((cell: unknown) => String(cell ?? '').trim()).join(' | ')
            })
            .filter(Boolean)
        : []

    if (!caption && !columns.length && !rows.length) return []

    const lines = ['Table']
    if (caption) lines.push(caption)
    if (columns.length) lines.push(columns.join(' | '))
    if (rows.length) lines.push(...rows)
    lines.push('')
    return lines
  }

  if (block._type === 'image') {
    const alt = 'alt' in block ? String(block.alt ?? '').trim() : ''
    const caption = 'caption' in block ? String(block.caption ?? '').trim() : ''
    const parts = [alt, caption].filter(Boolean)
    return parts.length ? [`Image: ${parts.join(' — ')}`, ''] : []
  }

  return []
}

export function portableTextToStructuredPlainText(blocks: TypedObject[] = []) {
  return blocks
    .flatMap((block) => portableTextBlockToLines(block))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
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
    .filter(
      (block) =>
        block._type === 'block' &&
        'style' in block &&
        /^h[1-6]$/.test(String(block.style ?? '')) &&
        'children' in block &&
        Array.isArray(block.children),
    )
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
  return (faq ?? []).filter((item): item is { question: string; answer: string } =>
    Boolean(item?.question && item?.answer),
  )
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

export function formatArticleAsLlmText(article: ArticleRecord) {
  const author = normalizeAuthor(article.author)
  const faq = normalizeFaq(article.faq)
  const sections = [
    `Title: ${article.title}`,
    `Canonical URL: ${getArticleCanonicalUrl(article)}`,
    `Plain Text URL: ${getArticleLlmTextUrl(article)}`,
    article.publishedAt ? `Published: ${article.publishedAt}` : null,
    article._updatedAt || article.publishedAt
      ? `Updated: ${article._updatedAt || article.publishedAt}`
      : null,
    author?.name ? `Author: ${author.name}` : null,
    author?.role ? `Author Role: ${author.role}` : null,
    article.topicCluster?.name ? `Topic Cluster: ${article.topicCluster.name}` : null,
    article.primaryQuestion ? `Primary Question: ${article.primaryQuestion}` : null,
    '',
    article.directAnswer ? `Direct Answer:\n${article.directAnswer}` : null,
    article.excerpt ? `Excerpt:\n${article.excerpt}` : null,
    '',
    portableTextToStructuredPlainText(article.body ?? []),
    faq.length
      ? [
          'Frequently Asked Questions',
          ...faq.flatMap((item) => [`Q: ${item.question}`, `A: ${item.answer}`, '']),
        ].join('\n')
      : null,
    article.citations?.length
      ? [
          'Citations',
          ...article.citations.map((citation, index) => {
            const parts = [
              `${index + 1}. ${citation.label ?? 'Source'}`,
              citation.publisher ? `Publisher: ${citation.publisher}` : null,
              citation.url ? `URL: ${citation.url}` : null,
              citation.notes ? `Notes: ${citation.notes}` : null,
            ].filter(Boolean)
            return parts.join(' | ')
          }),
        ].join('\n')
      : null,
    article.customerDiscoveryCta?.question
      ? [
          'Customer-Discovery Question',
          article.customerDiscoveryCta.question,
          article.customerDiscoveryCta.supportingText ?? null,
          article.customerDiscoveryCta.href && article.customerDiscoveryCta.label
            ? `Next Step: ${article.customerDiscoveryCta.label} — ${article.customerDiscoveryCta.href}`
            : null,
        ]
          .filter(Boolean)
          .join('\n')
      : null,
  ]

  return sections
    .filter((section): section is string => Boolean(section && section.trim()))
    .join('\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
