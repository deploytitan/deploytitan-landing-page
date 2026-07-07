import type { StructureResolver } from 'sanity/structure'

const hiddenTypes = [
  'article',
  'contentOpportunity',
  'contentPipelineGuide',
  'marketQuestion',
  'researchEvidence',
  'contentBrief',
  'distributionAsset',
  'distributionAssetPerformanceSnapshot',
  'articlePerformanceSnapshot',
  'contentInsight',
  'author',
  'category',
]

function filteredListItem(
  S: Parameters<StructureResolver>[0],
  {
    id,
    title,
    schemaType,
    filter,
    params,
    defaultOrdering,
  }: {
    id: string
    title: string
    schemaType: string
    filter: string
    params?: Record<string, unknown>
    defaultOrdering?: Array<{ field: string; direction: 'asc' | 'desc' }>
  },
) {
  let list = S.documentList().title(title).schemaType(schemaType).filter(filter)

  if (params) {
    list = list.params(params)
  }

  if (defaultOrdering) {
    list = list.defaultOrdering(defaultOrdering)
  }

  return S.listItem().id(id).title(title).child(list)
}

const articleViews = (S: Parameters<StructureResolver>[0]) => [
  S.documentTypeListItem('article').title('All Articles'),
  filteredListItem(S, {
    id: 'this-week',
    title: 'This Week',
    schemaType: 'article',
    filter: '_type == "article" && _updatedAt >= $weekAgo',
    params: { weekAgo: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
  }),
  filteredListItem(S, {
    id: 'awaiting-research',
    title: 'Awaiting Research',
    schemaType: 'article',
    filter: '_type == "article" && status == "awaitingResearch"',
  }),
  filteredListItem(S, {
    id: 'ready-to-draft',
    title: 'Ready to Draft',
    schemaType: 'article',
    filter: '_type == "article" && status == "briefReady"',
  }),
  filteredListItem(S, {
    id: 'drafting',
    title: 'Drafting',
    schemaType: 'article',
    filter: '_type == "article" && status == "drafting"',
  }),
  filteredListItem(S, {
    id: 'technical-review',
    title: 'Technical Review',
    schemaType: 'article',
    filter: '_type == "article" && status == "technicalReview"',
  }),
  filteredListItem(S, {
    id: 'scheduled',
    title: 'Scheduled',
    schemaType: 'article',
    filter: '_type == "article" && status == "scheduled"',
  }),
  filteredListItem(S, {
    id: 'published',
    title: 'Published',
    schemaType: 'article',
    filter: '_type == "article" && status == "published"',
  }),
  filteredListItem(S, {
    id: 'active-hubs',
    title: 'Active Hubs',
    schemaType: 'article',
    filter: '_type == "article" && status == "published" && hubStatus == "activeHub"',
  }),
  filteredListItem(S, {
    id: 'needs-refresh',
    title: 'Needs Refresh',
    schemaType: 'article',
    filter: '_type == "article" && status == "needsRefresh"',
  }),
]

const contentOpportunityViews = (S: Parameters<StructureResolver>[0]) => [
  S.documentTypeListItem('contentOpportunity').title('All Opportunities'),
  filteredListItem(S, {
    id: 'opportunities-discovered',
    title: 'Discovered',
    schemaType: 'contentOpportunity',
    filter: '_type == "contentOpportunity" && status == "discovered"',
  }),
  filteredListItem(S, {
    id: 'opportunities-reviewing',
    title: 'Reviewing',
    schemaType: 'contentOpportunity',
    filter: '_type == "contentOpportunity" && status == "reviewing"',
  }),
  filteredListItem(S, {
    id: 'opportunities-accepted',
    title: 'Accepted',
    schemaType: 'contentOpportunity',
    filter: '_type == "contentOpportunity" && status == "accepted"',
  }),
  filteredListItem(S, {
    id: 'opportunities-article-created',
    title: 'Article Created',
    schemaType: 'contentOpportunity',
    filter: '_type == "contentOpportunity" && status in ["articleCreated", "briefCreated"]',
  }),
  filteredListItem(S, {
    id: 'opportunities-rejected',
    title: 'Rejected',
    schemaType: 'contentOpportunity',
    filter: '_type == "contentOpportunity" && status == "rejected"',
  }),
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('DeployTitan Content OS')
    .items([
      S.listItem()
        .title('Pipeline Guide')
        .child(
          S.document()
            .schemaType('contentPipelineGuide')
            .documentId('content-pipeline-guide'),
        ),
      S.listItem()
        .title('Content Operations')
        .child(
          S.list()
            .title('Content Operations')
            .items([
              S.listItem()
                .title('Opportunities')
                .child(S.list().title('Content Opportunities').items(contentOpportunityViews(S))),
              S.listItem()
                .title('Articles')
                .child(S.list().title('Articles').items(articleViews(S))),
            ]),
        ),
      S.listItem()
        .title('Research')
        .child(
          S.list()
            .title('Research')
            .items([
              filteredListItem(S, {
                id: 'recent-evidence',
                title: 'Recent Evidence',
                schemaType: 'researchEvidence',
                filter: '_type == "researchEvidence"',
                defaultOrdering: [{ field: '_updatedAt', direction: 'desc' }],
              }),
              filteredListItem(S, {
                id: 'public-evidence',
                title: 'Public Evidence',
                schemaType: 'researchEvidence',
                filter: '_type == "researchEvidence" && visibility == "public"',
                defaultOrdering: [{ field: '_updatedAt', direction: 'desc' }],
              }),
            ]),
        ),
      S.listItem()
        .title('Distribution')
        .child(
          S.list()
            .title('Distribution')
            .items([
              filteredListItem(S, {
                id: 'ready-to-publish',
                title: 'Ready to Publish',
                schemaType: 'distributionAsset',
                filter: '_type == "distributionAsset" && status == "ready"',
              }),
              filteredListItem(S, {
                id: 'story-spokes',
                title: 'Story Spokes',
                schemaType: 'distributionAsset',
                filter: '_type == "distributionAsset" && spokeType == "story"',
              }),
              filteredListItem(S, {
                id: 'missing-spoke-cta',
                title: 'Missing Spoke CTA',
                schemaType: 'distributionAsset',
                filter: '_type == "distributionAsset" && (!defined(ctaUrl) || !defined(ctaLabel) || !defined(hubArticle))',
              }),
              filteredListItem(S, {
                id: 'distribution-x',
                title: 'X',
                schemaType: 'distributionAsset',
                filter: '_type == "distributionAsset" && channel in ["xThread", "xPost"]',
              }),
              filteredListItem(S, {
                id: 'distribution-linkedin',
                title: 'LinkedIn',
                schemaType: 'distributionAsset',
                filter: '_type == "distributionAsset" && channel == "linkedin"',
              }),
              filteredListItem(S, {
                id: 'distribution-dev',
                title: 'DEV',
                schemaType: 'distributionAsset',
                filter: '_type == "distributionAsset" && channel == "dev"',
              }),
              filteredListItem(S, {
                id: 'distribution-newsletter',
                title: 'Newsletter',
                schemaType: 'distributionAsset',
                filter: '_type == "distributionAsset" && channel == "newsletter"',
              }),
              filteredListItem(S, {
                id: 'missing-distribution',
                title: 'Missing Distribution',
                schemaType: 'article',
                filter: '_type == "article" && status == "published" && count(*[_type == "distributionAsset" && references(^._id)]) == 0',
              }),
            ]),
        ),
      S.listItem()
        .title('Performance')
        .child(
          S.list()
            .title('Performance')
            .items([
              filteredListItem(S, {
                id: 'awaiting-seven-day-review',
                title: 'Awaiting Seven-Day Review',
                schemaType: 'article',
                filter: '_type == "article" && status == "published" && defined(sevenDayReviewAt) && dateTime(sevenDayReviewAt) <= dateTime(now())',
              }),
              filteredListItem(S, {
                id: 'awaiting-thirty-day-review',
                title: 'Awaiting Thirty-Day Review',
                schemaType: 'article',
                filter: '_type == "article" && status == "published" && defined(thirtyDayReviewAt) && dateTime(thirtyDayReviewAt) <= dateTime(now())',
              }),
              filteredListItem(S, {
                id: 'strong-search-signal',
                title: 'Strong Search Signal',
                schemaType: 'contentInsight',
                filter: '_type == "contentInsight" && signalType == "search"',
              }),
              filteredListItem(S, {
                id: 'low-search-ctr',
                title: 'Low Search CTR',
                schemaType: 'articlePerformanceSnapshot',
                filter: '_type == "articlePerformanceSnapshot" && metrics.searchImpressions > 100 && metrics.searchCtr < 0.02',
              }),
              filteredListItem(S, {
                id: 'spoke-performance',
                title: 'Spoke Performance',
                schemaType: 'distributionAssetPerformanceSnapshot',
                filter: '_type == "distributionAssetPerformanceSnapshot"',
                defaultOrdering: [{ field: 'captureDate', direction: 'desc' }],
              }),
              filteredListItem(S, {
                id: 'strong-product-signal',
                title: 'Strong Product Signal',
                schemaType: 'contentInsight',
                filter: '_type == "contentInsight" && signalType == "product"',
              }),
              filteredListItem(S, {
                id: 'declining-content',
                title: 'Declining Content',
                schemaType: 'contentInsight',
                filter: '_type == "contentInsight" && signalType == "refresh"',
              }),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('researchEvidence').title('Research Evidence'),
      S.documentTypeListItem('distributionAsset').title('Distribution Assets'),
      S.documentTypeListItem('articlePerformanceSnapshot').title('Performance Snapshots'),
      S.documentTypeListItem('contentInsight').title('Content Insights'),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('category').title('Categories'),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() && !hiddenTypes.includes(item.getId()!)),
    ])
