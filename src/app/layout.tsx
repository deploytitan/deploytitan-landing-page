import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { SiteLayoutClient } from '@/layouts/SiteLayoutClient'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
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

export const metadata: Metadata = {
  title: {
    default: 'DeployTitan — The Deployment Control Plane',
    template: '%s — DeployTitan',
  },
  description:
    'Progressive deployments, multi-cloud resilience, and risk intelligence for modern engineering teams. Ship faster. Sleep better.',
  openGraph: {
    title: 'DeployTitan — The Deployment Control Plane',
    description:
      'A deployment control plane that understands system dependencies and prevents unsafe releases.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeployTitan — The Deployment Control Plane',
    description:
      'A deployment control plane that understands system dependencies and prevents unsafe releases.',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${inter.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}>
      <head />
      <body suppressHydrationWarning>
        {/* Google Analytics — lazyOnload fires after page load + browser idle */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q1CZ6Q7DVD"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-Q1CZ6Q7DVD');`}
        </Script>
        {/* Faurya analytics — lazyOnload, does not block TTI */}
        <Script
          src="https://www.faurya.com/js/script.js"
          strategy="lazyOnload"
          data-website-id="cmoq4uh7j000kjm04sga2uksk"
          data-domain="www.deploytitan.com"
        />

        <ThemeProvider>
          <SiteLayoutClient>{children}</SiteLayoutClient>
        </ThemeProvider>
      </body>
    </html>
  )
}
