import { Metadata } from 'next'
import About from '@/page-components/About'
import { sanityFetch } from '@/sanity/lib/live'
import { aboutTeamQuery } from '@/sanity/lib/queries'

interface TeamMember {
  _id: string
  name: string
  role?: string | null
  bio?: string | null
  image?: object | null
  teamOrder?: number | null
}

export const metadata: Metadata = {
  title: 'About | DeployTitan',
  description:
    'DeployTitan is a deployment control plane for engineering teams. Progressive delivery, automated rollback, and real-time risk intelligence — ship safely, at any scale.',
}

export default async function Page() {
  const { data } = await sanityFetch({ query: aboutTeamQuery })
  const teamMembers = (data as TeamMember[] | null) ?? []

  return <About teamMembers={teamMembers} />
}
