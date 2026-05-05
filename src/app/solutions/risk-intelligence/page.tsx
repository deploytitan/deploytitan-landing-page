import { Metadata } from 'next'
import RiskIntelligence from '@/page-components/solutions/RiskIntelligence'

export const metadata: Metadata = {
  title: 'Risk Intelligence | DeployTitan',
  description: 'Predict and prevent deployment failures with DeployTitan risk intelligence.',
}

export default function Page() {
  return <RiskIntelligence />
}
