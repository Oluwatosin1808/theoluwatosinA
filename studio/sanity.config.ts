import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
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
  plugins: [visionTool()],
  schema: {
    types: schemaTypes,
  },
});
