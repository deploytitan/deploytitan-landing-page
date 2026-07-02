import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'
import { ensureArticleAutomationRecords } from '@/lib/content-automation'

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    const { isValidSignature, body } = await parseBody<{ _id: string; _type: string; title?: string; publishedAt?: string; slug?: { current: string } }>(
      req,
      secret,
    )

    if (!isValidSignature || !body) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }

    if (body._type === 'article' || body._type === 'post') {
      if (body.slug?.current) {
        revalidatePath(`/blog/${body.slug.current}`)
      }
      revalidatePath('/blog')
      revalidatePath('/feed.xml')
      revalidatePath('/sitemap.xml')

      if (body._type === 'article' && body.slug?.current && body.title && body.publishedAt) {
        await ensureArticleAutomationRecords({
          _id: body._id,
          title: body.title,
          slug: body.slug,
          publishedAt: body.publishedAt,
        })
      }
    }

    if (body._type === 'author') {
      revalidatePath('/about')
      revalidatePath('/blog')
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
