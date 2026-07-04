'use client'

import { useEffect, useState } from 'react'
import { cn } from '../../utils'
import { useTheme } from '../../hooks/useTheme'
import { buildArticleTrackingPayload, type ArticleAnalyticsContext, trackEvent } from '@/lib/analytics'

// Re-export InlineCode from its own module so importers that only need
// InlineCode don't pull in this file (and the Shiki dynamic import chain).
export { InlineCode } from './InlineCode'

// Lazy-load shiki so it doesn't block initial render
let highlighterPromise: Promise<import('shiki').Highlighter> | null = null

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import('shiki').then(({ createHighlighter }) =>
      createHighlighter({
        themes: ['github-dark', 'github-light'],
        langs: ['bash', 'yaml', 'powershell', 'dockerfile', 'tsx', 'hcl', 'diff', 'json'],
      }),
    )
  }
  return highlighterPromise
}

// Shiki CSS overrides are in globals.css — no inline style injection needed

export type Lang = 'bash' | 'yaml' | 'powershell' | 'dockerfile' | 'tsx' | 'hcl' | 'diff' | 'json'

/**
 * `code`     — standard code block, no header decoration (default)
 * `terminal` — shows 3 traffic-light indicator dots in the header
 */
export type CodeBlockVariant = 'code' | 'terminal'

interface CodeBlockProps {
  /** The code string to highlight via Shiki. Omit when using `children` for pre-colored JSX. */
  code?: string
  lang?: Lang
  /** Label shown in the header bar. Defaults to "terminal" for terminal variant, filename otherwise. */
  filename?: string
  /** @default true */
  copy?: boolean
  /** "code" (default) | "terminal" — adds traffic-light dots to the header */
  variant?: CodeBlockVariant
  /**
   * When provided, renders `children` directly in the code body instead of Shiki.
   * Use for hand-colored JSX output panels (terminal logs, etc.). `code` prop is ignored.
   */
  children?: React.ReactNode
  className?: string
  articleContext?: ArticleAnalyticsContext
}

/** Traffic-light dots for the terminal variant header */
function TerminalDots() {
  return (
    <>
      <span className="w-2.5 h-2.5 bg-signal-danger/40" style={{ borderRadius: '1px' }} />
      <span className="w-2.5 h-2.5 bg-signal-warning/40" style={{ borderRadius: '1px' }} />
      <span className="w-2.5 h-2.5 bg-signal-success/40" style={{ borderRadius: '1px' }} />
    </>
  )
}

export function CodeBlock({
  code,
  lang = 'bash',
  filename,
  copy = true,
  variant = 'code',
  children,
  className,
  articleContext,
}: CodeBlockProps) {
  const { resolved } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use a stable server-safe default until mounted to match SSR output exactly.
  const theme = mounted ? resolved : 'light'
  const shikiTheme = theme === 'dark' ? 'github-dark' : 'github-light'
  const bgColor = theme === 'dark' ? 'var(--color-dark-surface, #0d0c0a)' : 'var(--color-surface-alt, #f5f4f1)'
  const textMuted = theme === 'dark' ? 'text-white/40' : 'text-black/40'
  const textAction =
    theme === 'dark' ? 'text-white/30 hover:text-white/60' : 'text-black/30 hover:text-black/60'
  const headerBg =
    theme === 'dark' ? 'border-white/[0.06] bg-white/[0.02]' : 'border-black/[0.06] bg-black/[0.02]'

  const [html, setHtml] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const hasShiki = !children && !!code
  const trimmed = code?.trim() ?? ''

  // Default filename label
  const label = filename ?? (variant === 'terminal' ? 'terminal' : undefined)

  // Whether to show the header bar at all
  const showHeader = variant === 'terminal' || !!label || (copy && hasShiki)

  useEffect(() => {
    if (!hasShiki) return
    let cancelled = false
    setHtml(null)
    getHighlighter().then((hl) => {
      if (cancelled) return
      const rendered = hl.codeToHtml(trimmed, {
        lang,
        theme: shikiTheme,
      })
      setHtml(rendered)
    })
    return () => {
      cancelled = true
    }
  }, [trimmed, lang, shikiTheme, hasShiki])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(trimmed)
    trackEvent(
      'codeCopied',
      articleContext
        ? buildArticleTrackingPayload(articleContext, {
            filename: filename ?? null,
            language: lang,
            characters: trimmed.length,
          })
        : {
            filename: filename ?? null,
            language: lang,
            characters: trimmed.length,
          },
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div
      className={cn('border border-line overflow-hidden', className)}
      style={{ borderRadius: '2px', backgroundColor: bgColor }}
    >
      {/* Header bar */}
      {showHeader && (
        <div className={cn('flex items-center gap-2 px-4 py-2.5 border-b', headerBg)}>
          {/* Traffic-light dots for terminal variant */}
          {variant === 'terminal' && <TerminalDots />}

          {/* Filename / label */}
          {label ? (
            <span className={cn('font-mono text-[11px]', textMuted, variant === 'terminal' && 'ml-0.5')}>
              {label}
            </span>
          ) : (
            <span className="flex-1" />
          )}

          {/* Copy button — only shown when Shiki mode is active */}
          {copy && hasShiki && (
            <button
              onClick={handleCopy}
              className={cn(
                'ml-auto flex items-center gap-1.5 text-[11px] font-mono transition-colors',
                textAction,
              )}
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Code body */}
      {children ? (
        // Pre-colored JSX children: standard body padding, mono text sizing matches Shiki output
        <div className="px-5 py-5 font-mono text-[13px] leading-[1.7] overflow-x-auto">
          {children}
        </div>
      ) : (
        <div className="px-4 py-4 overflow-x-auto">
          {html ? (
            <div dangerouslySetInnerHTML={{ __html: html }} />
          ) : (
            // Plain-text fallback while shiki loads
            <pre
              className={cn(
                'font-mono text-[13px] leading-[1.7] whitespace-pre',
                theme === 'dark' ? 'text-white/70' : 'text-black/70',
              )}
            >
              {trimmed}
            </pre>
          )}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// InlineCode — see ./InlineCode.tsx (re-exported above)
// ---------------------------------------------------------------------------
