import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils'

type CardVariant = 'default' | 'spotlight' | 'corner' | 'plain'
type CardPadding = 'none' | 'sm' | 'md' | 'lg'
type CardTone = 'default' | 'muted'

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  variant?: CardVariant
  padding?: CardPadding
  tone?: CardTone
  interactive?: boolean
  /** data-reveal delay in ms for scroll animations */
  reveal?: number | boolean
  children: ReactNode
  href?: string
}

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
}

const toneClasses: Record<CardTone, string> = {
  default: 'bg-surface',
  muted: 'bg-surface-alt',
}

const variantClasses: Record<CardVariant, string> = {
  default: 'sharp-card',
  spotlight: 'sharp-card spotlight-card',
  corner: 'sharp-card corner-accent',
  plain: '',
}

const interactiveClasses = 'hover:border-primary/30 transition-all cursor-pointer'

export function Card({
  as,
  variant = 'default',
  padding = 'lg',
  tone = 'default',
  interactive = false,
  reveal,
  className,
  children,
  href,
  ...props
}: CardProps) {
  // Determine tag: if href is provided and no explicit `as`, use `a`
  const Tag: ElementType = as ?? (href ? 'a' : 'div')

  const dataReveal = reveal === true ? {} : reveal ? { 'data-reveal': reveal } : {}
  const hrefProp = href ? { href } : {}

  return (
    <Tag
      className={cn(
        variantClasses[variant],
        paddingClasses[padding],
        toneClasses[tone],
        interactive && interactiveClasses,
        className,
      )}
      {...dataReveal}
      {...hrefProp}
      {...props}
    >
      {children}
    </Tag>
  )
}
