'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { buildArticleTrackingPayload, type ArticleAnalyticsContext, trackEvent } from '@/lib/analytics'

type TrackedArticleLinkProps = ComponentProps<typeof Link> & {
  eventName: string
  eventPayload: Record<string, unknown>
  articleContext?: ArticleAnalyticsContext
}

export function TrackedArticleLink({
  eventName,
  eventPayload,
  articleContext,
  onClick,
  ...props
}: TrackedArticleLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(
          eventName,
          articleContext ? buildArticleTrackingPayload(articleContext, eventPayload) : eventPayload,
        )
        onClick?.(event)
      }}
    />
  )
}
