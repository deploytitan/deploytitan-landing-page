import { Metadata } from 'next'
import Journey from '@/page-components/Journey'

export const metadata: Metadata = {
  title: 'The Journey | DeployTitan',
  description: 'Why I built DeployTitan — a personal story about 7 years of deployment anxiety and the mission to fix it.',
}

export default function Page() {
  return <Journey />
}
