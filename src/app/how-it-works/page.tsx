import { Metadata } from 'next'
import HowItWorks from '@/page-components/HowItWorks'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'How DeployTitan helps AI-adopting engineering teams understand throughput bottlenecks, move faster, and ship safer.',
}

export default function Page() {
  return <HowItWorks />
}
