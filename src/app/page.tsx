import { Metadata } from 'next'
import Home from '@/page-components/Home'

export const metadata: Metadata = {
  title: 'DeployTitan — Ship more. Break less. Know why.',
  description: 'Progressive delivery and deployment safety for modern engineering teams.',
}

export default function Page() {
  return <Home />
}
