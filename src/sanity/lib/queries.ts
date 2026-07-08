import { defineQuery } from 'next-sanity'

const ARTICLE_WHERE = '_type == "article"'
const PUBLIC_EVIDENCE_PROJECTION = `
  _id,
  title,
  evidenceType,
  visibility,
  evidenceStrength,
  signalsProductNeed,
  "summary": select(
    visibility == "publicSummaryOnly" => coalesce(publicSummary, summary),
    coalesce(publicSummary, summary)
  ),
  "source": coalesce(publicSource, source)
`
const ARTICLE_LIST_PROJECTION = `
  _id,
  title,
  slug,
  contentType,
  excerpt,
  directAnswer,
  primaryQuestion,
  primaryKeyword,
  secondaryKeywords,
  relatedQuestions,
  searchIntent,
  hubStatus,
  hubCampaignName,
  hubRevenueGoal,
  spokeCadenceWeeks,
  publishedAt,
  updatedAt,
  _updatedAt,
  lastReviewedAt,
  status,
  cardLayout,
  methodologyNote,
  technicalReviewer,
  topicCluster,
  targetPersona,
  seo,
  coverImage { asset, alt, hotspot, crop },
  "author": author->{ name, slug, image, role, bio },
  "categories": categories[]->{ title, slug },
  "faq": faq[]{
    question,
    answer
  },
  "relatedArticles": relatedArticles[]->{
    _id,
    title,
    slug,
    excerpt
  }
`

export const articlesQuery = defineQuery(`
  *[${ARTICLE_WHERE} && defined(slug.current) && status == "published"]
  | order(coalesce(publishedAt, _createdAt) desc) {
    ${ARTICLE_LIST_PROJECTION}
  }
`)

export const articleBySlugQuery = defineQuery(`
  *[${ARTICLE_WHERE} && slug.current == $slug][0] {
    ${ARTICLE_LIST_PROJECTION},
    body,
    citations,
    "publicEvidence": publicEvidence[]->{
      ${PUBLIC_EVIDENCE_PROJECTION}
    }[defined(visibility) && visibility != "internal"],
    customerDiscoveryCta,
    hubPrimaryCta
  }
`)

export const articleSlugsQuery = defineQuery(`
  *[${ARTICLE_WHERE} && defined(slug.current)] { "slug": slug.current }
`)

export const categoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
  }
`)

export const categoryBySlugQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    "articleCount": count(*[${ARTICLE_WHERE} && defined(slug.current) && references(^._id)]),
  }
`)

export const articlesByCategoryQuery = defineQuery(`
  *[${ARTICLE_WHERE} && defined(slug.current) && $categorySlug in categories[]->slug.current]
  | order(coalesce(publishedAt, _createdAt) desc) {
    ${ARTICLE_LIST_PROJECTION}
  }
`)

export const aboutTeamQuery = defineQuery(`
  *[_type == "author" && showOnAboutPage == true]
  | order(teamOrder asc, name asc) {
    _id,
    name,
    role,
    bio,
    image,
    teamOrder,
  }
`)

export const articleByCanonicalOrSlugQuery = defineQuery(`
  *[_type == "article" && (
      slug.current == $slug ||
      seo.canonicalUrl == $canonicalUrl ||
      "https://deploytitan.com/blog/" + slug.current == $canonicalUrl ||
      "https://deploytitan.com/blog/" + slug.current + "/" == $canonicalUrl
    )
  ][0]{
    _id,
    slug,
    title
  }
`)
