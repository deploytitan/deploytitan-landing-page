import { Metadata } from 'next'
import Docs from '@/page-components/Docs'

export const metadata: Metadata = {
  title: 'Documentation | DeployTitan',
  description: 'Official documentation for DeployTitan products and integrations.',
}

export default function Page() {
  return <Docs />
}
