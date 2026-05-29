'use client'

import { CREATE_ACCOUNT_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import { Button } from '../shared/Button'
import { Container } from '../shared/Container'

const pains = [
  'PRs merge out of order. A downstream service ships before its dependency is ready.',
  'Freeze windows live in someone\'s calendar. Half the team doesn\'t know the window is open.',
  'Rollback means a Slack thread, a war room call, and no clear owner.',
  'Leadership asks "what\'s the release status?" Nobody has the same answer.',
]

const releaseRecord = [
  {
    step: '01',
    label: 'Order',
    title: 'Services deploy in dependency order.',
    meta: 'checkout-api before web-storefront',
    status: 'Sequenced',
  },
  {
    step: '02',
    label: 'Window',
    title: 'Freeze windows close on checklist completion.',
    meta: '3 of 4 checks complete',
    status: 'Open',
  },
  {
    step: '03',
    label: 'Approvals',
    title: 'Sign-offs stay attached to the release.',
    meta: 'security pending',
    status: 'Waiting',
  },
  {
    step: '04',
    label: 'Status',
    title: 'Every owner sees the same timeline.',
    meta: '5 services, 6 PRs',
    status: 'Live',
  },
  {
    step: '05',
    label: 'Rollback',
    title: 'Recovery owners are named before deploy.',
    meta: 'payments-service assigned',
    status: 'Ready',
  },
]

const teamFits = [
  'Your releases regularly touch more than two services',
  'You coordinate shipping in Slack threads or shared spreadsheets',
  'Freeze windows, approvals, or compliance gates are part of your process',
  'Distributed teams own different services that depend on each other',
]

export function PlatformOverview() {
  const ref = useScrollReveal()

  return (
    <div ref={ref}>
      {/* Section 1: The pain */}
      <section id="release-workflow" className="border-b border-line py-20 lg:py-24">
        <Container width="page" padding="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <p
                data-reveal
                className="font-mono text-[11px] tracking-[0.22em] text-ink-tertiary uppercase"
              >
                The problem
              </p>
              <h2
                data-reveal
                data-reveal-delay="1"
                className="mt-4 max-w-[15ch] font-display text-[clamp(2.3rem,4.2vw,4rem)] font-medium leading-[1.02] tracking-[-0.04em] text-ink"
              >
                Shipping one service is easy.
              </h2>
              <p
                data-reveal
                data-reveal-delay="2"
                className="mt-5 max-w-[52ch] text-lg leading-8 text-ink-secondary"
              >
                Shipping five across multiple teams is where things break down.
              </p>
            </div>

            <div data-reveal data-reveal-delay="2">
              <div className="border border-line" style={{ borderRadius: '2px' }}>
                {pains.map((pain, index) => (
                  <div
                    key={pain}
                    className="grid gap-4 border-b border-line px-5 py-5 last:border-b-0 sm:grid-cols-[48px_1fr]"
                  >
                    <span className="font-mono text-[10px] tracking-[0.14em] text-ink-tertiary uppercase self-start pt-0.5">
                      0{index + 1}
                    </span>
                    <p className="text-base leading-7 text-ink-secondary">{pain}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 2: What DeployTitan does */}
      <section className="relative overflow-hidden border-b border-line py-20 lg:py-28">
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
        <Container width="page" padding="wide">
          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(520px,1.22fr)] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p
                data-reveal
                className="font-mono text-[11px] tracking-[0.22em] text-ink-tertiary uppercase"
              >
                What DeployTitan does
              </p>
              <h2
                data-reveal
                data-reveal-delay="1"
                className="mt-4 max-w-[11ch] font-display text-[clamp(3rem,5.8vw,5.6rem)] font-medium leading-[0.94] tracking-[-0.055em] text-ink"
              >
                One record replaces the release scramble.
              </h2>
              <p
                data-reveal
                data-reveal-delay="2"
                className="mt-6 max-w-[42ch] text-lg leading-8 text-ink-secondary"
              >
                DeployTitan sits above your existing tools and gives every service owner the same
                sequence, window, approvals, status, and recovery plan.
              </p>
              <div
                data-reveal
                data-reveal-delay="3"
                className="mt-8 grid max-w-[480px] grid-cols-2 border border-line bg-surface/75 sm:grid-cols-4"
                style={{ borderRadius: '2px' }}
              >
                {['GitHub', 'GitLab', 'Jira', 'Slack'].map((tool) => (
                  <div key={tool} className="border-line px-4 py-3 text-center odd:border-r sm:border-r sm:last:border-r-0">
                    <p className="font-mono text-[10px] tracking-[0.12em] text-ink-tertiary uppercase">{tool}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              data-reveal
              data-reveal-delay="2"
              className="border border-line bg-surface"
              style={{ borderRadius: '2px' }}
            >
              <div className="flex flex-col gap-4 border-b border-line bg-surface-alt/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-ink-tertiary uppercase">
                    Release record
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-ink">
                    spring-checkout / prod-window-b
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="block h-1.5 w-1.5 bg-signal-warning" style={{ borderRadius: '1px' }} />
                  <p className="font-mono text-[10px] tracking-[0.12em] text-signal-warning uppercase">
                    In coordination
                  </p>
                </div>
              </div>

              <div className="divide-y divide-line">
                {releaseRecord.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-4 px-5 py-5 transition-colors duration-300 hover:bg-surface-alt/55 sm:grid-cols-[44px_96px_minmax(0,1fr)_92px] sm:items-center"
                  >
                    <p className="font-mono text-[10px] tracking-[0.14em] text-ink-quaternary uppercase">
                      {item.step}
                    </p>
                    <p className="font-mono text-[10px] tracking-[0.14em] text-ink-tertiary uppercase">
                      {item.label}
                    </p>
                    <div>
                      <p className="text-base leading-6 text-ink">{item.title}</p>
                      <p className="mt-1 font-mono text-[10px] leading-5 text-ink-tertiary">{item.meta}</p>
                    </div>
                    <p className="w-fit border border-line bg-surface-alt px-2 py-1 font-mono text-[9px] tracking-[0.12em] text-ink-secondary uppercase sm:justify-self-end">
                      {item.status}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid border-t border-line bg-primary/[0.035] sm:grid-cols-3">
                {[
                  'No status meeting',
                  'No release spreadsheet',
                  'No infra rewrite',
                ].map((item) => (
                  <div key={item} className="border-line px-5 py-4 sm:border-r sm:last:border-r-0">
                    <p className="font-mono text-[10px] tracking-[0.1em] text-primary-accessible uppercase">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 3: Who it's for + CTA */}
      <section className="py-20 lg:py-24">
        <Container width="page" padding="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <p
                data-reveal
                className="font-mono text-[11px] tracking-[0.22em] text-ink-tertiary uppercase"
              >
                Built for
              </p>
              <h2
                data-reveal
                data-reveal-delay="1"
                className="mt-4 max-w-[16ch] font-display text-[clamp(2.1rem,3.8vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.04em] text-ink"
              >
                Teams with coordination overhead.
              </h2>
              <p
                data-reveal
                data-reveal-delay="2"
                className="mt-5 max-w-[52ch] text-base leading-8 text-ink-secondary"
              >
                DeployTitan is not for every team. It is for teams where release coordination is
                already a job that someone is doing manually.
              </p>

              <div data-reveal data-reveal-delay="3" className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  as="a"
                  href={CREATE_ACCOUNT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                >
                  Start free trial
                </Button>
                <Button as="a" href="/pricing" variant="outline" size="lg">
                  View pricing
                </Button>
              </div>
            </div>

            <div className="space-y-3" data-reveal data-reveal-delay="2">
              {teamFits.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 border border-line bg-surface-alt/35 px-5 py-4"
                  style={{ borderRadius: '2px' }}
                >
                  <span className="mt-2 block h-1.5 w-1.5 shrink-0 bg-primary" style={{ borderRadius: '1px' }} />
                  <p className="text-sm leading-7 text-ink-secondary">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
