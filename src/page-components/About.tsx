import Image from 'next/image'
import { CREATE_ACCOUNT_URL } from '@/lib/env'
import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { Button } from '../components/shared/Button'
import { urlFor } from '@/sanity/lib/image'

const companyPattern = [
  {
    number: '01',
    title: 'The tools existed, the release record did not.',
    description:
      'Teams already had GitHub, CI/CD, Grafana, and Slack. What they did not have was one place that made the sprint release itself visible, ordered, and accountable.',
  },
  {
    number: '02',
    title: 'The coordination still lived in people.',
    description:
      'Approvals sat in chat, rollback context lived in memory, and release status depended on whoever happened to be closest to the window that day.',
  },
  {
    number: '03',
    title: 'The same anxiety kept repeating.',
    description:
      'Different companies, different stacks, same end-of-sprint behavior: too many tabs open, too much checking, and nobody fully sure what would happen next.',
  },
]

const values = [
  {
    title: 'Specificity before slogans',
    description:
      'We earn trust by naming the actual release moment: the blocked dependency, the missing rollback owner, the approval still stuck in Slack.',
  },
  {
    title: 'Coordination before execution',
    description:
      'The release happens in your head before it happens in production. DeployTitan makes that coordination work structural, visible, and shared.',
  },
  {
    title: 'Respect engineer time',
    description:
      'Every hour spent chasing release state across four tools is an hour not spent building. We remove babysitting work so teams can keep shipping.',
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
        <Container className="py-24 lg:py-32">
          <span className="text-ink-tertiary font-mono text-[11px] tracking-widest uppercase">
            About
          </span>
          <h1 className="font-display text-ink mt-5 max-w-[18ch] text-[clamp(2.4rem,4.8vw,4.8rem)] leading-[1.0] font-medium tracking-[-0.04em]">
            We build the missing layer between the sprint and the deploy.
          </h1>
          <p className="text-ink-secondary mt-6 max-w-[52ch] text-lg leading-relaxed">
            DeployTitan gives distributed engineering teams one shared release record across
            GitHub, CI/CD, observability, and Slack so the end of the sprint stops depending on
            memory, tab-checking, and heroic coordination.
          </p>
        </Container>
      </Section>

      {/* Company overview */}
      <Section border="top" padding="none">
        <Container className="py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <h2 className="font-display text-ink text-2xl leading-[1.1] font-medium tracking-[-0.025em] sm:text-3xl">
                Built for teams whose releases already span more than one repo.
              </h2>
              <p className="text-ink-secondary mt-5 text-base leading-relaxed">
                DeployTitan sits above the tools teams already run and makes the release itself
                legible: what is shipping, what is blocked, who needs to approve, and what happens
                if something goes wrong.
              </p>
            </div>

            <div className="space-y-8">
              {companyPattern.map((item) => (
                <div key={item.number} className="flex gap-6">
                  <span className="text-ink-tertiary mt-0.5 shrink-0 font-mono text-[10px] tracking-[0.14em] uppercase">
                    {item.number}
                  </span>
                  <div>
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
        <Container className="py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <h2 className="font-display text-ink text-2xl leading-[1.1] font-medium tracking-[-0.025em] sm:text-3xl">
                Make every multi-service release feel ordinary again.
              </h2>
            </div>

            <div className="space-y-5 text-base leading-relaxed">
              <p className="text-ink-secondary">
                Multi-service releases break down in the seams between systems. GitHub can show
                the pull requests, Jenkins can run the jobs, and Grafana can show the graphs.
                None of them own the release moment itself.
              </p>
              <p className="text-ink-secondary">
                DeployTitan closes that gap. Teams define the release, track dependencies, collect
                approvals, and attach rollback plans before anything ships. The work that used to
                live in Slack threads and human memory becomes structural and visible.
              </p>
              <p className="text-ink font-medium">
                Teams should not need a spreadsheet, a war room, or one heroic engineer to get a
                release out safely.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section border="top" padding="none">
        <Container className="py-20 lg:py-24">
          <h2 className="font-display text-ink text-2xl font-medium tracking-[-0.025em]">
            How we work
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="text-ink text-sm font-semibold">{value.title}</h3>
                <p className="text-ink-secondary mt-3 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section border="top" padding="none">
        <Container className="py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <h2 className="font-display text-ink text-2xl leading-[1.1] font-medium tracking-[-0.025em] sm:text-3xl">
                The people turning release anxiety into product.
              </h2>
              <p className="text-ink-secondary mt-5 text-base leading-relaxed">
                Small by design, direct by default. We stay close to the engineers feeling the
                pain so the product keeps its edge.
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
        <Container className="py-20 lg:py-24">
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
              href={CREATE_ACCOUNT_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              className="rounded-[8px]"
            >
              Create account
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
