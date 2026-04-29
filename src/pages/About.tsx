// Stub — full content in Phase 10
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-32">
      <p className="font-mono text-xs text-primary uppercase tracking-widest mb-4">About</p>
      <h1 className="font-display text-4xl font-medium tracking-[-0.02em] text-ink mb-6 text-center">We're building the deployment control plane.</h1>
      <p className="text-ink-secondary text-base max-w-md text-center mb-10">More about the team and our mission coming soon.</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/journey" className="inline-flex items-center gap-2 bg-ink text-surface px-6 py-3 text-sm font-medium" style={{ borderRadius: '2px' }}>Read our journey</Link>
        <Link to="/" className="inline-flex items-center gap-2 border border-line text-ink-secondary px-6 py-3 text-sm font-medium hover:border-primary/30 transition-colors" style={{ borderRadius: '2px' }}>← Back home</Link>
      </div>
    </div>
  )
}
