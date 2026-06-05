import { Metadata } from 'next'
import Pricing from '@/page-components/Pricing'

export const metadata: Metadata = {
  title: 'Pricing | DeployTitan',
  description:
    'Flat monthly pricing for sprint release coordination. No per-deploy billing, no surprise charges, and Phase 1 integrations with GitHub, Jenkins, Grafana, and Slack.',
}

export default function Page() {
  return <Pricing />
}
