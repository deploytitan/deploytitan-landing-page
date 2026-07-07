import { defineField, defineType } from 'sanity'
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
      name: 'problemSummary',
      title: 'Problem summary',
      description: 'Plain-language explanation of the pain behind the question.',
      type: 'text',
      rows: 4,
    }),
    defineField({ name: 'article', title: 'Article', type: 'reference', weak: true, to: [{ type: 'article' }] }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'status' },
  },
})
