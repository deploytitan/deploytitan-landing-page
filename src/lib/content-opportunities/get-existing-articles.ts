import process from 'node:process'

import { createClient } from 'next-sanity'

import type { ExistingArticleSummary } from './types'

function getEnv(name: string, fallbackName?: string) {
  return process.env[name] ?? (fallbackName ? process.env[fallbackName] : undefined)
}

function requireEnv(name: string, fallbackName?: string) {
  const value = getEnv(name, fallbackName)
  if (!value) {
    throw new Error(`Missing required environment variable: ${fallbackName ? `${name} or ${fallbackName}` : name}`)
  }

  return value
}

function createSanityReadClient() {
  return createClient({
    projectId: requireEnv('SANITY_PROJECT_ID', 'NEXT_PUBLIC_SANITY_PROJECT_ID'),
    dataset: requireEnv('SANITY_DATASET', 'NEXT_PUBLIC_SANITY_DATASET'),
    apiVersion: getEnv('SANITY_API_VERSION', 'NEXT_PUBLIC_SANITY_API_VERSION') ?? '2026-07-05',
    useCdn: false,
    token: getEnv('SANITY_API_READ_TOKEN'),
    perspective: 'published',
  })
}

export async function getExistingArticles(): Promise<ExistingArticleSummary[]> {
  const client = createSanityReadClient()

  return client.fetch<ExistingArticleSummary[]>(
    `*[_type == "article"] | order(coalesce(publishedAt, _createdAt) desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      primaryKeyword,
      "relatedQuestions": coalesce(relatedQuestions, []),
      "topicCluster": select(
        defined(topicCluster) => {
          "name": topicCluster.name,
          "slug": topicCluster.slug.current
        },
        null
      )
    }`,
  )
}
