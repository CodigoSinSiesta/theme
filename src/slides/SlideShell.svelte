<!--
  @codigosinsiesta/theme/slides/SlideShell.svelte
  V4 design — wrapper base de cualquier slide.

  Aporta:
  - .swiper-slide con flex-column align-start (compatible con Navigation existente
    de los decks de Código Sin Siesta)
  - .slide-background con gradientes radiales configurables
  - .slide-content con max-width + padding canónico
  - Hook de animación al montar (animateSlideEntrance via slot prop)

  Props:
    bgPreset:  'azul' | 'identidad' | 'verde' | 'cierre' | 'lila' | 'naranja' | 'none'
    maxWidth:  number | string                     — default 1280px
    children:  snippet                             — contenido del slide
-->

<script lang="ts">
  import { onMount } from 'svelte';

  type BgPreset = 'azul' | 'identidad' | 'verde' | 'cierre' | 'lila' | 'naranja' | 'none';

  let {
    bgPreset = 'azul' as BgPreset,
    maxWidth = 1280 as number | string,
    children
  } = $props<{
    bgPreset?: BgPreset;
    maxWidth?: number | string;
    children?: import('svelte').Snippet;
  }>();

  const presets: Record<BgPreset, string> = {
    azul:
      'radial-gradient(ellipse at 80% 10%, rgba(59,130,246,0.10) 0%, transparent 55%),' +
      'radial-gradient(ellipse at 10% 90%, rgba(30,58,138,0.14) 0%, transparent 55%)',
    identidad:
      'radial-gradient(ellipse at 15% 60%, rgba(59,130,246,0.12) 0%, transparent 55%),' +
      'radial-gradient(ellipse at 85% 30%, rgba(30,58,138,0.18) 0%, transparent 55%)',
    verde:
      'radial-gradient(ellipse at 80% 50%, rgba(34,197,94,0.06) 0%, transparent 55%),' +
      'radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.10) 0%, transparent 55%)',
    cierre:
      'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 60%),' +
      'radial-gradient(ellipse at 30% 90%, rgba(167,139,250,0.10) 0%, transparent 55%),' +
      'radial-gradient(ellipse at 70% 90%, rgba(34,197,94,0.06) 0%, transparent 55%)',
    lila:
      'radial-gradient(ellipse at 20% 20%, rgba(167,139,250,0.10) 0%, transparent 55%),' +
      'radial-gradient(ellipse at 80% 80%, rgba(59,130,246,0.12) 0%, transparent 55%)',
    naranja:
      'radial-gradient(ellipse at 80% 20%, rgba(251,146,60,0.08) 0%, transparent 55%),' +
      'radial-gradient(ellipse at 20% 80%, rgba(34,197,94,0.08) 0%, transparent 55%)',
    none: 'transparent'
  };

  const bgImage = $derived(presets[bgPreset]);
  const maxWidthCss = $derived(typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth);

  let slideElement: HTMLElement | undefined = $state(undefined);

  onMount(() => {
    // El deck consumidor puede inyectar su propio animateSlideEntrance via Navigation.
    // Aquí no forzamos animaciones para no acoplar al theme con GSAP.
  });
</script>

<div class="swiper-slide csi-slide" bind:this={slideElement}>
  <div class="csi-slide-bg" style:background-image={bgImage} aria-hidden="true"></div>
  <div class="csi-slide-content" style:max-width={maxWidthCss}>
    {@render children?.()}
  </div>
</div>

<style>
  .csi-slide {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    overflow-y: auto;
  }
  .csi-slide-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }
  .csi-slide-content {
    position: relative;
    z-index: 1;
    width: 100%;
    padding: var(--spacing-2xl) var(--spacing-content);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }
</style>
