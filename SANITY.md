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

2. **Configure the app** — nothing to do for this project: the app defaults
   to project `jrft938h`, dataset `production` (project ids are public,
   client-side config). To point at a different project, copy `.env.example`
   to `.env` and set:
   ```env
   VITE_SANITY_PROJECT_ID=yourProjectId
   VITE_SANITY_DATASET=production
   ```
   (overrides the defaults — restart `npm run dev`). If the fetch fails or a
   slug doesn't exist in Sanity, the bundled `src/caseStudies.ts` content is
   used — nothing breaks.

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

## CORS origins (required for browser reads)

Sanity rejects any browser request whose `Origin` isn't on the project's
allow-list — `403 {"message":"CORS Origin not allowed"}`. The app then
silently falls back to bundled content, so a CORS problem looks like "my
edits don't show up". Current state for `jrft938h`:

| Origin | Status | Used by |
|---|---|---|
| `https://oluwatosin.site` | ✅ allowed | production site on Vercel |
| `https://www.oluwatosin.site` | ✅ allowed | `www` apex redirect on Vercel |
| `https://oluwatosin.sanity.studio` | ✅ allowed | hosted Studio — Sanity auto-allows its own `*.sanity.studio` domains (no dashboard action needed) |
| `http://localhost:3333` | ✅ allowed | local Studio |
| `http://localhost:517x` | not needed | dev goes through Vite's `/__sanity` proxy — same-origin requests carry no `Origin` header |

Manage the list at [sanity.io/manage](https://www.sanity.io/manage) → project
**jrft938h** → **API** → **CORS origins**. Production builds query the CDN
directly (`src/lib/sanity.ts` only uses the proxy on localhost).

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

## Hosted Studio (sanity.io — no localhost needed)

The Studio is deployed to Sanity hosting at **<https://oluwatosin.sanity.studio>**,
created by `studioHost: 'oluwatosin'` in `studio/sanity.cli.ts` (committed).

```powershell
cd studio
npx sanity deploy -y        # build (~90 s) + upload, prints the final URL
npx sanity undeploy         # release the hostname
```

Auth notes — these matter, the commands fail without them:

- **Deploys need a full CLI login**, not an API token. The first `deploy`
  creates the hostname and requires the `sanity.project.deployStudio` grant,
  which scoped API tokens don't carry (`Forbidden - User is missing required
  grant sanity.project.deployStudio`). Run `npx sanity login --no-open
  --provider google` once; credentials land in `%USERPROFILE%\.config\sanity\config.json`.
- **Never set `SANITY_AUTH_TOKEN` when deploying** — the env token takes
  precedence over the stored login and the deploy fails again. (It's fine for
  `sanity dataset import` / schema commands.)
- Deploy uploads to `/user-applications/<appId>/deployments`; Sanity returns
  the hostname as the location. App id `i3yt9hamyusw9pihjp59seah`,
  deployment `a5decl5rdkqela5mtytky8l9`, org `o8phl1an6`.
- Sanity serves the built files with no auth of its own, but *editing* always
  requires a signed-in Sanity account — that part is Sanity's, not ours.

## Day-to-day editing

**Hosted (recommended):** open <https://oluwatosin.sanity.studio>, sign in with
the Google account that owns project `jrft938h`, edit, **Publish**.

**Local:** `cd studio && npm run dev` → <http://localhost:3333>.

Either way: **Publish** (drafts are never fetched by the site). The CDN cache
refreshes within ~60 s; for an instant check, bump the cache by temporarily
setting `useCdn: false` in `src/lib/sanity.ts`.

## Later upgrades (not done yet)

- **Sanity image assets** + `@sanity/image-url` (responsive images).
- **Hosted Studio** — done: <https://oluwatosin.sanity.studio> (see above).
- **Build-time fetch** → static JSON for SEO/faster first paint (currently
  client-side fetch, which suits the modal-only usage).
- **Delete the duplicated case-study data** in `src/App.tsx` and
  `src/Portfolio.tsx` (neither is rendered — `main.tsx` mounts `PortfolioV2`)
  once Sanity is the source of truth.
