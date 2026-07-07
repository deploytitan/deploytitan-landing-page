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
      description: 'Where the evidence came from.',
      options: {
        list: [
          { title: 'Public source', value: 'publicSource' },
          { title: 'Community signal', value: 'communitySignal' },
          { title: 'Search signal', value: 'searchSignal' },
          { title: 'Internal/customer note', value: 'internalNote' },
        ],
      },
      validation: (Rule: LooseValidationRule) => Rule.required(),
    }),
    defineField(withPublishingRequirement({
      name: 'visibility',
      title: 'Visibility',
      type: 'string',
      description: 'Use Public only when this item is safe to cite or summarize on the article page.',
      initialValue: 'internal',
      options: {
        list: [
          { title: 'Internal only', value: 'internal' },
          { title: 'Public', value: 'public' },
        ],
        layout: 'radio',
      },
      validation: (Rule: LooseValidationRule) => Rule.required(),
    }, evidencePublishingRequirement)),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4, validation: (Rule: LooseValidationRule) => Rule.required() }),
    defineField(withPublishingRequirement({
      name: 'source',
      title: 'Source citation',
      description: 'Required for public evidence. Internal notes can leave this blank.',
      type: 'sourceCitation',
      validation: (Rule: LooseValidationRule) =>
        Rule.custom((value: unknown, context: ValidationContextLike) => {
          const parent = context.document as { visibility?: string } | undefined
          const source = value as { url?: string; label?: string } | undefined
          if (parent?.visibility === 'public' && !String(source?.url ?? source?.label ?? '').trim()) {
            return 'Public evidence needs a source citation.'
          }
          return true
        }),
    }, 'Required when evidence is public.')),
    defineField({ name: 'article', title: 'Article', type: 'reference', weak: true, to: [{ type: 'article' }] }),
    defineField({
      name: 'contentOpportunity',
      title: 'Content opportunity',
      type: 'reference',
      weak: true,
      to: [{ type: 'contentOpportunity' }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'evidenceType' },
  },
})
