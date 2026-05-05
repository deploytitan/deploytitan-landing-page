import { Metadata } from 'next'
import Journey from '@/page-components/Journey'

export const metadata: Metadata = {
  title: 'The Journey | DeployTitan',
  description: 'From deploy to confidence — the DeployTitan deployment journey.',
}

export default function Page() {
  return <Journey />
}
