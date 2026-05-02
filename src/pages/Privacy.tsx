import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { Container } from '../components/shared/Container'

export default function Privacy() {
  useDocumentMeta('Privacy Policy | DeployTitan', 'DeployTitan Privacy Policy.')

  return (
    <section className="pt-28 pb-24">
      <Container width="3xl" padding="default">
        <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">Legal</p>
        <h1 className="text-3xl font-semibold text-ink mb-6">Privacy Policy</h1>
        <p className="text-ink-secondary leading-relaxed mb-4">
          Our full Privacy Policy is being drafted. Please check back soon.
        </p>
        <p className="text-ink-secondary leading-relaxed">
          Questions? Email us at{' '}
          <a href="mailto:legal@deploytitan.com" className="text-primary hover:underline">
            legal@deploytitan.com
          </a>
          .
        </p>
      </Container>
    </section>
  )
}
