'use client'

import { forwardRef, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '../shared/ThemeToggle'
import { Button } from '../shared/Button'
import { WAITLIST_URL } from '@/lib/env'
import { RoadmapBadge } from '../shared/RoadmapBadge'

const productLinks = [
  {
    label: 'Titan Rollouts',
    sub: 'Multi-service release coordination',
    route: '/products/titan-rollout',
  },
  {
    label: 'Titan Foresight',
    sub: 'Blast radius and release risk insights',
    route: '/products/titan-foresight',
    preview: true,
  },
  {
    label: 'Titan Phoenix',
    sub: 'SLO-triggered autonomous rollback',
    route: '/products/titan-phoenix',
    preview: true,
  },
]

function AccordionGroup({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const contentId = useId()
  const buttonId = useId()

  return (
    <div className="border-line border-b">
      <button
        id={buttonId}
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen(!open)}
        className="text-ink flex w-full items-center justify-between px-6 py-4 text-base font-medium"
      >
        {label}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="text-ink-tertiary transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        id={contentId}
        ref={contentRef}
        role="region"
        aria-labelledby={buttonId}
        className="overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
        style={{
          maxHeight: open ? (contentRef.current?.scrollHeight ?? 600) : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <div className="pb-2">{children}</div>
      </div>
    </div>
  )
}

interface Props {
  onClose: () => void
  barHeight?: number
  id?: string
}

export const MobileNav = forwardRef<HTMLDivElement, Props>(function MobileNav(
  { onClose, barHeight = 0, id },
  ref,
) {
  const topOffset = barHeight + 80

  return (
    <div
      ref={ref}
      id={id}
      className="bg-surface mobile-nav-enter fixed right-0 bottom-0 left-0 z-40 flex flex-col overflow-y-auto"
      style={{ top: topOffset }}
    >
      <AccordionGroup label="Products">
        {productLinks.map((link) => (
          <Link
            key={link.route}
            href={link.route}
            onClick={onClose}
            className="hover:bg-surface-alt flex items-center gap-2 px-8 py-3 transition-colors"
          >
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="text-ink text-sm font-medium">{link.label}</span>
              <span className="text-ink-tertiary text-xs">{link.sub}</span>
            </div>
            {link.preview && <RoadmapBadge variant="roadmap" />}
          </Link>
        ))}
      </AccordionGroup>

      {[
        { label: 'Blog', route: '/blog' },
        { label: 'My Journey', route: '/journey' },
        { label: 'About', route: '/about' },
        { label: 'Contact', route: '/contact' },
      ].map((link) => (
        <Link
          key={link.route}
          href={link.route}
          onClick={onClose}
          className="text-ink border-line hover:bg-surface-alt block border-b px-6 py-4 text-base font-medium transition-colors"
        >
          {link.label}
        </Link>
      ))}

      <div className="border-line mt-auto flex flex-col gap-3 border-t px-6 py-8 md:mb-[unset]">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-ink-tertiary font-mono text-[10px] tracking-widest uppercase">
            Appearance
          </span>
          <ThemeToggle />
        </div>
        <Button
          as="a"
          href={WAITLIST_URL}
          variant="primary"
          size="sm"
          block
          onClick={onClose}
        >
          Join waitlist
        </Button>
      </div>
    </div>
  )
})
