import { defineArrayMember, defineField, defineType } from 'sanity'
import { ArticlePipelineGuideInput } from '../components/contentPipelineGuideInput'
import { withPublishingRequirement } from '../components/publishingRequirementField'
import { defaultArticleChecklist } from '../lib/workflowDefaults'
import { hasClassifiedEvidence, isProofReadyStatus } from '../lib/evidenceValidation'

const articleStatusValues = [
  { title: 'Idea', value: 'idea' },
  { title: 'Awaiting Research', value: 'awaitingResearch' },
  { title: 'Ready to Draft', value: 'briefReady' },
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

const publishedRequirement =
  'Required before an article can be considered fully Published.'

// Sanity narrows validation rule types per field, but schema wrappers lose that context.
// Keep this local alias intentionally loose so wrapped validations remain type-checkable.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LooseValidationRule = any

type ValidationContextLike = {
  document?: unknown
}

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule: LooseValidationRule) => Rule.required() }),
    defineField(withPublishingRequirement({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule: LooseValidationRule) =>
        rule.custom((value: unknown, context: ValidationContextLike) => {
          const parent = context.document as { status?: string } | undefined
          const slug = value as { current?: string } | undefined
          if (parent?.status === 'published' && !slug?.current) {
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
      validation: (Rule: LooseValidationRule) => Rule.required(),
    }),
    defineField({
      name: 'pipelineStageGuide',
      title: 'Pipeline stage guide',
      description: 'Focused guidance for the article based on its current workflow status.',
      type: 'string',
      readOnly: true,
      components: {
        input: ArticlePipelineGuideInput,
      },
    }),
    defineField(withPublishingRequirement({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (rule: LooseValidationRule) =>
        rule.custom((value: unknown, context: ValidationContextLike) => {
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
      validation: (Rule: LooseValidationRule) => Rule.required(),
    }),
    defineField(withPublishingRequirement({
      name: 'primaryQuestion',
      title: 'Primary question',
      type: 'string',
      validation: (rule: LooseValidationRule) =>
        rule.custom((value: unknown, context: ValidationContextLike) => {
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
      validation: (Rule: LooseValidationRule) =>
        Rule.custom((value: unknown, context: ValidationContextLike) => {
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
      validation: (Rule: LooseValidationRule) =>
        Rule.max(5).custom((value: unknown, context: ValidationContextLike) => {
          const primaryKeyword = String(
            (context.document as { primaryKeyword?: string } | undefined)?.primaryKeyword ?? '',
          )
            .trim()
            .toLowerCase()
          const values = (Array.isArray(value) ? value : []).map((entry: unknown) => String(entry ?? '').trim()).filter(Boolean)
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
      validation: (Rule: LooseValidationRule) =>
        Rule.max(6).custom((value: unknown) => {
          const values = (Array.isArray(value) ? value : []).map((entry: unknown) => String(entry ?? '').trim()).filter(Boolean)
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
      validation: (Rule: LooseValidationRule) =>
        Rule.custom((value: unknown, context: ValidationContextLike) => {
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
      validation: (Rule: LooseValidationRule) =>
        Rule.custom((value: unknown, context: ValidationContextLike) => {
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
      description:
        'Marks whether this article is the central hub for a distribution campaign. Use Active hub for publishable pillar articles that should receive spoke assets; Not a hub for supporting posts; Retired hub when the article should no longer drive campaign work.',
      options: { list: hubStatusValues, layout: 'radio' },
      validation: (Rule: LooseValidationRule) => Rule.required(),
    }),
    defineField({
      name: 'hubCampaignName',
      title: 'Hub campaign name',
      type: 'string',
      description:
        'Short shared label for this article campaign. Use the same value on distribution assets and UTM campaign tags so performance rolls up cleanly.',
      validation: (Rule: LooseValidationRule) => Rule.max(96),
    }),
    defineField({
      name: 'hubPrimaryCta',
      title: 'Hub primary CTA',
      type: 'customerDiscoveryCta',
      description:
        'The main reader action on the hub article, such as joining research, signing up, or requesting discovery. Distribution spokes should usually send readers to the article first; this CTA is what the article then asks them to do.',
    }),
    defineField({
      name: 'hubRevenueGoal',
      title: 'Hub revenue goal',
      type: 'string',
      initialValue: 'traffic',
      options: { list: hubRevenueGoalValues, layout: 'radio' },
      description:
        'Primary outcome the article should optimize for. Pick one so title, CTA, distribution copy, and KPI review all point at the same goal.',
      validation: (Rule: LooseValidationRule) => Rule.required(),
    }),
    defineField({
      name: 'spokeCadenceWeeks',
      title: 'Spoke cadence (weeks)',
      type: 'number',
      initialValue: 6,
      description:
        'Number of weeks to spread the six spoke assets across. Default is six weeks; shorten only for urgent campaigns and lengthen only when the topic needs a slower educational sequence.',
      validation: (Rule: LooseValidationRule) => Rule.required().integer().min(4).max(8),
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
      validation: (Rule: LooseValidationRule) =>
        Rule.custom((value: unknown, context: ValidationContextLike) => {
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
    defineField({
      name: 'lastReviewedAt',
      title: 'Last reviewed at',
      type: 'datetime',
      description: 'Set when you have reviewed the article for technical accuracy.',
    }),
    defineField({
      name: 'sevenDayReviewAt',
      title: 'Seven-day review at',
      type: 'datetime',
      description: 'Date for the first lightweight performance check after publication.',
    }),
    defineField({
      name: 'thirtyDayReviewAt',
      title: 'Thirty-day review at',
      type: 'datetime',
      description: 'Date for the deeper KPI review that decides whether to keep growing, refresh, or reposition.',
    }),
    defineField({
      name: 'technicalReviewer',
      title: 'Technical reviewer',
      description: 'Optional reviewer name when someone other than the author checks the article.',
      type: 'string',
    }),
    defineField(withPublishingRequirement({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule: LooseValidationRule) =>
        Rule.custom((value: unknown, context: ValidationContextLike) => {
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
    defineField({
      name: 'contentBrief',
      title: 'Legacy content brief',
      type: 'reference',
      weak: true,
      to: [{ type: 'contentBrief' }],
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'contentOpportunity',
      title: 'Content opportunity',
      type: 'reference',
      weak: true,
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
      of: [defineArrayMember({ type: 'reference', weak: true, to: [{ type: 'article' }] })],
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
      description: 'Short explanation of how the article was researched. Keep this concise.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'publicEvidence',
      title: 'Evidence',
      description: 'Attach only the evidence that readers or the writer actually need. Public items can render on the article page.',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', weak: true, to: [{ type: 'researchEvidence' }] })],
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
      validation: (Rule: LooseValidationRule) =>
        Rule.custom((value: unknown, context: ValidationContextLike) => {
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
      validation: (Rule: LooseValidationRule) => Rule.required(),
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
  validation: (Rule: LooseValidationRule) =>
    Rule.custom(async (value: unknown, context: ValidationContextLike) => {
      const article = value as
        | {
            status?: string
            publicEvidence?: Array<{ _ref?: string }>
            citations?: unknown[]
            methodologyNote?: string
          }
        | undefined

      if (!article || !isProofReadyStatus(article.status)) return true

      const hasEvidence = (article.publicEvidence?.length ?? 0) > 0 || (article.citations?.length ?? 0) > 0
      if (!hasEvidence) {
        return 'Publication-ready articles require at least one citation or evidence item.'
      }

      if (article.publicEvidence?.length) {
        const validationContext = context as Parameters<typeof hasClassifiedEvidence>[0]
        const publicEvidenceResult = await hasClassifiedEvidence(validationContext, article.publicEvidence)
        if (!publicEvidenceResult.ok) return publicEvidenceResult.message
        if (!article.citations?.length && publicEvidenceResult.publishableEvidenceCount === 0) {
          return 'Publication-ready articles require at least one public citation or public evidence item.'
        }
      }

      if (!String(article.methodologyNote ?? '').trim()) {
        return 'Publication-ready articles require a short methodology note.'
      }

      return true
    }),
})
