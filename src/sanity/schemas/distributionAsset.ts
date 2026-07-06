import { defineField, defineType } from 'sanity'

const distributionChannels = ['xThread', 'xPost', 'linkedin', 'dev', 'newsletter', 'community'] as const

const spokeTypeValues = [
  { title: 'Story', value: 'story' },
  { title: 'Observation', value: 'observation' },
  { title: 'Thread', value: 'thread' },
  { title: 'Contrarian take', value: 'contrarian' },
  { title: 'Past vs present', value: 'pastVsPresent' },
  { title: 'Listicle', value: 'listicle' },
]

const distributionGoalValues = [
  { title: 'Traffic', value: 'traffic' },
  { title: 'Newsletter', value: 'newsletter' },
  { title: 'Waitlist', value: 'waitlist' },
  { title: 'Research CTA', value: 'researchCta' },
  { title: 'Product discovery', value: 'productDiscovery' },
]

export const distributionAssetType = defineType({
  name: 'distributionAsset',
  title: 'Distribution Asset',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'article', title: 'Article', type: 'reference', to: [{ type: 'article' }], validation: (Rule) => Rule.required() }),
    defineField({
      name: 'hubArticle',
      title: 'Hub article',
      description: 'Primary hub article this spoke should route readers back to.',
      type: 'reference',
      to: [{ type: 'article' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'channel',
      title: 'Channel',
      type: 'string',
      options: { list: [...distributionChannels] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'spokeType',
      title: 'Spoke type',
      type: 'string',
      options: { list: spokeTypeValues, layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'distributionGoal',
      title: 'Distribution goal',
      type: 'string',
      initialValue: 'traffic',
      options: { list: distributionGoalValues, layout: 'radio' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'draft',
      options: { list: [
        { title: 'Draft', value: 'draft' },
        { title: 'Ready', value: 'ready' },
        { title: 'Published', value: 'published' },
      ] },
    }),
    defineField({ name: 'campaignName', title: 'Campaign name', type: 'string' }),
    defineField({
      name: 'weekNumber',
      title: 'Campaign week number',
      type: 'number',
      validation: (Rule) => Rule.integer().min(1).max(12),
    }),
    defineField({ name: 'copy', title: 'Copy', type: 'text', rows: 6 }),
    defineField({ name: 'ctaLabel', title: 'CTA label', type: 'string' }),
    defineField({ name: 'ctaUrl', title: 'CTA URL', type: 'url' }),
    defineField({
      name: 'ctaPlacement',
      title: 'CTA placement',
      type: 'string',
      options: { list: ['opening', 'mid-post', 'closing'], layout: 'radio' },
    }),
    defineField({ name: 'externalUrl', title: 'Published URL', type: 'url' }),
    defineField({ name: 'utmParameters', title: 'UTM parameters', type: 'utmParameters' }),
    defineField({ name: 'scheduledFor', title: 'Scheduled for', type: 'datetime' }),
  ],
  validation: (Rule) =>
    Rule.custom((value) => {
      const asset = (value as {
        status?: string
        channel?: string
        hubArticle?: { _ref?: string }
        article?: { _ref?: string }
        ctaLabel?: string
        ctaUrl?: string
        externalUrl?: string
        scheduledFor?: string
        utmParameters?: {
          source?: string
          medium?: string
          campaign?: string
        }
      } | null) ?? null
      if (!asset) return true

      const isReadyLike = asset.status === 'ready' || asset.status === 'published'
      if (!isReadyLike) return true

      if (!asset.hubArticle?._ref) return 'Ready or published distribution assets require a hub article.'
      if (!asset.article?._ref) return 'Ready or published distribution assets require an article reference.'
      if (!String(asset.ctaLabel ?? '').trim()) return 'Ready or published distribution assets require a CTA label.'
      if (!String(asset.ctaUrl ?? '').trim()) return 'Ready or published distribution assets require a CTA URL.'
      if (!String(asset.scheduledFor ?? '').trim()) return 'Ready or published distribution assets require a schedule.'
      if (!String(asset.utmParameters?.source ?? '').trim()) return 'Ready or published distribution assets require a UTM source.'
      if (!String(asset.utmParameters?.medium ?? '').trim()) return 'Ready or published distribution assets require a UTM medium.'
      if (!String(asset.utmParameters?.campaign ?? '').trim()) return 'Ready or published distribution assets require a UTM campaign.'

      if (asset.status === 'published' && !asset.externalUrl) {
        return 'Published distribution assets require an external URL.'
      }

      return true
    }),
  preview: {
    select: {
      title: 'title',
      channel: 'channel',
      spokeType: 'spokeType',
      weekNumber: 'weekNumber',
    },
    prepare({ title, channel, spokeType, weekNumber }) {
      const weekLabel =
        typeof weekNumber === 'number' && Number.isFinite(weekNumber) ? `week ${weekNumber}` : 'unscheduled'
      const subtitle = [channel, spokeType, weekLabel].filter(Boolean).join(' · ')
      return {
        title,
        subtitle,
      }
    },
  },
})
