import { Metadata } from 'next'
import TitanRollout from '@/page-components/products/TitanRollout'

export const metadata: Metadata = {
  title: 'Titan Rollout | DeployTitan',
  description:
    'Coordinate sprint PRs across GitHub, Jenkins, Slack, and Grafana from one release record.',
}

export default function Page() {
  return <TitanRollout />
}
