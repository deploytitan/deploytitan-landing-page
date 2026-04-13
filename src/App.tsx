import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Problem } from './components/Problem'
import { StackGap } from './components/StackGap'
import { Capabilities } from './components/Capabilities'
import { WorkflowAnimation } from './components/WorkflowAnimation'
import { BuiltFor } from './components/BuiltFor'
import { Outcomes } from './components/Outcomes'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'
// import { ParticleBackground } from './components/ParticleBackground'

export default function App() {
  return (
    <div className="overflow-x-hidden">
      {/* <ParticleBackground /> */}
      <Nav />
      <Hero />
      <Problem />
      <StackGap />
      <Capabilities />
      <WorkflowAnimation />
      <BuiltFor />
      <Outcomes />
      <CTA />
      <Footer />
    </div>
  )
}
