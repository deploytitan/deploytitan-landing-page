export type Department = 'engineering' | 'product' | 'go-to-market' | 'design'
export type Location = 'San Francisco, CA' | 'Remote (US)' | 'Remote (Global)'

export interface Job {
  id: string
  title: string
  department: Department
  location: Location
  type: 'full-time' | 'contract'
  description: string
  responsibilities: string[]
  requirements: string[]
}

export const DEPARTMENT_LABELS: Record<Department, string> = {
  engineering: 'Engineering',
  product: 'Product',
  'go-to-market': 'Go-to-Market',
  design: 'Design',
}

export const jobs: Job[] = [
  {
    id: 'senior-backend-engineer',
    title: 'Senior Backend Engineer',
    department: 'engineering',
    location: 'Remote (US)',
    type: 'full-time',
    description: 'Build the core deployment engine — the orchestration layer that moves traffic, checks SLOs, and executes rollbacks across Kubernetes clusters and cloud providers.',
    responsibilities: [
      'Design and implement the deployment orchestration engine in Go',
      'Build reliable, observable distributed systems that handle hundreds of concurrent deployments',
      'Own the Kubernetes operator and cloud provider integrations (AWS, GCP, Azure)',
      'Work directly with customers on complex integration challenges',
    ],
    requirements: [
      '4+ years of Go or Rust in production',
      'Deep Kubernetes experience — operators, CRDs, admission webhooks',
      'Experience building distributed systems with strong reliability requirements',
      'Bonus: experience with progressive delivery tools (Argo Rollouts, Flagger, Spinnaker)',
    ],
  },
  {
    id: 'senior-frontend-engineer',
    title: 'Senior Frontend Engineer',
    department: 'engineering',
    location: 'Remote (US)',
    type: 'full-time',
    description: 'Build the deployment dashboard, real-time status UI, and the graph-based service map that gives engineers instant situational awareness during a release.',
    responsibilities: [
      'Build fast, beautiful React/TypeScript interfaces for real-time deployment data',
      'Design and implement data visualisations (D3, canvas, WebGL) for the service graph and SLO dashboards',
      'Own performance — sub-100ms interactions on complex live data',
      'Collaborate closely with design and product on the developer experience',
    ],
    requirements: [
      '4+ years of React + TypeScript in production',
      'Experience with real-time data (WebSockets, SSE, polling strategies)',
      'Strong eye for design systems and accessible UI',
      'Bonus: experience with D3 or graph visualisation libraries',
    ],
  },
  {
    id: 'staff-platform-engineer',
    title: 'Staff Platform Engineer',
    department: 'engineering',
    location: 'San Francisco, CA',
    type: 'full-time',
    description: 'Define the technical architecture as we scale from early adopters to enterprise. Own reliability, multi-tenancy, and the CI/CD infrastructure that ships DeployTitan itself.',
    responsibilities: [
      'Set the technical direction for infrastructure, observability, and reliability',
      'Build the multi-tenant control plane that serves teams of all sizes safely',
      'Own the internal CI/CD pipeline, staging environments, and chaos testing programme',
      'Mentor senior engineers and establish engineering standards',
    ],
    requirements: [
      '8+ years of software engineering; 3+ in platform or infrastructure roles',
      'Track record of designing and shipping systems at scale',
      'Experience with multi-tenant SaaS architecture',
      'Strong communication — you can write design docs and drive alignment across the team',
    ],
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    department: 'product',
    location: 'San Francisco, CA',
    type: 'full-time',
    description: "Own the product roadmap for the core deployment platform. You'll talk to engineers daily, translate pain into features, and keep the team shipping the right things.",
    responsibilities: [
      'Own discovery — customer interviews, usage data, and competitive analysis',
      'Write clear product specs that engineers love to build from',
      'Define and track product metrics — activation, retention, and expansion',
      'Work with GTM to turn new features into launches that land',
    ],
    requirements: [
      '3+ years of product management at a developer tools or infrastructure company',
      'Technical enough to understand Kubernetes, CI/CD pipelines, and SLOs',
      'Strong written communication — you write docs that people actually read',
      'Bonus: prior experience as an SRE, DevOps engineer, or platform engineer',
    ],
  },
  {
    id: 'solutions-engineer',
    title: 'Solutions Engineer',
    department: 'go-to-market',
    location: 'Remote (US)',
    type: 'full-time',
    description: "Help engineering teams evaluate and adopt DeployTitan. You're the technical bridge between our product and the teams that run critical production infrastructure.",
    responsibilities: [
      'Run technical discovery and proof-of-concept engagements with prospective customers',
      'Build and maintain demo environments, integration scripts, and runbooks',
      'Act as the voice of the customer in product discussions',
      'Build out the solutions engineering practice as our first SE hire',
    ],
    requirements: [
      '3+ years in solutions engineering, DevRel, or platform engineering',
      'Comfortable presenting to engineering leadership and senior IC audiences',
      'Hands-on with Kubernetes, cloud providers, and CI/CD tooling',
      'Strong collaborative instinct — you make customers and internal teams both feel supported',
    ],
  },
]
