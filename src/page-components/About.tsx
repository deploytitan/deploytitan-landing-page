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
    <div className="bg-surface min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <Section border="bottom" padding="none" className="blueprint-grid">
        <Container className="py-20 lg:py-28">
          <div className="">
            <span className="text-ink-quaternary font-mono text-[11px] tracking-widest uppercase">
              About
            </span>
            <h1 className="font-display text-ink mt-3 text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl lg:text-6xl">
              We're building the deployment control plane you deserve.
            </h1>
            {/* Two-line descriptor: what + for whom */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <span
                className="inline-block h-px w-8 shrink-0"
                style={{ background: PRIMARY, opacity: 0.5 }}
              />
              <p className="text-ink-secondary text-base leading-relaxed">
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
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1fr_2px_1fr] lg:gap-0">
            {/* Label + heading */}
            <div className="flex flex-col justify-center pr-0 lg:pr-12">
              <span className="text-ink-quaternary font-mono text-[10px] tracking-widest uppercase">
                Company overview
              </span>
              <h2 className="font-display text-ink mt-3 text-2xl leading-snug font-medium tracking-tight">
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
                DeployTitan is a deployment control plane for engineering teams that need to ship
                software safely and frequently. The platform provides progressive delivery,
                automated rollback, and real-time risk intelligence — giving teams the controls and
                visibility they need to deploy with confidence across any cloud environment.
              </p>
              <p className="text-ink-secondary mt-4 text-base leading-relaxed">
                Built for teams running Kubernetes, AWS Lambda, and GCP Cloud Run, DeployTitan
                removes the manual toil and guesswork from every release — whether you deploy once a
                week or dozens of times a day.
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
              className="mt-1.5 w-0.5 shrink-0 self-stretch rounded-full"
              style={{ background: PRIMARY, opacity: 0.5 }}
            />
            <h2 className="font-display text-ink text-3xl leading-[1.1] font-medium tracking-tight sm:text-4xl">
              Make every deployment
              <br />a non-event.
            </h2>
          </div>

          {/* Body + Vision block — two-column on large screens */}
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Mission body */}
            <div className="text-ink-secondary space-y-4 text-base leading-relaxed">
              <p>
                The best engineering teams in the world deploy hundreds of times a day. They're not
                special — they just have better tooling. DeployTitan gives every team access to the
                same progressive delivery, automated rollback, and risk intelligence that elite
                teams spent years building for themselves.
              </p>
              <p>
                We're a small, focused team. We ship fast. We talk to our customers constantly. And
                we believe the future of software delivery is calm, confident, and automated.
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
                <p className="font-display text-ink text-base leading-snug font-medium">
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
                    <p className="font-display text-ink text-2xl font-medium">{stat.value}</p>
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
          <h2 className="font-display text-ink mt-3 text-2xl font-medium tracking-tight">
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
          <h2 className="font-display text-ink mt-3 text-2xl font-medium tracking-tight">
            The people building it
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <Card key={person.name} tone="muted">
                {/* Avatar placeholder */}
                <div
                  className="bg-primary-muted border-primary/20 font-display text-primary-dark mb-4 flex h-12 w-12 items-center justify-center border text-lg font-medium"
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
