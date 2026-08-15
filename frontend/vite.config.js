import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Backend chal raha ho to /api isi par jaayega.
      // Backend band ho to frontend apne aap static data par gir jaata hai.
      '/api': { target: 'http://127.0.0.1:8000', changeOrigin: true }
    }
  },
  build: { outDir: 'dist', assetsDir: 'assets' }
})
