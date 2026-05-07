'use client'

import { useEffect, useState } from 'react'
import { cn } from '../../utils'
import { useTheme } from '../../hooks/useTheme'

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

// Inline theme overrides applied via CSS variables on the container
const SHIKI_OVERRIDES = `
  .shiki, .shiki span { font-family: var(--font-mono); font-size: 13px; line-height: 1.7; }
  .shiki { background: transparent !important; }
`

type Lang = 'bash' | 'yaml' | 'powershell' | 'dockerfile' | 'tsx' | 'hcl' | 'diff' | 'json'

interface CodeBlockProps {
  code: string
  lang?: Lang
  filename?: string
  /** Show copy button */
  copy?: boolean
  className?: string
}

export function CodeBlock({
  code,
  lang = 'bash',
  filename = 'terminal',
  copy = true,
  className,
}: CodeBlockProps) {
  const { resolved } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use a stable server-safe default until mounted to match SSR output exactly.
  const theme = mounted ? resolved : 'light'
  const shikiTheme = theme === 'dark' ? 'github-dark' : 'github-light'
  const bgColor = theme === 'dark' ? '#0d1117' : '#f6f8fa'
  const textMuted = theme === 'dark' ? 'text-white/40' : 'text-black/40'
  const textAction =
    theme === 'dark' ? 'text-white/30 hover:text-white/60' : 'text-black/30 hover:text-black/60'
  const headerBg =
    theme === 'dark' ? 'border-white/[0.06] bg-white/[0.02]' : 'border-black/[0.06] bg-black/[0.02]'

  const [html, setHtml] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const trimmed = code.trim()

  useEffect(() => {
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
  }, [trimmed, lang, shikiTheme])
  const handleCopy = async () => {
    await navigator.clipboard.writeText(trimmed)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div
      className={cn('border border-line overflow-hidden', className)}
      style={{ borderRadius: '2px', backgroundColor: bgColor }}
    >
      {/* Header bar */}
      {(filename || copy) && (
        <div className={cn('flex items-center justify-between px-4 py-2.5 border-b', headerBg)}>
          {filename ? (
            <span className={cn('font-mono text-[11px]', textMuted)}>{filename}</span>
          ) : (
            <span />
          )}
          {copy && (
            <button
              onClick={handleCopy}
              className={cn(
                'flex items-center gap-1.5 text-[11px] font-mono transition-colors',
                textAction,
              )}
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
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
      <div className="px-4 py-4 overflow-x-auto">
        <style>{SHIKI_OVERRIDES}</style>
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
    </div>
  )
}
