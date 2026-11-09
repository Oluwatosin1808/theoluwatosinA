# Sanity — Case Studies

Case studies are served from [Sanity](https://www.sanity.io) when configured,
with the bundled `src/caseStudies.ts` content as an automatic fallback. The
modal (`src/components/CaseStudyModal.tsx`) is unchanged — the Sanity schema
mirrors its `CaseStudyData` type 1:1, so GROQ results plug straight in.

```
studio/                      Sanity Studio (own package.json — not part of the app build)
  sanity.config.ts           projectId/dataset from studio/.env
  schemas/caseStudy.ts       caseStudy document + flexible section object
  schemas/personalProject.ts personalProject document (personal-projects grid)
src/lib/sanity.ts            @sanity/client, GROQ query, useCaseStudyOverrides()
                             + usePersonalProjects() (personal grid, pixel URLs)
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

## Personal projects (`personalProject`)

The **Personal projects** section of the site (`#personal` in
`src/PortfolioV2.tsx`) renders published `personalProject` documents — create
them at <https://oluwatosin.sanity.studio> → **Personal Project** → **New** →
fill in → **Publish**. They appear on the site within ~60 s (CDN).

| Field | Notes |
|---|---|
| `title*`, `slug*` | required |
| `image*` | required, hotspot enabled — card cover |
| `type` | eyebrow on the card, e.g. `Experiment · JS` |
| `tags` | comma-separated pill on the card, e.g. `Canvas, API` |
| `year` | shown next to the title |
| `summary` | clamped to 2 lines on the card |
| `liveUrl`, `repoUrl` | card opens the first one that's set (↗) |
| `order` | lower first; empty → newest first (`order asc, _createdAt desc`) |
| `featured` | uncheck to keep a doc in the Studio but off the site |

Behavior worth knowing:

- **Pixelated loading state.** The GROQ projection builds two CDN URLs per
  doc: `image` (`?w=1200&h=750&fit=crop…`, the real card) and `pixel`
  (`?w=30&h=19&fit=crop&crop=entropy`, a 30 px thumbnail). `PixelImage`
  upscales the thumbnail with `image-rendering: pixelated` until the full
  image fires `load`, then cross-fades. While the fetch itself is in flight,
  three skeleton cards with an animated checker show.
- **Gotcha: Sanity's CDN rejects fractional `blur` values** — `blur=1.5`
  returns an error (whole numbers like `blur=1` are fine). The pixel look
  comes from the upscale anyway, so the projection uses no blur. If you add
  one, use an integer.
- **Image URL building is plain GROQ string concat**
  (`image.asset->url + "?w=…"`) — no `@sanity/image-url` dependency.
- **Empty state:** with no published docs the section shows the "Workshop"
  banner (`INDEX 00`) instead of an empty grid.

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
npx sanity deploy -y        # build + upload, prints the final URL
npx sanity undeploy         # release the hostname
```

What the URL does — worth knowing, it looks broken but isn't:

- Opening `https://oluwatosin.sanity.studio/` in a browser **302-redirects to
  `https://www.sanity.io/@o8phl1an6/studio/<appId>`** (your org's Dashboard,
  behind Sanity's login). That is the intended flow: bare navigation goes to
  the Dashboard, and the Dashboard embeds the studio back from
  `https://oluwatosin.sanity.studio/?_context=…`.
- Directly requesting `/` **with** `_context` returns the real studio HTML —
  so the deploy is fine; only the address-bar entry point redirects.
- Sanity's own `/static/*` files (manifest, favicon) always serve 200, which
  is the quick way to confirm a deploy landed.

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

### Dashboard compatibility (required)

`sanity deploy` pins the app id and lets Sanity keep the deployment on
`@latest` — without this the Dashboard reports **"Studio is not fully
compatible"**:

```typescript
// studio/sanity.cli.ts
deployment: {
  appId: 'i3yt9hamyusw9pihjp59seah',
  autoUpdates: true,
},
```

Two things the Dashboard checks, both currently satisfied:

| Requirement | Status |
|---|---|
| Studio `>= 5.1.0` (Dashboard shows the version + compatibility) | ✅ `sanity` **6.21.0** → *"Fully compatible"* |
| Structure tool registered | ✅ `structureTool()` in `sanity.config.ts` |

**The Structure tool is no longer implicit** since Sanity v4/v5 — if you omit
it the Studio boots with only Vision, the tools manifest lists no
`sanity/structure`, and there is *no document list to edit*. It must be
imported explicitly and listed **first** so it stays the default tool:

```typescript
import { structureTool } from 'sanity/structure';
// …
plugins: [structureTool(), visionTool()],
```

Upgrading to `>= 5.1.0` also forces **React 19** (`sanity`/`@sanity/vision`
peer `react@^19.2.2`). That only touches `studio/package.json` — the main app
keeps React 18.

## Day-to-day editing

**Hosted (recommended):** open <https://oluwatosin.sanity.studio>, sign in with
the Google account that owns project `jrft938h` (it lands in the Dashboard,
which embeds the Studio), edit, **Publish**. You should see the **Content**
tool listing all 6 case studies plus any **Personal Project** documents.

**Local:** `cd studio && npm run dev` → <http://localhost:3333>.

Either way: **Publish** (drafts are never fetched by the site). The CDN cache
refreshes within ~60 s; for an instant check, bump the cache by temporarily
setting `useCdn: false` in `src/lib/sanity.ts`.

## npm audit

- **App (repo root): 0 vulnerabilities.**
- **`studio/`: 20** (17 moderate, 3 high) — all `undici` inside
  `@module-federation/dts-plugin` ← `@module-federation/vite` ←
  `@sanity/cli-core`, i.e. Sanity's own CLI dev-tree. Not shipped in the
  studio bundle, and `npm audit fix` can't touch them; the only "fix" is
  `npm audit fix --force`, which downgrades to `sanity@6.1.0` (breaking).
  Re-check after each `sanity` upgrade — it was 28 before the 6.21.0 upgrade.

## Later upgrades (not done yet)

- **Sanity image assets** + `@sanity/image-url` (responsive images).
- **Hosted Studio** — done: <https://oluwatosin.sanity.studio> (see above).
- **Build-time fetch** → static JSON for SEO/faster first paint (currently
  client-side fetch, which suits the modal-only usage).
- **Delete the duplicated case-study data** in `src/App.tsx` and
  `src/Portfolio.tsx` (neither is rendered — `main.tsx` mounts `PortfolioV2`)
  once Sanity is the source of truth.
