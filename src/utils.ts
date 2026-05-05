// Pure utilities — no React hooks, safe to import from Server Components
export { cn, sleep } from './lib/utils'

// Hook re-exports for backward compatibility — these are client-only
export { useScrollReveal, useStaggerReveal, useSpotlight } from './hooks/animations'
