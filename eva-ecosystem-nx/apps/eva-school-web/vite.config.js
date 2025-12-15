import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@eva-ecosystem-nx/feature': path.resolve(__dirname, '../../libs/feature/src/index.ts'),
      '@eva-ecosystem-nx/data-access': path.resolve(__dirname, '../../libs/data-access/src/index.ts'),
    },
  },
})
