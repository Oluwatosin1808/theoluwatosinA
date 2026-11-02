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
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: sanityProxy,
  },
  preview: {
    proxy: sanityProxy,
  },
})
