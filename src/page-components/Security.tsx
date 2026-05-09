'use client'

import { useScrollReveal } from '../utils'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

const PRINCIPLES = [
  {
    title: 'Your traffic never touches our infrastructure',
    body: "The Titan Controller runs in your VPC, cluster, or Cloud Run service. All routing decisions are executed locally. DeployTitan's API stores policy and audit data — never your traffic.",
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
    title: 'Secrets never leave your environment',
    body: 'DeployTitan only stores deployment metadata and policy config. Environment variables, secrets, and credentials stay in your secret manager (Vault, AWS Secrets Manager, GCP Secret Manager).',
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
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'Encrypted in transit and at rest',
    body: 'All API communication uses TLS 1.3. Data at rest is encrypted with AES-256. The controller authenticates with short-lived signed tokens rotated every 15 minutes.',
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
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    title: 'Immutable audit log',
    body: 'Every deployment, rollback, policy change, and user action is written to an append-only audit log. Enterprise customers can export to S3 or GCS on their own retention schedule.',
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
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
  {
    title: 'Least-privilege access model',
    body: 'Roles are scoped to read-only, deploy-only, admin, or auditor. Every API token is scoped to a single organisation. SCIM provisioning and SSO/SAML available on Enterprise.',
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
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: 'Distroless controller, minimal attack surface',
    body: 'The controller container has no shell, no package manager, no unnecessary OS utilities. Static binary, ~70MB, built from scratch. Runs as non-root with read-only filesystem.',
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
]

const COMPLIANCE = [
  { name: 'SOC 2 Type II', status: 'In progress', note: 'Audit scheduled Q3 2026' },
  { name: 'GDPR', status: 'Compliant', note: 'DPA available on request' },
  { name: 'ISO 27001', status: 'Roadmap', note: 'Planned Q4 2026' },
  { name: 'HIPAA', status: 'Enterprise', note: 'BAA available for Enterprise customers' },
]

export default function Security() {  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" className="text-center" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">Security</p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            Designed to survive
            <br className="hidden md:block" /> your security review.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mx-auto">
            DeployTitan was built from the first commit with enterprise security in mind. Your
            traffic stays in your infrastructure. Your secrets never leave your environment.
          </p>
        </Container>
      </section>

      {/* Key principles */}
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Principles
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink">
              Security principles, not marketing claims.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRINCIPLES.map((p, i) => (
              <Card
                key={p.title}
                className="p-7 hover:border-primary/20 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200"
                padding="none"
                data-reveal
                data-reveal-delay={String(i % 3)}
              >
                <div className="flex items-center gap-3 text-primary mb-4">{p.icon}</div>
                <h3 className="text-sm font-semibold text-ink mb-2 leading-snug">{p.title}</h3>
                <p className="text-xs text-ink-secondary leading-relaxed">{p.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Architecture callout */}
      <section className="py-20 border-b border-line bg-surface-alt/30">
        <Container width="5xl" padding="default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" data-reveal>
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
                Data residency
              </p>
              <h2 className="text-2xl font-semibold text-ink mb-4">
                Your traffic path is yours alone.
              </h2>
              <p className="text-sm text-ink-secondary leading-relaxed mb-5">
                Most deployment tools sit in your traffic path — they become a SPOF and a data
                exfiltration vector. DeployTitan inverts this model.
              </p>
              <p className="text-sm text-ink-secondary leading-relaxed">
                The controller polls our API for deployment <em>intent</em>, then executes that
                intent using your platform's native routing primitives (nginx weights, ALB target
                group percentages, Cloudflare traffic rules). We never see your requests.
              </p>
            </div>
            <Card padding="lg" className="font-mono text-xs leading-relaxed">
              <p className="text-ink-quaternary mb-4 text-[10px] uppercase tracking-wider">
                What leaves your environment
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Deploy intent (service, version, strategy)', sent: true },
                  { label: 'Policy config (HCL/YAML)', sent: true },
                  { label: 'Deploy status + timing', sent: true },
                  { label: 'User traffic / request data', sent: false },
                  { label: 'Secrets / environment variables', sent: false },
                  { label: 'Source code', sent: false },
                  { label: 'Container image contents', sent: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    {item.sent ? (
                      <span className="text-primary">→</span>
                    ) : (
                      <span className="text-signal-success">✓</span>
                    )}
                    <span
                      className={
                        item.sent
                          ? 'text-ink-secondary'
                          : 'text-ink-secondary line-through opacity-40'
                      }
                    >
                      {item.label}
                    </span>
                    <span
                      className={`ml-auto text-[9px] uppercase tracking-wider px-1.5 py-0.5 font-mono ${
                        item.sent
                          ? 'text-ink-tertiary border border-line'
                          : 'text-signal-success/80 border border-signal-success/30 bg-signal-success/5'
                      }`}
                      style={{ borderRadius: '2px' }}
                    >
                      {item.sent ? 'API' : 'Stays local'}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Compliance table */}
      <section className="py-20 border-b border-line">
        <Container width="4xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Compliance
            </p>
            <h2 className="text-2xl font-semibold text-ink mb-2">Compliance posture</h2>
            <p className="text-ink-secondary text-sm">
              We're transparent about what's done, what's in progress, and what's planned.
            </p>
          </div>
          <Card padding="none" className="overflow-hidden" data-reveal>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-alt/50">
                  <th className="text-left px-5 py-3 text-xs font-mono text-ink-quaternary uppercase tracking-wider">
                    Standard
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-mono text-ink-quaternary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-mono text-ink-quaternary uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPLIANCE.map((c, i) => (
                  <tr
                    key={c.name}
                    className={`border-b border-line/40 last:border-b-0 ${i % 2 === 0 ? '' : 'bg-surface-alt/20'}`}
                  >
                    <td className="px-5 py-3 font-medium text-ink text-sm">{c.name}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-wider px-2 py-1 border ${
                          c.status === 'Compliant'
                            ? 'text-signal-success/80 border-signal-success/30 bg-signal-success/5'
                            : c.status === 'In progress'
                              ? 'text-primary/80 border-primary/30 bg-primary/5'
                              : 'text-ink-tertiary border-line'
                        }`}
                        style={{ borderRadius: '2px' }}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-ink-secondary">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Container>
      </section>

      {/* Responsible disclosure */}
      <section className="py-20 border-b border-line">
        <Container width="3xl" padding="default" className="text-center" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
            Vulnerability disclosure
          </p>
          <h2 className="text-2xl font-semibold text-ink mb-4">Found a security issue?</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-6 max-w-lg mx-auto">
            We take security reports seriously. Email{' '}
            <a
              href="mailto:security@deploytitan.com"
              className="text-primary hover:text-primary-dark"
            >
              security@deploytitan.com
            </a>{' '}
            with details. We commit to acknowledging reports within 24 hours and providing a
            resolution timeline within 72 hours.
          </p>
          <a
            href="mailto:security@deploytitan.com"
            className="inline-flex items-center gap-2 border border-line text-ink-secondary px-5 py-2.5 text-sm font-medium hover:border-primary/30 hover:text-ink transition-colors"
            style={{ borderRadius: '2px' }}
          >
            Report a vulnerability
          </a>
        </Container>
      </section>

      
    </>
  )
}
