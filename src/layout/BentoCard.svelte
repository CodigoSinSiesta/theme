<!--
  @codigosinsiesta/theme/layout/BentoCard

  Card individual del layout bento. Hija de `BentoGrid` (CSS Grid).
  Cierra el círculo con v0.8.0 consumiendo `useIntersectionObserver` para
  la entry animation con semántica `triggerOnce`. Respeta
  `prefers-reduced-motion` vía CSS `@media` — el composable corre igual
  pero su efecto visual queda neutralizado por la media query.

  Sizes mapean a grid-column/grid-row span:
    sm → 3 cols × 1 row
    md → 4 cols × 1 row
    lg → 6 cols × 2 rows
    xl → 8 cols × 2 rows

  Responsive cascade:
    > 768px → span según size declarado
    481-768px → cards lg/xl se reducen a 4 cols × 1 row; sm/md a 2 cols
    <= 480px → todas a 2 cols × 1 row (full width del grid colapsado)

  Uso:
    <BentoCard size="xl" ariaLabel="Hero" id="hero" keyboardHint="Alt+1">
      <h1>Technical Leader Specialist</h1>
    </BentoCard>
-->

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { useIntersectionObserver } from '../composables/useIntersectionObserver.svelte.js';

  type Size = 'sm' | 'md' | 'lg' | 'xl';

  let {
    size = 'md' as Size,
    ariaLabel,
    keyboardHint = '',
    entryAnimation = true,
    id = '',
    children
  } = $props<{
    size?: Size;
    ariaLabel: string;
    keyboardHint?: string;
    entryAnimation?: boolean;
    id?: string;
    children?: Snippet;
  }>();

  const observer = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });
</script>

<article
  class="csi-bento-card csi-bento-card--{size}"
  class:csi-bento-card--animate={entryAnimation}
  data-visible={observer.isVisible}
  aria-label={ariaLabel}
  id={id || undefined}
  use:observer.target
>
  {#if keyboardHint}
    <kbd class="csi-bento-card-hint" aria-hidden="true">{keyboardHint}</kbd>
  {/if}
  {@render children?.()}
</article>

<style>
  .csi-bento-card {
    position: relative;
    background: var(--color-fondo-alt);
    border: 1px solid var(--color-borde);
    border-radius: 14px;
    padding: 24px;
    overflow: hidden;
  }
  .csi-bento-card--sm { grid-column: span 3; grid-row: span 1; }
  .csi-bento-card--md { grid-column: span 4; grid-row: span 1; }
  .csi-bento-card--lg { grid-column: span 6; grid-row: span 2; }
  .csi-bento-card--xl { grid-column: span 8; grid-row: span 2; }

  /* Entry animation — opt-in vía entryAnimation. data-visible viene del observer. */
  .csi-bento-card--animate {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 600ms ease-out, transform 600ms ease-out;
  }
  .csi-bento-card--animate[data-visible='true'] {
    opacity: 1;
    transform: none;
  }

  /* prefers-reduced-motion: anular animación a nivel CSS. El composable
     sigue corriendo (mantenemos data-visible reflejando intersection) pero
     el usuario no ve la transición. */
  @media (prefers-reduced-motion: reduce) {
    .csi-bento-card--animate {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }

  /* Responsive cascade — coordinada con BentoGrid (12 → 4 → 2 cols). */
  @media (min-width: 481px) and (max-width: 768px) {
    .csi-bento-card--sm { grid-column: span 2; }
    .csi-bento-card--md { grid-column: span 2; }
    .csi-bento-card--lg { grid-column: span 4; grid-row: span 1; }
    .csi-bento-card--xl { grid-column: span 4; grid-row: span 1; }
  }
  @media (max-width: 480px) {
    .csi-bento-card--sm,
    .csi-bento-card--md,
    .csi-bento-card--lg,
    .csi-bento-card--xl {
      grid-column: span 2;
      grid-row: auto;
    }
  }

  .csi-bento-card-hint {
    position: absolute;
    top: 12px;
    right: 12px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-tinta4);
    background: var(--color-fondo);
    padding: 3px 7px;
    border-radius: 4px;
    border: 1px solid var(--color-borde);
    z-index: 1;
    letter-spacing: 0.04em;
  }
</style>
