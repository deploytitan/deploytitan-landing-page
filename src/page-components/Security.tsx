'use client'

import { useScrollReveal } from '../utils'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

const PRINCIPLES = [
  {
    title: 'Your traffic never touches our infrastructure',
    body: "The Titan Controller runs in your VPC, cluster, or Cloud Run service. All routing decisions are executed locally. DeployTitan's API stores policy and audit data, never your traffic.",
  },
  {
    title: 'Secrets never leave your environment',
    body: 'DeployTitan stores deployment metadata and policy config only. Environment variables, secrets, and credentials stay in your secret manager: Vault, AWS Secrets Manager, or GCP Secret Manager.',
  },
  {
    title: 'Encrypted in transit and at rest',
    body: 'All API communication uses TLS 1.3. Data at rest is encrypted with AES-256. The controller authenticates with short-lived signed tokens rotated every 15 minutes.',
  },
  {
    title: 'Immutable audit log',
    body: 'Every deployment, rollback, policy change, and user action is written to an append-only audit log. Enterprise customers can export to S3 or GCS on their own retention schedule.',
  },
  {
    title: 'Least-privilege access model',
    body: 'Roles are scoped to read-only, deploy-only, admin, or auditor. Every API token is scoped to a single organisation. SCIM provisioning and SSO/SAML available on Enterprise.',
  },
  {
    title: 'Distroless controller, minimal attack surface',
    body: 'The controller container has no shell, no package manager, no unnecessary OS utilities. Static binary, ~70MB, built from scratch. Runs as non-root with a read-only filesystem.',
  },
]

const IN_PAGE_SECTIONS = [
  { label: 'Principles', href: '#principles' },
  { label: 'Data residency', href: '#data-residency' },
  { label: 'Disclosure', href: '#disclosure' },
]

export default function Security() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section id="top" className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" className="text-center" data-reveal>
          <p className="text-xs font-mono tracking-[0.08em] uppercase text-primary-accessible mb-4">
            Security
          </p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            Designed to survive
            <br className="hidden md:block" /> your security review.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mx-auto mb-10">
            DeployTitan was built from the first commit with enterprise security in mind. Your
            traffic stays in your infrastructure. Your secrets never leave your environment.
          </p>

          {/* In-page nav */}
          <nav
            aria-label="Page sections"
            className="inline-flex items-center gap-6 border border-line px-5 py-2.5"
            style={{ borderRadius: '2px' }}
          >
            {IN_PAGE_SECTIONS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="text-[11px] font-mono tracking-[0.08em] uppercase text-ink-tertiary hover:text-ink transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* Security principles — specification-sheet rows */}
      <section id="principles" className="py-24 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-[0.08em] uppercase text-primary-accessible mb-3">
              Principles
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink">
              How we build for security.
            </h2>
            <p className="text-sm text-ink-secondary mt-3 max-w-xl">
              These are engineering decisions baked into the architecture, not compliance checkboxes
              or marketing claims.
            </p>
          </div>

          <div className="divide-y divide-line" data-reveal>
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.title}
                className="grid grid-cols-[3rem_1fr_2fr] gap-6 py-6 group hover:bg-surface-alt/50 transition-colors -mx-4 px-4"
              >
                <div className="font-mono text-[10px] text-ink-tertiary tracking-[0.08em] pt-0.5 select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-sm font-semibold text-ink leading-snug">{p.title}</p>
                <p className="text-sm text-ink-secondary leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Architecture callout / Data residency */}
      <section id="data-residency" className="py-20 border-b border-line bg-surface-alt/50">
        <Container width="5xl" padding="default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" data-reveal>
            <div>
              <p className="text-xs font-mono tracking-[0.08em] uppercase text-primary-accessible mb-4">
                Data residency
              </p>
              <h2 className="text-2xl font-semibold text-ink mb-4">
                Your traffic path is yours alone.
              </h2>
              <p className="text-sm text-ink-secondary leading-relaxed mb-5">
                Most deployment tools sit in your traffic path. They become a single point of
                failure and a potential data exfiltration vector. DeployTitan inverts this model.
              </p>
              <p className="text-sm text-ink-secondary leading-relaxed">
                The controller polls our API for deployment <em>intent</em>, then executes that
                intent using your platform's native routing primitives: nginx weights, ALB target
                group percentages, Cloudflare traffic rules. We never see your requests.
              </p>
            </div>

            <Card padding="lg" className="text-xs leading-relaxed">
              <p className="text-[10px] font-mono uppercase tracking-[0.08em] text-ink-tertiary mb-4">
                What leaves your environment
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Deploy intent (service, version, strategy)', sent: true },
                  { label: 'Policy config (HCL/YAML)', sent: true },
                  { label: 'Deploy status and timing', sent: true },
                  { label: 'User traffic / request data', sent: false },
                  { label: 'Secrets / environment variables', sent: false },
                  { label: 'Source code', sent: false },
                  { label: 'Container image contents', sent: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    {item.sent ? (
                      <span className="font-mono text-primary">→</span>
                    ) : (
                      <span className="font-mono text-signal-success">✓</span>
                    )}
                    <span
                      className={
                        item.sent
                          ? 'text-ink-secondary font-sans'
                          : 'text-ink-secondary font-sans line-through opacity-40'
                      }
                    >
                      {item.label}
                    </span>
                    <span
                      className={`ml-auto font-mono text-[9px] uppercase tracking-[0.08em] px-1.5 py-0.5 ${
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

      {/* Closing CTA */}
      <section className="py-20 border-b border-line">
        <Container width="4xl" padding="default">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            data-reveal
          >
            <div>
              <p className="text-xs font-mono tracking-[0.08em] uppercase text-primary-accessible mb-3">
                Evaluate DeployTitan
              </p>
              <h2 className="text-2xl font-semibold text-ink mb-3">
                Ready to run your own security review?
              </h2>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Start a free trial and deploy the controller into your own infrastructure. Review
                the source, run your pen test, inspect every byte that leaves your environment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
              <a
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-ink text-surface px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ borderRadius: '2px' }}
              >
                Start free trial
              </a>
              <a
                href="mailto:security@deploytitan.com"
                className="inline-flex items-center justify-center gap-2 border border-line text-ink-secondary px-6 py-3 text-sm font-medium hover:border-primary/30 hover:text-ink transition-colors"
                style={{ borderRadius: '2px' }}
              >
                Request a security briefing
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Responsible disclosure */}
      <section id="disclosure" className="py-20">
        <Container width="3xl" padding="default" className="text-center" data-reveal>
          <p className="text-xs font-mono tracking-[0.08em] uppercase text-primary-accessible mb-4">
            Vulnerability disclosure
          </p>
          <h2 className="text-2xl font-semibold text-ink mb-4">Found a security issue?</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-6 max-w-lg mx-auto">
            We take security reports seriously. Email{' '}
            <a
              href="mailto:security@deploytitan.com"
              className="text-primary-accessible hover:text-primary"
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
