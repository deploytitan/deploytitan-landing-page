import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'
import { BrandLogo } from '../components/shared/BrandLogo'

export default function Brand() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <Section border="bottom" padding="none" className="blueprint-grid">
        <Container className="py-16 lg:py-20">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-ink-tertiary uppercase tracking-widest">
              Brand
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display font-medium tracking-tight text-ink leading-[1.1]">
              Brand guidelines.
            </h1>
            <p className="mt-5 text-lg text-ink-secondary leading-relaxed max-w-lg">
              How to use the DeployTitan name, logos, and visual language correctly. When in doubt,
              email us.
            </p>
          </div>
        </Container>
      </Section>

      {/* Logo */}
      <Container as="section" className="py-14">
        <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">
          Logo
        </span>
        <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-[-0.02em]">
          The wordmark
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card tone="muted" padding="none" className="p-10 flex items-center justify-center">
            <BrandLogo variant="light-mode" className="h-10 w-auto" />
          </Card>
          <Card padding="none" className="bg-ink p-10 flex items-center justify-center">
            <BrandLogo variant="dark-mode" className="h-10 w-auto" />
          </Card>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              label: 'Do',
              items: [
                'Use the wordmark at legible sizes (min 16px)',
                'Use on white, near-white, or dark backgrounds',
                'Maintain the "Deploy" / "Titan" two-tone treatment',
              ],
            },
            {
              label: "Don't",
              items: [
                'Modify, stretch, or recolor the logo',
                'Place on busy photographic backgrounds',
                'Use unofficial variations or recreations',
              ],
            },
          ].map((section) => (
            <Card key={section.label}>
              <h3 className="text-sm font-medium text-ink mb-3">{section.label}</h3>
              <ul className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <li key={item} className="text-xs text-ink-secondary flex items-start gap-2">
                    <span
                      className={
                        section.label === 'Do' ? 'text-emerald-500 mt-0.5' : 'text-red-500 mt-0.5'
                      }
                    >
                      {section.label === 'Do' ? '✓' : '✗'}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>

      {/* Colours */}
      <Section border="top" tone="muted" padding="none">
        <Container className="py-14">
          <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">
            Colours
          </span>
          <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-[-0.02em]">
            Brand palette
          </h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Ink', hex: '#080503', swatch: 'bg-[#080503]', light: true },
              {
                name: 'Surface',
                hex: '#FAFAF8',
                swatch: 'bg-[#FAFAF8] border border-line',
                light: false,
              },
              { name: 'Gold', hex: '#C9A84C', swatch: 'bg-[#C9A84C]', light: true },
              { name: 'Primary', hex: '#B87333', swatch: 'bg-[#B87333]', light: true },
            ].map((c) => (
              <div key={c.name}>
                <div className={`h-16 ${c.swatch}`} style={{ borderRadius: '2px' }} />
                <p className="mt-2 text-xs font-medium text-ink">{c.name}</p>
                <p className="font-mono text-[10px] text-ink-tertiary">{c.hex}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Typography */}
      <Section border="top" padding="none">
        <Container className="py-14">
          <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">
            Typography
          </span>
          <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-[-0.02em]">
            Type system
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                role: 'Display',
                family: 'Inter Display',
                sample: 'Deploy faster.',
                className: 'font-display text-2xl font-medium',
              },
              {
                role: 'Body',
                family: 'Instrument Sans',
                sample: 'The deployment control plane for modern engineering teams.',
                className: 'text-base text-ink-secondary',
              },
              {
                role: 'Mono',
                family: 'JetBrains Mono',
                sample: 'dt deploy --env production',
                className: 'font-mono text-sm',
              },
            ].map((t) => (
              <Card key={t.role} tone="muted">
                <p className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest mb-3">
                  {t.role} — {t.family}
                </p>
                <p className={t.className}>{t.sample}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      
    </div>
  )
}
