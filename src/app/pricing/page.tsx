import { Metadata } from 'next'
import { fetchPolarProducts } from '@/lib/polar'
import Pricing from '@/page-components/Pricing'

// Revalidate at most once per hour — keeps data fresh without full SSR cost.
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Pricing | DeployTitan',
  description: 'Simple, transparent pricing for teams of every size.',
}

export default async function Page() {
  const products = await fetchPolarProducts()
  return <Pricing polarProducts={products} />
}
