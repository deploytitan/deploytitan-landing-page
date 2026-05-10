'use client'

import { cn } from '../../utils'

interface InlineCodeProps {
  children: React.ReactNode
  /** "default" uses bg-ink/[0.05] (prose context); "accent" uses bg-primary-muted (callout/CTA context) */
  variant?: 'default' | 'accent'
  className?: string
}

/**
 * Standardized inline code element. Replaces ad-hoc `<code>` spans across the codebase.
 *
 * Usage:
 *   <InlineCode>dt deploy</InlineCode>
 *   <InlineCode variant="accent">Authorization: Bearer</InlineCode>
 */
export function InlineCode({ children, variant = 'default', className }: InlineCodeProps) {
  return (
    <code
      className={cn(
        'font-mono text-[0.8125em] leading-none',
        variant === 'accent'
          ? 'text-primary bg-primary/[0.08] px-1.5 py-0.5'
          : 'text-ink/80 bg-ink/[0.05] px-1.5 py-0.5',
        className,
      )}
      style={{ borderRadius: '1px' }}
    >
      {children}
    </code>
  )
}
