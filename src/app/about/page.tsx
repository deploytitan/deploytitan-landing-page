import { Metadata } from 'next'
import About from '@/page-components/About'

export const metadata: Metadata = {
  title: 'About | DeployTitan',
  description: 'Learn about DeployTitan, our mission, and our team.',
}

export default function Page() {
  return <About />
}
