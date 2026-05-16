import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

const PRIMARY = 'var(--color-primary)'

const values = [
  {
    title: 'Start small, then promote',
    description:
      'Ship to one account, one tenant, one team — before you ship to everyone. Cohort deployments let you target specific users or accounts by event attributes, so real-world blast radius starts at one.',
  },
  {
    title: 'Safety actions should never cost extra',
    description:
      'Rollbacks, health checks, and risk scans are included in every plan. We never charge more for doing the right thing.',
  },
  {
    title: 'Respect engineer time',
    description:
      'Every hour spent manually watching a canary is an hour not spent building. We automate the toil so your team can focus on the work that matters.',
  },
  {
    title: 'No black boxes',
    description:
      'Every deployment decision, traffic split, cohort promotion, and rollback trigger is visible in your dashboard. You always know what Titan did and why.',
  },
]

const team = [
  {
    name: 'Justine Kizhakkinedath',
    role: 'Founder',
    bio: 'Spent years across engineering organizations watching the same Lambda deployment anxiety repeat — manual traffic cuts, missed DLQ spikes, 3am rollbacks. Built DeployTitan to make that a solved problem.',
  },
]

const investors = [
  { name: 'Horizon Ventures', stage: 'Seed' },
  { name: 'Arc Capital', stage: 'Seed' },
  { name: 'Forge Syndicate', stage: 'Seed' },
]

export default function About() {
  return (
    <div className="bg-surface min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <Section border="bottom" padding="none" className="blueprint-grid">
        <Container className="py-20 lg:py-28">
          <div className="">
            <span className="text-ink-quaternary font-mono text-[11px] tracking-widest uppercase">
              About
            </span>
            <h1 className="font-display text-ink mt-3 text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl lg:text-6xl">
              Progressive delivery for AWS Lambda, done right.
            </h1>
            {/* Two-line descriptor: what + for whom */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <span
                className="inline-block h-px w-8 shrink-0"
                style={{ background: PRIMARY, opacity: 0.5 }}
              />
              <p className="text-ink-secondary text-base leading-relaxed">
                Automated canary deployments, DLQ-driven rollbacks, and real-time risk intelligence
                — so teams shipping Lambda functions can move fast without breaking things.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Company Overview ──────────────────────────────────────────────────── */}
      <Section border="bottom" padding="none">
        <Container className="py-14">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1fr_2px_1fr] lg:gap-0">
            {/* Label + heading */}
            <div className="flex flex-col justify-center pr-0 lg:pr-12">
              <span className="text-ink-quaternary font-mono text-[10px] tracking-widest uppercase">
                Company overview
              </span>
              <h2 className="font-display text-ink mt-3 text-2xl leading-snug font-medium tracking-[-0.02em]">
                What DeployTitan is,
                <br />
                and who it's built for.
              </h2>
            </div>

            {/* Divider — visible only on lg */}
            <div
              className="hidden w-px self-stretch lg:block"
              style={{ background: 'var(--color-line)' }}
            />

            {/* Formal description */}
            <div className="flex flex-col justify-center pl-0 lg:pl-12">
              <p className="text-ink-secondary text-base leading-relaxed">
                DeployTitan is a progressive delivery platform built specifically for AWS Lambda and
                event-driven architectures. It gives teams canary traffic splitting via Lambda
                alias routing, cohort deployments that target specific users or accounts by event
                attributes, automated rollback triggered by DLQ depth and CloudWatch metrics, and
                deployment risk intelligence — all configured through the DeployTitan platform.
              </p>
              <p className="text-ink-secondary mt-4 text-base leading-relaxed">
                The platform is priced per managed function, not per deployment — so teams can
                ship as often as they need without watching a cost counter.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Mission & Vision ──────────────────────────────────────────────────── */}
      <Section border="bottom" padding="none">
        <Container className="py-16 lg:py-20">
          {/* Section label */}
          <span className="text-ink-quaternary font-mono text-[10px] tracking-widest uppercase">
            Mission &amp; Vision
          </span>

          {/* Mission statement — large, accented */}
          <div className="mt-6 flex items-start gap-5">
            <div
              className="mt-1.5 w-0.5 shrink-0 self-stretch rounded-[2px]"
              style={{ background: PRIMARY, opacity: 0.5 }}
            />
            <h2 className="font-display text-ink text-3xl leading-[1.1] font-medium tracking-tight sm:text-4xl">
              Make every Lambda deployment
              <br />a non-event.
            </h2>
          </div>

          {/* Body + Vision block — two-column on large screens */}
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Mission body */}
            <div className="text-ink-secondary space-y-4 text-base leading-relaxed">
              <p>
                Lambda deployments fail in ways that generic CI/CD tools don&apos;t handle well —
                DLQ spikes, cold start regressions, event source mapping errors. The usual response
                is manual traffic management, Slack alerts, and someone staying awake to watch the
                graphs.
              </p>
              <p>
                DeployTitan automates that loop. You define what healthy looks like in YAML; Titan
                watches the signals and either promotes or rolls back — without a human in the
                critical path. And with cohort deployments, you can target the new version at a
                specific set of users, accounts, or tenants — identified by event or context
                attributes — before it touches everyone.
              </p>
              <p>
                We&apos;re a small, focused team. We ship fast, we talk to our customers constantly,
                and we build only what makes Lambda deployments safer.
              </p>
            </div>

            {/* Vision + stats */}
            <div className="flex flex-col gap-6">
              {/* Vision card */}
              <Card tone="muted" padding="lg" className="relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-6 w-6 border-t border-l"
                  style={{ borderColor: PRIMARY, opacity: 0.35 }}
                />
                <p className="text-ink-quaternary mb-3 font-mono text-[10px] tracking-widest uppercase">
                  Vision
                </p>
                <p className="text-ink text-base leading-snug font-medium">
                  A world where any team running Lambda functions can deploy with confidence —
                  targeting specific users or accounts first, watching the signals, and promoting
                  automatically. No dedicated platform engineers, no manual traffic cuts, no 3am pages.
                </p>
              </Card>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '2026', label: 'Founded' },
                  { value: 'Pune + Remote', label: 'Where we work' },
                ].map((stat) => (
                  <Card key={stat.label} tone="muted">
                     <p className="text-ink text-2xl font-medium">{stat.value}</p>
                    <p className="text-ink-tertiary mt-1 text-xs">{stat.label}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Values ────────────────────────────────────────────────────────────── */}
      <Section border="bottom" tone="muted" padding="none">
        <Container className="py-16">
          <span className="text-ink-quaternary font-mono text-[10px] tracking-widest uppercase">
            Values
          </span>
          <h2 className="font-display text-ink mt-3 text-2xl font-medium tracking-[-0.02em]">
            How we work
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <Card key={v.title}>
                <h3 className="text-ink text-base font-medium">{v.title}</h3>
                <p className="text-ink-secondary mt-2 text-sm leading-relaxed">{v.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Team ──────────────────────────────────────────────────────────────── */}
      <Section border="bottom" padding="none">
        <Container className="py-16">
          <span className="text-ink-quaternary font-mono text-[10px] tracking-widest uppercase">
            Team
          </span>
          <h2 className="font-display text-ink mt-3 text-2xl font-medium tracking-[-0.02em]">
            The people building it
          </h2>
          <p className="text-ink-secondary mt-2 text-sm max-w-lg leading-relaxed">
            Small and focused. We talk to engineers every day and ship fast because there are no
            layers between the people building the product and the people using it.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <Card key={person.name} tone="muted">
                {/* Avatar placeholder */}
                <div
                  className="bg-primary-muted border-primary/20 text-primary-dark mb-4 flex h-12 w-12 items-center justify-center border text-lg font-medium"
                  style={{ borderRadius: '2px' }}
                >
                  {person.name.charAt(0)}
                </div>
                <h3 className="text-ink text-sm font-medium">{person.name}</h3>
                <p className="text-ink-quaternary mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                  {person.role}
                </p>
                <p className="text-ink-secondary mt-3 text-xs leading-relaxed">{person.bio}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
