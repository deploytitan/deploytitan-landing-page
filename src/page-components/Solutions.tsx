'use client'

import { APP_URL } from '@/lib/env'
import { useScrollReveal } from '../utils'
import { MidCTA } from '../components/MidCTA'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'


// ── Pain-point pairs ──────────────────────────────────────────────────────────

const PAIN_POINTS = [
  {
    id: 'slow-releases',
    before: {
      label: 'Before DeployTitan',
      heading: 'Releases take days of coordination.',
      body: 'Manual approval chains, Slack ping-pong, and fear of Friday deploys slow your team to a crawl. One bad release can mean an all-hands rollback that wipes a week of velocity.',
      bullets: [
        '5-step human approval chain',
        'No automated rollback trigger',
        'Blind to cross-service impact',
      ],
    },
    after: {
      label: 'With Titan Rollout',
      heading: 'Ship confidently, every day.',
      body: 'Progressive canary weights, automatic rollback on SLO breach, and full audit trail — so your team deploys faster without accepting more risk.',
      bullets: [
        'Canary → progressive → full in one command',
        'Auto-rollback when p99 exceeds threshold',
        'Full deploy lineage for every release',
      ],
    },
    link: '/products/titan-rollout',
    linkLabel: 'Explore Titan Rollout →',
  },
  {
    id: 'no-rollback',
    before: {
      label: 'Before DeployTitan',
      heading: 'Rollback means "redeploy the previous tag and pray."',
      body: 'Your runbooks say "rollback in 5 minutes" but nobody has actually timed it. When an incident hits, engineers scramble to find the last known-good artifact.',
      bullets: [
        'Rollback = manual re-deploy',
        'No automated health gate',
        'On-call alert, not proactive detection',
      ],
    },
    after: {
      label: 'With Titan Rollout',
      heading: 'Rollback in seconds, not minutes.',
      body: 'DeployTitan keeps your last stable release warm and pre-promoted. A single signal — error rate, latency, custom metric — triggers a seamless reverse traffic shift.',
      bullets: [
        'One-click or API-triggered rollback',
        'Pre-warmed previous release always available',
        'Automatic trigger from Datadog / Prometheus alert',
      ],
    },
    link: '/products/titan-rollout',
    linkLabel: 'Explore Titan Rollout →',
  },
  {
    id: 'multicloud',
    before: {
      label: 'Before DeployTitan',
      heading: 'Multi-cloud means multiple blast radii.',
      body: "AWS us-east-1 goes down and traffic doesn't move. Your DR runbook requires three people, a shared password, and 40 minutes to execute.",
      bullets: [
        'Manual failover runbooks',
        'No global health visibility',
        'RTO measured in hours, not seconds',
      ],
    },
    after: {
      label: 'With Titan Shield',
      heading: 'Failover in milliseconds, automatically.',
      body: 'Titan Shield watches every region continuously and shifts traffic before your on-call even wakes up. Fully declarative — define your failover policy once, never touch it again.',
      bullets: [
        'Sub-second automated failover',
        'Declarative cross-region policy (HCL / YAML)',
        'RTO < 30 s for >99.9% of incidents',
      ],
    },
    link: '/products/titan-shield',
    linkLabel: 'Explore Titan Shield →',
  },
  {
    id: 'risk-blind',
    before: {
      label: 'Before DeployTitan',
      heading: 'You find out about risk in the post-mortem.',
      body: 'The PR looked fine in review. Staging passed. Production caught fire. Your blast-radius was three downstream services nobody thought to check.',
      bullets: [
        'Risk assessed after the fact',
        'No dependency map at deploy time',
        'SLO breaches, not warnings, are the signal',
      ],
    },
    after: {
      label: 'With Titan Foresight',
      heading: 'Risk scoring before the first byte shifts.',
      body: 'Titan Foresight analyses every PR against your live dependency graph, calculates blast radius, and scores risk 0–100 before you ship — so you decide, not your pager.',
      bullets: [
        'Risk score on every PR, not just post-deploy',
        'Blast-radius map across all dependencies',
        'SLO guardrails block high-risk deploys automatically',
      ],
    },
    link: '/products/titan-foresight',
    linkLabel: 'Explore Titan Foresight →',
  },
]

// ── By persona ────────────────────────────────────────────────────────────────

const PERSONAS = [
  {
    id: 'platform-eng',
    role: 'Platform Engineering',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    tagline: 'Build the golden path. Get out of the way.',
    description:
      'Stop being the deployment bottleneck. DeployTitan gives platform teams a single control plane to define deployment policies, enforce SLO guardrails, and let product teams self-serve — safely.',
    wins: [
      'Policy-as-code: one HCL file defines allowed strategies per service tier',
      'Self-service deploys with guardrails — no ticket required',
      'Unified audit log across all clouds, clusters, and teams',
      'Terraform + Pulumi providers for IaC-native integration',
    ],
  },
  {
    id: 'sre',
    role: 'Site Reliability Engineering',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    tagline: 'SLO breaches, not war-room panic.',
    description:
      'SREs use DeployTitan to turn manual escalation chains into automated responses. Define your error budget — let Titan Shield and Titan Rollout protect it.',
    wins: [
      'Automatic traffic drain before your SLO is breached',
      'Blast-radius analysis surfaces risk before it becomes an incident',
      'PagerDuty / OpsGenie integration — Titan acts on alerts, not just sends them',
      'Post-incident deploy lineage for faster root cause',
    ],
  },
  {
    id: 'devops',
    role: 'DevOps / Platform Ops',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    tagline: 'Less YAML glue. More confidence.',
    description:
      'DevOps teams spend too much time stitching together CI/CD scripts, rollback runbooks, and alert routing. DeployTitan replaces that scaffolding with a single declarative deploy layer.',
    wins: [
      'Native GitHub Actions, GitLab CI, CircleCI, and Jenkins support',
      'One dt deploy command replaces 200 lines of pipeline YAML',
      'Works with your existing Docker, K8s, ECS, Lambda, and Cloud Run setup',
      'CLI + REST API + Terraform — integrate however your team works',
    ],
  },
]

// ── Components ────────────────────────────────────────────────────────────────

function PainPointRow({ pair }: { pair: (typeof PAIN_POINTS)[0] }) {
  return (
    <div
      className="py-16 border-b border-line last:border-b-0 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
      data-reveal
    >
      {/* Before */}
      <div className="sharp-card border border-line/60 p-6 bg-surface">
        <p className="text-[11px] font-mono tracking-widest uppercase text-red-400/70 mb-4">
          {pair.before.label}
        </p>
        <h3 className="text-lg font-semibold text-ink mb-3 leading-snug">{pair.before.heading}</h3>
        <p className="text-ink-secondary text-sm leading-relaxed mb-5">{pair.before.body}</p>
        <ul className="flex flex-col gap-2">
          {pair.before.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-ink-secondary">
              <span className="mt-1 shrink-0 text-red-400/60">✗</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
      {/* After */}
      <div className="sharp-card border border-primary/20 p-6 bg-primary/[0.03]">
        <p className="text-[11px] font-mono tracking-widest uppercase text-primary mb-4">
          {pair.after.label}
        </p>
        <h3 className="text-lg font-semibold text-ink mb-3 leading-snug">{pair.after.heading}</h3>
        <p className="text-ink-secondary text-sm leading-relaxed mb-5">{pair.after.body}</p>
        <ul className="flex flex-col gap-2 mb-6">
          {pair.after.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-ink-secondary">
              <span className="mt-1 shrink-0 text-primary">✓</span>
              {b}
            </li>
          ))}
        </ul>
        <a
          href={pair.link}
          className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
        >
          {pair.linkLabel}
        </a>
      </div>
    </div>
  )
}

function PersonaCard({ p }: { p: (typeof PERSONAS)[0] }) {
  return (
    <Card
      padding="none"
      className="p-7 flex flex-col gap-5 hover:bg-surface-alt/50 transition-colors"
      data-reveal
    >
      <div className="flex items-center gap-3 text-primary">
        {p.icon}
        <span className="text-xs font-mono tracking-widest uppercase text-ink-tertiary">
          {p.role}
        </span>
      </div>
      <div>
        <p className="text-base font-semibold text-ink mb-2 leading-snug">{p.tagline}</p>
        <p className="text-sm text-ink-secondary leading-relaxed">{p.description}</p>
      </div>
      <ul className="flex flex-col gap-2 mt-auto">
        {p.wins.map((w) => (
          <li key={w} className="flex items-start gap-2 text-sm text-ink-secondary">
            <span className="mt-1 shrink-0 text-primary text-xs">▸</span>
            {w}
          </li>
        ))}
      </ul>
    </Card>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Solutions() {  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" className="text-center" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">Solutions</p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-6">
            The problems we were
            <br className="hidden md:block" /> built to solve.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mx-auto">
            Slow deploys. Brittle rollbacks. Multi-cloud chaos. Invisible risk. DeployTitan
            addresses each one — without changing how your team ships code.
          </p>
        </Container>
      </section>

      {/* Pain-point pairs */}
      <section className="py-4 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="pt-8 pb-2" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-ink-tertiary mb-2">
              Pain points
            </p>
            <h2 className="text-2xl font-semibold text-ink">
              Before &amp; after — four common failure modes.
            </h2>
          </div>
          {PAIN_POINTS.map((pair) => (
            <PainPointRow key={pair.id} pair={pair} />
          ))}
        </Container>
      </section>

      {/* By persona */}
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">By team</p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-3">
              Built for the people who keep production running.
            </h2>
            <p className="text-ink-secondary max-w-xl">
              DeployTitan adapts to how your team works — whether you're building the platform,
              owning reliability, or writing the pipeline glue.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PERSONAS.map((p) => (
              <PersonaCard key={p.id} p={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <MidCTA
        heading="Ready to fix your deploy problem?"
        subheading="Start a 14-day free trial — no credit card required. Or talk to an engineer about your specific setup."
        primaryLabel="Start free trial"
        primaryHref={`${APP_URL}/signup`}
        secondaryLabel="Talk to an engineer"
        secondaryHref="https://cal.com/deploytitan/demo"
        secondaryExternal
      />
    </>
  )
}
