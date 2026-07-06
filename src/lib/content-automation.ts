import { writeClient } from '@/sanity/lib/client'
import type { ArticleRecord } from '@/lib/articles'

type SpokeType =
  | 'story'
  | 'observation'
  | 'thread'
  | 'contrarian'
  | 'pastVsPresent'
  | 'listicle'

type DistributionGoal =
  | 'traffic'
  | 'newsletter'
  | 'waitlist'
  | 'researchCta'
  | 'productDiscovery'

type PublishedArticleAutomationRecord = Pick<ArticleRecord, '_id' | 'title' | 'slug' | 'publishedAt'> & {
  targetPersona?: { name?: string | null } | null
  primaryKeyword?: string | null
  hubCampaignName?: string | null
  hubRevenueGoal?: DistributionGoal | null
  spokeCadenceWeeks?: number | null
}

type SpokeBlueprint = {
  spokeType: SpokeType
  channel: 'xThread' | 'xPost' | 'linkedin'
  angle: string
}

const SPOKE_BLUEPRINTS: readonly SpokeBlueprint[] = [
  { spokeType: 'story', channel: 'linkedin', angle: 'Tell a real before-and-after operator story.' },
  { spokeType: 'observation', channel: 'xPost', angle: 'Share one sharp observation tied to the article thesis.' },
  { spokeType: 'thread', channel: 'xThread', angle: 'Break the core article argument into a teachable thread.' },
  { spokeType: 'contrarian', channel: 'linkedin', angle: 'Lead with the opinion most teams quietly avoid saying.' },
  { spokeType: 'pastVsPresent', channel: 'xPost', angle: 'Contrast the old workflow with the better operating model.' },
  { spokeType: 'listicle', channel: 'linkedin', angle: 'Turn the article into a compact list of practical lessons.' },
] as const

function addDays(value: string, days: number) {
  const date = new Date(value)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString()
}

function slugifyPart(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function buildCampaignName(article: PublishedArticleAutomationRecord) {
  return article.hubCampaignName?.trim() || `${article.slug.current}-hub-spokes`
}

function buildCanonicalUrl(article: PublishedArticleAutomationRecord) {
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://deploytitan.com').replace(/\/$/, '')
  return `${origin}/blog/${article.slug.current}/`
}

function buildUtmMedium(channel: SpokeBlueprint['channel']) {
  if (channel === 'linkedin') return 'social'
  if (channel === 'xThread') return 'thread'
  return 'social'
}

function buildSpokeOffsetDays(index: number, totalWeeks: number, totalSpokes: number) {
  if (totalSpokes <= 1) return 0
  const maxDays = Math.max(0, totalWeeks - 1) * 7
  return Math.round((index * maxDays) / (totalSpokes - 1))
}

function buildSpokeTitle(articleTitle: string, spokeType: SpokeType) {
  const labels: Record<SpokeType, string> = {
    story: 'Story',
    observation: 'Observation',
    thread: 'Thread',
    contrarian: 'Contrarian',
    pastVsPresent: 'Past vs Present',
    listicle: 'Listicle',
  }
  return `${articleTitle} · ${labels[spokeType]}`
}

function buildSpokeCopy(
  article: PublishedArticleAutomationRecord,
  blueprint: SpokeBlueprint,
  ctaLabel: string,
  ctaUrl: string,
) {
  const persona = article.targetPersona?.name?.trim() || 'release engineering teams'
  const keyword = article.primaryKeyword?.trim() || article.slug.current.replace(/-/g, ' ')

  return [
    `${blueprint.angle}`,
    `Anchor the post in the hub article "${article.title}" and make the lesson specific to ${persona}.`,
    `Use ${keyword} as the connective theme rather than repeating the article headline verbatim.`,
    `CTA: ${ctaLabel} -> ${ctaUrl}`,
  ].join('\n')
}

async function fetchAutomationContext(articleId: string) {
  return writeClient.fetch<PublishedArticleAutomationRecord | null>(
    `*[_type == "article" && _id == $id][0]{
      _id,
      title,
      slug,
      publishedAt,
      primaryKeyword,
      targetPersona,
      hubCampaignName,
      hubRevenueGoal,
      spokeCadenceWeeks
    }`,
    { id: articleId },
  )
}

export async function ensureArticleAutomationRecords(
  article: Pick<ArticleRecord, '_id' | 'title' | 'slug' | 'publishedAt'>,
) {
  if (!process.env.SANITY_API_WRITE_TOKEN || !article.publishedAt) return

  const publishedAt = article.publishedAt
  const automationContext: PublishedArticleAutomationRecord = (await fetchAutomationContext(article._id)) ?? {
    ...article,
    primaryKeyword: null,
    targetPersona: null,
    hubCampaignName: null,
    hubRevenueGoal: null,
    spokeCadenceWeeks: null,
  }
  const campaignName = buildCampaignName(automationContext)
  const cadenceWeeks = Math.min(8, Math.max(4, Number(automationContext.spokeCadenceWeeks ?? 6) || 6))
  const ctaUrl = buildCanonicalUrl(automationContext)
  const ctaLabel = 'Read the full guide'
  const distributionGoal = automationContext.hubRevenueGoal ?? 'traffic'

  const transaction = writeClient.transaction()
  transaction.patch(article._id, {
    setIfMissing: {
      sevenDayReviewAt: addDays(publishedAt, 7),
      thirtyDayReviewAt: addDays(publishedAt, 30),
      hubCampaignName: campaignName,
      hubStatus: 'activeHub',
      hubRevenueGoal: distributionGoal,
      spokeCadenceWeeks: cadenceWeeks,
    },
  })

  SPOKE_BLUEPRINTS.forEach((blueprint, index) => {
    const weekNumber = index + 1
    const offsetDays = buildSpokeOffsetDays(index, cadenceWeeks, SPOKE_BLUEPRINTS.length)
    const scheduledFor = addDays(publishedAt, offsetDays)
    const assetId = `distributionAsset.${article.slug.current}.${blueprint.spokeType}.${blueprint.channel}`

    transaction.createIfNotExists({
      _id: assetId,
      _type: 'distributionAsset',
      title: buildSpokeTitle(article.title, blueprint.spokeType),
      article: { _type: 'reference', _ref: article._id },
      hubArticle: { _type: 'reference', _ref: article._id },
      channel: blueprint.channel,
      spokeType: blueprint.spokeType,
      distributionGoal,
      status: 'draft',
      campaignName,
      weekNumber,
      copy: buildSpokeCopy(automationContext, blueprint, ctaLabel, ctaUrl),
      ctaLabel,
      ctaUrl,
      ctaPlacement: 'closing',
      scheduledFor,
      utmParameters: {
        _type: 'utmParameters',
        source: blueprint.channel === 'linkedin' ? 'linkedin' : 'x',
        medium: buildUtmMedium(blueprint.channel),
        campaign: slugifyPart(campaignName),
        content: blueprint.spokeType,
        term: automationContext.primaryKeyword ?? '',
      },
    })

    transaction.patch(assetId, {
      setIfMissing: {
        article: { _type: 'reference', _ref: article._id },
        hubArticle: { _type: 'reference', _ref: article._id },
        channel: blueprint.channel,
        spokeType: blueprint.spokeType,
        distributionGoal,
        status: 'draft',
        campaignName,
        weekNumber,
        copy: buildSpokeCopy(automationContext, blueprint, ctaLabel, ctaUrl),
        ctaLabel,
        ctaUrl,
        ctaPlacement: 'closing',
        scheduledFor,
        utmParameters: {
          _type: 'utmParameters',
          source: blueprint.channel === 'linkedin' ? 'linkedin' : 'x',
          medium: buildUtmMedium(blueprint.channel),
          campaign: slugifyPart(campaignName),
          content: blueprint.spokeType,
          term: automationContext.primaryKeyword ?? '',
        },
      },
    })
  })

  await transaction.commit()

  if (process.env.CONTENT_OPS_WEBHOOK_URL) {
    await fetch(process.env.CONTENT_OPS_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        event: 'article.published',
        articleId: article._id,
        slug: article.slug.current,
        title: article.title,
        campaignName,
      }),
    }).catch(() => undefined)
  }

  if (process.env.CONTENT_OPS_SLACK_WEBHOOK_URL) {
    await fetch(process.env.CONTENT_OPS_SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        text: `DeployTitan article published: ${article.title} (${article.slug.current}) · campaign ${campaignName}`,
      }),
    }).catch(() => undefined)
  }
}
