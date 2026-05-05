import { Metadata } from 'next'
import ForSRE from '@/page-components/for/ForSRE'

export const metadata: Metadata = {
  title: 'DeployTitan for SREs',
  description: 'How site reliability engineers use DeployTitan to reduce deployment risk.',
}

export default function Page() {
  return <ForSRE />
}
