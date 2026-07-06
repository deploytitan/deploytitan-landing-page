import { defineField, defineType } from 'sanity'
import { ContentInsightPipelineGuideInput } from '../components/contentPipelineGuideInput'

export const contentInsightType = defineType({
  name: 'contentInsight',
  title: 'Content Insight',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'pipelineStageGuide',
      title: 'Pipeline stage guide',
      description: 'Focused guidance for turning measurements into reusable content insights.',
      type: 'string',
      readOnly: true,
      components: {
        input: ContentInsightPipelineGuideInput,
      },
    }),
    defineField({ name: 'article', title: 'Article', type: 'reference', to: [{ type: 'article' }] }),
    defineField({ name: 'contentOpportunity', title: 'Content opportunity', type: 'reference', to: [{ type: 'contentOpportunity' }] }),
    defineField({ name: 'marketQuestion', title: 'Market question', type: 'reference', to: [{ type: 'marketQuestion' }] }),
    defineField({ name: 'snapshot', title: 'Performance snapshot', type: 'reference', to: [{ type: 'articlePerformanceSnapshot' }] }),
    defineField({
      name: 'signalType',
      title: 'Signal type',
      description: 'Classifies the insight so it can feed the right next action: search optimization, product learning, distribution changes, or refresh work.',
      type: 'string',
      options: { list: ['search', 'product', 'distribution', 'refresh'] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'recommendedAction',
      title: 'Recommended action',
      description: 'The concrete follow-up this insight should trigger, such as refresh the article, create more spokes, or update product messaging.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'productHypothesisConfidence',
      title: 'Hypothesis confidence',
      description: 'Use when the insight changes confidence in a product hypothesis.',
      type: 'productHypothesisConfidence',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'signalType' },
  },
})
