import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Terms() {
  useDocumentMeta('Terms of Service | DeployTitan', 'DeployTitan Terms of Service.')

  return (
    <section className="pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">Legal</p>
        <h1 className="text-3xl font-semibold text-ink mb-6">Terms of Service</h1>
        <p className="text-ink-secondary leading-relaxed mb-4">
          Our full Terms of Service are being drafted. Please check back soon.
        </p>
        <p className="text-ink-secondary leading-relaxed">
          Questions? Email us at{' '}
          <a href="mailto:legal@deploytitan.com" className="text-primary hover:underline">
            legal@deploytitan.com
          </a>
          .
        </p>
      </div>
    </section>
  )
}
