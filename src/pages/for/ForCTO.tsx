import { useDocumentMeta } from '../../hooks/useDocumentMeta'
import { useScrollReveal } from '../../utils'
import { MidCTA } from '../../components/MidCTA'
import { Link } from 'react-router-dom'
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
  useDocumentMeta(
    'DeployTitan for CTOs & VP Engineering',
    'Reduce deploy-related incidents by 85%. Ship 3× more often. Zero vendor lock-in. The deployment control plane your engineering org needs.',
  )
  useScrollReveal()

  return (
    <>
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
            For CTOs & VP Engineering
          </p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            The deployment platform
            <br className="hidden md:block" /> your org can rely on.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            Deployment incidents are expensive. Manual runbooks are technical debt. Single-cloud
            dependencies are board-level risk. DeployTitan gives your engineering org the deployment
            control plane to ship faster, recover faster, and eliminate the risks that keep you up
            at night.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/early-access"
              className="inline-flex items-center gap-2 bg-ink text-surface px-6 py-3 text-sm font-medium transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
              style={{ borderRadius: '2px' }}
            >
              Request early access
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
              href="https://cal.com/deploytitan/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Schedule a call with our team →
            </a>
          </div>
        </Container>
      </section>

      {/* ROI */}
      <section className="py-20 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Business outcomes
            </p>
            <h2 className="text-2xl font-semibold text-ink">Measured impact on what matters.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ROI_POINTS.map((r, i) => (
              <Card
                key={r.label}
                className="hover:border-primary/20 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all"
                data-reveal
                data-reveal-delay={String(i)}
              >
                <p className="text-4xl font-bold text-ink mb-1">{r.metric}</p>
                <p className="text-xs font-mono text-primary uppercase tracking-wider mb-3">
                  {r.label}
                </p>
                <p className="text-xs text-ink-secondary leading-relaxed">{r.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Risk reduction */}
      <section className="py-20 border-b border-line bg-surface-alt/30">
        <Container width="5xl" padding="default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" data-reveal>
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
                Risk reduction
              </p>
              <h2 className="text-2xl font-semibold text-ink mb-4">
                The risks DeployTitan eliminates.
              </h2>
              <p className="text-sm text-ink-secondary leading-relaxed mb-6">
                Every item on this list is an incident waiting to happen — or a board question you
                don't want to answer.
              </p>
              <ul className="flex flex-col gap-3">
                {RISKS_ADDRESSED.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm text-ink-secondary">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-signal-success shrink-0 mt-0.5"
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
                <p className="text-xs font-mono text-ink-quaternary uppercase tracking-wider mb-3">
                  Architecture principle
                </p>
                <p className="text-sm font-semibold text-ink mb-2">"Your data plane, our brain."</p>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  The controller runs in your VPC. Traffic never passes through DeployTitan. No
                  vendor dependency in your critical path. No data sovereignty risk.
                </p>
                <Link
                  to="/how-it-works"
                  className="text-xs text-primary hover:text-primary-dark transition-colors mt-3 inline-block"
                >
                  Read the architecture →
                </Link>
              </Card>
              <Card padding="sm">
                <p className="text-xs font-mono text-ink-quaternary uppercase tracking-wider mb-3">
                  Security posture
                </p>
                <p className="text-sm font-semibold text-ink mb-2">
                  SOC 2 Type II in progress (Q3 2026).
                </p>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  Encrypted at rest and in transit. Immutable audit log. SCIM + SSO on Enterprise.
                  DPA available for GDPR compliance.
                </p>
                <Link
                  to="/security"
                  className="text-xs text-primary hover:text-primary-dark transition-colors mt-3 inline-block"
                >
                  Security overview →
                </Link>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <MidCTA
        heading="Ready to discuss your deployment strategy?"
        subheading="Talk to our team. We'll walk through your current setup, identify the highest-leverage changes, and show you exactly what DeployTitan looks like in your environment."
        primaryLabel="Request early access"
        primaryHref="/early-access"
        secondaryLabel="Schedule a call"
        secondaryHref="https://cal.com/deploytitan/demo"
        secondaryExternal
      />
    </>
  )
}
