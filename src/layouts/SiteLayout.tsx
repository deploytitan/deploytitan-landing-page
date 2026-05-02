import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Nav } from '../components/nav/Nav'
import { Footer } from '../components/Footer'
import { AnnouncementBar } from '../components/AnnouncementBar'
import { ScrollToTop } from '../components/ScrollToTop'

export function SiteLayout() {
  const [barDismissed, setBarDismissed] = useState(false)
  const announcementRef = useRef<HTMLDivElement>(null)
  const [barHeight, setBarHeight] = useState(0)
  useEffect(() => {
    setBarHeight(announcementRef.current?.offsetHeight || 0)
  }, [announcementRef, barDismissed])

  return (
    <div className="overflow-x-hidden">
      <ScrollToTop />
      <AnnouncementBar announcementRef={announcementRef} onDismiss={() => setBarDismissed(true)} />
      <Nav barHeight={barHeight} />
      {/* Push page content below the fixed nav (bar + nav ~56px) */}
      <main style={{ paddingTop: barHeight + 56 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
