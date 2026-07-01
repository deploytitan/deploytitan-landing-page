'use client'

import { WAITLIST_URL } from '@/lib/env'
import { useScrollReveal } from '../utils'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'
import { Button } from '../components/shared/Button'

const PAIN_CATEGORIES = [
  {
    id: 'multi-repo-chaos',
    num: '01',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
    heading: 'Multi-repo release chaos.',
    body: 'Six services, four teams, twelve PRs spread across repositories. The release is "ready" when someone in Slack says it is. Nobody has a complete picture of which service is blocking which, and the merge order matters but nobody owns it.',
    link: '/solutions/release-coordination',
    linkLabel: 'How we fix this →',
  },
  {
    id: 'freeze-window-theater',
    num: '02',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    heading: 'Freeze window theater.',
    body: 'The production window opens. Whoever remembers to announce in Slack starts promoting. Half the approvals are missing. Two services needed to go in order but nobody coordinated the sequence. The freeze window closes with three things still pending.',
    link: '/solutions/release-coordination',
    linkLabel: 'How we fix this →',
  },
  {
    id: 'blind-rollback',
    num: '03',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/>
      </svg>
    ),
    heading: 'Rollback coordination missing.',
    body: 'Production degrades thirty minutes after the release. The on-call engineer knows something needs to roll back. They do not know the revert order, which services are safe to revert independently, or who owns the database migration.',
    link: '/solutions/instant-rollback',
    linkLabel: 'How we fix this →',
  },
  {
    id: 'no-release-visibility',
    num: '04',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    heading: 'No shared release view.',
    body: 'Platform teams live in CI. Service owners live in GitHub. Leadership asks for release status in Jira. Nobody has a single place to see the state of a release across all services, teams, and environments.',
    link: '/solutions/platform-engineering',
    linkLabel: 'How we fix this →',
  },
]

const PROOF_SCENARIOS = [
  {
    before: { value: '4+ tools', label: 'to track one multi-service release: Slack, Jira, GitHub, CI' },
    after: { value: '1 release record', label: 'with full dependency graph, readiness state, and timeline' },
    solution: 'Release Coordination',
    route: '/solutions/release-coordination',
  },
  {
    before: { value: '30+ min', label: 'rollback coordination when something degrades post-release' },
    after: { value: 'owners assigned', label: 'rollback playbooks and revert sequencing before day one' },
    solution: 'Rollback Coordination',
    route: '/solutions/instant-rollback',
  },
  {
    before: { value: 'DM + wait + follow up', label: 'manual approval chain: scattered across Slack, no deadline, no audit trail' },
    after: { value: 'one approval workflow', label: 'built into the release object, with deadlines, sign-offs, and a full audit trail' },
    solution: 'Approval Workflows',
    route: '/solutions/release-coordination',
  },
]

const PERSONAS = [
  {
    id: 'platform',
    role: 'Platform / DevOps Engineer',
    frustration: '"I am the human coordination layer for every release."',
    body: 'You get pinged on every release because nobody else has the full picture. You know which services block which. You know the merge order. DeployTitan makes that knowledge structural rather than personal.',
    wins: [
      'Release objects replace the Slack thread you manage manually today',
      'Blocking dependencies surface automatically before they become incidents',
      'Shared release record means you stop being the bottleneck',
    ],
    link: '/solutions/platform-engineering',
  },
  {
    id: 'sre',
    role: 'Site Reliability Engineer',
    frustration: '"Rollback incidents are always worse than they should be."',
    body: 'You know the playbook. The problem is nobody ran it before the release. Owners were not assigned, the revert order was not thought through, and the migration rollback script was not linked anywhere.',
    wins: [
      'Rollback owners and playbooks attached to the release before anything merges',
      'Dependency-aware revert sequencing computed before promotion day',
      'Release record shows every service state, approval status, and blocker before the window opens',
    ],
    link: '/solutions/instant-rollback',
  },
  {
    id: 'manager',
    role: 'Engineering Manager / VP Engineering',
    frustration: '"I have no reliable view of release status across teams."',
    body: 'You ask for release status and get three different answers from three different people. There is no single source of truth for what is in the current release, what is blocked, and what is approved.',
    wins: [
      'Single release record visible across platform teams, service owners, and leadership',
      'Approval and freeze window state in one place, not across Slack and Jira',
      'Release readiness visible before the production window opens',
    ],
    link: '/solutions/release-coordination',
  },
]

const SOLUTION_INDEX = [
  {
    route: '/solutions/release-coordination',
    name: 'Release Coordination',
    tagline: 'Group PRs across repos into one release object. Track dependencies, sequence merges, coordinate promotions.',
    product: 'Titan Rollouts',
    available: true,
  },
  {
    route: '/solutions/instant-rollback',
    name: 'Rollback Coordination',
    tagline: 'Owners, playbooks, and revert sequencing attached to the release before anything ships.',
    product: 'Titan Rollouts',
    available: true,
  },
  {
    route: '/solutions/release-coordination',
    name: 'Freeze Windows',
    tagline: 'Schedule production windows, enforce pre-promotion checklists, and collect approval sign-offs before anyone starts merging.',
    product: 'Titan Rollouts',
    available: true,
  },
  {
    route: '/solutions/platform-engineering',
    name: 'Platform Engineering',
    tagline: 'Shared release record across platform teams, service owners, and leadership without three different tools.',
    product: 'Titan Rollouts',
    available: true,
  },
]

export default function Solutions() {
  useScrollReveal()

  return (
    <>
      <section className="blueprint-grid border-line border-b pt-28 pb-20">
        <Container width="4xl" padding="default">
          <p className="text-primary-accessible mb-4 font-mono text-xs tracking-widest uppercase" data-reveal data-reveal-delay="1">Solutions</p>
          <h1 className="text-ink mb-6 text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[1.0] tracking-[-0.05em]" data-reveal data-reveal-delay="2">
            Release coordination
            <br /> for distributed teams.
          </h1>
          <p className="text-ink-secondary mb-4 max-w-2xl text-lg leading-relaxed" data-reveal data-reveal-delay="3">
            GitHub manages code. CI/CD executes pipelines. Observability detects incidents.
            Nobody coordinates the release lifecycle that spans all of them.
          </p>
          <p className="text-ink-secondary max-w-2xl text-lg leading-relaxed" data-reveal data-reveal-delay="4">
            That gap is where releases become painful. DeployTitan closes it.
          </p>
        </Container>
      </section>

      <section className="border-line border-b py-24">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              The problems
            </p>
            <h2 className="text-ink mb-3 text-2xl leading-snug font-semibold lg:text-3xl">
              Recognize any of these?
            </h2>
            <p className="text-ink-secondary max-w-xl">
              Not edge cases. The normal state of deployment coordination for most distributed engineering teams.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {PAIN_CATEGORIES.map((p, i) => (
              <Card
                key={p.id}
                padding="none"
                className="hover:border-primary/20 flex flex-col gap-4 p-7 transition-all duration-200"
                data-reveal
                data-reveal-delay={String(i % 2)}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="text-ink-tertiary border-line mt-0.5 shrink-0 border px-1.5 py-0.5 font-mono text-[10px] leading-none font-bold"
                    style={{ borderRadius: '2px' }}
                  >
                    {p.num}
                  </span>
                  <div className="flex items-start gap-2.5">
                    <span className="text-primary-accessible dark:text-primary mt-0.5 shrink-0">{p.icon}</span>
                    <h3 className="text-ink text-base leading-snug font-semibold">{p.heading}</h3>
                  </div>
                </div>
                <p className="text-ink-secondary text-sm leading-relaxed">{p.body}</p>
                <a
                  href={p.link}
                  className="text-primary-accessible hover:text-primary mt-auto text-sm font-medium transition-colors"
                >
                  {p.linkLabel}
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-line bg-surface-alt/20 border-b py-16">
        <Container width="6xl" padding="default">
          <p
            className="text-ink-tertiary mb-10 text-center font-mono text-xs tracking-widest uppercase"
            data-reveal
          >
            Before and after
          </p>
          <div className="bg-line flex flex-col gap-px">
            {PROOF_SCENARIOS.map((s, i) => (
              <a
                key={s.solution}
                href={s.route}
                className="bg-surface hover:bg-surface-alt/50 group grid grid-cols-1 items-center gap-4 px-8 py-6 transition-colors md:grid-cols-[1fr_auto_1fr_auto] md:gap-8"
                data-reveal
                data-reveal-delay={String(i + 1)}
              >
                <div>
                  <p className="text-signal-danger-text dark:text-signal-danger mb-1 font-mono text-[10px] tracking-widest uppercase">Before</p>
                  <p className="text-ink-secondary text-xl font-bold line-through decoration-signal-danger/30">{s.before.value}</p>
                  <p className="text-ink-tertiary mt-1 text-xs leading-snug">{s.before.label}</p>
                </div>
                <div className="text-primary-accessible dark:text-primary hidden items-center md:flex">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
                <div>
                  <p className="text-signal-success-text dark:text-signal-success mb-1 font-mono text-[10px] tracking-widest uppercase">After</p>
                  <p className="text-ink text-xl font-bold">{s.after.value}</p>
                  <p className="text-ink-tertiary mt-1 text-xs leading-snug">{s.after.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-primary-accessible dark:text-primary border-primary/30 border px-2 py-1 font-mono text-[9px] tracking-widest whitespace-nowrap uppercase"
                    style={{ borderRadius: '2px' }}
                  >
                    {s.solution}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-ink-tertiary group-hover:text-primary transition-colors"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-line border-b py-24">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">By role</p>
            <h2 className="text-ink mb-3 text-2xl leading-snug font-semibold lg:text-3xl">
              Your frustration has a name.
            </h2>
            <p className="text-ink-secondary max-w-xl">
              The release coordination problem feels different depending on where you sit in the engineering org.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PERSONAS.map((p) => (
              <Card
                key={p.id}
                padding="none"
                className="hover:bg-surface-alt/50 hover:border-primary/20 flex flex-col gap-5 p-7 transition-all"
                data-reveal
              >
                <div>
                  <span className="text-ink-tertiary font-mono text-xs tracking-widest uppercase">{p.role}</span>
                </div>
                <blockquote className="text-primary-accessible dark:text-primary text-sm leading-relaxed font-medium italic">{p.frustration}</blockquote>
                <p className="text-ink-secondary text-sm leading-relaxed">{p.body}</p>
                <ul className="flex flex-col gap-2">
                  {p.wins.map((w) => (
                    <li key={w} className="text-ink-secondary flex items-start gap-2 text-sm">
                      <span className="text-primary-accessible dark:text-primary mt-1 shrink-0 text-xs">▸</span>
                      {w}
                    </li>
                  ))}
                </ul>
                <a href={p.link} className="text-primary-accessible hover:text-primary mt-auto text-sm font-medium transition-colors">
                  See the solution →
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-line border-b py-24">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">All solutions</p>
            <h2 className="text-ink mb-3 text-2xl leading-snug font-semibold lg:text-3xl">
              Find the one that matches your situation.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            {SOLUTION_INDEX.map((s) => (
              <a
                key={s.name}
                href={s.route}
                className="sharp-card border-line hover:border-primary/30 hover:bg-surface-alt/50 flex flex-col gap-3 border p-6 transition-all"
                data-reveal
              >
                <h3 className="text-ink text-sm font-semibold">{s.name}</h3>
                <p className="text-ink-secondary flex-1 text-sm leading-relaxed">{s.tagline}</p>
                <span
                  className="text-ink-tertiary border-line w-fit border px-1.5 py-0.5 font-mono text-[9px] tracking-widest uppercase"
                  style={{ borderRadius: '2px' }}
                >
                  {s.product}
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container width="4xl" padding="default" className="text-center" data-reveal>
          <p className="text-primary-accessible mb-4 font-mono text-xs tracking-widest uppercase">Next step</p>
          <h2 className="text-ink mb-4 text-2xl leading-snug font-semibold lg:text-3xl">
            Bring us a messy multi-service release.
          </h2>
          <p className="text-ink-secondary mx-auto mb-8 max-w-xl">
            We will ask about your current release process, what is breaking, and whether
            DeployTitan is the right fit.
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
          </div>
        </Container>
      </section>
    </>
  )
}
