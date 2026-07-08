import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import readingTime from 'reading-time'
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
import { ArticleEvidenceSection } from '@/components/blog/ArticleEvidenceSection'
import { ArticleTableOfContents } from '@/components/blog/ArticleTableOfContents'
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
  portableTextToPlainText,
} from '@/lib/articles'
import { urlFor } from '@/sanity/lib/image'
import { articleBySlugQuery, articleSlugsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'

interface Props {
  params: Promise<{ slug: string }>
}

function estimateReadTimeMinutes(article: ArticleRecord) {
  const articleText = portableTextToPlainText((article.body as TypedObject[] | undefined) ?? [])

  return Math.max(1, Math.ceil(readingTime(articleText, { wordsPerMinute: 220 }).minutes))
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
    stega: false,
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
  const readTimeMinutes = estimateReadTimeMinutes(article)
  const articleType =
    article.seo?.structuredDataType || (article.contentType === 'essay' ? 'Article' : 'TechArticle')
  const articleContext: ArticleAnalyticsContext = {
    articleId: article._id,
    articleSlug: article.slug.current,
    canonicalUrl: getArticleCanonicalUrl(article),
    articleTitle: article.title,
    topicCluster: article.topicCluster?.name ?? '',
    articleType,
    primaryKeyword: article.primaryKeyword ?? '',
    targetPersona: article.targetPersona?.name ?? '',
  }

  return (
    <>
      <ArticleJsonLd article={article} />

      <section className="border-line border-b bg-[linear-gradient(180deg,rgba(201,168,76,0.09)_0%,rgba(201,168,76,0.04)_28%,rgba(250,250,249,0)_100%)] pt-28 pb-12 dark:bg-[linear-gradient(180deg,rgba(212,180,84,0.08)_0%,rgba(212,180,84,0.03)_24%,rgba(13,12,10,0)_100%)]">
        <div className="mx-auto w-full max-w-5xl gap-10 px-0">
          <div className="min-w-0 px-4 lg:px-0">
            <div className="flex min-w-0 flex-col justify-between gap-4 lg:flex-row lg:items-center lg:gap-6">
              <Breadcrumbs className="lg:max-w-[34rem]" />

              <div className="flex gap-4">
                {article.categories && article.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {article.categories.map((category) => (
                      <Link
                        key={category.slug.current}
                        href={`/blog?category=${category.slug.current}`}
                        className="text-primary-accessible border-primary/25 bg-surface/80 inline-flex items-center border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] uppercase"
                        style={{ borderRadius: '999px' }}
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 lg:mt-0">
              <h1 className="text-ink mb-5 text-4xl leading-[1.05] font-[family:var(--font-serif)] font-medium tracking-[-0.035em] lg:text-6xl">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {publishedLabel && (
                  <p className="text-ink-tertiary font-mono text-[11px] tracking-[0.18em] uppercase">
                    Published {publishedLabel}
                  </p>
                )}
                <div className="text-ink-tertiary bg-line hidden h-3 w-px sm:block" />
                {author && (
                  <p className="text-ink-secondary text-sm leading-6">
                    By <span className="text-ink font-medium">{author.name}</span>
                    {author.role ? ` · ${author.role}` : ''}
                  </p>
                )}
                <div className="text-ink-tertiary bg-line hidden h-3 w-px sm:block" />
                <p className="text-ink-tertiary font-mono text-[11px] tracking-[0.18em] uppercase">
                  Total read time {readTimeMinutes} min
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {article.coverImage?.asset && (
        <div className="border-line border-b">
          <div className="mx-auto w-full max-w-5xl px-0">
            <div className="border-line bg-surface-alt/50 -my-px overflow-hidden border">
              <Image
                src={urlFor(article.coverImage as object)
                  .width(1400)
                  .url()}
                alt={article.coverImage.alt ?? article.title}
                width={1400}
                height={0}
                priority
                sizes="(min-width: 1280px) 1152px, 100vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      )}

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 xl:px-0">
          <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_18rem] xl:gap-14">
            <article className="max-w-[68ch] min-w-0">
              <BlogPostAnalytics articleContext={articleContext} />

              {headings.length > 0 && (
                <aside className="mb-10 xl:hidden">
                  <section className="border-line bg-surface-alt/45 rounded-[12px] border px-5 py-5">
                    <ArticleTableOfContents
                      headings={headings}
                      headingId="on-this-page-mobile-heading"
                      variant="mobile"
                    />
                  </section>
                </aside>
              )}

              <ArticleReaderExperience
                articleTitle={article.title}
                articleSlug={article.slug.current}
                articleContext={articleContext}
              >
                <div className="article-prose">
                  {article.body && (
                    <PortableTextRenderer value={article.body} articleContext={articleContext} />
                  )}
                </div>
              </ArticleReaderExperience>

              <ArticleEvidenceSection article={article} />

              {faq.length > 0 && (
                <section className="border-line mt-16 border-t pt-10" aria-labelledby="faq-heading">
                  <h2
                    id="faq-heading"
                    className="text-ink mb-5 text-3xl leading-tight font-[family:var(--font-serif)] font-medium tracking-[-0.02em]"
                  >
                    Frequently Asked Questions
                  </h2>
                  <div className="divide-line border-line divide-y border-y">
                    {faq.map((item) => (
                      <details key={item.question} className="group py-4">
                        <summary className="text-ink flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold">
                          <span>{item.question}</span>
                          <span className="text-primary-accessible mt-0.5 font-mono text-sm transition-transform group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="text-ink-secondary mt-3 text-base leading-7">{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {article.customerDiscoveryCta?.question && (
                <section
                  className="border-primary/20 bg-primary/5 mt-16 rounded-[12px] border px-6 py-6"
                  aria-labelledby="discovery-heading"
                >
                  <h2
                    id="discovery-heading"
                    className="text-ink text-2xl leading-tight font-[family:var(--font-serif)] font-medium tracking-[-0.02em]"
                  >
                    Customer-Discovery Question
                  </h2>
                  <p className="text-ink-secondary mt-3 text-base leading-8">
                    {article.customerDiscoveryCta.question}
                  </p>
                  {article.customerDiscoveryCta.supportingText && (
                    <p className="text-ink-tertiary mt-2 text-sm leading-7">
                      {article.customerDiscoveryCta.supportingText}
                    </p>
                  )}
                  {article.customerDiscoveryCta.href && article.customerDiscoveryCta.label && (
                    <div className="mt-4">
                      <TrackedArticleLink
                        href={article.customerDiscoveryCta.href}
                        className="border-primary/30 text-primary-accessible hover:border-primary/50 hover:text-primary inline-flex items-center rounded-[999px] border px-4 py-2 text-sm font-medium transition-colors"
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
            </article>

            <aside className="hidden xl:block xl:min-w-0">
              <div className="border-line sticky top-28 border-l pl-8">
                {headings.length > 0 && (
                  <ArticleTableOfContents headings={headings} headingId="on-this-page-heading" />
                )}

                {(article.primaryQuestion || article.topicCluster?.name) && (
                  <section className="border-line mt-8 border-t pt-6">
                    <h2 className="text-ink-tertiary mb-3 font-mono text-[10px] tracking-[0.2em] uppercase">
                      Article brief
                    </h2>
                    <div className="space-y-4">
                      {article.primaryQuestion && (
                        <p className="text-ink-secondary text-sm leading-7">
                          {article.primaryQuestion}
                        </p>
                      )}
                      {article.topicCluster?.name && (
                        <p className="text-ink-tertiary text-sm leading-7">
                          Cluster:{' '}
                          <span className="text-ink-secondary">{article.topicCluster.name}</span>
                        </p>
                      )}
                    </div>
                  </section>
                )}

                <section className="border-line mt-8 border-t pt-6">
                  <h2 className="text-ink-tertiary mb-3 font-mono text-[10px] tracking-[0.2em] uppercase">
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

          {author && (
            <div className="border-line mt-16 border-t pt-10">
              <AuthorBadge author={author} publishedAt={article.publishedAt ?? undefined} showBio />
            </div>
          )}

          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <section className="border-line mt-16 border-t pt-10" aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="text-ink mb-5 text-3xl leading-tight font-[family:var(--font-serif)] font-medium tracking-[-0.02em]"
              >
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
                    className="border-line hover:border-primary/25 rounded-[12px] border px-5 py-5 transition-colors"
                  >
                    <h3 className="text-ink text-lg font-semibold">{relatedArticle.title}</h3>
                    {relatedArticle.excerpt && (
                      <p className="text-ink-secondary mt-2 text-sm leading-7">
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
      </section>
    </>
  )
}
