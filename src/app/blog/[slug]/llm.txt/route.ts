import { NextResponse } from 'next/server'
import { formatArticleAsLlmText, type ArticleRecord } from '@/lib/articles'
import { articleBySlugQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'

interface RouteProps {
  params: Promise<{ slug: string }>
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: articleBySlugQuery,
    params: { slug },
    perspective: 'published',
    stega: false,
  })

  const article = data as ArticleRecord | null
  if (!article) {
    return new NextResponse('Not found', { status: 404 })
  }

  return new NextResponse(formatArticleAsLlmText(article), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
    },
  })
}
