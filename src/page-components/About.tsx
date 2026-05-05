import Link from 'next/link'
import { MidCTA } from '../components/MidCTA'
import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

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
    name: 'Justine Kizhak',
    role: 'Founder & CEO',
    bio: 'Previously led platform engineering at a Series C fintech. Spent years thinking about why deployments are still scary.',
  },
  {
    name: 'Aria Chen',
    role: 'Co-founder & CTO',
    bio: 'Distributed systems engineer. Built the Kubernetes autoscaling layer at two high-growth companies before this.',
  },
  {
    name: 'Marco Reyes',
    role: 'Head of Product',
    bio: 'Former SRE at a leading observability company. Knows exactly what keeps on-call engineers awake at 3am.',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Engineering',
    bio: 'Previously a staff engineer at a Fortune 100 cloud provider. Obsessed with reliability at scale.',
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
      {/* Hero */}
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
            <p className="mt-6 text-xl text-ink-secondary leading-relaxed max-w-2xl">
              DeployTitan started with a simple observation: deployment is the riskiest moment in
              software delivery, yet most teams treat it as an afterthought. We're changing that.
            </p>
          </div>
        </Container>
      </Section>

      {/* Mission */}
      <Container as="section" className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
              Mission
            </span>
            <h2 className="mt-3 text-3xl font-display font-medium text-ink tracking-tight">
              Make every deployment a non-event.
            </h2>
            <p className="mt-5 text-base text-ink-secondary leading-relaxed">
              The best software teams in the world deploy hundreds of times a day. They're not
              special — they just have better tooling. DeployTitan gives every engineering team
              access to the same progressive delivery, automated rollback, and risk intelligence
              that elite teams built for themselves over years.
            </p>
            <p className="mt-4 text-base text-ink-secondary leading-relaxed">
              We're a small, focused team. We ship fast. We talk to our customers constantly. And we
              believe that the future of software delivery is calm, confident, and automated.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '2024', label: 'Founded' },
              { value: 'SF + remote', label: 'Where we work' },
              { value: 'Seed', label: 'Stage' },
              { value: '100% open core', label: 'Philosophy' },
            ].map((stat) => (
              <Card key={stat.label} tone="muted">
                <p className="font-display text-2xl font-medium text-ink">{stat.value}</p>
                <p className="mt-1 text-xs text-ink-tertiary">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>

      {/* Values */}
      <Section border="top" tone="muted" padding="none">
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

      {/* Team */}
      <Section border="top" padding="none">
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
          <div className="mt-8">
            <Link
              href="/careers"
              className="text-sm text-primary font-medium hover:text-primary-dark transition-colors"
            >
              We're hiring — view open roles →
            </Link>
          </div>
        </Container>
      </Section>

      {/* Investors */}
      <Section border="top" tone="muted" padding="none">
        <Container className="py-12">
          <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
            Backed by
          </span>
          <div className="mt-6 flex flex-wrap gap-4">
            {investors.map((inv) => (
              <Card key={inv.name} padding="sm" className="flex items-center gap-3">
                <span className="text-sm font-medium text-ink">{inv.name}</span>
                <span className="font-mono text-[10px] text-ink-quaternary">{inv.stage}</span>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <MidCTA
        heading="Want to work with us?"
        subheading="We're a small team building something hard. If that sounds like your thing, let's talk."
        primaryLabel="View open roles"
        primaryHref="/careers"
        secondaryLabel="Get in touch"
        secondaryHref="/contact"
        secondaryExternal={false}
      />
    </div>
  )
}
