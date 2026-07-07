'use client'

import { useState } from 'react'
import type { DocumentActionComponent } from 'sanity'
import { useClient } from 'sanity'

import { apiVersion } from '../env'
import {
  materializeContentOpportunity,
  type ContentOpportunityRecord,
} from '../lib/materializeContentOpportunity'

export const createOpportunityPipelineAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion })
  const [isRunning, setIsRunning] = useState(false)

  if (props.type !== 'contentOpportunity') {
    return null
  }

  const document = (props.draft ?? props.published) as ContentOpportunityRecord | null
  if (!document?._id) {
    return null
  }

  const hasPipeline = Boolean(document.article?._ref)
  const isRejected = document.status === 'rejected'

  return {
    label: isRunning
      ? 'Creating Article Draft...'
      : hasPipeline
        ? 'Refresh Article Draft'
        : 'Create Article Draft',
    title: isRejected
      ? 'Rejected opportunities cannot be materialized into an article draft.'
      : 'Create or refresh the article draft and supporting evidence from this opportunity.',
    tone: 'primary',
    disabled: isRunning || isRejected,
    onHandle: async () => {
      setIsRunning(true)

      try {
        const result = await materializeContentOpportunity(client, document)
        window.alert(
          [
            'Created/updated article pipeline records:',
            `Research evidence: ${result.researchEvidenceIds.join(', ') || 'none'}`,
            `Article: ${result.articleId ?? 'linked existing article or none created'}`,
          ].join('\n'),
        )
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        window.alert(`Failed to create article draft: ${message}`)
      } finally {
        setIsRunning(false)
        props.onComplete()
      }
    },
  }
}
