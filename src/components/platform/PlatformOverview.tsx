'use client'

import { useScrollReveal } from '../../utils'
import { Container } from '../shared/Container'

const pains = [
  'Sprint ends Friday. Eight PRs across four repos. One engineer has a dozen GitHub tabs open watching CI.',
  "Jenkins failed on service 3. Did service 4 deploy anyway? Nobody's sure until production breaks.",
  'Release needs a sign-off. That means opening a browser, finding the PR, and hoping the reviewer approved it in time.',
  'Post-sprint retro, slide one: "release chaos." Again. Same as last sprint.',
]

const features = [
  {
    step: '01',
    label: 'Track',
    title: 'All sprint PRs in one view.',
    meta: 'live CI status · across every repo',
    status: 'Live',
  },
  {
    step: '02',
    label: 'Trigger',
    title: 'CI and Jenkins run automatically.',
    meta: 'no manual job-watching required',
    status: 'Auto',
  },
  {
    step: '03',
    label: 'Alert',
    title: 'Job fails? Slack ping, immediately.',
    meta: 'with context — no tab-checking',
    status: 'Instant',
  },
  {
    step: '04',
    label: 'Approve',
    title: '1-click approval requests to stakeholders.',
    meta: 'they receive a Slack message · approve without leaving Slack',
    status: 'In Slack',
  },
  {
    step: '05',
    label: 'Impact',
    title: 'AI release impact report in 15 minutes.',
    meta: 'before vs after metrics · stable or degraded',
    status: 'AI',
  },
]

const integrations = ['GitHub', 'Jenkins', 'Grafana', 'Slack']

const teamFits = [
  'Your sprint touches more than two repos and someone has to watch CI, track metrics, and verify stability before and after every release',
  "Release day means someone's on standby — monitoring dashboards, logs, and Jenkins — waiting for something to go wrong",
  'Approvals are slow because context switching is painful — opening GitHub mid-task kills flow',
  'Post-mortems keep listing "release coordination" as a recurring problem',
]

const differentiators = [
  {
    label: 'No stack switching',
    detail: 'Plugs into GitHub, Jenkins, and Grafana you already run. Nothing to rip out.',
    badge: null,
  },
  {
    label: 'Your team stays in Slack',
    detail: 'Alerts, approvals, and reports land in your channel. Nobody opens a new dashboard.',
    badge: null,
  },
  {
    label: 'Lightweight by design',
    detail:
      'We want you building your product, not learning ours. Connect in minutes, then forget we exist.',
    badge: null,
  },
  {
    label: 'Claude Code MCP server',
    detail:
      'Trigger releases, check PR status, and approve from your Claude Code terminal. No UI required.',
    badge: 'Coming soon',
  },
]

export function PlatformOverview() {
  const ref = useScrollReveal()

  return (
    <div ref={ref}>
      {/* Section 1: The pain */}
      <section id="release-workflow" className="border-line border-b py-20 lg:py-24">
        <Container width="page" padding="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <p
                data-reveal
                className="text-ink-tertiary font-mono text-[11px] tracking-[0.22em] uppercase"
              >
                The problem
              </p>
              <h2
                data-reveal
                data-reveal-delay="1"
                className="font-display text-ink mt-4 max-w-[16ch] text-[clamp(2.3rem,4.2vw,4rem)] leading-[1.02] font-medium tracking-[-0.04em]"
              >
                Every sprint ends the same way.
              </h2>
              <p
                data-reveal
                data-reveal-delay="2"
                className="text-ink-secondary mt-5 max-w-[46ch] text-lg leading-8"
              >
                Multiple engineers stuck babysitting CI, logs, and metrics — while the product
                waits.
              </p>
            </div>

            <div data-reveal data-reveal-delay="2">
              <div className="border-line border" style={{ borderRadius: '2px' }}>
                {pains.map((pain, index) => (
                  <div
                    key={pain}
                    className="border-line grid gap-4 border-b px-5 py-5 last:border-b-0 sm:grid-cols-[48px_1fr]"
                  >
                    <span className="text-ink-tertiary self-start pt-0.5 font-mono text-[10px] tracking-[0.14em] uppercase">
                      0{index + 1}
                    </span>
                    <p className="text-ink-secondary text-base leading-7">{pain}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 2: What DeployTitan does */}
      <section className="border-line relative overflow-hidden border-b py-20 lg:py-28">
        <div
          className="blueprint-grid pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
        />
        <Container width="page" padding="wide">
          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(520px,1.22fr)] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p
                data-reveal
                className="text-ink-tertiary font-mono text-[11px] tracking-[0.22em] uppercase"
              >
                What DeployTitan does
              </p>
              <h2
                data-reveal
                data-reveal-delay="1"
                className="font-display text-ink mt-4 max-w-[11ch] text-[clamp(3rem,5.8vw,5.6rem)] leading-[0.94] font-medium tracking-[-0.055em]"
              >
                Add PRs. We watch. You ship.
              </h2>
              <p
                data-reveal
                data-reveal-delay="2"
                className="text-ink-secondary mt-6 max-w-[42ch] text-lg leading-8"
              >
                Connect GitHub, Jenkins, and Grafana. Add your sprint PRs. Walk away.
              </p>
              <div
                data-reveal
                data-reveal-delay="3"
                className="border-line bg-surface/75 mt-8 grid max-w-[520px] border"
                style={{
                  borderRadius: '2px',
                  gridTemplateColumns: `repeat(${integrations.length}, 1fr)`,
                }}
              >
                {integrations.map((tool, i) => (
                  <div
                    key={tool}
                    className="px-3 py-3 text-center"
                    style={{
                      borderRight:
                        i < integrations.length - 1 ? '1px solid var(--color-line)' : 'none',
                    }}
                  >
                    <p className="text-ink-tertiary font-mono text-[9px] tracking-[0.12em] uppercase">
                      {tool}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              data-reveal
              data-reveal-delay="2"
              className="border-line bg-surface border"
              style={{ borderRadius: '2px' }}
            >
              <div className="border-line bg-surface-alt/70 flex flex-col gap-4 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.16em] uppercase">
                    Sprint release
                  </p>
                  <p className="text-ink mt-1 font-mono text-[11px]">sprint-22 / prod-window</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="bg-signal-warning block h-1.5 w-1.5"
                    style={{ borderRadius: '1px' }}
                  />
                  <p className="text-signal-warning-text dark:text-signal-warning font-mono text-[10px] tracking-[0.12em] uppercase">
                    In progress
                  </p>
                </div>
              </div>

              <div className="divide-line divide-y">
                {features.map((item) => (
                  <div
                    key={item.label}
                    className="hover:bg-surface-alt/55 grid gap-4 px-5 py-5 transition-colors duration-300 sm:grid-cols-[44px_96px_minmax(0,1fr)_92px] sm:items-center"
                  >
                    <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.14em] uppercase">
                      {item.step}
                    </p>
                    <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.14em] uppercase">
                      {item.label}
                    </p>
                    <div>
                      <p className="text-ink text-base leading-6">{item.title}</p>
                      <p className="text-ink-tertiary mt-1 font-mono text-[10px] leading-5">
                        {item.meta}
                      </p>
                    </div>
                    <p className="border-line bg-surface-alt text-ink-secondary w-fit border px-2 py-1 font-mono text-[9px] tracking-[0.12em] uppercase sm:justify-self-end">
                      {item.status}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-line bg-primary/[0.035] grid border-t sm:grid-cols-3">
                {['No war room', 'No babysitting', 'No infra changes'].map((item) => (
                  <div key={item} className="border-line px-5 py-4 sm:border-r sm:last:border-r-0">
                    <p className="text-primary-accessible font-mono text-[10px] tracking-[0.1em] uppercase">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 3: How we're different */}
      <section className="border-line border-b py-20 lg:py-24">
        <Container width="page" padding="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <p
                data-reveal
                className="text-ink-tertiary font-mono text-[11px] tracking-[0.22em] uppercase"
              >
                Why DeployTitan
              </p>
              <h2
                data-reveal
                data-reveal-delay="1"
                className="font-display text-ink mt-4 max-w-[14ch] text-[clamp(2.3rem,4.2vw,4rem)] leading-[1.02] font-medium tracking-[-0.04em]"
              >
                Your stack. Your Slack. Zero friction.
              </h2>
              <p
                data-reveal
                data-reveal-delay="2"
                className="text-ink-secondary mt-5 max-w-[48ch] text-lg leading-8"
              >
                Other tools ask you to adopt their platform, their CI, their workflows. DeployTitan
                plugs into what you already run. Your team never opens a new dashboard — everything
                comes to them.
              </p>
            </div>

            <div data-reveal data-reveal-delay="2" className="space-y-3">
              {differentiators.map((d) => (
                <div
                  key={d.label}
                  className="border-line bg-surface-alt/35 border px-5 py-5"
                  style={{ borderRadius: '2px' }}
                >
                  <div className="flex items-center gap-3">
                    <p className="text-ink text-base font-medium">{d.label}</p>
                    {d.badge && (
                      <span
                        className="text-primary-accessible border-primary/25 border px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] uppercase"
                        style={{ borderRadius: '4px' }}
                      >
                        {d.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-ink-secondary mt-1.5 text-sm leading-6">{d.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Section 4: Who it's for + CTA */}
      <section className="py-20 lg:py-24">
        <Container width="page" padding="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <p
                data-reveal
                className="text-ink-tertiary font-mono text-[11px] tracking-[0.22em] uppercase"
              >
                Built for
              </p>
              <h2
                data-reveal
                data-reveal-delay="1"
                className="font-display text-ink mt-4 max-w-[16ch] text-[clamp(2.1rem,3.8vw,3.5rem)] leading-[1.04] font-medium tracking-[-0.04em]"
              >
                Teams who ship more than they babysit.
              </h2>
              <p
                data-reveal
                data-reveal-delay="2"
                className="text-ink-secondary mt-5 max-w-[48ch] text-base leading-8"
              >
                If someone on your team regularly stays late to watch a deploy, this is for you.
              </p>
            </div>

            <div className="space-y-3" data-reveal data-reveal-delay="2">
              {teamFits.map((item) => (
                <div
                  key={item}
                  className="border-line bg-surface-alt/35 flex items-start gap-4 border px-5 py-4"
                  style={{ borderRadius: '2px' }}
                >
                  <span
                    className="bg-primary mt-2 block h-1.5 w-1.5 shrink-0"
                    style={{ borderRadius: '1px' }}
                  />
                  <p className="text-ink-secondary text-sm leading-7">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
