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
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.document as { status?: string } | undefined
          if (parent?.status === 'published' && !String(value ?? '').trim()) {
            return 'Published articles require one primary keyword.'
          }
          return true
        }),
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary keywords',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (Rule) =>
        Rule.max(5).custom((value, context) => {
          const primaryKeyword = String(
            (context.document as { primaryKeyword?: string } | undefined)?.primaryKeyword ?? '',
          )
            .trim()
            .toLowerCase()
          const values = (value ?? []).map((entry) => String(entry ?? '').trim()).filter(Boolean)
          if (new Set(values.map((entry) => entry.toLowerCase())).size !== values.length) {
            return 'Secondary keywords must be unique.'
          }
          if (primaryKeyword && values.some((entry) => entry.toLowerCase() === primaryKeyword)) {
            return 'Do not repeat the primary keyword in secondary keywords.'
          }
          return true
        }),
    }),
    defineField({
      name: 'relatedQuestions',
      title: 'Related questions',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (Rule) =>
        Rule.max(6).custom((value) => {
          const values = (value ?? []).map((entry) => String(entry ?? '').trim()).filter(Boolean)
          if (values.length < 2) return 'Add at least two related questions for published articles.'
          if (new Set(values.map((entry) => entry.toLowerCase())).size !== values.length) {
            return 'Related questions must be unique.'
          }
          return true
        }),
    }),
    defineField({
      name: 'searchIntent',
      title: 'Search intent',
      type: 'string',
      options: {
        list: ['informational', 'commercial-investigation', 'comparison', 'problem-solving'],
        layout: 'radio',
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.document as { status?: string } | undefined
          if (parent?.status === 'published' && !value) {
            return 'Published articles require a search intent.'
          }
          return true
        }),
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
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.document as { status?: string } | undefined
          if (parent?.status === 'published' && !value) {
            return 'Published articles require a topic cluster.'
          }
          return true
        }),
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
    defineField({
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
      description: 'Set when the article is materially refreshed after publication.',
    }),
    defineField({ name: 'lastReviewedAt', title: 'Last reviewed at', type: 'datetime' }),
    defineField({ name: 'sevenDayReviewAt', title: 'Seven-day review at', type: 'datetime' }),
    defineField({ name: 'thirtyDayReviewAt', title: 'Thirty-day review at', type: 'datetime' }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.document as { status?: string } | undefined
          if (parent?.status === 'published' && !value) {
            return 'Published articles require an author.'
          }
          return true
        }),
    }),
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
      name: 'contentOpportunity',
      title: 'Content opportunity',
      type: 'reference',
      to: [{ type: 'contentOpportunity' }],
    }),
    defineField({
      name: 'kpiTarget',
      title: 'KPI target',
      type: 'contentKpiTarget',
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
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.document as { status?: string; coverImage?: unknown } | undefined
          if (parent?.status !== 'published') return true
          const seo = (value as {
            seoTitle?: string
            metaDescription?: string
            openGraphImage?: unknown
          } | null) ?? null
          if (!seo?.seoTitle?.trim()) return 'Published articles require an SEO title.'
          if (!seo?.metaDescription?.trim()) return 'Published articles require a meta description.'
          if (!seo.openGraphImage && !parent.coverImage) {
            return 'Published articles require an Open Graph image or a cover image.'
          }
          return true
        }),
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
