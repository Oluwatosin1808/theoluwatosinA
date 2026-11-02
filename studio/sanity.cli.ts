import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? 'jrft938h';
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';

export default defineCliConfig({
  api: { projectId, dataset },
  // Hosted Studio on Sanity: deploys to https://oluwatosin.sanity.studio
  // (falls back to <projectId>.sanity.studio if the name is taken).
  studioHost: 'oluwatosin',
  // Pins the hosted app so deploys never re-prompt for it, and lets Sanity
  // keep the deployment on @latest — required to stay "fully compatible"
  // with the Dashboard (needs studio >= 5.1.0).
  deployment: {
    appId: 'i3yt9hamyusw9pihjp59seah',
    autoUpdates: true,
  },
});
