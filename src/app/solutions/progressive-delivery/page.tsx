import { Metadata } from 'next'
import ProgressiveDelivery from '@/page-components/solutions/ProgressiveDelivery'

export const metadata: Metadata = {
  title: 'Progressive Delivery | DeployTitan',
  description: 'Ship changes gradually with confidence using DeployTitan progressive delivery.',
}

export default function Page() {
  return <ProgressiveDelivery />
}
