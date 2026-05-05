import { Metadata } from 'next'
import Terms from '@/page-components/Terms'

export const metadata: Metadata = {
  title: 'Terms of Service | DeployTitan',
  description: 'DeployTitan Terms of Service.',
}

export default function Page() {
  return <Terms />
}
