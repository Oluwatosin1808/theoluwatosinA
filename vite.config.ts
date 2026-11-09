import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Sanity proxy (development only).
 *
 * Project jrft938h has a CORS allow-list that rejects every origin that isn't
 * on it — the browser gets `403 {"message":"CORS Origin not allowed"}` and the
 * app silently falls back to bundled content. Rather than depending on the
 * list for localhost (Vite also shifts ports 5173 → 5174 → … when one is busy,
 * which would invalidate any single origin entry), dev requests are made
 * same-origin and forwarded here. A same-origin GET carries no `Origin`
 * header, so the allow-list never applies.
 *
 * Production still talks to Sanity directly and needs the deployed domain
 * added once in sanity.io/manage → project → API → CORS origins (SANITY.md).
 */
const sanityProxy = {
  '/__sanity': {
    target: 'https://jrft938h.api.sanity.io',
    changeOrigin: true, // Host: jrft938h.api.sanity.io, as the API expects
    rewrite: (path: string) => path.replace(/^\/__sanity/, ''),
  },
}

export default defineConfig({
  plugins: [
    react(),
    {
      // Bare `/play` would otherwise fall into the SPA fallback (which
      // serves the portfolio). Rewrite it to `/play/`, where Vite resolves
      // the directory's index.html. Plugin middleware runs before Vite's
      // internal html/spa fallbacks, so this always wins in dev.
      name: 'arcade-page-dev-rewrite',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === '/play') {
            req.url = '/play/';
          }
          next();
        });
      },
    },
  ],
  build: {
    // two pages: the portfolio (index.html) and the standalone arcade
    // (/play → dist/play/index.html, its own light bundle — no 3D model)
    rollupOptions: {
      input: {
        main: 'index.html',
        play: 'play/index.html',
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    proxy: sanityProxy,
    // The Sanity Studio runs inside this repo; its build output churns on
    // every `sanity dev`/`sanity build` and would otherwise full-reload the
    // app pages mid-work. Only those artifact dirs are ignored — source in
    // `studio/` (schemas etc.) still triggers HMR as usual.
    watch: {
      ignored: ['**/studio/dist/**', '**/studio/.sanity/**'],
    },
  },
  preview: {
    proxy: sanityProxy,
  },
})
