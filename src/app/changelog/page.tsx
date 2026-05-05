import { Metadata } from 'next'
import Changelog from '@/page-components/Changelog'

export const metadata: Metadata = {
  title: 'Changelog | DeployTitan',
  description: 'Release history and product updates.',
}

export default function Page() {
  return <Changelog />
}
