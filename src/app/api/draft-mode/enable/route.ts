import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const redirectTo = searchParams.get('redirect') ?? '/'

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  const dm = await draftMode()
  dm.enable()
  redirect(redirectTo)
}
