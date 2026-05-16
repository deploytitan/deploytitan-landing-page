'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Nav } from '@/components/nav/Nav'
import { Footer } from '@/components/Footer'
import { AnnouncementBar } from '@/components/AnnouncementBar'
import { MidCTA } from '@/components/MidCTA'
import { Analytics } from '@vercel/analytics/next'

export function SiteLayoutClient({ children }: { children: React.ReactNode }) {
  const [barDismissed, setBarDismissed] = useState(false)
  const announcementRef = useRef<HTMLDivElement>(null)
  const [barHeight, setBarHeight] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    setBarHeight(announcementRef.current?.offsetHeight || 0)
  }, [announcementRef, barDismissed])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // The /studio route has its own layout — render children bare
  if (pathname.startsWith('/studio')) {
    return <>{children}</>
  }

  return (
    <div className="overflow-x-hidden">
      <Analytics />
      {/* Skip-to-main link: visible on focus, hidden otherwise */}
      <a
        href="#main-content"
        className="focus:bg-ink focus:text-surface sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-[2px] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg"
      >
        Skip to main content
      </a>
      <AnnouncementBar announcementRef={announcementRef} onDismiss={() => setBarDismissed(true)} />
      <Nav barHeight={barHeight} />
      {/* Push page content below the fixed nav (bar + nav ~56px) */}
      <main id="main-content" style={{ paddingTop: barHeight + 0 }}>
        {children}
      </main>
      {pathname !== '/' && <MidCTA variant="waitlist" />}
      <Footer />
    </div>
  )
}
