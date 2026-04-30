import { useState } from 'react'
import { CodeBlock } from './CodeBlock'
import { cn } from '../../utils'

const TABS = [
  {
    id: 'brew',
    label: 'macOS',
    sublabel: 'Homebrew',
    lang: 'bash' as const,
    code: `brew install deploytitan/tap/dt`,
  },
  {
    id: 'curl',
    label: 'Linux',
    sublabel: 'curl',
    lang: 'bash' as const,
    code: `curl -fsSL https://get.deploytitan.com/install.sh | sh`,
  },
  {
    id: 'scoop',
    label: 'Windows',
    sublabel: 'Scoop',
    lang: 'powershell' as const,
    code: `scoop bucket add deploytitan https://github.com/deploytitan/scoop-bucket
scoop install dt`,
  },
  {
    id: 'npm',
    label: 'npm',
    sublabel: 'Node.js',
    lang: 'bash' as const,
    code: `npm install -g @deploytitan/cli`,
  },
  {
    id: 'docker',
    label: 'Docker',
    sublabel: 'Container',
    lang: 'bash' as const,
    code: `docker run --rm -it ghcr.io/deploytitan/dt:latest dt --version`,
  },
]

export function InstallTabs({ className }: { className?: string }) {
  const [active, setActive] = useState(TABS[0].id)
  const tab = TABS.find((t) => t.id === active)!

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Tab bar */}
      <div className="flex border border-line overflow-hidden" style={{ borderRadius: '2px 2px 0 0' }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              'flex-1 flex flex-col items-center py-2.5 px-2 text-center transition-colors border-r border-line last:border-r-0 text-[11px] font-medium gap-0.5',
              active === t.id
                ? 'bg-white/[0.04] text-primary'
                : 'bg-transparent text-ink-tertiary hover:text-ink-secondary hover:bg-ink/[0.02]',
            )}
          >
            <span>{t.label}</span>
            <span className={cn('text-[10px] font-normal', active === t.id ? 'text-primary/70' : 'text-ink-quaternary')}>{t.sublabel}</span>
          </button>
        ))}
      </div>
      {/* Code panel — no top border-radius because tab bar sits flush above */}
      <CodeBlock
        code={tab.code}
        lang={tab.lang}
        copy
        className="border-t-0 !rounded-t-none"
      />
    </div>
  )
}
