import { Metadata } from 'next'
import Security from '@/page-components/Security'

export const metadata: Metadata = {
  title: 'Security | DeployTitan',
  description: 'Security practices, certifications, and responsible disclosure at DeployTitan.',
}

export default function Page() {
  return <Security />
}
