'use client'

import { useState } from 'react'
import {
  buildArticleTrackingPayload,
  type ArticleAnalyticsContext,
  hasAnalyticsConsent,
  identifyUser,
  resolveArticleAnalyticsContext,
  trackEvent,
} from '@/lib/analytics'
import { NEWSLETTER_API_PATH, NEWSLETTER_PROVIDER } from '@/lib/env'

type ArticleNewsletterSignupProps = {
  articleContext: ArticleAnalyticsContext
}

export function ArticleNewsletterSignup({ articleContext }: ArticleNewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setState('loading')

    try {
      const resolvedArticleContext = resolveArticleAnalyticsContext(articleContext)
      const response = await fetch(NEWSLETTER_API_PATH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          articleContext: resolvedArticleContext,
          signupPlacement: 'article-inline',
          referringSite:
            typeof window !== 'undefined' ? window.location.href : resolvedArticleContext.canonicalUrl,
        }),
      })

      if (!response.ok) {
        throw new Error('newsletter-subscribe-failed')
      }

      if (hasAnalyticsConsent()) {
        identifyUser(email, {
          email,
          name,
          newsletter_provider: NEWSLETTER_PROVIDER,
          latest_newsletter_signup_article: resolvedArticleContext.articleSlug,
        })
      }

      trackEvent(
        'newsletterSignup',
        buildArticleTrackingPayload(resolvedArticleContext, {
          provider: NEWSLETTER_PROVIDER,
          signupPlacement: 'article-inline',
        }),
      )

      setState('success')
      setEmail('')
      setName('')
    } catch {
      setState('error')
    }
  }

  return (
    <section className="mt-14 rounded-[var(--radius-invited)] border border-line bg-surface-alt/55 px-6 py-6">
      <p id="newsletter" className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-accessible">
        Newsletter
      </p>
      <h2 className="mt-2 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.015em] text-ink">
        Get new deployment engineering research.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-secondary">
        Subscribe for practical notes on release coordination, developer tooling, AI-assisted
        engineering, and the systems that keep teams moving.
      </p>

      {state === 'success' ? (
        <div className="mt-5 rounded-[var(--radius-standard)] border border-primary/20 bg-primary/5 px-4 py-4 text-sm text-ink-secondary">
          You&apos;re subscribed. The next article will land in your inbox.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            aria-label="Name"
            className="min-h-11 min-w-0 rounded-[var(--radius-pill)] border border-line bg-surface/95 px-4 py-3 text-sm text-ink placeholder:text-ink-quaternary focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
          />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Work email"
            required
            aria-label="Work email"
            className="min-h-11 min-w-0 rounded-[var(--radius-pill)] border border-line bg-surface/95 px-4 py-3 text-sm text-ink placeholder:text-ink-quaternary focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
          />
          <button
            type="submit"
            disabled={state === 'loading'}
            className="min-h-11 rounded-[var(--radius-pill)] border border-primary/30 bg-primary/5 px-5 py-3 text-sm font-medium text-primary-accessible transition-colors hover:border-primary/50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
          >
            {state === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      )}

      {state === 'error' && (
        <p className="mt-3 text-sm text-signal-danger">
          Subscription failed. Please try again in a minute.
        </p>
      )}
    </section>
  )
}
