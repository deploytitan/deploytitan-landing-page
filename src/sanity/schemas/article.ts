import { defineArrayMember, defineField, defineType } from 'sanity'

const articleStatusValues = [
  { title: 'Idea', value: 'idea' },
  { title: 'Awaiting Research', value: 'awaitingResearch' },
  { title: 'Brief Ready', value: 'briefReady' },
  { title: 'Drafting', value: 'drafting' },
  { title: 'Technical Review', value: 'technicalReview' },
  { title: 'Scheduled', value: 'scheduled' },
  { title: 'Published', value: 'published' },
  { title: 'Needs Refresh', value: 'needsRefresh' },
]

const articleCardLayoutValues = [
  { title: 'Standard card', value: 'standard' },
  { title: 'Featured wide card', value: 'featured' },
]

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.document as { status?: string } | undefined
          if (parent?.status === 'published' && !value?.current) {
            return 'Published articles require a slug.'
          }
          return true
        }),
    }),
    defineField({
      name: 'status',
      title: 'Workflow status',
      type: 'string',
      initialValue: 'idea',
      options: { list: articleStatusValues },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.document as { status?: string } | undefined
          if (parent?.status === 'published' && !value) {
            return 'Published articles require an excerpt.'
          }
          return true
        }),
    }),
    defineField({
      name: 'directAnswer',
      title: 'Direct answer',
      type: 'text',
      rows: 4,
      description: 'Two to four sentences answering the article question near the top.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryQuestion',
      title: 'Primary question',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.document as { status?: string } | undefined
          if (parent?.status === 'published' && !value) {
            return 'Published articles require a primary question.'
          }
          return true
        }),
    }),
    defineField({
      name: 'primaryKeyword',
      title: 'Primary keyword',
      type: 'string',
    }),
    defineField({
      name: 'targetPersona',
      title: 'Target persona',
      type: 'targetPersona',
    }),
    defineField({
      name: 'topicCluster',
      title: 'Topic cluster',
      type: 'topicCluster',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.document as { status?: string } | undefined
          if (parent?.status === 'published' && !value) {
            return 'Published articles require a publication date.'
          }
          return true
        }),
    }),
    defineField({ name: 'lastReviewedAt', title: 'Last reviewed at', type: 'datetime' }),
    defineField({ name: 'sevenDayReviewAt', title: 'Seven-day review at', type: 'datetime' }),
    defineField({ name: 'thirtyDayReviewAt', title: 'Thirty-day review at', type: 'datetime' }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }] })],
    }),
    defineField({
      name: 'contentBrief',
      title: 'Content brief',
      type: 'reference',
      to: [{ type: 'contentBrief' }],
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related articles',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'article' }] })],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [defineArrayMember({ type: 'faqItem' })],
    }),
    defineField({
      name: 'citations',
      title: 'Citations',
      type: 'array',
      of: [defineArrayMember({ type: 'sourceCitation' })],
    }),
    defineField({
      name: 'customerDiscoveryCta',
      title: 'Customer discovery CTA',
      type: 'customerDiscoveryCta',
    }),
    defineField({
      name: 'seo',
      title: 'SEO metadata',
      type: 'seoMetadata',
    }),
    defineField({
      name: 'cardLayout',
      title: 'Blog card layout',
      type: 'string',
      initialValue: 'standard',
      options: { list: articleCardLayoutValues, layout: 'dropdown' },
      description: 'Controls whether this article renders as a standard card or a wider featured card on the blog index.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
          ],
        }),
        defineArrayMember({ type: 'code', title: 'Code Block', options: { withFilename: true } }),
        defineArrayMember({ type: 'calloutBlock' }),
        defineArrayMember({ type: 'diagramBlock' }),
        defineArrayMember({ type: 'tableBlock' }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'legacyPostId',
      title: 'Legacy post ID',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'coverImage',
    },
  },
})
