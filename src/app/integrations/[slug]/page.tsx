import { Metadata } from 'next'
import { integrations } from '@/data/integrations'
import IntegrationDetail from '@/page-components/integrations/IntegrationDetail'

export function generateStaticParams() {
  return integrations.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const integration = integrations.find((i) => i.slug === slug)
  return {
    title: integration ? `${integration.name} Integration | DeployTitan` : 'Integration | DeployTitan',
    description: integration?.description,
  }
}

export default function Page() {
  return <IntegrationDetail />
}
