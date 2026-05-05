import { Metadata } from 'next'
import API from '@/page-components/API'

export const metadata: Metadata = {
  title: 'API Reference | DeployTitan',
  description: 'Full REST and WebSocket API reference for DeployTitan.',
}

export default function Page() {
  return <API />
}
