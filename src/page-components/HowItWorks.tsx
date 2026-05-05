'use client'

import { APP_URL } from '@/lib/env'
import { useScrollReveal } from '../utils'
import { MidCTA } from '../components/MidCTA'
import Link from 'next/link'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

const ADAPTERS = [
  { name: 'Kubernetes / nginx-ingress', icon: '⎈', category: 'Container' },
  { name: 'AWS ALB', icon: '⚡', category: 'AWS' },
  { name: 'Cloud Run', icon: '☁', category: 'GCP' },
  { name: 'AWS Lambda Edge', icon: 'λ', category: 'AWS' },
  { name: 'Cloudflare Workers', icon: '⚡', category: 'Edge' },
  { name: 'Azure Front Door', icon: '◈', category: 'Azure' },
]

const STEPS = [
  {
    number: '01',
    title: 'You define policy',
    body: 'Write a deployment policy in HCL or YAML. Specify allowed strategies, risk thresholds, SLO references, and failover targets. Check it into git like any other config.',
  },
  {
    number: '02',
    title: 'CI pushes a deploy event',
    body: "Your existing CI pipeline calls `dt deploy` (or the REST API). DeployTitan records the deployment intent, runs Sentinel's pre-deploy analysis, and calculates risk score.",
  },
  {
    number: '03',
    title: 'The controller executes it',
    body: 'The Titan Controller — a lightweight process running in your infrastructure — polls the API and translates the deployment intent into native L7 config for your platform (nginx weights, ALB target group weights, Cloudflare traffic rules).',
  },
  {
    number: '04',
    title: 'Metrics gate each step',
    body: 'At each canary step, the controller polls your Datadog or Prometheus metrics. If SLOs hold, it advances. If they breach, it rolls back automatically. No human in the loop.',
  },
  {
    number: '05',
    title: 'Everything is logged',
    body: 'Full deploy lineage — every step, every metric check, every rollback decision — is stored and queryable. Post-incident RCA in minutes, not hours.',
  },
]

const SECURITY_PROPS = [
  {
    label: 'Your data plane',
    body: 'The controller runs in your VPC or cluster. Traffic never touches our infrastructure.',
  },
  {
    label: '<3ms overhead',
    body: 'The controller adds less than 3ms to routing decisions. Pure passthrough for routing logic.',
  },
  {
    label: '~70MB distroless',
    body: 'The controller container is distroless and statically linked. Minimal attack surface.',
  },
  {
    label: 'Declarative config',
    body: 'No imperative scripts. Every change is a policy diff, code-reviewed, and audited.',
  },
]

export default function HowItWorks() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" className="text-center" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
            Architecture
          </p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            Your data plane.
            <br className="hidden md:block" /> Our brain.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mx-auto mb-8">
            DeployTitan doesn't sit in your traffic path. A lightweight controller runs inside your
            infrastructure and translates declarative deployment policy into native L7 config — for
            every platform you already use.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`${APP_URL}/signup`}
              className="inline-flex items-center gap-2 bg-ink text-surface px-6 py-3 text-sm font-medium dark:text-surface transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
              style={{ borderRadius: '2px' }}
            >
              Start free trial
            </a>
            <Link
              href="/docs"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Read the docs →
            </Link>
          </div>
        </Container>
      </section>

      {/* Architecture diagram */}
      <section className="py-24 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-14" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Architecture
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-2">
              Three layers. Zero lock-in.
            </h2>
          </div>

          {/* Diagram */}
          <div className="space-y-3" data-reveal>
            {/* Layer 1: DeployTitan API */}
            <div className="sharp-card border border-primary/30 bg-primary/[0.02] p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-primary/30 flex items-center justify-center shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    className="text-primary"
                  >
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-sm font-semibold text-ink">DeployTitan API + Brain</p>
                    <span
                      className="font-mono text-[9px] text-ink-quaternary border border-line px-1.5 py-0.5"
                      style={{ borderRadius: '2px' }}
                    >
                      DeployTitan SaaS
                    </span>
                  </div>
                  <p className="text-xs text-ink-secondary">
                    Policy storage, risk analysis, deploy orchestration, audit log, dashboard.
                    Hosted by us — your traffic never passes through.
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-4 bg-primary/20" />
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M5 8L0 0h10L5 8z" fill="rgba(201,168,76,0.3)" />
                </svg>
                <p className="text-[9px] font-mono text-ink-quaternary">
                  Polls for deploy intent (HTTPS)
                </p>
              </div>
            </div>

            {/* Layer 2: Controller */}
            <div className="sharp-card border border-line bg-surface-alt/30 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-line flex items-center justify-center shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    className="text-ink-secondary"
                  >
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-sm font-semibold text-ink">Titan Controller</p>
                    <span
                      className="font-mono text-[9px] text-signal-success/80 border border-signal-success/30 bg-signal-success/5 px-1.5 py-0.5"
                      style={{ borderRadius: '2px' }}
                    >
                      Runs in your infra
                    </span>
                  </div>
                  <p className="text-xs text-ink-secondary mb-3">
                    Distroless ~70MB container. Polls the API, executes routing changes natively.
                    Adds &lt;3ms overhead. Runs in your VPC — traffic never leaves.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'docker run deploytitan/controller',
                      'helm install titan-controller deploytitan/controller',
                      'Cloud Run service',
                    ].map((c) => (
                      <span
                        key={c}
                        className="font-mono text-[10px] text-ink-tertiary bg-surface-alt border border-line px-2 py-0.5"
                        style={{ borderRadius: '2px' }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-4 bg-primary/20" />
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M5 8L0 0h10L5 8z" fill="rgba(201,168,76,0.3)" />
                </svg>
                <p className="text-[9px] font-mono text-ink-quaternary">
                  Native L7 config (no proxy)
                </p>
              </div>
            </div>

            {/* Layer 3: Platforms */}
            <div className="sharp-card border border-line p-6">
              <p className="text-[11px] font-mono tracking-widest uppercase text-ink-quaternary mb-4">
                Your existing platforms
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ADAPTERS.map((a) => (
                  <div key={a.name} className="flex items-center gap-2 text-xs text-ink-secondary">
                    <span className="text-primary/60 font-mono text-sm shrink-0">{a.icon}</span>
                    {a.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Step by step */}
      <section className="py-24 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-14" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Walkthrough
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink">
              From `dt deploy` to production in five steps.
            </h2>
          </div>
          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className={`relative flex gap-6 pb-10 ${i < STEPS.length - 1 ? '' : ''}`}
                data-reveal
                data-reveal-delay={String(i)}
              >
                {/* Timeline line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-5 top-10 w-px h-full bg-line" />
                )}
                <div className="w-10 h-10 border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 z-10">
                  <span className="font-mono text-xs font-bold text-primary">{step.number}</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-sm font-semibold text-ink mb-2">{step.title}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Security properties */}
      <section className="py-20 border-b border-line bg-surface-alt/30">
        <Container width="5xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Security model
            </p>
            <h2 className="text-2xl font-semibold text-ink mb-2">
              Designed to satisfy your security team.
            </h2>
            <p className="text-ink-secondary text-sm max-w-lg">
              Every architectural decision was made with enterprise security review in mind.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-reveal>
            {SECURITY_PROPS.map((p) => (
              <Card key={p.label} padding="sm" className="flex items-start gap-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-signal-success shrink-0 mt-0.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-ink mb-1">{p.label}</p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{p.body}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-6" data-reveal>
            <Link
              href="/security"
              className="text-sm text-primary hover:text-primary-dark transition-colors font-medium"
            >
              Read the full security overview →
            </Link>
          </div>
        </Container>
      </section>

      <MidCTA
        heading="Ready to see it in your stack?"
        subheading="Install the controller and run your first canary deployment in under 15 minutes."
        primaryLabel="Start free trial"
        primaryHref={`${APP_URL}/signup`}
        secondaryLabel="Read the docs"
        secondaryHref="/docs"
        secondaryExternal={false}
      />
    </>
  )
}
