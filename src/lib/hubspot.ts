import { cookies, headers } from 'next/headers'

type HubSpotFormContext = {
  pageName?: string
  pageUri?: string
}

type HubSpotField = {
  name: string
  value: string
}

async function getHubSpotSubmissionContext(context: HubSpotFormContext = {}) {
  const cookieStore = await cookies()
  const headerStore = await headers()

  return {
    hutk: cookieStore.get('hubspotutk')?.value,
    ipAddress: headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined,
    pageName: context.pageName,
    pageUri: context.pageUri,
  }
}

export function isHubSpotConfigured(formGuidEnvKey: string) {
  return Boolean(
    process.env.HUBSPOT_ACCESS_TOKEN &&
      process.env.HUBSPOT_PORTAL_ID &&
      process.env[formGuidEnvKey],
  )
}

export async function submitToHubSpotForm(options: {
  formGuidEnvKey: string
  pageName?: string
  pageUri?: string
  fields: HubSpotField[]
}) {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN
  const portalId = process.env.HUBSPOT_PORTAL_ID
  const formGuid = process.env[options.formGuidEnvKey]

  if (!accessToken || !portalId || !formGuid) {
    throw new Error(`HubSpot form config missing for ${options.formGuidEnvKey}`)
  }

  const context = await getHubSpotSubmissionContext({
    pageName: options.pageName,
    pageUri: options.pageUri,
  })

  const response = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/secure/submit/${portalId}/${formGuid}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        submittedAt: Date.now().toString(),
        fields: options.fields,
        context,
      }),
    },
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HubSpot submission failed: ${errorText}`)
  }

  return response.json().catch(() => ({}))
}
