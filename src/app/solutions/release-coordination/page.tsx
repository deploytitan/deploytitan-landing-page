import { Metadata } from 'next'
import ReleaseCoordination from '@/page-components/solutions/ReleaseCoordination'

export const metadata: Metadata = {
  title: 'Release Coordination | DeployTitan',
  description:
    'Coordinate complex multi-service releases across teams and repositories with Titan Rollouts: release DAGs, dependency tracking, freeze windows, and approval flows in one place.',
}

export default function Page() {
  return <ReleaseCoordination />
}
