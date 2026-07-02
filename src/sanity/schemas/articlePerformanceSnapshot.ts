import { defineField, defineType } from 'sanity'

export const articlePerformanceSnapshotType = defineType({
  name: 'articlePerformanceSnapshot',
  title: 'Article Performance Snapshot',
  type: 'document',
  fields: [
    defineField({ name: 'article', title: 'Article', type: 'reference', to: [{ type: 'article' }], validation: (Rule) => Rule.required() }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      options: { list: ['7d', '30d', 'custom'] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'captureDate', title: 'Capture date', type: 'datetime', validation: (Rule) => Rule.required() }),
    defineField({ name: 'source', title: 'Source', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'canonicalUrl', title: 'Canonical URL', type: 'url' }),
    defineField({ name: 'metrics', title: 'Metrics', type: 'analyticsMetricSet', validation: (Rule) => Rule.required() }),
    defineField({ name: 'notes', title: 'Notes', type: 'text', rows: 3 }),
    defineField({ name: 'idempotencyKey', title: 'Idempotency key', type: 'string', validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: 'article.title', subtitle: 'period' },
  },
})
