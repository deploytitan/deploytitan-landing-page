import { Metadata } from 'next'
import Customers from '@/page-components/Customers'

export const metadata: Metadata = {
  title: 'Customers | DeployTitan',
  description: 'See how engineering teams use DeployTitan to ship safely.',
}

export default function Page() {
  return <Customers />
}
