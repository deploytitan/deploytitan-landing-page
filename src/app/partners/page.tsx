import { Metadata } from 'next'
import Partners from '@/page-components/Partners'

export const metadata: Metadata = {
  title: 'Partners | DeployTitan',
  description: 'Technology and solution partners in the DeployTitan ecosystem.',
}

export default function Page() {
  return <Partners />
}
