/**
 * Thin wrapper around the Sanity client that mirrors the `sanityFetch` /
 * `SanityLive` interface used in the blog pages, without requiring a
 * `defineLive` export that isn't available in this version of next-sanity.
 *
 * - In production, data is fetched at request time with a 60-second revalidation
 *   window (ISR).  The /api/revalidate webhook resets the cache immediately on
 *   publish.
 * - In draft mode the read token is used so unpublished content is visible.
 */
import { draftMode } from 'next/headers'
import { client } from './client'
import type { QueryParams } from 'next-sanity'

export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string
  params?: QueryParams
}): Promise<{ data: T }> {
  let isDraft = false
  try {
    const dm = await draftMode()
    isDraft = dm.isEnabled
  } catch {
    // draftMode() throws outside a request context (e.g. generateStaticParams)
  }

  const token = process.env.SANITY_API_READ_TOKEN
  const fetchClient = isDraft && token
    ? client.withConfig({ useCdn: false, token })
    : client.withConfig({ useCdn: true })

  const data = await fetchClient.fetch<T>(query, params, {
    next: { revalidate: 60 },
  })
  return { data }
}

/**
 * No-op server component — kept so import sites don't need updating.
 * When `@sanity/visual-editing` is properly set up this can emit the
 * live-content script tag instead.
 */
export function SanityLive() {
  return null
}
