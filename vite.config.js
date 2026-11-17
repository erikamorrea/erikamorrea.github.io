import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// The site is published at the root of https://erikamorrea.github.io/
export default defineConfig({
  plugins: [react()],
  base: '/',
})
