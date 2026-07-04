import { defineField, defineType } from 'sanity'

export const contentInsightType = defineType({
  name: 'contentInsight',
  title: 'Content Insight',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'article', title: 'Article', type: 'reference', to: [{ type: 'article' }] }),
    defineField({ name: 'contentOpportunity', title: 'Content opportunity', type: 'reference', to: [{ type: 'contentOpportunity' }] }),
    defineField({ name: 'marketQuestion', title: 'Market question', type: 'reference', to: [{ type: 'marketQuestion' }] }),
    defineField({ name: 'snapshot', title: 'Performance snapshot', type: 'reference', to: [{ type: 'articlePerformanceSnapshot' }] }),
    defineField({ name: 'signalType', title: 'Signal type', type: 'string', options: { list: ['search', 'product', 'distribution', 'refresh'] }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'recommendedAction', title: 'Recommended action', type: 'text', rows: 3 }),
    defineField({ name: 'productHypothesisConfidence', title: 'Hypothesis confidence', type: 'productHypothesisConfidence' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'signalType' },
  },
})
