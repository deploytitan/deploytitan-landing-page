'use client'

import { useState } from 'react'
import type { DocumentActionComponent, SanityClient } from 'sanity'
import { useClient } from 'sanity'

import { apiVersion } from '../env'

const cascadeDeleteTypes = new Set([
  'article',
  'articlePerformanceSnapshot',
  'contentBrief',
  'contentInsight',
  'contentOpportunity',
  'distributionAsset',
  'distributionAssetPerformanceSnapshot',
  'marketQuestion',
  'researchEvidence',
])

type CascadeDeleteTarget = {
  _id: string
  _type: string
  title?: string
  article?: Reference | null
  articles?: Reference[] | null
  contentOpportunity?: Reference | null
  distributionAsset?: Reference | null
  hubArticle?: Reference | null
  marketQuestion?: Reference | null
  matchedArticle?: Reference | null
  publicEvidence?: Reference[] | null
  researchEvidence?: Reference[] | null
  snapshot?: Reference | null
}

type Reference = {
  _ref?: string
}

function getPublishedDocumentId(id: string) {
  return id.replace(/^drafts\./, '')
}

function getDraftDocumentId(id: string) {
  const publishedId = getPublishedDocumentId(id)
  return `drafts.${publishedId}`
}

async function collectCascadeDeleteTargets(client: SanityClient, sourceId: string) {
  const targetIds = new Set([getPublishedDocumentId(sourceId), getDraftDocumentId(sourceId)])
  const targets = new Map<string, CascadeDeleteTarget>()

  let previousSize = 0
  while (targetIds.size !== previousSize) {
    previousSize = targetIds.size
    const linkedDocuments = await client.fetch<CascadeDeleteTarget[]>(
      `*[
        _id in path("**") &&
        _type in $types &&
        (_id in $ids || references($ids))
      ]{
        _id,
        _type,
        title,
        article,
        articles,
        contentOpportunity,
        distributionAsset,
        hubArticle,
        marketQuestion,
        matchedArticle,
        publicEvidence,
        researchEvidence,
        snapshot
      }`,
      { ids: Array.from(targetIds), types: Array.from(cascadeDeleteTypes) },
    )

    for (const document of linkedDocuments) {
      targetIds.add(document._id)
      targets.set(document._id, document)

      for (const reference of getOutboundPipelineReferences(document)) {
        targetIds.add(getPublishedDocumentId(reference._ref))
        targetIds.add(getDraftDocumentId(reference._ref))
      }
    }
  }

  return Array.from(targets.values())
}

function getOutboundPipelineReferences(document: CascadeDeleteTarget) {
  const references = [
    document.article,
    document.contentOpportunity,
    document.distributionAsset,
    document.hubArticle,
    document.marketQuestion,
    document.matchedArticle,
    document.snapshot,
    ...(document.articles ?? []),
    ...(document.publicEvidence ?? []),
    ...(document.researchEvidence ?? []),
  ]

  return references.filter((reference): reference is Required<Reference> => Boolean(reference?._ref))
}

export const deleteContentPipelineAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion })
  const [isDeleting, setIsDeleting] = useState(false)

  if (!cascadeDeleteTypes.has(props.type)) {
    return null
  }

  const document = props.draft ?? props.published
  const documentId = document?._id
  if (!documentId) {
    return null
  }

  return {
    label: isDeleting ? 'Deleting linked records...' : 'Cascade delete linked records',
    title: 'Delete this document, its draft, and content pipeline documents that reference them.',
    tone: 'critical',
    disabled: isDeleting,
    onHandle: async () => {
      setIsDeleting(true)

      try {
        const targets = await collectCascadeDeleteTargets(client, documentId)
        const sourceIds = new Set([getPublishedDocumentId(documentId), getDraftDocumentId(documentId)])
        const linkedTargets = targets.filter((target) => !sourceIds.has(target._id))
        const preview = linkedTargets
          .slice(0, 12)
          .map((target) => `- ${target._type}: ${target.title ?? target._id}`)
          .join('\n')

        const confirmed = window.confirm(
          [
            `Delete ${targets.length} document(s), including drafts and linked pipeline records?`,
            linkedTargets.length ? `\nLinked records:\n${preview}` : '',
            linkedTargets.length > 12 ? `\n...and ${linkedTargets.length - 12} more.` : '',
            '\nThis cannot be undone.',
          ].join(''),
        )

        if (!confirmed) return

        const transaction = client.transaction()
        for (const target of targets) {
          transaction.delete(target._id)
        }

        await transaction.commit()
        window.alert(`Deleted ${targets.length} document(s).`)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        window.alert(`Failed to cascade delete linked records: ${message}`)
      } finally {
        setIsDeleting(false)
        props.onComplete()
      }
    },
  }
}
