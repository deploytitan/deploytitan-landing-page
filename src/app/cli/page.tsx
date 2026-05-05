import { Metadata } from 'next'
import CLI from '@/page-components/CLI'

export const metadata: Metadata = {
  title: 'CLI Reference | DeployTitan',
  description: 'Command-line interface reference for the DeployTitan CLI.',
}

export default function Page() {
  return <CLI />
}
