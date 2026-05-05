'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Nav } from '../components/nav/Nav'
import { Footer } from '../components/Footer'
import { AnnouncementBar } from '../components/AnnouncementBar'

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
      <AnnouncementBar announcementRef={announcementRef} onDismiss={() => setBarDismissed(true)} />
      <Nav barHeight={barHeight} />
      {/* Push page content below the fixed nav (bar + nav ~56px) */}
      <main style={{ paddingTop: barHeight + 56 }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
