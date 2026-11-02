import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
// Since Sanity v4/v5 the Structure tool is no longer registered implicitly —
// without it the Studio has no document list (only Vision), so it MUST be
// added explicitly. Listed first so it stays the default tool.
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

// Project: https://www.sanity.io/manage/projects/jrft938h
// Overridable via studio/.env (copy studio/.env.example).
const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? 'jrft938h';
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';

export default defineConfig({
  name: 'portfolio-case-studies',
  title: 'Portfolio Case Studies',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
