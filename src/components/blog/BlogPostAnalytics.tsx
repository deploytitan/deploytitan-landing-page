'use client'

import { useEffect, useRef } from 'react'
import posthog from 'posthog-js'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

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

    posthog.capture('blog_post_viewed', payload)
    window.gtag?.('event', 'blog_post_viewed', payload)
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

          posthog.capture('blog_post_read_progress', payload)
          window.gtag?.('event', 'blog_post_read_progress', payload)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [slug, title])

  return null
}
