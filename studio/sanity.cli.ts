import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? 'jrft938h';
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';

export default defineCliConfig({
  api: { projectId, dataset },
  // Hosted Studio on Sanity: deploys to https://oluwatosin.sanity.studio
  // (falls back to <projectId>.sanity.studio if the name is taken).
  studioHost: 'oluwatosin',
});
