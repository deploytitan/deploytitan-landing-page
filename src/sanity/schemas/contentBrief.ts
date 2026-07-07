import { defineArrayMember, defineField, defineType } from 'sanity'
import { ContentBriefPipelineGuideInput } from '../components/contentPipelineGuideInput'
import { withPublishingRequirement } from '../components/publishingRequirementField'
import { defaultBriefChecklist } from '../lib/workflowDefaults'
import { validateBriefReadiness, type ReferenceLike } from '../lib/evidenceValidation'

const briefPublishingRequirement =
  'Required on the linked brief before an article can move to Publication Ready, Scheduled, or Published.'

export const contentBriefType = defineType({
  name: 'contentBrief',
  title: 'Content Brief',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'researching',
      options: { list: [
        { title: 'Researching', value: 'researching' },
        { title: 'Brief Ready', value: 'briefReady' },
        { title: 'Evidence Reviewed', value: 'evidenceReviewed' },
        { title: 'Drafting', value: 'drafting' },
        { title: 'Published', value: 'published' },
      ] },
    }),
    defineField({
      name: 'pipelineStageGuide',
      title: 'Pipeline stage guide',
      description: 'Focused guidance for this brief based on its current workflow status.',
      type: 'string',
      readOnly: true,
      components: {
        input: ContentBriefPipelineGuideInput,
      },
    }),
    defineField({ name: 'marketQuestion', title: 'Market question', type: 'reference', to: [{ type: 'marketQuestion' }], validation: (Rule) => Rule.required() }),
    defineField(withPublishingRequirement({
      name: 'targetPersona',
      title: 'Target persona',
      description: 'The specific reader this brief is written for. Use this to keep the article angle, examples, and CTA focused.',
      type: 'targetPersona',
    }, briefPublishingRequirement)),
    defineField(withPublishingRequirement({
      name: 'primaryKeyword',
      title: 'Primary keyword',
      description: 'The main search phrase or reader language this article should satisfy.',
      type: 'string',
    }, briefPublishingRequirement)),
    defineField(withPublishingRequirement({
      name: 'directAnswer',
      title: 'Direct answer',
      description: 'Two to four sentences that answer the reader question directly before the article expands into detail.',
      type: 'text',
      rows: 4,
    }, briefPublishingRequirement)),
    defineField(withPublishingRequirement({
      name: 'thesis',
      title: 'Differentiated thesis',
      description: 'The opinionated angle the writer should defend throughout the article.',
      type: 'text',
      rows: 4,
    }, briefPublishingRequirement)),
    defineField(withPublishingRequirement({
      name: 'ctaGoal',
      title: 'CTA goal',
      description:
        'The intended reader action after the article. This should match the article hub CTA and KPI target when possible.',
      type: 'string',
    }, briefPublishingRequirement)),
    defineField(withPublishingRequirement({
      name: 'outline',
      title: 'Outline',
      description: 'The planned article structure. Each section should earn its place by supporting the thesis or direct answer.',
      type: 'array',
      of: [defineArrayMember({ type: 'articleOutlineSection' })],
    }, briefPublishingRequirement)),
    defineField(withPublishingRequirement({
      name: 'researchEvidence',
      title: 'Evidence',
      description: 'Evidence records that support the brief. Classify visibility before the article becomes publication-ready.',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', weak: true, to: [{ type: 'researchEvidence' }] })],
    }, briefPublishingRequirement)),
    defineField({
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', weak: true, to: [{ type: 'article' }] })],
    }),
    defineField({
      name: 'distributionNotes',
      title: 'Distribution notes',
      description: 'Guidance for future spoke assets: channels, angles, audiences, or timing constraints.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'productHypothesis',
      title: 'Product hypothesis',
      description: 'What this reader problem suggests about product demand or positioning.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contentOpportunity',
      title: 'Content opportunity',
      type: 'reference',
      weak: true,
      to: [{ type: 'contentOpportunity' }],
    }),
    defineField({ name: 'kpiTarget', title: 'KPI target', type: 'contentKpiTarget' }),
    defineField({
      name: 'workflowChecklist',
      title: 'Workflow checklist',
      description: 'Use this as the common operator checklist for refining the brief and handing it to drafting.',
      type: 'array',
      initialValue: defaultBriefChecklist(),
      of: [defineArrayMember({ type: 'workflowChecklistItem' })],
    }),
  ],
  validation: (Rule) =>
    Rule.custom(async (value, context) => {
      const brief = value as
        | {
            status?: string
            directAnswer?: string
            thesis?: string
            ctaGoal?: string
            targetPersona?: { name?: string }
            primaryKeyword?: string
            researchEvidence?: ReferenceLike[] | null
            outline?: unknown[]
          }
        | undefined
      if (!brief || brief.status !== 'briefReady') return true
      return validateBriefReadiness(context, brief)
    }),
  preview: {
    select: { title: 'title', subtitle: 'status' },
  },
})
