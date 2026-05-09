'use client'

import { APP_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import { Breadcrumbs } from '../../components/shared/Breadcrumbs'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'

const CLOUDS = [
  {
    name: 'AWS',
    color: 'text-[#FF9900]',
    bg: 'bg-[#FF9900]/10',
    adapters: ['ALB', 'Lambda Edge', 'ECS'],
  },
  {
    name: 'GCP',
    color: 'text-[#4285F4]',
    bg: 'bg-[#4285F4]/10',
    adapters: ['Cloud Run', 'Cloud Load Balancing', 'GKE Ingress'],
  },
  {
    name: 'Azure',
    color: 'text-[#0078D4]',
    bg: 'bg-[#0078D4]/10',
    adapters: ['Azure Front Door', 'AKS Ingress', 'Application Gateway'],
  },
  {
    name: 'Edge',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    adapters: ['Cloudflare', 'Fastly', 'CloudFront'],
  },
]

const SCENARIOS = [
  {
    title: 'Cloud region goes down',
    before: 'Manual failover runbook. Three people needed. RTO: 40+ minutes.',
    after: 'Shield detects unhealthy region in < 10s, shifts traffic automatically. RTO: < 30s.',
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
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: 'Latency spike in primary region',
    before: 'On-call manually reroutes traffic. Alert fatigue means slow response.',
    after: 'Prometheus/Datadog threshold triggers automatic geo-reroute before SLO is breached.',
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
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Planned maintenance window',
    before: 'Coordinate across cloud consoles, update DNS, hope TTL is low.',
    after: 'Declare maintenance in one HCL block. Shield handles traffic shift and rebalance.',
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
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: 'DR drill (compliance requirement)',
    before: 'Quarterly DR drills take two days to orchestrate and always surface surprises.',
    after:
      'Run DR drill mode in Shield: simulate failover without real traffic impact. Document results automatically.',
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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
]

export default function SolutionMultiCloudResilience() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" data-reveal>
          <Breadcrumbs className="mb-6" />
          <div
            className="inline-flex items-center gap-2 font-mono text-[10px] text-primary border border-primary/30 px-2 py-1 mb-6"
            style={{ borderRadius: '2px' }}
          >
            <span className="w-1.5 h-1.5 bg-signal-success" style={{ borderRadius: '1px' }} />
            Powered by Titan Shield
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            Failover in seconds.
            <br className="hidden md:block" /> Not in war-room hours.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            AWS us-east-1 goes down and your on-call is still waking up. Titan Shield has already
            shifted traffic. Declarative cross-cloud routing, fully automated failover, and a DR
            drill mode that actually prepares you for the real thing.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-sm mb-8">
            {[
              { value: '< 30s', label: 'RTO for 99.9% of incidents' },
              { value: '10s', label: 'Failure detection time' },
              { value: '4+', label: 'Supported cloud providers' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-ink">{stat.value}</p>
                <p className="text-[10px] text-ink-tertiary leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://cal.com/deploytitan/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-surface px-6 py-3 text-sm font-medium dark:text-surface transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
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
              href={`${APP_URL}/signup`}
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Start free trial →
            </a>
          </div>
        </Container>
      </section>

      {/* Cloud adapters */}
      <section className="py-20 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Coverage
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-2">
              One control plane. Every cloud.
            </h2>
            <p className="text-ink-secondary text-sm max-w-lg">
              The Titan Shield controller runs in your infrastructure and speaks native L7 protocols,
              with no proxy layer, no vendor lock-in.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-reveal>
            {CLOUDS.map((cloud) => (
              <Card key={cloud.name} className="hover:border-primary/20 transition-all">
                <div
                  className={`inline-flex items-center gap-2 px-2 py-1 rounded-sm mb-4 ${cloud.bg}`}
                >
                  <span className={`font-mono text-xs font-bold ${cloud.color}`}>{cloud.name}</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {cloud.adapters.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-xs text-ink-secondary">
                      <span className="w-1 h-1 bg-primary/50 shrink-0" style={{ borderRadius: '1px' }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Scenarios */}
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Scenarios
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink">
              Every failure mode, handled automatically.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SCENARIOS.map((s, i) => (
              <Card
                key={s.title}
                padding="none"
                className="p-7 hover:border-primary/20 transition-all"
                data-reveal
                data-reveal-delay={String(i)}
              >
                <div className="flex items-center gap-3 text-primary mb-4">
                  {s.icon}
                  <h3 className="font-semibold text-ink text-sm">{s.title}</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-2 text-xs text-ink-secondary">
                    <span className="shrink-0 mt-0.5 text-red-400/70 font-mono">Before</span>
                    <span>{s.before}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-ink-secondary border-t border-line pt-3">
                    <span className="shrink-0 mt-0.5 text-primary font-mono">After</span>
                    <span>{s.after}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* HCL snippet */}
      <section className="py-20 border-b border-line bg-surface-alt/30">
        <Container width="3xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Policy as code
            </p>
            <h2 className="text-2xl font-semibold text-ink mb-2">
              Define failover policy once. Never touch it again.
            </h2>
          </div>
          <Card padding="none" className="overflow-hidden" data-reveal>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-surface-alt/60">
              <span className="font-mono text-[10px] text-ink-quaternary">failover.hcl</span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed text-ink-secondary">
              <p>
                <span className="text-primary">failover_policy</span>{' '}
                <span className="text-ink">"production"</span> {'{'}
              </p>
              <p className="ml-4 text-ink-secondary">
                primary_region = <span className="text-signal-success">"aws/us-east-1"</span>
              </p>
              <p className="ml-4 text-ink-secondary">
                failover_regions = [<span className="text-signal-success">"gcp/us-central1"</span>,{' '}
                <span className="text-signal-success">"aws/eu-west-1"</span>]
              </p>
              <p className="ml-4 mt-2 text-ink-secondary">trigger {'{'}</p>
              <p className="ml-8 text-ink-secondary">
                error_rate_threshold = <span className="text-primary">0.05</span>
              </p>
              <p className="ml-8 text-ink-secondary">
                p99_latency_ms = <span className="text-primary">500</span>
              </p>
              <p className="ml-8 text-ink-secondary">
                consecutive_failures = <span className="text-primary">3</span>
              </p>
              <p className="ml-4">{'}'}</p>
              <p className="ml-4 mt-2 text-ink-secondary">
                rto_target_seconds = <span className="text-primary">30</span>
              </p>
              <p>{'}'}</p>
            </div>
          </Card>
        </Container>
      </section>

      {/* What teams do today */}
      <section className="py-20 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              The status quo
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-2">
              How teams handle multi-cloud resilience today, and what breaks.
            </h2>
            <p className="text-ink-secondary text-sm max-w-xl">
              Multi-cloud resilience is a spreadsheet problem dressed up as an architecture problem.
              Teams have the infrastructure; they lack the control plane.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                tool: 'Runbook-based failover',
                workaround: 'A 40-step runbook lives in Confluence. Three senior engineers need to be awake and coordinating to execute it correctly.',
                failure: 'RTO of 40+ minutes on a good day. Runbooks go stale. Last DR drill was 6 months ago and it didn\'t finish.',
              },
              {
                tool: 'DNS TTL tricks',
                workaround: 'Set low TTLs on DNS records "just in case." Update Route 53 or Cloud DNS manually when a region goes down.',
                failure: 'DNS propagation still takes 30–60 seconds globally. No awareness of partial failures or latency degradation. Binary on/off only.',
              },
              {
                tool: 'Cloud-native health checks',
                workaround: 'Use AWS Route 53 health checks or GCP Traffic Director to detect unhealthy endpoints and reroute.',
                failure: 'Each cloud has different detection latency and routing semantics. No cross-cloud view. No policy as code; config drift is constant.',
              },
            ].map((item, i) => (
              <Card
                key={item.tool}
                padding="none"
                className="p-7"
                data-reveal
                data-reveal-delay={String(i)}
              >
                <p className="font-mono text-xs text-primary mb-3 uppercase tracking-wider">
                  {item.tool}
                </p>
                <p className="text-sm text-ink-secondary mb-4 leading-relaxed">{item.workaround}</p>
                <div className="border-t border-line pt-4">
                  <p className="text-[11px] font-mono text-red-400/80 uppercase tracking-wider mb-1">
                    Failure mode
                  </p>
                  <p className="text-xs text-ink-tertiary leading-relaxed">{item.failure}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison */}
      <section className="py-20 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              How we compare
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-2">
              DeployTitan vs. the alternatives.
            </h2>
          </div>
          <div className="overflow-x-auto" data-reveal>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left py-3 pr-6 text-xs font-mono uppercase tracking-wider text-ink-tertiary w-1/4">
                    Capability
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-mono uppercase tracking-wider text-primary">
                    DeployTitan
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-mono uppercase tracking-wider text-ink-tertiary">
                    Cloud-native (per-cloud)
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-mono uppercase tracking-wider text-ink-tertiary">
                    Runbook + manual
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Automatic cross-cloud failover', '✓', '~ (per-cloud only)', '✗'],
                  ['Failure detection time', '< 10s', '30–120s', '5–15 min (human)'],
                  ['Policy as code (HCL)', '✓', '✗ (console config)', '✗'],
                  ['DR drill mode (no real traffic impact)', '✓', '✗', '✗ (real risk)'],
                  ['Single audit log across all clouds', '✓', '✗ (siloed)', '✗'],
                ].map(([cap, dt, cloud, manual]) => (
                  <tr key={String(cap)} className="border-b border-line/50">
                    <td className="py-3 pr-6 text-xs text-ink-secondary">{cap}</td>
                    <td className="py-3 px-4 text-center text-xs text-signal-success font-mono">{dt}</td>
                    <td className="py-3 px-4 text-center text-xs text-ink-tertiary font-mono">{cloud}</td>
                    <td className="py-3 px-4 text-center text-xs text-ink-tertiary font-mono">{manual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <Container width="4xl" padding="default">
          <div className="text-center" data-reveal>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-4">
              Simulate a regional failover in your environment, live.
            </h2>
            <p className="text-ink-secondary text-sm mb-8 max-w-lg mx-auto">
              We'll walk through a DR drill in Titan Shield against your actual cloud topology, with no
              real traffic impacted, and show you the RTO you'd get in a real incident.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://cal.com/deploytitan/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-surface px-6 py-3 text-sm font-medium dark:text-surface transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
                style={{ borderRadius: '2px' }}
              >
                Book a 20-min walkthrough
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href={`${APP_URL}/signup`}
                className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                Start free trial →
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
