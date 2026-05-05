import { Metadata } from 'next'
import HowItWorks from '@/page-components/HowItWorks'

export const metadata: Metadata = {
  title: 'How It Works | DeployTitan',
  description: 'How DeployTitan progressive delivery works end to end.',
}

export default function Page() {
  return <HowItWorks />
}
