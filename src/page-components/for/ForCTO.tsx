'use client'

import { APP_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import Link from 'next/link'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'

const ROI_POINTS = [
  {
    metric: '85%',
    label: 'Fewer production incidents',
    body: 'Pre-deploy risk scoring and automatic rollback catch problems before they become incidents.',
  },
  {
    metric: '3×',
    label: 'Deploy frequency increase',
    body: 'Teams that automated rollback ship 3× more often. Confidence scales with tooling.',
  },
  {
    metric: '< 30s',
    label: 'Mean time to recover',
    body: 'Automated failover and rollback cut MTTR from 40+ minutes to under 30 seconds.',
  },
  {
    metric: '0',
    label: 'Vendor lock-in',
    body: 'The controller speaks native L7 — no proprietary traffic layer. Switch platforms any time.',
  },
]

const RISKS_ADDRESSED = [
  'Single cloud dependency (us-east-1 is not a resilience strategy)',
  'Deploy-related incidents eating error budget',
  'Manual runbooks that fail under pressure',
  'Tribal knowledge locked in your most senior SRE',
  'Compliance risk from missing audit logs',
  'Vendor lock-in from proprietary deployment platforms',
]

export default function ForCTO() {
  useScrollReveal()

  return (
    <>
      <section className="blueprint-grid border-line border-b pt-28 pb-20">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-primary-accessible mb-4 font-mono text-xs tracking-widest uppercase">
            For CTOs & VP Engineering
          </p>
          <h1 className="text-ink mb-5 text-4xl leading-tight font-semibold lg:text-5xl">
            The deployment platform
            <br className="hidden md:block" /> your org can rely on.
          </h1>
          <p className="text-ink-secondary mb-8 max-w-2xl text-lg leading-relaxed">
            Deployment incidents are expensive. Manual runbooks are technical debt. Single-cloud
            dependencies are board-level risk. DeployTitan gives your engineering org the deployment
            control plane to ship faster, recover faster, and eliminate the risks that keep you up
            at night.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`${APP_URL}/signup`}
              className="bg-ink text-surface inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)] active:scale-[0.97]"
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
            </Link>
            <a
              href="https://cal.com/justine-deploytitan/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-accessible hover:text-primary text-sm font-medium transition-colors"
            >
              Schedule a call with our team →
            </a>
          </div>
        </Container>
      </section>

      {/* ROI */}
      <section className="border-line border-b py-20">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              Business outcomes
            </p>
            <h2 className="text-ink text-2xl font-semibold">Measured impact on what matters.</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ROI_POINTS.map((r, i) => (
              <Card
                key={r.label}
                className="hover:border-primary/20 transition-all hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                data-reveal
                data-reveal-delay={String(i)}
              >
                <p className="text-ink mb-1 text-4xl font-bold">{r.metric}</p>
                <p className="text-primary-accessible mb-3 font-mono text-xs tracking-wider uppercase">
                  {r.label}
                </p>
                <p className="text-ink-secondary text-xs leading-relaxed">{r.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Risk reduction */}
      <section className="border-line bg-surface-alt/30 border-b py-20">
        <Container width="5xl" padding="default">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2" data-reveal>
            <div>
              <p className="text-primary-accessible mb-4 font-mono text-xs tracking-widest uppercase">
                Risk reduction
              </p>
              <h2 className="text-ink mb-4 text-2xl font-semibold">
                The risks DeployTitan eliminates.
              </h2>
              <p className="text-ink-secondary mb-6 text-sm leading-relaxed">
                Every item on this list is an incident waiting to happen — or a board question you
                don't want to answer.
              </p>
              <ul className="flex flex-col gap-3">
                {RISKS_ADDRESSED.map((r) => (
                  <li key={r} className="text-ink-secondary flex items-start gap-3 text-sm">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-signal-success mt-0.5 shrink-0"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <Card padding="sm">
                <p className="text-ink-tertiary mb-3 font-mono text-xs tracking-wider uppercase">
                  Architecture principle
                </p>
                <p className="text-ink mb-2 text-sm font-semibold">"Your data plane, our brain."</p>
                <p className="text-ink-secondary text-xs leading-relaxed">
                  The controller runs in your VPC. Traffic never passes through DeployTitan. No
                  vendor dependency in your critical path. No data sovereignty risk.
                </p>
                <Link
                  href="/how-it-works"
                  className="text-primary-accessible hover:text-primary mt-3 inline-block text-xs transition-colors"
                >
                  Read the architecture →
                </Link>
              </Card>
              <Card padding="sm">
                <p className="text-ink-tertiary mb-3 font-mono text-xs tracking-wider uppercase">
                  Security posture
                </p>
                <p className="text-ink mb-2 text-sm font-semibold">
                  SOC 2 Type II in progress (Q3 2026).
                </p>
                <p className="text-ink-secondary text-xs leading-relaxed">
                  Encrypted at rest and in transit. Immutable audit log. SCIM + SSO on Enterprise.
                  DPA available for GDPR compliance.
                </p>
                <Link
                  href="/security"
                  className="text-primary-accessible hover:text-primary mt-3 inline-block text-xs transition-colors"
                >
                  Security overview →
                </Link>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
