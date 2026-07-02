import { writeClient } from '@/sanity/lib/client'
import type { ArticleRecord } from '@/lib/articles'

const DEFAULT_CHANNELS = ['xThread', 'linkedin', 'dev', 'newsletter'] as const

function addDays(value: string, days: number) {
  const date = new Date(value)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString()
}

export async function ensureArticleAutomationRecords(article: Pick<ArticleRecord, '_id' | 'title' | 'slug' | 'publishedAt'>) {
  if (!process.env.SANITY_API_WRITE_TOKEN || !article.publishedAt) return

  const transaction = writeClient.transaction()
  transaction.patch(article._id, {
    setIfMissing: {
      sevenDayReviewAt: addDays(article.publishedAt, 7),
      thirtyDayReviewAt: addDays(article.publishedAt, 30),
    },
  })

  for (const channel of DEFAULT_CHANNELS) {
    const id = `distributionAsset.${article.slug.current}.${channel}`
    transaction.createIfNotExists({
      _id: id,
      _type: 'distributionAsset',
      title: `${article.title} · ${channel}`,
      article: { _type: 'reference', _ref: article._id },
      channel,
      status: 'draft',
    })
  }

  await transaction.commit()

  if (process.env.CONTENT_OPS_WEBHOOK_URL) {
    await fetch(process.env.CONTENT_OPS_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        event: 'article.published',
        articleId: article._id,
        slug: article.slug.current,
        title: article.title,
      }),
    }).catch(() => undefined)
  }

  if (process.env.CONTENT_OPS_SLACK_WEBHOOK_URL) {
    await fetch(process.env.CONTENT_OPS_SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        text: `DeployTitan article published: ${article.title} (${article.slug.current})`,
      }),
    }).catch(() => undefined)
  }
}
