'use client'

import { useScrollReveal } from '../utils'
import { Container } from './shared/Container'
import { Card } from './shared/Card'

// Real SVG logos for integrations
const integrations = [
  {
    name: 'Kubernetes',
    category: 'compute',
    logo: (
      <svg
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="16" fill="#326CE5" />
        <path
          d="M16 6.5a1.2 1.2 0 0 1 1.12.77l1.7 4.17 4.5.34a1.2 1.2 0 0 1 .68 2.12l-3.42 2.9 1.05 4.37a1.2 1.2 0 0 1-1.78 1.3L16 19.3l-3.85 2.17a1.2 1.2 0 0 1-1.78-1.3l1.05-4.37-3.42-2.9a1.2 1.2 0 0 1 .68-2.12l4.5-.34 1.7-4.17A1.2 1.2 0 0 1 16 6.5z"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    name: 'AWS Lambda',
    category: 'compute',
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="6" fill="#FF9900" />
        <path
          d="M9.5 18.5c0 .55.45 1 1 1h11c.55 0 1-.45 1-1v-5c0-.55-.45-1-1-1h-11c-.55 0-1 .45-1 1v5zm1-5h11v5h-11v-5z"
          fill="white"
        />
        <path d="M8 21l2-2h12l2 2H8z" fill="white" />
      </svg>
    ),
  },
  {
    name: 'GCP Cloud Run',
    category: 'compute',
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="6" fill="#fff" />
        <path
          d="M19.7 12.3h-7.4A5.3 5.3 0 0 0 7 17.6 5.3 5.3 0 0 0 12.3 23h7.4A5.3 5.3 0 0 0 25 17.6a5.3 5.3 0 0 0-5.3-5.3z"
          fill="#4285F4"
        />
        <path d="M19.7 12.3L16 9l-3.7 3.3h7.4z" fill="#EA4335" />
        <path d="M7 17.6l3.3-3.6-3.3-1.7v5.3z" fill="#FBBC04" />
        <path d="M25 17.6l-3.3-3.6 3.3-1.7v5.3z" fill="#34A853" />
      </svg>
    ),
  },
  // {
  //   name: 'Azure',
  //   category: 'compute',
  //   logo: (
  //     <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
  //       <rect width="32" height="32" rx="6" fill="#0078D4" />
  //       <path d="M8 23h7l6-12-4-4L8 23z" fill="white" opacity="0.9" />
  //       <path d="M13 7l4 4-8 12h7.5L24 23 13 7z" fill="white" />
  //     </svg>
  //   ),
  // },
  // {
  //   name: 'GitHub Actions',
  //   category: 'ci',
  //   logo: (
  //     <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
  //       <rect width="32" height="32" rx="6" fill="#161B22" />
  //       <path
  //         fillRule="evenodd"
  //         clipRule="evenodd"
  //         d="M16 5C10.477 5 6 9.477 6 15a9.994 9.994 0 0 0 6.84 9.504c.5.093.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 16 9.845a9.59 9.59 0 0 1 2.504.338c1.909-1.297 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10 10 0 0 0 26 15c0-5.523-4.477-10-10-10z"
  //         fill="white"
  //       />
  //     </svg>
  //   ),
  // },
  // {
  //   name: 'GitLab CI',
  //   category: 'ci',
  //   logo: (
  //     <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
  //       <rect width="32" height="32" rx="6" fill="#FC6D26" />
  //       <path d="M16 25l4-12H12L16 25z" fill="white" />
  //       <path d="M16 25L8 12l3-5 5 18z" fill="rgba(255,255,255,0.7)" />
  //       <path d="M16 25l8-13-3-5-5 18z" fill="rgba(255,255,255,0.7)" />
  //     </svg>
  //   ),
  // },
  // {
  //   name: 'CircleCI',
  //   category: 'ci',
  //   logo: (
  //     <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
  //       <rect width="32" height="32" rx="6" fill="#343434" />
  //       <circle cx="16" cy="16" r="8" stroke="white" strokeWidth="2" fill="none" />
  //       <circle cx="16" cy="16" r="3" fill="white" />
  //     </svg>
  //   ),
  // },
  // {
  //   name: 'Terraform',
  //   category: 'iac',
  //   logo: (
  //     <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
  //       <rect width="32" height="32" rx="6" fill="#7B42BC" />
  //       <path
  //         d="M13 10l5 2.9v5.8L13 21.6V10zm6.5 3.8l5 2.9v5.8l-5-2.9v-5.8zm-13 0l5 2.9v5.8l-5-2.9v-5.8z"
  //         fill="white"
  //       />
  //     </svg>
  //   ),
  // },
  // {
  //   name: 'Datadog',
  //   category: 'observability',
  //   logo: (
  //     <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
  //       <rect width="32" height="32" rx="6" fill="#632CA6" />
  //       <path d="M22 10H10v12h12V10zm-2 10H12v-8h8v8z" fill="white" />
  //       <path d="M14 14h4v4h-4v-4z" fill="white" />
  //     </svg>
  //   ),
  // },
  // {
  //   name: 'Prometheus',
  //   category: 'observability',
  //   logo: (
  //     <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
  //       <rect width="32" height="32" rx="6" fill="#E6522C" />
  //       <circle cx="16" cy="16" r="8" stroke="white" strokeWidth="1.5" fill="none" />
  //       <circle cx="16" cy="16" r="2.5" fill="white" />
  //       <path
  //         d="M16 8v3M16 21v3M8 16h3M21 16h3"
  //         stroke="white"
  //         strokeWidth="1.5"
  //         strokeLinecap="round"
  //       />
  //     </svg>
  //   ),
  // },
  // {
  //   name: 'PagerDuty',
  //   category: 'alerting',
  //   logo: (
  //     <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
  //       <rect width="32" height="32" rx="6" fill="#06AC38" />
  //       <path
  //         d="M20 8c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V8h4zm-4 9h5v7h-5v-7zM8 8h4v16H8V8z"
  //         fill="white"
  //       />
  //     </svg>
  //   ),
  // },
  // {
  //   name: 'Slack',
  //   category: 'alerting',
  //   logo: (
  //     <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
  //       <rect width="32" height="32" rx="6" fill="#4A154B" />
  //       <path
  //         d="M13 8a2 2 0 1 0 0 4h2V8h-2zm0 4H8a2 2 0 1 0 0 4h5v-4zm10-4h-2v4h5a2 2 0 1 0 0-4h-3zM19 8a2 2 0 1 0 4 0h-4zm0 8H8a2 2 0 1 0 0 4h11v-4zm-8 4v4a2 2 0 1 0 4 0v-4h-4zm8 0h-2v4a2 2 0 1 0 4 0 2 2 0 0 0-2-4zm3-4a2 2 0 1 0 0 4h5a2 2 0 1 0 0-4h-5z"
  //         fill="white"
  //       />
  //     </svg>
  //   ),
  // },
  // {
  //   name: 'Docker',
  //   category: 'compute',
  //   logo: (
  //     <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
  //       <rect width="32" height="32" rx="6" fill="#2496ED" />
  //       <path
  //         d="M7 17a5 5 0 0 0 5 5h10a5 5 0 0 0 0-10H21v-1a1 1 0 0 0-1-1h-2V9H9v3H7v5z"
  //         fill="white"
  //         opacity="0.9"
  //       />
  //       <rect x="9" y="13" width="2" height="2" rx="0.5" fill="#2496ED" />
  //       <rect x="12" y="13" width="2" height="2" rx="0.5" fill="#2496ED" />
  //       <rect x="15" y="13" width="2" height="2" rx="0.5" fill="#2496ED" />
  //       <rect x="12" y="10" width="2" height="2" rx="0.5" fill="#2496ED" />
  //     </svg>
  //   ),
  // },
  // {
  //   name: 'Grafana',
  //   category: 'observability',
  //   logo: (
  //     <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
  //       <rect width="32" height="32" rx="6" fill="#F46800" />
  //       <path
  //         d="M16 7a9 9 0 1 0 0 18A9 9 0 0 0 16 7zm0 3a6 6 0 0 1 5.83 4.56A5.5 5.5 0 0 0 16 13a5.5 5.5 0 0 0-5.83 1.56A6 6 0 0 1 16 10zm0 11a6 6 0 0 1-4.7-2.28A4 4 0 0 0 16 20a4 4 0 0 0 4.7-1.28A6 6 0 0 1 16 21z"
  //         fill="white"
  //       />
  //     </svg>
  //   ),
  // },
]

export function Integrations() {
  const ref = useScrollReveal()

  return (
    <section className="py-20 lg:py-28 border-t border-line" ref={ref}>
      <Container>
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            Integrations
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-medium tracking-[-0.02em] text-ink">
            Works with your entire stack.
          </h2>
          <p className="text-sm text-ink-secondary leading-relaxed max-w-md">
            Drop into your existing CI/CD pipeline in minutes. No forklift upgrades, no lock-in.
          </p>
        </div>

        {/* Integration grid */}
        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3"
          data-reveal
        >
          {integrations.map((i) => (
            <Card
              key={i.name}
              padding="sm"
              interactive
              className="group flex flex-col items-center justify-center gap-2 text-center"
            >
              <div className="w-9 h-9 flex items-center justify-center">{i.logo}</div>
              <span className="text-[11px] text-ink-tertiary group-hover:text-ink-secondary leading-tight transition-colors font-medium">
                {i.name}
              </span>
            </Card>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-ink-tertiary">
          And many more via our open API and CLI.{' '}
          <a href="/docs" className="text-primary-accessible hover:text-primary transition-colors">
            Browse the directory →
          </a>
        </p>
      </Container>
    </section>
  )
}
