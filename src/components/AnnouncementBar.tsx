'use client'

import React, { useState } from 'react'

interface AnnouncementBarProps {
  message?: string
  linkLabel?: string
  linkTo?: string
  onDismiss?: () => void
  announcementRef?: React.RefObject<HTMLDivElement | null>
}

export function AnnouncementBar({
  message = 'Titan Foresight is now in public beta — shift-left risk scoring for every PR.',
  linkLabel = 'Learn more →',
  linkTo = '/products/titan-foresight',
  onDismiss,
  announcementRef,
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <div
      ref={announcementRef}
      className="fixed flex flex-col md:flex-row top-0 left-0 right-0 z-[60] bg-ink text-surface text-xs font-medium min-h-9 items-center justify-center py-2 px-4 md:gap-3"
    >
      <span className="sm:inline text-surface/70 max-w-90 lg:max-w-[unset]">{message}</span>
      <a href={linkTo} className="text-primary hover:text-primary-light transition-colors shrink-0">
        {linkLabel}
      </a>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-4 text-surface/50 hover:text-surface/80 transition-colors"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  )
}
