# Content Opportunity MVP Plan

## Summary

This MVP is a good fit for the current codebase because the repo already has:

- a Sanity-first content workflow
- existing Sanity write automation via `writeClient`
- TypeScript scripts run with `tsx`
- an established article model built around the `article` document type

The right MVP shape is:

1. Fetch Google Search Console data for two comparable 28-day windows.
2. Score candidate opportunities deterministically in TypeScript.
3. Send only the strongest candidates plus existing article context to the LLM.
4. Save 1-3 reviewed opportunities into Sanity as `contentOpportunity` documents.
5. Run the pipeline weekly in GitHub Actions on Saturday.

This should stay as a scheduled job for now, not an MCP server and not an Ahrefs integration.
Because you do not want a separate LLM API key, the best-fit version is semi-automated:

1. GitHub Actions fetches and scores GSC candidates.
2. You paste the generated payload into ChatGPT or Codex with the reusable prompt.
3. You save the JSON response locally.
4. A small import script upserts the reviewed opportunities into Sanity.

## Key Decisions For This Repo

- Use the existing app repo rather than creating a separate service.
- Keep business logic in plain TypeScript modules so it can later be reused by an MCP server if needed.
- Store results in a new Sanity document type: `contentOpportunity`.
- Query existing content from `article`, not legacy `post`.
- Reuse the existing Sanity write pattern and prefer `SANITY_API_WRITE_TOKEN` unless we intentionally rename env vars across the repo.
- Run as a script such as `pnpm content:research`.
- Add a companion import command: `pnpm content:import-opportunities`.
- Schedule with GitHub Actions on Saturday and keep `workflow_dispatch` enabled for manual testing.

## Architecture

```text
Google Search Console API
        ↓
fetch-gsc.ts
        ↓
score-opportunities.ts
        ↓
get-existing-articles.ts
        ↓
analyse-with-llm.ts
        ↓
save-opportunities.ts
        ↓
Sanity contentOpportunity documents
```

Suggested location:

```text
src/lib/content-opportunities/
  analyse-with-llm.ts
  fetch-gsc.ts
  get-existing-articles.ts
  index.ts
  save-opportunities.ts
  score-opportunities.ts
  types.ts

scripts/
  import-content-opportunities.ts
  run-content-opportunity-research.ts
```

This fits the current repo structure better than introducing a new `apps/content-research` package right away.

## Repo-Specific Analysis

### What already exists

- [src/sanity/schemas/index.ts](/Users/justinekizhak/projects/deploytitan-landing-page/src/sanity/schemas/index.ts) already registers all Sanity document and object schemas in one place.
- [src/sanity/lib/client.ts](/Users/justinekizhak/projects/deploytitan-landing-page/src/sanity/lib/client.ts) already exposes a `writeClient` for server-side mutations.
- [src/lib/content-automation.ts](/Users/justinekizhak/projects/deploytitan-landing-page/src/lib/content-automation.ts) already shows the expected pattern for Sanity writes and optional webhook follow-up.
- [src/sanity/schemas/article.ts](/Users/justinekizhak/projects/deploytitan-landing-page/src/sanity/schemas/article.ts) confirms `article` is the canonical content type.
- [README.md](/Users/justinekizhak/projects/deploytitan-landing-page/README.md) documents the existing content operating system and env var conventions.

### Gaps to fill

- There is no `contentOpportunity` schema yet.
- There is no GSC integration layer yet.
- There is no LLM analysis job for content opportunities yet.
- There is no GitHub Actions workflow for scheduled content research yet.
- The repo does not currently expose a dedicated script entry for this job.

### Important adjustments from the raw MVP spec

- Replace any `post` queries with `article`.
- Replace `summary` usage with `excerpt` or a small content summary field derived from article data.
- Prefer the repo’s existing `SANITY_API_WRITE_TOKEN` over introducing a second write token name unless there is a strong reason to isolate this job with a new variable.
- Keep the job write-scoped to `contentOpportunity` documents by policy, even if the token technically has broader write access.

## Implementation Plan

### Phase 1: Data model

Create a new Sanity schema for `contentOpportunity` and register it in the schema index.

Recommended fields:

- `title`
- `status`
- `opportunityType`
- `primaryQuery`
- `supportingQueries`
- `score`
- `metrics`
- `reasoning`
- `uniqueAngle`
- `outline`
- `productPillar`
- `source`
- `generatedAt`
- `sourcePage`
- `matchedArticle`

Recommended extra fields beyond the original spec:

- `sourcePage`: useful for refresh and CTR opportunities tied to an existing URL
- `matchedArticle`: optional reference to an `article` when the opportunity is clearly a refresh rather than a new article

### Phase 2: GSC ingestion

Add a small server-side module to authenticate with Search Console and fetch two windows:

- current window: most recent complete 28 days, excluding the newest 3 days
- previous window: the 28 days immediately before that

Fetch by:

- `query`
- `page`

This preserves enough context to distinguish new-article ideas from refresh opportunities.

### Phase 3: Deterministic scoring

Implement code-based scoring before invoking the LLM.

Initial opportunity buckets:

- striking-distance queries
- high-impression low-CTR queries
- growing queries

Also add repo-specific guardrails:

- branded query filter for `deploytitan`
- low-volume threshold tuned for a young domain
- de-duplication of near-identical query/page combinations
- suppression of obviously irrelevant queries before LLM analysis

### Phase 4: Existing-content lookup

Query Sanity for current `article` records with:

- `_id`
- `title`
- `slug`
- `excerpt`
- `primaryKeyword`
- `relatedQuestions`
- `topicCluster`

This gives the LLM enough context to decide whether an idea is:

- net new
- better as a refresh
- already sufficiently covered

### Phase 5: LLM analysis

Send only the top 15-20 candidates plus article context.

Require structured output with a schema that returns at most:

- 1 new article
- 1 refresh
- 1 CTR or internal-link recommendation

LLM responsibilities:

- determine DeployTitan relevance
- group related queries
- identify whether content already exists
- propose a differentiated angle
- create a pragmatic outline

Code responsibilities:

- data fetching
- numerical scoring
- filtering
- idempotent writes

For this MVP, keep the LLM step manual:

- generate a prompt-ready payload from the weekly job
- paste it into ChatGPT or Codex using the reusable prompt
- save the returned JSON locally
- import it with the Sanity helper script

### Phase 6: Sanity persistence

Use deterministic IDs based on normalized primary query, or query plus opportunity type if collisions become likely.

Prefer `createOrReplace` so weekly reruns update the same opportunity document instead of creating duplicates.

Recommended behavior:

- upsert current opportunities
- update `generatedAt` on every run
- preserve manually changed workflow status if the document already exists and has moved past `discovered`

That last point is worth implementing deliberately so the weekly job does not overwrite editorial progress.

### Phase 7: Runtime and scheduling

Add:

- a script entry in `package.json`
- a GitHub Actions workflow with `workflow_dispatch`
- secret-based env configuration

Run weekly on Saturday.

### Phase 8: Observability and failure handling

Add logs for:

- fetched row counts
- candidate counts after scoring
- number of opportunities returned by the LLM
- number of Sanity upserts

Fail the workflow when:

- required env vars are missing
- GSC auth fails
- Sanity writes fail
- LLM output does not validate

Do not fail the whole job just because there are zero good opportunities that week.

## Recommended TODO List

### Foundation

- [ ] Decide whether to reuse `SANITY_API_WRITE_TOKEN` or add a dedicated `SANITY_CONTENT_RESEARCH_TOKEN` alias.
- [ ] Decide whether GSC auth will use OAuth refresh token or service account for the MVP.
- [ ] Confirm the exact Search Console property identifier for `GSC_SITE_URL`.

### Sanity schema

- [ ] Create [src/sanity/schemas/contentOpportunity.ts](/Users/justinekizhak/projects/deploytitan-landing-page/src/sanity/schemas/contentOpportunity.ts).
- [ ] Register `contentOpportunityType` in [src/sanity/schemas/index.ts](/Users/justinekizhak/projects/deploytitan-landing-page/src/sanity/schemas/index.ts).
- [ ] Add preview configuration so editors can quickly scan status, score, and primary query in Studio.
- [ ] Consider adding `matchedArticle` reference and `sourcePage` fields from day one.

### Research modules

- [ ] Create `src/lib/content-opportunities/types.ts`.
- [ ] Create `src/lib/content-opportunities/fetch-gsc.ts`.
- [ ] Create `src/lib/content-opportunities/score-opportunities.ts`.
- [ ] Create `src/lib/content-opportunities/get-existing-articles.ts`.
- [ ] Create `src/lib/content-opportunities/analyse-with-llm.ts`.
- [ ] Create `src/lib/content-opportunities/save-opportunities.ts`.
- [ ] Create `src/lib/content-opportunities/index.ts` to orchestrate the flow.

### Script wiring

- [ ] Add `scripts/run-content-opportunity-research.ts`.
- [ ] Add a `package.json` script such as `content:research`.
- [ ] Keep `pnpm content:import-opportunities <path-to-json>` available for manual review imports.
- [ ] Add lightweight env validation before the job runs.

### Dependencies

- [ ] Add `googleapis`.
- [ ] Add `zod`.
- [ ] Add `date-fns`, unless native date utilities are preferred.
- [ ] Skip adding an LLM SDK for the semi-automated MVP.

### Content lookup and prompting

- [ ] Query `article` documents instead of `post`.
- [ ] Use `excerpt` instead of `summary`, or derive a short summary payload from article fields.
- [ ] Build a prompt focused on DeployTitan’s real differentiation: deployment impact analysis, change intelligence, OpenTelemetry, release safety, and post-deployment verification.
- [ ] Store the reusable prompt in-repo for easy copy-paste.
- [ ] Cap LLM input to the top 15-20 scored candidates.
- [ ] Validate the pasted LLM response before saving anything.

### Persistence rules

- [ ] Use deterministic document IDs.
- [ ] Upsert instead of always creating new records.
- [ ] Avoid overwriting non-`discovered` statuses that editors may have changed manually.
- [ ] Store source metrics from both current and previous periods.

### GitHub Actions

- [ ] Create `.github/workflows/content-opportunity-research.yml`.
- [ ] Add `workflow_dispatch`.
- [ ] Add Saturday schedule.
- [ ] Add required GitHub secrets.
- [ ] Use `pnpm` in CI to match the repo’s package manager.

### Secrets and environment

- [ ] Add `GOOGLE_CLIENT_ID`.
- [ ] Add `GOOGLE_CLIENT_SECRET`.
- [ ] Add `GOOGLE_REFRESH_TOKEN` if using OAuth.
- [ ] Add `GSC_SITE_URL`.
- [ ] Add `SANITY_PROJECT_ID` or map from existing Sanity env strategy.
- [ ] Add `SANITY_DATASET`.
- [ ] Add `SANITY_API_WRITE_TOKEN` or a dedicated research token.
- [ ] Skip `OPENAI_API_KEY` for the semi-automated MVP.

### Validation and rollout

- [ ] Run the job locally against real or sample data.
- [ ] Confirm documents appear correctly in Sanity Studio.
- [ ] Manually inspect whether the top opportunities are actually useful.
- [ ] Tune score thresholds after the first 2-4 weekly runs.
- [ ] Add a short operator guide to `README.md` once the job exists.

## Recommended Handling For The Prompt Response

For this MVP, do not build a separate logged-in UI.

Best option:

- keep discovery and editorial review centered in Sanity Studio
- use ChatGPT or Codex manually for the analysis step
- import the reviewed JSON into Sanity with the helper script

Why this is the best tradeoff:

- no new auth system
- no new frontend to maintain
- no extra LLM billing integration
- faster validation of whether the workflow is actually useful

Suggested operator flow:

1. Saturday job generates candidate payload.
2. You open [prompts/content-opportunity-analysis.md](/Users/justinekizhak/projects/deploytitan-landing-page/prompts/content-opportunity-analysis.md).
3. Paste the prompt plus the candidate payload into ChatGPT or Codex.
4. Save the JSON response to a file such as `tmp/content-opportunities.json`.
5. Run `pnpm content:import-opportunities ./tmp/content-opportunities.json`.
6. Review the imported `contentOpportunity` documents in Sanity Studio.

Later, if this proves valuable, the next incremental step should be a lightweight Sanity Studio action or custom tool panel, not a standalone logged-in app.

## Suggested Delivery Order

1. Add the Sanity schema.
2. Build and test GSC fetching.
3. Build deterministic scoring and inspect raw candidates locally.
4. Add existing-article lookup.
5. Add LLM analysis with strict schema validation.
6. Add Sanity persistence.
7. Add the runnable script.
8. Add GitHub Actions and secrets.
9. Run manually for the first live validation.
10. Tune thresholds after observing a few runs.

## Risks To Watch

- Search Console property mismatch can block the entire job.
- Query volumes may be sparse, so thresholds need to stay intentionally low.
- The LLM may over-recommend generic DevOps topics unless the prompt is tightly constrained.
- Weekly reruns can trample editorial workflow if upserts overwrite status blindly.
- GitHub Actions examples should use `pnpm`, not `npm`, because this repo is already on `pnpm`.

## Nice-To-Haves After MVP

- Slack notification summarizing newly discovered opportunities
- automatic linking from `contentOpportunity` into `contentBrief`
- support for decay detection and internal-link recommendations
- manual Ahrefs enrichment workflow
- future MCP wrapper around the same TypeScript services

## Recommendation

This MVP is worth building now, but keep it intentionally small:

- no MCP server yet
- no Ahrefs API integration yet
- no automatic article creation
- no automated publishing actions

The success criterion is simple: every Saturday, the team gets a small set of genuinely useful `contentOpportunity` documents in Sanity that are better than manual GSC review.
