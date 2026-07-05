import { defineArrayMember, defineField, defineType } from 'sanity'

import { defaultPipelineGuideStages } from '../lib/workflowDefaults'

export const contentPipelineGuideType = defineType({
  name: 'contentPipelineGuide',
  title: 'Content Pipeline Guide',
  type: 'document',
  fields: [
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
        'Use this guide as the operating manual for the DeployTitan content system. The flow is: discover an opportunity, materialize it into a brief pipeline, refine the brief, draft the article, publish, then measure KPI impact and feed learnings back into the system.',
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
