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

  const hasPipeline = Boolean(document.marketQuestion?._ref && document.contentBrief?._ref)
  const isRejected = document.status === 'rejected'

  return {
    label: isRunning
      ? 'Creating Pipeline...'
      : hasPipeline
        ? 'Refresh Brief Pipeline'
        : 'Create Brief Pipeline',
    title: isRejected
      ? 'Rejected opportunities cannot be materialized into briefs.'
      : 'Create or refresh downstream content records from this opportunity.',
    tone: 'primary',
    disabled: isRunning || isRejected,
    onHandle: async () => {
      setIsRunning(true)

      try {
        const result = await materializeContentOpportunity(client, document)
        window.alert(
          [
            'Created/updated content pipeline records:',
            `Market question: ${result.marketQuestionId}`,
            `Research evidence: ${result.researchEvidenceIds.join(', ') || 'none'}`,
            `Content brief: ${result.contentBriefId}`,
            `Article: ${result.articleId ?? 'linked existing article or none created'}`,
          ].join('\n'),
        )
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        window.alert(`Failed to create brief pipeline: ${message}`)
      } finally {
        setIsRunning(false)
        props.onComplete()
      }
    },
  }
}
