/**
 * Polar.sh product fetch helper — server-only (no NEXT_PUBLIC_ token).
 *
 * Fetches active recurring products from the Polar API and maps them into
 * a typed shape the pricing page can render directly. Credit amounts are
 * extracted from the product's `meter_credit` benefit (or any benefit whose
 * description contains a credit quantity).
 *
 * Falls back to an empty array on any error so the page always renders.
 */

export interface PolarPrice {
  id: string
  amount: number // cents
  currency: string
  interval: 'month' | 'year' | 'day' | 'week'
}

export interface PolarProduct {
  id: string
  name: string
  description: string | null
  isHighlighted: boolean // set via product metadata key "highlighted"
  prices: PolarPrice[]
  monthlyPrice: PolarPrice | null
  annualPrice: PolarPrice | null
  credits: number | null // monthly credit grant, extracted from benefits
  overageCentsPerCredit: number | null // cents per extra credit (metered_unit price)
  checkoutUrl: string // direct link to Polar checkout for this product
  isCustom: boolean // true when price is "custom" (Enterprise-style)
  isFree: boolean
}

// ─── Raw API types (minimal) ─────────────────────────────────────────────────

interface RawPrice {
  id: string
  amount_type: 'fixed' | 'free' | 'custom' | 'metered_unit' | 'seat_based'
  price_amount?: number
  price_currency?: string
  recurring_interval?: string
  unit_amount?: string // metered_unit price — string decimal, in cents
  type?: string
}

interface RawBenefit {
  type: string
  description: string
  properties?: Record<string, unknown>
}

interface RawProduct {
  id: string
  name: string
  description: string | null
  is_archived: boolean
  is_recurring: boolean
  metadata?: Record<string, unknown>
  prices: RawPrice[]
  benefits: RawBenefit[]
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractCredits(benefits: RawBenefit[]): number | null {
  for (const b of benefits) {
    // Polar native meter_credit benefit — units is the monthly grant
    if (b.type === 'meter_credit') {
      const units = (b.properties as { units?: number } | undefined)?.units ?? null
      if (units != null) return units
      // fallback: amount field (older API shape)
      const amount = (b.properties as { amount?: number } | undefined)?.amount ?? null
      if (amount != null) return amount
    }
    // Fallback: parse credit count from description text, e.g. "1500 Credits"
    const match = b.description.match(/(\d[\d,]*)\s*credits?/i)
    if (match) return parseInt(match[1].replace(/,/g, ''), 10)
  }
  return null
}

function toPrice(raw: RawPrice): PolarPrice | null {
  if (!raw.recurring_interval || raw.amount_type === 'free' || raw.amount_type === 'custom') {
    return null
  }
  const interval = raw.recurring_interval as PolarPrice['interval']
  return {
    id: raw.id,
    amount: raw.price_amount ?? 0,
    currency: raw.price_currency ?? 'usd',
    interval,
  }
}

function mapProduct(raw: RawProduct, orgSlug: string): PolarProduct {
  const fixedPrices = raw.prices
    .filter((p) => p.amount_type === 'fixed')
    .map(toPrice)
    .filter((p): p is PolarPrice => p !== null)

  const monthlyPrice = fixedPrices.find((p) => p.interval === 'month') ?? null
  const annualPrice = fixedPrices.find((p) => p.interval === 'year') ?? null

  // metered_unit price carries the per-credit overage rate as a string decimal in cents
  const meteredPrice = raw.prices.find((p) => p.amount_type === 'metered_unit')
  const overageCentsPerCredit =
    meteredPrice?.unit_amount != null ? parseFloat(meteredPrice.unit_amount) : null

  const isFree = raw.prices.every((p) => p.amount_type === 'free') || raw.prices.length === 0
  const isCustom = raw.prices.some((p) => p.amount_type === 'custom')
  const isHighlighted =
    raw.metadata?.highlighted === true ||
    raw.metadata?.highlighted === 'true' ||
    raw.metadata?.is_highlighted === true ||
    raw.metadata?.is_highlighted === 'true'

  if (!isFree && !isCustom && monthlyPrice === null) {
    console.warn(
      `[polar] Product "${raw.name}" (${raw.id}) has no monthly fixed price. Raw prices:`,
      JSON.stringify(raw.prices),
    )
  }

  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    isHighlighted,
    prices: fixedPrices,
    monthlyPrice,
    annualPrice,
    credits: extractCredits(raw.benefits),
    overageCentsPerCredit,
    checkoutUrl: `https://polar.sh/${orgSlug}/checkout?product_id=${raw.id}`,
    isCustom,
    isFree,
  }
}

// ─── Public fetch function ────────────────────────────────────────────────────

export async function fetchPolarProducts(): Promise<PolarProduct[]> {
  const baseURL = process.env.POLAR_BASE_URL
  if (!baseURL) {
    throw new Error('No base URL found for Polar API. Set POLAR_BASE_URL.')
  }
  const token = process.env.POLAR_ACCESS_TOKEN
  const orgSlug = process.env.POLAR_ORG_SLUG ?? 'deploytitan'

  if (!token) {
    console.warn('[polar] POLAR_ACCESS_TOKEN is not set — skipping product fetch')
    return []
  }

  try {
    const url = new URL(`${baseURL}/products/`)
    url.searchParams.set('is_archived', 'false')
    url.searchParams.set('is_recurring', 'true')
    url.searchParams.set('limit', '20')

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      next: { revalidate: 3600 }, // ISR — 1 hour
    })

    if (!res.ok) {
      console.error(`[polar] API error ${res.status}: ${await res.text()}`)
      return []
    }

    const data = (await res.json()) as { items: RawProduct[] }
    return data.items
      .filter((p) => !p.is_archived && p.is_recurring)
      .map((p) => mapProduct(p, orgSlug))
  } catch (err) {
    console.error('[polar] Fetch failed:', err)
    return []
  }
}
