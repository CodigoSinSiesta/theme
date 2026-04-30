/**
 * @codigosinsiesta/theme/slides — barrel re-export de slide-shells (v0.3.0+).
 *
 * Cada slide-shell es una composición canónica de los componentes-átomo del
 * kit V4. Pásale props con el contenido y obtienes un slide pixel-perfect.
 *
 *   import {
 *     SlideHero, SlideTOC, SlideTerminal, SlideResources,
 *     SlideStatement, SlideCompare, SlideStats,
 *     SlideDiagram, SlideCode, SlideList
 *   } from '@codigosinsiesta/theme/slides';
 *
 *   import SlideShell from '@codigosinsiesta/theme/slides/SlideShell.svelte';
 */

export { default as SlideShell }     from './SlideShell.svelte';
export { default as SlideHero }      from './SlideHero.svelte';
export { default as SlideTOC }       from './SlideTOC.svelte';
export { default as SlideTerminal }  from './SlideTerminal.svelte';
export { default as SlideResources } from './SlideResources.svelte';

// v0.5.0 — kit V4 completo (15 slide-types)
export { default as SlideStatement } from './SlideStatement.svelte';
export { default as SlideCompare }   from './SlideCompare.svelte';
export { default as SlideStats }     from './SlideStats.svelte';
export { default as SlideDiagram }   from './SlideDiagram.svelte';
export { default as SlideCode }      from './SlideCode.svelte';
export { default as SlideList }      from './SlideList.svelte';

// v0.6.0 — Tier 1 del component-audit V5 (gaps detectados en las 7 presentaciones)
export { default as SlidePatternGrid }   from './SlidePatternGrid.svelte';
export { default as SlideDecisionTable } from './SlideDecisionTable.svelte';
export { default as SlidePipeline }      from './SlidePipeline.svelte';
export { default as SlideHandsOn }       from './SlideHandsOn.svelte';

// v0.7.0 — V4 residuales + Tier 2 + Tier 3 (kit completo, 26 shells)
export { default as SlideSection }     from './SlideSection.svelte';
export { default as SlideQuote }       from './SlideQuote.svelte';
export { default as SlideWhoAmI }      from './SlideWhoAmI.svelte';
export { default as SlideToolsGrid }   from './SlideToolsGrid.svelte';
export { default as SlideEquation }    from './SlideEquation.svelte';
export { default as SlideLayerStack }  from './SlideLayerStack.svelte';
export { default as SlideNestedEras }  from './SlideNestedEras.svelte';
export { default as SlideCodeCompare } from './SlideCodeCompare.svelte';
export { default as SlideAccentCards } from './SlideAccentCards.svelte';
export { default as SlideTriada }      from './SlideTriada.svelte';
export { default as SlideDidactic }    from './SlideDidactic.svelte';
