import { Metadata } from 'next'
import ForCTO from '@/page-components/for/ForCTO'

export const metadata: Metadata = {
  title: 'DeployTitan for CTOs',
  description: 'Why CTOs choose DeployTitan for deployment risk management.',
}

export default function Page() {
  return <ForCTO />
}
