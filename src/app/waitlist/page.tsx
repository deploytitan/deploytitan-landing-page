import { Metadata } from 'next'
import Waitlist from '@/page-components/Waitlist'

export const metadata: Metadata = {
  title: 'Join the Waitlist | DeployTitan',
  description:
    'Join the DeployTitan waitlist for early access to sprint release coordination across GitHub, Jenkins, Grafana, and Slack.',
}

export default function Page() {
  return <Waitlist />
}
