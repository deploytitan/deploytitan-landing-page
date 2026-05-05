import { Metadata } from 'next'
import TitanRollout from '@/page-components/products/TitanRollout'

export const metadata: Metadata = {
  title: 'Titan Rollout | DeployTitan',
  description: 'Progressive delivery and canary releases powered by Titan Rollout.',
}

export default function Page() {
  return <TitanRollout />
}
