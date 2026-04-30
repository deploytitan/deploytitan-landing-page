import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { MidCTA } from '../components/MidCTA'

export default function Brand() {
  useDocumentMeta('Brand', 'DeployTitan brand guidelines — logos, colors, typography, and usage rules.')

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <section className="border-b border-line blueprint-grid">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-ink-quaternary uppercase tracking-widest">Brand</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display font-medium tracking-tight text-ink leading-[1.1]">
              Brand guidelines.
            </h1>
            <p className="mt-5 text-lg text-ink-secondary leading-relaxed max-w-lg">
              How to use the DeployTitan name, logos, and visual language correctly. When in doubt, email us.
            </p>
          </div>
        </div>
      </section>

      {/* Logo */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14">
        <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">Logo</span>
        <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-tight">The wordmark</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sharp-card bg-surface-alt p-10 flex items-center justify-center">
            <span className="font-display text-3xl font-medium tracking-[-0.02em]">
              Deploy<span className="text-primary-dark">Titan</span>
            </span>
          </div>
          <div className="sharp-card bg-ink p-10 flex items-center justify-center">
            <span className="font-display text-3xl font-medium tracking-[-0.02em] text-surface">
              Deploy<span className="text-primary">Titan</span>
            </span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Do', items: ['Use the wordmark at legible sizes (min 16px)', 'Use on white, near-white, or dark backgrounds', 'Maintain the "Deploy" / "Titan" two-tone treatment'] },
            { label: "Don't", items: ['Modify, stretch, or recolor the logo', 'Place on busy photographic backgrounds', 'Use unofficial variations or recreations'] },
          ].map((section) => (
            <div key={section.label} className="sharp-card bg-surface p-6">
              <h3 className="text-sm font-medium text-ink mb-3">{section.label}</h3>
              <ul className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <li key={item} className="text-xs text-ink-secondary flex items-start gap-2">
                    <span className={section.label === 'Do' ? 'text-emerald-500 mt-0.5' : 'text-red-500 mt-0.5'}>
                      {section.label === 'Do' ? '✓' : '✗'}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Colours */}
      <section className="border-t border-line bg-surface-alt">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14">
          <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">Colours</span>
          <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-tight">Brand palette</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Ink', hex: '#080503', swatch: 'bg-[#080503]', light: true },
              { name: 'Surface', hex: '#FAFAF8', swatch: 'bg-[#FAFAF8] border border-line', light: false },
              { name: 'Gold', hex: '#C9A84C', swatch: 'bg-[#C9A84C]', light: true },
              { name: 'Primary', hex: '#B87333', swatch: 'bg-[#B87333]', light: true },
            ].map((c) => (
              <div key={c.name}>
                <div className={`h-16 ${c.swatch}`} style={{ borderRadius: '2px' }} />
                <p className="mt-2 text-xs font-medium text-ink">{c.name}</p>
                <p className="font-mono text-[10px] text-ink-quaternary">{c.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="border-t border-line">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14">
          <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">Typography</span>
          <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-tight">Type system</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { role: 'Display', family: 'Inter Display', sample: 'Deploy faster.', className: 'font-display text-2xl font-medium' },
              { role: 'Body', family: 'Inter', sample: 'The deployment control plane for modern engineering teams.', className: 'text-base text-ink-secondary' },
              { role: 'Mono', family: 'JetBrains Mono', sample: 'dt deploy --env production', className: 'font-mono text-sm' },
            ].map((t) => (
              <div key={t.role} className="sharp-card bg-surface-alt p-6">
                <p className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest mb-3">{t.role} — {t.family}</p>
                <p className={t.className}>{t.sample}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MidCTA
        heading="Need brand assets?"
        subheading="Email our team and we'll send over the full press kit."
        primaryLabel="Contact press team"
        primaryHref="mailto:press@deploytitan.com"
        secondaryLabel="View press page"
        secondaryHref="/press"
        secondaryExternal={false}
      />
    </div>
  )
}
