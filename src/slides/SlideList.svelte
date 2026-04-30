<!--
  @codigosinsiesta/theme/slides/SlideList.svelte
  V4 design — items numerados en grid 2-3 columnas (patrón "12 reglas").
  Portado de ListSlide en codigo-sin-siesta/project/src/css-slides.jsx.

  Props:
    eyebrow:        string                                — kicker (opcional)
    title:          string                                — título del slide
    titleHighlight: string                                — palabra del título a destacar
    items:          { title: string; body?: string }[]    — items con num auto
    columns:        2 | 3 | 4                             — columnas (default 3)
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';

  type Item = { title: string; body?: string };

  let {
    eyebrow = '',
    title = '',
    titleHighlight = '',
    items = [] as Item[],
    columns = 3 as 2 | 3 | 4
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    items?: Item[];
    columns?: 2 | 3 | 4;
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

  <div class="list-grid" style:--cols={columns}>
    {#each items as it, i}
      <div class="item">
        <div class="num">{String(i + 1).padStart(2, '0')}</div>
        <div class="body">
          <div class="item-title">{it.title}</div>
          {#if it.body}<div class="item-body">{@html renderInline(it.body)}</div>{/if}
        </div>
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

  .list-grid {
    display: grid;
    grid-template-columns: repeat(var(--cols, 3), 1fr);
    gap: 16px 24px;
  }

  .item {
    background: var(--color-fondo-elev);
    border: 1px solid var(--color-borde);
    border-radius: 10px;
    padding: 14px 16px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    transition: border-color var(--transition-base), transform var(--transition-base);
  }
  .item:hover {
    border-color: var(--color-electrico);
    transform: translateY(-2px);
  }

  .num {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: linear-gradient(135deg, var(--color-electrico), var(--color-cobalto));
    color: #fff;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .body { flex: 1; min-width: 0; }
  .item-title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 16px;
    color: var(--color-tinta);
    line-height: 1.2;
    margin-bottom: 3px;
  }
  .item-body {
    font-size: 13px;
    color: var(--color-tinta2);
    line-height: 1.45;
  }
  .item-body :global(strong) { color: var(--color-tinta); }
  .item-body :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 1px 5px;
    background: rgba(96, 165, 250, 0.10);
    border-radius: 3px;
    color: var(--color-cielo);
  }

  @media (max-width: 1024px) {
    .list-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .list-grid { grid-template-columns: 1fr; }
  }
</style>
