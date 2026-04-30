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
import TitanPulse from './pages/products/TitanPulse'
import ProgressiveDelivery from './pages/solutions/ProgressiveDelivery'
import MultiCloudResilience from './pages/solutions/MultiCloudResilience'
import RiskIntelligence from './pages/solutions/RiskIntelligence'
import PlatformEngineering from './pages/solutions/PlatformEngineering'
import HowItWorks from './pages/HowItWorks'
import Security from './pages/Security'
import EarlyAccess from './pages/EarlyAccess'
import ForSRE from './pages/for/ForSRE'
import ForDevOps from './pages/for/ForDevOps'
import ForCTO from './pages/for/ForCTO'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Status from './pages/Status'
import CLI from './pages/CLI'
import API from './pages/API'
import Roadmap from './pages/Roadmap'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Press from './pages/Press'
import Brand from './pages/Brand'
import Partners from './pages/Partners'
import Sitemap from './pages/Sitemap'
import Integrations from './pages/Integrations'
import IntegrationDetail from './pages/integrations/IntegrationDetail'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/solutions/progressive-delivery" element={<ProgressiveDelivery />} />
        <Route path="/solutions/multi-cloud-resilience" element={<MultiCloudResilience />} />
        <Route path="/solutions/risk-intelligence" element={<RiskIntelligence />} />
        <Route path="/solutions/platform-engineering" element={<PlatformEngineering />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/about" element={<About />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/security" element={<Security />} />
        <Route path="/early-access" element={<EarlyAccess />} />
        <Route path="/for/sre" element={<ForSRE />} />
        <Route path="/for/devops" element={<ForDevOps />} />
        <Route path="/for/cto" element={<ForCTO />} />
        <Route path="/products/titan-rollout" element={<TitanRollout />} />
        <Route path="/products/titan-shield" element={<TitanShield />} />
        <Route path="/products/titan-sentinel" element={<TitanSentinel />} />
        <Route path="/products/titan-pulse" element={<TitanPulse />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/status" element={<Status />} />
        <Route path="/cli" element={<CLI />} />
        <Route path="/api" element={<API />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/press" element={<Press />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/integrations/:slug" element={<IntegrationDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
