import { Metadata } from 'next'
import TitanSandbox from '@/page-components/products/TitanSandbox'
export const metadata: Metadata = {
  title: 'Titan Sandbox | DeployTitan',
  description: 'A production-shaped environment for every branch. Spin up, test, tear down.',
}
export default function Page() { return <TitanSandbox /> }
