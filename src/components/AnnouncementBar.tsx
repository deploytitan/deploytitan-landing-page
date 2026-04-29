import { useState } from 'react'

interface AnnouncementBarProps {
  message?: string
  linkLabel?: string
  linkTo?: string
}

export function AnnouncementBar({
  message = 'Titan Sentinel is now in public beta — shift-left risk scoring for every PR.',
  linkLabel = 'Learn more →',
  linkTo = '/products/titan-sentinel',
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-ink text-surface text-xs font-medium h-9 flex items-center justify-center px-4 gap-3">
      <span className="hidden sm:inline text-surface/70">{message}</span>
      <a href={linkTo} className="text-primary hover:text-primary-light transition-colors shrink-0">{linkLabel}</a>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-4 text-surface/50 hover:text-surface/80 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  )
}

// When the AnnouncementBar is active, the nav needs to be pushed down 36px.
// Export the bar height for use in SiteLayout.
export const ANNOUNCEMENT_BAR_HEIGHT = 36
