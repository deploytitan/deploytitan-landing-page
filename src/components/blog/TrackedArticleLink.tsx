'use client'

import Link from 'next/link'
import type { ComponentProps, MouseEvent } from 'react'
import {
  buildArticleTrackingPayload,
  type ArticleAnalyticsContext,
  trackEvent,
} from '@/lib/analytics'

type TrackedArticleLinkProps = Omit<ComponentProps<typeof Link>, 'href' | 'onClick'> & {
  href: string
  eventName: string
  eventPayload: Record<string, unknown>
  articleContext?: ArticleAnalyticsContext
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

export function TrackedArticleLink({
  eventName,
  eventPayload,
  articleContext,
  onClick,
  ...props
}: TrackedArticleLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(
      eventName,
      articleContext ? buildArticleTrackingPayload(articleContext, eventPayload) : eventPayload,
    )
    onClick?.(event)
  }

  if (/^(mailto|tel):/i.test(props.href)) {
    return <a {...props} onClick={handleClick} />
  }

  return <Link {...props} onClick={handleClick} />
}
