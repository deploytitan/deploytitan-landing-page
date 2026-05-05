import { Metadata } from 'next'
import Integrations from '@/page-components/Integrations'

export const metadata: Metadata = {
  title: 'Integrations | DeployTitan',
  description: 'Connect DeployTitan with your existing tools and workflows.',
}

export default function Page() {
  return <Integrations />
}
