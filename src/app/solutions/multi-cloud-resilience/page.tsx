import { Metadata } from 'next'
import MultiCloudResilience from '@/page-components/solutions/MultiCloudResilience'

export const metadata: Metadata = {
  title: 'Multi-Cloud Resilience | DeployTitan',
  description: 'Deploy and recover across clouds with DeployTitan multi-cloud resilience.',
}

export default function Page() {
  return <MultiCloudResilience />
}
