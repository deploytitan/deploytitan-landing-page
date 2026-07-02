'use client'

import type { ReactNode } from 'react'
import { PortableText, type PortableTextComponents } from 'next-sanity'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { CodeBlock, InlineCode } from '@/components/shared/CodeBlock'
import { trackEvent } from '@/lib/analytics'
import { slugifyHeading } from '@/lib/articles'

type Lang = 'bash' | 'yaml' | 'powershell' | 'dockerfile' | 'tsx' | 'hcl' | 'diff' | 'json'

const KNOWN_LANGS: Lang[] = ['bash', 'yaml', 'powershell', 'dockerfile', 'tsx', 'hcl', 'diff', 'json']

function toKnownLang(lang?: string): Lang {
  if (lang && KNOWN_LANGS.includes(lang as Lang)) return lang as Lang
  return 'bash'
}

function plainTextFromChildren(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children)
  }
  if (Array.isArray(children)) {
    return children.map(plainTextFromChildren).join('')
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return plainTextFromChildren((children as { props?: { children?: ReactNode } }).props?.children)
  }
  return ''
}

function headingId(children: ReactNode) {
  return slugifyHeading(plainTextFromChildren(children))
}

function HeadingLink({
  level,
  children,
  className,
}: {
  level: 'h1' | 'h2' | 'h3' | 'h4'
  children: ReactNode
  className: string
}) {
  const id = headingId(children)
  const Tag = level

  return (
    <Tag id={id} className={`group/heading scroll-mt-28 ${className}`}>
      <a
        href={`#${id}`}
        className="inline-flex items-baseline gap-2 decoration-transparent transition-colors hover:text-primary focus-visible:text-primary"
      >
        <span>{children}</span>
        <span
          aria-hidden="true"
          className="font-mono text-xs text-ink-quaternary opacity-0 transition-opacity group-hover/heading:opacity-100 group-focus-within/heading:opacity-100"
        >
          #
        </span>
      </a>
    </Tag>
  )
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <HeadingLink level="h1" className="text-3xl font-semibold text-ink mt-10 mb-4 leading-tight">
        {children}
      </HeadingLink>
    ),
    h2: ({ children }) => (
      <HeadingLink level="h2" className="text-2xl font-semibold text-ink mt-10 mb-3 leading-tight">
        {children}
      </HeadingLink>
    ),
    h3: ({ children }) => (
      <HeadingLink level="h3" className="text-xl font-semibold text-ink mt-8 mb-2 leading-snug">
        {children}
      </HeadingLink>
    ),
    h4: ({ children }) => (
      <HeadingLink level="h4" className="text-base font-semibold text-ink mt-6 mb-2">
        {children}
      </HeadingLink>
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
            trackEvent(target === '_blank' ? 'outboundToolLinkClicked' : 'relatedArticleClicked', payload)
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
    calloutBlock: ({ value }) => {
      const tone = value?.tone ?? 'note'
      const toneClass =
        tone === 'warning'
          ? 'border-amber-500/30 bg-amber-500/5'
          : tone === 'insight'
            ? 'border-primary/30 bg-primary/5'
            : 'border-line bg-surface-alt/60'
      return (
        <aside className={`my-8 rounded-[2px] border px-5 py-4 ${toneClass}`}>
          {value?.title && <h3 className="mb-2 text-sm font-semibold text-ink">{value.title}</h3>}
          <p className="text-sm leading-relaxed text-ink-secondary">{value?.body}</p>
        </aside>
      )
    },
    diagramBlock: ({ value }) => {
      const imageUrl = value?.image?.asset ? urlFor(value.image).width(1200).url() : null
      return (
        <figure className="my-8 rounded-[2px] border border-line bg-surface-alt/50 p-4">
          {value?.title && <h3 className="mb-2 text-base font-semibold text-ink">{value.title}</h3>}
          {imageUrl && (
            <button
              type="button"
              className="block w-full overflow-hidden rounded-[2px] border border-line"
              onClick={() => trackEvent('diagramOpened', { title: value?.title ?? 'diagram' })}
            >
              <Image src={imageUrl} alt={value?.title ?? 'Diagram'} width={1200} height={675} style={{ width: '100%', height: 'auto' }} />
            </button>
          )}
          {value?.code && (
            <div className="mt-4">
              <CodeBlock code={value.code} lang="bash" filename="diagram.txt" />
            </div>
          )}
          {value?.description && <figcaption className="mt-3 text-sm text-ink-secondary">{value.description}</figcaption>}
        </figure>
      )
    },
    tableBlock: ({ value }) => {
      const columns = Array.isArray(value?.columns) ? value.columns : []
      const rows = Array.isArray(value?.rows) ? value.rows : []
      return (
        <figure className="my-8 overflow-hidden rounded-[2px] border border-line">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-line text-left text-sm">
              <thead className="bg-surface-alt/80">
                <tr>
                  {columns.map((column: string) => (
                    <th key={column} className="px-4 py-3 font-semibold text-ink">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row: { _key?: string; cells?: string[] }) => (
                  <tr key={row._key ?? row.cells?.join('-')} className="border-t border-line">
                    {(row.cells ?? []).map((cell) => (
                      <td key={cell} className="px-4 py-3 text-ink-secondary">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {value?.caption && <figcaption className="border-t border-line bg-surface-alt/50 px-4 py-3 text-xs text-ink-tertiary">{value.caption}</figcaption>}
        </figure>
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
