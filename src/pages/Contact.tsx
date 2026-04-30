import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { MidCTA } from '../components/MidCTA'

const contactOptions = [
  {
    label: 'Sales',
    description: 'Talk to us about pricing, enterprise contracts, or custom integrations.',
    email: 'sales@deploytitan.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
  },
  {
    label: 'Support',
    description: 'Having trouble with an integration or deployment? We respond fast.',
    email: 'support@deploytitan.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    label: 'Press',
    description: 'Media inquiries, press kit requests, and analyst briefings.',
    email: 'press@deploytitan.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6z"/>
      </svg>
    ),
  },
  {
    label: 'General',
    description: 'Everything else — feedback, partnerships, ideas.',
    email: 'hello@deploytitan.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
]

export default function Contact() {
  useDocumentMeta('Contact', 'Get in touch with the DeployTitan team — sales, support, press, or general inquiries.')

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <section className="border-b border-line blueprint-grid">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-ink-quaternary uppercase tracking-widest">Contact</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display font-medium tracking-tight text-ink leading-[1.1]">
              Let's talk.
            </h1>
            <p className="mt-5 text-lg text-ink-secondary leading-relaxed max-w-lg">
              We're a small team and we read every email. Choose the right inbox below and we'll get back to you quickly.
            </p>
          </div>
        </div>
      </section>

      {/* Contact options */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactOptions.map((opt) => (
            <a
              key={opt.label}
              href={`mailto:${opt.email}`}
              className="sharp-card spotlight-card bg-surface-alt p-6 group block hover:border-primary/30 transition-all"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-line text-ink-tertiary group-hover:text-primary group-hover:border-primary/30 transition-all mb-4" style={{ borderRadius: '2px' }}>
                {opt.icon}
              </div>
              <h3 className="text-base font-medium text-ink group-hover:text-primary transition-colors">{opt.label}</h3>
              <p className="mt-1.5 text-sm text-ink-secondary leading-relaxed">{opt.description}</p>
              <p className="mt-3 font-mono text-xs text-ink-tertiary group-hover:text-primary transition-colors">{opt.email}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Office info */}
      <section className="border-t border-line bg-surface-alt">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">Headquarters</p>
              <p className="mt-2 text-sm text-ink">San Francisco, CA</p>
              <p className="text-sm text-ink-secondary">South of Market (SoMa)</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">Response time</p>
              <p className="mt-2 text-sm text-ink">Within 24 hours</p>
              <p className="text-sm text-ink-secondary">Monday – Friday (Pacific)</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">Urgent support</p>
              <p className="mt-2 text-sm text-ink">
                <a href="mailto:support@deploytitan.com" className="text-primary hover:text-primary-dark transition-colors">support@deploytitan.com</a>
              </p>
              <p className="text-sm text-ink-secondary">For active production incidents</p>
            </div>
          </div>
        </div>
      </section>

      <MidCTA
        heading="Ready to start deploying smarter?"
        subheading="Get early access and we'll onboard you personally."
        primaryLabel="Request early access"
        primaryHref="/early-access"
        secondaryLabel="Read the docs"
        secondaryHref="/docs"
        secondaryExternal={false}
      />
    </div>
  )
}
