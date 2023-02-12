import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: true,
    proxy: {
      "/api":{
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [react()],
})
