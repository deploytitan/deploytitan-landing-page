'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Section } from './shared/Section'
import { Container } from './shared/Container'
import { APP_URL, DEMO_URL, FORM_ENDPOINT } from '@/lib/env'

// --- Waitlist form (used in variant="waitlist") ---

function WaitlistForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!FORM_ENDPOINT) return
    setState('loading')
    try {
      const body = new URLSearchParams({ name, email, sheet: 'waitlist', source: 'midcta' })
      await fetch(FORM_ENDPOINT, { method: 'POST', body, mode: 'no-cors' })
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <p className="text-primary font-mono text-xs">
        You&apos;re on the list — we&apos;ll be in touch at GA.
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col justify-end gap-2 sm:flex-row lg:w-[unset]"
    >
      <input
        type="text"
        placeholder="Your name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-surface border-line text-ink placeholder:text-ink-quaternary focus:border-primary/40 flex-1 grow-0 border px-3 py-2.5 text-sm transition-colors focus:outline-none md:w-42"
        style={{ borderRadius: '2px' }}
      />
      <input
        type="email"
        placeholder="Work email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-surface border-line text-ink placeholder:text-ink-quaternary focus:border-primary/40 flex-1 grow-0 border px-3 py-2.5 text-sm transition-colors focus:outline-none md:w-72"
        style={{ borderRadius: '2px' }}
      />
      <button
        type="submit"
        disabled={state === 'loading'}
        className="bg-ink text-surface shrink-0 px-4 py-2.5 text-xs font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)] active:scale-[0.97] disabled:opacity-50"
        style={{ borderRadius: '2px' }}
      >
        {state === 'loading' ? '…' : 'Join waitlist'}
      </button>
      {state === 'error' && (
        <p className="self-center text-xs text-red-400">Something went wrong — try again.</p>
      )}
    </form>
  )
}

// --- MidCTA ---

interface MidCTAProps {
  variant?: 'default' | 'waitlist'
  heading?: string
  subheading?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  secondaryExternal?: boolean
}

export function MidCTA({
  variant = 'default',
  heading,
  subheading,
  primaryLabel = 'Start free trial',
  primaryHref = `${APP_URL}/signup`,
  secondaryLabel = 'Try the live demo',
  secondaryHref = DEMO_URL,
  secondaryExternal = true,
}: MidCTAProps) {
  if (variant === 'waitlist') {
    return (
      <Section padding="sm" border="both" className="bg-surface-alt/60 relative overflow-hidden">
        <div
          className="blueprint-grid pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
        />
        <Container className="relative flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col gap-1">
            <p className="text-ink text-base font-medium">
              {heading ?? 'Be first to know when we launch.'}
            </p>
            <p className="text-ink-secondary max-w-lg text-sm leading-relaxed">
              {subheading ??
                'Join the waitlist and get early access when self-serve opens — no spam, just product updates.'}
            </p>
          </div>
          {FORM_ENDPOINT && <WaitlistForm />}
        </Container>
      </Section>
    )
  }

  return (
    <Section padding="sm" border="both" className="bg-surface-alt/60 relative overflow-hidden">
      <div
        className="blueprint-grid pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />
      <Container className="relative flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-col gap-1">
          <p className="text-ink text-base font-medium">{heading ?? 'Ready to ship faster?'}</p>
          <p className="text-ink-secondary max-w-lg text-sm leading-relaxed">
            {subheading ??
              'See it in action — trigger a real production deployment from your browser.'}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={primaryHref}
            className="bg-ink text-surface inline-flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-200 hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)] active:scale-[0.97]"
            style={{ borderRadius: '2px' }}
          >
            {primaryLabel}
          </a>
          {secondaryLabel &&
            (secondaryExternal ? (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="border-line text-ink-secondary hover:border-primary/30 hover:text-ink inline-flex items-center gap-2 border px-5 py-3 text-sm font-medium transition-colors"
                style={{ borderRadius: '2px' }}
              >
                {secondaryLabel}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-50"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            ) : (
              <Link
                href={secondaryHref!}
                className="border-line text-ink-secondary hover:border-primary/30 hover:text-ink inline-flex items-center gap-2 border px-5 py-3 text-sm font-medium transition-colors"
                style={{ borderRadius: '2px' }}
              >
                {secondaryLabel}
              </Link>
            ))}
        </div>
      </Container>
    </Section>
  )
}
