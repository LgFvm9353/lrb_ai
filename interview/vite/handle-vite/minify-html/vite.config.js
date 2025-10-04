import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import htlMinifyPlugin from './plugins/vite-plugin-html-minify.js'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    htlMinifyPlugin()
  ],
})
