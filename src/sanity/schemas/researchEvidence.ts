import { defineField, defineType } from 'sanity'

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
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'source', title: 'Source citation', type: 'sourceCitation' }),
    defineField({ name: 'marketQuestion', title: 'Market question', type: 'reference', to: [{ type: 'marketQuestion' }] }),
    defineField({ name: 'signalsProductNeed', title: 'Signals product need', type: 'boolean', initialValue: true }),
    defineField({ name: 'existingWorkaround', title: 'Existing workaround', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'evidenceType' },
  },
})
