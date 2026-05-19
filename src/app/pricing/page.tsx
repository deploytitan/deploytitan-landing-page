import { Metadata } from 'next'
import Pricing from '@/page-components/Pricing'

export const metadata: Metadata = {
  title: 'Pricing | DeployTitan',
  description:
    'DeployTitan uses predictable fixed platform plans with add-ons for protected services, risk intelligence, sandboxing, observability, and compliance.',
}

export default function Page() {
  return <Pricing />
}
