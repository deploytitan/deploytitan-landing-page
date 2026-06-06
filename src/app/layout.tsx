import type { Metadata } from 'next'
import Script from 'next/script'
import { Barlow, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { SiteLayoutClient } from '@/layouts/SiteLayoutClient'
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

export const metadata: Metadata = {
  title: {
    default: 'DeployTitan — Release Coordination for Distributed Engineering Teams',
    template: '%s — DeployTitan',
  },
  description:
    'Coordinate complex multi-service releases, reduce freeze window chaos, and avoid painful rollback incidents. Release coordination and deployment safety for distributed systems.',
  openGraph: {
    title: 'DeployTitan — Release Coordination for Distributed Engineering Teams',
    description:
      'Coordinate multi-service releases safely across teams and environments. Release DAGs, freeze windows, rollback coordination, and deployment visibility.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeployTitan — Release Coordination for Distributed Engineering Teams',
    description:
      'Coordinate multi-service releases safely across teams and environments. Release DAGs, freeze windows, rollback coordination, and deployment visibility.',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${barlowDisplay.variable} ${barlowSans.variable} ${jetbrainsMono.variable}`}
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
