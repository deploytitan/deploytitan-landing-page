<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DeployTitan landing page. PostHog is initialized via `instrumentation-client.ts` (the recommended Next.js 15.3+ approach), with a reverse proxy configured in `next.config.ts` to route events through `/ingest` — reducing the chance of ad-blocker interference. Environment variables are stored in `.env.local`. Ten events are tracked across seven components, covering the full visitor journey from landing to conversion.

| Event | Description | File |
|---|---|---|
| `hero_cta_clicked` | User clicks 'Start free trial' or 'Install the CLI' in the hero | `src/components/Hero.tsx` |
| `waitlist_signup_submitted` | User submits the early access / waitlist form (includes `posthog.identify`) | `src/components/CTA.tsx` |
| `demo_cta_clicked` | User clicks 'See live demo' in the CTA section | `src/components/CTA.tsx` |
| `contact_email_clicked` | User clicks a contact card (Sales, Support, Press, or General) | `src/page-components/Contact.tsx` |
| `job_application_clicked` | User clicks Apply on a job listing on the Careers page | `src/page-components/Careers.tsx` |
| `integration_trial_cta_clicked` | User clicks 'Start free trial' on an integration detail page | `src/page-components/integrations/IntegrationDetail.tsx` |
| `integration_docs_clicked` | User clicks 'View docs' on an integration detail page | `src/page-components/integrations/IntegrationDetail.tsx` |
| `nav_resource_clicked` | User clicks a link in the Resources nav dropdown | `src/components/nav/ResourcesDropdown.tsx` |
| `announcement_bar_dismissed` | User dismisses the announcement bar | `src/components/AnnouncementBar.tsx` |
| `announcement_bar_link_clicked` | User clicks the link inside the announcement bar | `src/components/AnnouncementBar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1593214)
- [Waitlist Signups Over Time](/insights/2OMu8c6a)
- [Hero CTA → Waitlist Signup Funnel](/insights/Q9GhEbJp)
- [Hero CTA Clicks by Button](/insights/E9TjoDcO)
- [Contact Email Clicks by Type](/insights/WwmuN3o5)
- [Job Application Clicks by Department](/insights/fmozWeDJ)

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
