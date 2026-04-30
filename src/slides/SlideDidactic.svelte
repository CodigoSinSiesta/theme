<!--
  @codigosinsiesta/theme/slides/SlideDidactic.svelte
  V4 design — bloque didáctico de 3 columnas: Definition · Analogía · Examples.
  Cada bloque lleva un mega-número gradient (01/02/03) + key mono + h4 + body.
  El bloque "analog" recibe gradient violeta sutil para diferenciar.
  El bloque "example" lista bullets mono con `›` chevron.
  Portado de "Definition + Analogy + Examples" en codigo-sin-siesta-design-system/project/kits/slide-deck/deck.css.

  Props:
    eyebrow:        string                                    — kicker
    title:          string                                    — título
    titleHighlight: string                                    — palabra del título a destacar
    definition:     Block                                     — bloque 01 · definición
    analogy:        Block                                     — bloque 02 · analogía
    examples:       ExampleBlock                              — bloque 03 · ejemplos

  Block = { title: string; body: string }   // body acepta **strong** y `code`
  ExampleBlock = { title: string; items: string[] }
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';

  type Block = { title: string; body: string };
  type ExampleBlock = { title: string; items: string[] };

  let {
    eyebrow = '',
    title = '',
    titleHighlight = '',
    definition = { title: '', body: '' } as Block,
    analogy = { title: '', body: '' } as Block,
    examples = { title: '', items: [] } as ExampleBlock
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    definition?: Block;
    analogy?: Block;
    examples?: ExampleBlock;
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

  <div class="dae">
    <div class="block def">
      <span class="num" aria-hidden="true">01</span>
      <span class="key">Definición</span>
      <h4>{definition.title}</h4>
      <p>{@html renderInline(definition.body)}</p>
    </div>

    <div class="block analog">
      <span class="num" aria-hidden="true">02</span>
      <span class="key">Analogía</span>
      <h4>{analogy.title}</h4>
      <p>{@html renderInline(analogy.body)}</p>
    </div>

    <div class="block example">
      <span class="num" aria-hidden="true">03</span>
      <span class="key">Ejemplos</span>
      <h4>{examples.title}</h4>
      <ul>
        {#each examples.items as it}
          <li>{@html renderInline(it)}</li>
        {/each}
      </ul>
    </div>
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

  .dae {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-lg);
  }

  .block {
    position: relative;
    padding: var(--spacing-xl) var(--spacing-lg);
    background: rgba(30, 58, 138, 0.18);
    border: 1px solid var(--color-borde);
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .block.analog {
    background: linear-gradient(135deg, rgba(167, 139, 250, 0.14), rgba(30, 58, 138, 0.20));
    border-color: rgba(167, 139, 250, 0.30);
  }

  .num {
    font-family: var(--font-display);
    font-weight: 900;
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    line-height: 1;
    background: linear-gradient(135deg, var(--color-electrico), var(--color-cielo));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 4px;
  }
  .key {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.20em;
    text-transform: uppercase;
    color: var(--color-cielo);
  }

  h4 {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 1.2;
    color: var(--color-tinta);
  }
  p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--color-tinta);
    opacity: 0.85;
  }
  p :global(strong), li :global(strong) { color: var(--color-tinta); opacity: 1; }
  p :global(code), li :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 1px 5px;
    background: rgba(96, 165, 250, 0.10);
    border-radius: 3px;
    color: var(--color-cielo);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 8px;
  }
  li {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--color-tinta);
    padding-left: 18px;
    position: relative;
    opacity: 0.88;
  }
  li::before {
    content: '›';
    position: absolute;
    left: 0;
    color: var(--color-cielo);
    font-weight: 700;
  }

  @media (max-width: 1024px) {
    .dae { grid-template-columns: 1fr; }
  }
</style>
