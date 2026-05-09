'use client'

import { useScrollReveal } from '../utils'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

// ── Pain categories ───────────────────────────────────────────────────────────

const PAIN_CATEGORIES = [
  {
    id: 'friday-fear',
    emoji: '🫣',
    heading: 'Friday deploy fear.',
    body: 'Your team has unwritten rules: no deploys Thursday afternoon, never on Friday, not before a holiday. The fear isn\'t irrational: it\'s institutional memory of the last time something broke and nobody could roll back fast enough.',
    link: '/solutions/progressive-delivery',
    linkLabel: 'How we fix this →',
  },
  {
    id: '3am-rollback',
    emoji: '📟',
    heading: '3am rollback panic.',
    body: 'An alert fires. On-call wakes up. They spend 15 minutes confirming it\'s the new deploy, another 10 deciding whether to roll back the whole service, then 20 minutes watching dashboards to confirm it\'s stable. It\'s 4am. Nobody slept.',
    link: '/solutions/instant-rollback',
    linkLabel: 'How we fix this →',
  },
  {
    id: 'blind-merge',
    emoji: '🕳',
    heading: 'Blind merge syndrome.',
    body: 'A PR touches a shared library. CI passes. Reviewers approve. It ships. Two hours later, a downstream service starts throwing errors. The PR that caused it was three merges ago. Nobody had a map of what depended on what.',
    link: '/solutions/risk-intelligence',
    linkLabel: 'How we fix this →',
  },
  {
    id: 'yaml-glue',
    emoji: '🧩',
    heading: 'Platform teams as the bottleneck.',
    body: 'Every team has a slightly different deploy script. Every new cloud target spawns a new runbook. Platform engineers spend their days reviewing deploys, updating pipelines, and being the human circuit breaker between developers and production.',
    link: '/solutions/platform-engineering',
    linkLabel: 'How we fix this →',
  },
]

// ── Proof metrics ─────────────────────────────────────────────────────────────

const PROOF_METRICS = [
  { value: '30s', label: 'Median rollback time', solution: 'Instant Rollback' },
  { value: '< 2s', label: 'Risk score per PR', solution: 'Deploy Risk Intelligence' },
  { value: '3×', label: 'Deploy frequency increase', solution: 'Progressive Delivery' },
  { value: '85%', label: 'Fewer production incidents', solution: 'Progressive Delivery' },
]

// ── Personas ──────────────────────────────────────────────────────────────────

const PERSONAS = [
  {
    id: 'sre',
    role: 'Site Reliability Engineer',
    frustration: '"I get paged for things that should have rolled back automatically."',
    body: 'You wrote the runbook. You\'ve tested the rollback procedure. And you still got paged at 2am because nothing runs the runbook automatically. DeployTitan closes that gap: SLO breach triggers action, not just an alert.',
    wins: [
      'SLO-triggered automatic rollback: no alert, no human in the loop',
      'Blast-radius analysis before the deploy, not after',
      'PagerDuty / OpsGenie: DeployTitan acts on alerts, not just sends them',
    ],
    link: '/solutions/instant-rollback',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    id: 'devops',
    role: 'DevOps / Platform Engineer',
    frustration: '"I spend more time on deploy scripts than on actual engineering."',
    body: 'You\'re the one who gets Slack messages when a deploy breaks. You\'re the one who wrote the rollback runbook that nobody runs correctly. DeployTitan replaces the scaffolding: one CLI, one policy file, every cloud.',
    wins: [
      'One `dt deploy` replaces 200+ lines of CI/CD pipeline YAML',
      'Policy-as-code: write the guardrails once, all teams self-serve safely',
      'Works with your existing GitHub Actions, GitLab CI, Jenkins setup',
    ],
    link: '/solutions/platform-engineering',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    id: 'manager',
    role: 'Engineering Manager / CTO',
    frustration: '"I don\'t know the cost of each bad release until after it happens."',
    body: 'You know deploys are risky. You just can\'t quantify it. Every incident report says "human error" but the real cause is missing automation. DeployTitan makes your deploy pipeline safe by default, and gives you the data to prove it.',
    wins: [
      'DORA metrics tracked automatically: no manual tagging',
      'Risk score on every PR: management can see what\'s risky before it ships',
      'Full audit trail: every deploy, every rollback, every policy override',
    ],
    link: '/solutions/progressive-delivery',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
]

// ── Solution index ────────────────────────────────────────────────────────────

const SOLUTION_INDEX = [
  {
    route: '/solutions/progressive-delivery',
    name: 'Progressive Delivery',
    tagline: 'Ship confidently every day of the week.',
    product: 'Titan Rollout + Titan Foresight',
  },
  {
    route: '/solutions/instant-rollback',
    name: 'Instant Rollback',
    tagline: 'Undo a bad release before users notice.',
    product: 'Titan Phoenix',
  },
  {
    route: '/solutions/risk-intelligence',
    name: 'Deploy Risk Intelligence',
    tagline: 'Know your blast radius before you merge.',
    product: 'Titan Foresight',
  },
  {
    route: '/solutions/platform-engineering',
    name: 'Platform Engineering',
    tagline: 'Build the golden path. Get out of the way.',
    product: 'Full platform',
  },
  {
    route: '/solutions/multi-cloud-resilience',
    name: 'Multi-Cloud Resilience',
    tagline: 'Failover in seconds, not war-room hours.',
    product: 'Titan Shield',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Solutions() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">Solutions</p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-6">
            You already have the tools.
            <br className="hidden md:block" /> They're not talking to each other.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-4">
            Most engineering teams have Argo, a feature flag tool, some runbooks, and PagerDuty. What
            they don't have is a system that connects them: one that scores risk before the merge, gates
            traffic on real signals, and rolls back automatically when something breaks.
          </p>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl">
            That's what DeployTitan is. Not a replacement for your stack, but the connective tissue that
            makes it safe.
          </p>
        </Container>
      </section>

      {/* Pain taxonomy */}
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              The problems
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-3">
              Recognize any of these?
            </h2>
            <p className="text-ink-secondary max-w-xl">
              These aren't edge cases. They're the normal state of deployment for most engineering
              teams, and every one of them has a specific fix.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PAIN_CATEGORIES.map((p, i) => (
              <Card
                key={p.id}
                padding="none"
                className="p-7 hover:border-primary/20 transition-all duration-200 flex flex-col gap-4"
                data-reveal
                data-reveal-delay={String(i % 2)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl leading-none mt-0.5">{p.emoji}</span>
                  <h3 className="text-base font-semibold text-ink leading-snug">{p.heading}</h3>
                </div>
                <p className="text-sm text-ink-secondary leading-relaxed">{p.body}</p>
                <a
                  href={p.link}
                  className="mt-auto text-sm font-medium text-primary hover:text-primary-light transition-colors"
                >
                  {p.linkLabel}
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Proof strip */}
      <section className="py-14 border-b border-line bg-surface-alt/20">
        <Container width="6xl" padding="default">
          <p className="text-xs font-mono tracking-widest uppercase text-ink-tertiary mb-8 text-center" data-reveal>
            What teams see after switching
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line">
            {PROOF_METRICS.map((m) => (
              <div key={m.label} className="bg-surface px-6 py-8 text-center" data-reveal>
                <p className="text-3xl font-semibold text-ink mb-1">{m.value}</p>
                <p className="text-xs text-ink-tertiary font-mono mb-2">{m.label}</p>
                <p className="text-[10px] text-primary/60 font-mono uppercase tracking-widest">{m.solution}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* By persona */}
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              By role
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-3">
              Your frustration has a name.
            </h2>
            <p className="text-ink-secondary max-w-xl">
              Different roles feel the deployment problem differently. Here's what DeployTitan does
              for each of them.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PERSONAS.map((p) => (
              <Card
                key={p.id}
                padding="none"
                className="p-7 flex flex-col gap-5 hover:bg-surface-alt/50 hover:border-primary/20 transition-all"
                data-reveal
              >
                <div className="flex items-center gap-3 text-primary">
                  {p.icon}
                  <span className="text-xs font-mono tracking-widest uppercase text-ink-tertiary">
                    {p.role}
                  </span>
                </div>
                <blockquote className="text-sm font-medium text-ink italic leading-relaxed border-l-2 border-primary/30 pl-3">
                  {p.frustration}
                </blockquote>
                <p className="text-sm text-ink-secondary leading-relaxed">{p.body}</p>
                <ul className="flex flex-col gap-2">
                  {p.wins.map((w) => (
                    <li key={w} className="flex items-start gap-2 text-xs text-ink-secondary">
                      <span className="mt-1 shrink-0 text-primary text-xs">▸</span>
                      {w}
                    </li>
                  ))}
                </ul>
                <a
                  href={p.link}
                  className="mt-auto text-sm font-medium text-primary hover:text-primary-light transition-colors"
                >
                  See the solution →
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Solution index */}
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              All solutions
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-3">
              Find the one that matches your situation.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOLUTION_INDEX.map((s) => (
              <a
                key={s.route}
                href={s.route}
                className="sharp-card border border-line p-6 flex flex-col gap-3 hover:border-primary/30 hover:bg-surface-alt/50 transition-all"
                data-reveal
              >
                <h3 className="text-sm font-semibold text-ink">{s.name}</h3>
                <p className="text-xs text-ink-secondary leading-relaxed flex-1">{s.tagline}</p>
                <span className="font-mono text-[9px] uppercase tracking-widest text-ink-quaternary border border-line px-1.5 py-0.5 w-fit" style={{ borderRadius: '2px' }}>
                  {s.product}
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container width="4xl" padding="default" className="text-center" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
            Not sure where to start?
          </p>
          <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-4">
            Talk to someone who's been in your position.
          </h2>
          <p className="text-ink-secondary max-w-xl mx-auto mb-8">
            We'll ask about your current deploy process, what's broken, and whether DeployTitan is
            the right fit: no sales pitch, 20 minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://cal.com/deploytitan/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-ink dark:text-surface text-sm font-semibold px-6 py-3 hover:bg-primary-light transition-colors"
              style={{ borderRadius: '2px' }}
            >
              Book a 20-min walkthrough
            </a>
            <a
              href="/products/titan-rollout"
              className="inline-flex items-center gap-2 border border-line text-ink-secondary text-sm px-6 py-3 hover:border-primary/40 hover:text-ink transition-colors"
              style={{ borderRadius: '2px' }}
            >
              Browse the products instead
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
