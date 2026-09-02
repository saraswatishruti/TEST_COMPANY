import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ESM vite config — ensure package.json contains "type": "module" so this file is treated as ESM
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
