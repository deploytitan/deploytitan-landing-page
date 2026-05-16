import { Metadata } from 'next'
import TitanRollout from '@/page-components/products/TitanRollout'

export const metadata: Metadata = {
  title: 'Titan Rollouts | DeployTitan',
  description: 'Release coordination and deployment safety for distributed engineering teams.',
}

export default function Page() {
  return <TitanRollout />
}
