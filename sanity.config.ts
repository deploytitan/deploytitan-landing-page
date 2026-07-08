import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { codeInput } from '@sanity/code-input'
import { dashboardTool, projectInfoWidget } from '@sanity/dashboard'
import {
  defineLocations,
  type PresentationPluginOptions,
  presentationTool,
} from 'sanity/presentation'
import { media } from 'sanity-plugin-media'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes } from './src/sanity/schemas'
import { structure } from './src/sanity/structure'
import { createOpportunityPipelineAction } from './src/sanity/actions/createOpportunityPipelineAction'
import { copyDocumentForLLMAction } from './src/sanity/actions/copyDocumentForLLMAction'
import { deleteContentPipelineAction } from './src/sanity/actions/deleteContentPipelineAction'
import { importDocumentFromLLMAction } from './src/sanity/actions/importDocumentFromLLMAction'
import { createPublishArticleAction } from './src/sanity/actions/publishArticleAction'

const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    article: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title ?? 'Untitled', href: `/blog/${doc?.slug}` },
          { title: 'All posts', href: '/blog' },
        ],
      }),
    }),
    post: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: `${doc?.title ?? 'Untitled'} (Legacy Post)`, href: `/blog/${doc?.slug}` },
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
  document: {
    actions: (previousActions, context) => {
      if (context.schemaType === 'contentOpportunity') {
        return [
          createOpportunityPipelineAction,
          copyDocumentForLLMAction,
          importDocumentFromLLMAction,
          deleteContentPipelineAction,
          ...previousActions,
        ]
      }

      if (context.schemaType === 'article') {
        const articleActions = previousActions.map((action) =>
          action.action === 'publish' ? createPublishArticleAction(action) : action,
        )

        return [
          copyDocumentForLLMAction,
          importDocumentFromLLMAction,
          deleteContentPipelineAction,
          ...articleActions,
        ]
      }

      if (
        [
          'articlePerformanceSnapshot',
          'contentBrief',
          'contentInsight',
          'distributionAsset',
          'distributionAssetPerformanceSnapshot',
          'marketQuestion',
          'researchEvidence',
        ].includes(context.schemaType)
      ) {
        return [deleteContentPipelineAction, ...previousActions]
      }

      return previousActions
    },
  },
  plugins: [
    dashboardTool({
      widgets: [vercelWidget({ layout: { width: 'full' } }), projectInfoWidget()],
    }),
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
    media(),
    unsplashImageAsset(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
