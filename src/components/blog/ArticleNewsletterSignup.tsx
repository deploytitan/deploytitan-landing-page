'use client'

import { useState } from 'react'
import {
  buildArticleTrackingPayload,
  type ArticleAnalyticsContext,
  hasAnalyticsConsent,
  identifyUser,
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
      const response = await fetch(NEWSLETTER_API_PATH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          articleContext,
          signupPlacement: 'article-inline',
          referringSite: typeof window !== 'undefined' ? window.location.href : articleContext.canonicalUrl,
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
          latest_newsletter_signup_article: articleContext.articleSlug,
        })
      }

      trackEvent(
        'newsletterSignup',
        buildArticleTrackingPayload(articleContext, {
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
    <section className="mt-14 rounded-[2px] border border-line bg-surface-alt/55 px-6 py-6">
      <p className="font-mono text-[10px] uppercase tracking-widest text-primary-accessible">
        Newsletter
      </p>
      <h2 className="mt-2 text-xl font-semibold text-ink">Get new deployment engineering research.</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-secondary">
        Subscribe for new articles on release risk, impact analysis, dependency mapping, and
        practitioner takeaways.
      </p>

      {state === 'success' ? (
        <div className="mt-4 rounded-[2px] border border-primary/20 bg-primary/5 px-4 py-4 text-sm text-ink-secondary">
          You&apos;re subscribed. The next article will land in your inbox.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            className="min-w-0 rounded-[2px] border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-quaternary focus:border-primary/40 focus:outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Work email"
            required
            className="min-w-0 rounded-[2px] border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-quaternary focus:border-primary/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={state === 'loading'}
            className="rounded-[2px] border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm font-medium text-primary-accessible transition-colors hover:border-primary/50 hover:text-primary disabled:opacity-60"
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
