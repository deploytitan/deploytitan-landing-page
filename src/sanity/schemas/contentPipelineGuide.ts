import { defineArrayMember, defineField, defineType } from 'sanity'

import { ContentPipelineGuideOverviewInput } from '../components/contentPipelineGuideInput'
import { defaultPipelineGuideStages } from '../lib/workflowDefaults'

export const contentPipelineGuideType = defineType({
  name: 'contentPipelineGuide',
  title: 'Content Pipeline Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'pipelineGuideOverview',
      title: 'Pipeline guide overview',
      description: 'High-level operating map for how the DeployTitan content system works.',
      type: 'string',
      readOnly: true,
      components: {
        input: ContentPipelineGuideOverviewInput,
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'DeployTitan Content Pipeline Guide',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 6,
      initialValue:
        'Use this guide as the operating manual for the DeployTitan content system. The flow is: discover an opportunity, optionally round-trip a document through ChatGPT with Copy for ChatGPT and Import from ChatGPT, turn the accepted opportunity into an article draft with evidence, publish the article as a hub, generate distribution assets, then measure KPI impact and feed learnings back into future opportunities.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stages',
      title: 'Stages',
      type: 'array',
      initialValue: defaultPipelineGuideStages(),
      of: [defineArrayMember({ type: 'pipelineGuideStage' })],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
