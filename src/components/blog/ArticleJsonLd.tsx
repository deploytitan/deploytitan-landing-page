import { getArticleCanonicalUrl, getArticleSeoDescription, type ArticleRecord, normalizeFaq } from '@/lib/articles'

export function ArticleJsonLd({ article }: { article: ArticleRecord }) {
  const canonicalUrl = getArticleCanonicalUrl(article)
  const description = getArticleSeoDescription(article)
  const faq = normalizeFaq(article.faq)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description,
    url: canonicalUrl,
    datePublished: article.publishedAt || undefined,
    dateModified: article._updatedAt || article.publishedAt || undefined,
    author: article.author?.name
      ? {
          '@type': 'Person',
          name: article.author.name,
          jobTitle: article.author.role || undefined,
        }
      : undefined,
    mainEntityOfPage: canonicalUrl,
  }

  const faqJsonLd = faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
    </>
  )
}
