import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import {
  extractArticleHeadings,
  getArticleCanonicalUrl,
  getArticleLlmTextUrl,
  portableTextToPlainText,
  type ArticleRecord,
} from '@/lib/articles'
import { articleBySlugQuery } from '@/sanity/lib/queries'

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await client.fetch<ArticleRecord | null>(articleBySlugQuery, { slug })

  if (!article || article.status === 'draft') {
    return NextResponse.json({ message: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({
    id: article._id,
    slug: article.slug.current,
    title: article.title,
    canonicalUrl: getArticleCanonicalUrl(article),
    llmTextUrl: getArticleLlmTextUrl(article),
    directAnswer: article.directAnswer ?? null,
    primaryQuestion: article.primaryQuestion ?? null,
    primaryKeyword: article.primaryKeyword ?? null,
    relatedQuestions: article.relatedQuestions ?? [],
    searchIntent: article.searchIntent ?? null,
    headings: extractArticleHeadings(article.body),
    bodyText: portableTextToPlainText(article.body),
    faq: article.faq ?? [],
    publicationDate: article.publishedAt ?? null,
    modificationDate: article.updatedAt ?? article._updatedAt ?? null,
    author: article.author?.name ?? null,
    topicCluster: article.topicCluster?.name ?? null,
    citations: article.citations ?? [],
  })
}
