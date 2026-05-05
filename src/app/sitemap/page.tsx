import { Metadata } from 'next'
import Sitemap from '@/page-components/Sitemap'

export const metadata: Metadata = {
  title: 'Site Map | DeployTitan',
  description: 'An interactive force graph of every page on the DeployTitan website — nodes are pages, edges are backlinks and cross-references.',
}

export default function Page() {
  return <Sitemap />
}
