import { defineArrayMember, defineField, defineType } from 'sanity'

export const seoMetadataType = defineType({
  name: 'seoMetadata',
  title: 'SEO Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Legacy SEO title',
      type: 'string',
      hidden: true,
      validation: (Rule) => Rule.max(60).warning('Keep SEO titles under 60 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Legacy meta description',
      type: 'text',
      hidden: true,
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Keep meta descriptions under 160 characters.'),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      validation: (Rule) =>
        Rule.max(70)
          .warning('Aim for 45-65 characters; avoid repeating the primary keyword.')
          .custom((value) => {
            const title = String(value ?? '').trim()
            return title.length && title.length < 30
              ? 'SEO titles should usually be more specific than 30 characters.'
              : true
          }),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.max(170)
          .warning('Aim for 140-160 characters with a direct technical promise.')
          .custom((value) => {
            const description = String(value ?? '').trim()
            return description.length && description.length < 80
              ? 'Meta descriptions should usually be more descriptive than 80 characters.'
              : true
          }),
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL override',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ scheme: ['https'] }).custom((value) => {
          if (!value) return true
          return String(value).startsWith('https://deploytitan.com/')
            ? true
            : 'Canonical overrides must point to an https://deploytitan.com/ URL.'
        }),
    }),
    defineField({
      name: 'noIndex',
      title: 'Legacy noindex flag',
      type: 'boolean',
      hidden: true,
      initialValue: false,
    }),
    defineField({
      name: 'robotsDirective',
      title: 'Robots directive',
      type: 'string',
      initialValue: 'index,follow',
      options: {
        list: ['index,follow', 'noindex,follow', 'noindex,nofollow'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'openGraphTitle',
      title: 'Open Graph title',
      type: 'string',
      validation: (Rule) => Rule.max(95).warning('Keep Open Graph titles concise and explicit.'),
    }),
    defineField({
      name: 'openGraphDescription',
      title: 'Open Graph description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(220).warning('Keep Open Graph descriptions concise.'),
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Open Graph image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'structuredDataType',
      title: 'Structured data type',
      type: 'string',
      initialValue: 'TechArticle',
      options: { list: ['Article', 'TechArticle'], layout: 'radio' },
    }),
  ],
})

export const faqItemType = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
  ],
})

export const utmParametersType = defineType({
  name: 'utmParameters',
  title: 'UTM Parameters',
  type: 'object',
  fields: [
    defineField({ name: 'source', title: 'UTM source', type: 'string' }),
    defineField({ name: 'medium', title: 'UTM medium', type: 'string' }),
    defineField({ name: 'campaign', title: 'UTM campaign', type: 'string' }),
    defineField({ name: 'content', title: 'UTM content', type: 'string' }),
    defineField({ name: 'term', title: 'UTM term', type: 'string' }),
  ],
})

export const analyticsMetricSetType = defineType({
  name: 'analyticsMetricSet',
  title: 'Analytics Metric Set',
  type: 'object',
  fields: [
    defineField({ name: 'views', title: 'Views', type: 'number', initialValue: 0 }),
    defineField({ name: 'uniqueVisitors', title: 'Unique visitors', type: 'number', initialValue: 0 }),
    defineField({ name: 'avgTimeOnPageSeconds', title: 'Average time on page (seconds)', type: 'number', initialValue: 0 }),
    defineField({ name: 'scroll50Count', title: '50% readers', type: 'number', initialValue: 0 }),
    defineField({ name: 'scroll90Count', title: '90% readers', type: 'number', initialValue: 0 }),
    defineField({ name: 'newsletterSignups', title: 'Newsletter signups', type: 'number', initialValue: 0 }),
    defineField({ name: 'researchCtaClicks', title: 'Research CTA clicks', type: 'number', initialValue: 0 }),
    defineField({ name: 'interviewRequests', title: 'Interview requests', type: 'number', initialValue: 0 }),
    defineField({ name: 'shares', title: 'Shares', type: 'number', initialValue: 0 }),
    defineField({ name: 'outboundToolClicks', title: 'Outbound tool link clicks', type: 'number', initialValue: 0 }),
    defineField({ name: 'searchClicks', title: 'Search clicks', type: 'number', initialValue: 0 }),
    defineField({ name: 'searchImpressions', title: 'Search impressions', type: 'number', initialValue: 0 }),
    defineField({ name: 'searchCtr', title: 'Search CTR', type: 'number', initialValue: 0 }),
  ],
})

export const customerDiscoveryCtaType = defineType({
  name: 'customerDiscoveryCta',
  title: 'Customer Discovery CTA',
  type: 'object',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'label', title: 'Button label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'href', title: 'Destination URL', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'supportingText', title: 'Supporting text', type: 'text', rows: 2 }),
  ],
})

export const targetPersonaType = defineType({
  name: 'targetPersona',
  title: 'Target Persona',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Persona', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'seniority', title: 'Seniority', type: 'string' }),
    defineField({ name: 'team', title: 'Team', type: 'string' }),
    defineField({ name: 'painPoints', title: 'Pain points', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
  ],
})

export const topicClusterType = defineType({
  name: 'topicCluster',
  title: 'Topic Cluster',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Cluster name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Cluster slug', type: 'slug', options: { source: 'name', maxLength: 96 } }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
})

export const sourceCitationType = defineType({
  name: 'sourceCitation',
  title: 'Source Citation',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'url', title: 'URL', type: 'url' }),
    defineField({ name: 'publisher', title: 'Publisher', type: 'string' }),
    defineField({ name: 'notes', title: 'Notes', type: 'text', rows: 3 }),
  ],
})

export const articleOutlineSectionType = defineType({
  name: 'articleOutlineSection',
  title: 'Article Outline Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'directAnswer', title: 'Direct answer', type: 'text', rows: 3 }),
    defineField({ name: 'notes', title: 'Notes', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
  ],
})

export const productHypothesisConfidenceType = defineType({
  name: 'productHypothesisConfidence',
  title: 'Product Hypothesis Confidence',
  type: 'object',
  fields: [
    defineField({ name: 'score', title: 'Confidence score', type: 'number', validation: (Rule) => Rule.required().min(0).max(1) }),
    defineField({ name: 'label', title: 'Label', type: 'string', options: { list: ['Low', 'Medium', 'High'] } }),
    defineField({ name: 'rationale', title: 'Rationale', type: 'text', rows: 3 }),
  ],
})

export const calloutBlockType = defineType({
  name: 'calloutBlock',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({ name: 'tone', title: 'Tone', type: 'string', options: { list: ['note', 'warning', 'insight'] }, initialValue: 'note' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
  ],
})

export const diagramBlockType = defineType({
  name: 'diagramBlock',
  title: 'Diagram',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'code', title: 'Diagram source', type: 'text', rows: 8 }),
    defineField({ name: 'image', title: 'Diagram image', type: 'image', options: { hotspot: true } }),
  ],
})

export const tableBlockType = defineType({
  name: 'tableBlock',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'columns', title: 'Columns', type: 'array', of: [defineArrayMember({ type: 'string' })], validation: (Rule) => Rule.required().min(1) }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
        }),
      ],
    }),
  ],
})
