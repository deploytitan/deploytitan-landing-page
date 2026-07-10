import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'
import {
  getRevalidationPaths,
  type RevalidationDocument,
} from '@/lib/revalidation'

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    const { isValidSignature, body } = await parseBody<RevalidationDocument>(
      req,
      secret,
    )

    if (!isValidSignature || !body) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }

    // Keep webhook handling read-only. Writing to Sanity here can retrigger the
    // same update webhook and create an unbounded request loop.
    for (const path of getRevalidationPaths(body)) {
      revalidatePath(path)
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
