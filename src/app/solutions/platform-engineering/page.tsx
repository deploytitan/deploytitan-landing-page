import { Metadata } from 'next'
import PlatformEngineering from '@/page-components/solutions/PlatformEngineering'

export const metadata: Metadata = {
  title: 'Platform Engineering | DeployTitan',
  description: 'Give platform teams a deployment control plane with DeployTitan.',
}

export default function Page() {
  return <PlatformEngineering />
}
