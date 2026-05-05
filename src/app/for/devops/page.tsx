import { Metadata } from 'next'
import ForDevOps from '@/page-components/for/ForDevOps'

export const metadata: Metadata = {
  title: 'DeployTitan for DevOps',
  description: 'How DevOps engineers use DeployTitan for safer, faster deployments.',
}

export default function Page() {
  return <ForDevOps />
}
