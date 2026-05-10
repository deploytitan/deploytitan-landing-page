'use client'

import dynamic from 'next/dynamic'

// Lazy-load Quickstart so the Shiki/Oniguruma WASM chunk (~622 KB) is split
// out of the initial bundle and only fetched after above-the-fold paint.
export const QuickstartLazy = dynamic(
  () => import('./Quickstart').then((m) => ({ default: m.Quickstart })),
  { ssr: false },
)
