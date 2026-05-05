'use client'

import { APP_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import { MidCTA } from '../../components/MidCTA'
import Link from 'next/link'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'

const FEATURES = [
  {
    title: 'One command, every platform',
    body: '`dt deploy` works on Kubernetes, ECS, Cloud Run, and Lambda. No platform-specific pipeline scripts.',
    code: '$ dt deploy --strategy canary --env production',
  },
  {
    title: 'Auto-rollback, no runbook required',
    body: "Set a latency or error-rate threshold. DeployTitan rolls back automatically when it's crossed.",
    code: '$ dt deploy --auto-rollback --p99-threshold 200ms',
  },
  {
    title: 'Ship Friday without the anxiety',
    body: 'Canary to 5% before the weekend. Let it soak. Promote Monday morning with one command.',
    code: '$ dt deploy --canary-weight 5 --hold-for 48h',
  },
]

export default function ForDevOps() {
  useScrollReveal()

  return (
    <>
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
            For DevOps & Release Engineering
          </p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            Ship Friday.
            <br className="hidden md:block" /> Sleep Saturday.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            One `dt deploy` command replaces 200 lines of pipeline YAML, a rollback runbook, and a
            "please don't deploy on Friday" Slack rule. Automatic rollback, canary stepping, and
            cross-cloud support — wired together.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`${APP_URL}/signup`}
              className="inline-flex items-center gap-2 bg-ink text-surface dark:text-surface px-6 py-3 text-sm font-medium transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
              style={{ borderRadius: '2px' }}
            >
              Start free trial
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
            <Link
              href="/solutions/progressive-delivery"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Explore progressive delivery →
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-24 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              How it works
            </p>
            <h2 className="text-2xl font-semibold text-ink">
              Less pipeline YAML. More confidence.
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {FEATURES.map((f, i) => (
              <Card
                key={f.title}
                padding="none"
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-7 hover:border-primary/20 transition-all"
                data-reveal
                data-reveal-delay={String(i)}
              >
                <div>
                  <h3 className="text-sm font-semibold text-ink mb-2">{f.title}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{f.body}</p>
                </div>
                <div
                  className="font-mono text-xs bg-surface-alt border border-line p-4 flex items-center"
                  style={{ borderRadius: '2px' }}
                >
                  <span className="text-primary">$</span>
                  <span className="text-ink-secondary ml-2">{f.code.replace('$ ', '')}</span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 border-b border-line bg-surface-alt/30">
        <Container width="5xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
            CI/CD integrations
          </p>
          <h2 className="text-2xl font-semibold text-ink mb-5">
            Works with your existing pipeline.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              'GitHub Actions',
              'GitLab CI',
              'CircleCI',
              'Jenkins',
              'Buildkite',
              'ArgoCD',
              'Terraform',
              'Pulumi',
            ].map((ci) => (
              <Card
                key={ci}
                padding="none"
                className="p-3 text-center text-xs font-medium text-ink-secondary hover:border-primary/20 hover:text-ink transition-all"
              >
                {ci}
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <MidCTA
        heading="Your next Friday deploy can be boring."
        subheading="14-day free trial, no credit card. Ship your first canary in under 2 minutes."
        primaryLabel="Start free trial"
        primaryHref={`${APP_URL}/signup`}
        secondaryLabel="Request early access"
        secondaryHref="/early-access"
        secondaryExternal={false}
      />
    </>
  )
}
