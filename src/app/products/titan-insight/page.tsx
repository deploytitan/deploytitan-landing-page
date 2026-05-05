import { Metadata } from 'next'
import TitanInsight from '@/page-components/products/TitanInsight'
export const metadata: Metadata = {
  title: 'Titan Insight | DeployTitan',
  description: 'Did this release actually improve anything? Deploy-to-metric correlation for every release.',
}
export default function Page() { return <TitanInsight /> }
