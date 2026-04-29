// Stub — will redirect to VITE_DOCS_URL or be replaced in Phase 10
import { Link } from 'react-router-dom'

export default function Docs() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-32">
      <p className="font-mono text-xs text-primary uppercase tracking-widest mb-4">Documentation</p>
      <h1 className="font-display text-4xl font-medium tracking-[-0.02em] text-ink mb-6 text-center">DeployTitan Docs</h1>
      <p className="text-ink-secondary text-base max-w-md text-center mb-10">Full documentation coming soon. Install the CLI and run <code className="font-mono text-sm bg-surface-alt px-1.5 py-0.5 rounded-sm border border-line">dt --help</code> to get started.</p>
      <Link to="/" className="inline-flex items-center gap-2 border border-line text-ink-secondary px-6 py-3 text-sm font-medium hover:border-primary/30 transition-colors" style={{ borderRadius: '2px' }}>← Back home</Link>
    </div>
  )
}
