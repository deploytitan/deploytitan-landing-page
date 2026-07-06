import { createHash, timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { client, writeClient } from '@/sanity/lib/client'

type DistributionSnapshotPayload = {
  distributionAssetId?: string
  source: string
  period: '7d' | '30d' | 'custom'
  captureDate: string
  externalUrl?: string
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

function buildSnapshotId(
  distributionAssetId: string,
  period: string,
  captureDate: string,
  source: string,
  key?: string,
) {
  const digest = createHash('sha256')
    .update([distributionAssetId, period, captureDate, source, key ?? ''].join(':'))
    .digest('hex')
    .slice(0, 24)
  return `distributionAssetPerformanceSnapshot.${digest}`
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json({ message: 'Missing Sanity write token' }, { status: 500 })
  }

  const payload = (await request.json()) as DistributionSnapshotPayload

  if (!payload.distributionAssetId || !payload.source || !payload.period || !payload.captureDate || !payload.metrics) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
  }

  const distributionAsset = await client.fetch<{ _id: string; title: string } | null>(
    `*[_type == "distributionAsset" && _id == $id][0]{ _id, title }`,
    { id: payload.distributionAssetId },
  )

  if (!distributionAsset) {
    return NextResponse.json({ message: 'Distribution asset not found' }, { status: 404 })
  }

  const snapshotId = buildSnapshotId(
    distributionAsset._id,
    payload.period,
    payload.captureDate,
    payload.source,
    payload.idempotencyKey,
  )

  const result = await writeClient
    .createOrReplace({
      _id: snapshotId,
      _type: 'distributionAssetPerformanceSnapshot',
      distributionAsset: { _type: 'reference', _ref: distributionAsset._id },
      period: payload.period,
      captureDate: payload.captureDate,
      source: payload.source,
      externalUrl: payload.externalUrl,
      metrics: payload.metrics,
      notes: payload.notes,
      idempotencyKey: payload.idempotencyKey ?? snapshotId,
    })
    .catch((error) => {
      console.error('distribution performance snapshot write failed', error)
      return null
    })

  if (!result) {
    return NextResponse.json({ message: 'Snapshot write failed' }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    snapshotId,
    distributionAssetId: distributionAsset._id,
  })
}
