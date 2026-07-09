'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { Button } from '../components/shared/Button'

const supportRoutes = [
  {
    label: 'AI adoption and delivery',
    description:
      'Questions about throughput, review capacity, release safety, or internal tooling.',
    email: 'support@deploytitan.com',
  },
  {
    label: 'Content and research',
    description: 'Reader feedback, founder notes, research ideas, or company context.',
    email: 'press@deploytitan.com',
  },
  {
    label: 'Everything else',
    description: 'Partnerships, early access, hiring interest, or a note you want us to read.',
    email: 'hello@deploytitan.com',
  },
]

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  async function copyEmail(email: string) {
    try {
      await navigator.clipboard.writeText(email)
      setCopiedEmail(email)
      trackEvent('contact_email_copied', { email })
      window.setTimeout(() => {
        setCopiedEmail((current) => (current === email ? null : current))
      }, 2000)
    } catch {
      setCopiedEmail(null)
    }
  }

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <Section padding="none">
        <Container className="pt-20 pb-24 lg:pt-28 lg:pb-32">
          <span className="hero-label text-ink-tertiary font-mono text-[11px] tracking-widest uppercase">
            Contact
          </span>
          <h1 className="hero-heading font-display text-ink mt-5 max-w-[18ch] text-[clamp(2.8rem,6.5vw,7.2rem)] leading-[0.95] font-medium tracking-[-0.06em]">
            Bring us the bottleneck AI exposed.
          </h1>
          <p className="hero-body text-ink-secondary mt-8 max-w-[44ch] text-lg leading-relaxed">
            If AI helped your team write more code but review, verification, or deployment safety
            became the constraint, start here.
          </p>
          <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              as="a"
              href="mailto:hello@deploytitan.com?subject=Hello"
              variant="primary"
              size="lg"
              onClick={() =>
                trackEvent('contact_route_clicked', {
                  contact_type: 'hello',
                  href: 'mailto:hello@deploytitan.com?subject=Hello',
                })
              }
            >
              Say hello
            </Button>
            <Button
              as="a"
              href="mailto:sales@deploytitan.com?subject=DeployTitan%20fit%20for%20our%20team"
              variant="outline"
              size="lg"
              onClick={() =>
                trackEvent('contact_route_clicked', {
                  contact_type: 'sales',
                  href: 'mailto:sales@deploytitan.com',
                })
              }
            >
              Contact sales
            </Button>
          </div>
        </Container>
      </Section>

      {/* Other routes */}
      <Section border="top" padding="none">
        <Container className="py-20 lg:py-28">
          <div className="bg-primary/60 mb-6 h-px w-10" aria-hidden="true" />
          <h2 className="text-ink text-xl font-medium tracking-[-0.02em]">Other inboxes</h2>
          <p className="text-ink-secondary mt-3 max-w-[44ch] text-sm leading-relaxed">
            Route your message directly if you already know where it belongs.
          </p>

          <div className="mt-10 space-y-8">
            {supportRoutes.map((route) => (
              <div
                key={route.label}
                className="contact-route-row grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-center sm:gap-8"
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
                    trackEvent('contact_support_route_clicked', {
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
                  {copiedEmail === route.email ? (
                    <span
                      key="copied"
                      className="copy-check text-signal-success inline-flex items-center gap-1.5"
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M1.5 5.5l2.5 2.5 5.5-5.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Copied
                    </span>
                  ) : (
                    <span key="copy">Copy</span>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-1 sm:flex-row sm:gap-10">
            {[
              { label: 'Headquarters', detail: 'Pune, India' },
              { label: 'General response', detail: 'Within 24 hours' },
              { label: 'Early access', detail: 'Waitlist-first · hello@deploytitan.com' },
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
