import { createClient, type SanityClient } from '@sanity/client';
import { useEffect, useState } from 'react';
import type { CaseStudyData, CaseStudySection } from '../components/CaseStudyModal';
import { localCaseStudies } from '../caseStudies';

/**
 * Sanity layer for case studies.
 *
 * The `caseStudy` schema in studio/schemas/caseStudy.ts mirrors the
 * `CaseStudyData` type 1:1, so GROQ results can be handed to the existing
 * <CaseStudyModal /> without any component changes.
 *
 * - Reads are client-side, CDN-cached, and public (no token needed).
 * - The project id defaults to jrft938h — project ids are public, client-side
 *   config, so production works without a dashboard env var. Set
 *   VITE_SANITY_PROJECT_ID / VITE_SANITY_DATASET to point somewhere else.
 * - If a slug has no (published) Sanity document, the bundled study is used —
 *   so editing Sanity can never punch a hole in the site.
 */

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? 'jrft938h';
const dataset = import.meta.env.VITE_SANITY_DATASET ?? 'production';
const apiVersion = '2026-01-01';

export const isSanityConfigured = Boolean(projectId);

export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({ projectId: projectId!, dataset, apiVersion, useCdn: true })
  : null;

const CASE_STUDIES_QUERY = `*[_type == "caseStudy" && defined(slug.current)]{
  "slug": slug.current,
  title,
  subtitle,
  category,
  coverMeta[]{ label, value },
  sections[]{
    eyebrow,
    title,
    paragraphs,
    stats[]{ num, desc },
    cards[]{ title, body },
    steps[]{ step, title, body },
    bullets,
    tech,
    results[]{ title, body },
    table{ headers, rows[]{ col1, col2 } },
    quote{ text, cite },
    images
  }
}`;

/** Shape Sanity actually returns (before normalisation to CaseStudyData). */
type RawSection = Omit<Partial<CaseStudySection>, 'table'> & {
  table?: { headers?: string[]; rows?: Array<{ col1?: string; col2?: string }> };
};
type RawDoc = {
  slug?: string;
  title?: string;
  subtitle?: string;
  category?: string;
  coverMeta?: Array<{ label?: string; value?: string }>;
  sections?: RawSection[];
};

/** Recursively drop null / undefined / empty-array values. */
function prune<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .map((v) => prune(v))
      .filter((v) => v !== null && v !== undefined) as unknown as T;
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === null || v === undefined) continue;
      const p = prune(v);
      if (p === null || p === undefined) continue;
      if (Array.isArray(p) && p.length === 0) continue;
      out[k] = p;
    }
    return out as T;
  }
  return value;
}

function normalizeSection(raw: RawSection): CaseStudySection {
  const sec = prune<CaseStudySection>(raw as CaseStudySection);
  // GROQ returns headers as string[]; the modal expects the [string, string] tuple.
  if (sec.table?.headers) {
    const [h1 = '', h2 = ''] = sec.table.headers;
    sec.table.headers = [h1, h2];
  }
  return sec;
}

function toCaseStudy(doc: RawDoc): CaseStudyData | null {
  if (!doc.title || !doc.category) return null; // required by the modal
  const study: CaseStudyData = {
    title: doc.title,
    category: doc.category,
    sections: (doc.sections ?? []).map(normalizeSection).filter((s) => Object.keys(s).length > 0),
  };
  if (doc.subtitle) study.subtitle = doc.subtitle;
  if (doc.coverMeta?.length) {
    study.coverMeta = doc.coverMeta
      .filter((m) => m?.label && m?.value)
      .map((m) => ({ label: m.label!, value: m.value! }));
  }
  return study;
}

/**
 * Run the GROQ query.
 *
 * When the page is served from localhost (dev server and `vite preview`) the
 * browser must not call Sanity directly: localhost isn't on this project's
 * CORS allow-list (403 "CORS Origin not allowed"). A same-origin GET carries
 * no `Origin` header, so local traffic goes through Vite's proxy instead (see
 * vite.config.ts) and reaches Sanity looking exactly like a server-side call.
 * The deployed site (https://oluwatosin.site) is allow-listed and queries the
 * CDN directly.
 */
const isLocalhost =
  typeof location !== 'undefined' &&
  (location.hostname === 'localhost' || location.hostname === '127.0.0.1');
const useSanityProxy = import.meta.env.DEV || isLocalhost;

async function groqQuery<T>(query: string): Promise<T> {
  if (useSanityProxy) {
    const url = `/__sanity/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
    const res = await fetch(url, { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(`sanity proxy responded ${res.status}`);
    const json = (await res.json()) as { result?: T | null };
    return (json.result ?? []) as T;
  }
  if (!sanityClient) return [] as unknown as T;
  return sanityClient.fetch<T>(query);
}

async function queryCaseStudies(): Promise<RawDoc[]> {
  return groqQuery<RawDoc[]>(CASE_STUDIES_QUERY);
}

/** Fetch every case study, keyed by slug. Never throws — returns {} on any failure. */
export async function fetchCaseStudies(): Promise<Record<string, CaseStudyData>> {
  if (!sanityClient) return {};
  try {
    const docs = await queryCaseStudies();
    const map: Record<string, CaseStudyData> = {};
    for (const doc of docs) {
      if (!doc?.slug) continue;
      const study = toCaseStudy(doc);
      if (study) map[doc.slug] = study;
    }
    return map;
  } catch (err) {
    console.warn('[sanity] case study fetch failed — using bundled content', err);
    return {};
  }
}

/**
 * Hook: case studies from Sanity keyed by slug. Empty object until the fetch
 * resolves (and permanently if Sanity is unconfigured or unreachable).
 */
export function useCaseStudyOverrides(): Record<string, CaseStudyData> {
  const [overrides, setOverrides] = useState<Record<string, CaseStudyData>>({});
  useEffect(() => {
    let alive = true;
    fetchCaseStudies().then((map) => {
      if (alive && Object.keys(map).length > 0) setOverrides(map);
    });
    return () => {
      alive = false;
    };
  }, []);
  return overrides;
}

/** Merged view: Sanity content wins per slug, bundled data fills the gaps. */
export function getCaseStudy(slug: string, overrides: Record<string, CaseStudyData>): CaseStudyData | undefined {
  return overrides[slug] ?? localCaseStudies[slug];
}

// ── Personal projects ───────────────────────────────────────────────────────
// Docs created in the Studio (`personalProject` schema, studio/schemas/
// personalProject.ts) and published. Image URLs are built in GROQ against the
// Sanity CDN: a full card-sized version plus a 24px thumbnail that the site
// upscales with image-rendering:pixelated as the loading state.

const PERSONAL_PROJECTS_QUERY = `*[_type == "personalProject" && defined(slug.current) && featured != false] | order(order asc, _createdAt desc) {
  "slug": slug.current,
  title,
  type,
  tags,
  year,
  summary,
  liveUrl,
  repoUrl,
  "image": image.asset->url + "?w=1200&h=750&fit=crop&crop=entropy&auto=format&q=80",
  // NOTE: Sanity's CDN only accepts whole-number blur values (blur=1.5 → 400),
  // and the pixel effect comes from the upscale anyway — so no blur here.
  "pixel": image.asset->url + "?w=30&h=19&fit=crop&crop=entropy"
}`;

export type PersonalProject = {
  slug: string;
  title: string;
  type?: string;
  tags?: string;
  year?: string;
  summary?: string;
  liveUrl?: string;
  repoUrl?: string;
  /** Card-sized CDN URL. */
  image?: string;
  /** Tiny CDN thumbnail — shown pixelated until `image` finishes loading. */
  pixel?: string;
};

/** Fetch published personal projects. Never throws — returns [] on failure. */
export async function fetchPersonalProjects(): Promise<PersonalProject[]> {
  try {
    const docs = await groqQuery<Array<Record<string, unknown>>>(PERSONAL_PROJECTS_QUERY);
    return docs
      .filter((d): d is Record<string, unknown> & { slug?: string; title?: string } => Boolean(d?.slug && d?.title))
      .map((d) => ({
        slug: d.slug!,
        title: d.title!,
        type: typeof d.type === 'string' ? d.type : undefined,
        tags: typeof d.tags === 'string' ? d.tags : undefined,
        year: typeof d.year === 'string' ? d.year : undefined,
        summary: typeof d.summary === 'string' ? d.summary : undefined,
        liveUrl: typeof d.liveUrl === 'string' ? d.liveUrl : undefined,
        repoUrl: typeof d.repoUrl === 'string' ? d.repoUrl : undefined,
        image: typeof d.image === 'string' ? d.image : undefined,
        pixel: typeof d.pixel === 'string' ? d.pixel : undefined,
      }));
  } catch (err) {
    console.warn('[sanity] personal project fetch failed', err);
    return [];
  }
}

export type PersonalProjectsState = {
  items: PersonalProject[];
  /** true until the fetch settles (drives the pixelated loading state). */
  loading: boolean;
};

/** Hook: published personal projects from Sanity + a loading flag. */
export function usePersonalProjects(): PersonalProjectsState {
  const [state, setState] = useState<PersonalProjectsState>({ items: [], loading: true });
  useEffect(() => {
    let alive = true;
    fetchPersonalProjects().then((items) => {
      if (alive) setState({ items, loading: false });
    });
    return () => {
      alive = false;
    };
  }, []);
  return state;
}
