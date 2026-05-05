import { Metadata } from 'next'
import Solutions from '@/page-components/Solutions'

export const metadata: Metadata = {
  title: 'Solutions | DeployTitan',
  description: 'Deployment solutions for every engineering challenge.',
}

export default function Page() {
  return <Solutions />
}
