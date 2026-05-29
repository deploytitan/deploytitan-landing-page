'use client'

import { CREATE_ACCOUNT_URL } from '@/lib/env'
import { Button } from '../../components/shared/Button'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { SolutionNav } from '../../components/shared/SolutionNav'
import { SolutionPageHero } from '../../components/shared/SolutionPageHero'

const PHASES = [
  {
    number: '01',
    title: 'Group PRs into a release object',
    body: 'Link pull requests from multiple repositories into one named release. The release object is the shared source of truth for all teams involved: service owners, platform engineers, and leadership.',
    metric: { value: 'Multi-repo', label: 'across unlimited repositories' },
  },
  {
    number: '02',
    title: 'Build the dependency graph',
    body: 'DeployTitan infers which service needs to merge before another based on your PR descriptions, Jira links, and explicit blocking annotations. The dependency graph is computed automatically and visible to everyone.',
    metric: { value: 'Automatic', label: 'dependency inference from PR metadata' },
  },
  {
    number: '03',
    title: 'Track readiness and surface blockers',
    body: 'Every service in the release shows its current state. Blocking dependencies surface before the production window opens. The merge sequence is computed and communicated before anyone starts promoting.',
    metric: { value: 'Before merge', label: 'blockers identified, not post-incident' },
  },
  {
    number: '04',
    title: 'Coordinate freeze windows and approvals',
    body: 'Schedule production windows, collect approval sign-offs, and enforce pre-promotion checklists. All of it lives on the release record, not scattered across Slack threads and Jira tickets.',
    metric: { value: 'One place', label: 'for all approval and window coordination' },
  },
]

const BEFORE = [
  'Release readiness assessed in a Slack thread nobody can find later',
  'Blocking dependencies discovered at promotion time, not before',
  'Approvals collected manually: DM each owner, wait, follow up again',
  'Freeze window opens and merge order is still unclear',
]

const AFTER = [
  'Shared release record visible to all teams before the production window',
  'Dependency graph computed before merge sequencing begins',
  'Approval flow built into the release object with deadline tracking',
  'Promotion blocked until all dependencies clear and approvals are collected',
]

const toolGaps = [
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

export default function ReleaseCoordination() {
  useScrollReveal()

  return (
    <>
      <SolutionPageHero
        poweredBy="Powered by Titan Rollouts"
        heading={<>The release exists before<br className="hidden md:block" /> anyone starts merging.</>}
        description="Most multi-service releases are coordinated through a combination of Slack messages, Jira tickets, and institutional knowledge about which service blocks which. That knowledge lives in people, not systems. DeployTitan makes it structural."
        ctas={[
          { label: 'Create account', href: CREATE_ACCOUNT_URL, target: '_blank', rel: 'noopener noreferrer' },
        ]}
      />

      <section className="border-line border-b py-20">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">How it works</p>
            <h2 className="text-ink mb-3 text-3xl font-medium tracking-tight">
              From scattered PRs to a coordinated release.
            </h2>
          </div>

          <div className="flex flex-col gap-0">
            {PHASES.map((phase, i) => (
              <div
                key={phase.number}
                className="relative flex gap-8 pb-12 last:pb-0"
                data-reveal
                data-reveal-delay={String(i)}
              >
                {i < PHASES.length - 1 && (
                  <div className="absolute left-[18px] top-10 w-px bottom-0 bg-line" aria-hidden="true" />
                )}
                <div
                  className="w-9 h-9 border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 z-10"
                  style={{ borderRadius: '2px' }}
                >
                  <span className="font-mono text-[11px] font-bold text-primary-accessible dark:text-primary">{phase.number}</span>
                </div>
                <div className="pt-0.5 flex-1 grid gap-6 lg:grid-cols-[1fr_200px]">
                  <div>
                    <h3 className="text-base font-semibold text-ink mb-2 leading-snug">{phase.title}</h3>
                    <p className="text-sm text-ink-secondary leading-relaxed max-w-xl">{phase.body}</p>
                  </div>
                  <div
                    className="border border-primary/20 bg-primary/[0.04] p-4 h-fit"
                    style={{ borderRadius: '2px' }}
                  >
                    <p className="font-mono text-2xl font-medium text-ink leading-none mb-1">{phase.metric.value}</p>
                    <p className="font-mono text-[9px] tracking-widest uppercase text-ink-tertiary">{phase.metric.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-line bg-surface-alt/20 border-b py-20">
        <Container width="5xl" padding="default">
          <div className="grid gap-12 lg:grid-cols-2">
            <div data-reveal>
              <p className="text-signal-danger-text dark:text-signal-danger mb-4 font-mono text-xs tracking-widest uppercase">Before</p>
              <ul className="space-y-4">
                {BEFORE.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-signal-danger/60" style={{ borderRadius: '1px' }} />
                    <span className="text-sm leading-7 text-ink-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal data-reveal-delay="1">
              <p className="text-signal-success-text dark:text-signal-success mb-4 font-mono text-xs tracking-widest uppercase">After</p>
              <ul className="space-y-4">
                {AFTER.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-signal-success/70" style={{ borderRadius: '1px' }} />
                    <span className="text-sm leading-7 text-ink-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-line border-b py-20">
        <Container width="5xl" padding="default">
          <div className="max-w-3xl mb-10" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">Why existing tools fall short</p>
            <h2 className="text-ink text-3xl font-medium tracking-tight">
              Every tool coordinates its own layer. None of them coordinate the release.
            </h2>
          </div>

          <div className="border border-line" style={{ borderRadius: '2px' }} data-reveal>
            <div className="grid gap-4 border-b border-line bg-surface-alt/60 px-5 py-4 lg:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)]">
              <p className="font-mono text-[10px] tracking-[0.16em] text-ink-tertiary uppercase">Tool</p>
              <p className="font-mono text-[10px] tracking-[0.16em] text-ink-tertiary uppercase">What it handles well</p>
              <p className="font-mono text-[10px] tracking-[0.16em] text-ink-tertiary uppercase">The gap DeployTitan closes</p>
            </div>
            {toolGaps.map((row, i) => (
              <div
                key={row.tool}
                className={`grid gap-4 border-b border-line px-5 py-5 last:border-b-0 lg:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)] ${i % 2 === 0 ? '' : 'bg-surface-alt/20'}`}
              >
                <p className="text-sm font-medium text-ink">{row.tool}</p>
                <p className="text-sm leading-7 text-ink-secondary">{row.does}</p>
                <p className="text-sm leading-7 text-ink-secondary">{row.gap}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container width="3xl" padding="default" className="text-center">
          <p
            className="mb-4 font-mono text-[11px] tracking-[0.22em] text-ink-tertiary uppercase"
            data-reveal
          >
            Next step
          </p>
          <p className="text-ink mx-auto mb-8 max-w-2xl text-lg font-semibold" data-reveal>
            Bring us your messiest multi-service release. We will show you what the coordination
            workflow looks like when it is not a Slack thread.
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
              Create account
            </Button>
          </div>
        </Container>
      </section>

      <SolutionNav currentRoute="/solutions/release-coordination" />
    </>
  )
}
