import { defineField, defineType } from 'sanity'

export const distributionAssetType = defineType({
  name: 'distributionAsset',
  title: 'Distribution Asset',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'article', title: 'Article', type: 'reference', to: [{ type: 'article' }], validation: (Rule) => Rule.required() }),
    defineField({
      name: 'channel',
      title: 'Channel',
      type: 'string',
      options: { list: ['xThread', 'xPost', 'linkedin', 'dev', 'newsletter', 'community'] },
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
    defineField({ name: 'copy', title: 'Copy', type: 'text', rows: 6 }),
    defineField({ name: 'externalUrl', title: 'Published URL', type: 'url' }),
    defineField({ name: 'utmParameters', title: 'UTM parameters', type: 'utmParameters' }),
    defineField({ name: 'scheduledFor', title: 'Scheduled for', type: 'datetime' }),
  ],
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value || value.status !== 'published') return true
      return value.externalUrl ? true : 'Published distribution assets require an external URL.'
    }),
  preview: {
    select: { title: 'title', subtitle: 'channel' },
  },
})
