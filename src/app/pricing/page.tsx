import { Metadata } from 'next'
import Pricing from '@/page-components/Pricing'

export const metadata: Metadata = {
  title: 'Pricing | DeployTitan',
  description: 'Flat-rate pricing per Lambda function. Unlimited deployments, rollbacks, and risk scans included.',
}

export default function Page() {
  return <Pricing />
}
