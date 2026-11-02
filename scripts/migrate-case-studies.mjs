/**
 * Migrate the bundled case studies (src/caseStudies.ts) → Sanity NDJSON.
 *
 * Usage:
 *   npm run migrate:case-studies
 *   → writes case-studies.ndjson at the repo root
 *
 * Import into Sanity (from the studio folder):
 *   cd studio
 *   npx sanity dataset import ../case-studies.ndjson production
 *
 * The script:
 *   1. Type-strips src/caseStudies.ts with esbuild (no bundling needed —
 *      CaseStudyData is a type-only import and gets dropped).
 *   2. Executes it in Node and reads the `localCaseStudies` slug-keyed map.
 *   3. Rewrites build-tool asset URLs (…/img/x.webp) to site paths (/img/x.webp),
 *      which resolve from public/img/.
 *   4. Emits one NDJSON line per study with a stable _id, so re-imports
 *      overwrite instead of duplicating.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcFile = join(root, 'src', 'caseStudies.ts');
const outFile = join(root, 'case-studies.ndjson');

// ── 1. type-strip ────────────────────────────────────────────────────────────
let esbuild;
try {
  esbuild = await import('esbuild');
} catch {
  console.error('✖ esbuild not found — run `npm install` first (it ships with Vite).');
  process.exit(1);
}

const source = readFileSync(srcFile, 'utf8');
const { code } = await esbuild.transform(source, { loader: 'ts', format: 'esm' });
// Drop any residual import lines (only the type import, already unused) so the
// temp module runs standalone in Node.
const runnable = code
  .split('\n')
  .filter((line) => !/^import[\s{'*]/.test(line.trim()))
  .join('\n');

// ── 2. execute ───────────────────────────────────────────────────────────────
// Write next to src/caseStudies.ts so `new URL('../img/…', import.meta.url)`
// resolves exactly like it does under Vite.
const tmpFile = join(root, 'src', '__caseStudies.tmp.mjs');
let localCaseStudies;
try {
  writeFileSync(tmpFile, runnable, 'utf8');
  ({ localCaseStudies } = await import(pathToFileURL(tmpFile).href));
} finally {
  rmSync(tmpFile, { force: true });
}

if (!localCaseStudies || Object.keys(localCaseStudies).length === 0) {
  console.error('✖ No studies found — is `localCaseStudies` exported from src/caseStudies.ts?');
  process.exit(1);
}

// ── 3. normalise image URLs ──────────────────────────────────────────────────
// Node yields file:///…/img/case-0.webp; the site serves these from public/img.
const normalize = (value) => {
  if (typeof value === 'string') {
    const m = value.match(/[/\\]img[/\\]([^/\\?#]+)$/);
    return m ? `/img/${m[1]}` : value;
  }
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, normalize(v)]));
  }
  return value;
};

// ── 4. NDJSON ────────────────────────────────────────────────────────────────
const lines = [];
for (const [slug, study] of Object.entries(localCaseStudies)) {
  const doc = {
    _id: `caseStudy-${slug}`, // stable → re-import overwrites in place
    _type: 'caseStudy',
    title: study.title,
    slug: { _type: 'slug', current: slug },
    category: study.category,
    ...(study.subtitle ? { subtitle: study.subtitle } : {}),
    ...(study.coverMeta ? { coverMeta: study.coverMeta } : {}),
    sections: normalize(study.sections ?? []),
  };
  lines.push(JSON.stringify(doc));
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, lines.join('\n') + '\n', 'utf8');

console.log(`✔ ${lines.length} case studies → ${outFile}`);
console.log('\nNext:');
console.log('  cd studio');
console.log('  npx sanity dataset import ../case-studies.ndjson production');
console.log('  (add --project-id <id> if studio/.env is not set)');
