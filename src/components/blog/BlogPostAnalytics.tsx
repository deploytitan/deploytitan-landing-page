'use client'

import { useEffect, useRef } from 'react'
import { buildArticleTrackingPayload, type ArticleAnalyticsContext, trackEvent } from '@/lib/analytics'

type BlogPostAnalyticsProps = {
  articleContext: ArticleAnalyticsContext
}

export function BlogPostAnalytics({ articleContext }: BlogPostAnalyticsProps) {
  const hasTrackedView = useRef(false)
  const sentMilestones = useRef<Set<number>>(new Set())

  useEffect(() => {
    if (hasTrackedView.current) return
    hasTrackedView.current = true

    const payload = buildArticleTrackingPayload(articleContext, {
      page_path:
        typeof window !== 'undefined'
          ? window.location.pathname
          : `/blog/${articleContext.articleSlug}`,
    })

    trackEvent('articleViewed', payload)
  }, [articleContext])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const viewportHeight = window.innerHeight
      const fullHeight = document.documentElement.scrollHeight
      const denominator = fullHeight - viewportHeight

      if (denominator <= 0) return

      const progress = Math.round((scrollTop / denominator) * 100)
      const milestones = [50, 90]

      milestones.forEach((milestone) => {
        if (progress >= milestone && !sentMilestones.current.has(milestone)) {
          sentMilestones.current.add(milestone)

          const payload = buildArticleTrackingPayload(articleContext, {
            read_percent: milestone,
          })

          trackEvent(milestone === 50 ? 'article50PercentRead' : 'article90PercentRead', payload)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [articleContext])

  return null
}
