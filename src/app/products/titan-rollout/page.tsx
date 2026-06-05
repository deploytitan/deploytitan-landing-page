import { Metadata } from 'next'
import TitanRollout from '@/page-components/products/TitanRollout'

export const metadata: Metadata = {
  title: 'Titan Rollout | DeployTitan',
  description: 'Run multi-service releases without Slack chaos, status chasing, or last-minute rollback guesswork.',
}

export default function Page() {
  return <TitanRollout />
}
