'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { trackEvent } from '@/lib/analytics'

type TrackedArticleLinkProps = ComponentProps<typeof Link> & {
  eventName: string
  eventPayload: Record<string, unknown>
}

export function TrackedArticleLink({
  eventName,
  eventPayload,
  onClick,
  ...props
}: TrackedArticleLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventPayload)
        onClick?.(event)
      }}
    />
  )
}
