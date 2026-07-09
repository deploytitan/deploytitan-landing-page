'use client'

import type { ReactNode } from 'react'
import { PortableText, type PortableTextComponents } from 'next-sanity'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { CodeBlock, InlineCode } from '@/components/shared/CodeBlock'
import {
  buildArticleTrackingPayload,
  type ArticleAnalyticsContext,
  trackEvent,
} from '@/lib/analytics'
import { slugifyHeading } from '@/lib/articles'

type Lang = 'bash' | 'yaml' | 'powershell' | 'dockerfile' | 'tsx' | 'hcl' | 'diff' | 'json'

const KNOWN_LANGS: Lang[] = [
  'bash',
  'yaml',
  'powershell',
  'dockerfile',
  'tsx',
  'hcl',
  'diff',
  'json',
]

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
        className="hover:text-primary focus-visible:text-primary inline-flex min-h-11 items-center gap-2 decoration-transparent transition-colors"
      >
        <span>{children}</span>
        <span
          aria-hidden="true"
          className="text-ink-secondary font-mono text-xs opacity-0 transition-opacity group-focus-within/heading:opacity-100 group-hover/heading:opacity-100"
        >
          #
        </span>
      </a>
    </Tag>
  )
}

function createComponents(articleContext?: ArticleAnalyticsContext): PortableTextComponents {
  return {
    block: {
      // Downgrade editor h1 blocks to h2 so the page keeps a single visible h1.
      h1: ({ children }) => (
        <HeadingLink
          level="h2"
          className="text-ink mt-14 mb-5 text-3xl leading-tight font-semibold tracking-[-0.015em]"
        >
          {children}
        </HeadingLink>
      ),
      h2: ({ children }) => (
        <HeadingLink
          level="h2"
          className="text-ink mt-14 mb-4 text-[2rem] leading-tight font-semibold tracking-[-0.015em]"
        >
          {children}
        </HeadingLink>
      ),
      h3: ({ children }) => (
        <HeadingLink
          level="h3"
          className="text-ink mt-10 mb-3 text-[1.45rem] leading-snug font-semibold tracking-[-0.01em]"
        >
          {children}
        </HeadingLink>
      ),
      h4: ({ children }) => (
        <HeadingLink level="h4" className="text-ink mt-6 mb-2 text-base font-semibold">
          {children}
        </HeadingLink>
      ),
      normal: ({ children }) => (
        <p className="text-ink-secondary mb-4 text-[1.0625rem] leading-7">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-line bg-surface-alt/45 text-ink-secondary my-7 rounded-[var(--radius-standard)] border px-6 py-5 text-[1.05rem] leading-7 italic">
          {children}
        </blockquote>
      ),
    },

    list: {
      bullet: ({ children }) => (
        <ul className="text-ink-secondary mb-5 ml-5 flex list-disc flex-col gap-2 text-[1.0625rem] leading-7">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="text-ink-secondary mb-5 ml-5 flex list-decimal flex-col gap-2 text-[1.0625rem] leading-7">
          {children}
        </ol>
      ),
    },

    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },

    marks: {
      strong: ({ children }) => <strong className="text-ink font-semibold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => <InlineCode variant="accent">{children}</InlineCode>,
      link: ({ value, children }) => {
        const target = value?.href?.startsWith('http') ? '_blank' : undefined
        return (
          <a
            href={value?.href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className="text-primary-accessible decoration-primary/35 hover:text-primary hover:decoration-primary underline underline-offset-4 transition-colors"
            onClick={() => {
              const payload = {
                href: value?.href ?? '',
                external: target === '_blank',
              }
              trackEvent(
                target === '_blank' ? 'outboundToolLinkClicked' : 'relatedArticleClicked',
                articleContext ? buildArticleTrackingPayload(articleContext, payload) : payload,
              )
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
            <div className="border-line bg-surface-alt/40 overflow-hidden rounded-[var(--radius-standard)] border">
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
              <figcaption className="text-ink-secondary mt-3 text-center font-mono text-[11px]">
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
              articleContext={articleContext}
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
          <aside className={`my-8 rounded-[var(--radius-standard)] border px-5 py-5 ${toneClass}`}>
            {value?.title && (
              <h3 className="text-ink mb-2 text-base font-semibold">{value.title}</h3>
            )}
            <p className="text-ink-secondary text-sm leading-7">{value?.body}</p>
          </aside>
        )
      },
      diagramBlock: ({ value }) => {
        const imageUrl = value?.image?.asset ? urlFor(value.image).width(1200).url() : null
        return (
          <figure className="border-line bg-surface-alt/45 my-8 rounded-[var(--radius-standard)] border p-5">
            {value?.title && <h3 className="text-ink mb-3 text-lg font-semibold">{value.title}</h3>}
            {imageUrl && (
              <button
                type="button"
                className="border-line block w-full overflow-hidden rounded-[var(--radius-serious)] border"
                onClick={() =>
                  trackEvent(
                    'diagramOpened',
                    articleContext
                      ? buildArticleTrackingPayload(articleContext, {
                          title: value?.title ?? 'diagram',
                          diagramId: value?._key ?? value?.title ?? 'diagram',
                        })
                      : { title: value?.title ?? 'diagram' },
                  )
                }
              >
                <Image
                  src={imageUrl}
                  alt={value?.title ?? 'Diagram'}
                  width={1200}
                  height={675}
                  style={{ width: '100%', height: 'auto' }}
                />
              </button>
            )}
            {value?.code && (
              <div className="mt-4">
                <CodeBlock
                  code={value.code}
                  lang="bash"
                  filename="diagram.txt"
                  articleContext={articleContext}
                />
              </div>
            )}
            {value?.description && (
              <figcaption className="text-ink-secondary mt-3 text-sm">
                {value.description}
              </figcaption>
            )}
          </figure>
        )
      },
      tableBlock: ({ value }) => {
        const columns = Array.isArray(value?.columns) ? value.columns : []
        const rows = Array.isArray(value?.rows) ? value.rows : []
        return (
          <figure className="border-line my-8 overflow-hidden rounded-[var(--radius-serious)] border">
            <div className="overflow-x-auto">
              <table className="divide-line min-w-full divide-y text-left text-sm">
                <thead className="bg-surface-alt/80">
                  <tr>
                    {columns.map((column: string) => (
                      <th key={column} className="text-ink px-4 py-3 font-semibold">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row: { _key?: string; cells?: string[] }) => (
                    <tr key={row._key ?? row.cells?.join('-')} className="border-line border-t">
                      {(row.cells ?? []).map((cell) => (
                        <td key={cell} className="text-ink-secondary px-4 py-3">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {value?.caption && (
              <figcaption className="border-line bg-surface-alt/50 text-ink-secondary border-t px-4 py-3 text-xs">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
    },
  }
}

interface PortableTextRendererProps {
  value: Parameters<typeof PortableText>[0]['value']
  articleContext?: ArticleAnalyticsContext
}

export function PortableTextRenderer({ value, articleContext }: PortableTextRendererProps) {
  return <PortableText value={value} components={createComponents(articleContext)} />
}
