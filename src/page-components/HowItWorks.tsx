'use client'

import { WAITLIST_URL } from '@/lib/env'
import { useScrollReveal } from '../utils'
import Link from 'next/link'
import { Container } from '../components/shared/Container'
import { Button } from '../components/shared/Button'

const INTEGRATIONS = [
  { name: 'GitHub', category: 'Code' },
  { name: 'GitLab', category: 'Code' },
  { name: 'Jira', category: 'Planning' },
  { name: 'Slack', category: 'Notifications' },
  { name: 'GitHub Actions', category: 'CI/CD' },
  { name: 'CircleCI', category: 'CI/CD' },
]

const STEPS = [
  {
    number: '01',
    title: 'Connect your repositories',
    body: 'Link GitHub or GitLab via OAuth. DeployTitan reads PR state, merge status, and CI results. No controller, no sidecar, no infra changes required.',
    detail: 'GitHub · GitLab · OAuth · read-only scopes',
  },
  {
    number: '02',
    title: 'Create a release object',
    body: 'Group pull requests from multiple repositories into one named release. DeployTitan builds the dependency graph from your PR descriptions, Jira links, and explicit blocking annotations.',
    detail: 'Multi-repo · PR grouping · dependency inference',
  },
  {
    number: '03',
    title: 'Track readiness and blockers',
    body: 'Every service in the release shows its current state: Ready, Blocked, Staging, or Approved. Blocking dependencies surface before they cause a production incident.',
    detail: 'Readiness states · blocking detection · shared visibility',
  },
  {
    number: '04',
    title: 'Coordinate freeze windows and approvals',
    body: 'Schedule production windows, collect approval sign-offs, and enforce pre-promotion checklists. All of it lives on the release record, not spread across Slack threads.',
    detail: 'Freeze windows · approval flows · promotion checklists',
  },
  {
    number: '05',
    title: 'Assign rollback owners before anything ships',
    body: 'Every service in a release gets a named rollback owner and a linked rollback playbook. Dependency-aware revert sequencing is computed from the same graph used for the rollout.',
    detail: 'Rollback owners · playbooks · revert sequencing',
  },
  {
    number: '06',
    title: 'Promote with confidence',
    body: 'When all dependencies clear, approvals are collected, and rollback owners are assigned, the release promotes. The full release record becomes an immutable audit trail.',
    detail: 'Coordinated promotion · audit log · release record',
  },
]

const TOOL_COMPARISON = [
  {
    tool: 'GitHub / GitLab',
    does: 'Code review, merge state, CI status per PR',
    gap: 'No release object that groups PRs across repositories; no cross-service dependency awareness',
  },
  {
    tool: 'CI/CD (Actions, CircleCI)',
    does: 'Build pipelines, test runs, deployment execution',
    gap: 'Executes steps but does not model release readiness, freeze windows, or cross-service dependency risk',
  },
  {
    tool: 'Jira / Linear',
    does: 'Issue tracking, sprint planning, project state',
    gap: 'Great for ticket state; not built to coordinate the merge and promotion sequence across services',
  },
  {
    tool: 'Observability (Datadog, Grafana)',
    does: 'Detects post-deploy incidents, error rates, latency',
    gap: 'Tells you something broke after it shipped; does not coordinate the release that caused the breakage',
  },
]

export default function HowItWorks() {
  useScrollReveal()

  return (
    <>
      <section className="blueprint-grid pt-28 pb-16 border-b border-line">
        <Container width="4xl" padding="default" className="text-center" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-4">
            How it works
          </p>
          <h1 className="text-[clamp(2.8rem,6vw,5.5rem)] font-medium text-ink leading-[0.98] tracking-[-0.05em] mb-5">
            Release coordination,
            <br />
            start to finish.
          </h1>
          <p className="text-lg text-ink-secondary leading-8 max-w-xl mx-auto mb-10">
            DeployTitan sits above your existing code, CI/CD, and observability tools to coordinate
            the release lifecycle those systems do not manage well on their own.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              as="a"
              href={WAITLIST_URL}
              variant="primary"
              size="lg"
            >
              Join waitlist
            </Button>
            <Link
              href="/docs"
              className="text-sm font-medium text-primary-accessible hover:text-primary transition-colors"
            >
              Read the docs →
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-24 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-14" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
              Where DeployTitan fits
            </p>
            <h2 className="text-3xl lg:text-4xl font-medium text-ink leading-tight tracking-tight mb-4">
              Above your tools, not replacing them.
            </h2>
            <p className="text-sm text-ink-secondary max-w-lg leading-relaxed">
              Every tool in your stack does its job well. None of them coordinate the release
              lifecycle that spans all of them. That gap is where releases become painful.
            </p>
          </div>

          <div
            className="border border-line"
            style={{ borderRadius: '2px' }}
            data-reveal
          >
            <div className="grid gap-4 border-b border-line bg-surface-alt/60 px-5 py-4 lg:grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)]">
              <p className="font-mono text-[10px] tracking-[0.16em] text-ink-tertiary uppercase">Tool</p>
              <p className="font-mono text-[10px] tracking-[0.16em] text-ink-tertiary uppercase">What it handles well</p>
              <p className="font-mono text-[10px] tracking-[0.16em] text-ink-tertiary uppercase">What still breaks down</p>
            </div>
            {TOOL_COMPARISON.map((row, i) => (
              <div
                key={row.tool}
                className={`grid gap-4 border-b border-line px-5 py-5 last:border-b-0 lg:grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)] ${i % 2 === 0 ? '' : 'bg-surface-alt/20'}`}
              >
                <p className="text-sm font-medium text-ink">{row.tool}</p>
                <p className="text-sm leading-7 text-ink-secondary">{row.does}</p>
                <p className="text-sm leading-7 text-ink-secondary">{row.gap}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-28 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-16" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
              Walkthrough
            </p>
            <h2 className="text-3xl lg:text-4xl font-medium text-ink leading-tight tracking-tight">
              From scattered PRs to a coordinated release in six steps.
            </h2>
          </div>

          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="relative flex gap-8 pb-12 last:pb-0"
                data-reveal
                data-reveal-delay={String(i)}
              >
                {i < STEPS.length - 1 && (
                  <div className="absolute left-[18px] top-10 w-px bottom-0 bg-line" aria-hidden="true" />
                )}

                <div
                  className="w-9 h-9 border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 z-10"
                  style={{ borderRadius: '2px' }}
                >
                  <span className="font-mono text-[11px] font-bold text-primary-accessible dark:text-primary">{step.number}</span>
                </div>

                <div className="pt-0.5 flex-1">
                  <h3 className="text-base font-semibold text-ink mb-2 leading-snug">{step.title}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed mb-3 max-w-xl">{step.body}</p>
                  <p className="font-mono text-[9px] tracking-widest uppercase text-ink-tertiary">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
              Integrations
            </p>
            <h2 className="text-3xl lg:text-4xl font-medium text-ink leading-tight tracking-tight mb-3">
              Works with the tools your teams already use.
            </h2>
            <p className="text-sm text-ink-secondary max-w-lg leading-relaxed">
              No replacement, no migration. DeployTitan connects to your existing stack and
              coordinates the layer above it.
            </p>
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-px border border-line bg-line"
            style={{ borderRadius: '2px' }}
            data-reveal
          >
            {INTEGRATIONS.map((item) => (
              <div
                key={item.name}
                className="bg-surface px-5 py-5 flex items-center gap-3"
              >
                <span className="block h-2 w-2 shrink-0 bg-primary/60" style={{ borderRadius: '1px' }} />
                <div>
                  <p className="text-sm font-medium text-ink">{item.name}</p>
                  <p className="font-mono text-[10px] tracking-[0.12em] text-ink-tertiary uppercase">{item.category}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-ink-tertiary" data-reveal>
            GitLab, Bitbucket, Jenkins, PagerDuty, and more integrations are on the roadmap.{' '}
            <Link href="/integrations" className="text-primary-accessible hover:text-primary transition-colors">
              See all integrations →
            </Link>
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container width="3xl" padding="default" className="text-center">
          <p
            className="mb-4 font-mono text-[11px] tracking-[0.22em] text-ink-tertiary uppercase"
            data-reveal
          >
            Next step
          </p>
          <p className="text-ink mx-auto mb-8 max-w-2xl text-lg font-semibold" data-reveal>
            Bring us a messy multi-service release. We will show you how the coordination workflow
            becomes manageable.
          </p>
          <div className="mx-auto max-w-sm" data-reveal>
            <Button
              as="a"
              href={WAITLIST_URL}
              variant="primary"
              size="lg"
              block
            >
              Join waitlist
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
