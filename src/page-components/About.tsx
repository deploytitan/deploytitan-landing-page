import Image from 'next/image'
import { WAITLIST_URL } from '@/lib/env'
import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { Button } from '../components/shared/Button'
import { urlFor } from '@/sanity/lib/image'

const companyPattern = [
  {
    number: '01',
    title: 'The tools existed, the release record did not.',
    description:
      'What teams lacked was one place that made the sprint release itself visible, ordered, and accountable.',
  },
  {
    number: '02',
    title: 'The coordination still lived in people.',
    description:
      'Approvals sat in chat, rollback context lived in memory, and release status depended on whoever happened to be watching.',
  },
  {
    number: '03',
    title: 'The same anxiety kept repeating.',
    description:
      'Different companies, different stacks, same end-of-sprint: too many tabs open, nobody fully sure what would happen next.',
  },
]

const values = [
  {
    title: 'Specificity before slogans',
    description:
      'We earn trust by naming the actual moment: the blocked dependency, the approval still stuck in Slack.',
  },
  {
    title: 'Coordination before execution',
    description: 'The release happens in your head before it happens in production. We make that structural.',
  },
  {
    title: 'Respect engineer time',
    description: 'Every hour chasing release state across four tools is an hour not spent building.',
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
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <Section padding="none">
        <Container className="pb-24 pt-20 lg:pb-32 lg:pt-28">
          <span className="hero-label text-ink-tertiary font-mono text-[11px] tracking-widest uppercase">
            About
          </span>
          <h1 className="hero-heading font-display text-ink mt-5 max-w-[22ch] text-[clamp(2.8rem,6.5vw,7.2rem)] leading-[0.95] font-medium tracking-[-0.06em]">
            We build the missing layer between the sprint and the deploy.
          </h1>
          <p className="hero-body text-ink-secondary mt-8 max-w-[52ch] text-lg leading-relaxed">
            DeployTitan gives distributed engineering teams one shared release record across
            GitHub, CI/CD, observability, and Slack so the end of the sprint stops depending on
            memory, tab-checking, and heroic coordination.
          </p>
        </Container>
      </Section>

      {/* Company overview */}
      <Section border="top" padding="none">
        <Container className="py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <div className="mb-6 h-px w-10 bg-primary/60" aria-hidden="true" />
              <h2 className="font-display text-ink text-2xl leading-[1.1] font-medium tracking-[-0.025em] sm:text-3xl">
                Built for teams whose releases already span more than one repo.
              </h2>
            </div>

            <div className="space-y-10">
              {companyPattern.map((item) => (
                <div key={item.number} className="pattern-item flex gap-6">
                  <span
                    className="pattern-number font-display shrink-0 select-none font-medium leading-none"
                    style={{ fontSize: '4.5rem', color: 'var(--color-ink)', opacity: 0.07 }}
                    aria-hidden="true"
                  >
                    {item.number}
                  </span>
                  <div className="pt-3">
                    <h3 className="text-ink text-base font-medium">{item.title}</h3>
                    <p className="text-ink-secondary mt-2 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Why */}
      <Section border="top" padding="none">
        <Container className="py-20 lg:py-28">
          <div className="mb-6 h-px w-10 bg-primary/60" aria-hidden="true" />
          <h2 className="font-display text-ink text-2xl leading-[1.1] font-medium tracking-[-0.025em] sm:text-3xl">
            Make every multi-service release feel ordinary again.
          </h2>
          {/* Belief statement — standalone typographic moment */}
          <p className="text-ink mt-12 max-w-[38ch] text-2xl leading-[1.2] font-medium tracking-[-0.02em] lg:mt-16 lg:text-3xl lg:leading-[1.15]">
            Teams should not need a spreadsheet, a war room, or one heroic engineer to get a
            release out safely.
          </p>
        </Container>
      </Section>

      {/* Values */}
      <Section border="top" padding="none">
        <Container className="py-20 lg:py-28">
          <div className="mb-6 h-px w-10 bg-primary/60" aria-hidden="true" />
          <h2 className="font-display text-ink text-2xl font-medium tracking-[-0.025em]">
            How we work
          </h2>
          <div className="mt-12 space-y-10">
            {values.map((value) => (
              <div
                key={value.title}
                className="value-row grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] sm:gap-10"
              >
                <h3 className="value-title text-ink text-base font-semibold">{value.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section border="top" padding="none">
        <Container className="py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <div className="mb-6 h-px w-10 bg-primary/60" aria-hidden="true" />
              <h2 className="font-display text-ink text-2xl leading-[1.1] font-medium tracking-[-0.025em] sm:text-3xl">
                The people turning release anxiety into product.
              </h2>
              <p className="text-ink-secondary mt-5 text-base leading-relaxed">
                Small by design. We stay close to the engineers living through the problem.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {teamMembers.length === 0 && (
                <div>
                  <p className="text-ink-secondary text-base leading-relaxed">
                    DeployTitan is being built by a small founding team in Pune, India. We stay
                    close to the engineers living through the problem.
                  </p>
                  <Button
                    as="a"
                    href="/contact"
                    variant="outline"
                    size="sm"
                    className="mt-5 self-start rounded-[8px]"
                  >
                    Get in touch
                  </Button>
                </div>
              )}

              {featuredMember && (
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <div className="border-line bg-surface-alt relative h-48 w-48 shrink-0 overflow-hidden sm:h-56 sm:w-44">
                    {featuredMember.image ? (
                      <Image
                        src={urlFor(featuredMember.image).width(400).height(500).url()}
                        alt={featuredMember.name}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    ) : (
                      <div className="bg-primary-muted text-primary-dark flex h-full items-end justify-start p-4">
                        <span className="font-display text-5xl leading-none font-medium">
                          {featuredMember.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    {featuredMember.role && (
                      <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.16em] uppercase">
                        {featuredMember.role}
                      </p>
                    )}
                    <h3 className="text-ink mt-2 text-xl font-medium">{featuredMember.name}</h3>
                    {featuredMember.bio && (
                      <p className="text-ink-secondary mt-3 max-w-[38ch] text-sm leading-relaxed">
                        {featuredMember.bio}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {supportingTeamMembers.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-6 sm:grid-cols-3">
                  {supportingTeamMembers.map((person) => (
                    <div key={person._id} className="flex flex-col gap-3">
                      <div className="border-line bg-surface-alt relative aspect-square w-full max-w-[9rem] overflow-hidden">
                        {person.image ? (
                          <Image
                            src={urlFor(person.image).width(300).height(300).url()}
                            alt={person.name}
                            fill
                            className="object-cover"
                            sizes="150px"
                          />
                        ) : (
                          <div className="bg-primary-muted text-primary-dark flex h-full items-end justify-start p-3">
                            <span className="font-display text-4xl leading-none font-medium">
                              {person.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      {person.role && (
                        <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.14em] uppercase">
                          {person.role}
                        </p>
                      )}
                      <h3 className="text-ink -mt-1 text-sm font-medium">{person.name}</h3>
                      {person.bio && (
                        <p className="text-ink-secondary text-xs leading-relaxed">{person.bio}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section border="top" padding="none">
        <Container className="py-20 lg:py-28">
          <div className="mb-6 h-px w-10 bg-primary/60" aria-hidden="true" />
          <h2 className="text-ink text-2xl font-medium tracking-[-0.02em]">
            The best way to understand DeployTitan is to try it on a real sprint.
          </h2>
          <p className="text-ink-secondary mt-4 max-w-[48ch] text-base leading-relaxed">
            Connect the tools you already run and see whether the release window gets quieter in
            one cycle.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              as="a"
              href={WAITLIST_URL}
              variant="primary"
              size="lg"
              className="rounded-[8px]"
            >
              Join waitlist
            </Button>
            <Button as="a" href="/contact" variant="outline" size="lg" className="rounded-[8px]">
              Contact us
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  )
}
