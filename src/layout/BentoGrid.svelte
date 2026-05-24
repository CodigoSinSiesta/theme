<!--
  @codigosinsiesta/theme/layout/BentoGrid

  Container CSS Grid puro para layout one-page bento. CSS-only, sin JS de
  hidratación: renderizable server-side sin `client:*`. Recibe `BentoCard`s
  como hijos — cada card declara su `size` y se posiciona via
  `grid-column: span N`.

  Custom props expuestas (overridables desde fuera):
    --csi-bento-cols  (number)  · default 12
    --csi-bento-gap   (length)  · default 20px

  Responsive:
    >  768px → cols (default 12)
    <= 768px → 4 cols
    <= 480px → 2 cols

  Uso:
    <BentoGrid cols={12} gap="24px" dense>
      <BentoCard size="xl">...</BentoCard>
      <BentoCard size="md">...</BentoCard>
      <BentoCard size="sm">...</BentoCard>
    </BentoGrid>
-->

<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    cols = 12,
    gap = '20px',
    dense = true,
    ariaLabel = '',
    children
  } = $props<{
    cols?: number;
    gap?: string;
    dense?: boolean;
    ariaLabel?: string;
    children?: Snippet;
  }>();
</script>

<section
  class="csi-bento-grid"
  class:csi-bento-grid--dense={dense}
  aria-label={ariaLabel || undefined}
  style="--csi-bento-cols: {cols}; --csi-bento-gap: {gap};"
>
  {@render children?.()}
</section>

<style>
  .csi-bento-grid {
    display: grid;
    grid-template-columns: repeat(var(--csi-bento-cols, 12), 1fr);
    gap: var(--csi-bento-gap, 20px);
    width: 100%;
  }
  .csi-bento-grid--dense {
    grid-auto-flow: dense;
  }
  @media (max-width: 768px) {
    .csi-bento-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media (max-width: 480px) {
    .csi-bento-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
