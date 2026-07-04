# DeployTitan Landing Page

## Content Operating System

The blog now runs on a Sanity-first content operating system centered on the `article` document type and its linked research/distribution/performance records:

- `marketQuestion`
- `researchEvidence`
- `contentBrief`
- `article`
- `distributionAsset`
- `articlePerformanceSnapshot`
- `contentInsight`

Reusable Sanity objects power SEO metadata, FAQ blocks, UTM parameters, analytics metric sets, customer-discovery CTAs, personas, topic clusters, citations, outlines, and hypothesis confidence.

### Key routes

- `/blog/[slug]`: SSR article page with canonical metadata, JSON-LD, FAQ rendering, citations, and related articles
- `/api/content/articles/[slug]`: machine-readable published article JSON
- `/api/content/performance-snapshots`: authenticated ingestion endpoint for aggregated article metrics
- `/feed.xml`: RSS feed
- `/sitemap.xml`: sitemap including Sanity articles
- `/api/revalidate`: Sanity webhook entrypoint for Next.js revalidation and publication automation

### Publication automation

When an `article` publish webhook hits `/api/revalidate`, the app:

- revalidates the article page and blog index
- refreshes feed and sitemap routes
- backfills seven-day and thirty-day review dates
- creates draft `distributionAsset` records for `xThread`, `linkedin`, `dev`, and `newsletter`
- optionally pings `CONTENT_OPS_WEBHOOK_URL`
- optionally posts to `CONTENT_OPS_SLACK_WEBHOOK_URL`

Required env vars for the full flow:

```bash
SANITY_REVALIDATE_SECRET=
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=
CONTENT_PERFORMANCE_API_KEY=
CONTENT_OPS_WEBHOOK_URL=
CONTENT_OPS_SLACK_WEBHOOK_URL=
```

### Legacy post migration

There is a one-off migration script for moving the legacy `post` document(s) into `article`:

```bash
pnpm migrate:posts-to-articles
```

The app still has temporary read compatibility for the old `post` type, but `article` is the canonical model going forward.

## HubSpot forms

The waitlist and article newsletter forms now submit to internal Next.js routes,
which forward the data to authenticated HubSpot forms server-side.

Required env vars:

```bash
HUBSPOT_ACCESS_TOKEN=
HUBSPOT_PORTAL_ID=
HUBSPOT_WAITLIST_FORM_GUID=
HUBSPOT_NEWSLETTER_FORM_GUID=
NEXT_PUBLIC_NEWSLETTER_PROVIDER=hubspot
```

Recommended HubSpot setup:

1. Create one HubSpot form for waitlist submissions and one for newsletter signups.
2. Make sure the form field internal names match the properties sent by the app.
3. Set the form GUIDs and portal/token env vars locally and in Vercel.
4. Submit `/waitlist` and an article newsletter signup once and confirm both appear in HubSpot.

Waitlist fields currently submitted:

- `firstname`
- `email`
- `company`
- `jobtitle`
- `team_size`
- `pain_level`
- `budget_range`
- `current_process`
- `notes`
- `source`
- `page_path`
- `referrer`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

Newsletter fields currently submitted:

- `email`
- `firstname`
- `article_slug`
- `article_title`
- `topic_cluster`
- `primary_keyword`
- `target_persona`
- `distribution_asset_id`
- `signup_placement`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

## Notes

- The server-side HubSpot route forwards browser context such as page URL and the
  `hubspotutk` cookie when available.
- If you rename HubSpot field internal names, update the server-side field mapping
  in `/api/waitlist` or `/api/newsletter`.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
