import { defineField, defineType } from 'sanity'

export const distributionAssetPerformanceSnapshotType = defineType({
  name: 'distributionAssetPerformanceSnapshot',
  title: 'Distribution Asset Performance Snapshot',
  type: 'document',
  fields: [
    defineField({
      name: 'distributionAsset',
      title: 'Distribution asset',
      type: 'reference',
      to: [{ type: 'distributionAsset' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      options: { list: ['7d', '30d', 'custom'] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'captureDate',
      title: 'Capture date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'externalUrl', title: 'Published URL', type: 'url' }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'distributionAnalyticsMetricSet',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'notes', title: 'Notes', type: 'text', rows: 3 }),
    defineField({
      name: 'idempotencyKey',
      title: 'Idempotency key',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'distributionAsset.title',
      subtitle: 'period',
    },
  },
})
