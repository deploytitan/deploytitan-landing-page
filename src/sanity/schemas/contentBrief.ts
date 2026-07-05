import { defineArrayMember, defineField, defineType } from 'sanity'
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
    defineField({ name: 'marketQuestion', title: 'Market question', type: 'reference', to: [{ type: 'marketQuestion' }], validation: (Rule) => Rule.required() }),
    defineField(withPublishingRequirement({ name: 'targetPersona', title: 'Target persona', type: 'targetPersona' }, briefPublishingRequirement)),
    defineField(withPublishingRequirement({ name: 'primaryKeyword', title: 'Primary keyword', type: 'string' }, briefPublishingRequirement)),
    defineField(withPublishingRequirement({ name: 'directAnswer', title: 'Direct answer', type: 'text', rows: 4 }, briefPublishingRequirement)),
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
      description: 'What action or next step this article should guide the reader toward.',
      type: 'string',
    }, briefPublishingRequirement)),
    defineField(withPublishingRequirement({ name: 'outline', title: 'Outline', type: 'array', of: [defineArrayMember({ type: 'articleOutlineSection' })] }, briefPublishingRequirement)),
    defineField(withPublishingRequirement({ name: 'researchEvidence', title: 'Evidence', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'researchEvidence' }] })] }, briefPublishingRequirement)),
    defineField({ name: 'articles', title: 'Articles', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'article' }] })] }),
    defineField({ name: 'distributionNotes', title: 'Distribution notes', type: 'text', rows: 3 }),
    defineField({ name: 'productHypothesis', title: 'Product hypothesis', type: 'text', rows: 3 }),
    defineField({ name: 'contentOpportunity', title: 'Content opportunity', type: 'reference', to: [{ type: 'contentOpportunity' }] }),
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
