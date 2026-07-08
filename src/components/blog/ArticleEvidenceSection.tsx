import type { ArticleRecord } from '@/lib/articles'
import { hasDeployTitanResearchNote, normalizePublicEvidence } from '@/lib/articles'

function formatDateLabel(value?: string | null) {
  if (!value) return null

  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

type ArticleEvidenceSectionProps = {
  article: Pick<
    ArticleRecord,
    'citations' | 'publicEvidence' | 'methodologyNote' | 'lastReviewedAt' | 'updatedAt' | '_updatedAt'
  >
}

export function ArticleEvidenceSection({ article }: ArticleEvidenceSectionProps) {
  const citations = article.citations ?? []
  const publicEvidence = normalizePublicEvidence(article.publicEvidence)
  const hasResearchNote = hasDeployTitanResearchNote(article.publicEvidence)
  const lastReviewedLabel = formatDateLabel(article.lastReviewedAt)
  const updatedLabel = formatDateLabel(article.updatedAt ?? article._updatedAt)
  const hasEvidenceContent = citations.length > 0 || publicEvidence.length > 0

  if (!hasEvidenceContent) {
    return null
  }

  return (
    <section className="border-line mt-14 border-t pt-8" aria-labelledby="evidence-sources-heading">
      <div className="rounded-[var(--radius-serious)] border border-line bg-surface-alt/45 p-5">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <h2
            id="evidence-sources-heading"
            className="text-ink text-xl font-semibold"
          >
            Evidence and Sources
          </h2>
          <span className="text-ink-tertiary font-mono text-[10px] tracking-widest uppercase">
            Trust surface
          </span>
        </div>

        {article.methodologyNote && (
          <div className="mb-6">
            <p className="text-ink-tertiary mb-2 font-mono text-[10px] tracking-widest uppercase">
              Methodology
            </p>
            <p className="text-ink-secondary text-sm leading-relaxed">{article.methodologyNote}</p>
          </div>
        )}

        {publicEvidence.length > 0 && (
          <div className="mb-6">
            <p className="text-ink-tertiary mb-3 font-mono text-[10px] tracking-widest uppercase">
              Public Evidence
            </p>
            <div className="grid gap-3">
              {publicEvidence.map((item) => (
                <article key={item._id} className="rounded-[var(--radius-serious)] border border-line bg-surface px-4 py-4">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-ink">{item.title ?? 'Evidence'}</h3>
                    {item.evidenceStrength && (
                      <span className="text-ink-tertiary font-mono text-[10px] tracking-widest uppercase">
                        {item.evidenceStrength}
                      </span>
                    )}
                    {item.visibility === 'publicSummaryOnly' && (
                      <span className="text-primary-accessible font-mono text-[10px] tracking-widest uppercase">
                        Sanitized summary
                      </span>
                    )}
                  </div>
                  <p className="text-ink-secondary text-sm leading-relaxed">{item.summary}</p>
                  {(item.source?.label || item.source?.url || item.source?.publisher) && (
                    <p className="mt-3 text-xs leading-relaxed text-ink-tertiary">
                      <span className="font-medium text-ink">Source:</span>{' '}
                      {item.source?.url ? (
                        <a
                          href={item.source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline underline-offset-2 transition-colors hover:text-primary-dark"
                        >
                          {item.source.label ?? item.source.publisher ?? item.source.url}
                        </a>
                      ) : (
                        <span>{item.source?.label ?? item.source?.publisher}</span>
                      )}
                      {item.source?.publisher &&
                        item.source?.label &&
                        item.source.publisher !== item.source.label && (
                          <span>{` · ${item.source.publisher}`}</span>
                        )}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}

        {hasResearchNote && (
          <div className="mb-6 rounded-[var(--radius-serious)] border border-primary/20 bg-primary/5 px-4 py-3">
            <p className="text-ink-tertiary mb-1 font-mono text-[10px] tracking-widest uppercase">
              DeployTitan Research
            </p>
            <p className="text-ink-secondary text-sm leading-relaxed">
              Some claims in this article are informed by DeployTitan&apos;s internal product and field research. Where the underlying material is sensitive, we publish a sanitized summary instead of the raw artifact.
            </p>
          </div>
        )}

        {citations.length > 0 && (
          <div className="mb-6">
            <p className="text-ink-tertiary mb-3 font-mono text-[10px] tracking-widest uppercase">
              Citations
            </p>
            <ol className="space-y-3 text-sm">
              {citations.map((citation, index) => (
                <li key={`${citation.label ?? 'citation'}-${index}`} className="text-ink-secondary leading-relaxed">
                  <span className="mr-2 font-medium text-ink">{index + 1}.</span>
                  {citation.url ? (
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 transition-colors hover:text-primary-dark"
                    >
                      {citation.label ?? citation.url}
                    </a>
                  ) : (
                    <span className="text-ink">{citation.label ?? 'Source'}</span>
                  )}
                  {citation.publisher && <span>{` · ${citation.publisher}`}</span>}
                  {citation.notes && <span>{` · ${citation.notes}`}</span>}
                </li>
              ))}
            </ol>
          </div>
        )}

        {(lastReviewedLabel || updatedLabel) && (
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-tertiary">
            {lastReviewedLabel && (
              <p>
                <span className="font-mono tracking-widest uppercase">Last reviewed</span>{' '}
                {lastReviewedLabel}
              </p>
            )}
            {updatedLabel && (
              <p>
                <span className="font-mono tracking-widest uppercase">Last updated</span>{' '}
                {updatedLabel}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
