import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { SiteLayoutClient } from '@/layouts/SiteLayoutClient'
import './globals.css'

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of unstyled content — must run before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('dt-theme');var d=s==='dark'||((!s||s==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q1CZ6Q7DVD"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-Q1CZ6Q7DVD');`}
        </Script>

        <ThemeProvider>
          <SiteLayoutClient>
            {children}
          </SiteLayoutClient>
        </ThemeProvider>
      </body>
    </html>
  )
}
