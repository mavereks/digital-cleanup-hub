import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to repo name for GitHub Pages — update if the repo name differs
export default defineConfig({
  plugins: [react()],
  base: './',
})
