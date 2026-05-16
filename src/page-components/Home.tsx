import { Hero } from '../components/Hero'
import { PlatformOverview } from '../components/platform/PlatformOverview'
import { CTA } from '../components/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <PlatformOverview />
      <CTA />
    </>
  )
}
