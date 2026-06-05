'use client'

import { CREATE_ACCOUNT_URL } from '@/lib/env'
import { useScrollReveal } from '../utils'
import { Container } from './shared/Container'
import { Button } from './shared/Button'

const trustSignals = [
  {
    label: 'Works with tools you already have',
    detail: 'GitHub, GitHub Actions, Jenkins, Grafana, Slack',
  },
  {
    label: 'No infrastructure changes',
    detail: 'Connect in minutes, not days',
  },
]


export function CTA() {
  const ref = useScrollReveal()

  return (
    <section id="final-cta" className="border-line relative border-t py-16 lg:py-20" ref={ref}>
      <div
        className="blueprint-grid pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      />

      <Container className="relative">
        <div
          className="border-line bg-surface corner-accent relative overflow-hidden border"
          style={{ borderRadius: '12px' }}
        >
          <div
            className="absolute top-0 right-0 h-3 w-3 border-t border-r opacity-30"
            style={{ borderColor: 'var(--color-primary)', borderRadius: '0 12px 0 0' }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 h-3 w-3 border-b border-l opacity-30"
            style={{ borderColor: 'var(--color-primary)', borderRadius: '0 0 0 12px' }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="border-line flex flex-col justify-center border-b p-10 lg:border-r lg:border-b-0 lg:p-16">
              <span
                data-reveal
                className="text-ink-secondary mb-5 inline-flex items-center gap-3 font-mono text-sm"
              >
                <span className="bg-primary/40 h-px w-8" />
                Free to start
              </span>

              <h2
                data-reveal
                data-reveal-delay="1"
                className="font-display mb-4 text-3xl leading-[1.12] font-medium tracking-[-0.022em] lg:text-4xl"
              >
                Try it on your
                <br />
                next sprint.
              </h2>

              <p
                data-reveal
                data-reveal-delay="2"
                className="text-ink-secondary mb-8 max-w-sm text-base leading-relaxed"
              >
                Create an account, connect GitHub and Slack, add your sprint PRs. You&apos;ll know if it&apos;s for you in one release.
              </p>

              <div data-reveal data-reveal-delay="3" className="flex max-w-sm flex-col gap-3">
                <Button
                  as="a"
                  href={CREATE_ACCOUNT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  block
                  className="group rounded-[8px]"
                >
                  Create account
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </div>

              <div
                data-reveal
                data-reveal-delay="4"
                className="border-line mt-8 space-y-3 border-t pt-6"
              >
                {trustSignals.map((ts) => (
                  <div key={ts.label} className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 opacity-60"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-sm">
                      <span className="text-ink font-medium">{ts.label}</span>
                      <span className="text-ink-tertiary">: {ts.detail}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center p-10 lg:p-16">
              <span
                data-reveal
                data-reveal-delay="3"
                className="text-ink-secondary mb-5 inline-flex items-center gap-3 font-mono text-sm"
              >
                <span className="bg-primary/40 h-px w-8" />
                Pricing
              </span>

              <h3
                data-reveal
                data-reveal-delay="4"
                className="font-display mb-3 text-2xl leading-[1.2] font-medium tracking-[-0.02em] lg:text-3xl"
              >
                Priced for teams,
                <br />
                not deployments.
              </h3>

              <p
                data-reveal
                data-reveal-delay="5"
                className="text-ink-secondary mb-8 max-w-sm text-base leading-relaxed"
              >
                Flat monthly rate. No per-deploy billing. No surprise charges at sprint end. Plans scale with your team size.
              </p>

              <div data-reveal data-reveal-delay="6">
                <Button
                  as="a"
                  href="/pricing"
                  variant="outline"
                  size="lg"
                  className="rounded-[8px]"
                >
                  See pricing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
