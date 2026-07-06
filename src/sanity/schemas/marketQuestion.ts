import { defineArrayMember, defineField, defineType } from 'sanity'
import { MarketQuestionPipelineGuideInput } from '../components/contentPipelineGuideInput'

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
    defineField({
      name: 'pipelineStageGuide',
      title: 'Pipeline stage guide',
      description: 'Focused guidance for this market question in the content pipeline.',
      type: 'string',
      readOnly: true,
      components: {
        input: MarketQuestionPipelineGuideInput,
      },
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      description: 'Editorial priority for answering this question. High-priority questions should feed briefs sooner.',
      type: 'string',
      options: { list: ['Low', 'Medium', 'High'] },
      initialValue: 'Medium',
    }),
    defineField({
      name: 'topicCluster',
      title: 'Topic cluster',
      description: 'The broader content cluster this question belongs to.',
      type: 'topicCluster',
    }),
    defineField({
      name: 'targetPersona',
      title: 'Target persona',
      description: 'The reader segment most likely to ask this question.',
      type: 'targetPersona',
    }),
    defineField({
      name: 'problemSummary',
      title: 'Problem summary',
      description: 'Plain-language explanation of the pain behind the question.',
      type: 'text',
      rows: 4,
    }),
    defineField({ name: 'researchEvidence', title: 'Research evidence', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'researchEvidence' }] })] }),
    defineField({ name: 'contentBriefs', title: 'Content briefs', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'contentBrief' }] })] }),
    defineField({
      name: 'productHypothesis',
      title: 'Product hypothesis',
      description: 'What the question suggests about product demand, objections, or positioning.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'productHypothesisConfidence',
      title: 'Hypothesis confidence',
      description: 'How confident we are that this market question reflects a real product opportunity.',
      type: 'productHypothesisConfidence',
    }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'status' },
  },
})
