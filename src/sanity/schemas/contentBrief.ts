import { defineArrayMember, defineField, defineType } from 'sanity'

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
        { title: 'Drafting', value: 'drafting' },
        { title: 'Published', value: 'published' },
      ] },
    }),
    defineField({ name: 'marketQuestion', title: 'Market question', type: 'reference', to: [{ type: 'marketQuestion' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'targetPersona', title: 'Target persona', type: 'targetPersona' }),
    defineField({ name: 'primaryKeyword', title: 'Primary keyword', type: 'string' }),
    defineField({ name: 'directAnswer', title: 'Direct answer', type: 'text', rows: 4 }),
    defineField({ name: 'outline', title: 'Outline', type: 'array', of: [defineArrayMember({ type: 'articleOutlineSection' })] }),
    defineField({ name: 'researchEvidence', title: 'Evidence', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'researchEvidence' }] })] }),
    defineField({ name: 'articles', title: 'Articles', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'article' }] })] }),
    defineField({ name: 'distributionNotes', title: 'Distribution notes', type: 'text', rows: 3 }),
    defineField({ name: 'productHypothesis', title: 'Product hypothesis', type: 'text', rows: 3 }),
    defineField({ name: 'contentOpportunity', title: 'Content opportunity', type: 'reference', to: [{ type: 'contentOpportunity' }] }),
    defineField({ name: 'kpiTarget', title: 'KPI target', type: 'contentKpiTarget' }),
  ],
  validation: (Rule) =>
    Rule.custom((value) => {
      const brief = value as
        | {
            status?: string
            directAnswer?: string
            targetPersona?: { name?: string }
            primaryKeyword?: string
            researchEvidence?: unknown[]
            outline?: unknown[]
          }
        | undefined
      if (!brief || brief.status !== 'briefReady') return true
      if (!brief.directAnswer) return 'Brief-ready briefs require a direct answer.'
      if (!brief.targetPersona?.name) return 'Brief-ready briefs require a target persona.'
      if (!brief.primaryKeyword) return 'Brief-ready briefs require a primary keyword.'
      if (!brief.researchEvidence?.length) return 'Brief-ready briefs require evidence.'
      if (!brief.outline?.length) return 'Brief-ready briefs require an outline.'
      return true
    }),
  preview: {
    select: { title: 'title', subtitle: 'status' },
  },
})
