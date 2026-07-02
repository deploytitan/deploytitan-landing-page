import { defineArrayMember, defineField, defineType } from 'sanity'

export const marketQuestionType = defineType({
  name: 'marketQuestion',
  title: 'Market Question',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'status', title: 'Validation status', type: 'string', initialValue: 'unvalidated', options: { list: [
      { title: 'Unvalidated', value: 'unvalidated' },
      { title: 'Validated', value: 'validated' },
      { title: 'Watching', value: 'watching' },
    ] } }),
    defineField({ name: 'priority', title: 'Priority', type: 'string', options: { list: ['Low', 'Medium', 'High'] }, initialValue: 'Medium' }),
    defineField({ name: 'topicCluster', title: 'Topic cluster', type: 'topicCluster' }),
    defineField({ name: 'targetPersona', title: 'Target persona', type: 'targetPersona' }),
    defineField({ name: 'problemSummary', title: 'Problem summary', type: 'text', rows: 4 }),
    defineField({ name: 'researchEvidence', title: 'Research evidence', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'researchEvidence' }] })] }),
    defineField({ name: 'contentBriefs', title: 'Content briefs', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'contentBrief' }] })] }),
    defineField({ name: 'productHypothesis', title: 'Product hypothesis', type: 'text', rows: 4 }),
    defineField({ name: 'productHypothesisConfidence', title: 'Hypothesis confidence', type: 'productHypothesisConfidence' }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'status' },
  },
})
