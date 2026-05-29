'use client'

import { CREATE_ACCOUNT_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Button } from '../../components/shared/Button'
import { ProductPageHero } from '../../components/shared/ProductPageHero'

const PAIN = [
  'Release readiness assessed in a Slack thread nobody can find later',
  'Blocking dependencies discovered at promotion time, not before',
  'Rollback owners unknown until the window is already open',
]

const STEPS = [
  {
    number: '01',
    title: 'Group PRs into a release object',
    body: 'Link pull requests from multiple repositories into one named release. Every service owner, platform engineer, and team lead sees the same record.',
  },
  {
    number: '02',
    title: 'Build the dependency graph',
    body: 'DeployTitan infers which service must merge before another from PR metadata and explicit blocking annotations. Merge order is computed, not guessed.',
  },
  {
    number: '03',
    title: 'Schedule freeze windows and collect approvals',
    body: 'Production windows, sign-off requirements, and pre-promotion checklists live on the release record. Not in Slack threads. Not in someone\'s head.',
  },
  {
    number: '04',
    title: 'Promote in sequence, with rollback owners assigned',
    body: 'Merges happen in dependency order. Rollback owners, playbooks, and revert sequencing are attached to the release before the window opens.',
  },
]

const CAPABILITIES = [
  {
    title: 'Release objects across repositories',
    desc: 'Link PRs from multiple repos into one named release. One record for all teams — service owners, platform engineers, leadership.',
  },
  {
    title: 'Dependency graph and merge sequencing',
    desc: 'Which service deploys first, which waits. Computed automatically from PR metadata and explicit blocking annotations.',
  },
  {
    title: 'Freeze windows and approval workflows',
    desc: 'Production windows that close on checklist completion. Approvals attached to the release with deadline tracking and a complete audit trail.',
  },
  {
    title: 'Rollback coordination',
    desc: 'Owners, playbooks, and revert sequencing assigned before anything ships. Planned coordination, not improvised response.',
  },
]

const TOOL_GAPS = [
  {
    tool: 'GitHub / GitLab',
    does: 'Code review, PR status, merge checks per repository',
    gap: 'No release object that spans multiple repos; no cross-service dependency awareness',
  },
  {
    tool: 'CI/CD systems',
    does: 'Build pipelines, test runs, deployment execution',
    gap: 'Executes steps but does not model release readiness or cross-service promotion sequencing',
  },
  {
    tool: 'Jira / Linear',
    does: 'Issue tracking, sprint planning, project state management',
    gap: 'Good for ticket state; not built to coordinate PR merge order and promotion sequencing across services',
  },
]

const INTEGRATIONS = [
  { category: 'CI / CD', tools: ['GitHub Actions', 'GitLab CI', 'CircleCI', 'Buildkite'] },
  { category: 'Observability', tools: ['Datadog', 'Grafana', 'OpenTelemetry', 'Prometheus'] },
  { category: 'Notifications', tools: ['Slack', 'PagerDuty', 'Opsgenie', 'Webhooks'] },
  { category: 'Infrastructure', tools: ['Kubernetes', 'AWS ECS', 'Terraform', 'Helm'] },
]

export default function TitanRollout() {
  useScrollReveal()

  return (
    <>
      <ProductPageHero
        eyebrow="Titan Rollouts"
        heading={<>Multi-service releases,<br className="hidden md:block" /> structured.</>}
        description="Teams that release across more than one service coordinate in Slack threads, shared docs, and word-of-mouth about which service blocks which. Titan Rollouts replaces that with a structured release record."
        ctas={[
          { label: 'Start free trial', href: CREATE_ACCOUNT_URL, target: '_blank', rel: 'noopener noreferrer' },
          { label: 'View pricing', href: '/pricing', variant: 'secondary' },
        ]}
      />

      {/* The coordination gap */}
      <section className="border-line bg-surface-alt/20 border-b py-16">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-primary-accessible mb-4 font-mono text-xs tracking-widest uppercase">
            The coordination gap
          </p>
          <p className="text-ink mb-6 text-2xl font-medium leading-snug">
            Coordination is not a spreadsheet problem.
          </p>
          <ul className="flex flex-col gap-3">
            {PAIN.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="bg-signal-danger/60 mt-2 block h-1.5 w-1.5 shrink-0"
                  style={{ borderRadius: '1px' }}
                />
                <span className="text-ink-secondary leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-line border-b py-20">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              How it works
            </p>
            <h2 className="text-ink text-3xl font-medium tracking-tight">
              From scattered PRs to a coordinated release.
            </h2>
          </div>

          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="relative flex gap-8 pb-10 last:pb-0"
                data-reveal
                data-reveal-delay={String(i)}
              >
                {i < STEPS.length - 1 && (
                  <div
                    className="bg-line absolute top-10 bottom-0 left-[18px] w-px"
                    aria-hidden="true"
                  />
                )}
                <div
                  className="border-primary/30 bg-primary/5 z-10 flex h-9 w-9 shrink-0 items-center justify-center border"
                  style={{ borderRadius: '2px' }}
                >
                  <span className="text-primary-accessible dark:text-primary font-mono text-[11px] font-bold">{step.number}</span>
                </div>
                <div className="flex-1 pt-1.5">
                  <h3 className="text-ink mb-1.5 text-base font-semibold leading-snug">{step.title}</h3>
                  <p className="text-ink-secondary max-w-xl text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="border-line border-b py-20">
        <Container width="6xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              Capabilities
            </p>
            <h2 className="text-ink text-2xl font-semibold lg:text-3xl">
              From release creation to safe completion.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2" data-reveal>
            {CAPABILITIES.map((c) => (
              <div
                key={c.title}
                className="border-line bg-surface-alt/30 border p-6"
                style={{ borderRadius: '2px' }}
              >
                <h3 className="text-ink mb-2 text-base font-semibold">{c.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Tool gaps */}
      <section className="border-line border-b py-20">
        <Container width="5xl" padding="default">
          <div className="mb-10 max-w-3xl" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              Why existing tools fall short
            </p>
            <h2 className="text-ink text-3xl font-medium tracking-tight">
              Every tool coordinates its own layer. None coordinate the release.
            </h2>
          </div>

          <div className="border-line border" style={{ borderRadius: '2px' }} data-reveal>
            <div className="bg-surface-alt/60 border-line grid gap-4 border-b px-5 py-4 lg:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)]">
              <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.16em] uppercase">Tool</p>
              <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.16em] uppercase">
                What it handles well
              </p>
              <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.16em] uppercase">
                The gap DeployTitan closes
              </p>
            </div>
            {TOOL_GAPS.map((row, i) => (
              <div
                key={row.tool}
                className={`border-line grid gap-4 border-b px-5 py-5 last:border-b-0 lg:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)] ${i % 2 === 0 ? '' : 'bg-surface-alt/20'}`}
              >
                <p className="text-ink text-sm font-medium">{row.tool}</p>
                <p className="text-ink-secondary text-sm leading-7">{row.does}</p>
                <p className="text-ink-secondary text-sm leading-7">{row.gap}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Getting started */}
      <section className="border-line border-b py-20">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              Getting started
            </p>
            <h2 className="text-ink mb-2 text-2xl font-semibold lg:text-3xl">
              Up and running in an afternoon.
            </h2>
            <p className="text-ink-secondary max-w-xl text-sm">
              No infrastructure changes. No new tooling for engineers to learn. Connect your
              repositories, model your first release, and go.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2" data-reveal>
            {/* Setup steps */}
            <div className="flex flex-col gap-0">
              {[
                {
                  step: '01',
                  title: 'Connect your repositories',
                  body: 'Authorize DeployTitan with GitHub or GitLab. Your repositories and teams are imported automatically — no manual configuration.',
                },
                {
                  step: '02',
                  title: 'Create a release in the dashboard',
                  body: 'Name the release, add the services involved, and set their dependencies in the UI. The dependency graph is built as you work.',
                },
                {
                  step: '03',
                  title: 'Set freeze windows, approvals, and rollback owners',
                  body: 'Everything lives on the release record. Assign approvers, schedule the production window, and attach rollback owners before the first merge.',
                },
                {
                  step: '04',
                  title: 'Track and promote from the release view',
                  body: 'Service readiness, approval status, and blockers are visible to everyone in real time. Promote when gates clear; the dashboard surfaces anything that needs attention.',
                },
              ].map((item, i, arr) => (
                <div key={item.step} className="relative flex gap-6 pb-8 last:pb-0">
                  {i < arr.length - 1 && (
                    <div
                      className="bg-line absolute top-8 bottom-0 left-[13px] w-px"
                      aria-hidden="true"
                    />
                  )}
                  <div
                    className="border-primary/30 bg-primary/5 z-10 flex h-7 w-7 shrink-0 items-center justify-center"
                    style={{ borderRadius: '2px' }}
                  >
                    <span className="text-primary-accessible dark:text-primary font-mono text-[10px] font-bold">{item.step}</span>
                  </div>
                  <div className="pt-0.5">
                    <p className="text-ink mb-1 text-sm font-semibold">{item.title}</p>
                    <p className="text-ink-secondary text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Integrations */}
            <div>
              <p className="text-ink-tertiary mb-4 font-mono text-xs tracking-wider uppercase">
                Integrations
              </p>
              <div className="grid grid-cols-2 gap-3">
                {INTEGRATIONS.map((group) => (
                  <div
                    key={group.category}
                    className="border-line bg-surface-alt/20 border p-4"
                    style={{ borderRadius: '2px' }}
                  >
                    <p className="text-primary-accessible mb-2.5 font-mono text-[10px] tracking-wider uppercase">
                      {group.category}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {group.tools.map((t) => (
                        <li key={t} className="text-ink-secondary flex items-center gap-2 text-xs">
                          <span
                            className="bg-primary/50 h-1 w-1 shrink-0"
                            style={{ borderRadius: '1px' }}
                          />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container width="3xl" padding="default" className="text-center">
          <p
            className="text-ink-tertiary mb-4 font-mono text-[11px] tracking-[0.22em] uppercase"
            data-reveal
          >
            Get started
          </p>
          <p className="text-ink mx-auto mb-8 max-w-2xl text-xl font-semibold" data-reveal>
            Bring us your messiest multi-service release. We will show you what coordination looks
            like when it is not a Slack thread.
          </p>
          <div className="mx-auto max-w-sm" data-reveal>
            <Button
              as="a"
              href={CREATE_ACCOUNT_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              block
            >
              Start free trial
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
