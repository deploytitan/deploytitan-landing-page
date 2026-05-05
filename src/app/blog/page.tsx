import { Metadata } from 'next'
import Blog from '@/page-components/Blog'

export const metadata: Metadata = {
  title: 'Blog | DeployTitan',
  description: 'Engineering insights, release notes, and deployment best practices.',
}

export default function Page() {
  return <Blog />
}
