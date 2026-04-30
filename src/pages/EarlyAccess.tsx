import { useState } from 'react'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useScrollReveal } from '../utils'

const PARTNER_BENEFITS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'White-glove onboarding',
    body: 'A dedicated DeployTitan engineer helps you instrument your first service, tune your SLO thresholds, and run your first DR drill.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Direct roadmap influence',
    body: 'Monthly calls with our product and engineering team. Your use cases shape what we build next.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Locked-in early-access pricing',
    body: 'Design partners lock in their pricing tier permanently, regardless of future price changes.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: 'Priority support',
    body: 'Direct Slack channel with our engineering team. P1 issues get a response within 15 minutes.',
  },
]

const WHAT_WE_ASK = [
  'Two 30-minute calls per month with our product team',
  'Honest feedback on what works and what doesn\'t',
  'Permission to reference your company name (logo, not case study until you\'re ready)',
  'Optional: a written case study 90 days post-launch',
]

const IDEAL_PROFILE = [
  '5+ services in production',
  'Shipping at least daily',
  'Running on Kubernetes, ECS, Cloud Run, or Lambda',
  'Have experienced a deploy-related incident in the last 6 months',
  'An engineering team that cares deeply about reliability',
]

interface FormState {
  name: string
  email: string
  company: string
  role: string
  infra: string
  deployFrequency: string
  worstIncident: string
  submitted: boolean
}

export default function EarlyAccess() {
  useDocumentMeta(
    'Early Access — DeployTitan',
    'Join the DeployTitan design partner program. White-glove onboarding, roadmap influence, and locked-in pricing.'
  )
  useScrollReveal()

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    role: '',
    infra: '',
    deployFrequency: '',
    worstIncident: '',
    submitted: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production: POST to API. For now, show success state.
    setForm((f) => ({ ...f, submitted: true }))
  }

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <div className="max-w-4xl mx-auto px-6 text-center" data-reveal>
          <div className="inline-flex items-center gap-2 font-mono text-[10px] text-primary border border-primary/30 px-3 py-1.5 mb-6" style={{ borderRadius: '2px' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-signal-success animate-pulse" />
            Limited availability — accepting applications now
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            Become a DeployTitan<br className="hidden md:block" /> design partner.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mx-auto">
            We're working closely with a small cohort of engineering teams to shape the product. You get white-glove onboarding, direct access to our team, and locked-in pricing — forever.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 border-b border-line">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">What you get</p>
            <h2 className="text-2xl font-semibold text-ink">More than just early access.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PARTNER_BENEFITS.map((b, i) => (
              <div
                key={b.title}
                className="sharp-card border border-line p-6 flex gap-4 hover:border-primary/20 transition-all"
                data-reveal
                data-reveal-delay={String(i % 2)}
              >
                <div className="text-primary shrink-0 mt-0.5">{b.icon}</div>
                <div>
                  <h3 className="text-sm font-semibold text-ink mb-1">{b.title}</h3>
                  <p className="text-xs text-ink-secondary leading-relaxed">{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we ask + ideal profile */}
      <section className="py-20 border-b border-line bg-surface-alt/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" data-reveal>
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">What we ask</p>
              <h2 className="text-xl font-semibold text-ink mb-5">We keep commitments light.</h2>
              <ul className="flex flex-col gap-3">
                {WHAT_WE_ASK.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-sm text-ink-secondary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">Ideal fit</p>
              <h2 className="text-xl font-semibold text-ink mb-5">Who this is for.</h2>
              <ul className="flex flex-col gap-3">
                {IDEAL_PROFILE.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-ink-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-24 border-b border-line">
        <div className="max-w-2xl mx-auto px-6">
          {form.submitted ? (
            <div className="text-center py-16" data-reveal>
              <div className="w-14 h-14 border border-signal-success/30 bg-signal-success/5 flex items-center justify-center mx-auto mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-signal-success"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 className="text-2xl font-semibold text-ink mb-3">Application received.</h2>
              <p className="text-ink-secondary text-sm leading-relaxed max-w-md mx-auto">
                We review every application personally. You'll hear back from us within 2 business days. In the meantime, check out the <a href="/docs" className="text-primary hover:text-primary-dark">documentation</a> or explore the <a href="/products/titan-rollout" className="text-primary hover:text-primary-dark">product pages</a>.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10" data-reveal>
                <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">Apply</p>
                <h2 className="text-2xl font-semibold text-ink mb-2">Apply for the design partner program.</h2>
                <p className="text-sm text-ink-secondary">We review every application personally. Tell us about your stack and biggest deploy pain.</p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" data-reveal>
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-ink-secondary uppercase tracking-wider">Your name <span className="text-signal-danger">*</span></label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="border border-line px-3 py-2.5 text-sm text-ink bg-surface focus:border-primary/50 focus:outline-none transition-colors"
                      style={{ borderRadius: '2px' }}
                      placeholder="Alex Chen"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-ink-secondary uppercase tracking-wider">Work email <span className="text-signal-danger">*</span></label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="border border-line px-3 py-2.5 text-sm text-ink bg-surface focus:border-primary/50 focus:outline-none transition-colors"
                      style={{ borderRadius: '2px' }}
                      placeholder="alex@company.com"
                    />
                  </div>
                </div>

                {/* Company + Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-ink-secondary uppercase tracking-wider">Company <span className="text-signal-danger">*</span></label>
                    <input
                      required
                      type="text"
                      value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                      className="border border-line px-3 py-2.5 text-sm text-ink bg-surface focus:border-primary/50 focus:outline-none transition-colors"
                      style={{ borderRadius: '2px' }}
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-ink-secondary uppercase tracking-wider">Your role <span className="text-signal-danger">*</span></label>
                    <select
                      required
                      value={form.role}
                      onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                      className="border border-line px-3 py-2.5 text-sm text-ink bg-surface focus:border-primary/50 focus:outline-none transition-colors appearance-none"
                      style={{ borderRadius: '2px' }}
                    >
                      <option value="">Select a role…</option>
                      <option value="sre">SRE</option>
                      <option value="platform-eng">Platform Engineering</option>
                      <option value="devops">DevOps / Platform Ops</option>
                      <option value="cto">CTO / VP Engineering</option>
                      <option value="software-eng">Software Engineer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Infra */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-ink-secondary uppercase tracking-wider">Primary infrastructure <span className="text-signal-danger">*</span></label>
                  <select
                    required
                    value={form.infra}
                    onChange={e => setForm(f => ({ ...f, infra: e.target.value }))}
                    className="border border-line px-3 py-2.5 text-sm text-ink bg-surface focus:border-primary/50 focus:outline-none transition-colors appearance-none"
                    style={{ borderRadius: '2px' }}
                  >
                    <option value="">Select your stack…</option>
                    <option value="k8s">Kubernetes (self-managed)</option>
                    <option value="eks">AWS EKS</option>
                    <option value="gke">Google GKE</option>
                    <option value="aks">Azure AKS</option>
                    <option value="cloud-run">GCP Cloud Run</option>
                    <option value="ecs">AWS ECS</option>
                    <option value="lambda">AWS Lambda</option>
                    <option value="mixed">Multi-cloud / mixed</option>
                  </select>
                </div>

                {/* Deploy frequency */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-ink-secondary uppercase tracking-wider">Deploy frequency</label>
                  <select
                    value={form.deployFrequency}
                    onChange={e => setForm(f => ({ ...f, deployFrequency: e.target.value }))}
                    className="border border-line px-3 py-2.5 text-sm text-ink bg-surface focus:border-primary/50 focus:outline-none transition-colors appearance-none"
                    style={{ borderRadius: '2px' }}
                  >
                    <option value="">How often do you deploy?</option>
                    <option value="multiple-daily">Multiple times per day</option>
                    <option value="daily">Once per day</option>
                    <option value="weekly">A few times per week</option>
                    <option value="bi-weekly">Bi-weekly or less</option>
                  </select>
                </div>

                {/* Worst incident */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-ink-secondary uppercase tracking-wider">Biggest deploy pain right now</label>
                  <textarea
                    rows={4}
                    value={form.worstIncident}
                    onChange={e => setForm(f => ({ ...f, worstIncident: e.target.value }))}
                    className="border border-line px-3 py-2.5 text-sm text-ink bg-surface focus:border-primary/50 focus:outline-none transition-colors resize-none"
                    style={{ borderRadius: '2px' }}
                    placeholder="Describe your worst recent deploy incident or the deploy problem that keeps you up at night…"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-ink text-surface px-6 py-3 text-sm font-medium transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
                  style={{ borderRadius: '2px' }}
                >
                  Submit application
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
                <p className="text-xs text-ink-quaternary">We review every application personally. You'll hear back within 2 business days.</p>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  )
}
