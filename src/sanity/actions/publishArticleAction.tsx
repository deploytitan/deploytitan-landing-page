'use client'

import type { DocumentActionComponent, SanityDocument } from 'sanity'
import { useClient } from 'sanity'

import { apiVersion } from '../env'

function getDraftId(id: string) {
  return id.startsWith('drafts.') ? id : `drafts.${id}`
}

export function createPublishArticleAction(
  publishAction: DocumentActionComponent,
): DocumentActionComponent {
  const PublishArticleAction: DocumentActionComponent = (props) => {
    const client = useClient({ apiVersion })
    const originalAction = publishAction(props)

    if (!originalAction || props.type !== 'article') {
      return originalAction
    }

    const document = (props.draft ?? props.published) as SanityDocument | null
    const publishedAt = typeof document?.publishedAt === 'string' ? document.publishedAt : undefined

    return {
      ...originalAction,
      label: originalAction.label === 'Publish' ? 'Publish article' : originalAction.label,
      onHandle: async () => {
        await client
          .patch(getDraftId(props.id))
          .set({ status: 'published' })
          .setIfMissing({ publishedAt: publishedAt ?? new Date().toISOString() })
          .commit({ autoGenerateArrayKeys: true })

        originalAction.onHandle?.()
      },
    }
  }

  PublishArticleAction.action = publishAction.action
  PublishArticleAction.displayName = 'PublishArticleAction'

  return PublishArticleAction
}
