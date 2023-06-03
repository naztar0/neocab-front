import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { join } from 'path'

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
  },
  base: '/',
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  }
})
