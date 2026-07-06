import { defineArrayMember, defineField, defineType } from 'sanity'
import { withPublishingRequirement } from '../components/publishingRequirementField'
import { defaultArticleChecklist } from '../lib/workflowDefaults'
import {
  fetchContentBriefValidationRecord,
  hasClassifiedEvidence,
  isProofReadyStatus,
} from '../lib/evidenceValidation'

const articleStatusValues = [
  { title: 'Idea', value: 'idea' },
  { title: 'Awaiting Research', value: 'awaitingResearch' },
  { title: 'Brief Ready', value: 'briefReady' },
  { title: 'Drafting', value: 'drafting' },
  { title: 'Technical Review', value: 'technicalReview' },
  { title: 'Publication Ready', value: 'publicationReady' },
  { title: 'Scheduled', value: 'scheduled' },
  { title: 'Published', value: 'published' },
  { title: 'Needs Refresh', value: 'needsRefresh' },
]

const articleCardLayoutValues = [
  { title: 'Standard card', value: 'standard' },
  { title: 'Featured wide card', value: 'featured' },
]

const hubStatusValues = [
  { title: 'Not a hub', value: 'notHub' },
  { title: 'Active hub', value: 'activeHub' },
  { title: 'Retired hub', value: 'retiredHub' },
]

const hubRevenueGoalValues = [
  { title: 'Traffic', value: 'traffic' },
  { title: 'Newsletter signups', value: 'newsletter' },
  { title: 'Waitlist', value: 'waitlist' },
  { title: 'Research CTA', value: 'researchCta' },
  { title: 'Product discovery', value: 'productDiscovery' },
]

const proofReadyRequirement =
  'Required before an article can move to Publication Ready, Scheduled, or Published.'

const publishedRequirement =
  'Required before an article can be considered fully Published.'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField(withPublishingRequirement({
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
    }, publishedRequirement)),
    defineField({
      name: 'status',
      title: 'Workflow status',
      type: 'string',
      initialValue: 'idea',
      options: { list: articleStatusValues },
      validation: (Rule) => Rule.required(),
    }),
    defineField(withPublishingRequirement({
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
    }, publishedRequirement)),
    defineField({
      name: 'directAnswer',
      title: 'Direct answer',
      type: 'text',
      rows: 4,
      description: 'Two to four sentences answering the article question near the top.',
      validation: (Rule) => Rule.required(),
    }),
    defineField(withPublishingRequirement({
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
    }, publishedRequirement)),
    defineField(withPublishingRequirement({
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
    }, publishedRequirement)),
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
    defineField(withPublishingRequirement({
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
    }, publishedRequirement)),
    defineField({
      name: 'targetPersona',
      title: 'Target persona',
      type: 'targetPersona',
    }),
    defineField(withPublishingRequirement({
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
    }, publishedRequirement)),
    defineField({
      name: 'hubStatus',
      title: 'Hub status',
      type: 'string',
      initialValue: 'activeHub',
      description: 'Use active hubs to drive the spoke distribution system after publication.',
      options: { list: hubStatusValues, layout: 'radio' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hubCampaignName',
      title: 'Hub campaign name',
      type: 'string',
      description: 'Shared campaign label used across all spoke assets and UTM tags.',
      validation: (Rule) => Rule.max(96),
    }),
    defineField({
      name: 'hubPrimaryCta',
      title: 'Hub primary CTA',
      type: 'customerDiscoveryCta',
      description:
        'Primary CTA for the hub itself. Spokes should still point readers back to the article before this CTA takes over.',
    }),
    defineField({
      name: 'hubRevenueGoal',
      title: 'Hub revenue goal',
      type: 'string',
      initialValue: 'traffic',
      options: { list: hubRevenueGoalValues, layout: 'radio' },
      description: 'Primary downstream outcome this hub should optimize for.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'spokeCadenceWeeks',
      title: 'Spoke cadence (weeks)',
      type: 'number',
      initialValue: 6,
      description: 'Number of weeks to spread the six spoke assets across.',
      validation: (Rule) => Rule.required().integer().min(4).max(8),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField(withPublishingRequirement({
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
    }, publishedRequirement)),
    defineField({
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
      description: 'Set when the article is materially refreshed after publication.',
    }),
    defineField(withPublishingRequirement({
      name: 'lastReviewedAt',
      title: 'Last reviewed at',
      type: 'datetime',
      description: 'Set the most recent editorial or technical accuracy review date.',
    }, proofReadyRequirement)),
    defineField({ name: 'sevenDayReviewAt', title: 'Seven-day review at', type: 'datetime' }),
    defineField({ name: 'thirtyDayReviewAt', title: 'Thirty-day review at', type: 'datetime' }),
    defineField(withPublishingRequirement({
      name: 'technicalReviewer',
      title: 'Technical reviewer',
      description: 'Owner accountable for the technical accuracy review before publication.',
      type: 'string',
    }, proofReadyRequirement)),
    defineField(withPublishingRequirement({
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
    }, publishedRequirement)),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }] })],
    }),
    defineField(withPublishingRequirement({
      name: 'contentBrief',
      title: 'Content brief',
      type: 'reference',
      to: [{ type: 'contentBrief' }],
    }, proofReadyRequirement)),
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
      name: 'workflowChecklist',
      title: 'Workflow checklist',
      description: 'Use this as the common operator checklist for drafting, publishing, and post-publish review.',
      type: 'array',
      initialValue: defaultArticleChecklist(),
      of: [defineArrayMember({ type: 'workflowChecklistItem' })],
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
      name: 'methodologyNote',
      title: 'Methodology note',
      description: 'Short explanation of how the article was researched and what evidence types were used.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'publicEvidence',
      title: 'Public evidence override',
      description: 'Optional publishable evidence references. Leave empty to derive from the linked content brief evidence.',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'researchEvidence' }] })],
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
    defineField(withPublishingRequirement({
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
    }, publishedRequirement)),
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
  validation: (Rule) =>
    Rule.custom(async (value, context) => {
      const article = value as
        | {
            status?: string
            contentBrief?: { _ref?: string }
            publicEvidence?: Array<{ _ref?: string }>
            citations?: unknown[]
            methodologyNote?: string
            lastReviewedAt?: string
            technicalReviewer?: string
          }
        | undefined

      if (!article || !isProofReadyStatus(article.status)) return true

      const brief = await fetchContentBriefValidationRecord(context, article.contentBrief)
      if (!brief) {
        return 'Publication-ready articles require a linked content brief.'
      }

      if (!String(brief.directAnswer ?? '').trim()) return 'The linked brief needs a direct answer.'
      if (!String(brief.thesis ?? '').trim()) return 'The linked brief needs a differentiated thesis.'
      if (!String(brief.ctaGoal ?? '').trim()) return 'The linked brief needs a CTA goal.'
      if (!brief.targetPersona?.name) return 'The linked brief needs a target persona.'
      if (!String(brief.primaryKeyword ?? '').trim()) return 'The linked brief needs a primary keyword.'
      if (!(brief.outline ?? []).length) return 'The linked brief needs an outline.'

      const briefEvidenceResult = await hasClassifiedEvidence(context, brief.researchEvidence)
      if (!briefEvidenceResult.ok) return briefEvidenceResult.message

      const selectedEvidenceRefs = article.publicEvidence?.length ? article.publicEvidence : brief.researchEvidence
      const publicEvidenceResult = await hasClassifiedEvidence(context, selectedEvidenceRefs)
      if (!publicEvidenceResult.ok) return publicEvidenceResult.message

      if (!String(article.lastReviewedAt ?? '').trim()) {
        return 'Publication-ready articles require a last reviewed date.'
      }

      if (!String(article.technicalReviewer ?? '').trim()) {
        return 'Publication-ready articles require a technical reviewer.'
      }

      return true
    }),
})
