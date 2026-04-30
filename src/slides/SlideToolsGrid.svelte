<!--
  @codigosinsiesta/theme/slides/SlideToolsGrid.svelte
  V4 design — header + grid de ToolCards (default 3×2 = 6 cards). Para slides
  tipo "el panorama" / "6 herramientas que importan".
  Portado de ToolsGridSlide en codigo-sin-siesta/project/src/css-slides.jsx.

  Props:
    eyebrow:        string                         — kicker
    title:          string                         — título
    titleHighlight: string                         — palabra del título a destacar
    intro:          string                         — párrafo intro (acepta **strong** y `code`)
    tools:          ToolCardProps[]                — items para el grid
    columns:        2 | 3                          — columnas (default 3 → 3×2 si 6 tools)

  ToolCardProps coincide con los props de @codigosinsiesta/theme/components/ToolCard:
    { icon, title, subtitle?, tag?, accent?, body?, meta? }
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';
  import ToolCard from '../components/ToolCard.svelte';

  type Tool = {
    icon?: string;
    title: string;
    subtitle?: string;
    tag?: string;
    accent?: string;
    body?: string;
    meta?: string[];
  };

  let {
    eyebrow = '',
    title = '',
    titleHighlight = '',
    intro = '',
    tools = [] as Tool[],
    columns = 3 as 2 | 3
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    intro?: string;
    tools?: Tool[];
    columns?: 2 | 3;
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
    {#if intro}<p class="intro">{@html renderInline(intro)}</p>{/if}
  </div>

  <div class="tools-grid" style:--cols={columns}>
    {#each tools as t}
      <ToolCard
        icon={t.icon}
        title={t.title}
        subtitle={t.subtitle}
        tag={t.tag}
        accent={t.accent}
        body={t.body}
        meta={t.meta}
      />
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
  .intro {
    font-size: clamp(0.95rem, 1.4vw, 1.1rem);
    color: var(--color-tinta2);
    line-height: 1.6;
    max-width: 880px;
    margin: 0;
  }
  .intro :global(strong) { color: var(--color-tinta); }

  .tools-grid {
    display: grid;
    grid-template-columns: repeat(var(--cols, 3), 1fr);
    gap: var(--spacing-lg);
  }

  @media (max-width: 900px) {
    .tools-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .tools-grid { grid-template-columns: 1fr; }
  }
</style>
