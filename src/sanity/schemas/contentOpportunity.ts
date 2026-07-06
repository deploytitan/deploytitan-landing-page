import { defineArrayMember, defineField, defineType } from 'sanity'
import { ContentOpportunityPipelineGuideInput } from '../components/contentPipelineGuideInput'
import { defaultOpportunityChecklist } from '../lib/workflowDefaults'

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
  initialValue: () => ({
    status: 'discovered',
    source: 'manual-llm-review',
    workflowChecklist: defaultOpportunityChecklist(),
  }),
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
      name: 'pipelineStageGuide',
      title: 'Pipeline stage guide',
      description: 'Focused guidance for this opportunity based on its current workflow status.',
      type: 'string',
      readOnly: true,
      components: {
        input: ContentOpportunityPipelineGuideInput,
      },
    }),
    defineField({
      name: 'opportunityType',
      title: 'Opportunity type',
      type: 'string',
      description:
        'Classifies what kind of content work this opportunity should trigger: a new article, a refresh of an existing article, a CTR rewrite, or an internal-linking improvement.',
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
      description: 'Priority score from 0-100. Higher scores should be reviewed first.',
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
      description:
        'The DeployTitan-specific point of view that makes this content worth creating instead of writing a generic SEO article.',
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
      description: 'The DeployTitan product area or narrative pillar this opportunity should support.',
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
      description: 'The measurable outcome this opportunity should improve after the article or refresh ships.',
      type: 'contentKpiTarget',
    }),
    defineField({
      name: 'workflowChecklist',
      title: 'Workflow checklist',
      description: 'Use this as the common operator checklist for moving an opportunity into the brief pipeline.',
      type: 'array',
      initialValue: defaultOpportunityChecklist(),
      of: [defineArrayMember({ type: 'workflowChecklistItem' })],
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
