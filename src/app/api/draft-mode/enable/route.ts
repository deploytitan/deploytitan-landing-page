import { client } from '@/sanity/lib/client'
import { defineEnableDraftMode } from 'next-sanity/draft-mode'

const { GET: _GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_API_READ_TOKEN,
  }),
})

export async function GET(request: Request) {
  const url = new URL(request.url)
  const secret = url.searchParams.get('sanity-preview-secret')
  const hasToken = !!process.env.SANITY_API_READ_TOKEN

  console.log('[draft-mode/enable] called', {
    url: request.url,
    hasSecret: !!secret,
    secretLength: secret?.length,
    hasToken,
    tokenLength: process.env.SANITY_API_READ_TOKEN?.length,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  })

  const response = await _GET(request)
  console.log('[draft-mode/enable] result status:', response.status)
  return response
}
