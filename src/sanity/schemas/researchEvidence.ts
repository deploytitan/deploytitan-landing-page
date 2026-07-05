import { defineField, defineType } from 'sanity'
import { withPublishingRequirement } from '../components/publishingRequirementField'

const evidencePublishingRequirement =
  'Required before linked evidence can support a publishable article.'

export const researchEvidenceType = defineType({
  name: 'researchEvidence',
  title: 'Research Evidence',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'evidenceType',
      title: 'Evidence type',
      type: 'string',
      options: { list: ['customerInterview', 'technicalSource', 'communityDiscussion', 'competitor', 'workaround', 'internalExperience'] },
      validation: (Rule) => Rule.required(),
    }),
    defineField(withPublishingRequirement({
      name: 'visibility',
      title: 'Visibility',
      type: 'string',
      description: 'Controls whether this evidence remains internal or can power public proof on the article page.',
      initialValue: 'internal',
      options: {
        list: [
          { title: 'Internal only', value: 'internal' },
          { title: 'Public', value: 'public' },
          { title: 'Public summary only', value: 'publicSummaryOnly' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }, evidencePublishingRequirement)),
    defineField({
      name: 'evidenceStrength',
      title: 'Evidence strength',
      type: 'string',
      options: { list: ['Low', 'Medium', 'High'], layout: 'radio' },
      initialValue: 'Medium',
    }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField(withPublishingRequirement({
      name: 'publicSummary',
      title: 'Public summary',
      description: 'Sanitized version that is safe to show on public articles.',
      type: 'text',
      rows: 4,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.document as { visibility?: string } | undefined
          if (parent?.visibility === 'publicSummaryOnly' && !String(value ?? '').trim()) {
            return 'Public-summary evidence requires a public summary.'
          }
          return true
        }),
    }, 'Required when visibility is "Public summary only" and the evidence is used in a publishable article.')),
    defineField({
      name: 'sensitivityReason',
      title: 'Sensitivity reason',
      description: 'Explain why this evidence should stay private or sanitized.',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.document as { visibility?: string } | undefined
          if (parent?.visibility !== 'public' && !String(value ?? '').trim()) {
            return 'Add a sensitivity reason when evidence is not fully public.'
          }
          return true
        }),
    }),
    defineField({ name: 'source', title: 'Source citation', type: 'sourceCitation' }),
    defineField({
      name: 'publicSource',
      title: 'Public source citation',
      description: 'Optional public-facing source if it should differ from the internal source record.',
      type: 'sourceCitation',
    }),
    defineField({ name: 'marketQuestion', title: 'Market question', type: 'reference', to: [{ type: 'marketQuestion' }] }),
    defineField({ name: 'signalsProductNeed', title: 'Signals product need', type: 'boolean', initialValue: true }),
    defineField({ name: 'existingWorkaround', title: 'Existing workaround', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'evidenceType' },
  },
})
