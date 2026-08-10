import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Resolve the dist folder two levels up (platform-ui/dist/platform-ui)
const distRoot = path.resolve(__dirname, '../../dist/platform-ui')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Point the package name directly at the live dist folder.
      // No npm install needed after rebuilding the library.
      '@bhairab-patra/platform-ui': distRoot,
    },
  },
})
