import { useState, useEffect } from 'react'
import { cn } from '../../utils'

// Lazy-load shiki so it doesn't block initial render
let highlighterPromise: Promise<import('shiki').Highlighter> | null = null

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import('shiki').then(({ createHighlighter }) =>
      createHighlighter({
        themes: ['github-dark'],
        langs: ['bash', 'yaml', 'powershell', 'dockerfile', 'tsx', 'hcl', 'diff'],
      })
    )
  }
  return highlighterPromise
}

// Inline theme overrides applied via CSS variables on the container
const SHIKI_OVERRIDES = `
  .shiki, .shiki span { font-family: var(--font-mono); font-size: 13px; line-height: 1.7; }
  .shiki { background: transparent !important; }
`

type Lang = 'bash' | 'yaml' | 'powershell' | 'dockerfile' | 'tsx' | 'hcl' | 'diff'

interface CodeBlockProps {
  code: string
  lang?: Lang
  filename?: string
  /** Show copy button */
  copy?: boolean
  className?: string
}

export function CodeBlock({ code, lang = 'bash', filename, copy = true, className }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const trimmed = code.trim()

  useEffect(() => {
    let cancelled = false
    getHighlighter().then((hl) => {
      if (cancelled) return
      const rendered = hl.codeToHtml(trimmed, {
        lang,
        theme: 'github-dark',
      })
      setHtml(rendered)
    })
    return () => { cancelled = true }
  }, [trimmed, lang])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(trimmed)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div
      className={cn(
        'border border-line bg-[#0d1117] overflow-hidden',
        className,
      )}
      style={{ borderRadius: '2px' }}
    >
      {/* Header bar */}
      {(filename || copy) && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
          {filename ? (
            <span className="font-mono text-[11px] text-white/40">{filename}</span>
          ) : (
            <span />
          )}
          {copy && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-[11px] font-mono text-white/30 hover:text-white/60 transition-colors"
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Copied
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
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
          <pre className="font-mono text-[13px] leading-[1.7] text-white/70 whitespace-pre">{trimmed}</pre>
        )}
      </div>
    </div>
  )
}
