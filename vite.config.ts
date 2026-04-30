import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { linkGraphPlugin } from './vite-plugin-link-graph'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), linkGraphPlugin()],
})
