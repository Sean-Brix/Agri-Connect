import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    port: 5173,
    open: true,

    proxy: {
      '/api': {
        target: 'http://localhost/Agri-Connect/server/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') + '.php'
      },
      '/auth': {
        target: 'http://localhost/Agri-Connect/server/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') + '.php'
      }
    }

  }
  
})
