// Stub — full content in Phase 10
import Link from 'next/link'

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-32">
      <p className="font-mono text-xs text-primary uppercase tracking-widest mb-4">Blog</p>
      <h1 className="font-display text-4xl font-medium tracking-[-0.02em] text-ink mb-6 text-center">The DeployTitan Blog</h1>
      <p className="text-ink-secondary text-base max-w-md text-center mb-10">Engineering deep-dives, product updates, and deployment best practices. Coming soon.</p>
      <Link href="/" className="inline-flex items-center gap-2 border border-line text-ink-secondary px-6 py-3 text-sm font-medium hover:border-primary/30 transition-colors" style={{ borderRadius: '2px' }}>← Back home</Link>
    </div>
  )
}
