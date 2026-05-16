'use client'

import { CREATE_ACCOUNT_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import { Button } from '../shared/Button'
import { Container } from '../shared/Container'

const pains = [
  'Manual PR coordination across repos',
  'Freeze windows that turn into calendar theater',
  'No shared view of release readiness or blast radius',
  'Rollback plans that only exist after something breaks',
]

const capabilities = [
  {
    label: 'Release DAGs',
    title: 'Visualize release dependencies before merge time gets risky.',
    detail:
      'Link pull requests into one release object, track blocking services, and sequence merges with explicit dependency awareness.',
  },
  {
    label: 'Release control',
    title: 'Coordinate promotions, approvals, and freeze windows in one workflow.',
    detail:
      'Turn production windows into managed release plans instead of Slack threads and spreadsheet rituals.',
  },
  {
    label: 'Release visibility',
    title: 'See service impact, readiness, and timeline state at a glance.',
    detail:
      'Give platform teams, service owners, and leadership the same release record without forcing them into three different tools.',
  },
  {
    label: 'Rollback coordination',
    title: 'Prepare the recovery path before the rollout starts.',
    detail:
      'Attach rollback owners, playbooks, and dependency-aware recovery steps to the release itself.',
  },
  {
    label: 'Integrations',
    title: 'Work inside the systems teams already trust.',
    detail:
      'DeployTitan sits above GitHub, GitLab, Jira, Slack, and CI/CD systems to coordinate the release lifecycle they do not manage well today.',
  },
]

const teamFits = [
  'Platform teams coordinating shared services across many repos',
  'Microservice organizations where one release can touch a chain of downstream systems',
  'Distributed engineering teams with approval, audit, or freeze-window constraints',
  'Serverless and event-driven architectures with high release coordination overhead',
]

const toolGaps = [
  {
    tool: 'GitHub and GitLab',
    role: 'Great for code review, merge state, and pull request workflow.',
    gap: 'They do not coordinate the release itself across multiple repositories and teams.',
  },
  {
    tool: 'CI/CD systems',
    role: 'Excellent at building and executing pipelines.',
    gap: 'They run steps, but they do not model release readiness, freeze windows, or cross-service dependency risk.',
  },
  {
    tool: 'Observability platforms',
    role: 'Helpful once something degrades in production.',
    gap: 'They detect incidents after the fact, not the coordination problems that caused the release to become dangerous.',
  },
]

const roadmap = [
  {
    phase: 'Now',
    title: 'Titan Rollouts',
    detail:
      'The core product: release objects, dependency graphing, merge sequencing, release readiness, release timeline, and Slack updates.',
  },
  {
    phase: 'Next',
    title: 'Rollouts Intelligence',
    detail:
      'Deployment-aware insights like blast radius, downstream service impact, migration risk, and historically fragile services.',
  },
  {
    phase: 'Later',
    title: 'Enterprise Recovery Suite',
    detail:
      'Coordinated rollback workflows, migration safety, and recovery orchestration once the coordination layer is trusted.',
  },
]

export function PlatformOverview() {
  const ref = useScrollReveal()

  return (
    <div ref={ref}>
      <section id="release-workflow" className="border-b border-line py-20 lg:py-24">
        <Container width="page" padding="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <p
                data-reveal
                className="font-mono text-[11px] tracking-[0.22em] text-ink-tertiary uppercase"
              >
                The real problem
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
                className="mt-5 max-w-[60ch] text-lg leading-8 text-ink-secondary"
              >
                Shipping twenty services across multiple teams is where releases become painful.
                Teams end up coordinating PRs manually, waiting on freeze windows, managing risky
                rollbacks, and chasing release visibility across Slack, Jira, and CI/CD tools.
              </p>
            </div>

            <div data-reveal data-reveal-delay="2">
              <div className="border border-line" style={{ borderRadius: '2px' }}>
                {pains.map((pain, index) => (
                  <div
                    key={pain}
                    className="grid gap-4 border-b border-line px-5 py-5 last:border-b-0 sm:grid-cols-[72px_1fr]"
                  >
                    <span className="font-mono text-[10px] tracking-[0.14em] text-ink-tertiary uppercase">
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

      <section className="border-b border-line py-20 lg:py-24">
        <Container width="page" padding="wide">
          <div className="max-w-3xl">
            <p
              data-reveal
              className="font-mono text-[11px] tracking-[0.22em] text-ink-tertiary uppercase"
            >
              What DeployTitan does
            </p>
            <h2
              data-reveal
              data-reveal-delay="1"
              className="mt-4 font-display text-[clamp(2.2rem,4vw,3.8rem)] font-medium leading-[1.04] tracking-[-0.04em] text-ink"
            >
              Release coordination and deployment safety for distributed systems.
            </h2>
          </div>

          <div className="mt-12 border-t border-line" data-reveal data-reveal-delay="2">
            {capabilities.map((item) => (
              <div
                key={item.label}
                className="grid gap-4 border-b border-line py-7 lg:grid-cols-[180px_minmax(0,0.95fr)_minmax(0,1.05fr)]"
              >
                <p className="font-mono text-[10px] tracking-[0.16em] text-ink-tertiary uppercase">
                  {item.label}
                </p>
                <p className="text-lg leading-7 text-ink">{item.title}</p>
                <p className="max-w-[62ch] text-sm leading-7 text-ink-secondary">{item.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-20 lg:py-24">
        <Container width="page" padding="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div>
              <p
                data-reveal
                className="font-mono text-[11px] tracking-[0.22em] text-ink-tertiary uppercase"
              >
                Built for modern engineering teams
              </p>
              <h2
                data-reveal
                data-reveal-delay="1"
                className="mt-4 max-w-[16ch] font-display text-[clamp(2.1rem,3.8vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.04em] text-ink"
              >
                For teams whose release process spans more than one service.
              </h2>
              <p
                data-reveal
                data-reveal-delay="2"
                className="mt-5 max-w-[58ch] text-base leading-8 text-ink-secondary"
              >
                DeployTitan is not for every company. It is for teams with coordination overhead:
                microservices, platform engineering, distributed ownership, and releases that need
                more than a green pipeline to feel safe.
              </p>
            </div>

            <div className="space-y-4" data-reveal data-reveal-delay="2">
              {teamFits.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 border border-line bg-surface-alt/35 px-5 py-4"
                  style={{ borderRadius: '2px' }}
                >
                  <span className="mt-1.5 block h-2 w-2 shrink-0 bg-primary" style={{ borderRadius: '1px' }} />
                  <p className="text-sm leading-7 text-ink-secondary">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-20 lg:py-24">
        <Container width="page" padding="wide">
          <div className="max-w-3xl">
            <p
              data-reveal
              className="font-mono text-[11px] tracking-[0.22em] text-ink-tertiary uppercase"
            >
              Why existing tools fall short
            </p>
            <h2
              data-reveal
              data-reveal-delay="1"
              className="mt-4 font-display text-[clamp(2.1rem,3.7vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-ink"
            >
              Plenty of tools support shipping, almost none coordinate the release lifecycle itself.
            </h2>
          </div>

          <div className="mt-12 border border-line" style={{ borderRadius: '2px' }} data-reveal data-reveal-delay="2">
            <div className="grid gap-4 border-b border-line bg-surface-alt/60 px-5 py-4 lg:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)]">
              <p className="font-mono text-[10px] tracking-[0.16em] text-ink-tertiary uppercase">System</p>
              <p className="font-mono text-[10px] tracking-[0.16em] text-ink-tertiary uppercase">What it handles well</p>
              <p className="font-mono text-[10px] tracking-[0.16em] text-ink-tertiary uppercase">What still breaks down</p>
            </div>
            {toolGaps.map((row) => (
              <div
                key={row.tool}
                className="grid gap-4 border-b border-line px-5 py-5 last:border-b-0 lg:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)]"
              >
                <p className="text-sm font-medium text-ink">{row.tool}</p>
                <p className="text-sm leading-7 text-ink-secondary">{row.role}</p>
                <p className="text-sm leading-7 text-ink-secondary">{row.gap}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-24">
        <Container width="page" padding="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <p
                data-reveal
                className="font-mono text-[11px] tracking-[0.22em] text-ink-tertiary uppercase"
              >
                Product structure
              </p>
              <h2
                data-reveal
                data-reveal-delay="1"
                className="mt-4 max-w-[15ch] font-display text-[clamp(2.1rem,3.8vw,3.4rem)] font-medium leading-[1.04] tracking-[-0.04em] text-ink"
              >
                One core product, a clear intelligence layer, and a future recovery suite.
              </h2>
              <p
                data-reveal
                data-reveal-delay="2"
                className="mt-5 max-w-[58ch] text-base leading-8 text-ink-secondary"
              >
                Release coordination is where the overhead is most visible and the win is fastest
                to prove. Titan Rollouts ships first because it solves the coordination gap teams
                feel every release cycle. Foresight and Phoenix follow once the release system
                owns the record.
              </p>

              <div data-reveal data-reveal-delay="3" className="mt-8">
                <Button
                  as="a"
                  href={CREATE_ACCOUNT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                >
                  Create account
                </Button>
              </div>
            </div>

            <div className="space-y-4" data-reveal data-reveal-delay="2">
              {roadmap.map((item) => (
                <div
                  key={item.phase}
                  className="border border-line bg-surface-alt/35 px-5 py-5"
                  style={{ borderRadius: '2px' }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-lg font-medium text-ink">{item.title}</p>
                    <span className="font-mono text-[10px] tracking-[0.16em] text-ink-tertiary uppercase">
                      {item.phase}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink-secondary">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
