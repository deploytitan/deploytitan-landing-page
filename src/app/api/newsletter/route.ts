import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/site'
import { submitToHubSpotForm } from '@/lib/hubspot'

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>
  const email = String(body.email ?? '').trim()
  const name = String(body.name ?? '').trim()
  const signupPlacement = String(body.signupPlacement ?? 'article-inline').trim()
  const referringSite = String(body.referringSite ?? '').trim()
  const articleContext = body.articleContext as
    | {
        articleId?: unknown
        articleSlug?: unknown
        canonicalUrl?: unknown
        articleTitle?: unknown
        topicCluster?: unknown
        articleType?: unknown
        primaryKeyword?: unknown
        targetPersona?: unknown
        distributionAssetId?: unknown
      }
    | undefined

  if (!email || !email.includes('@') || !articleContext?.articleId || !articleContext.articleSlug) {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 })
  }

  const normalizedContext = {
    articleId: String(articleContext.articleId),
    articleSlug: String(articleContext.articleSlug),
    canonicalUrl: String(
      articleContext.canonicalUrl ?? `${SITE_URL}/blog/${String(articleContext.articleSlug)}/`,
    ),
    articleTitle: String(articleContext.articleTitle ?? ''),
    topicCluster: articleContext.topicCluster ? String(articleContext.topicCluster) : '',
    articleType: articleContext.articleType ? String(articleContext.articleType) : '',
    primaryKeyword: articleContext.primaryKeyword ? String(articleContext.primaryKeyword) : '',
    targetPersona: articleContext.targetPersona ? String(articleContext.targetPersona) : '',
    distributionAssetId: articleContext.distributionAssetId
      ? String(articleContext.distributionAssetId)
      : '',
  }

  const canonical = normalizedContext.canonicalUrl || `${SITE_URL}/blog/${normalizedContext.articleSlug}/`
  const url = new URL(canonical)
  const searchParams = url.searchParams

  try {
    await submitToHubSpotForm({
      formGuidEnvKey: 'HUBSPOT_NEWSLETTER_FORM_GUID',
      pageName: normalizedContext.articleTitle || 'DeployTitan newsletter',
      pageUri: referringSite || canonical,
      fields: [
        { name: 'email', value: email },
        { name: 'firstname', value: name },
        { name: 'article_slug', value: normalizedContext.articleSlug },
        { name: 'article_title', value: normalizedContext.articleTitle },
        { name: 'topic_cluster', value: normalizedContext.topicCluster },
        { name: 'primary_keyword', value: normalizedContext.primaryKeyword },
        { name: 'target_persona', value: normalizedContext.targetPersona },
        { name: 'distribution_asset_id', value: normalizedContext.distributionAssetId },
        { name: 'signup_placement', value: signupPlacement },
        { name: 'utm_source', value: searchParams.get('utm_source') ?? 'deploytitan' },
        { name: 'utm_medium', value: searchParams.get('utm_medium') ?? 'blog' },
        { name: 'utm_campaign', value: searchParams.get('utm_campaign') ?? normalizedContext.articleSlug },
        { name: 'utm_term', value: searchParams.get('utm_term') ?? '' },
        { name: 'utm_content', value: searchParams.get('utm_content') ?? signupPlacement },
      ].filter((field) => field.value),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Newsletter subscription failed.'
    return NextResponse.json({ message }, { status: 502 })
  }
}
