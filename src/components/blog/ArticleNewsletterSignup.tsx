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
            typeof window !== 'undefined'
              ? window.location.href
              : resolvedArticleContext.canonicalUrl,
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
    <section className="border-line bg-surface-alt/55 mt-14 rounded-[var(--radius-invited)] border px-6 py-6">
      <p
        id="newsletter"
        className="text-primary-accessible font-mono text-[10px] tracking-[0.2em] uppercase"
      >
        Newsletter
      </p>
      <h2 className="text-ink mt-2 max-w-xl text-3xl leading-tight font-semibold tracking-[-0.015em]">
        Get new AI delivery research.
      </h2>
      <p className="text-ink-secondary mt-3 max-w-2xl text-sm leading-7">
        Subscribe for practical notes on AI adoption, throughput bottlenecks, verification capacity,
        and the systems that keep teams moving safely.
      </p>

      {state === 'success' ? (
        <div className="border-primary/20 bg-primary/5 text-ink-secondary mt-5 rounded-[var(--radius-standard)] border px-4 py-4 text-sm">
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
            className="border-line bg-surface/95 text-ink placeholder:text-ink-secondary focus:border-primary/40 focus:ring-primary/15 min-h-11 min-w-0 rounded-[var(--radius-pill)] border px-4 py-3 text-sm focus:ring-2 focus:outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Work email"
            required
            aria-label="Work email"
            className="border-line bg-surface/95 text-ink placeholder:text-ink-secondary focus:border-primary/40 focus:ring-primary/15 min-h-11 min-w-0 rounded-[var(--radius-pill)] border px-4 py-3 text-sm focus:ring-2 focus:outline-none"
          />
          <button
            type="submit"
            disabled={state === 'loading'}
            className="border-primary/30 bg-primary/5 text-primary-accessible hover:border-primary/50 hover:text-primary focus:ring-primary/20 min-h-11 rounded-[var(--radius-pill)] border px-5 py-3 text-sm font-medium transition-colors focus:ring-2 focus:outline-none disabled:opacity-60"
          >
            {state === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      )}

      {state === 'error' && (
        <p className="text-signal-danger mt-3 text-sm">
          Subscription failed. Please try again in a minute.
        </p>
      )}
    </section>
  )
}
