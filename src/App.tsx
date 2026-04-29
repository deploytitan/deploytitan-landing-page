import { Routes, Route } from 'react-router-dom'
import { SiteLayout } from './layouts/SiteLayout'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Customers from './pages/Customers'
import Blog from './pages/Blog'
import Changelog from './pages/Changelog'
import Docs from './pages/Docs'
import About from './pages/About'
import Journey from './pages/Journey'
import Solutions from './pages/Solutions'
import NotFound from './pages/NotFound'
import TitanRollout from './pages/products/TitanRollout'
import TitanShield from './pages/products/TitanShield'
import TitanSentinel from './pages/products/TitanSentinel'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/about" element={<About />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/products/titan-rollout" element={<TitanRollout />} />
        <Route path="/products/titan-shield" element={<TitanShield />} />
        <Route path="/products/titan-sentinel" element={<TitanSentinel />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
