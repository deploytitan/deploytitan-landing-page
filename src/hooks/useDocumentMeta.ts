import { useEffect } from 'react'

const DEFAULT_TITLE = 'DeployTitan — The Deployment Control Plane'
const DEFAULT_DESC = 'Progressive deployments, multi-cloud resilience, and risk intelligence for modern engineering teams.'

export function useDocumentMeta(title?: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title
    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const prevDesc = metaDesc?.content ?? ''

    document.title = title ? `${title} — DeployTitan` : DEFAULT_TITLE
    if (metaDesc) metaDesc.content = description ?? DEFAULT_DESC

    return () => {
      document.title = prevTitle
      if (metaDesc) metaDesc.content = prevDesc
    }
  }, [title, description])
}
