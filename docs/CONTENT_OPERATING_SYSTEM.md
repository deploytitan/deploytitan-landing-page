# DeployTitan Content Operating System

This document describes the end-to-end content pipeline that powers DeployTitan's blog, research distribution, and feedback loop. It is the canonical operator-facing explanation of how content moves from market signal to published hub article to spoke distribution to KPI review.

## System shape

The system is built around one connected record graph:

`contentOpportunity -> researchEvidence -> article -> distributionAsset -> distributionAssetPerformanceSnapshot -> articlePerformanceSnapshot -> contentInsight`

Each model has a specific job:

- `contentOpportunity`: stores candidate topics discovered from Search Console, competitor signals, and market signals.
- `researchEvidence`: captures only proof that materially helps the article. Most public facts can stay as article citations.
- `article`: the core long-form content object. It now holds the draft plan, answer, SEO intent, proof, body, CTA, and hub settings.
- `distributionAsset`: the spoke layer for distribution, CTA routing, and campaign scheduling.
- `distributionAssetPerformanceSnapshot`: stores per-spoke reach, click, and conversion performance.
- `articlePerformanceSnapshot`: stores 7-day, 30-day, or custom KPI snapshots.
- `contentInsight`: stores recommendations based on KPI performance and creates the loop back into future refreshes or new opportunities.

`marketQuestion` and `contentBrief` may still exist as legacy Sanity types, but they are no longer part of the fast publishing path.

## Operating model

DeployTitan now uses a hub-and-spoke distribution model.

- The `article` is the hub.
- Each published hub can become an active campaign with:
  - `hubStatus`
  - `hubCampaignName`
  - `hubPrimaryCta`
  - `hubRevenueGoal`
  - `spokeCadenceWeeks`
- Each `distributionAsset` is now a spoke with:
  - `spokeType`
  - `hubArticle`
  - `distributionGoal`
  - `campaignName`
  - `weekNumber`
  - `ctaLabel`
  - `ctaUrl`
  - `ctaPlacement`
  - `utmParameters`

The current spoke types are:

- `story`
- `observation`
- `thread`
- `contrarian`
- `pastVsPresent`
- `listicle`

## Workflow

### 1. Opportunity discovery

Operator runs:

```bash
pnpm content:research --output-dir ./tmp/content-opportunities
```

The research run combines Search Console, curated web sources, and public social/community signals. Reddit and X require credentials; Hacker News, Stack Overflow, and public GitHub issue search can run without credentials, though GitHub works better with `GITHUB_TOKEN`. Social inputs are exported to `social-evidence.json` for review before importing any opportunity.

The generated prompt is reviewed in ChatGPT or Codex, and the final JSON is imported:

```bash
pnpm content:import-opportunities ./tmp/content-opportunities.json
```

Result:

- new or refreshed `contentOpportunity` records
- opportunity score, reasoning, unique angle, query set, source context, and KPI target seed

### 1.5 ChatGPT round-trip in Studio

For single-record editing, use the Studio clipboard actions instead of hand-copying fields:

1. Open a `contentOpportunity` or `article`.
2. Run `Copy for ChatGPT`.
3. Paste the JSON into ChatGPT or Codex and ask for a completed JSON response.
4. Copy the JSON response.
5. Return to the same Sanity document and run `Import from ChatGPT`.
6. Confirm the field list before the patch is applied.

The importer accepts the labeled JSON produced by `Copy for ChatGPT`, and it also accepts a simple direct object with matching field names. It patches matching non-empty fields only, so unanswered fields can stay blank instead of being overwritten with placeholder text.

### 2. Article draft creation

In Sanity Studio, the operator opens an accepted `contentOpportunity` and runs `Create Article Draft`.

That action creates or refreshes:

- `researchEvidence`
- a seeded `article` record for new opportunities, or a linked existing article for refresh work

### 3. Article shaping

The editor strengthens the article record before drafting:

- clarify the direct answer
- tighten the DeployTitan-specific angle
- confirm target persona and primary keyword
- refine the outline
- attach citations or public evidence where claims need support
- set the CTA and KPI target

When ready, the article moves into `drafting` or `technicalReview`.

### 4. Evidence review

The proof layer is prepared for publication:

- use article citations for ordinary public sources
- use `researchEvidence` only for reusable research signals or generated evidence
- mark evidence Public only when it is safe to render on the article page
- add a concise methodology note

### 5. Article production

The writer turns the shaped article record into the final long-form hub article:

- write the article body
- add citations and FAQ
- complete SEO metadata
- set the last reviewed date when the article has been accuracy checked
- define hub settings:
  - `hubStatus`
  - `hubCampaignName`
  - `hubPrimaryCta`
  - `hubRevenueGoal`
  - `spokeCadenceWeeks`

When ready, the article moves through `publicationReady`, `scheduled`, and `published`.

### 6. Publication automation

When a published `article` hits `/api/revalidate`, the app:

- revalidates article, feed, and sitemap routes
- backfills `sevenDayReviewAt` and `thirtyDayReviewAt`
- promotes the article into an active hub if hub settings were not set explicitly
- generates six draft spoke assets across X and LinkedIn
- spreads them across the article's configured cadence window
- seeds each spoke with a CTA back to the hub article
- seeds each spoke with campaign UTM parameters

Current automation creates these spoke formats:

- LinkedIn story
- X observation
- X thread
- LinkedIn contrarian take
- X past-vs-present
- LinkedIn listicle

## Distribution rules

Each spoke should do one thing clearly:

- express one angle from the hub
- speak to one persona
- route readers back to the hub article first
- let the hub article carry the deeper product or discovery CTA

Ready or published distribution assets must include:

- `hubArticle`
- `article`
- `ctaLabel`
- `ctaUrl`
- `scheduledFor`
- `utmParameters.source`
- `utmParameters.medium`
- `utmParameters.campaign`

Published distribution assets must also include `externalUrl`.

## Measurement loop

Performance is reviewed at the article level today.

Operator runs:

```bash
pnpm content:sync-performance --window 7d
pnpm content:sync-performance --window 30d
```

This sync pulls:

- Search Console search metrics
- GA4 page metrics
- PostHog article engagement and CTA events

And it writes:

- `distributionAssetPerformanceSnapshot` through the authenticated distribution snapshot API when spoke-level data is available
- `articlePerformanceSnapshot`
- `contentInsight`

Spoke-level ingestion endpoint:

```bash
POST /api/content/distribution-performance-snapshots
```

Current KPI targets support:

- `searchImpressions`
- `searchClicks`
- `searchCtr`
- `newsletterSignups`
- `researchCtaClicks`

## Studio operating surfaces

Sanity Studio currently exposes the main operating areas:

- Opportunities
- Articles
- Research
- Distribution
- Performance
- Pipeline Guide

Useful newer views include:

- `Active Hubs`
- `Public Evidence`
- `Story Spokes`
- `Missing Spoke CTA`

To refresh the Pipeline Guide singleton in Sanity after changing the default stages in code, run:

```bash
pnpm content:sync-pipeline-guide
```

This requires `SANITY_PROJECT_ID` or `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_DATASET` or `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_API_WRITE_TOKEN`.

## Current limitations

The system is strong on article-level workflow and article-level KPI measurement. The next major improvement is distribution-level performance so each spoke can be measured independently from impressions through conversions.

Recommended next step:

- add distribution-asset performance snapshots and attribution joins so each spoke can be evaluated as a real revenue path rather than a scheduled draft record
