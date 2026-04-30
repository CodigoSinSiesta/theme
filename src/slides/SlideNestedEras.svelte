<!--
  @codigosinsiesta/theme/slides/SlideNestedEras.svelte
  V4 design — anillos concéntricos (matryoshka). Cada anillo lleva un label mono.
  El anillo más interno (innermost) recibe gradient azul→violeta + glow + label
  centrado en grande. Útil para "X contiene a Y" o evolución temporal acumulativa.
  Portado de "Nested eras" en codigo-sin-siesta-design-system/project/kits/slide-deck/deck.css
  + Slide deck UI kit · Patterns.html (slide 10).

  Props:
    eyebrow:        string                                    — kicker (centrado)
    title:          string                                    — título (centrado)
    titleHighlight: string                                    — palabra del título a destacar
    eras:           Era[]                                     — orden: outermost → innermost (3-5 eras ideal)
    size:           number                                    — diámetro del anillo más externo en px (default 560)

  Era = {
    label: string;     // texto del label, soporta <br> (puro string)
    accent?: boolean;  // marca como innermost (gradient + glow). Si no hay ninguno, el último es accent auto.
  }
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';

  type Era = { label: string; accent?: boolean };

  let {
    eyebrow = '',
    title = '',
    titleHighlight = '',
    eras = [] as Era[],
    size = 560
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    eras?: Era[];
    size?: number;
  }>();

  const titleParts = $derived.by(() => {
    if (!titleHighlight || !title.includes(titleHighlight)) return null;
    const idx = title.indexOf(titleHighlight);
    return {
      before: title.slice(0, idx),
      highlight: titleHighlight,
      after: title.slice(idx + titleHighlight.length)
    };
  });

  // Si nadie tiene `accent`, el último (innermost) lo recibe automáticamente.
  const ringsWithAccent = $derived.by(() => {
    if (!eras.length) return [];
    const anyExplicit = eras.some((e) => e.accent);
    return eras.map((e, i) => ({
      ...e,
      isAccent: anyExplicit ? !!e.accent : i === eras.length - 1,
      step: size / Math.max(eras.length, 1) / 2 // grosor proporcional
    }));
  });
</script>

<SlideShell bgPreset="lila">
  <div class="header">
    {#if eyebrow}
      <div class="eyebrow-wrap"><Eyebrow>{eyebrow}</Eyebrow></div>
    {/if}
    {#if title}
      <h2>
        {#if titleParts}
          {titleParts.before}<span class="highlight">{titleParts.highlight}</span>{titleParts.after}
        {:else}
          {title}
        {/if}
      </h2>
    {/if}
  </div>

  <div class="rings-stage" style:--size={`${size}px`}>
    {#each ringsWithAccent as e, i}
      {@const inset = i * e.step}
      <div
        class="ring"
        class:is-accent={e.isAccent}
        style:inset={`${inset}px`}
      >
        <span class="ring-label">{@html e.label}</span>
      </div>
    {/each}
  </div>
</SlideShell>

<style>
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--spacing-sm);
  }
  .eyebrow-wrap { display: flex; justify-content: center; }
  h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 4.5vw, 2.8rem);
    line-height: 1.1;
    letter-spacing: -0.015em;
    color: var(--color-tinta);
  }
  .highlight {
    background: linear-gradient(135deg, var(--color-electrico), var(--color-cielo));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rings-stage {
    position: relative;
    width: var(--size, 560px);
    max-width: 90vw;
    aspect-ratio: 1 / 1;
    margin: var(--spacing-lg) auto 0;
  }

  .ring {
    position: absolute;
    border-radius: 50%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background: rgba(30, 58, 138, 0.18);
    border: 1px solid rgba(96, 165, 250, 0.35);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
  .ring .ring-label {
    margin-top: 18px;
    font-family: var(--font-mono);
    font-size: clamp(0.7rem, 1vw, 0.85rem);
    font-weight: 700;
    letter-spacing: 0.20em;
    text-transform: uppercase;
    color: var(--color-cielo);
    text-align: center;
    line-height: 1.2;
  }

  .ring.is-accent {
    background: linear-gradient(135deg, rgba(167, 139, 250, 0.30), rgba(59, 130, 246, 0.30));
    border-color: #a78bfa;
    box-shadow: 0 0 48px rgba(167, 139, 250, 0.30);
    align-items: center;
  }
  .ring.is-accent .ring-label {
    margin: 0;
    color: var(--color-tinta);
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(0.95rem, 1.6vw, 1.4rem);
    letter-spacing: 0.05em;
  }
</style>
