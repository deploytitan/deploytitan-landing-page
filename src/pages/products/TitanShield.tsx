import { useDocumentMeta } from '../../hooks/useDocumentMeta'
import { Resilience } from '../../components/Resilience'
import { MidCTA } from '../../components/MidCTA'
import { CodeBlock } from '../../components/shared/CodeBlock'
import { InstallTabs } from '../../components/shared/InstallTabs'
import { useScrollReveal } from '../../utils'

const APP_URL = import.meta.env.VITE_APP_URL as string || 'https://app.deploytitan.com'

const POLICY_CODE = `# titan-shield.hcl
failover "global-api" {
  primary   = "aws-us-east-1"
  secondary = ["aws-eu-west-1", "gcp-us-central1"]

  health_check {
    path      = "/healthz"
    interval  = "10s"
    threshold = 3
  }

  routing = "latency"
}`

const CLI_CODE = `# Real-time cross-region health
dt shield status --service global-api

# Trigger a DR drill
dt shield failover \\
  --service global-api \\
  --from aws-us-east-1 \\
  --to aws-eu-west-1

# Failback when primary recovers
dt shield failback --service global-api --auto`

const CROSS_LINKS = [
  { label: 'Titan Rollout', desc: 'Progressive deployments', href: '/products/titan-rollout' },
  { label: 'Titan Sentinel', desc: 'Pre-deploy risk scoring', href: '/products/titan-sentinel' },
  { label: 'Solutions', desc: 'See all use cases', href: '/solutions' },
]

export default function TitanShield() {
  useDocumentMeta(
    'Titan Shield — Multi-Cloud Failover | DeployTitan',
    'Automatic multi-cloud failover, disaster recovery drills, and zero-latency global routing. Define your policy once — Titan Shield handles the rest.'
  )
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <div className="max-w-4xl mx-auto px-6" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">Titan Shield</p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-surface leading-tight mb-6">
            Multi-cloud resilience.<br className="hidden md:block" /> Failover in milliseconds.
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-2xl mb-8">
            Titan Shield watches every region continuously and shifts traffic before your on-call wakes up. Declare your failover policy once — never touch it again.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={`${APP_URL}/signup`} className="inline-flex items-center gap-2 bg-primary text-ink text-sm font-semibold px-5 py-2.5 hover:bg-primary-light transition-colors" style={{ borderRadius: '2px' }}>
              Start free trial
            </a>
            <a href="/solutions" className="inline-flex items-center gap-2 border border-line text-surface/80 text-sm px-5 py-2.5 hover:border-primary/40 transition-colors" style={{ borderRadius: '2px' }}>
              See use cases
            </a>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <Resilience />

      {/* Quickstart */}
      <section className="py-24 border-t border-line">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">Quickstart</p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-surface mb-3">Define your failover policy in minutes.</h2>
            <p className="text-muted max-w-xl">One HCL file. Automatic health checks. Sub-second failover across every cloud you run on.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-reveal>
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Install</p>
                <InstallTabs />
              </div>
              <div>
                <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Manage failover</p>
                <CodeBlock code={CLI_CODE} lang="bash" filename="terminal" />
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Policy-as-code</p>
              <CodeBlock code={POLICY_CODE} lang="hcl" filename="titan-shield.hcl" />
            </div>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-16 border-t border-line">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-mono tracking-widest uppercase text-muted mb-6" data-reveal>Also in DeployTitan</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CROSS_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="sharp-card border border-line p-5 flex flex-col gap-1.5 hover:border-primary/30 hover:bg-white/[0.02] transition-colors" data-reveal>
                <span className="text-sm font-semibold text-surface">{l.label}</span>
                <span className="text-xs text-muted">{l.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <MidCTA
        heading="Stop writing DR runbooks. Start running DR policies."
        subheading="14-day free trial. No credit card. Connect your first cloud region in under 10 minutes."
        primaryLabel="Start free trial"
        primaryHref={`${APP_URL}/signup`}
        secondaryLabel="Talk to an engineer"
        secondaryHref="https://cal.com/deploytitan/demo"
        secondaryExternal
      />
    </>
  )
}
