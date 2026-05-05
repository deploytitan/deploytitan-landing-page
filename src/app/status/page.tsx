import { Metadata } from 'next'
import Status from '@/page-components/Status'

export const metadata: Metadata = {
  title: 'System Status | DeployTitan',
  description: 'Current system status for DeployTitan services.',
}

export default function Page() {
  return <Status />
}
