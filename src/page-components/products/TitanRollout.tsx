'use client'

import { WAITLIST_URL } from '@/lib/env'
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
  const ref = useScrollReveal()

  return (
    <div ref={ref} className="bg-surface text-ink">
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
              One place for all sprint PRs.
            </h1>

            <p className="text-ink-secondary mt-8 max-w-[39rem] text-[1.08rem] leading-8 lg:text-[1.16rem]">
              Titan Rollout is sprint release coordination software for teams shipping across
              multiple repos. Track every PR in one view, trigger CI and Jenkins automatically, get
              Slack alerts and approvals, then post a Grafana-backed health summary after deploy.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={WAITLIST_URL}
                className={`${CTA_CLASSES} bg-ink text-surface hover:shadow-[0_0_0_1px_var(--color-primary-muted),0_2px_8px_rgba(0,0,0,0.08)]`}
              >
                Join waitlist
              </a>
              <a
                href="/how-it-works"
                className={`${CTA_CLASSES} border-line text-ink-secondary hover:border-primary/40 hover:text-ink bg-surface border`}
              >
                How it works
              </a>
            </div>

            <p className="border-line text-ink-tertiary mt-7 max-w-[44rem] border-t pt-4 font-mono text-[10px] leading-5 tracking-[0.08em]">
              GitHub · GitHub Actions · Jenkins · Grafana · Slack
            </p>

            <p className="text-ink-secondary mt-4 max-w-[40rem] text-sm leading-7">
              Best for teams where release day means watching CI, chasing approvals in Slack, and
              checking metrics by hand across multiple services.
            </p>
          </div>

          <div data-reveal data-reveal-delay="2" className="flex items-end">
            <div
              className="border-line bg-surface-alt/72 w-full border"
              style={{ borderRadius: '12px' }}
            >
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
        <div data-impeccable-variants="3841d0d5" data-impeccable-variant-count="3" style={{ display: "contents" }}>
          {/* impeccable-variants-start 3841d0d5 */}
          {/* Original */}
          <div data-impeccable-variant="original">
            <div className="mx-auto grid w-full max-w-[1560px] gap-12 px-6 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:gap-16 lg:px-10">
              <div data-reveal>
                <p className="text-ink-tertiary font-mono text-[11px] tracking-[0.18em] uppercase">
                  What it replaces
                </p>
                <h2 className="font-display mt-4 max-w-[11ch] text-[clamp(2.3rem,4vw,4.2rem)] leading-[0.95] font-medium tracking-[-0.05em]">
                  The last two hours of the sprint should not become a second job.
                </h2>
                <p className="text-ink-secondary mt-6 max-w-[33rem] text-lg leading-8">
                  Without a release owner view, the sprint turns into handoffs, checking, waiting, and
                  one person translating the whole room for everybody else.
                </p>
              </div>

              <div
                className="bg-surface-alt/38 px-6 py-6 sm:px-8 sm:py-8"
                style={{ borderRadius: '12px' }}
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
          </div>
          {/* Variants: insert below this line */}
          <style data-impeccable-css="3841d0d5">{`
            @scope ([data-impeccable-variant="1"]) {
              :scope > .dt-live-v1 {
                --p-accent: 0.42;
                display: grid;
                gap: 3rem;
              }

              :scope[data-p-density="compact"] > .dt-live-v1 {
                gap: 2.25rem;
              }

              :scope[data-p-density="open"] > .dt-live-v1 {
                gap: 3.75rem;
              }

              :scope > .dt-live-v1 .dt-live-v1-copy {
                max-width: 36rem;
              }

              :scope > .dt-live-v1 .dt-live-v1-kicker {
                display: inline-flex;
                align-items: center;
                gap: 0.75rem;
                color: var(--color-primary-accessible);
              }

              :scope > .dt-live-v1 .dt-live-v1-kicker::after {
                content: "";
                width: 3rem;
                height: 1px;
                background: rgb(var(--color-primary-rgb) / calc(0.24 + (var(--p-accent) * 0.34)));
              }

              :scope > .dt-live-v1 .dt-live-v1-title {
                margin-top: 1rem;
                max-width: 11ch;
                font-family: var(--font-display);
                font-size: clamp(2.55rem, 4.2vw, 4.5rem);
                line-height: 0.94;
                font-weight: 500;
                letter-spacing: -0.055em;
                color: var(--color-ink);
              }

              :scope > .dt-live-v1 .dt-live-v1-body {
                margin-top: 1.5rem;
                color: var(--color-ink-secondary);
                font-size: 1.08rem;
                line-height: 2rem;
              }

              :scope > .dt-live-v1 .dt-live-v1-note {
                margin-top: 1.5rem;
                border-top: 1px solid rgb(var(--color-primary-rgb) / calc(0.18 + (var(--p-accent) * 0.28)));
                padding-top: 1rem;
                color: var(--color-ink-tertiary);
                font-family: var(--font-mono);
                font-size: 0.68rem;
                line-height: 1.5;
                letter-spacing: 0.16em;
                text-transform: uppercase;
              }

              :scope > .dt-live-v1 .dt-live-v1-panel {
                border: 1px solid rgb(var(--color-primary-rgb) / calc(0.16 + (var(--p-accent) * 0.22)));
                border-radius: 12px;
                background:
                  linear-gradient(180deg, rgb(var(--color-primary-rgb) / calc(0.08 + (var(--p-accent) * 0.12))), transparent 42%),
                  rgb(255 255 255 / 0.015);
                padding: 1.75rem;
              }

              :scope > .dt-live-v1 .dt-live-v1-panel-head {
                display: flex;
                justify-content: space-between;
                gap: 1rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--color-line);
              }

              :scope > .dt-live-v1 .dt-live-v1-panel-grid {
                display: grid;
                gap: 1rem;
                margin-top: 1.25rem;
              }

              :scope > .dt-live-v1 .dt-live-v1-row {
                display: grid;
                gap: 0.75rem;
                padding-top: 1rem;
                border-top: 1px solid var(--color-line);
              }

              :scope > .dt-live-v1 .dt-live-v1-row:first-child {
                border-top: 0;
                padding-top: 0;
              }

              :scope[data-p-density="compact"] > .dt-live-v1 .dt-live-v1-row {
                gap: 0.5rem;
                padding-top: 0.75rem;
              }

              :scope[data-p-density="open"] > .dt-live-v1 .dt-live-v1-row {
                gap: 1rem;
                padding-top: 1.2rem;
              }

              @media (min-width: 1024px) {
                :scope > .dt-live-v1 {
                  grid-template-columns: minmax(0, 0.84fr) minmax(0, 1.16fr);
                  align-items: start;
                }
              }
            }

            @scope ([data-impeccable-variant="2"]) {
              :scope > .dt-live-v2 {
                display: grid;
                gap: 2.75rem;
              }

              :scope[data-p-density="tight"] > .dt-live-v2 {
                gap: 2rem;
              }

              :scope[data-p-density="roomy"] > .dt-live-v2 {
                gap: 3.35rem;
              }

              :scope > .dt-live-v2 .dt-live-v2-title {
                margin-top: 1rem;
                max-width: 12ch;
                font-family: var(--font-display);
                font-size: clamp(2.45rem, 4vw, 4.35rem);
                line-height: 0.95;
                font-weight: 500;
                letter-spacing: -0.05em;
              }

              :scope > .dt-live-v2 .dt-live-v2-body {
                margin-top: 1.4rem;
                max-width: 34rem;
                color: var(--color-ink-secondary);
                font-size: 1.05rem;
                line-height: 2rem;
              }

              :scope > .dt-live-v2 .dt-live-v2-stack {
                margin-top: 1.5rem;
                display: flex;
                flex-wrap: wrap;
                gap: 0.6rem;
              }

              :scope > .dt-live-v2 .dt-live-v2-chip {
                border: 1px solid var(--color-line);
                border-radius: 999px;
                padding: 0.45rem 0.75rem;
                color: var(--color-ink-tertiary);
                font-family: var(--font-mono);
                font-size: 0.64rem;
                letter-spacing: 0.12em;
                text-transform: uppercase;
              }

              :scope[data-p-rail] > .dt-live-v2 .dt-live-v2-card {
                box-shadow: inset 0 0 0 1px rgb(var(--color-primary-rgb) / 0.14);
              }

              :scope > .dt-live-v2 .dt-live-v2-card {
                border: 1px solid var(--color-line);
                border-radius: 12px;
                background: rgb(255 255 255 / 0.02);
                overflow: hidden;
              }

              :scope > .dt-live-v2 .dt-live-v2-card-head {
                display: grid;
                gap: 0.35rem;
                padding: 1.35rem 1.5rem;
                border-bottom: 1px solid var(--color-line);
                background: linear-gradient(180deg, rgb(var(--color-primary-rgb) / 0.08), transparent 100%);
              }

              :scope > .dt-live-v2 .dt-live-v2-list {
                display: grid;
              }

              :scope > .dt-live-v2 .dt-live-v2-item {
                display: grid;
                grid-template-columns: 104px minmax(0, 1fr);
                gap: 1rem;
                padding: 1rem 1.5rem;
                border-top: 1px solid var(--color-line);
              }

              :scope > .dt-live-v2 .dt-live-v2-item:first-child {
                border-top: 0;
              }

              :scope[data-p-density="tight"] > .dt-live-v2 .dt-live-v2-item {
                padding-top: 0.8rem;
                padding-bottom: 0.8rem;
              }

              :scope[data-p-density="roomy"] > .dt-live-v2 .dt-live-v2-item {
                padding-top: 1.2rem;
                padding-bottom: 1.2rem;
              }

              @media (min-width: 1024px) {
                :scope > .dt-live-v2 {
                  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
                  align-items: start;
                }
              }
            }

            @scope ([data-impeccable-variant="3"]) {
              :scope > .dt-live-v3 {
                --p-heat: 0.5;
                display: grid;
                gap: 2.75rem;
              }

              :scope > .dt-live-v3 .dt-live-v3-copy {
                max-width: 35rem;
              }

              :scope > .dt-live-v3 .dt-live-v3-title {
                margin-top: 1rem;
                max-width: 11ch;
                font-family: var(--font-display);
                font-size: clamp(2.45rem, 4vw, 4.3rem);
                line-height: 0.94;
                font-weight: 500;
                letter-spacing: -0.052em;
              }

              :scope > .dt-live-v3 .dt-live-v3-body {
                margin-top: 1.4rem;
                color: var(--color-ink-secondary);
                font-size: 1.06rem;
                line-height: 2rem;
              }

              :scope > .dt-live-v3 .dt-live-v3-divider {
                margin-top: 1.4rem;
                display: inline-flex;
                align-items: center;
                gap: 0.9rem;
                color: var(--color-ink-tertiary);
                font-family: var(--font-mono);
                font-size: 0.68rem;
                letter-spacing: 0.16em;
                text-transform: uppercase;
              }

              :scope > .dt-live-v3 .dt-live-v3-divider::before {
                content: "";
                width: 3.25rem;
                height: 1px;
                background: rgb(248 113 113 / calc(0.16 + (var(--p-heat) * 0.36)));
              }

              :scope > .dt-live-v3 .dt-live-v3-board {
                border: 1px solid rgb(248 113 113 / calc(0.14 + (var(--p-heat) * 0.22)));
                border-radius: 12px;
                background:
                  linear-gradient(180deg, rgb(248 113 113 / calc(0.05 + (var(--p-heat) * 0.07))), transparent 38%),
                  rgb(255 255 255 / 0.015);
                padding: 1.5rem;
              }

              :scope > .dt-live-v3 .dt-live-v3-board-head {
                display: flex;
                justify-content: space-between;
                gap: 1rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--color-line);
              }

              :scope > .dt-live-v3 .dt-live-v3-mode {
                display: grid;
                gap: 0.9rem;
                margin-top: 1.2rem;
              }

              :scope[data-p-mode="ledger"] > .dt-live-v3 .dt-live-v3-mode {
                gap: 0.65rem;
              }

              :scope[data-p-mode="incident"] > .dt-live-v3 .dt-live-v3-mode {
                gap: 1.1rem;
              }

              :scope > .dt-live-v3 .dt-live-v3-alert {
                border-left: 0;
                border: 1px solid var(--color-line);
                border-radius: 10px;
                padding: 1rem 1rem 1rem 1.1rem;
                background: rgb(13 12 10 / 0.18);
              }

              :scope[data-p-mode="ledger"] > .dt-live-v3 .dt-live-v3-alert {
                display: grid;
                grid-template-columns: 94px minmax(0, 1fr);
                align-items: start;
                gap: 0.9rem;
              }

              @media (min-width: 1024px) {
                :scope > .dt-live-v3 {
                  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
                  align-items: start;
                }
              }
            }
          `}</style>
          <div
            data-impeccable-variant="1"
            data-impeccable-params='[{"id":"density","kind":"steps","default":"balanced","label":"Density","options":[{"value":"compact","label":"Compact"},{"value":"balanced","label":"Balanced"},{"value":"open","label":"Open"}]},{"id":"accent","kind":"range","min":0,"max":1,"step":0.05,"default":0.42,"label":"Amber heat"}]'
          >
            <div className="dt-live-v1">
              <div className="dt-live-v1-copy">
                <p className="dt-live-v1-kicker font-mono text-[11px] tracking-[0.18em] uppercase">
                  What it replaces
                </p>
                <h2 className="dt-live-v1-title">
                  Slack says shipped. The spreadsheet says blocked.
                </h2>
                <p className="dt-live-v1-body">
                  Release pain is not the deploy itself. It is the hour where nobody trusts the
                  status, the team starts pasting PR links into Slack, and someone opens Google
                  Sheets because chat cannot tell you what is actually safe to ship.
                </p>
                <p className="dt-live-v1-note">
                  One bad release night usually means: duplicate status updates, missing owners,
                  last-minute approval chasing, and rollback context rebuilt from chat history.
                </p>
              </div>

              <div className="dt-live-v1-panel">
                <div className="dt-live-v1-panel-head">
                  <div>
                    <p className="text-ink text-sm font-semibold">How the war room actually feels</p>
                    <p className="text-ink-tertiary mt-1 font-mono text-[10px] tracking-[0.16em] uppercase">
                      Slack thread + Google Sheet + memory
                    </p>
                  </div>
                  <p className="text-primary-accessible font-mono text-[10px] tracking-[0.18em] uppercase">
                    No source of truth
                  </p>
                </div>

                <div className="dt-live-v1-panel-grid">
                  <div className="dt-live-v1-row">
                    <p className="text-signal-warning-text font-mono text-[10px] tracking-[0.18em] uppercase">
                      7:08 PM
                    </p>
                    <div>
                      <p className="text-ink text-base leading-7 font-semibold">
                        The Slack thread becomes the release tracker.
                      </p>
                      <p className="text-ink-secondary mt-2 text-sm leading-7">
                        PR links, approvals, deploy notes, and questions pile into one channel. By
                        the third reply, nobody knows which message is still true.
                      </p>
                    </div>
                  </div>

                  <div className="dt-live-v1-row">
                    <p className="text-signal-danger-text font-mono text-[10px] tracking-[0.18em] uppercase">
                      8:21 PM
                    </p>
                    <div>
                      <p className="text-ink text-base leading-7 font-semibold">
                        A spreadsheet appears because chat is not enough.
                      </p>
                      <p className="text-ink-secondary mt-2 text-sm leading-7">
                        Someone starts a sheet to track what shipped, what failed, and who still
                        owes approval. The sheet is already stale before the next Jenkins job ends.
                      </p>
                    </div>
                  </div>

                  <div className="dt-live-v1-row">
                    <p className="text-primary-accessible font-mono text-[10px] tracking-[0.18em] uppercase">
                      9:47 PM
                    </p>
                    <div>
                      <p className="text-ink text-base leading-7 font-semibold">
                        Rollback starts with reconstruction, not action.
                      </p>
                      <p className="text-ink-secondary mt-2 text-sm leading-7">
                        The team has to figure out which service moved, which PRs landed, and who
                        approved what. The release is already broken, and context is still missing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            data-impeccable-variant="2"
            data-impeccable-params='[{"id":"density","kind":"steps","default":"balanced","label":"Density","options":[{"value":"tight","label":"Tight"},{"value":"balanced","label":"Balanced"},{"value":"roomy","label":"Roomy"}]},{"id":"rail","kind":"toggle","default":true,"label":"Amber edge"}]'
            style={{ display: 'none' }}
          >
            <div className="dt-live-v2">
              <div>
                <p className="text-primary-accessible font-mono text-[11px] tracking-[0.18em] uppercase">
                  What it replaces
                </p>
                <h2 className="dt-live-v2-title">
                  One engineer should not become the human release system.
                </h2>
                <p className="dt-live-v2-body">
                  Without a release owner view, one person absorbs the whole sprint into their
                  head. They answer the same Slack questions, translate Jenkins noise, check
                  dashboards, update the sheet, and carry rollback context nobody else can see.
                </p>
                <div className="dt-live-v2-stack">
                  <span className="dt-live-v2-chip">Slack approvals</span>
                  <span className="dt-live-v2-chip">Google Sheet status</span>
                  <span className="dt-live-v2-chip">Jenkins tabs</span>
                  <span className="dt-live-v2-chip">Rollback guesswork</span>
                </div>
              </div>

              <div className="dt-live-v2-card">
                <div className="dt-live-v2-card-head">
                  <p className="text-ink text-sm font-semibold">What the coordinator is really doing</p>
                  <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.18em] uppercase">
                    Work that should not exist
                  </p>
                </div>

                <div className="dt-live-v2-list">
                  <div className="dt-live-v2-item">
                    <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.18em] uppercase">
                      Status
                    </p>
                    <p className="text-ink-secondary text-sm leading-7">
                      Reading GitHub, CI, and chat at once because no single place can say which PR
                      is ready, blocked, or already moved.
                    </p>
                  </div>

                  <div className="dt-live-v2-item">
                    <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.18em] uppercase">
                      Memory
                    </p>
                    <p className="text-ink-secondary text-sm leading-7">
                      Remembering which services depend on each other, which stakeholder approved
                      in Slack, and which failure can still be safely ignored.
                    </p>
                  </div>

                  <div className="dt-live-v2-item">
                    <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.18em] uppercase">
                      Cleanup
                    </p>
                    <p className="text-ink-secondary text-sm leading-7">
                      Writing the release summary after midnight because the only history is spread
                      across screenshots, thread replies, and one spreadsheet tab nobody wants to
                      reopen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            data-impeccable-variant="3"
            data-impeccable-params='[{"id":"mode","kind":"steps","default":"incident","label":"Panel mode","options":[{"value":"incident","label":"Incident"},{"value":"ledger","label":"Ledger"}]},{"id":"heat","kind":"range","min":0,"max":1,"step":0.05,"default":0.5,"label":"Failure heat"}]'
            style={{ display: 'none' }}
          >
            <div className="dt-live-v3">
              <div className="dt-live-v3-copy">
                <p className="text-primary-accessible font-mono text-[11px] tracking-[0.18em] uppercase">
                  What it replaces
                </p>
                <h2 className="dt-live-v3-title">
                  The worst time to figure out rollback is after Slack goes quiet.
                </h2>
                <p className="dt-live-v3-body">
                  When a release runs through chat and spreadsheets, the dangerous part starts
                  after the failure. Nobody knows exactly what moved, what is blocked behind it, or
                  which change can be reversed without taking something else down with it.
                </p>
                <p className="dt-live-v3-divider">Failure feels organized until one service breaks</p>
              </div>

              <div className="dt-live-v3-board">
                <div className="dt-live-v3-board-head">
                  <div>
                    <p className="text-ink text-sm font-semibold">What rollback panic looks like</p>
                    <p className="text-ink-tertiary mt-1 font-mono text-[10px] tracking-[0.18em] uppercase">
                      Chat first, certainty later
                    </p>
                  </div>
                  <p className="text-signal-danger-text font-mono text-[10px] tracking-[0.18em] uppercase">
                    Incident mode
                  </p>
                </div>

                <div className="dt-live-v3-mode">
                  <div className="dt-live-v3-alert">
                    <p className="text-signal-danger-text font-mono text-[10px] tracking-[0.18em] uppercase">
                      Alert
                    </p>
                    <div>
                      <p className="text-ink mt-1 text-base leading-7 font-semibold">
                        A service fails, and the room immediately asks what else shipped with it.
                      </p>
                      <p className="text-ink-secondary mt-2 text-sm leading-7">
                        The answer lives across PR comments, Slack replies, Jenkins output, and a
                        release sheet that may already be out of date.
                      </p>
                    </div>
                  </div>

                  <div className="dt-live-v3-alert">
                    <p className="text-primary-accessible font-mono text-[10px] tracking-[0.18em] uppercase">
                      Guesswork
                    </p>
                    <div>
                      <p className="text-ink mt-1 text-base leading-7 font-semibold">
                        Teams start asking owners from memory instead of working from a release record.
                      </p>
                      <p className="text-ink-secondary mt-2 text-sm leading-7">
                        Who approved this? Which PR landed after the last green run? Can we back
                        out one service without reopening the whole release window?
                      </p>
                    </div>
                  </div>

                  <div className="dt-live-v3-alert">
                    <p className="text-signal-warning-text font-mono text-[10px] tracking-[0.18em] uppercase">
                      Cost
                    </p>
                    <div>
                      <p className="text-ink mt-1 text-base leading-7 font-semibold">
                        The delay is not technical, it is coordination debt coming due.
                      </p>
                      <p className="text-ink-secondary mt-2 text-sm leading-7">
                        The team can probably fix the service. What burns time is reconstructing
                        the release path while production is already waiting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* impeccable-variants-end 3841d0d5 */}
        </div>
      </section>

      <section className="border-line bg-surface-alt/45 border-b py-18 lg:py-24">
        <div className="mx-auto w-full max-w-[1560px] px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(320px,0.52fr)] lg:items-end">
            <div data-reveal>
              <p className="text-ink-tertiary font-mono text-[11px] tracking-[0.18em] uppercase">
                What Titan Rollout does
              </p>
              <h2 className="font-display mt-4 text-[clamp(2.3rem,4vw,4.15rem)] leading-[0.95] font-medium tracking-[-0.05em]">
                Track the release, trigger the jobs, route the approvals, then close with proof.
              </h2>
              <p className="text-ink-secondary mt-6 max-w-[35rem] text-lg leading-8">
                Titan does not replace the stack. It gives the release one coordinated workflow,
                from the first sprint PR to the final health check in Slack.
              </p>
            </div>

            <div
              className="border-line bg-surface border px-6 py-6"
              style={{ borderRadius: '12px' }}
              data-reveal
              data-reveal-delay="1"
            >
              <p className="text-primary-accessible font-mono text-[10px] tracking-[0.18em] uppercase">
                Outcome
              </p>
              <p className="text-ink mt-3 max-w-[26rem] text-lg leading-8 font-medium">
                The release ends with a clear summary in Slack, not the team rebuilding context at
                2am.
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
              Who it is for
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.3rem,4vw,4rem)] leading-[0.95] font-medium tracking-[-0.05em]">
              Built for multi-repo sprint releases.
            </h2>
            <p className="text-ink-secondary mt-6 max-w-[31rem] text-lg leading-8">
              Founders see fewer late nights. CTOs see less release drag. Release owners get one
              controlled record instead of a ritual rebuilt from memory every sprint.
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
                  Join the waitlist, share how your team coordinates releases today, and we&apos;ll
                  bring you in when early access opens.
                </p>
              </div>

              <div className="flex flex-col justify-center" data-reveal data-reveal-delay="1">
                <div className="flex flex-col gap-4">
                  <a
                    href={WAITLIST_URL}
                    className={`${CTA_CLASSES} bg-ink text-surface w-full hover:shadow-[0_0_0_1px_var(--color-primary-muted),0_2px_8px_rgba(0,0,0,0.08)]`}
                  >
                    Join waitlist
                  </a>
                  <a
                    href="/how-it-works"
                    className={`${CTA_CLASSES} border-line text-ink-secondary hover:border-primary/40 hover:text-ink bg-surface w-full border`}
                  >
                    How it works
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
