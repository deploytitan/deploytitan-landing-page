import { urlFor } from '@/sanity/lib/image'
import {
  getArticleCanonicalUrl,
  getArticleLlmTextUrl,
  getArticleSeoDescription,
  getArticleSeoTitle,
  normalizePublicEvidence,
  type ArticleRecord,
  normalizeFaq,
} from '@/lib/articles'
import { ORGANIZATION_LOGO, ORGANIZATION_NAME, SITE_URL } from '@/lib/site'

export function ArticleJsonLd({ article }: { article: ArticleRecord }) {
  const canonicalUrl = getArticleCanonicalUrl(article)
  const description = getArticleSeoDescription(article)
  const faq = normalizeFaq(article.faq)
  const publicEvidence = normalizePublicEvidence(article.publicEvidence)
  const ogImage = article.seo?.openGraphImage?.asset
    ? urlFor(article.seo.openGraphImage as object).width(1200).height(630).url()
    : article.coverImage?.asset
      ? urlFor(article.coverImage as object).width(1200).height(630).url()
      : undefined
  const authorUrl = article.author?.slug?.current
    ? `${SITE_URL}/about#${article.author.slug.current}`
    : undefined

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': article.seo?.structuredDataType || 'TechArticle',
    headline: getArticleSeoTitle(article),
    description,
    url: canonicalUrl,
    image: ogImage ? [ogImage] : undefined,
    datePublished: article.publishedAt || undefined,
    dateModified: article.updatedAt || article.lastReviewedAt || article._updatedAt || article.publishedAt || undefined,
    author: article.author?.name
      ? {
          '@type': 'Person',
          name: article.author.name,
          url: authorUrl,
          jobTitle: article.author.role || undefined,
          description: article.author.bio || undefined,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: ORGANIZATION_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: ORGANIZATION_LOGO,
      },
    },
    mainEntityOfPage: canonicalUrl,
    about: article.topicCluster?.name
      ? {
          '@type': 'Thing',
          name: article.topicCluster.name,
        }
      : undefined,
    keywords: [article.primaryKeyword, ...(article.secondaryKeywords ?? [])]
      .filter(Boolean)
      .join(', '),
    citation: [
      ...(article.citations ?? []).map((citation) => citation.url || citation.label).filter(Boolean),
      ...publicEvidence.map((item) => item.source?.url || item.source?.label).filter(Boolean),
    ],
    subjectOf: {
      '@type': 'DigitalDocument',
      name: 'Plain text / LLM version',
      encodingFormat: 'text/plain',
      url: getArticleLlmTextUrl(article),
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </>
  )
}
