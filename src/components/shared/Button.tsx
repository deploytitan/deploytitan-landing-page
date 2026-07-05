import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../utils'

// ---------------------------------------------------------------------------
// Variant + size maps
// ---------------------------------------------------------------------------

/**
 * Variants
 *
 * primary  — filled ink surface, gold ring on hover. Main CTAs.
 * outline  — bordered, transparent fill, gold tint hover. Secondary CTAs.
 * ghost    — no border or fill, text only. Tertiary actions.
 * icon     — no padding override; for icon-only or nav trigger buttons.
 * dismiss  — muted icon-only, used for close/dismiss actions.
 */
export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'icon' | 'dismiss'

/**
 * Sizes
 *
 * xs  — nav bar CTA, compact contexts
 * sm  — inline CTA bars, secondary actions
 * md  — default body-level buttons
 * lg  — hero and section-level primary actions
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

const SIZE: Record<ButtonSize, string> = {
  xs: 'px-5 py-2.5 text-sm',
  sm: 'px-5 py-3 text-sm',
  md: 'px-6 py-3.5 text-sm',
  lg: 'px-8 py-4 text-base',
}

const VARIANT: Record<ButtonVariant, string> = {
  primary: [
    'bg-ink text-surface',
    'hover:shadow-[0_0_0_1px_var(--color-primary-muted),0_2px_8px_rgba(0,0,0,0.08)]',
    'active:scale-[0.97]',
    'transition-all',
    'dark:text-surface',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  ].join(' '),

  outline: [
    'border border-ink/15 text-ink bg-transparent',
    'hover:border-primary/40 hover:bg-primary-muted',
    'active:scale-[0.97]',
    'transition-all',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  ].join(' '),

  ghost: [
    'text-ink-secondary bg-transparent',
    'hover:text-ink',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  ].join(' '),

  icon: [
    'text-ink-secondary bg-transparent',
    'hover:text-ink',
    'transition-colors',
    'inline-flex items-center gap-1',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  ].join(' '),

  dismiss: [
    'text-surface/50 bg-transparent',
    'hover:text-surface/80',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  ].join(' '),
}

// ---------------------------------------------------------------------------
// Polymorphic props
// ---------------------------------------------------------------------------

type BaseProps = {
  variant?: ButtonVariant
  /** Only applied to primary, outline, and ghost. Icon/dismiss ignore size. */
  size?: ButtonSize
  /** When true, button renders full-width. */
  block?: boolean
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; href?: never }

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    { variant = 'primary', size = 'md', block = false, as, className, ...props },
    ref,
  ) {
    const isSized = variant !== 'icon' && variant !== 'dismiss'

    const classes = cn(
      // Base
      'inline-flex items-center justify-center gap-2',
      'font-medium leading-none select-none',
      'rounded-lg',
      // Size (only for sized variants)
      isSized && SIZE[size],
      // Variant
      VARIANT[variant],
      // Block
      block && 'w-full',
      className,
    )

    if (as === 'a') {
      const { href, ...rest } = props as ButtonAsAnchor
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...rest}
        />
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    )
  },
)

Button.displayName = 'Button'
