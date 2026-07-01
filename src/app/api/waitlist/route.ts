import { NextResponse } from 'next/server'

const WAITLIST_WEBHOOK_URL =
  process.env.WAITLIST_WEBHOOK_URL ?? process.env.NEXT_PUBLIC_FORM_ENDPOINT

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function toStringRecord(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null
  }

  const entries = Object.entries(value).map(([key, entryValue]) => [
    key,
    typeof entryValue === 'string' ? entryValue : String(entryValue ?? ''),
  ])

  return Object.fromEntries(entries) as Record<string, string>
}

export async function POST(request: Request) {
  if (!WAITLIST_WEBHOOK_URL) {
    return NextResponse.json({ error: 'Waitlist intake is not configured.' }, { status: 503 })
  }

  const payload = toStringRecord(await request.json().catch(() => null))

  if (!payload) {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 })
  }

  const name = payload.name?.trim()
  const email = payload.email?.trim()

  if (!name || !email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'Name and a valid email are required.' }, { status: 400 })
  }

  const body = new URLSearchParams({
    ...payload,
    name,
    email,
    submitted_at: new Date().toISOString(),
  })

  let response: Response

  try {
    response = await fetch(WAITLIST_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Accept: 'application/json, text/plain, */*',
      },
      body,
    })
  } catch {
    return NextResponse.json(
      { error: 'Waitlist provider could not be reached.' },
      { status: 502 },
    )
  }

  if (!response.ok && response.type !== 'opaque') {
    return NextResponse.json(
      { error: `Waitlist provider returned ${response.status}.` },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
