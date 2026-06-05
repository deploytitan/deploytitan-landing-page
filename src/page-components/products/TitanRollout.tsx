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
    title: 'Add the sprint PRs once',
    body: 'Pull every release PR into one release object instead of copying links into chat or a spreadsheet.',
  },
  {
    title: 'Let Titan watch the moving parts',
    body: 'GitHub Actions and Jenkins run, statuses update, and failures surface the moment something needs attention.',
  },
  {
    title: 'Send approvals to Slack',
    body: 'The right people get the prompt in Slack, with enough context to approve without opening a browser.',
  },
  {
    title: 'Close with health checks and a release summary',
    body: 'Titan checks post-deploy health in Grafana and posts the release summary back to the channel when the rollout is stable.',
  },
]

const BUY_SIGNALS = [
  'Your release touches multiple repos or services, and someone still coordinates the whole thing by memory.',
  'Senior engineers spend real time on status chasing, approval follow-up, and post-release admin instead of product work.',
  'You want release coordination to fit the stack you already run, not replace it.',
]

const CTA_CLASSES =
  'inline-flex items-center justify-center rounded-[8px] px-5 py-3 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface'

export default function TitanRollout() {
  useScrollReveal()

  return (
    <div className="bg-surface text-ink">
      <section className="border-line relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,180,84,0.1),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(96,165,250,0.06),transparent_24%)]" />

        <div className="relative mx-auto grid min-h-[86vh] w-full max-w-[1560px] items-center gap-16 px-6 pt-28 pb-18 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] lg:px-10 lg:pt-32 lg:pb-24">
          <div className="flex flex-col justify-center" data-reveal>
            <div className="text-ink-tertiary mb-8 flex items-center gap-4 font-mono text-[11px] tracking-[0.18em] uppercase">
              <span>Titan Rollout</span>
              <span className="bg-line block h-px w-12" />
              <span>Release coordination</span>
            </div>

            <h1 className="font-display text-[clamp(3.5rem,8vw,7.1rem)] leading-[0.9] font-medium tracking-[-0.065em]">
              The sprint should end before dinner.
            </h1>

            <p className="text-ink-secondary mt-8 max-w-[39rem] text-[1.08rem] leading-8 lg:text-[1.16rem]">
              Release night should not depend on whoever can keep GitHub, Jenkins, Slack, and
              dashboards stitched together the longest. Titan Rollout gives the sprint one calm,
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
                className={`${CTA_CLASSES} border-line text-ink-secondary hover:border-primary/40 hover:text-ink bg-surface border`}
              >
                See pricing
              </a>
            </div>
          </div>

          <div data-reveal data-reveal-delay="2" className="flex items-end">
            <div className="border-line bg-surface-alt/72 w-full rounded-[12px] border">
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

      <section className="border-line border-b py-18 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1560px] gap-12 px-6 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:gap-16 lg:px-10">
          <div data-reveal>
            <p className="text-ink-tertiary font-mono text-[11px] tracking-[0.18em] uppercase">
              The last two hours of the sprint
            </p>
            <h2 className="font-display mt-4 max-w-[11ch] text-[clamp(2.3rem,4vw,4.2rem)] leading-[0.95] font-medium tracking-[-0.05em]">
              The release becomes a job nobody actually owns.
            </h2>
            <p className="text-ink-secondary mt-6 max-w-[33rem] text-lg leading-8">
              It starts as excitement, then turns into handoffs, checking, waiting, and one person
              translating the whole room for everybody else.
            </p>
          </div>

          <div
            className="bg-surface-alt/38 rounded-[12px] px-6 py-6 sm:px-8 sm:py-8"
            data-reveal
            data-reveal-delay="1"
          >
            <div className="border-line mb-8 flex items-center justify-between gap-6 border-b pb-5">
              <p className="text-ink text-sm font-semibold">Release-night timeline</p>
              <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.18em] uppercase">
                5 moments every team recognizes
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[96px_minmax(0,1fr)]">
              {STORY_BEATS.map((beat) => (
                <div
                  key={beat.time}
                  className="border-line grid gap-3 border-t pt-5 first:border-t-0 first:pt-0 lg:col-span-2 lg:grid-cols-subgrid"
                >
                  <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.18em] uppercase">
                    {beat.time}
                  </p>
                  <div className="max-w-[38rem]">
                    <p className="text-ink text-base leading-7 font-semibold">{beat.title}</p>
                    <p className="text-ink-secondary mt-2 text-sm leading-7">{beat.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-line bg-surface-alt/45 border-b py-18 lg:py-24">
        <div className="mx-auto w-full max-w-[1560px] px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(320px,0.52fr)] lg:items-end">
            <div data-reveal>
              <p className="text-ink-tertiary font-mono text-[11px] tracking-[0.18em] uppercase">
                Titan Rollout
              </p>
              <h2 className="font-display mt-4 text-[clamp(2.3rem,4vw,4.15rem)] leading-[0.95] font-medium tracking-[-0.05em]">
                One place for the PRs, approvals, checks, and summary.
              </h2>
              <p className="text-ink-secondary mt-6 max-w-[35rem] text-lg leading-8">
                Titan does not replace the stack. It gives the release one calm path, from the first
                PR to the final update.
              </p>
            </div>

            <div
              className="border-line bg-surface rounded-[12px] border px-6 py-6"
              data-reveal
              data-reveal-delay="1"
            >
              <p className="text-primary-accessible font-mono text-[10px] tracking-[0.18em] uppercase">
                Result
              </p>
              <p className="text-ink mt-3 max-w-[26rem] text-lg leading-8 font-medium">
                The release ends with Slack getting the summary, not the team writing it at 2am.
              </p>
            </div>
          </div>

          <div
            className="border-line mt-12 grid gap-y-0 border-t"
            data-reveal
            data-reveal-delay="2"
          >
            {TITAN_FLOW.map((item, index) => (
              <div
                key={item.title}
                className={[
                  'grid items-center gap-4 py-6 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,1fr)] lg:gap-8',
                  index !== TITAN_FLOW.length - 1 ? 'border-line border-b' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <p className="text-ink text-xl leading-8 font-semibold">{item.title}</p>
                <p className="text-ink-secondary text-sm leading-7">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-line border-b py-18 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1560px] gap-12 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-10">
          <div data-reveal>
            <p className="text-ink-tertiary font-mono text-[11px] tracking-[0.18em] uppercase">
              Why it gets bought
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.3rem,4vw,4rem)] leading-[0.95] font-medium tracking-[-0.05em]">
              Senior engineers get their time back.
            </h2>
            <p className="text-ink-secondary mt-6 max-w-[31rem] text-lg leading-8">
              Founders see fewer late nights. CTOs see less release drag. Release owners get one
              controlled record instead of a chain of rituals repeated every sprint.
            </p>
          </div>

          <div className="border-line grid gap-y-0 border-t" data-reveal data-reveal-delay="1">
            {BUY_SIGNALS.map((item, index) => (
              <div
                key={item}
                className={[
                  'grid gap-4 py-6 lg:grid-cols-[44px_minmax(0,1fr)] lg:gap-6',
                  index !== BUY_SIGNALS.length - 1 ? 'border-line border-b' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className="text-primary-accessible font-mono text-[10px] tracking-[0.18em] uppercase">
                  0{index + 1}
                </span>
                <p className="text-ink-secondary text-base leading-8">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-[1560px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="border-line bg-surface-alt/45 rounded-[12px] border p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:gap-12">
              <div data-reveal>
                <p className="text-ink-tertiary mb-4 font-mono text-[11px] tracking-[0.18em] uppercase">
                  Available now
                </p>
                <h2 className="font-display max-w-[12ch] text-[clamp(2.45rem,4.4vw,4.9rem)] leading-[0.94] font-medium tracking-[-0.055em]">
                  Try it on the sprint your team already worries about.
                </h2>
                <p className="text-ink-secondary mt-6 max-w-[38rem] text-lg leading-8">
                  Create an account, connect the release workflow, add the PRs that need to ship,
                  and let Titan handle the coordination your team is tired of doing by hand.
                </p>
              </div>

              <div className="flex flex-col justify-center" data-reveal data-reveal-delay="1">
                <div className="flex flex-col gap-4">
                  <a
                    href={CREATE_ACCOUNT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${CTA_CLASSES} bg-primary text-surface hover:bg-primary-light hover:text-ink w-full`}
                  >
                    Create account
                  </a>
                  <a
                    href="/pricing"
                    className={`${CTA_CLASSES} border-line text-ink-secondary hover:border-primary/40 hover:text-ink bg-surface w-full border`}
                  >
                    See pricing
                  </a>
                </div>
                <p className="text-ink-secondary mt-5 text-sm leading-7">
                  Flat monthly pricing, no per-deploy billing, no surprise charges at sprint end,
                  and no infrastructure change required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
