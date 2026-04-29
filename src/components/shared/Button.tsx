import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils'

type BaseProps = {
  variant?: 'primary' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
}

type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; href?: never }
type ButtonAsAnchor = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const sizeClasses = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-sm',
}

const variantClasses = {
  primary: 'bg-ink text-surface font-medium hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)] active:scale-[0.97] transition-all',
  ghost: 'bg-transparent text-ink-secondary border border-line hover:text-ink hover:border-primary/30 transition-colors',
  link: 'bg-transparent text-ink-secondary hover:text-ink transition-colors underline-offset-4 hover:underline px-0 py-0',
}

export function Button({ variant = 'primary', size = 'md', as, className, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center gap-2 font-medium leading-none select-none',
    variant !== 'link' && 'rounded-sm',
    sizeClasses[size],
    variantClasses[variant],
    className,
  )

  if (as === 'a') {
    const { href, ...rest } = props as ButtonAsAnchor
    return <a href={href} className={classes} {...rest} />
  }

  return <button className={classes} style={{ borderRadius: '2px' }} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />
}
