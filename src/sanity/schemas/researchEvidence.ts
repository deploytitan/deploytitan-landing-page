import { defineField, defineType } from 'sanity'
import { ResearchEvidencePipelineGuideInput } from '../components/contentPipelineGuideInput'
import { withPublishingRequirement } from '../components/publishingRequirementField'

const evidencePublishingRequirement =
  'Required before linked evidence can support a publishable article.'

// Sanity narrows validation rule types per field, but schema wrappers lose that context.
// Keep this local alias intentionally loose so wrapped validations remain type-checkable.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LooseValidationRule = any

type ValidationContextLike = {
  document?: unknown
}

export const researchEvidenceType = defineType({
  name: 'researchEvidence',
  title: 'Research Evidence',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule: LooseValidationRule) => Rule.required() }),
    defineField({
      name: 'pipelineStageGuide',
      title: 'Pipeline stage guide',
      description: 'Focused guidance for using this evidence in the content pipeline.',
      type: 'string',
      readOnly: true,
      components: {
        input: ResearchEvidencePipelineGuideInput,
      },
    }),
    defineField({
      name: 'evidenceType',
      title: 'Evidence type',
      type: 'string',
      description: 'Where the evidence came from. This helps editors judge trust level and how it can be used publicly.',
      options: { list: ['customerInterview', 'technicalSource', 'communityDiscussion', 'competitor', 'workaround', 'internalExperience'] },
      validation: (Rule: LooseValidationRule) => Rule.required(),
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
      validation: (Rule: LooseValidationRule) => Rule.required(),
    }, evidencePublishingRequirement)),
    defineField({
      name: 'evidenceStrength',
      title: 'Evidence strength',
      type: 'string',
      description: 'Editorial confidence in the evidence. Use High for specific, trustworthy proof; Low for directional or weak signals.',
      options: { list: ['Low', 'Medium', 'High'], layout: 'radio' },
      initialValue: 'Medium',
    }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4, validation: (Rule: LooseValidationRule) => Rule.required() }),
    defineField(withPublishingRequirement({
      name: 'publicSummary',
      title: 'Public summary',
      description: 'Sanitized version that is safe to show on public articles.',
      type: 'text',
      rows: 4,
      validation: (Rule: LooseValidationRule) =>
        Rule.custom((value: unknown, context: ValidationContextLike) => {
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
      validation: (Rule: LooseValidationRule) =>
        Rule.custom((value: unknown, context: ValidationContextLike) => {
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
    defineField({
      name: 'signalsProductNeed',
      title: 'Signals product need',
      description: 'Turn this on when the evidence points to a real product or workflow pain, not just content interest.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'existingWorkaround',
      title: 'Existing workaround',
      description: 'The manual process, toolchain, or workaround readers use today before DeployTitan enters the story.',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'evidenceType' },
  },
})
