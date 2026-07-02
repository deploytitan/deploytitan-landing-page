import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { getArticleCanonicalUrl, getArticleSeoDescription, portableTextToPlainText, type ArticleRecord } from '@/lib/articles'
import { articlesQuery } from '@/sanity/lib/queries'

export async function GET() {
  const articles = (await client.fetch<ArticleRecord[]>(articlesQuery)) ?? []

  const items = articles
    .map((article) => {
      const url = getArticleCanonicalUrl(article)
      const description = getArticleSeoDescription(article) ?? portableTextToPlainText(article.body).slice(0, 280)
      return `
        <item>
          <title><![CDATA[${article.title}]]></title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(article.publishedAt ?? article._updatedAt ?? Date.now()).toUTCString()}</pubDate>
          <description><![CDATA[${description}]]></description>
        </item>
      `
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>DeployTitan Blog</title>
      <link>https://deploytitan.com/blog</link>
      <description>Release coordination, deployment intelligence, and engineering operations insights from DeployTitan.</description>
      ${items}
    </channel>
  </rss>`

  return new NextResponse(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
