import { Metadata } from 'next'
import Careers from '@/page-components/Careers'

export const metadata: Metadata = {
  title: 'Careers | DeployTitan',
  description: 'Join the DeployTitan team.',
}

export default function Page() {
  return <Careers />
}
