import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { codeInput } from '@sanity/code-input'
import {
  defineLocations,
  type PresentationPluginOptions,
  presentationTool,
} from 'sanity/presentation'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes } from './src/sanity/schemas'
import { structure } from './src/sanity/structure'

const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    post: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title ?? 'Untitled', href: `/blog/${doc?.slug}` },
          { title: 'All posts', href: '/blog' },
        ],
      }),
    }),
  },
}

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    presentationTool({
      resolve,
      previewUrl: {
        initial: process.env.NEXT_PUBLIC_SANITY_PREVIEW_URL ?? '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    structureTool({ structure }),
    codeInput(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
