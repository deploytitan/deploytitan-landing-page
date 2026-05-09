import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

const PRIMARY = 'var(--color-primary)'

const values = [
  {
    title: 'Ship with confidence, not fear',
    description:
      'Deployments should be a non-event. We build tooling that makes releasing software feel safe — not like defusing a bomb.',
  },
  {
    title: 'Transparency by default',
    description:
      'Every deployment decision, metric, and incident is surfaced to your team automatically. No black boxes.',
  },
  {
    title: 'Respect engineer time',
    description:
      'Every hour spent manually babysitting a rollout is an hour not spent building. We automate the toil.',
  },
  {
    title: 'Meet teams where they are',
    description:
      'Whether you run five microservices or five hundred, on one cloud or three, DeployTitan fits around your stack.',
  },
]

const team = [
  {
    name: 'Justine Kizhakkinedath',
    role: 'Founder',
    bio: 'Spent years thinking about why deployments are still scary.',
  },
]

const investors = [
  { name: 'Horizon Ventures', stage: 'Seed' },
  { name: 'Arc Capital', stage: 'Seed' },
  { name: 'Forge Syndicate', stage: 'Seed' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-surface">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <Section border="bottom" padding="none" className="blueprint-grid">
        <Container className="py-20 lg:py-28">
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] text-ink-quaternary uppercase tracking-widest">
              About
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-display font-medium tracking-tight text-ink leading-[1.05]">
              We're building the deployment
              <br />
              control plane.
            </h1>
            {/* Two-line descriptor: what + for whom */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <span
                className="inline-block h-px w-8 shrink-0"
                style={{ background: PRIMARY, opacity: 0.5 }}
              />
              <p className="text-base text-ink-secondary leading-relaxed">
                Progressive delivery and automated recovery — so engineering teams can ship fast
                without shipping fear.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Company Overview ──────────────────────────────────────────────────── */}
      <Section border="bottom" padding="none">
        <Container className="py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2px_1fr] gap-8 lg:gap-0 items-stretch">

            {/* Label + heading */}
            <div className="flex flex-col justify-center pr-0 lg:pr-12">
              <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
                Company overview
              </span>
              <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-tight leading-snug">
                What DeployTitan is,
                <br />
                and who it's built for.
              </h2>
            </div>

            {/* Divider — visible only on lg */}
            <div
              className="hidden lg:block w-px self-stretch"
              style={{ background: 'var(--color-line)' }}
            />

            {/* Formal description */}
            <div className="flex flex-col justify-center pl-0 lg:pl-12">
              <p className="text-base text-ink-secondary leading-relaxed">
                DeployTitan is a deployment control plane for engineering teams that need to ship
                software safely and frequently. The platform provides progressive delivery,
                automated rollback, and real-time risk intelligence — giving teams the controls
                and visibility they need to deploy with confidence across any cloud environment.
              </p>
              <p className="mt-4 text-base text-ink-secondary leading-relaxed">
                Built for teams running Kubernetes, AWS Lambda, and GCP Cloud Run, DeployTitan
                removes the manual toil and guesswork from every release — whether you deploy
                once a week or dozens of times a day.
              </p>
            </div>

          </div>
        </Container>
      </Section>

      {/* ── Mission & Vision ──────────────────────────────────────────────────── */}
      <Section border="bottom" padding="none">
        <Container className="py-16 lg:py-20">

          {/* Section label */}
          <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
            Mission &amp; Vision
          </span>

          {/* Mission statement — large, accented */}
          <div className="mt-6 flex items-start gap-5">
            <div
              className="mt-1.5 shrink-0 w-0.5 self-stretch rounded-full"
              style={{ background: PRIMARY, opacity: 0.5 }}
            />
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-ink tracking-tight leading-[1.1]">
              Make every deployment
              <br />a non-event.
            </h2>
          </div>

          {/* Body + Vision block — two-column on large screens */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

            {/* Mission body */}
            <div className="space-y-4 text-base text-ink-secondary leading-relaxed">
              <p>
                The best engineering teams in the world deploy hundreds of times a day. They're
                not special — they just have better tooling. DeployTitan gives every team access
                to the same progressive delivery, automated rollback, and risk intelligence that
                elite teams spent years building for themselves.
              </p>
              <p>
                We're a small, focused team. We ship fast. We talk to our customers constantly.
                And we believe the future of software delivery is calm, confident, and automated.
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
                <p className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest mb-3">
                  Vision
                </p>
                <p className="text-base font-display font-medium text-ink leading-snug">
                  A world where any engineering team — regardless of size or resources — can deploy
                  with the same confidence as the best teams on the planet.
                </p>
              </Card>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '2026', label: 'Founded' },
                  { value: 'Pune + Remote', label: 'Where we work' },
                ].map((stat) => (
                  <Card key={stat.label} tone="muted">
                    <p className="font-display text-2xl font-medium text-ink">{stat.value}</p>
                    <p className="mt-1 text-xs text-ink-tertiary">{stat.label}</p>
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
          <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
            Values
          </span>
          <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-tight">
            How we work
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v) => (
              <Card key={v.title}>
                <h3 className="text-base font-medium text-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-ink-secondary leading-relaxed">{v.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Team ──────────────────────────────────────────────────────────────── */}
      <Section border="bottom" padding="none">
        <Container className="py-16">
          <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
            Team
          </span>
          <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-tight">
            The people building it
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((person) => (
              <Card key={person.name} tone="muted">
                {/* Avatar placeholder */}
                <div
                  className="w-12 h-12 bg-primary-muted border border-primary/20 flex items-center justify-center mb-4 font-display text-lg font-medium text-primary-dark"
                  style={{ borderRadius: '2px' }}
                >
                  {person.name.charAt(0)}
                </div>
                <h3 className="text-sm font-medium text-ink">{person.name}</h3>
                <p className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest mt-0.5">
                  {person.role}
                </p>
                <p className="mt-3 text-xs text-ink-secondary leading-relaxed">{person.bio}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

    </div>
  )
}
