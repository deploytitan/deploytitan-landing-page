import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    const { isValidSignature, body } = await parseBody<{ _type: string; slug?: { current: string } }>(
      req,
      secret,
    )

    if (!isValidSignature || !body) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }

    if (body._type === 'post') {
      // Revalidate the specific post and the listing page
      if (body.slug?.current) {
        revalidatePath(`/blog/${body.slug.current}`)
      }
      revalidatePath('/blog')
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
