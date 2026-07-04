import { NextResponse } from 'next/server'
import { submitToHubSpotForm } from '@/lib/hubspot'

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>

  const email = String(body.email ?? '').trim()
  const name = String(body.name ?? '').trim()
  const pageUrl = String(body.page_url ?? '').trim()

  if (!email || !email.includes('@') || !name) {
    return NextResponse.json({ message: 'Invalid waitlist request.' }, { status: 400 })
  }

  try {
    await submitToHubSpotForm({
      formGuidEnvKey: 'HUBSPOT_WAITLIST_FORM_GUID',
      pageName: 'DeployTitan waitlist',
      pageUri: pageUrl || undefined,
      fields: [
        { name: 'firstname', value: name },
        { name: 'email', value: email },
        { name: 'company', value: String(body.company ?? '').trim() },
        { name: 'jobtitle', value: String(body.role ?? '').trim() },
        { name: 'team_size', value: String(body.team_size ?? '').trim() },
        { name: 'pain_level', value: String(body.pain_level ?? '').trim() },
        { name: 'budget_range', value: String(body.budget_range ?? '').trim() },
        { name: 'current_process', value: String(body.current_process ?? '').trim() },
        { name: 'notes', value: String(body.notes ?? '').trim() },
        { name: 'source', value: String(body.source ?? '').trim() },
        { name: 'page_path', value: String(body.page_path ?? '').trim() },
        { name: 'referrer', value: String(body.referrer ?? '').trim() },
        { name: 'utm_source', value: String(body.utm_source ?? '').trim() },
        { name: 'utm_medium', value: String(body.utm_medium ?? '').trim() },
        { name: 'utm_campaign', value: String(body.utm_campaign ?? '').trim() },
        { name: 'utm_term', value: String(body.utm_term ?? '').trim() },
        { name: 'utm_content', value: String(body.utm_content ?? '').trim() },
      ].filter((field) => field.value),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Waitlist submission failed.'
    return NextResponse.json({ message }, { status: 502 })
  }
}
