'use client'

import { useTheme, type ThemeMode } from '../../hooks/useTheme'
import { cn } from '../../utils'

const segments: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
  {
    mode: 'light',
    label: 'Light',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
  },
  {
    mode: 'system',
    label: 'System',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    mode: 'dark',
    label: 'Dark',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    ),
  },
]

interface Props {
  className?: string
}

export function ThemeToggle({ className }: Props) {
  const { mode, setMode } = useTheme()

  return (
    <div
      className={cn(
        'flex items-center gap-1 border border-line bg-surface-alt p-1',
        className,
      )}
      style={{ borderRadius: 'var(--radius-pill)' }}
      role="radiogroup"
      aria-label="Theme"
    >
      {segments.map((seg) => {
        const active = mode === seg.mode
        return (
          <button
            key={seg.mode}
            role="radio"
            aria-checked={active}
            onClick={() => setMode(seg.mode)}
            aria-label={seg.label}
            title={seg.label}
            className={cn(
              'flex items-center justify-center transition-all duration-200',
              'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none',
              active
                ? 'bg-surface text-primary border-primary/20 h-11 w-11 border shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                : 'text-ink-secondary hover:text-ink h-11 w-11 lg:h-8 lg:w-8',
            )}
            style={{ borderRadius: 'var(--radius-pill)' }}
          >
            {seg.icon}
          </button>
        )
      })}
    </div>
  )
}
