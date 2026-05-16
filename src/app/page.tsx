import { Metadata } from 'next'
import Home from '@/page-components/Home'

export const metadata: Metadata = {
  title: 'DeployTitan | Coordinated safe releases for distributed engineering teams',
  description: 'Coordinate multi-service releases, reduce freeze-window chaos, and improve rollback confidence.',
}

export default function Page() {
  return <Home />
}
