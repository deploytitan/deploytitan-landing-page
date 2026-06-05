'use client'

import { CREATE_ACCOUNT_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'

const STORY_BEATS = [
  {
    time: '6:14 PM',
    title: 'The sprint ends, then the real work starts',
    body: 'Five PRs are ready, two more are waiting on review, and somebody opens a spreadsheet because the release still has no home.',
  },
  {
    time: '7:02 PM',
    title: 'One engineer becomes the coordination layer',
    body: 'GitHub, Jenkins, Slack, dashboards, ticket comments. The team keeps asking the same question: what is blocked now?',
  },
  {
    time: '8:19 PM',
    title: 'A last-minute failure resets the room',
    body: 'A workflow fails, a security update lands, and a branch needs one more push. Fifteen tabs appear because nobody trusts a single source of truth.',
  },
  {
    time: '10:47 PM',
    title: 'Approvals happen in chat, merges happen by memory',
    body: 'Stakeholders approve in Slack, owners merge one at a time, and someone says a deployment failed. A second huddle starts before the first one ended.',
  },
  {
    time: '1:56 AM',
    title: 'Even success comes with cleanup work',
    body: 'QA is done, metrics look healthy, and now someone still has to write the release update, summarize what shipped, and capture follow-ups while everyone is exhausted.',
  },
]

const TITAN_FLOW = [
  {
    chapter: '1.1',
    title: 'Add the sprint PRs once',
    body: 'Pull every release PR into one release object instead of copying links into chat or a spreadsheet.',
  },
  {
    chapter: '1.2',
    title: 'Let Titan watch the moving parts',
    body: 'GitHub Actions and Jenkins run, statuses update, and failures surface the moment something needs attention.',
  },
  {
    chapter: '1.3',
    title: 'Send approvals to Slack',
    body: 'The right people get the prompt in Slack, with enough context to approve without opening a browser.',
  },
  {
    chapter: '1.4',
    title: 'Close with health checks and a release summary',
    body: 'Titan checks post-deploy health in Grafana and posts the release summary back to the channel when the rollout is stable.',
  },
]

const BUY_SIGNALS = [
  'Your release touches multiple repos or services, and someone still coordinates the whole thing by memory.',
  'Senior engineers spend real time on status chasing, approval follow-up, and post-release admin instead of product work.',
  'You want to keep GitHub, Jenkins, Grafana, and Slack, not replace them with another platform.',
]

const INTEGRATIONS = ['GitHub', 'GitHub Actions', 'Jenkins', 'Grafana', 'Slack']

const CTA_CLASSES =
  'inline-flex items-center justify-center rounded-[2px] px-5 py-3 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface'

export default function TitanRollout() {
  useScrollReveal()

  return (
    <div className="bg-surface text-ink">
      <section className="border-line relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,180,84,0.12),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(96,165,250,0.08),transparent_26%)]" />

        <div className="relative mx-auto grid min-h-[88vh] w-full max-w-[1560px] gap-16 px-6 pt-28 pb-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(420px,0.85fr)] lg:px-10 lg:pt-32 lg:pb-18">
          <div className="flex flex-col justify-between" data-reveal>
            <div>
              <div className="text-ink-tertiary mb-8 flex items-center gap-4 font-mono text-[11px] tracking-[0.18em] uppercase">
                <span>Titan Rollout</span>
                <span className="bg-line block h-px w-12" />
                <span>1.0 Release night</span>
              </div>

              <h1 className="font-display max-w-[12ch] text-[clamp(3.6rem,8vw,7.4rem)] leading-[0.9] font-medium tracking-[-0.065em]">
                The sprint should end before dinner.
              </h1>

              <p className="text-ink-secondary mt-8 max-w-[40rem] text-[1.1rem] leading-8 lg:text-[1.18rem]">
                Release night should not depend on whoever can keep GitHub, Jenkins, Slack, and
                dashboards stitched together the longest. Titan Rollout gives the sprint one
                controlled path to production.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={CREATE_ACCOUNT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${CTA_CLASSES} bg-primary text-surface hover:bg-primary-light hover:text-ink`}
                >
                  Create account
                </a>
                <a
                  href="/pricing"
                  className={`${CTA_CLASSES} border-line text-ink-secondary hover:border-primary/40 hover:text-ink border`}
                >
                  See pricing
                </a>
              </div>
            </div>

            <div
              className="border-line text-ink-tertiary mt-16 border-t pt-6 font-mono text-[11px] tracking-[0.16em] uppercase"
              data-reveal
              data-reveal-delay="1"
            >
              {INTEGRATIONS.join(' · ')}
            </div>
          </div>

          <div data-reveal data-reveal-delay="2" className="flex items-end">
            <div className="border-line bg-surface-alt/70 w-full border">
              <div className="border-line flex items-center justify-between border-b px-5 py-4">
                <div>
                  <p className="text-ink text-sm font-semibold">Friday rollout</p>
                  <p className="text-ink-tertiary mt-1 font-mono text-[10px] tracking-[0.16em] uppercase">
                    8 prs · 4 services · 1 release owner
                  </p>
                </div>
                <p className="text-primary-accessible font-mono text-[10px] tracking-[0.18em] uppercase">
                  Active release
                </p>
              </div>

              <div className="px-5 py-4">
                {[
                  ['PR-1842', 'Payments API', 'CI running'],
                  ['PR-1847', 'Billing UI', 'Waiting for approval'],
                  ['PR-1851', 'Auth service', 'Security fix required'],
                  ['PR-1855', 'Worker queue', 'Deploy blocked'],
                ].map(([id, name, state], index) => (
                  <div
                    key={id}
                    className="border-line grid gap-3 border-b py-4 last:border-b-0 sm:grid-cols-[90px_minmax(0,1fr)_150px]"
                  >
                    <span className="text-ink-tertiary font-mono text-[10px] tracking-[0.16em] uppercase">
                      {id}
                    </span>
                    <span className="text-ink text-sm">{name}</span>
                    <span
                      className={[
                        'font-mono text-[10px] tracking-[0.16em] uppercase',
                        index === 0 && 'text-signal-warning-text',
                        index === 1 && 'text-signal-deploy-text',
                        index === 2 && 'text-signal-danger-text',
                        index === 3 && 'text-primary-accessible',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {state}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-line border-t px-5 py-4">
                <p className="text-ink-secondary max-w-[30rem] text-sm leading-7">
                  One release, one owner view, one history. Not fifteen tabs and a tired memory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-line border-b">
        <div className="mx-auto grid w-full max-w-[1560px] gap-12 px-6 py-18 lg:grid-cols-[220px_minmax(0,0.9fr)_minmax(0,0.95fr)] lg:px-10 lg:py-24">
          <div data-reveal>
            <p className="text-primary-accessible font-mono text-xs tracking-[0.18em] uppercase">
              2.0
            </p>
          </div>

          <div data-reveal data-reveal-delay="1">
            <p className="text-ink-tertiary mb-4 font-mono text-[11px] tracking-[0.18em] uppercase">
              The last two hours of the sprint
            </p>
            <h2 className="font-display max-w-[11ch] text-[clamp(2.2rem,4vw,4rem)] leading-[0.96] font-medium tracking-[-0.05em]">
              The release becomes a job nobody actually owns.
            </h2>
            <p className="text-ink-secondary mt-6 max-w-[34rem] text-lg leading-8">
              It starts as excitement. Then it turns into handoffs, checking, waiting, and one
              person translating the whole room for everybody else.
            </p>
          </div>

          <div className="space-y-0" data-reveal data-reveal-delay="2">
            {STORY_BEATS.map((beat) => (
              <div
                key={beat.time}
                className="border-line border-t py-5 first:border-t-0 first:pt-0"
              >
                <div className="grid gap-3 sm:grid-cols-[88px_minmax(0,1fr)]">
                  <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.18em] uppercase">
                    {beat.time}
                  </p>
                  <div>
                    <p className="text-ink text-base leading-7 font-semibold">{beat.title}</p>
                    <p className="text-ink-secondary mt-2 text-sm leading-7">{beat.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-line bg-surface-alt/45 border-b">
        <div className="mx-auto grid w-full max-w-[1560px] gap-12 px-6 py-18 lg:grid-cols-[220px_minmax(0,0.9fr)_minmax(0,1fr)] lg:px-10 lg:py-24">
          <div data-reveal>
            <p className="text-primary-accessible font-mono text-xs tracking-[0.18em] uppercase">
              3.0
            </p>
          </div>

          <div data-reveal data-reveal-delay="1">
            <p className="text-ink-tertiary mb-4 font-mono text-[11px] tracking-[0.18em] uppercase">
              Titan Rollout
            </p>
            <h2 className="font-display max-w-[10ch] text-[clamp(2.2rem,4vw,4rem)] leading-[0.96] font-medium tracking-[-0.05em]">
              Four moves. Then the sprint ships itself.
            </h2>
            <p className="text-ink-secondary mt-6 max-w-[35rem] text-lg leading-8">
              Titan does not replace the stack. It absorbs the release mechanics around the tools
              the team already uses, then runs them in order.
            </p>
          </div>

          <div data-reveal data-reveal-delay="2">
            {TITAN_FLOW.map((item) => (
              <div
                key={item.chapter}
                className="border-line border-t py-6 first:border-t-0 first:pt-0"
              >
                <div className="grid gap-4 sm:grid-cols-[64px_minmax(0,1fr)]">
                  <p className="text-primary-accessible font-mono text-[10px] tracking-[0.18em] uppercase">
                    {item.chapter}
                  </p>
                  <div>
                    <p className="text-ink text-xl leading-8 font-semibold">{item.title}</p>
                    <p className="text-ink-secondary mt-2 max-w-[36rem] text-sm leading-7">
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="border-line mt-10 border-t pt-6">
              <p className="text-primary-accessible font-mono text-[10px] tracking-[0.18em] uppercase">
                Result
              </p>
              <p className="text-ink mt-3 max-w-[38rem] text-lg leading-8 font-medium">
                The release ends with Slack getting the summary, not the team writing it at 2am.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-line border-b">
        <div className="mx-auto grid w-full max-w-[1560px] gap-12 px-6 py-18 lg:grid-cols-[220px_minmax(0,0.9fr)_minmax(0,1fr)] lg:px-10 lg:py-24">
          <div data-reveal>
            <p className="text-primary-accessible font-mono text-xs tracking-[0.18em] uppercase">
              4.0
            </p>
          </div>

          <div data-reveal data-reveal-delay="1">
            <p className="text-ink-tertiary mb-4 font-mono text-[11px] tracking-[0.18em] uppercase">
              Why it gets bought
            </p>
            <h2 className="font-display max-w-[10ch] text-[clamp(2.2rem,4vw,4rem)] leading-[0.96] font-medium tracking-[-0.05em]">
              This gives senior time back to the team.
            </h2>
            <p className="text-ink-secondary mt-6 max-w-[34rem] text-lg leading-8">
              Founders see fewer late nights. CTOs see less release drag. Release owners get one
              controlled record instead of a chain of rituals repeated every sprint.
            </p>
          </div>

          <div data-reveal data-reveal-delay="2">
            {BUY_SIGNALS.map((item, index) => (
              <div
                key={item}
                className="border-line py-5 text-base leading-8 first:pt-0"
                style={index === BUY_SIGNALS.length - 1 ? undefined : { borderBottomWidth: '1px' }}
              >
                <span className="text-primary-accessible mr-3 font-mono text-[10px] tracking-[0.18em] uppercase">
                  0{index + 1}
                </span>
                <span className="text-ink-secondary">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-[1560px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="border-line grid gap-8 border-t pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-end">
            <div data-reveal>
              <p className="text-ink-tertiary mb-4 font-mono text-[11px] tracking-[0.18em] uppercase">
                Available now
              </p>
              <h2 className="font-display max-w-[12ch] text-[clamp(2.4rem,4.4vw,4.8rem)] leading-[0.94] font-medium tracking-[-0.055em]">
                Try it on the sprint you already do not trust.
              </h2>
              <p className="text-ink-secondary mt-6 max-w-[40rem] text-lg leading-8">
                Create an account, connect GitHub and Slack, add the PRs that need to ship, and let
                Titan run the release mechanics your team is tired of doing by hand.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-start" data-reveal data-reveal-delay="1">
              <a
                href={CREATE_ACCOUNT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${CTA_CLASSES} bg-primary text-surface hover:bg-primary-light hover:text-ink w-full lg:w-auto lg:min-w-[220px]`}
              >
                Create account
              </a>
              <a
                href="/pricing"
                className={`${CTA_CLASSES} border-line text-ink-secondary hover:border-primary/40 hover:text-ink w-full border lg:w-auto lg:min-w-[220px]`}
              >
                See pricing
              </a>
              <p className="text-ink-tertiary max-w-[28rem] text-sm leading-7">
                Flat monthly pricing, no per-deploy billing, no infrastructure change required.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
