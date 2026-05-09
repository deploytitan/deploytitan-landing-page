import { redirect } from 'next/navigation'
import { CONSOLE_URL } from '@/lib/env'

// /early-access now sends users straight to the console login.
// Preserving the URL for SEO / inbound links — no 404.
export default function Page() {
  redirect(`${CONSOLE_URL}/login`)
}
