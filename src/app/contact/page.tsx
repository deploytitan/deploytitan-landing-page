import type { Metadata } from 'next'
import Contact from '@/page-components/Contact'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the DeployTitan team for sales, support, or general questions.',
}

export default function ContactPage() {
  return <Contact />
}
