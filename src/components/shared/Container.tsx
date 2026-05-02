import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils'

type ContainerWidth = '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'page'
type ContainerPadding = 'default' | 'wide'

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  width?: ContainerWidth
  padding?: ContainerPadding
  children: ReactNode
}

const widthClasses: Record<ContainerWidth, string> = {
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  page: 'max-w-[var(--max-width-page)]',
}

const paddingClasses: Record<ContainerPadding, string> = {
  default: 'px-6',
  wide: 'px-6 lg:px-12',
}

export function Container({
  as: Tag = 'div',
  width = 'page',
  padding = 'wide',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full', widthClasses[width], paddingClasses[padding], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
