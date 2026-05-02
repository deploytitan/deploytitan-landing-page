import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { Container } from '../components/shared/Container'

export default function Status() {
  useDocumentMeta('System Status | DeployTitan', 'Current system status for DeployTitan services.')

  return (
    <section className="pt-28 pb-24">
      <Container width="3xl" padding="default">
        <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
          Infrastructure
        </p>
        <h1 className="text-3xl font-semibold text-ink mb-6">System Status</h1>
        <div className="flex items-center gap-2.5 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
          <span className="text-sm font-medium text-ink">All systems operational</span>
        </div>
        <p className="text-ink-secondary leading-relaxed">
          For real-time incident updates, follow{' '}
          <a
            href="https://twitter.com/deploytitan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            @deploytitan
          </a>{' '}
          or email{' '}
          <a href="mailto:support@deploytitan.com" className="text-primary hover:underline">
            support@deploytitan.com
          </a>
          .
        </p>
      </Container>
    </section>
  )
}
