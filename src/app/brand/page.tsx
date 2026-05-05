import { Metadata } from 'next'
import Brand from '@/page-components/Brand'

export const metadata: Metadata = {
  title: 'Brand Assets | DeployTitan',
  description: 'Logos, colors, and brand guidelines for DeployTitan.',
}

export default function Page() {
  return <Brand />
}
