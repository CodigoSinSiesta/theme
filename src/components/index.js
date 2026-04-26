/**
 * @codigosinsiesta/theme/components — barrel re-export.
 *
 * Permite imports compactos:
 *   import { Eyebrow, Callout, ToolCard, TerminalLine, QRCode }
 *     from '@codigosinsiesta/theme/components';
 *
 * Si tu bundler no resuelve subpath imports automáticamente, importa cada
 * componente por path explícito:
 *   import Eyebrow from '@codigosinsiesta/theme/components/Eyebrow.svelte';
 */

export { default as Eyebrow }      from './Eyebrow.svelte';
export { default as Callout }      from './Callout.svelte';
export { default as ToolCard }     from './ToolCard.svelte';
export { default as TerminalLine } from './TerminalLine.svelte';
export { default as QRCode }       from './QRCode.svelte';
