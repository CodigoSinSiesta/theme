/**
 * @codigosinsiesta/theme/layout — barrel re-export.
 *
 * Primitivos de layout para sitios web (no decks). Site shell + bento.
 * Compañeros de los `slides/*` para presentaciones.
 *
 * Importables compactos:
 *   import { PageShell } from '@codigosinsiesta/theme/layout';
 *
 * O por path explícito:
 *   import PageShell from '@codigosinsiesta/theme/layout/PageShell.svelte';
 */

export { default as PageShell }  from './PageShell.svelte';
export { default as SiteHeader } from './SiteHeader.svelte';
export { default as SiteFooter } from './SiteFooter.svelte';
export { default as BentoGrid }  from './BentoGrid.svelte';
export { default as BentoCard }  from './BentoCard.svelte';
