import { Metadata } from 'next'
import Privacy from '@/page-components/Privacy'

export const metadata: Metadata = {
  title: 'Privacy Policy | DeployTitan',
  description: 'DeployTitan Privacy Policy.',
}

export default function Page() {
  return <Privacy />
}
