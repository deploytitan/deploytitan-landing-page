import { Metadata } from 'next'
import TitanPhoenix from '@/page-components/products/TitanPhoenix'
export const metadata: Metadata = {
  title: 'Titan Phoenix | DeployTitan',
  description: 'Undo a bad release in seconds — only where it broke. SLO-triggered, scoped rollback.',
}
export default function Page() { return <TitanPhoenix /> }
