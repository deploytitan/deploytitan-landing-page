import { Metadata } from 'next'
import TitanLedger from '@/page-components/products/TitanLedger'
export const metadata: Metadata = {
  title: 'Titan Ledger | DeployTitan',
  description: 'Every deploy, measured automatically. DORA metrics, trends, and team scorecards — no agents, no tagging.',
}
export default function Page() { return <TitanLedger /> }
