import { Metadata } from 'next'
import EarlyAccess from '@/page-components/EarlyAccess'

export const metadata: Metadata = {
  title: 'Early Access | DeployTitan',
  description: 'Join the DeployTitan early access program.',
}

export default function Page() {
  return <EarlyAccess />
}
