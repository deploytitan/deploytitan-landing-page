import type { Metadata } from 'next'
import { cookies, draftMode } from 'next/headers'
import Script from 'next/script'
import { Barlow, Bitter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { SiteLayoutClient } from '@/layouts/SiteLayoutClient'
import { GaPageViewTracker } from '@/components/analytics/GaPageViewTracker'
import { ConsentBanner } from '@/components/analytics/ConsentBanner'
import { PosthogInit } from '@/components/analytics/PosthogInit'
import { SiteJsonLd } from '@/components/seo/SiteJsonLd'
import { parseAnalyticsConsent } from '@/lib/consent'
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_DESCRIPTION,
  SITE_OG_IMAGE,
  SITE_URL,
} from '@/lib/site'
import './globals.css'

const barlowDisplay = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const barlowSans = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const bitterSerif = Bitter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | AI Delivery Throughput for Engineering Teams`,
    template: '%s | DeployTitan',
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? {
          'msvalidate.01': process.env.BING_SITE_VERIFICATION,
        }
      : undefined,
  },
  openGraph: {
    title: `${SITE_NAME} | AI Delivery Throughput for Engineering Teams`,
    description: SITE_OG_DESCRIPTION,
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: SITE_OG_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | AI Delivery Throughput for Engineering Teams`,
    description: SITE_OG_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraft } = await draftMode()
  const cookieStore = await cookies()
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const posthogApiKey = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
  const posthogApiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST
  const analyticsConsent = parseAnalyticsConsent(cookieStore.get('dt_analytics_consent')?.value)
  const canLoadAnalytics = analyticsConsent === 'granted'
  const draftModeControls = isDraft
    ? await import('@/components/blog/DraftModeControls').then(({ DraftModeControls }) => (
        <DraftModeControls />
      ))
    : null

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${barlowDisplay.variable} ${barlowSans.variable} ${jetbrainsMono.variable} ${bitterSerif.variable}`}
    >
      <head>
        {/* Apply stored theme before first paint and on bfcache restore to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('dt-theme');var d=(m==='dark')||(m!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches);if(d)document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}window.addEventListener('pageshow',function(e){if(!e.persisted)return;try{var m=localStorage.getItem('dt-theme');var d=(m==='dark')||(m!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches);if(d)document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}});})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {gaMeasurementId && canLoadAnalytics && (
          <>
            {/* Google Analytics — lazyOnload fires after page load + browser idle */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="lazyOnload"
            />
            <Script id="gtag-init" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaMeasurementId}',{send_page_view:false});`}
            </Script>
            <GaPageViewTracker measurementId={gaMeasurementId} />
          </>
        )}
        {posthogApiKey && posthogApiHost && canLoadAnalytics && (
          <PosthogInit apiKey={posthogApiKey} apiHost={posthogApiHost} />
        )}
        {canLoadAnalytics && (
          <Script
            src="https://www.faurya.com/js/script.js"
            strategy="lazyOnload"
            data-website-id="cmoq4uh7j000kjm04sga2uksk"
            data-domain="www.deploytitan.com"
          />
        )}

        <ThemeProvider>
          <SiteJsonLd />
          <SiteLayoutClient>{children}</SiteLayoutClient>
          <ConsentBanner initialState={analyticsConsent} />
        </ThemeProvider>
        {draftModeControls}
      </body>
    </html>
  )
}
