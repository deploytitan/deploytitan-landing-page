import Image from 'next/image'
import { WAITLIST_URL } from '@/lib/env'
import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { Button } from '../components/shared/Button'
import { urlFor } from '@/sanity/lib/image'

const companyPattern = [
  {
    number: '01',
    title: 'AI made code faster, but delivery did not automatically keep up.',
    description:
      'Teams started generating more work than their review, verification, and release systems could absorb.',
  },
  {
    number: '02',
    title: 'The bottleneck moved downstream.',
    description:
      'CI queues, reviewer attention, release confidence, and deployment ownership became the new constraint.',
  },
  {
    number: '03',
    title: 'Internal tooling became a distraction.',
    description:
      'Startups began building custom AI delivery fixes instead of focusing that energy on their core product.',
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
      {/* Hero */}
      <Section padding="none">
        <Container className="pt-20 pb-24 lg:pt-28 lg:pb-32">
          <span className="hero-label text-ink-tertiary font-mono text-[11px] tracking-widest uppercase">
            About
          </span>
          <h1 className="hero-heading font-display text-ink mt-5 max-w-[22ch] text-[clamp(2.8rem,6.5vw,7.2rem)] leading-[0.95] font-medium tracking-[-0.06em]">
            We help AI-moving teams ship without losing control.
          </h1>
          <p className="hero-body text-ink-secondary mt-8 max-w-[52ch] text-lg leading-relaxed">
            DeployTitan publishes practical guidance for startups and scaleups adopting AI in
            engineering, then turns that learning into products and support for faster, safer
            delivery.
          </p>
        </Container>
      </Section>

      {/* Company overview */}
      <Section border="top" padding="none">
        <Container className="py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <div className="bg-primary/60 mb-6 h-px w-10" aria-hidden="true" />
              <h2 className="font-display text-ink text-2xl leading-[1.1] font-medium tracking-[-0.025em] sm:text-3xl">
                Built for teams whose AI adoption has exposed the next bottleneck.
              </h2>
            </div>

            <div className="space-y-10">
              {companyPattern.map((item) => (
                <div key={item.number} className="pattern-item flex gap-6">
                  <span
                    className="pattern-number font-display shrink-0 leading-none font-medium select-none"
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
          <div className="bg-primary/60 mb-6 h-px w-10" aria-hidden="true" />
          <h2 className="font-display text-ink text-2xl leading-[1.1] font-medium tracking-[-0.025em] sm:text-3xl">
            Make AI speed survive contact with real delivery.
          </h2>
          {/* Belief statement — standalone typographic moment */}
          <p className="text-ink mt-12 max-w-[38ch] text-2xl leading-[1.2] font-medium tracking-[-0.02em] lg:mt-16 lg:text-3xl lg:leading-[1.15]">
            Teams should not need a custom internal platform just to turn AI-generated work into
            safe, shippable product.
          </p>
        </Container>
      </Section>

      {/* Team */}
      <Section border="top" padding="none">
        <Container className="py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <div className="bg-primary/60 mb-6 h-px w-10" aria-hidden="true" />
              <h2 className="font-display text-ink text-2xl leading-[1.1] font-medium tracking-[-0.025em] sm:text-3xl">
                The people turning AI adoption anxiety into operating discipline.
              </h2>
              <p className="text-ink-secondary mt-5 text-base leading-relaxed">
                Small by design. We stay close to the teams living through the bottleneck.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {teamMembers.length === 0 && (
                <div>
                  <p className="text-ink-secondary text-base leading-relaxed">
                    DeployTitan is being built by a small founding team in Pune, India. We stay
                    close to the engineers and leaders living through AI delivery problems.
                  </p>
                  <Button
                    as="a"
                    href="/contact"
                    variant="outline"
                    size="sm"
                    className="mt-5 self-start"
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
          <div className="bg-primary/60 mb-6 h-px w-10" aria-hidden="true" />
          <h2 className="text-ink text-2xl font-medium tracking-[-0.02em]">
            The best way to understand DeployTitan is to bring us your AI delivery bottleneck.
          </h2>
          <p className="text-ink-secondary mt-4 max-w-[48ch] text-base leading-relaxed">
            Tell us where AI helped, where it slowed the system down, and what your team is building
            internally to compensate.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button as="a" href={WAITLIST_URL} variant="primary" size="lg">
              Join waitlist
            </Button>
            <Button as="a" href="/contact" variant="outline" size="lg">
              Contact us
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  )
}
