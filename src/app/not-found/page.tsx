import { Metadata } from 'next'
import NotFound from '@/page-components/NotFound'

export const metadata: Metadata = {
  title: '404 Not Found | DeployTitan',
}

export default function Page() {
  return <NotFound />
}
