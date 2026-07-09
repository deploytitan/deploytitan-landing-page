'use client'

import { WAITLIST_URL } from '@/lib/env'
import { Button } from '@/components/shared/Button'
import { useScrollReveal } from '../../utils'

const RELEASE_ROWS = [
  ['PR-1842', 'Payments API', 'GitHub Actions', 'Running'],
  ['PR-1847', 'Billing UI', 'Jenkins', 'Needs approval'],
  ['PR-1851', 'Auth service', 'GitHub Actions', 'Failed'],
  ['PR-1855', 'Worker queue', 'Jenkins', 'Blocked'],
]

const WORKFLOW = [
  {
    step: '01',
    title: 'Add the sprint PRs',
    body: 'Pick the PRs for this sprint. Titan Rollout puts them in one release so the team knows what is shipping.',
  },
  {
    step: '02',
    title: 'Start the release',
    body: 'Run GitHub Actions or Jenkins from the release. No one has to open every job and keep refreshing.',
  },
  {
    step: '03',
    title: 'Catch failures in Slack',
    body: 'If a job fails, Slack gets the PR, service, job name, and owner. The team sees what needs fixing.',
  },
  {
    step: '04',
    title: 'Approve without context switching',
    body: 'Send the sign-off request to Slack. The reviewer can approve without opening GitHub.',
  },
  {
    step: '05',
    title: 'Verify after deploy',
    body: 'Titan checks Grafana after the deploy and posts the result back to Slack.',
  },
]

const SETUP_STEPS = [
  {
    step: '1',
    title: 'Install the GitHub app',
    body: 'Give Titan access to the repos you release from. It reads PRs, checks, and release status.',
    image: 'https://cdn.simpleicons.org/github/1a1512',
    alt: 'GitHub logo',
  },
  {
    step: '2',
    title: 'Add the Slack app',
    body: 'Pick the release channel. Alerts, approvals, and final updates land there.',
    image: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/slack.svg',
    alt: 'Slack logo',
  },
  {
    step: '3',
    title: 'Connect Grafana',
    body: 'Choose the dashboards Titan should check after deploy. You keep your existing monitoring.',
    image: 'https://cdn.simpleicons.org/grafana/f46800',
    alt: 'Grafana logo',
  },
  {
    step: '4',
    title: 'Merge PRs like normal',
    body: 'Titan watches the jobs, sends the Slack message, and marks the release done when everything is healthy.',
    image: 'https://cdn.simpleicons.org/jenkins/d24939',
    alt: 'Jenkins logo',
  },
]

const CAPABILITIES = [
  {
    title: 'Release object',
    body: 'One shared record for the PRs, services, statuses, approvals, and deploy result. No spreadsheet needed.',
    detail: 'PRs across repos',
  },
  {
    title: 'CI and Jenkins status',
    body: 'See what is queued, running, failed, blocked, or ready. Trigger jobs from the release instead of clicking through tabs.',
    detail: 'Live job state',
  },
  {
    title: 'Slack approvals',
    body: 'Send approval requests to the right people with release context included. The approval lands where the team already works.',
    detail: 'No browser required',
  },
  {
    title: 'Grafana health summary',
    body: 'After deploy, Titan checks the metrics you already watch and posts whether the rollout looks stable or needs attention.',
    detail: 'Post-deploy check',
  },
]

const FIT_CHECKS = [
  'Your sprint release usually spans more than one repo or service.',
  'Someone on the team still watches GitHub Actions, Jenkins, Slack, and Grafana by hand.',
  'Approvals happen in chat, but the release record lives somewhere else.',
  'The team wants coordination without replacing the tools it already runs.',
]

const INTEGRATIONS = ['GitHub', 'GitHub Actions', 'Jenkins', 'Grafana', 'Slack']

const INTEGRATION_LOGOS = [
  {
    name: 'GitHub',
    image: 'https://cdn.simpleicons.org/github/1a1512',
  },
  {
    name: 'GitHub Actions',
    image: 'https://cdn.simpleicons.org/githubactions/2088ff',
  },
  {
    name: 'Jenkins',
    image: 'https://cdn.simpleicons.org/jenkins/d24939',
  },
  {
    name: 'Grafana',
    image: 'https://cdn.simpleicons.org/grafana/f46800',
  },
  {
    name: 'Slack',
    image: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/slack.svg',
  },
]

function NavCta({ block = false }: { block?: boolean }) {
  return (
    <Button as="a" href={WAITLIST_URL} variant="primary" size="sm" block={block}>
      Join waitlist
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-70"
        aria-hidden="true"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </Button>
  )
}

function StatusLabel({ state }: { state: string }) {
  const tone =
    state === 'Failed'
      ? 'text-signal-danger-text'
      : state === 'Blocked'
        ? 'text-primary-accessible'
        : state === 'Needs approval'
          ? 'text-signal-deploy-text'
          : 'text-signal-warning-text'

  return (
    <span className={`font-mono text-[10px] tracking-[0.14em] uppercase ${tone}`}>{state}</span>
  )
}

export default function TitanRollout() {
  const ref = useScrollReveal()

  return (
    <div ref={ref} className="bg-surface text-ink">
      <section className="border-line border-b pt-28 pb-12 lg:pt-32 lg:pb-18">
        <div className="mx-auto grid w-full max-w-[1480px] gap-12 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(460px,1.1fr)] lg:items-end lg:px-10">
          <div data-reveal>
            <p className="text-ink-tertiary font-mono text-[11px] tracking-[0.18em] uppercase">
              Titan Rollout
            </p>
            <h1 className="font-display mt-5 max-w-[12ch] text-[clamp(3.15rem,7vw,6.5rem)] leading-[0.92] font-medium tracking-[-0.06em]">
              Release coordination for sprint PRs.
            </h1>
            <p className="text-ink-secondary mt-7 max-w-[44rem] text-[1.08rem] leading-8">
              Add your sprint PRs. Start the release. Titan runs the checks, sends Slack updates,
              gets approvals, and posts the final Grafana health result.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <NavCta />
            </div>
            <p className="text-ink-tertiary mt-6 max-w-[42rem] font-mono text-[10px] leading-5 tracking-[0.12em] uppercase">
              {INTEGRATIONS.join(' / ')}
            </p>
          </div>

          <div
            data-reveal
            data-reveal-delay="1"
            className="border-line bg-surface-alt/70 overflow-hidden border"
            style={{ borderRadius: '8px' }}
          >
            <div className="border-line flex flex-col gap-4 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-ink text-sm font-semibold">Friday sprint release</p>
                <p className="text-ink-tertiary mt-1 font-mono text-[10px] tracking-[0.16em] uppercase">
                  8 PRs / 4 services / 3 approvals
                </p>
              </div>
              <span className="border-line bg-surface text-primary-accessible inline-flex w-fit rounded-[2px] border px-2 py-1 font-mono text-[10px] tracking-[0.14em] uppercase">
                Active
              </span>
            </div>

            <div className="border-line grid border-b md:grid-cols-[1fr_220px]">
              <div className="min-w-0">
                {RELEASE_ROWS.map(([id, service, runner, state]) => (
                  <div
                    key={id}
                    className="border-line grid gap-2 border-b px-5 py-4 last:border-b-0 sm:grid-cols-[78px_minmax(0,1fr)_126px]"
                  >
                    <span className="text-ink-tertiary font-mono text-[10px] tracking-[0.16em] uppercase">
                      {id}
                    </span>
                    <span className="min-w-0">
                      <span className="text-ink block text-sm">{service}</span>
                      <span className="text-ink-tertiary mt-1 block font-mono text-[10px] tracking-[0.14em] uppercase">
                        {runner}
                      </span>
                    </span>
                    <StatusLabel state={state} />
                  </div>
                ))}
              </div>
              <div className="border-line bg-surface/60 border-t p-5 md:border-t-0 md:border-l">
                <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.16em] uppercase">
                  Slack alert
                </p>
                <p className="text-ink mt-3 text-sm leading-6 font-semibold">
                  Auth service failed on test:integration
                </p>
                <p className="text-ink-secondary mt-2 text-sm leading-6">
                  Owner notified. Release blocked until the job passes or the PR is removed.
                </p>
              </div>
            </div>

            <div className="grid gap-4 px-5 py-4 sm:grid-cols-3">
              {[
                ['Next action', 'Approve billing UI'],
                ['Deploy check', 'Grafana after release'],
                ['Owner view', 'One release record'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.16em] uppercase">
                    {label}
                  </p>
                  <p className="text-ink mt-1 text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-line bg-surface-alt/45 border-b py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[1480px] px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end">
            <div data-reveal>
              <p className="text-ink-tertiary font-mono text-[11px] tracking-[0.18em] uppercase">
                Setup
              </p>
              <h2 className="font-display mt-4 max-w-[12ch] text-[clamp(2.35rem,4vw,4.25rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                Connected in about 10 minutes.
              </h2>
              <p className="text-ink-secondary mt-5 max-w-[38rem] text-base leading-8">
                When early access opens, setup is simple: install the apps, connect Grafana, then
                keep merging PRs like you do today. Titan handles the release updates in Slack.
              </p>
            </div>

            <div
              className="grid grid-cols-2 gap-3 sm:grid-cols-5"
              data-reveal
              data-reveal-delay="1"
            >
              {INTEGRATION_LOGOS.map((tool) => (
                <div
                  key={tool.name}
                  className="border-line bg-surface flex min-h-28 flex-col items-center justify-center gap-3 border p-4"
                  style={{ borderRadius: '8px' }}
                >
                  <img src={tool.image} alt={`${tool.name} logo`} className="h-8 w-8" />
                  <p className="text-ink-secondary text-center text-sm font-medium">{tool.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="border-line bg-line mt-10 grid gap-px overflow-hidden border lg:grid-cols-4"
            style={{ borderRadius: '12px' }}
          >
            {SETUP_STEPS.map((item) => (
              <div key={item.step} className="bg-surface p-5" data-reveal>
                <div className="flex items-start justify-between gap-5">
                  <span className="text-primary-accessible font-mono text-[11px] tracking-[0.18em] uppercase">
                    Step {item.step}
                  </span>
                  <img src={item.image} alt={item.alt} className="h-10 w-10" />
                </div>
                <h3 className="text-ink mt-8 text-lg leading-7 font-semibold">{item.title}</h3>
                <p className="text-ink-secondary mt-3 text-sm leading-7">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-line border-b py-14 lg:py-20">
        <div className="mx-auto grid w-full max-w-370 gap-10 px-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-12">
          <div data-reveal>
            <p className="text-ink-tertiary font-mono text-[11px] tracking-[0.18em] uppercase">
              How it works
            </p>
            <h2 className="font-display mt-4 max-w-[12ch] text-[clamp(2.35rem,4vw,4.25rem)] leading-[0.98] font-medium tracking-[-0.05em]">
              Five steps. One release.
            </h2>
            <p className="text-ink-secondary mt-5 max-w-120 text-base leading-8">
              The team still uses GitHub, Jenkins, Slack, and Grafana. Titan just keeps the release
              together.
            </p>
          </div>

          <div className="border-line border-t" data-reveal data-reveal-delay="1">
            {WORKFLOW.map((item) => (
              <div
                key={item.step}
                className="border-line grid gap-4 border-b py-6 md:grid-cols-[92px_220px_minmax(0,1fr)]"
              >
                <p className="text-primary-accessible font-mono text-[11px] tracking-[0.18em] uppercase">
                  {item.step}
                </p>
                <h3 className="text-ink text-base leading-7 font-semibold">{item.title}</h3>
                <p className="text-ink-secondary max-w-[48rem] text-sm leading-7">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-line border-b py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[1480px] px-6 lg:px-10">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-12">
            <div data-reveal>
              <p className="text-ink-tertiary font-mono text-[11px] tracking-[0.18em] uppercase">
                What you get
              </p>
              <h2 className="font-display mt-4 max-w-[13ch] text-[clamp(2.35rem,4vw,4.25rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                The release record stays current.
              </h2>
              <p className="text-ink-secondary mt-5 max-w-[33rem] text-base leading-8">
                Titan Rollout is not another place your team has to live in. It keeps the release
                record current and sends the important updates back to Slack.
              </p>
            </div>

            <div
              className="border-line bg-line grid gap-px overflow-hidden border"
              data-reveal
              data-reveal-delay="1"
              style={{ borderRadius: '8px' }}
            >
              {CAPABILITIES.map((item) => (
                <div
                  key={item.title}
                  className="bg-surface p-5 sm:grid sm:grid-cols-[180px_minmax(0,1fr)_150px] sm:gap-6"
                >
                  <h3 className="text-ink text-sm leading-6 font-semibold">{item.title}</h3>
                  <p className="text-ink-secondary mt-2 text-sm leading-7 sm:mt-0">{item.body}</p>
                  <p className="text-ink-tertiary mt-3 font-mono text-[10px] tracking-[0.14em] uppercase sm:mt-1">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-line border-b py-14 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1480px] gap-5 gap-10 px-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-12">
          <div data-reveal>
            <p className="text-ink-tertiary font-mono text-[11px] tracking-[0.18em] uppercase">
              Built for
            </p>
            <h2 className="font-display mt-4 max-w-[13ch] text-[clamp(2.35rem,4vw,4.25rem)] leading-[0.98] font-medium tracking-[-0.05em]">
              Teams that ship across moving parts.
            </h2>
            <p className="text-ink-secondary mt-5 max-w-[42rem] text-base leading-8">
              If one person has to keep asking what merged, what failed, and who approved, Titan
              Rollout gives that work a home.
            </p>
          </div>

          <div className="border-line border-t" data-reveal data-reveal-delay="1">
            {FIT_CHECKS.map((item) => (
              <div
                key={item}
                className="border-line grid grid-cols-[28px_minmax(0,1fr)] gap-4 border-b py-4"
              >
                <span className="text-primary-accessible font-mono text-[11px] tracking-[0.14em]">
                  +
                </span>
                <p className="text-ink-secondary text-sm leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[1480px] px-6 lg:px-10">
          <div
            className="grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center"
            style={{ borderRadius: '12px' }}
            data-reveal
          >
            <div>
              <p className="text-ink-tertiary font-mono text-[11px] tracking-[0.18em] uppercase">
                Early access
              </p>
              <h2 className="font-display mt-3 max-w-[16ch] text-[clamp(2.1rem,3.5vw,3.7rem)] leading-[1] font-medium tracking-[-0.045em]">
                Join the waitlist for Titan Rollout.
              </h2>
              <p className="text-ink-secondary mt-5 max-w-[44rem] text-base leading-8">
                Join the waitlist and we will let you know when early access is ready.
              </p>
            </div>
            <div className="grid gap-3">
              <NavCta block />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
