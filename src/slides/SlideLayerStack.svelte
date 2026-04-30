<!--
  @codigosinsiesta/theme/slides/SlideLayerStack.svelte
  V4 design — diagrama de capas horizontal tipo OS-stack (kernel/runtime/app).
  Cada layer = grid 3-cols (name | desc | meta). Tres `kind` con tinted bg:
  'kernel' (violeta), 'runtime' (azul fuerte), 'app' / default.
  Portado de "OS stack" en codigo-sin-siesta-design-system/project/kits/slide-deck/deck.css
  + Slide deck UI kit · Patterns.html (slide 09).

  Props:
    eyebrow:        string                                    — kicker
    title:          string                                    — título
    titleHighlight: string                                    — palabra del título a destacar
    layers:         Layer[]                                   — capas, en orden top→bottom

  Layer = {
    name: string;          // mono uppercase tinted electrico (ej. 'App')
    desc: string;          // descripción principal
    meta?: string;         // micro-caption mono a la derecha (ej. 'user space')
    kind?: 'kernel' | 'runtime' | 'app' | 'default';
  }
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';

  type Layer = {
    name: string;
    desc: string;
    meta?: string;
    kind?: 'kernel' | 'runtime' | 'app' | 'default';
  };

  let {
    eyebrow = '',
    title = '',
    titleHighlight = '',
    layers = [] as Layer[]
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    layers?: Layer[];
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

  function renderInline(s: string): string {
    return s
      .replaceAll(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replaceAll(/`([^`]+)`/g, '<code>$1</code>');
  }
</script>

<SlideShell bgPreset="azul">
  <div class="header">
    {#if eyebrow}<Eyebrow>{eyebrow}</Eyebrow>{/if}
    <h2>
      {#if titleParts}
        {titleParts.before}<span class="highlight">{titleParts.highlight}</span>{titleParts.after}
      {:else}
        {title}
      {/if}
    </h2>
  </div>

  <div class="stack">
    {#each layers as l}
      <div class="layer kind-{l.kind || 'default'}">
        <span class="layer-name">{l.name}</span>
        <span class="layer-desc">{@html renderInline(l.desc)}</span>
        {#if l.meta}<span class="layer-meta">{l.meta}</span>{/if}
      </div>
    {/each}
  </div>
</SlideShell>

<style>
  .header { display: flex; flex-direction: column; gap: var(--spacing-md); }
  h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 4.5vw, 3rem);
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

  .stack {
    display: grid;
    gap: 10px;
    margin-top: var(--spacing-md);
  }

  .layer {
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: 14px;
    background: rgba(30, 58, 138, 0.25);
    border: 1px solid rgba(96, 165, 250, 0.25);
    display: grid;
    grid-template-columns: 160px 1fr auto;
    align-items: center;
    gap: var(--spacing-lg);
  }

  .layer-name {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-cielo);
  }
  .layer-desc {
    font-size: clamp(0.95rem, 1.3vw, 1.1rem);
    color: var(--color-tinta);
    line-height: 1.4;
  }
  .layer-desc :global(strong) { color: var(--color-tinta); }
  .layer-desc :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 1px 5px;
    background: rgba(96, 165, 250, 0.10);
    border-radius: 3px;
    color: var(--color-cielo);
  }
  .layer-meta {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--color-tinta3);
    letter-spacing: 0.10em;
  }

  /* Kind variants */
  .layer.kind-kernel {
    background: linear-gradient(90deg, rgba(167, 139, 250, 0.20), rgba(30, 58, 138, 0.30));
    border-color: rgba(167, 139, 250, 0.40);
  }
  .layer.kind-runtime {
    background: rgba(59, 130, 246, 0.18);
    border-color: rgba(96, 165, 250, 0.40);
  }
  .layer.kind-app {
    background: rgba(30, 58, 138, 0.18);
  }

  @media (max-width: 768px) {
    .layer { grid-template-columns: 1fr; gap: 6px; }
  }
</style>
