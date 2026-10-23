import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxy all /api/* and /telemetry requests to FastAPI on :8000
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/telemetry': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/isro': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/simulate': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

