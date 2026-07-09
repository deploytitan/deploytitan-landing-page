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
    'DeployTitan helps AI-adopting engineering teams understand throughput bottlenecks, move faster, and ship safer.',
}

export default async function Page() {
  const { data } = await sanityFetch({ query: aboutTeamQuery })
  const teamMembers = (data as TeamMember[] | null) ?? []

  return <About teamMembers={teamMembers} />
}
