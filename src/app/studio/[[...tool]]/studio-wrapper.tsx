'use client'

import dynamic from 'next/dynamic'

// NextStudio accesses `window` on init — ssr: false must live in a client component
const StudioClient = dynamic(() => import('./studio-client'), { ssr: false })

export function StudioWrapper() {
  return <StudioClient />
}
