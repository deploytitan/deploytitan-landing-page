import { defineField, defineType } from 'sanity'
import { ArticlePerformanceSnapshotPipelineGuideInput } from '../components/contentPipelineGuideInput'

export const articlePerformanceSnapshotType = defineType({
  name: 'articlePerformanceSnapshot',
  title: 'Article Performance Snapshot',
  type: 'document',
  fields: [
    defineField({ name: 'article', title: 'Article', type: 'reference', to: [{ type: 'article' }], validation: (Rule) => Rule.required() }),
    defineField({
      name: 'pipelineStageGuide',
      title: 'Pipeline stage guide',
      description: 'Focused guidance for article KPI measurement.',
      type: 'string',
      readOnly: true,
      components: {
        input: ArticlePerformanceSnapshotPipelineGuideInput,
      },
    }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      description: 'The reporting window this snapshot represents. Use 7d and 30d for standard post-publish reviews.',
      options: { list: ['7d', '30d', 'custom'] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'captureDate',
      title: 'Capture date',
      description: 'When this data was captured from analytics sources.',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      description: 'System or report this snapshot came from, such as GA4, Search Console, PostHog, or manual review.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      description: 'Canonical article URL used when matching analytics data.',
      type: 'url',
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      description: 'The measured performance values for this article and period.',
      type: 'analyticsMetricSet',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'notes', title: 'Notes', type: 'text', rows: 3 }),
    defineField({
      name: 'idempotencyKey',
      title: 'Idempotency key',
      description: 'Stable key used by import scripts to avoid duplicate snapshots for the same article, period, and source.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'article.title', subtitle: 'period' },
  },
})
