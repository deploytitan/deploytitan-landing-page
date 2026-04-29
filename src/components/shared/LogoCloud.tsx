// Customer logo cloud — grayscale placeholder logos
// Real logos can be dropped in via SVG or img tags

const logos = [
  { name: 'Acme Corp', abbr: 'AC' },
  { name: 'Vercel', abbr: 'VC' },
  { name: 'Stripe', abbr: 'ST' },
  { name: 'Linear', abbr: 'LN' },
  { name: 'Retool', abbr: 'RT' },
  { name: 'Planetscale', abbr: 'PS' },
  { name: 'Loom', abbr: 'LM' },
  { name: 'Pitch', abbr: 'PI' },
]

export function LogoCloud() {
  return (
    <section className="py-12 border-b border-line">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <p className="text-center text-xs font-mono text-ink-quaternary uppercase tracking-widest mb-8">
          Trusted by engineering teams shipping daily
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 opacity-30 hover:opacity-50 transition-opacity"
              title={logo.name}
            >
              {/* Placeholder: replace with actual <img src={logo.svg} /> */}
              <div
                className="w-7 h-7 rounded-sm flex items-center justify-center bg-ink/10 border border-ink/10"
              >
                <span className="font-mono text-[9px] font-bold text-ink/60">{logo.abbr}</span>
              </div>
              <span className="font-display text-sm font-medium text-ink tracking-tight">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
