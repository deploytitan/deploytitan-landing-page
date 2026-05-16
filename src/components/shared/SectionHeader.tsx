interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  subheading?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({ eyebrow, heading, subheading, align = 'center', className = '' }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {eyebrow && (
        <span className="font-mono text-xs text-primary-accessible uppercase tracking-widest">{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-medium tracking-[-0.02em] text-ink leading-tight max-w-2xl">
        {heading}
      </h2>
      {subheading && (
        <p className="text-base text-ink-secondary leading-relaxed max-w-xl">{subheading}</p>
      )}
    </div>
  )
}
