import { defineArrayMember, defineField, defineType } from 'sanity'

const contentOpportunityStatusValues = [
  { title: 'Discovered', value: 'discovered' },
  { title: 'Reviewing', value: 'reviewing' },
  { title: 'Accepted', value: 'accepted' },
  { title: 'Rejected', value: 'rejected' },
  { title: 'Brief Created', value: 'briefCreated' },
]

const opportunityTypeValues = [
  { title: 'New article', value: 'new-article' },
  { title: 'Refresh', value: 'refresh' },
  { title: 'CTR improvement', value: 'ctr' },
  { title: 'Internal link improvement', value: 'internal-link' },
]

export const contentOpportunityType = defineType({
  name: 'contentOpportunity',
  title: 'Content Opportunity',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'status',
      title: 'Workflow status',
      type: 'string',
      initialValue: 'discovered',
      options: { list: contentOpportunityStatusValues },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'opportunityType',
      title: 'Opportunity type',
      type: 'string',
      options: { list: opportunityTypeValues },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryQuery',
      title: 'Primary query',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'supportingQueries',
      title: 'Supporting queries',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'score',
      title: 'Score',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
    defineField({
      name: 'metrics',
      title: 'Search Console metrics',
      type: 'object',
      fields: [
        defineField({ name: 'clicks', title: 'Current clicks', type: 'number', initialValue: 0 }),
        defineField({ name: 'impressions', title: 'Current impressions', type: 'number', initialValue: 0 }),
        defineField({ name: 'ctr', title: 'Current CTR', type: 'number', initialValue: 0 }),
        defineField({ name: 'position', title: 'Current position', type: 'number', initialValue: 0 }),
        defineField({ name: 'previousClicks', title: 'Previous clicks', type: 'number', initialValue: 0 }),
        defineField({ name: 'previousImpressions', title: 'Previous impressions', type: 'number', initialValue: 0 }),
        defineField({ name: 'previousCtr', title: 'Previous CTR', type: 'number', initialValue: 0 }),
        defineField({ name: 'previousPosition', title: 'Previous position', type: 'number', initialValue: 0 }),
      ],
    }),
    defineField({
      name: 'reasoning',
      title: 'Reasoning',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'uniqueAngle',
      title: 'Unique angle',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'outline',
      title: 'Outline',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'productPillar',
      title: 'Product pillar',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'manual-llm-review',
      options: { list: ['manual-llm-review', 'gsc-weekly-research'] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'generatedAt',
      title: 'Generated at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourcePage',
      title: 'Source page',
      type: 'url',
      validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'matchedArticle',
      title: 'Matched article',
      type: 'reference',
      to: [{ type: 'article' }],
    }),
    defineField({
      name: 'marketQuestion',
      title: 'Market question',
      type: 'reference',
      to: [{ type: 'marketQuestion' }],
    }),
    defineField({
      name: 'researchEvidence',
      title: 'Research evidence',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'researchEvidence' }] })],
    }),
    defineField({
      name: 'contentBrief',
      title: 'Content brief',
      type: 'reference',
      to: [{ type: 'contentBrief' }],
    }),
    defineField({
      name: 'article',
      title: 'Article',
      type: 'reference',
      to: [{ type: 'article' }],
    }),
    defineField({
      name: 'kpiTarget',
      title: 'KPI target',
      type: 'contentKpiTarget',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'primaryQuery',
      score: 'score',
      status: 'status',
    },
    prepare({ title, subtitle, score, status }) {
      const scoreLabel = typeof score === 'number' ? `score ${Math.round(score)}` : 'score n/a'
      const statusLabel = status ? String(status) : 'unknown'

      return {
        title,
        subtitle: `${subtitle} · ${scoreLabel} · ${statusLabel}`,
      }
    },
  },
})
