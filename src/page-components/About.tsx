import Image from 'next/image'
import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'
import { urlFor } from '@/sanity/lib/image'

const PRIMARY = 'var(--color-primary)'

const values = [
  {
    title: 'Coordination before execution',
    description:
      'The release happens in your head long before it happens in production. DeployTitan makes the coordination work that happens in Slack threads and Jira tickets structural, visible, and auditable.',
  },
  {
    title: 'Rollback confidence is not optional',
    description:
      'Every release should have a named rollback owner, a linked playbook, and a computed revert sequence before anything merges. This is not nice-to-have; it is the prerequisite for a safe release.',
  },
  {
    title: 'Respect engineer time',
    description:
      'Every hour spent chasing release status across four tools is an hour not spent building. DeployTitan creates one shared record so teams stop repeating themselves.',
  },
  {
    title: 'No black boxes',
    description:
      'Every release state, dependency block, approval, and promotion decision is visible on the release record. You always know what Titan did and why.',
  },
]

interface TeamMember {
  _id: string
  name: string
  role?: string | null
  bio?: string | null
  image?: object | null
  teamOrder?: number | null
}

interface AboutProps {
  teamMembers?: TeamMember[]
}

export default function About({ teamMembers = [] }: AboutProps) {
  const [featuredMember, ...supportingTeamMembers] = teamMembers

  return (
    <div className="bg-surface min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <Section border="bottom" padding="none" className="blueprint-grid">
        <Container className="py-20 lg:py-28">
          <div className="">
            <span className="text-ink-tertiary font-mono text-[11px] tracking-widest uppercase">
              About
            </span>
            <h1 className="font-display text-ink mt-3 text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl lg:text-6xl">
              Release coordination
              for distributed engineering teams.
            </h1>
            {/* Two-line descriptor: what + for whom */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <span
                className="inline-block h-px w-8 shrink-0"
                style={{ background: PRIMARY, opacity: 0.5 }}
              />
              <p className="text-ink-secondary text-base leading-relaxed">
                Multi-repo release coordination, dependency graphing, rollback ownership, and release
                visibility for engineering teams whose releases span more than one service.
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
              <span className="text-ink-tertiary font-mono text-[10px] tracking-widest uppercase">
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
                DeployTitan is release coordination and deployment safety software for distributed
                engineering teams. The core product, Titan Rollouts, sits above GitHub, CI/CD, and
                observability tools to model the release lifecycle those systems do not manage well:
                multi-repo coordination, dependency graphing, freeze window management, approval
                flows, and rollback coordination.
              </p>
              <p className="text-ink-secondary mt-4 text-base leading-relaxed">
                Pricing is based on release coordination complexity and service count, not
                deployments or infrastructure consumption.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Mission & Vision ──────────────────────────────────────────────────── */}
      <Section border="bottom" padding="none">
        <Container className="py-16 lg:py-20">
          {/* Section label */}
          <span className="text-ink-tertiary font-mono text-[10px] tracking-widest uppercase">
            Mission &amp; Vision
          </span>

          {/* Mission statement — large, accented */}
          <div className="mt-6 flex items-start gap-5">
            <div
              className="mt-1.5 w-0.5 shrink-0 self-stretch rounded-[2px]"
              style={{ background: PRIMARY, opacity: 0.5 }}
            />
            <h2 className="font-display text-ink text-3xl leading-[1.1] font-medium tracking-tight sm:text-4xl">
              Make every multi-service release
              <br />a non-event.
            </h2>
          </div>

          {/* Body + Vision block — two-column on large screens */}
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Mission body */}
            <div className="text-ink-secondary space-y-4 text-base leading-relaxed">
              <p>
                Multi-service releases fail in ways that GitHub, CI/CD tools, and observability
                platforms do not handle well: merge sequencing errors, missing rollback ownership,
                freeze windows that open with blocked dependencies still unresolved.
              </p>
              <p>
                DeployTitan closes that coordination gap. Teams define the release, track its
                dependencies, collect approvals, and attach rollback plans before anything ships.
                The coordination that used to live in Slack threads and human memory becomes
                structural and visible.
              </p>
              <p>
                We are a small, focused team. We talk to engineers every day and build only
                what makes release coordination safer and more reliable.
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
                <p className="text-ink-tertiary mb-3 font-mono text-[10px] tracking-widest uppercase">
                  Vision
                </p>
                <p className="text-ink text-base leading-snug font-medium">
                  A world where any distributed engineering team can coordinate a complex
                  multi-service release without a Slack thread, a spreadsheet, or institutional
                  knowledge that only one person has.
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
          <span className="text-ink-tertiary font-mono text-[10px] tracking-widest uppercase">
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
      {teamMembers.length > 0 && (
        <Section border="bottom" tone="muted" padding="none" className="blueprint-grid relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/[0.08] to-transparent" />
          </div>
          <Container className="py-16 lg:py-20">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-16">
              <div className="lg:pt-3">
                <span className="text-primary-accessible font-mono text-[10px] tracking-widest uppercase">
                  Team
                </span>
                <h2 className="font-display text-ink mt-3 max-w-sm text-3xl leading-[1.05] font-medium tracking-[-0.03em] sm:text-4xl">
                  The people turning release anxiety into product.
                </h2>
                <p className="text-ink-secondary mt-4 max-w-md text-sm leading-relaxed sm:text-[15px]">
                  Small by design, direct by default. The people building DeployTitan stay close to
                  the engineers feeling the pain, so the product keeps its edge.
                </p>
                <div className="gold-line mt-8 max-w-[13rem]" />
              </div>

              <div className="flex flex-col gap-5">
                {featuredMember && (
                  <Card
                    key={featuredMember._id}
                    variant="spotlight"
                    tone="default"
                    padding="none"
                    className="group overflow-hidden border border-line transition-all duration-300 hover:border-primary/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                      <div className="relative min-h-[22rem] overflow-hidden border-b border-line bg-surface-alt lg:min-h-[29rem] lg:border-r lg:border-b-0">
                        {featuredMember.image ? (
                          <Image
                            src={urlFor(featuredMember.image).width(1200).height(1400).url()}
                            alt={featuredMember.name}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            sizes="(min-width: 1024px) 46vw, 100vw"
                          />
                        ) : (
                          <div className="bg-primary-muted text-primary-dark flex h-full items-end justify-start p-6 sm:p-8">
                            <span className="font-display text-6xl leading-none font-medium sm:text-7xl">
                              {featuredMember.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/20 to-transparent" />
                      </div>

                      <div className="flex flex-col justify-between p-6 sm:p-8">
                        <div>
                          <div className="flex items-center gap-3">
                            {featuredMember.role && (
                              <p className="text-primary-accessible border-primary/20 bg-primary-muted inline-flex items-center border px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] uppercase">
                                {featuredMember.role}
                              </p>
                            )}
                            <span className="text-ink-quaternary font-mono text-[10px] tracking-widest uppercase">
                              Lead profile
                            </span>
                          </div>
                          <h3 className="text-ink mt-5 text-2xl leading-tight font-medium sm:text-[2rem]">
                            {featuredMember.name}
                          </h3>
                          {featuredMember.bio && (
                            <p className="text-ink-secondary mt-4 max-w-[38ch] text-sm leading-relaxed sm:text-[15px]">
                              {featuredMember.bio}
                            </p>
                          )}
                        </div>

                        <div className="mt-8 flex items-center gap-3">
                          <span className="bg-primary/70 h-px w-10" />
                          <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.14em] uppercase">
                            Close to the release window, close to the product
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                {supportingTeamMembers.length > 0 && (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {supportingTeamMembers.map((person) => (
                      <Card
                        key={person._id}
                        variant="spotlight"
                        tone="default"
                        padding="none"
                        className="group overflow-hidden border border-line transition-all duration-300 hover:border-primary/30 hover:shadow-[0_10px_24px_rgba(0,0,0,0.05)]"
                      >
                        <div className="relative overflow-hidden border-b border-line bg-surface-alt">
                          {person.image ? (
                            <Image
                              src={urlFor(person.image).width(900).height(900).url()}
                              alt={person.name}
                              width={900}
                              height={900}
                              className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                              sizes="(min-width: 768px) 40vw, 100vw"
                            />
                          ) : (
                            <div className="bg-primary-muted text-primary-dark flex aspect-[4/3] w-full items-end justify-start p-5">
                              <span className="font-display text-5xl leading-none font-medium">
                                {person.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-3 p-5">
                          {person.role && (
                            <p className="text-primary-accessible font-mono text-[10px] tracking-[0.16em] uppercase">
                              {person.role}
                            </p>
                          )}
                          <h3 className="text-ink text-lg leading-tight font-medium">{person.name}</h3>
                          {person.bio && (
                            <p className="text-ink-secondary max-w-[34ch] text-sm leading-relaxed">
                              {person.bio}
                            </p>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Section>
      )}
    </div>
  )
}
