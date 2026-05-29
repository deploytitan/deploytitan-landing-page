import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-32 relative">
      <div className="absolute inset-0 hero-grid pointer-events-none opacity-50" aria-hidden="true" />
      <div className="relative text-center">
        <p className="font-mono text-xs text-primary-accessible dark:text-primary uppercase tracking-widest mb-6">404</p>
        <h1 className="font-display text-5xl font-medium tracking-[-0.02em] text-ink mb-4">Page not found.</h1>
        <p className="text-ink-secondary text-base max-w-sm mx-auto mb-10">
          This route doesn't exist. Maybe it was moved, or maybe you caught us mid-deploy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="inline-flex items-center gap-2 bg-ink text-surface px-6 py-3 text-sm font-medium" style={{ borderRadius: '2px' }}>← Back home</Link>
          <Link href="/docs" className="inline-flex items-center gap-2 border border-line text-ink-secondary px-6 py-3 text-sm font-medium hover:border-primary/30 transition-colors" style={{ borderRadius: '2px' }}>Documentation</Link>
        </div>
      </div>
    </div>
  )
}
