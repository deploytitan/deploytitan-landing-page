import posthog from 'posthog-js'
import { PortableText, type PortableTextComponents } from 'next-sanity'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { CodeBlock, InlineCode } from '@/components/shared/CodeBlock'

type Lang = 'bash' | 'yaml' | 'powershell' | 'dockerfile' | 'tsx' | 'hcl' | 'diff' | 'json'

const KNOWN_LANGS: Lang[] = ['bash', 'yaml', 'powershell', 'dockerfile', 'tsx', 'hcl', 'diff', 'json']

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function toKnownLang(lang?: string): Lang {
  if (lang && KNOWN_LANGS.includes(lang as Lang)) return lang as Lang
  return 'bash'
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-semibold text-ink mt-10 mb-4 leading-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-ink mt-10 mb-3 leading-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-ink mt-8 mb-2 leading-snug">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-semibold text-ink mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-base text-ink-secondary leading-relaxed mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary pl-5 my-6 text-ink-secondary italic leading-relaxed">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-5 mb-5 flex flex-col gap-1.5 text-ink-secondary text-base leading-relaxed">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-5 mb-5 flex flex-col gap-1.5 text-ink-secondary text-base leading-relaxed">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },

  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <InlineCode variant="accent">{children}</InlineCode>
    ),
    link: ({ value, children }) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary underline underline-offset-2 hover:text-primary-dark transition-colors"
          onClick={() => {
            const payload = {
              href: value?.href ?? '',
              external: target === '_blank',
            }
            posthog.capture('blog_content_link_clicked', payload)
            window.gtag?.('event', 'blog_content_link_clicked', payload)
          }}
        >
          {children}
        </a>
      )
    },
  },

  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <div className="sharp-card border border-line overflow-hidden">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt ?? ''}
              width={1200}
              height={0}
              style={{ width: '100%', height: 'auto' }}
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-xs text-ink-tertiary font-mono mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    code: ({ value }) => {
      return (
        <div className="my-6">
          <CodeBlock
            code={value.code ?? ''}
            lang={toKnownLang(value.language)}
            filename={value.filename}
          />
        </div>
      )
    },
  },
}

interface PortableTextRendererProps {
  value: Parameters<typeof PortableText>[0]['value']
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return <PortableText value={value} components={components} />
}
