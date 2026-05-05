import { Metadata } from 'next'
import InstantRollback from '@/page-components/solutions/InstantRollback'

export const metadata: Metadata = {
  title: 'Instant Rollback | DeployTitan',
  description:
    'Undo a bad release in seconds with Titan Phoenix — scoped automatic rollback before your users notice.',
}

export default function Page() {
  return <InstantRollback />
}
