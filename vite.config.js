import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // The published site lives at https://erikamorrea57-alt.github.io/erikamorreaphotography/
  // (local development keeps using the plain "/")
  base: command === 'build' ? '/erikamorreaphotography/' : '/',
}))
