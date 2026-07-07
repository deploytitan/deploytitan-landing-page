'use client'

import { useState } from 'react'
import type { DocumentActionComponent, SanityDocument } from 'sanity'
import { useClient } from 'sanity'

import { apiVersion } from '../env'
import { articleType } from '../schemas/article'
import { contentOpportunityType } from '../schemas/contentOpportunity'
import {
  contentKpiTargetType,
  customerDiscoveryCtaType,
  faqItemType,
  seoMetadataType,
  sourceCitationType,
  targetPersonaType,
  topicClusterType,
} from '../schemas/objects'

type SchemaField = {
  name: string
  title?: string
  type?: string
  hidden?: boolean
  readOnly?: boolean
  fields?: SchemaField[]
  of?: SchemaField[]
}

type SchemaType = {
  name: string
  title?: string
  fields?: SchemaField[]
}

const UNANSWERED = 'TODO: unanswered'

const importableDocumentTypes: Record<string, SchemaType> = {
  article: articleType as SchemaType,
  contentOpportunity: contentOpportunityType as SchemaType,
}

const nestedObjectTypes = [
  contentKpiTargetType,
  customerDiscoveryCtaType,
  faqItemType,
  seoMetadataType,
  sourceCitationType,
  targetPersonaType,
  topicClusterType,
] as SchemaType[]

const nestedObjectTypeByName = new Map(nestedObjectTypes.map((type) => [type.name, type]))

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)

const isUnanswered = (value: unknown) =>
  value == null || (typeof value === 'string' && (!value.trim() || value.trim() === UNANSWERED))

const objectFieldsFor = (field: SchemaField) =>
  field.fields ?? nestedObjectTypeByName.get(field.type ?? '')?.fields

const fieldEntriesToObject = (value: unknown) => {
  if (!Array.isArray(value)) return isRecord(value) ? value : null

  const entries = value
    .map((entry) => {
      if (!isRecord(entry)) return null
      const fieldName = String(entry.fieldName ?? entry.name ?? '').trim()
      if (!fieldName) return null
      return [fieldName, entry.value] as const
    })
    .filter((entry): entry is readonly [string, unknown] => Boolean(entry))

  return entries.length ? Object.fromEntries(entries) : null
}

const keyFor = (prefix: string, value: string, index: number) =>
  `${prefix}-${value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24) || index}`

const portableTextBlock = (text: string, style = 'normal', index = 0) => ({
  _key: keyFor('block', text, index),
  _type: 'block',
  style,
  markDefs: [],
  children: [
    {
      _key: keyFor('span', text, index),
      _type: 'span',
      text,
      marks: [],
    },
  ],
})

const markdownToPortableText = (markdown: string) =>
  markdown
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk, index) => {
      const heading = chunk.match(/^(#{1,6})\s+(.+)$/)
      if (heading) return portableTextBlock(heading[2].trim(), `h${Math.min(heading[1].length, 6)}`, index)
      return portableTextBlock(chunk.replace(/\n+/g, ' '), 'normal', index)
    })

const plainBlocksToPortableText = (value: unknown[]) =>
  value
    .map((item, index) => {
      if (isRecord(item) && item._type === 'block') return item
      if (isRecord(item) && typeof item.text === 'string') {
        return portableTextBlock(item.text, String(item.style ?? 'normal'), index)
      }
      if (typeof item === 'string') return portableTextBlock(item, 'normal', index)
      return null
    })
    .filter(Boolean)

const normalizeReference = (value: unknown) => {
  if (typeof value === 'string' && value.trim() && value.trim() !== UNANSWERED) {
    return { _type: 'reference', _ref: value.trim() }
  }

  if (!isRecord(value)) return undefined
  const ref = String(value.referenceId ?? value._ref ?? '').trim()
  if (!ref || ref === UNANSWERED) return undefined
  return { _type: 'reference', _ref: ref, ...(value.weak || value._weak ? { _weak: true } : {}) }
}

const normalizeValue = (field: SchemaField, value: unknown): unknown => {
  if (isUnanswered(value)) return undefined

  if (field.type === 'slug') {
    const current = isRecord(value) ? String(value.current ?? '').trim() : String(value).trim()
    return current ? { _type: 'slug', current } : undefined
  }

  if (field.type === 'reference') return normalizeReference(value)

  if (field.type === 'number') {
    const number = Number(value)
    return Number.isFinite(number) ? number : undefined
  }

  if (field.type === 'boolean') return Boolean(value)

  if (field.type === 'array') {
    if (typeof value === 'string' && field.of?.some((member) => member.type === 'block')) {
      return markdownToPortableText(value)
    }

    if (!Array.isArray(value)) return undefined
    if (field.of?.some((member) => member.type === 'block')) return plainBlocksToPortableText(value)

    const member = field.of?.[0]
    return value
      .map((item, index) => {
        if (member?.type === 'reference') return normalizeReference(item)
        if (member?.type === 'string') return typeof item === 'string' ? item.trim() : String(item ?? '').trim()

        const itemObject = fieldEntriesToObject(item)
        if (!itemObject) return item
        const memberFields = member?.fields ?? nestedObjectTypeByName.get(member?.type ?? '')?.fields
        const normalized = normalizeObjectFields(memberFields, itemObject)
        return Object.keys(normalized).length
          ? { _key: keyFor('item', JSON.stringify(normalized), index), _type: member?.type, ...normalized }
          : undefined
      })
      .filter((item) => !isUnanswered(item))
  }

  const objectFields = objectFieldsFor(field)
  if (objectFields?.length) {
    const sourceObject = fieldEntriesToObject(value)
    if (!sourceObject) return undefined
    const normalized = normalizeObjectFields(objectFields, sourceObject)
    return Object.keys(normalized).length ? { _type: field.type, ...normalized } : undefined
  }

  return value
}

function normalizeObjectFields(fields: SchemaField[] | undefined, source: Record<string, unknown>) {
  const next: Record<string, unknown> = {}

  for (const field of fields ?? []) {
    if (!field.name || field.hidden || field.readOnly) continue
    const normalized = normalizeValue(field, source[field.name])
    if (normalized !== undefined) next[field.name] = normalized
  }

  return next
}

const parseImportPayload = (schemaType: SchemaType, rawJson: string) => {
  const parsed = JSON.parse(rawJson) as unknown
  const payloadDocument = isRecord(parsed) && isRecord(parsed.document) ? parsed.document : parsed
  const fieldSource = isRecord(payloadDocument) && Array.isArray(payloadDocument.fields)
    ? fieldEntriesToObject(payloadDocument.fields)
    : isRecord(payloadDocument)
      ? payloadDocument
      : null

  if (!fieldSource) throw new Error('JSON must be an object or a { document: { fields: [...] } } payload.')
  return normalizeObjectFields(schemaType.fields, fieldSource)
}

export const importDocumentFromLLMAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion })
  const [label, setLabel] = useState('Import from ChatGPT')
  const schemaType = importableDocumentTypes[props.type]

  if (!schemaType) return null

  const document = (props.draft ?? props.published) as SanityDocument | null
  if (!document?._id) return null

  return {
    label,
    title: 'Read JSON from your clipboard and patch matching fields onto this document.',
    tone: 'primary',
    onHandle: async () => {
      try {
        const rawJson = await navigator.clipboard.readText()
        const patch = parseImportPayload(schemaType, rawJson)
        const keys = Object.keys(patch)

        if (!keys.length) {
          window.alert('No matching non-empty fields found in the clipboard JSON.')
          return
        }

        const confirmed = window.confirm(
          `Import ${keys.length} field${keys.length === 1 ? '' : 's'} into this ${schemaType.title ?? schemaType.name}?\n\n${keys.join(', ')}`,
        )
        if (!confirmed) return

        await client.patch(document._id).set(patch).commit()
        setLabel('Imported from ChatGPT')
        window.setTimeout(() => setLabel('Import from ChatGPT'), 2000)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        window.alert(`Could not import ChatGPT JSON: ${message}`)
      } finally {
        props.onComplete()
      }
    },
  }
}
