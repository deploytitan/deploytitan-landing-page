import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { MidCTA } from '../components/MidCTA'
import { CodeBlock } from '../components/shared/CodeBlock'

const installSnippets = {
  macos: `# Homebrew (recommended)
brew install deploytitan/tap/dt

# One-liner
curl -fsSL https://get.deploytitan.com | sh`,
  linux: `# apt
echo "deb [trusted=yes] https://apt.deploytitan.com stable main" \\
  | sudo tee /etc/apt/sources.list.d/deploytitan.list
sudo apt update && sudo apt install dt

# One-liner
curl -fsSL https://get.deploytitan.com | sh`,
  windows: `# winget
winget install DeployTitan.dt

# Scoop
scoop bucket add deploytitan https://github.com/deploytitan/scoop
scoop install dt`,
  docker: `docker run --rm -it \\
  -v ~/.dt:/root/.dt \\
  deploytitan/dt:latest dt deploy`,
}

const commands = [
  {
    cmd: 'dt deploy',
    description: 'Trigger a deployment for the current service',
    example: 'dt deploy --env production --strategy canary',
  },
  {
    cmd: 'dt rollback',
    description: 'Instant rollback to the previous stable release',
    example: 'dt rollback --env production',
  },
  {
    cmd: 'dt status',
    description: 'Show live deployment health and SLO indicators',
    example: 'dt status --service api-gateway',
  },
  {
    cmd: 'dt logs',
    description: 'Stream deployment logs with structured filtering',
    example: 'dt logs --service api-gateway --since 10m',
  },
  {
    cmd: 'dt config',
    description: 'Manage environments, secrets, and feature flags',
    example: 'dt config set ROLLOUT_STEP=10 --env staging',
  },
  {
    cmd: 'dt auth',
    description: 'Authenticate with your DeployTitan workspace',
    example: 'dt auth login --org my-org',
  },
]

const quickstartCode = `# 1. Install
brew install deploytitan/tap/dt

# 2. Authenticate
dt auth login

# 3. Connect your cluster
dt cluster connect my-prod-cluster \\
  --context gke_my-project_us-central1_prod

# 4. Deploy
dt deploy --service api-gateway --env production`

export default function CLI() {
  useDocumentMeta('CLI Reference', 'Full reference for the dt command-line tool — deploy, rollback, and manage your services from the terminal.')

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <section className="border-b border-line blueprint-grid">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-ink-quaternary uppercase tracking-widest">CLI Reference</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display font-medium tracking-tight text-ink leading-[1.1]">
              The <code className="font-mono text-primary-dark">dt</code> command.
            </h1>
            <p className="mt-5 text-lg text-ink-secondary leading-relaxed max-w-lg">
              A single static binary that connects to your Kubernetes clusters, GitHub Actions pipelines, and cloud providers. Deploy, rollback, and inspect — all from your terminal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#install"
                className="inline-flex items-center gap-2 bg-ink text-surface px-5 py-3 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)]"
                style={{ borderRadius: '2px' }}
              >
                Install now
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <Link
                to="/api"
                className="inline-flex items-center gap-2 border border-line text-ink-secondary hover:text-ink hover:border-primary/30 px-5 py-3 text-sm font-medium transition-all"
                style={{ borderRadius: '2px' }}
              >
                API Reference
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quickstart */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14">
        <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">Quickstart</span>
        <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-tight">Up in 60 seconds</h2>
        <p className="mt-2 text-sm text-ink-secondary max-w-lg">
          Install the CLI, connect your cluster, and trigger your first deployment in under a minute.
        </p>
        <div className="mt-6 max-w-2xl">
          <CodeBlock code={quickstartCode} lang="bash" filename="terminal" />
        </div>
      </section>

      {/* Install */}
      <section id="install" className="border-t border-line bg-surface-alt">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14">
          <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">Install</span>
          <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-tight">Get the binary</h2>
          <p className="mt-2 text-sm text-ink-secondary">Available for macOS, Linux, Windows, and Docker.</p>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="font-mono text-xs text-ink-quaternary uppercase tracking-widest mb-3">macOS</p>
              <CodeBlock code={installSnippets.macos} lang="bash" filename="macOS" />
            </div>
            <div>
              <p className="font-mono text-xs text-ink-quaternary uppercase tracking-widest mb-3">Linux</p>
              <CodeBlock code={installSnippets.linux} lang="bash" filename="Linux" />
            </div>
            <div>
              <p className="font-mono text-xs text-ink-quaternary uppercase tracking-widest mb-3">Windows</p>
              <CodeBlock code={installSnippets.windows} lang="bash" filename="Windows" />
            </div>
            <div>
              <p className="font-mono text-xs text-ink-quaternary uppercase tracking-widest mb-3">Docker</p>
              <CodeBlock code={installSnippets.docker} lang="bash" filename="Docker" />
            </div>
          </div>
        </div>
      </section>

      {/* Commands */}
      <section className="border-t border-line">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14">
          <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">Commands</span>
          <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-tight">Core commands</h2>
          <div className="mt-8 flex flex-col divide-y divide-line">
            {commands.map((c) => (
              <div key={c.cmd} className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                <div>
                  <code className="font-mono text-sm font-semibold text-primary-dark bg-primary-muted px-2 py-1 rounded-sm">{c.cmd}</code>
                  <p className="mt-2 text-sm text-ink-secondary">{c.description}</p>
                </div>
                <div className="max-w-md">
                  <CodeBlock code={c.example} lang="bash" filename="example" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CI/CD Integration */}
      <section className="border-t border-line bg-surface-alt">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14">
          <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">CI/CD</span>
          <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-tight">Drop into your pipeline</h2>
          <p className="mt-2 text-sm text-ink-secondary max-w-lg">
            The <code className="font-mono text-xs text-primary bg-primary-muted px-1 py-0.5 rounded-sm">dt</code> CLI is designed to run inside GitHub Actions, GitLab CI, CircleCI, and any shell-based runner.
          </p>
          <div className="mt-6 max-w-2xl">
            <CodeBlock
              code={`# .github/workflows/deploy.yml
- name: Deploy to production
  env:
    DT_TOKEN: \${{ secrets.DT_TOKEN }}
  run: |
    dt deploy \\
      --service api-gateway \\
      --env production \\
      --strategy canary \\
      --wait`}
              lang="yaml"
              filename=".github/workflows/deploy.yml"
            />
          </div>
          <div className="mt-5">
            <Link to="/integrations" className="text-sm text-primary font-medium hover:text-primary-dark transition-colors">
              View all integrations →
            </Link>
          </div>
        </div>
      </section>

      <MidCTA
        heading="Ready to deploy from your terminal?"
        subheading="Install the CLI and ship your first canary in minutes."
        primaryLabel="Get started free"
        primaryHref="/early-access"
        secondaryLabel="Read the docs"
        secondaryHref="/docs"
        secondaryExternal={false}
      />
    </div>
  )
}
