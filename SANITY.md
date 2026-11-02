# Sanity — Case Studies

Case studies are served from [Sanity](https://www.sanity.io) when configured,
with the bundled `src/caseStudies.ts` content as an automatic fallback. The
modal (`src/components/CaseStudyModal.tsx`) is unchanged — the Sanity schema
mirrors its `CaseStudyData` type 1:1, so GROQ results plug straight in.

```
studio/                      Sanity Studio (own package.json — not part of the app build)
  sanity.config.ts           projectId/dataset from studio/.env
  schemas/caseStudy.ts       caseStudy document + flexible section object
src/lib/sanity.ts            @sanity/client, GROQ query, useCaseStudyOverrides()
src/caseStudies.ts           localCaseStudies (slug-keyed fallback content)
scripts/migrate-case-studies.mjs   caseStudies.ts → NDJSON
.env.example                 VITE_SANITY_PROJECT_ID / VITE_SANITY_DATASET
```

## One-time setup

1. **Create a project** at [sanity.io/manage](https://www.sanity.io/manage)
   (free tier is plenty). Note the **Project ID**; dataset `production` is fine.

2. **Configure the app** — copy `.env.example` to `.env` and fill in:
   ```env
   VITE_SANITY_PROJECT_ID=yourProjectId
   VITE_SANITY_DATASET=production
   ```
   Restart `npm run dev`. Without these vars the app runs fully on bundled
   content — nothing breaks.

3. **Install & run the Studio** (separate dependency tree):
   ```powershell
   cd studio
   copy .env.example .env   # then paste your Project ID into .env
   npm install
   npm run dev              # Studio on http://localhost:3333
   ```

4. **Migrate the existing 6 studies** (from the repo root):
   ```powershell
   npm run migrate:case-studies
   cd studio
   npx sanity dataset import ../case-studies.ndjson production
   ```
   Documents get stable IDs (`caseStudy-<slug>`), so re-running the import
   overwrites in place instead of duplicating.

## How the data flows

- On page load, `useCaseStudyOverrides()` fetches all `caseStudy` docs once
  (CDN, `useCdn: true` — public reads, no token needed).
- Opening a project calls `getCaseStudy(slug, overrides)`:
  **Sanity doc wins per slug → bundled study fills the gap → nothing found →
  the project's inline `caseStudy` is used.**
- Fetch errors log a warning and fall back silently.

## Content model

`caseStudy` document: `title*`, `slug*`, `subtitle`, `category*`, `coverMeta[]`
(`label`, `value`), `sections[]`.

Each section is one flexible object — fill in only the parts you need; the
renderer skips anything empty:

| Field | Renders as |
|---|---|
| `eyebrow`, `title` | small label + heading |
| `paragraphs[]` | body text |
| `stats[]` (`num`, `desc`) | stat tiles |
| `cards[]` (`title`, `body`) | card grid |
| `steps[]` (`step`, `title`, `body`) | numbered steps |
| `bullets[]`, `tech[]` | lists / pill row |
| `results[]` (`title`, `body`) | result tiles |
| `table` (`headers[2]`, `rows[]` `col1`/`col2`) | two-column table |
| `quote` (`text`, `cite`) | pull quote |
| `images[]` | image row (URLs, e.g. `/img/case-0.webp`) |

**Images** are plain URL strings served from `public/img/` for now. Uploading
to Sanity assets (with `@sanity/image-url` for responsive `srcset`) is a
natural later upgrade — it only touches `src/lib/sanity.ts`.

## Slugs

`artemis-ii-3d-scene` · `codeless-solutions` · `dreamai` · `the-glo-up-app` ·
`neso` · `aaron-israel` — defined once in `src/caseStudies.ts`
(`localCaseStudies`) and on each project entry (`slug` in
`src/PortfolioV2.tsx`). Keep them in sync with the Studio documents.

## Day-to-day editing

1. `cd studio && npm run dev`
2. Edit a case study → **Publish** (drafts are never fetched by the site).
3. CDN cache refreshes within ~60 s; for an instant check, bump the cache by
   temporarily setting `useCdn: false` in `src/lib/sanity.ts`.

## Later upgrades (not done yet)

- **Sanity image assets** + `@sanity/image-url` (responsive images).
- **Hosted Studio** (`npm run deploy` from `studio/`) so you can edit from
  sanity.io without running anything locally.
- **Build-time fetch** → static JSON for SEO/faster first paint (currently
  client-side fetch, which suits the modal-only usage).
- **Delete the duplicated case-study data** in `src/App.tsx` and
  `src/Portfolio.tsx` (neither is rendered — `main.tsx` mounts `PortfolioV2`)
  once Sanity is the source of truth.
