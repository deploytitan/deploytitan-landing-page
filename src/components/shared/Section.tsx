import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils'

type SectionPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'
type SectionTone = 'default' | 'muted'
type SectionBorder = 'bottom' | 'top' | 'both' | 'none'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  padding?: SectionPadding
  tone?: SectionTone
  border?: SectionBorder
  children: ReactNode
}

const paddingClasses: Record<SectionPadding, string> = {
  none: '',
  sm: 'py-10',
  md: 'py-14',
  lg: 'py-16',
  xl: 'py-20 lg:py-24',
}

const toneClasses: Record<SectionTone, string> = {
  default: 'bg-surface',
  muted: 'bg-surface-alt',
}

const borderClasses: Record<SectionBorder, string> = {
  bottom: 'border-b border-line',
  top: 'border-t border-line',
  both: 'border-t border-b border-line',
  none: '',
}

export function Section({
  as: Tag = 'section',
  padding = 'lg',
  tone = 'default',
  border = 'none',
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(paddingClasses[padding], toneClasses[tone], borderClasses[border], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
