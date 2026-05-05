import { Metadata } from 'next'
import Contact from '@/page-components/Contact'

export const metadata: Metadata = {
  title: 'Contact | DeployTitan',
  description: 'Get in touch with the DeployTitan team.',
}

export default function Page() {
  return <Contact />
}
