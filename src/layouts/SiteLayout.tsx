import { Outlet } from 'react-router-dom'
import { Nav } from '../components/nav/Nav'
import { Footer } from '../components/Footer'
import { AnnouncementBar } from '../components/AnnouncementBar'

export function SiteLayout() {
  return (
    <div className="overflow-x-hidden">
      <AnnouncementBar />
      {/* Push nav below announcement bar */}
      <div style={{ paddingTop: '36px' }}>
        <Nav />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
