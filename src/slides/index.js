/**
 * @codigosinsiesta/theme/slides — barrel re-export de slide-shells (v0.3.0+).
 *
 * Cada slide-shell es una composición canónica de los componentes-átomo del
 * kit V4. Pásale props con el contenido y obtienes un slide pixel-perfect.
 *
 *   import { SlideHero, SlideTOC, SlideTerminal, SlideResources }
 *     from '@codigosinsiesta/theme/slides';
 *
 *   import SlideShell from '@codigosinsiesta/theme/slides/SlideShell.svelte';
 */

export { default as SlideShell }     from './SlideShell.svelte';
export { default as SlideHero }      from './SlideHero.svelte';
export { default as SlideTOC }       from './SlideTOC.svelte';
export { default as SlideTerminal }  from './SlideTerminal.svelte';
export { default as SlideResources } from './SlideResources.svelte';
