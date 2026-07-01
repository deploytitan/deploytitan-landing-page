import { WaitlistForm } from '@/components/WaitlistForm'

export default function Waitlist() {
  return (
    <div className="border-line border-b">
      <section className="blueprint-grid relative overflow-hidden pt-14 pb-8 sm:pt-16 lg:pt-24 lg:pb-12">
        <div className="from-primary/[0.06] via-primary/[0.02] pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b to-transparent" />
        <div className="mx-auto grid w-full max-w-[1280px] gap-6 px-5 sm:px-6 lg:grid-cols-[minmax(0,0.74fr)_minmax(520px,1fr)] lg:gap-12 lg:px-10">
          <div className="flex min-w-0 flex-col">
            <p className="text-ink-tertiary mb-2.5 font-mono text-[11px] tracking-[0.22em] uppercase">
              Early access
            </p>
            <h1
              className="text-ink max-w-[10ch] text-[2.65rem] leading-[0.96] font-medium tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-[4.6rem] lg:leading-[0.92] xl:text-[5rem]"
              style={{ textWrap: 'balance' }}
            >
              Join the DeployTitan waitlist.
            </h1>
            <p className="text-ink-secondary mt-4 max-w-[48ch] text-base leading-7 sm:text-lg sm:leading-8">
              Early access for teams coordinating sprint releases across GitHub, Jenkins, Grafana,
              and Slack.
            </p>
          </div>

          <div
            className="border-line bg-surface corner-accent relative self-start overflow-hidden border lg:mt-9"
            style={{ borderRadius: '12px' }}
          >
            <div className="via-primary/60 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
            <div className="border-line bg-surface-alt/50 flex flex-col gap-1 border-b px-4 py-3 sm:px-5 sm:py-3.5">
              <p className="text-ink font-mono text-[11px] tracking-[0.18em] uppercase">
                Private intake
              </p>
              <p className="text-ink text-2xl leading-tight font-medium">
                Skip the release war room.
              </p>
            </div>

            <div className="px-4 py-4 sm:px-5">
              <WaitlistForm source="waitlist-page" className="flex flex-col gap-3.5" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
