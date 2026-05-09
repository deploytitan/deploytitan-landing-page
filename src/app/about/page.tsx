import { Metadata } from 'next'
import About from '@/page-components/About'

export const metadata: Metadata = {
  title: 'About | DeployTitan',
  description:
    'DeployTitan is a deployment control plane for engineering teams. Progressive delivery, automated rollback, and real-time risk intelligence — ship safely, at any scale.',
}

export default function Page() {
  return <About />
}
