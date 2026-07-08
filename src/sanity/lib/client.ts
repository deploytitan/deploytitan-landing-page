import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

const readToken = typeof window === 'undefined' ? process.env.SANITY_API_READ_TOKEN : undefined

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: readToken,
  stega: {
    studioUrl: '/studio',
  },
})

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  perspective: 'published',
})
