import { createHash, timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { client, writeClient } from '@/sanity/lib/client'
import { articleByCanonicalOrSlugQuery } from '@/sanity/lib/queries'

type SnapshotPayload = {
  canonicalUrl?: string
  slug?: string
  source: string
  period: '7d' | '30d' | 'custom'
  captureDate: string
  metrics: Record<string, number>
  notes?: string
  idempotencyKey?: string
}

function isAuthorized(request: NextRequest) {
  const configured = process.env.CONTENT_PERFORMANCE_API_KEY
  if (!configured) return false
  const header = request.headers.get('authorization')
  if (!header?.startsWith('Bearer ')) return false
  const token = Buffer.from(header.slice(7))
  const expected = Buffer.from(configured)
  return token.length === expected.length && timingSafeEqual(token, expected)
}

function buildSnapshotId(articleId: string, period: string, captureDate: string, source: string, key?: string) {
  const digest = createHash('sha256')
    .update([articleId, period, captureDate, source, key ?? ''].join(':'))
    .digest('hex')
    .slice(0, 24)
  return `articlePerformanceSnapshot.${digest}`
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json({ message: 'Missing Sanity write token' }, { status: 500 })
  }

  const payload = (await request.json()) as SnapshotPayload

  if (!payload.source || !payload.period || !payload.captureDate || !payload.metrics) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
  }

  const article = await client.fetch<{ _id: string; slug: { current: string }; title: string } | null>(
    articleByCanonicalOrSlugQuery,
    {
      slug: payload.slug ?? '',
      canonicalUrl: payload.canonicalUrl ?? '',
    },
  )

  if (!article) {
    return NextResponse.json({ message: 'Article not found' }, { status: 404 })
  }

  const snapshotId = buildSnapshotId(
    article._id,
    payload.period,
    payload.captureDate,
    payload.source,
    payload.idempotencyKey,
  )

  const result = await writeClient
    .createOrReplace({
      _id: snapshotId,
      _type: 'articlePerformanceSnapshot',
      article: { _type: 'reference', _ref: article._id },
      period: payload.period,
      captureDate: payload.captureDate,
      source: payload.source,
      canonicalUrl: payload.canonicalUrl,
      metrics: payload.metrics,
      notes: payload.notes,
      idempotencyKey: payload.idempotencyKey ?? snapshotId,
    })
    .catch((error) => {
      console.error('performance snapshot write failed', error)
      return null
    })

  if (!result) {
    return NextResponse.json({ message: 'Snapshot write failed' }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    snapshotId,
    articleId: article._id,
  })
}
