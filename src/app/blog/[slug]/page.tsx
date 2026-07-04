import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TypedObject } from 'sanity'
import { type ArticleAnalyticsContext } from '@/lib/analytics'
import { SITE_URL } from '@/lib/site'
import { ArticleNewsletterSignup } from '@/components/blog/ArticleNewsletterSignup'
import { BlogPostAnalytics } from '@/components/blog/BlogPostAnalytics'
import { ArticleReaderExperience } from '@/components/blog/ArticleReaderExperience'
import { PortableTextRenderer } from '@/components/blog/PortableTextRenderer'
import { AuthorBadge } from '@/components/blog/AuthorBadge'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { ArticleJsonLd } from '@/components/blog/ArticleJsonLd'
import { TrackedArticleLink } from '@/components/blog/TrackedArticleLink'
import {
  type ArticleRecord,
  extractArticleHeadings,
  getArticleCanonicalUrl,
  getArticleLlmTextUrl,
  getArticleRobots,
  getArticleSeoDescription,
  getArticleSeoTitle,
  normalizeAuthor,
  normalizeFaq,
} from '@/lib/articles'
import { urlFor } from '@/sanity/lib/image'
import { articleBySlugQuery, articleSlugsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: articleSlugsQuery,
    perspective: 'published',
    stega: false,
  })

  return ((data as { slug: string }[]) ?? []).map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: articleBySlugQuery,
    params: { slug },
    stega: false,
  })

  const article = data as ArticleRecord | null
  if (!article) return {}

  const title = getArticleSeoTitle(article)
  const description = getArticleSeoDescription(article)
  const canonical = getArticleCanonicalUrl(article)
  const ogTitle = article.seo?.openGraphTitle || title
  const ogDescription = article.seo?.openGraphDescription || description
  const ogImage = article.seo?.openGraphImage?.asset
    ? urlFor(article.seo.openGraphImage as object)
        .width(1200)
        .height(630)
        .url()
    : article.coverImage?.asset
      ? urlFor(article.coverImage as object)
        .width(1200)
        .height(630)
        .url()
      : undefined

  return {
    title,
    description,
    alternates: {
      canonical,
      types: {
        'text/plain': getArticleLlmTextUrl(article),
      },
    },
    robots: getArticleRobots(article),
    openGraph: {
      type: 'article',
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      publishedTime: article.publishedAt ?? undefined,
      modifiedTime: article.updatedAt ?? article._updatedAt ?? article.publishedAt ?? undefined,
      authors: article.author?.name ? [article.author.name] : undefined,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: articleBySlugQuery,
    params: { slug },
  })

  const article = data as ArticleRecord | null
  if (!article) notFound()

  const publishedLabel = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null
  const headings = extractArticleHeadings((article.body as TypedObject[] | undefined) ?? [])
  const faq = normalizeFaq(article.faq)
  const author = normalizeAuthor(article.author)
  const articleContext: ArticleAnalyticsContext = {
    articleId: article._id,
    articleSlug: article.slug.current,
    canonicalUrl: getArticleCanonicalUrl(article),
    articleTitle: article.title,
    topicCluster: article.topicCluster?.name ?? '',
    articleType: article.seo?.structuredDataType ?? 'TechArticle',
    primaryKeyword: article.primaryKeyword ?? '',
    targetPersona: article.targetPersona?.name ?? '',
  }

  return (
    <>
      <ArticleJsonLd article={article} />

      <section className="blueprint-grid border-line border-b pt-28 pb-12">
        <div className="mx-auto w-full max-w-5xl px-4 lg:px-0">
          <Breadcrumbs className="mb-6" />

          {article.categories && article.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {article.categories.map((category) => (
                <Link
                  key={category.slug.current}
                  href={`/blog?category=${category.slug.current}`}
                  className="text-primary-accessible border-primary/25 border px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase"
                  style={{ borderRadius: '2px' }}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-ink mb-5 text-3xl leading-tight font-semibold lg:text-4xl">
            {article.title}
          </h1>

          {article.directAnswer && (
            <p className="text-ink-secondary mb-6 max-w-3xl text-lg leading-relaxed">
              {article.directAnswer}
            </p>
          )}

          <p className="mb-6">
            <Link
              href={getArticleLlmTextUrl(article)}
              className="text-primary-accessible hover:text-primary font-mono text-xs tracking-widest uppercase transition-colors"
            >
              Plain text / LLM version
            </Link>
          </p>

          {author && <AuthorBadge author={author} publishedAt={article.publishedAt ?? undefined} />}
        </div>
      </section>

      {article.coverImage?.asset && (
        <div className="border-line border-b">
          <div className="mx-auto w-full max-w-5xl">
            <div className="sharp-card border-line -mt-1 overflow-hidden border">
              <Image
                src={urlFor(article.coverImage as object)
                  .width(1400)
                  .url()}
                alt={article.coverImage.alt ?? article.title}
                width={1400}
                height={0}
                priority
                sizes="(min-width: 1024px) 896px, 100vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      )}

      <section className="py-16">
        <div className="mx-auto max-w-5xl">
          <div className="">
            <div className="xl:grid">
              <article className="min-w-0 px-4 lg:pr-4 lg:pl-0 xl:col-start-2">
                <BlogPostAnalytics articleContext={articleContext} />

                {publishedLabel && (
                  <p className="text-ink-tertiary mb-6 font-mono text-xs tracking-widest uppercase">
                    Published {publishedLabel}
                  </p>
                )}

                {headings.length > 0 && (
                  <aside className="mb-8 xl:hidden">
                    <section
                      aria-labelledby="on-this-page-mobile-heading"
                      className="border-line bg-surface-alt/50 rounded-[2px] border px-4 py-4"
                    >
                      <h2
                        id="on-this-page-mobile-heading"
                        className="text-ink-tertiary mb-3 font-mono text-xs tracking-widest uppercase"
                      >
                        On this page
                      </h2>
                      <ol className="space-y-2 text-sm">
                        {headings.map((heading) => (
                          <li
                            key={`mobile-${heading.level}-${heading.text}`}
                            className={heading.level > 2 ? 'pl-3' : ''}
                          >
                            <a
                              href={`#${heading.id}`}
                              className="text-ink-secondary hover:text-primary transition-colors"
                            >
                              {heading.text}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </section>
                  </aside>
                )}

                <ArticleReaderExperience
                  articleTitle={article.title}
                  articleSlug={article.slug.current}
                  articleContext={articleContext}
                >
                  {article.body && (
                    <PortableTextRenderer
                      value={article.body}
                      articleContext={articleContext}
                    />
                  )}
                </ArticleReaderExperience>

                {faq.length > 0 && (
                  <section
                    className="border-line mt-14 border-t pt-8"
                    aria-labelledby="faq-heading"
                  >
                    <h2 id="faq-heading" className="text-ink mb-5 text-2xl font-semibold">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-5">
                      {faq.map((item) => (
                        <div key={item.question}>
                          <h3 className="text-ink text-base font-semibold">{item.question}</h3>
                          <p className="text-ink-secondary mt-2 text-base leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {article.customerDiscoveryCta?.question && (
                  <section
                    className="border-primary/20 bg-primary/5 mt-14 rounded-[2px] border px-6 py-6"
                    aria-labelledby="discovery-heading"
                  >
                    <h2 id="discovery-heading" className="text-ink text-lg font-semibold">
                      Customer-Discovery Question
                    </h2>
                    <p className="text-ink-secondary mt-3 text-base leading-relaxed">
                      {article.customerDiscoveryCta.question}
                    </p>
                    {article.customerDiscoveryCta.supportingText && (
                      <p className="text-ink-tertiary mt-2 text-sm leading-relaxed">
                        {article.customerDiscoveryCta.supportingText}
                      </p>
                    )}
                    {article.customerDiscoveryCta.href && article.customerDiscoveryCta.label && (
                      <div className="mt-4">
                        <TrackedArticleLink
                          href={article.customerDiscoveryCta.href}
                          className="border-primary/30 text-primary-accessible hover:border-primary/50 hover:text-primary inline-flex items-center rounded-[2px] border px-4 py-2 text-sm font-medium transition-colors"
                          eventName={
                            /interview|demo|call/i.test(article.customerDiscoveryCta.label)
                              ? 'interviewRequested'
                              : /newsletter/i.test(article.customerDiscoveryCta.label)
                                ? 'newsletterSignup'
                                : 'researchCtaClicked'
                          }
                          eventPayload={{
                            ctaLabel: article.customerDiscoveryCta.label,
                            href: article.customerDiscoveryCta.href,
                          }}
                          articleContext={articleContext}
                        >
                          {article.customerDiscoveryCta.label}
                        </TrackedArticleLink>
                      </div>
                    )}
                  </section>
                )}

                {article.citations && article.citations.length > 0 && (
                  <section
                    className="border-line mt-14 border-t pt-8"
                    aria-labelledby="citations-heading"
                  >
                    <h2 id="citations-heading" className="text-ink mb-5 text-2xl font-semibold">
                      Citations
                    </h2>
                    <ol className="text-ink-secondary space-y-3 text-sm leading-relaxed">
                      {article.citations.map((citation, index) => (
                        <li key={`${citation.label}-${index}`}>
                          <span className="text-ink font-medium">{citation.label}</span>
                          {citation.publisher ? `, ${citation.publisher}` : ''}
                          {citation.url && (
                            <>
                              {' '}
                              <a
                                href={citation.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary underline underline-offset-2"
                              >
                                Source
                              </a>
                            </>
                          )}
                          {citation.notes ? ` — ${citation.notes}` : ''}
                        </li>
                      ))}
                    </ol>
                  </section>
                )}
              </article>

              <aside className="hidden max-w-64 xl:col-start-3 xl:block xl:min-w-0">
                <div className="sticky top-28 space-y-8">
                  {headings.length > 0 && (
                    <section aria-labelledby="on-this-page-heading">
                      <h2
                        id="on-this-page-heading"
                        className="text-ink-tertiary mb-4 font-mono text-xs tracking-widest uppercase"
                      >
                        On this page
                      </h2>
                      <ol className="space-y-3 text-sm">
                        {headings.map((heading) => (
                          <li
                            key={`${heading.level}-${heading.text}`}
                            className={heading.level > 2 ? 'pl-3' : ''}
                          >
                            <a
                              href={`#${heading.id}`}
                              className="text-ink-secondary hover:text-primary transition-colors"
                            >
                              {heading.text}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </section>
                  )}

                  {article.primaryQuestion && (
                    <section className="border-line border-t pt-6">
                      <h2 className="text-ink-tertiary mb-3 font-mono text-xs tracking-widest uppercase">
                        Primary question
                      </h2>
                      <p className="text-ink-secondary text-sm leading-relaxed">
                        {article.primaryQuestion}
                      </p>
                    </section>
                  )}

                  {article.topicCluster?.name && (
                    <section className="border-line border-t pt-6">
                      <h2 className="text-ink-tertiary mb-3 font-mono text-xs tracking-widest uppercase">
                        Topic cluster
                      </h2>
                      <p className="text-ink-secondary text-sm leading-relaxed">
                        {article.topicCluster.name}
                      </p>
                    </section>
                  )}

                  <section className="border-line border-t pt-6">
                    <h2 className="text-ink-tertiary mb-3 font-mono text-xs tracking-widest uppercase">
                      Machine-readable
                    </h2>
                    <div className="space-y-2 text-sm">
                      <Link
                        href={getArticleLlmTextUrl(article)}
                        className="text-ink-secondary hover:text-primary block transition-colors"
                      >
                        Plain text / LLM version
                      </Link>
                      <Link
                        href={`${SITE_URL}/feed.xml`}
                        className="text-ink-secondary hover:text-primary block transition-colors"
                      >
                        RSS feed
                      </Link>
                    </div>
                  </section>
                </div>
              </aside>
            </div>

            <div className="px-4 lg:px-0">
              {author && (
                <div className="border-line mt-16 border-t pt-8">
                  <AuthorBadge
                    author={author}
                    publishedAt={article.publishedAt ?? undefined}
                    showBio
                  />
                </div>
              )}

              {article.relatedArticles && article.relatedArticles.length > 0 && (
                <section
                  className="border-line mt-14 border-t pt-8"
                  aria-labelledby="related-heading"
                >
                  <h2 id="related-heading" className="text-ink mb-5 text-2xl font-semibold">
                    Related Articles
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {article.relatedArticles.map((relatedArticle) => (
                      <TrackedArticleLink
                        key={relatedArticle._id}
                        href={`/blog/${relatedArticle.slug.current}`}
                        eventName="relatedArticleClicked"
                        eventPayload={{
                          destinationSlug: relatedArticle.slug.current,
                          linkContext: 'related-articles',
                        }}
                        articleContext={articleContext}
                        className="border-line hover:border-primary/25 rounded-[2px] border px-4 py-4 transition-colors"
                      >
                        <h3 className="text-ink text-base font-semibold">{relatedArticle.title}</h3>
                        {relatedArticle.excerpt && (
                          <p className="text-ink-secondary mt-2 text-sm leading-relaxed">
                            {relatedArticle.excerpt}
                          </p>
                        )}
                      </TrackedArticleLink>
                    ))}
                  </div>
                </section>
              )}

              <ArticleNewsletterSignup articleContext={articleContext} />

              <div className="mt-10">
                <Link
                  href="/blog"
                  className="text-primary-accessible hover:text-primary text-sm font-medium transition-colors"
                >
                  ← Back to blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
