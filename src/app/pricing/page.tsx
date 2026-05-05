import { Metadata } from 'next'
import Pricing from '@/page-components/Pricing'

export const metadata: Metadata = {
  title: 'Pricing | DeployTitan',
  description: 'Simple, transparent pricing for teams of every size.',
}

export default function Page() {
  return <Pricing />
}
