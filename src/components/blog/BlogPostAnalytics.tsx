'use client'

import { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/analytics'

type BlogPostAnalyticsProps = {
  slug: string
  title: string
  categories: string[]
}

export function BlogPostAnalytics({ slug, title, categories }: BlogPostAnalyticsProps) {
  const hasTrackedView = useRef(false)
  const sentMilestones = useRef<Set<number>>(new Set())

  useEffect(() => {
    if (hasTrackedView.current) return
    hasTrackedView.current = true

    const payload = {
      post_slug: slug,
      post_title: title,
      categories,
      page_path: typeof window !== 'undefined' ? window.location.pathname : `/blog/${slug}`,
    }

    trackEvent('articleViewed', payload)
  }, [categories, slug, title])

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

          const payload = {
            post_slug: slug,
            post_title: title,
            read_percent: milestone,
          }

          trackEvent(milestone === 50 ? 'article50PercentRead' : 'article90PercentRead', payload)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [slug, title])

  return null
}
