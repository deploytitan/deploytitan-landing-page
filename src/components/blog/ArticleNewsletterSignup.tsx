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
    <section className="mt-14 rounded-xl border border-line bg-[linear-gradient(180deg,rgba(201,168,76,0.08)_0%,rgba(245,244,241,0.72)_100%)] px-6 py-6 dark:bg-[linear-gradient(180deg,rgba(212,180,84,0.08)_0%,rgba(22,21,18,0.62)_100%)]">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-accessible">
        Newsletter
      </p>
      <h2 className="mt-2 max-w-xl font-(--font-serif) text-3xl leading-tight tracking-[-0.025em] text-ink">
        Get new deployment engineering research.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-secondary">
        Subscribe for new articles on release risk, impact analysis, dependency mapping, and
        practitioner takeaways.
      </p>

      {state === 'success' ? (
        <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 px-4 py-4 text-sm text-ink-secondary">
          You&apos;re subscribed. The next article will land in your inbox.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            className="min-w-0 rounded-full border border-line bg-surface/95 px-4 py-3 text-sm text-ink placeholder:text-ink-quaternary focus:border-primary/40 focus:outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Work email"
            required
            className="min-w-0 rounded-full border border-line bg-surface/95 px-4 py-3 text-sm text-ink placeholder:text-ink-quaternary focus:border-primary/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={state === 'loading'}
            className="rounded-full border border-primary/30 bg-primary/5 px-5 py-3 text-sm font-medium text-primary-accessible transition-colors hover:border-primary/50 hover:text-primary disabled:opacity-60"
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
