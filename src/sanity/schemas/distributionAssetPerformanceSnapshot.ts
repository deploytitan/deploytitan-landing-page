import { defineField, defineType } from 'sanity'
import { DistributionAssetPerformanceSnapshotPipelineGuideInput } from '../components/contentPipelineGuideInput'

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
      name: 'pipelineStageGuide',
      title: 'Pipeline stage guide',
      description: 'Focused guidance for measuring a published distribution spoke.',
      type: 'string',
      readOnly: true,
      components: {
        input: DistributionAssetPerformanceSnapshotPipelineGuideInput,
      },
    }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      description: 'The reporting window this spoke snapshot represents.',
      options: { list: ['7d', '30d', 'custom'] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'captureDate',
      title: 'Capture date',
      description: 'When this channel performance data was captured.',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      description: 'Channel analytics source, report, or manual capture source for this snapshot.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'externalUrl',
      title: 'Published URL',
      description: 'Live URL for the distribution spoke whose metrics were captured.',
      type: 'url',
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      description: 'Channel-level engagement and conversion metrics for this spoke.',
      type: 'distributionAnalyticsMetricSet',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'notes', title: 'Notes', type: 'text', rows: 3 }),
    defineField({
      name: 'idempotencyKey',
      title: 'Idempotency key',
      description: 'Stable key used by sync scripts to avoid duplicate snapshots for the same spoke, period, and source.',
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
