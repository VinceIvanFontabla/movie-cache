import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    base: '/movie-cache/',
  build: {
    outDir: 'movie-cache'
  },
  plugins: [react()],
  css: {
    devSourcemap: true,
  }
})
