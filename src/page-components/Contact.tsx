'use client'

import { useState } from 'react'
import posthog from 'posthog-js'
import { CREATE_ACCOUNT_URL } from '@/lib/env'
import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { Button } from '../components/shared/Button'

const supportRoutes = [
  {
    label: 'Integration help',
    description: 'Questions about GitHub, Jenkins, Grafana, or Slack setup.',
    email: 'support@deploytitan.com',
  },
  {
    label: 'Press and analyst briefings',
    description: 'Media requests, product background, and company context.',
    email: 'press@deploytitan.com',
  },
  {
    label: 'Everything else',
    description: 'Partnerships, feedback, hiring interest, or a note you want us to read.',
    email: 'hello@deploytitan.com',
  },
]

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  async function copyEmail(email: string) {
    try {
      await navigator.clipboard.writeText(email)
      setCopiedEmail(email)
      posthog.capture('contact_email_copied', { email })
      window.setTimeout(() => {
        setCopiedEmail((current) => (current === email ? null : current))
      }, 2000)
    } catch {
      setCopiedEmail(null)
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <Section padding="none">
        <Container className="py-24 lg:py-32">
          <span className="text-ink-tertiary font-mono text-[11px] tracking-widest uppercase">
            Contact
          </span>
          <h1 className="font-display text-ink mt-5 max-w-[16ch] text-[clamp(2.4rem,4.8vw,4.8rem)] leading-[1.0] font-medium tracking-[-0.04em]">
            Put your next release on firmer ground.
          </h1>
          <p className="text-ink-secondary mt-6 max-w-[44ch] text-lg leading-relaxed">
            If release day still means watching CI tabs, waiting on approvals, or chasing somebody
            in Slack, start here. The fastest path is to try DeployTitan on a real sprint.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              as="a"
              href={CREATE_ACCOUNT_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              className="rounded-[8px]"
              onClick={() =>
                posthog.capture('contact_route_clicked', {
                  contact_type: 'signup',
                  href: CREATE_ACCOUNT_URL,
                })
              }
            >
              Create account
            </Button>
            <Button
              as="a"
              href="mailto:sales@deploytitan.com?subject=DeployTitan%20fit%20for%20our%20team"
              variant="outline"
              size="lg"
              className="rounded-[8px]"
              onClick={() =>
                posthog.capture('contact_route_clicked', {
                  contact_type: 'sales',
                  href: 'mailto:sales@deploytitan.com',
                })
              }
            >
              Talk through fit
            </Button>
          </div>
        </Container>
      </Section>

      {/* Sales detail */}
      <Section border="top" padding="none">
        <Container className="py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <h2 className="font-display text-ink text-2xl leading-[1.1] font-medium tracking-[-0.025em]">
                Planning rollout, pricing, or integration questions?
              </h2>
              <p className="text-ink-secondary mt-5 text-base leading-relaxed">
                Send the shape of your release process, the tools you already run, and what keeps
                slowing teams down. We respond within 24 hours.
              </p>
              <a
                href="mailto:sales@deploytitan.com?subject=DeployTitan%20fit%20for%20our%20team"
                className="text-primary-accessible mt-5 inline-block font-mono text-[11px] tracking-[0.12em] transition-opacity hover:opacity-70"
                onClick={() =>
                  posthog.capture('contact_route_clicked', {
                    contact_type: 'sales',
                    href: 'mailto:sales@deploytitan.com',
                  })
                }
              >
                sales@deploytitan.com
              </a>
            </div>

            <div>
              <h2 className="font-display text-ink text-2xl leading-[1.1] font-medium tracking-[-0.025em]">
                Already decided?
              </h2>
              <p className="text-ink-secondary mt-5 text-base leading-relaxed">
                Connect GitHub and Slack, add the PRs on your next release, and watch the
                coordination work happen without you. Set up takes minutes. Most teams see the
                difference in one sprint.
              </p>
              <div className="mt-6">
                <Button
                  as="a"
                  href={CREATE_ACCOUNT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="sm"
                  className="rounded-[8px]"
                  onClick={() =>
                    posthog.capture('contact_route_clicked', {
                      contact_type: 'signup',
                      href: CREATE_ACCOUNT_URL,
                    })
                  }
                >
                  Create account
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Other routes */}
      <Section border="top" padding="none">
        <Container className="py-20 lg:py-24">
          <h2 className="text-ink text-xl font-medium tracking-[-0.02em]">Other inboxes</h2>
          <p className="text-ink-secondary mt-3 max-w-[44ch] text-sm leading-relaxed">
            Route your message directly if you already know where it belongs.
          </p>

          <div className="mt-10 space-y-8">
            {supportRoutes.map((route) => (
              <div
                key={route.label}
                className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-center sm:gap-8"
              >
                <div>
                  <p className="text-ink text-sm font-medium">{route.label}</p>
                  <p className="text-ink-secondary mt-1 text-sm leading-relaxed">
                    {route.description}
                  </p>
                </div>
                <a
                  href={`mailto:${route.email}`}
                  className="text-ink-secondary hover:text-ink font-mono text-[11px] tracking-[0.08em] transition-colors"
                  onClick={() =>
                    posthog.capture('contact_support_route_clicked', {
                      contact_type: route.label,
                      email: route.email,
                    })
                  }
                >
                  {route.email}
                </a>
                <button
                  type="button"
                  onClick={() => copyEmail(route.email)}
                  className="text-ink-tertiary hover:text-ink inline-flex min-h-[44px] items-center font-mono text-[10px] tracking-[0.12em] uppercase transition-colors"
                >
                  {copiedEmail === route.email ? 'Copied' : 'Copy'}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-1 sm:flex-row sm:gap-10">
            {[
              { label: 'Headquarters', detail: 'Pune, India' },
              { label: 'General response', detail: 'Within 24 hours' },
              { label: 'Production incidents', detail: 'Same-day · support@deploytitan.com' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-0.5 py-3">
                <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.14em] uppercase">
                  {item.label}
                </p>
                <p className="text-ink-secondary text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
