import { Metadata } from 'next'
import Roadmap from '@/page-components/Roadmap'

export const metadata: Metadata = {
  title: 'Roadmap | DeployTitan',
  description: "What's coming next for DeployTitan.",
}

export default function Page() {
  return <Roadmap />
}
