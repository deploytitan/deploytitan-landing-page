interface RoadmapBadgeProps {
  variant: 'available' | 'preview' | 'roadmap'
  className?: string
}

const CONFIG = {
  available: {
    label: 'Available now',
    dot: 'bg-signal-success',
    classes: 'border-signal-success/30 text-signal-success/80 bg-signal-success/5',
  },
  preview: {
    label: 'Design partner preview',
    dot: 'bg-primary',
    classes: 'border-primary/30 text-primary-accessible bg-primary/5',
  },
  roadmap: {
    label: 'Coming soon',
    dot: 'bg-ink-quaternary',
    classes: 'border-line text-ink-tertiary bg-surface-alt',
  },
}

export function RoadmapBadge({ variant, className = '' }: RoadmapBadgeProps) {
  const c = CONFIG[variant]
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase border px-2 py-1 ${c.classes} ${className}`}
      style={{ borderRadius: '2px' }}
    >
      <span className={`w-1.5 h-1.5 shrink-0 ${c.dot}`} style={{ borderRadius: '1px' }} />
      {c.label}
    </span>
  )
}
