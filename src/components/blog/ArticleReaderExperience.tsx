'use client'

import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import {
  buildArticleTrackingPayload,
  type ArticleAnalyticsContext,
  trackEvent,
} from '@/lib/analytics'

type SharePopoverState = {
  text: string
  x: number
  y: number
} | null

type ArticleReaderExperienceProps = {
  articleTitle: string
  articleSlug: string
  articleContext: ArticleAnalyticsContext
  children: ReactNode
}

const BASE_URL = 'https://deploytitan.com'

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function buildShareLinks(articleTitle: string, articleSlug: string, selectedText: string) {
  const articleUrl = `${BASE_URL}/blog/${articleSlug}/`
  const quoted = selectedText.length > 220 ? `${selectedText.slice(0, 217)}...` : selectedText
  const shareText = `"${quoted}"\n\n${articleTitle}`

  return {
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(articleUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
    reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(articleUrl)}&title=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
    copy: `${quoted}\n\n${articleUrl}`,
  }
}

function ShareIcon({ platform }: { platform: 'x' | 'facebook' | 'reddit' | 'linkedin' | 'copy' }) {
  if (platform === 'x') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
      </svg>
    )
  }
  if (platform === 'facebook') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
        <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.6 1.6-1.6H16.5V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V11H8v3h2.3v7h3.2z" />
      </svg>
    )
  }
  if (platform === 'reddit') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
        <path d="M14.2 15.3c-.5.5-1.3.8-2.2.8-.9 0-1.7-.3-2.2-.8a.7.7 0 0 1 1-1c.3.3.8.5 1.3.5s1-.2 1.3-.5a.7.7 0 1 1 1 1zm-3.7-2.2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6.1-1.7a1.8 1.8 0 0 0-3.1-1.2c-1.1-.8-2.6-1.4-4.2-1.5l.9-2.8 2.4.6a1.5 1.5 0 1 0 .4-1.1l-2.8-.7a.7.7 0 0 0-.8.5l-1.1 3.4c-1.7.1-3.2.7-4.3 1.5a1.8 1.8 0 1 0-1.8 3c0 .2-.1.5-.1.7 0 2.8 3 5 6.8 5s6.8-2.2 6.8-5c0-.2 0-.5-.1-.7a1.8 1.8 0 0 0 .2-1.7z" />
      </svg>
    )
  }
  if (platform === 'linkedin') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
        <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1zM5.6 9.75h2.7V18H5.6V9.75zm4.4 0h2.58v1.13h.04c.36-.68 1.23-1.4 2.53-1.4 2.7 0 3.2 1.78 3.2 4.1V18h-2.7v-3.92c0-.94-.02-2.15-1.31-2.15-1.31 0-1.5 1.02-1.5 2.08V18H10V9.75z" />
      </svg>
    )
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 fill-none stroke-current"
      strokeWidth="2"
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

export function ArticleReaderExperience({
  articleTitle,
  articleSlug,
  articleContext,
  children,
}: ArticleReaderExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [popover, setPopover] = useState<SharePopoverState>(null)

  const shareLinks = useMemo(() => {
    if (!popover) return null
    return buildShareLinks(articleTitle, articleSlug, popover.text)
  }, [articleSlug, articleTitle, popover])

  useEffect(() => {
    const updateSelectionState = () => {
      const selection = window.getSelection()
      const text = selection?.toString().trim() ?? ''

      if (!selection || selection.rangeCount === 0 || !text || text.length < 12) {
        setPopover(null)
        return
      }

      const range = selection.getRangeAt(0)
      const commonAncestor = range.commonAncestorContainer
      const container = containerRef.current

      if (!container || !container.contains(commonAncestor)) {
        setPopover(null)
        return
      }

      const rect = range.getBoundingClientRect()

      if (!rect.width && !rect.height) {
        setPopover(null)
        return
      }

      setPopover({
        text,
        x: clamp(rect.left + rect.width / 2, 120, window.innerWidth - 120),
        y: Math.max(rect.top - 16, 24),
      })
    }

    const dismiss = (event: MouseEvent) => {
      if (!popoverRef.current?.contains(event.target as Node)) {
        setPopover(null)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPopover(null)
    }

    const clearPopover = () => setPopover(null)

    document.addEventListener('selectionchange', updateSelectionState)
    document.addEventListener('mousedown', dismiss)
    window.addEventListener('scroll', clearPopover, { passive: true })
    window.addEventListener('resize', clearPopover)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('selectionchange', updateSelectionState)
      document.removeEventListener('mousedown', dismiss)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', clearPopover)
      window.removeEventListener('resize', clearPopover)
    }
  }, [])

  const handleShareClick = async (platform: 'x' | 'facebook' | 'reddit' | 'linkedin' | 'copy') => {
    if (!popover || !shareLinks) return

    trackEvent(
      'articleShared',
      buildArticleTrackingPayload(articleContext, {
        shareChannel: platform,
        selected_text_length: popover.text.length,
      }),
    )

    if (platform === 'copy') {
      await navigator.clipboard.writeText(shareLinks.copy)
      setPopover(null)
      return
    }

    window.open(shareLinks[platform], '_blank', 'noopener,noreferrer,width=720,height=640')
    setPopover(null)
  }

  return (
    <div className="relative">
      <div ref={containerRef}>{children}</div>

      {popover && (
        <div
          ref={popoverRef}
          className="border-line bg-surface fixed z-50 -translate-x-1/2 -translate-y-full rounded-[var(--radius-standard)] border px-3 py-2 shadow-[0_10px_30px_rgba(26,21,18,0.12)]"
          style={{
            left: popover.x,
            top: popover.y,
          }}
          role="dialog"
          aria-label="Share selected text"
        >
          <div className="text-ink-secondary mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
            <span>Share quote</span>
            <span className="bg-line h-px w-6" />
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => void handleShareClick('x')}
              className="border-line text-ink-secondary hover:border-primary/30 hover:text-primary flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-invited)] border px-3 py-2 text-xs transition-colors"
              aria-label="Share on X"
            >
              <span className="flex items-center gap-1.5">
                <ShareIcon platform="x" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => void handleShareClick('facebook')}
              className="border-line text-ink-secondary hover:border-primary/30 hover:text-primary flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-invited)] border px-3 py-2 text-xs transition-colors"
              aria-label="Share on Facebook"
            >
              <span className="flex items-center gap-1.5">
                <ShareIcon platform="facebook" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => void handleShareClick('reddit')}
              className="border-line text-ink-secondary hover:border-primary/30 hover:text-primary flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-invited)] border px-3 py-2 text-xs transition-colors"
              aria-label="Share on Reddit"
            >
              <span className="flex items-center gap-1.5">
                <ShareIcon platform="reddit" />
                <span>Reddit</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => void handleShareClick('linkedin')}
              className="border-line text-ink-secondary hover:border-primary/30 hover:text-primary flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-invited)] border px-3 py-2 text-xs transition-colors"
              aria-label="Share on LinkedIn"
            >
              <span className="flex items-center gap-1.5">
                <ShareIcon platform="linkedin" />
                <span>LinkedIn</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => void handleShareClick('copy')}
              className="border-line text-ink-secondary hover:border-primary/30 hover:text-primary flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-invited)] border px-3 py-2 text-xs transition-colors"
              aria-label="Copy selected quote"
            >
              <span className="flex items-center gap-1.5">
                <ShareIcon platform="copy" />
                <span>Copy</span>
              </span>
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
