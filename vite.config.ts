import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so assets resolve regardless of the path GitHub Pages serves from.
// GitHub redirects to an internal CDN URL that serves the build from root, so an
// absolute base (e.g. '/digital-cleanup-hub/') 404s. Keep this as './'.
export default defineConfig({
  plugins: [react()],
  base: './',
})
