'use client'

import { APP_URL } from '@/lib/env'
import { useScrollReveal } from '../utils'
import Link from 'next/link'
import { Container } from '../components/shared/Container'

const ADAPTERS = [
  {
    name: 'Kubernetes / nginx-ingress',
    category: 'K8s',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polygon points="12,2 19,7 19,17 12,22 5,17 5,7" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: 'AWS ALB',
    category: 'AWS',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: 'Cloud Run',
    category: 'GCP',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    name: 'AWS Lambda@Edge',
    category: 'AWS',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    name: 'Cloudflare Workers',
    category: 'Edge',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
      </svg>
    ),
  },
  {
    name: 'Azure Front Door',
    category: 'Azure',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Define policy',
    body: 'Write a deployment policy in YAML. Specify allowed strategies, risk thresholds, SLO references, and failover targets. Check it into git like any other config.',
    detail: 'YAML · git-native · version-controlled',
  },
  {
    number: '02',
    title: 'CI pushes a deploy event',
    body: "Your existing CI pipeline calls dt deploy (or the REST API). DeployTitan records the deployment intent, runs Foresight's pre-deploy analysis, and calculates a risk score.",
    detail: 'REST API · risk scoring · pre-deploy analysis',
  },
  {
    number: '03',
    title: 'The controller executes it',
    body: 'The Titan Controller runs in your AWS account and updates Lambda alias weights via the AWS API. For Lambda, no proxy and no sidecar: the controller manages traffic natively through alias routing. For Kubernetes, it configures nginx weights or ALB target groups.',
    detail: 'Lambda alias routing · In-VPC · native L7 · no proxy',
  },
  {
    number: '04',
    title: 'Metrics gate each step',
    body: 'At each canary step, the controller polls your CloudWatch, Datadog, or Prometheus metrics. If SLOs hold, it advances. If they breach, it rolls back automatically — no human in the loop.',
    detail: 'CloudWatch · Datadog · Prometheus · auto-rollback',
  },
  {
    number: '05',
    title: 'Everything is logged',
    body: 'Full deploy lineage — every step, every metric check, every rollback decision — is stored and queryable. Post-incident RCA in minutes, not hours.',
    detail: 'Queryable audit log · RCA-ready · immutable',
  },
]

const SECURITY_PROPS = [
  {
    metric: '<3ms',
    label: 'Routing overhead',
    body: 'The controller adds less than 3ms to routing decisions. Pure passthrough; it executes native L7 config, not a proxy layer.',
  },
  {
    metric: '~70MB',
    label: 'Controller footprint',
    body: 'Distroless container, statically linked. Minimal attack surface. No runtime dependencies, no shell, no package manager.',
  },
  {
    metric: '0 bytes',
    label: 'Traffic through our infra',
    body: 'The controller runs in your VPC or cluster. Your request traffic never touches DeployTitan infrastructure.',
  },
  {
    metric: '100%',
    label: 'Policy as code',
    body: 'No imperative scripts. Every deployment change is a policy diff: code-reviewed, version-controlled, and auditable.',
  },
]

export default function HowItWorks() {
  useScrollReveal()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="blueprint-grid pt-28 pb-0 border-b border-line overflow-hidden">
        <Container width="4xl" padding="default" className="text-center" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
            Architecture
          </p>
          <h1 className="text-4xl lg:text-6xl font-semibold text-ink leading-[1.06] tracking-tight mb-5">
            Your data plane.
            <br /> Our brain.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-xl mx-auto mb-10">
            DeployTitan doesn't sit in your traffic path. A lightweight controller runs inside your
            infrastructure and translates declarative deployment policy into native L7 config — for
            every platform you already use.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href={`${APP_URL}/signup`}
              className="inline-flex items-center gap-2 bg-ink text-surface px-7 py-3.5 text-sm font-medium transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
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

          {/* Inline micro-diagram — orients user before they scroll */}
          <div
            className="relative mx-auto max-w-3xl border border-line border-b-0 bg-surface-alt/40"
            style={{ borderRadius: '2px 2px 0 0' }}
            data-reveal
          >
            {/* Top bar */}
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line bg-surface-alt/60">
              <span className="w-2 h-2 rounded-full bg-signal-danger/40" />
              <span className="w-2 h-2 rounded-full bg-signal-warning/40" />
              <span className="w-2 h-2 rounded-full bg-signal-success/40" />
              <span className="font-mono text-[9px] text-ink-quaternary tracking-widest ml-2 uppercase">
                DeployTitan — system overview
              </span>
            </div>
            <div className="grid grid-cols-3 divide-x divide-line text-left">
              {/* Col 1: SaaS Brain */}
              <div className="p-4 bg-primary/[0.025]">
                <p className="font-mono text-[8px] tracking-widest uppercase text-primary/70 mb-2">DeployTitan Cloud</p>
                <p className="text-xs font-semibold text-ink mb-1">API + Brain</p>
                <p className="font-mono text-[9px] text-ink-quaternary leading-relaxed">
                  Policy · Risk · Audit
                </p>
              </div>
              {/* Col 2: Controller */}
              <div className="p-4 relative">
                <div className="absolute inset-0 border border-dashed border-signal-success/20 m-1" style={{ borderRadius: '1px' }} aria-hidden="true" />
                <p className="font-mono text-[8px] tracking-widest uppercase text-signal-success/60 mb-2 relative">Your VPC</p>
                <p className="text-xs font-semibold text-ink mb-1 relative">Titan Controller</p>
                <p className="font-mono text-[9px] text-ink-quaternary leading-relaxed relative">
                  ~70MB · &lt;3ms overhead
                </p>
              </div>
              {/* Col 3: Platforms */}
              <div className="p-4">
                <p className="font-mono text-[8px] tracking-widest uppercase text-ink-quaternary mb-2">Your platforms</p>
                <div className="flex flex-col gap-1">
                  {['nginx-ingress', 'AWS ALB', 'Cloudflare'].map((p) => (
                    <span key={p} className="font-mono text-[9px] text-ink-tertiary">{p}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Flow arrows */}
            <div className="absolute top-1/2 left-[33.33%] -translate-x-1/2 -translate-y-1/2 w-5 flex items-center justify-center" aria-hidden="true">
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                <path d="M0 4h13M10 1l3 3-3 3" stroke="rgba(201,168,76,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="absolute top-1/2 left-[66.66%] -translate-x-1/2 -translate-y-1/2 w-5 flex items-center justify-center" aria-hidden="true">
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                <path d="M0 4h13M10 1l3 3-3 3" stroke="rgba(201,168,76,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Architecture diagram ──────────────────────────────────────── */}
      <section className="py-32 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-16" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Data flow
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-ink tracking-tight mb-3">
              Three layers. Zero lock-in.
            </h2>
            <p className="text-sm text-ink-secondary max-w-md leading-relaxed">
              The controller runs in your infrastructure. DeployTitan never intercepts your traffic —
              it only instructs the routing layer you already operate.
            </p>
          </div>

          {/* Diagram: layered with explicit VPC boundary */}
          <div data-reveal>
            {/* DeployTitan Cloud — outside VPC */}
            <div className="mb-2">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[9px] tracking-widest uppercase text-primary/60">
                  DeployTitan Cloud — hosted by us
                </span>
                <div className="flex-1 h-px bg-primary/10" />
              </div>
              <div
                className="border border-primary/25 bg-primary/[0.025] p-6"
                style={{ borderRadius: '2px' }}
              >
                <div className="flex items-start gap-5">
                  <div
                    className="w-9 h-9 border border-primary/25 flex items-center justify-center shrink-0 bg-primary/5"
                    style={{ borderRadius: '2px' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-primary" aria-hidden="true">
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <p className="text-sm font-semibold text-ink">DeployTitan API + Brain</p>
                      <span
                        className="font-mono text-[9px] text-primary/70 border border-primary/20 bg-primary/5 px-1.5 py-0.5"
                        style={{ borderRadius: '2px' }}
                      >
                        SaaS — your traffic never passes through
                      </span>
                    </div>
                    <p className="text-xs text-ink-secondary leading-relaxed max-w-prose">
                      Policy storage, risk analysis, deploy orchestration, audit log, and dashboard.
                      Hosted by us — your request traffic never passes through our network.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow: HTTPS poll — direction indicates controller initiates */}
            <div className="flex items-center justify-center gap-3 py-3" aria-hidden="true">
              <div className="flex-1 h-px bg-line max-w-20" />
              <div className="flex flex-col items-center gap-1">
                <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                  <path d="M5 0v11M2 8l3 5 3-5" stroke="rgba(201,168,76,0.45)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="font-mono text-[9px] text-ink-quaternary tracking-wide">
                  polls for deploy intent · HTTPS · outbound only
                </p>
              </div>
              <div className="flex-1 h-px bg-line max-w-20" />
            </div>

            {/* VPC boundary */}
            <div className="mb-2">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[9px] tracking-widest uppercase text-signal-success/60">
                  Your VPC / cluster — traffic stays here
                </span>
                <div className="flex-1 h-px bg-signal-success/15" />
              </div>
              {/* VPC wrapper with dashed border */}
              <div
                className="border border-dashed border-signal-success/25 p-4"
                style={{ borderRadius: '2px' }}
              >
                <div
                  className="border border-line bg-surface-alt/20 p-6"
                  style={{ borderRadius: '2px' }}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className="w-9 h-9 border border-line flex items-center justify-center shrink-0"
                      style={{ borderRadius: '2px' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-ink-secondary" aria-hidden="true">
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                        <line x1="6" y1="6" x2="6.01" y2="6" />
                        <line x1="6" y1="18" x2="6.01" y2="18" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <p className="text-sm font-semibold text-ink">Titan Controller</p>
                        <span
                          className="font-mono text-[9px] text-signal-success/80 border border-signal-success/25 bg-signal-success/5 px-1.5 py-0.5"
                          style={{ borderRadius: '2px' }}
                        >
                          runs in your infra
                        </span>
                      </div>
                      <p className="text-xs text-ink-secondary leading-relaxed mb-4 max-w-prose">
                        Distroless ~70MB container. Polls the API, executes routing changes natively.
                        Adds &lt;3ms overhead. Traffic never leaves your VPC.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'docker run deploytitan/controller',
                          'helm install titan-controller deploytitan/controller',
                          'Cloud Run service',
                        ].map((c) => (
                          <span
                            key={c}
                            className="font-mono text-[10px] text-ink-tertiary bg-surface border border-line px-2 py-1"
                            style={{ borderRadius: '2px' }}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow within VPC */}
                <div className="flex items-center justify-center gap-3 py-3" aria-hidden="true">
                  <div className="flex-1 h-px bg-line max-w-16" />
                  <div className="flex flex-col items-center gap-1">
                    <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                      <path d="M5 0v11M2 8l3 5 3-5" stroke="rgba(201,168,76,0.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="font-mono text-[9px] text-ink-quaternary tracking-wide">
                      native L7 config · no proxy · direct platform API
                    </p>
                  </div>
                  <div className="flex-1 h-px bg-line max-w-16" />
                </div>

                {/* Platform grid — wider, lower visual weight */}
                <div
                  className="border border-line bg-surface/60 p-5"
                  style={{ borderRadius: '2px' }}
                >
                  <p className="font-mono text-[9px] tracking-widest uppercase text-ink-quaternary mb-4">
                    Your existing platforms
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                    {ADAPTERS.map((a) => (
                      <div key={a.name} className="flex items-center gap-2">
                        <span className="text-ink-tertiary/60 shrink-0">{a.icon}</span>
                        <div>
                          <span className="text-xs text-ink-secondary leading-tight">{a.name}</span>
                          <span className="font-mono text-[8px] text-ink-quaternary ml-1.5">{a.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Step by step ─────────────────────────────────────────────── */}
      <section className="py-28 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-16" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Walkthrough
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-ink tracking-tight">
              From{' '}
              <code className="font-mono text-2xl lg:text-3xl font-medium bg-surface-alt border border-line px-2 py-0.5" style={{ borderRadius: '2px' }}>
                dt deploy
              </code>{' '}
              to production in five steps.
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
                {/* Timeline connector — only between steps */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-[18px] top-10 w-px bottom-0 bg-line" aria-hidden="true" />
                )}

                {/* Step number badge */}
                <div
                  className="w-9 h-9 border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 z-10"
                  style={{ borderRadius: '2px' }}
                >
                  <span className="font-mono text-[11px] font-bold text-primary">{step.number}</span>
                </div>

                <div className="pt-0.5 flex-1">
                  <h3 className="text-base font-semibold text-ink mb-2 leading-snug">{step.title}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed mb-3 max-w-xl">{step.body}</p>
                  <p className="font-mono text-[9px] tracking-widest uppercase text-ink-quaternary">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Security properties ───────────────────────────────────────── */}
      <section className="py-24 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-14" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Security model
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-ink tracking-tight mb-3">
              Designed to satisfy your security team.
            </h2>
            <p className="text-ink-secondary text-sm max-w-lg leading-relaxed">
              Every architectural decision was made with enterprise security review in mind.
              Here are the properties that matter.
            </p>
          </div>

          {/* Spec-sheet layout: metric at large size, label + body below */}
          <div className="divide-y divide-line border border-line" data-reveal style={{ borderRadius: '2px' }}>
            {SECURITY_PROPS.map((p, i) => (
              <div
                key={p.metric}
                className={`grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4 sm:gap-8 p-6 ${i % 2 === 0 ? 'bg-surface' : 'bg-surface-alt/30'}`}
              >
                {/* Metric column */}
                <div className="flex flex-col justify-center">
                  <span className="font-mono text-2xl font-medium text-ink tracking-tight leading-none mb-1">
                    {p.metric}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest uppercase text-ink-quaternary">
                    {p.label}
                  </span>
                </div>
                {/* Explanation column */}
                <div className="flex items-center">
                  <p className="text-sm text-ink-secondary leading-relaxed max-w-prose">{p.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8" data-reveal>
            <Link
              href="/security"
              className="text-sm text-primary hover:text-primary-dark transition-colors font-medium"
            >
              Read the full security overview →
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
