import { Metadata } from 'next'
import Sitemap from '@/page-components/Sitemap'

export const metadata: Metadata = {
  title: 'Site Map | DeployTitan',
}

export default function Page() {
  return <Sitemap />
}
