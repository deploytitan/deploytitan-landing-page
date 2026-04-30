import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Nav } from '../components/nav/Nav'
import { Footer } from '../components/Footer'
import { AnnouncementBar, ANNOUNCEMENT_BAR_HEIGHT } from '../components/AnnouncementBar'
import { ScrollToTop } from '../components/ScrollToTop'

export function SiteLayout() {
  const [barDismissed, setBarDismissed] = useState(false)
  const barHeight = barDismissed ? 0 : ANNOUNCEMENT_BAR_HEIGHT

  return (
    <div className="overflow-x-hidden">
      <ScrollToTop />
      <AnnouncementBar onDismiss={() => setBarDismissed(true)} />
      <Nav barHeight={barHeight} />
      {/* Push page content below the fixed nav (bar + nav ~56px) */}
      <main style={{ paddingTop: barHeight + 56 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
