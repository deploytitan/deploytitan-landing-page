'use client'

import Link from 'next/link'
import { Section } from './shared/Section'
import { Container } from './shared/Container'
import { Button } from './shared/Button'
import { DEMO_URL, WAITLIST_URL } from '@/lib/env'
import { WaitlistForm } from './WaitlistForm'

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
  primaryLabel = 'Join waitlist',
  primaryHref = WAITLIST_URL,
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
          <WaitlistForm
            source="midcta"
            successMessage="You're on the list — we'll be in touch at GA."
            className="flex w-full flex-col justify-end gap-2 sm:flex-row lg:w-[unset]"
          />
        </Container>
      </Section>
    )
  }

  const ExternalIcon = () => (
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
  )

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
          <Button as="a" href={primaryHref} variant="primary" size="sm">
            {primaryLabel}
          </Button>
          {secondaryLabel &&
            (secondaryExternal ? (
              <Button
                as="a"
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
              >
                {secondaryLabel}
                <ExternalIcon />
              </Button>
            ) : (
              <Button as="a" href={secondaryHref!} variant="outline" size="sm">
                {secondaryLabel}
              </Button>
            ))}
        </div>
      </Container>
    </Section>
  )
}
