'use client'

import { useState } from 'react'
import type { DocumentActionComponent, SanityDocument } from 'sanity'

import { articleType } from '../schemas/article'
import { contentOpportunityType } from '../schemas/contentOpportunity'
import {
  calloutBlockType,
  contentKpiTargetType,
  customerDiscoveryCtaType,
  diagramBlockType,
  faqItemType,
  seoMetadataType,
  sourceCitationType,
  tableBlockType,
  targetPersonaType,
  topicClusterType,
  workflowChecklistItemType,
} from '../schemas/objects'

type SchemaField = {
  name: string
  title?: string
  type?: string
  hidden?: boolean
  fields?: SchemaField[]
  of?: SchemaField[]
}

type SchemaType = {
  name: string
  title?: string
  fields?: SchemaField[]
}

type PromptField = {
  fieldName: string
  label: string
  value: unknown
}

const UNANSWERED = 'TODO: unanswered'

const copyableDocumentTypes: Record<string, SchemaType> = {
  article: articleType as SchemaType,
  contentOpportunity: contentOpportunityType as SchemaType,
}

const nestedObjectTypes = [
  calloutBlockType,
  contentKpiTargetType,
  customerDiscoveryCtaType,
  diagramBlockType,
  faqItemType,
  seoMetadataType,
  sourceCitationType,
  tableBlockType,
  targetPersonaType,
  topicClusterType,
  workflowChecklistItemType,
] as SchemaType[]

const nestedObjectTypeByName = new Map(nestedObjectTypes.map((type) => [type.name, type]))

const labelForField = (field: SchemaField) => field.title ?? field.name

const objectFieldsFor = (field: SchemaField) =>
  field.fields ?? nestedObjectTypeByName.get(field.type ?? '')?.fields

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)

const isEmptyValue = (value: unknown): boolean => {
  if (value == null) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (isRecord(value)) {
    const meaningfulKeys = Object.keys(value).filter((key) => !key.startsWith('_'))
    return meaningfulKeys.length === 0
  }
  return false
}

const plainTextFromPortableText = (blocks: unknown[]) =>
  blocks
    .map((block) => {
      if (!isRecord(block) || block._type !== 'block') return null
      const children = Array.isArray(block.children) ? block.children : []
      const text = children
        .map((child) => (isRecord(child) && typeof child.text === 'string' ? child.text : ''))
        .join('')
        .trim()
      return text ? { style: block.style ?? 'normal', text } : null
    })
    .filter(Boolean)

const formatReference = (value: Record<string, unknown>) => ({
  referenceId: value._ref ?? UNANSWERED,
  weak: value._weak ?? false,
})

const formatObjectFields = (
  fields: SchemaField[] | undefined,
  value: Record<string, unknown>,
): PromptField[] | Record<string, unknown> => {
  if (!fields?.length) return value

  return fields
    .filter((field) => !field.hidden)
    .map((field) => ({
      fieldName: field.name,
      label: labelForField(field),
      value: formatFieldValue(field, value[field.name]),
    }))
}

const formatObjectValue = (field: SchemaField, value: Record<string, unknown>) => {
  if (field.type === 'reference') return formatReference(value)
  if (field.type === 'slug') return value.current ?? UNANSWERED

  const objectFields = objectFieldsFor(field)
  if (objectFields?.length) return formatObjectFields(objectFields, value)

  const usefulEntries = Object.fromEntries(
    Object.entries(value).filter(([key]) => !key.startsWith('_')),
  )

  return Object.keys(usefulEntries).length ? usefulEntries : UNANSWERED
}

const formatArrayItem = (arrayField: SchemaField, value: unknown) => {
  if (isEmptyValue(value)) return UNANSWERED

  if (isRecord(value)) {
    const memberTypeName = typeof value._type === 'string' ? value._type : arrayField.of?.[0]?.type
    const memberType = nestedObjectTypeByName.get(memberTypeName ?? '')
    const inlineMember = arrayField.of?.find((member) => member.type === memberTypeName)
    const memberFields = inlineMember?.fields ?? memberType?.fields

    if (memberTypeName === 'block') return value
    if (memberFields?.length) return formatObjectFields(memberFields, value)
    if (value._ref) return formatReference(value)
    return formatObjectValue({ ...arrayField, type: memberTypeName }, value)
  }

  return value
}

const formatFieldValue = (field: SchemaField, value: unknown): unknown => {
  if (isEmptyValue(value)) {
    const objectFields = objectFieldsFor(field)
    return objectFields?.length ? formatObjectFields(objectFields, {}) : UNANSWERED
  }

  if (field.type === 'array') {
    const items = Array.isArray(value) ? value : []
    if (field.of?.some((member) => member.type === 'block')) {
      const portableText = plainTextFromPortableText(items)
      return portableText.length ? portableText : items.map((item) => formatArrayItem(field, item))
    }
    return items.map((item) => formatArrayItem(field, item))
  }

  if (isRecord(value)) return formatObjectValue(field, value)

  return value
}

const buildPromptPayload = (schemaType: SchemaType, document: SanityDocument) => ({
  prompt:
    'Use this Sanity document as structured source material for content preparation. Field labels and field names are included. Treat "TODO: unanswered" as fields that need suggested answers or completion.',
  document: {
    sanityId: document._id,
    documentType: schemaType.title ?? schemaType.name,
    schemaType: schemaType.name,
    fields: formatObjectFields(schemaType.fields, document),
  },
})

export const copyDocumentForLLMAction: DocumentActionComponent = (props) => {
  const [label, setLabel] = useState('Copy for ChatGPT')
  const schemaType = copyableDocumentTypes[props.type]

  if (!schemaType) return null

  const document = (props.draft ?? props.published) as SanityDocument | null
  if (!document?._id) return null

  return {
    label,
    title: 'Copy a labeled JSON prompt with blank fields included for ChatGPT.',
    onHandle: async () => {
      try {
        const payload = buildPromptPayload(schemaType, document)
        await navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
        setLabel('Copied for ChatGPT')
        window.setTimeout(() => setLabel('Copy for ChatGPT'), 2000)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        window.alert(`Could not copy document prompt: ${message}`)
      } finally {
        props.onComplete()
      }
    },
  }
}
