'use client'

import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

type ArticleHeading = {
  level: number
  text: string
  id: string
}

type ArticleTableOfContentsProps = {
  headings: ArticleHeading[]
  headingId: string
  variant?: 'mobile' | 'desktop'
  hideHeading?: boolean
}

export function ArticleTableOfContents({
  headings,
  headingId,
  variant = 'desktop',
  hideHeading = false,
}: ArticleTableOfContentsProps) {
  const headingIds = useMemo(() => headings.map((heading) => heading.id), [headings])
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '')
  const [readIds, setReadIds] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    if (headingIds.length === 0) return

    const updateReadState = () => {
      const currentReadIds = new Set<string>()
      let currentActiveId = headingIds[0]
      const marker = window.scrollY + 136

      for (const id of headingIds) {
        const element = document.getElementById(id)
        if (!element) continue

        const top = element.getBoundingClientRect().top + window.scrollY
        if (top <= marker) {
          currentReadIds.add(id)
          currentActiveId = id
        }
      }

      setActiveId(currentActiveId)
      setReadIds(currentReadIds)
    }

    updateReadState()
    window.addEventListener('scroll', updateReadState, { passive: true })
    window.addEventListener('resize', updateReadState)

    return () => {
      window.removeEventListener('scroll', updateReadState)
      window.removeEventListener('resize', updateReadState)
    }
  }, [headingIds])

  if (headings.length === 0) return null

  return (
    <section aria-labelledby={headingId}>
      {hideHeading ? (
        <h2 id={headingId} className="sr-only">
          On this page
        </h2>
      ) : (
        <h2
          id={headingId}
          className="text-ink-tertiary mb-4 font-mono text-[10px] tracking-[0.2em] uppercase"
        >
          On this page
        </h2>
      )}
      <ol className={cn('text-sm', variant === 'mobile' ? 'space-y-2.5' : 'space-y-3')}>
        {headings.map((heading) => {
          const isActive = heading.id === activeId
          const isRead = readIds.has(heading.id) && !isActive

          return (
            <li
              key={`${variant}-${heading.level}-${heading.text}`}
              className={heading.level > 2 ? 'pl-3' : ''}
            >
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'group/toc grid grid-cols-[0.5rem_minmax(0,1fr)] items-start gap-2 transition-colors',
                  isActive
                    ? 'text-primary-accessible'
                    : isRead
                      ? 'text-ink-quaternary hover:text-primary'
                      : 'text-ink-secondary hover:text-primary',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-[0.65em] h-1.5 w-1.5 rounded-full border transition-colors',
                    isActive
                      ? 'border-primary bg-primary'
                      : isRead
                        ? 'border-line bg-line'
                        : 'border-ink-quaternary group-hover/toc:border-primary bg-transparent',
                  )}
                />
                <span className={cn('min-w-0', isRead && 'decoration-line line-through')}>
                  {heading.text}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
