'use client'

import { CREATE_ACCOUNT_URL } from '@/lib/env'
import { useScrollReveal } from '../utils'
import { Container } from './shared/Container'
import { Button } from './shared/Button'

const trustSignals = [
  {
    label: 'GitHub, GitLab, Jira, Slack, and CI/CD integrations',
    detail: 'Fits into the release workflow teams already use',
  },
  {
    label: 'No runtime traffic proxy required',
    detail: 'Adopt the coordination layer before touching infrastructure',
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
          style={{ borderRadius: '2px' }}
        >
          <div
            className="absolute top-0 right-0 h-3 w-3 border-t border-r opacity-30"
            style={{ borderColor: 'var(--color-primary)' }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 h-3 w-3 border-b border-l opacity-30"
            style={{ borderColor: 'var(--color-primary)' }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="border-line flex flex-col justify-center border-b p-10 lg:border-r lg:border-b-0 lg:p-16">
              <span
                data-reveal
                className="text-ink-secondary mb-5 inline-flex items-center gap-3 font-mono text-sm"
              >
                <span className="bg-primary/40 h-px w-8" />
                Create account
              </span>

              <h2
                data-reveal
                data-reveal-delay="1"
                className="font-display mb-4 text-3xl leading-[1.12] font-medium tracking-[-0.022em] lg:text-4xl"
              >
                Walk through your next
                <br />
                complex release.
              </h2>

              <p
                data-reveal
                data-reveal-delay="2"
                className="text-ink-secondary mb-8 max-w-sm text-base leading-relaxed"
              >
                We will map your release dependencies, freeze windows, approvals, and rollback
                process against the DeployTitan workflow.
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
                  className="group"
                >
                  Get started
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
                Price for coordination
                <br />
                complexity, not infra usage.
              </h3>

              <p
                data-reveal
                data-reveal-delay="5"
                className="text-ink-secondary mb-8 max-w-sm text-sm leading-relaxed"
              >
                Plans scale by service count and operational overhead, so teams can justify the
                workflow without worrying about per-deployment or per-request metering.
              </p>

              <div data-reveal data-reveal-delay="6" className="max-w-sm space-y-4">
                <div className="border-line space-y-3 border-y py-5">
                  {[
                    'Starter: up to 10 services for smaller release surfaces',
                    'Growth: up to 50 services with rollback workflows and integrations',
                    'Enterprise: SSO, compliance, and private deployment options',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span
                        className="bg-primary mt-1.5 block h-2 w-2 shrink-0"
                        style={{ borderRadius: '1px' }}
                      />
                      <p className="text-ink-secondary text-sm leading-6">{item}</p>
                    </div>
                  ))}
                </div>

                <Button as="a" href="/pricing" variant="outline" size="lg" block>
                  View pricing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
