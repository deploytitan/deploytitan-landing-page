import { Metadata } from 'next'
import TitanShield from '@/page-components/products/TitanShield'

export const metadata: Metadata = {
  title: 'Titan Shield | DeployTitan',
  description: 'Automated rollback and blast-radius control with Titan Shield.',
}

export default function Page() {
  return <TitanShield />
}
