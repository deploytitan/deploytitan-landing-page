import { Metadata } from 'next'
import Press from '@/page-components/Press'

export const metadata: Metadata = {
  title: 'Press | DeployTitan',
  description: 'Press releases, media coverage, and news about DeployTitan.',
}

export default function Page() {
  return <Press />
}
