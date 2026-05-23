import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte({ hot: false })],
  resolve: {
    // Forzamos la entry de browser de Svelte — sin esto, vitest resuelve
    // svelte/internal/server y `mount()` no existe.
    conditions: ['browser'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
    include: ['src/**/*.test.{js,ts,svelte.js,svelte.ts}'],
  },
});
