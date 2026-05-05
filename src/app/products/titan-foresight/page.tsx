import { Metadata } from 'next'
import TitanForesight from '@/page-components/products/TitanForesight'
export const metadata: Metadata = {
  title: 'Titan Foresight | DeployTitan',
  description: 'Score every change before it ships. Foresight reads each PR against your live dependency graph and produces one explained risk score.',
}
export default function Page() { return <TitanForesight /> }
