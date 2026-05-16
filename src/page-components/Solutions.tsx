'use client'

import { useScrollReveal } from '../utils'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

// ── Pain categories ───────────────────────────────────────────────────────────

const PAIN_CATEGORIES = [
  {
    id: 'friday-fear',
    num: '01',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="8" y1="15" x2="8" y2="15" strokeWidth="2.5" />
        <line x1="12" y1="15" x2="16" y2="15" strokeWidth="2.5" />
      </svg>
    ),
    heading: 'Friday deploy fear.',
    body: "Your team has unwritten rules: no deploys Thursday afternoon, never on Friday, not before a holiday. The fear isn't irrational: it's institutional memory of the last time something broke and nobody could roll back fast enough.",
    link: '/solutions/progressive-delivery',
    linkLabel: 'How we fix this →',
  },
  {
    id: '3am-rollback',
    num: '02',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    heading: '3am rollback panic.',
    body: "An alert fires. On-call wakes up. They spend 15 minutes confirming it's the new deploy, another 10 deciding whether to roll back the whole service, then 20 minutes watching dashboards to confirm it's stable. It's 4am. Nobody slept.",
    link: '/solutions/instant-rollback',
    linkLabel: 'How we fix this →',
  },
  {
    id: 'blind-merge',
    num: '03',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M6 9v6" />
        <path d="M9 6h6a3 3 0 0 1 3 3v6" />
      </svg>
    ),
    heading: 'Blind merge syndrome.',
    body: 'A PR touches a shared library. CI passes. Reviewers approve. It ships. Two hours later, a downstream service starts throwing errors. The PR that caused it was three merges ago. Nobody had a map of what depended on what.',
    link: '/solutions/risk-intelligence',
    linkLabel: 'How we fix this →',
  },
  {
    id: 'yaml-glue',
    num: '04',
    icon: (
      <svg
        width="18"
        height="18"
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
    heading: 'Platform teams as the bottleneck.',
    body: 'Every team has a slightly different deploy script. Every new cloud target spawns a new runbook. Platform engineers spend their days reviewing deploys, updating pipelines, and being the human circuit breaker between developers and production.',
    link: '/solutions/platform-engineering',
    linkLabel: 'How we fix this →',
  },
]

// ── Proof scenarios ───────────────────────────────────────────────────────────

const PROOF_SCENARIOS = [
  {
    before: { value: '22 min', label: 'median time on-call spent fixing a bad deploy' },
    after: { value: '30s', label: 'with Phoenix auto-rollback' },
    solution: 'Instant Rollback',
    route: '/solutions/instant-rollback',
  },
  {
    before: { value: '5–15 min', label: 'per PR, per reviewer, tracing dependencies manually' },
    after: { value: '< 2s', label: 'risk score via Titan Foresight' },
    solution: 'Deploy Risk Intelligence',
    route: '/solutions/risk-intelligence',
  },
  {
    before: { value: '1–2 features/week', label: 'held back by deploy fear per team' },
    after: { value: '3× deploy freq.', label: 'after progressive delivery' },
    solution: 'Progressive Delivery',
    route: '/solutions/progressive-delivery',
  },
]

// ── Personas ──────────────────────────────────────────────────────────────────

const PERSONAS = [
  {
    id: 'sre',
    role: 'Site Reliability Engineer',
    frustration: '"I get paged for things that should have rolled back automatically."',
    body: "You wrote the runbook. You've tested the rollback procedure. And you still got paged at 2am because nothing runs the runbook automatically. DeployTitan closes that gap: SLO breach triggers action, not just an alert.",
    wins: [
      'SLO-triggered automatic rollback: no alert, no human in the loop',
      'Blast-radius analysis before the deploy, not after',
      'PagerDuty / OpsGenie: DeployTitan acts on alerts, not just sends them',
    ],
    link: '/solutions/instant-rollback',
    icon: (
      <svg
        width="20"
        height="20"
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
  },
  {
    id: 'devops',
    role: 'DevOps / Platform Engineer',
    frustration: '"I spend more time on deploy scripts than on actual engineering."',
    body: "You're the one who gets Slack messages when a deploy breaks. You're the one who wrote the rollback runbook that nobody runs correctly. DeployTitan replaces the scaffolding: one CLI, one policy file, every cloud.",
    wins: [
      'One `dt deploy` replaces 200+ lines of CI/CD pipeline YAML',
      'Policy-as-code: write the guardrails once, all teams self-serve safely',
      'Works with your existing GitHub Actions, GitLab CI, Jenkins setup',
    ],
    link: '/solutions/platform-engineering',
    icon: (
      <svg
        width="20"
        height="20"
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
  },
  {
    id: 'manager',
    role: 'Engineering Manager / CTO',
    frustration: '"I don\'t know the cost of each bad release until after it happens."',
    body: 'You know deploys are risky. You just can\'t quantify it. Every incident report says "human error" but the real cause is missing automation. DeployTitan makes your deploy pipeline safe by default, and gives you the data to prove it.',
    wins: [
      'DORA metrics tracked automatically: no manual tagging',
      "Risk score on every PR: management can see what's risky before it ships",
      'Full audit trail: every deploy, every rollback, every policy override',
    ],
    link: '/solutions/progressive-delivery',
    icon: (
      <svg
        width="20"
        height="20"
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
  },
]

// ── Solution index ────────────────────────────────────────────────────────────

const SOLUTION_INDEX = [
  {
    route: '/solutions/progressive-delivery',
    name: 'Progressive Delivery',
    tagline: 'Canary deploys with SLO-gated promotion. Ship every day without a war room.',
    product: 'Titan Rollout + Titan Foresight',
    available: true,
  },
  {
    route: '/solutions/instant-rollback',
    name: 'Instant Rollback',
    tagline: 'SLO breach to traffic-restored in under 30 seconds. No on-call required.',
    product: 'Titan Phoenix',
    available: true,
  },
  {
    route: '/solutions/risk-intelligence',
    name: 'Deploy Risk Intelligence',
    tagline: 'Blast-radius score on every PR before it merges. Know before you ship.',
    product: 'Titan Foresight',
    available: true,
  },
  {
    route: '/solutions/platform-engineering',
    name: 'Platform Engineering',
    tagline: 'Policy-as-code golden path. Product teams self-serve; platform teams build.',
    product: 'Full platform',
    available: true,
  },
  {
    route: null,
    name: 'Multi-Cloud Resilience',
    tagline: 'Failover across cloud providers in seconds. On the roadmap for Q3.',
    product: 'Titan Shield',
    available: false,
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Solutions() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid border-line border-b pt-28 pb-20">
        <Container width="4xl" padding="default">
          <p className="text-primary mb-4 font-mono text-xs tracking-widest uppercase" data-reveal data-reveal-delay="1">Solutions</p>
          <h1 className="text-ink mb-6 text-4xl leading-tight font-semibold lg:text-5xl" data-reveal data-reveal-delay="2">
            You already have the tools.
            <br className="hidden md:block" /> They're not talking to each other.
          </h1>
          <p className="text-ink-secondary mb-4 max-w-2xl text-lg leading-relaxed" data-reveal data-reveal-delay="3">
            Most engineering teams have Argo, a feature flag tool, some runbooks, and PagerDuty.
            What they don't have is a system that connects them: one that scores risk before the
            merge, gates traffic on real signals, and rolls back automatically when something
            breaks.
          </p>
          <p className="text-ink-secondary max-w-2xl text-lg leading-relaxed" data-reveal data-reveal-delay="4">
            That's what DeployTitan is. Not a replacement for your stack, but the connective tissue
            that makes it safe.
          </p>
        </Container>
      </section>

      {/* Pain taxonomy */}
      <section className="border-line border-b py-24">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary mb-3 font-mono text-xs tracking-widest uppercase">
              The problems
            </p>
            <h2 className="text-ink mb-3 text-2xl leading-snug font-semibold lg:text-3xl">
              Recognize any of these?
            </h2>
            <p className="text-ink-secondary max-w-xl">
              These aren't edge cases. They're the normal state of deployment for most engineering
              teams, and every one of them has a specific fix.
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
                    className="text-ink-quaternary border-line mt-0.5 shrink-0 border px-1.5 py-0.5 font-mono text-[10px] leading-none font-bold"
                    style={{ borderRadius: '2px' }}
                  >
                    {p.num}
                  </span>
                  <div className="flex items-start gap-2.5">
                    <span className="text-primary mt-0.5 shrink-0">{p.icon}</span>
                    <h3 className="text-ink text-base leading-snug font-semibold">{p.heading}</h3>
                  </div>
                </div>
                <p className="text-ink-secondary text-sm leading-relaxed">{p.body}</p>
                <a
                  href={p.link}
                  className="text-primary hover:text-primary-light mt-auto text-sm font-medium transition-colors"
                >
                  {p.linkLabel}
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Proof scenarios */}
      <section className="border-line bg-surface-alt/20 border-b py-16">
        <Container width="6xl" padding="default">
          <p
            className="text-ink-tertiary mb-10 text-center font-mono text-xs tracking-widest uppercase"
            data-reveal
          >
            Real-world impact: the before and after
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
                {/* Before */}
                <div>
                  <p className="text-signal-danger/70 mb-1 font-mono text-[10px] tracking-widest uppercase">
                    Before
                  </p>
                  <p className="text-ink-secondary decoration-signal-danger/30 text-xl font-bold line-through">
                    {s.before.value}
                  </p>
                  <p className="text-ink-tertiary mt-1 text-xs leading-snug">{s.before.label}</p>
                </div>
                {/* Arrow */}
                <div className="text-primary hidden items-center md:flex">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
                {/* After */}
                <div>
                  <p className="text-signal-success/80 mb-1 font-mono text-[10px] tracking-widest uppercase">
                    After
                  </p>
                  <p className="text-ink text-xl font-bold">{s.after.value}</p>
                  <p className="text-ink-tertiary mt-1 text-xs leading-snug">{s.after.label}</p>
                </div>
                {/* Solution tag */}
                <div className="flex items-center gap-2">
                  <span
                    className="text-primary border-primary/30 border px-2 py-1 font-mono text-[9px] tracking-widest whitespace-nowrap uppercase"
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
                    className="text-ink-quaternary group-hover:text-primary transition-colors"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* By persona */}
      <section className="border-line border-b py-24">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary mb-3 font-mono text-xs tracking-widest uppercase">By role</p>
            <h2 className="text-ink mb-3 text-2xl leading-snug font-semibold lg:text-3xl">
              Your frustration has a name.
            </h2>
            <p className="text-ink-secondary max-w-xl">
              Different roles feel the deployment problem differently. Here's what DeployTitan does
              for each of them.
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
                <div className="text-primary flex items-center gap-3">
                  {p.icon}
                  <span className="text-ink-tertiary font-mono text-xs tracking-widest uppercase">
                    {p.role}
                  </span>
                </div>
                <blockquote className="text-primary/90 text-sm leading-relaxed font-medium italic">
                  {p.frustration}
                </blockquote>
                <p className="text-ink-secondary text-sm leading-relaxed">{p.body}</p>
                <ul className="flex flex-col gap-2">
                  {p.wins.map((w) => (
                    <li key={w} className="text-ink-secondary flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1 shrink-0 text-xs">▸</span>
                      {w}
                    </li>
                  ))}
                </ul>
                <a
                  href={p.link}
                  className="text-primary hover:text-primary-light mt-auto text-sm font-medium transition-colors"
                >
                  See the solution →
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Solution index */}
      <section className="border-line border-b py-24">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary mb-3 font-mono text-xs tracking-widest uppercase">
              All solutions
            </p>
            <h2 className="text-ink mb-3 text-2xl leading-snug font-semibold lg:text-3xl">
              Find the one that matches your situation.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTION_INDEX.map((s) =>
              s.available ? (
                <a
                  key={s.name}
                  href={s.route!}
                  className="sharp-card border-line hover:border-primary/30 hover:bg-surface-alt/50 flex flex-col gap-3 border p-6 transition-all"
                  data-reveal
                >
                  <h3 className="text-ink text-sm font-semibold">{s.name}</h3>
                  <p className="text-ink-secondary flex-1 text-sm leading-relaxed">{s.tagline}</p>
                  <span
                    className="text-ink-quaternary border-line w-fit border px-1.5 py-0.5 font-mono text-[9px] tracking-widest uppercase"
                    style={{ borderRadius: '2px' }}
                  >
                    {s.product}
                  </span>
                </a>
              ) : (
                <div
                  key={s.name}
                  className="sharp-card border-line/50 flex cursor-default flex-col gap-3 border p-6 opacity-50"
                  data-reveal
                >
                  <div className="flex items-center gap-2">
                    <h3 className="text-ink-secondary text-sm font-semibold">{s.name}</h3>
                    <span
                      className="text-ink-quaternary border-line/60 border px-1.5 py-0.5 font-mono text-[8px] tracking-widest uppercase"
                      style={{ borderRadius: '2px' }}
                    >
                      Roadmap
                    </span>
                  </div>
                  <p className="text-ink-tertiary flex-1 text-sm leading-relaxed">{s.tagline}</p>
                  <span
                    className="text-ink-quaternary border-line/50 w-fit border px-1.5 py-0.5 font-mono text-[9px] tracking-widest uppercase"
                    style={{ borderRadius: '2px' }}
                  >
                    {s.product}
                  </span>
                </div>
              ),
            )}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container width="4xl" padding="default" className="text-center" data-reveal>
          <p className="text-primary mb-4 font-mono text-xs tracking-widest uppercase">
            Not sure where to start?
          </p>
          <h2 className="text-ink mb-4 text-2xl leading-snug font-semibold lg:text-3xl">
            Talk to someone who's been in your position.
          </h2>
          <p className="text-ink-secondary mx-auto mb-8 max-w-xl">
            We'll ask about your current deploy process, what's broken, and whether DeployTitan is
            the right fit: no sales pitch, 20 minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://cal.com/justine-deploytitan/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink text-surface inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)] active:scale-[0.97]"
              style={{ borderRadius: '2px' }}
            >
              Book a 20-min walkthrough
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="/products/titan-rollout"
              className="border-line text-ink-secondary hover:border-primary/40 hover:text-ink inline-flex items-center gap-2 border px-6 py-3 text-sm transition-colors"
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
