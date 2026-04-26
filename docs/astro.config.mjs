import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://codigosinsiesta.github.io',
  base: '/theme',
  integrations: [svelte()],
  server: {
    port: 4329
  },
  vite: {
    resolve: {
      // Permite importar componentes/shells del theme via path absoluto desde
      // dentro del docs site. No es necesario instalar @codigosinsiesta/theme
      // como dependencia — los .svelte viven en el mismo monorepo.
      alias: {
        '@theme': new URL('../src', import.meta.url).pathname
      }
    }
  }
});
