import { Metadata } from 'next'
import Pricing from '@/page-components/Pricing'

export const metadata: Metadata = {
  title: 'Pricing | DeployTitan',
  description: 'DeployTitan pricing is based on release coordination complexity, not infrastructure consumption.',
}

export default function Page() {
  return <Pricing />
}
