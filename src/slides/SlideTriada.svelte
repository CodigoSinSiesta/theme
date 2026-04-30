<!--
  @codigosinsiesta/theme/slides/SlideTriada.svelte
  V4 design — knowledge-graph triada: card vertical con N filas (key | value).
  Cada fila puede llevar tag mono violeta o pre-block con código.
  Útil para enseñar primitivas con su sintaxis (NODE / EDGE / TRIPLE).
  Portado de "Knowledge-graph triada" en codigo-sin-siesta-design-system/project/kits/slide-deck/deck.css.

  Props:
    eyebrow:        string                                    — kicker
    title:          string                                    — título
    titleHighlight: string                                    — palabra del título a destacar
    rows:           Row[]                                     — filas de la tarjeta KG
    insight:        string                                    — bloque "el insight" al pie (opcional, **strong** + `code`)
    insightTitle:   string                                    — title del insight (default 'El insight')

  Row = {
    key: string;       // mono uppercase tinted electrico (ej. 'NODE', 'EDGE', 'TRIPLE')
    text?: string;     // descripción inline (acepta **strong** y `code`)
    chip?: string;     // chip violeta inline (ej. nombre de un tipo, '<Skill>')
    code?: string;     // bloque `pre` con código de ejemplo
  }
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';
  import Callout from '../components/Callout.svelte';

  type Row = { key: string; text?: string; chip?: string; code?: string };

  let {
    eyebrow = '',
    title = '',
    titleHighlight = '',
    rows = [] as Row[],
    insight = '',
    insightTitle = 'El insight'
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    rows?: Row[];
    insight?: string;
    insightTitle?: string;
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

  <div class="kg-card">
    {#each rows as r}
      <div class="kg-row">
        <span class="kg-key">{r.key}</span>
        <div class="kg-value">
          {#if r.text}<span>{@html renderInline(r.text)}</span>{/if}
          {#if r.chip}<span class="chip">{r.chip}</span>{/if}
          {#if r.code}<pre><code>{r.code}</code></pre>{/if}
        </div>
      </div>
    {/each}
  </div>

  {#if insight}
    <div class="insight-wrap">
      <Callout kind="info" title={insightTitle}>
        {@html renderInline(insight)}
      </Callout>
    </div>
  {/if}
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

  .kg-card {
    background: rgba(30, 58, 138, 0.20);
    border: 1px solid rgba(96, 165, 250, 0.22);
    border-radius: 16px;
    overflow: hidden;
  }
  .kg-row {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: var(--spacing-lg);
    padding: var(--spacing-md) var(--spacing-xl);
    align-items: start;
  }
  .kg-row + .kg-row { border-top: 1px solid rgba(96, 165, 250, 0.15); }

  .kg-key {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-cielo);
    padding-top: 4px;
  }
  .kg-value {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.5;
    color: var(--color-tinta);
  }
  .kg-value :global(strong) { color: var(--color-tinta); }
  .kg-value :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 1px 5px;
    background: rgba(96, 165, 250, 0.10);
    border-radius: 3px;
    color: var(--color-cielo);
  }

  .chip {
    align-self: flex-start;
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    padding: 4px 10px;
    background: rgba(167, 139, 250, 0.18);
    border: 1px solid rgba(167, 139, 250, 0.40);
    border-radius: 6px;
    color: #a78bfa;
  }

  pre {
    margin: 0;
    padding: 12px 16px;
    background: #0B1020;
    border: 1px solid rgba(96, 165, 250, 0.20);
    border-radius: 10px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    line-height: 1.55;
    color: var(--color-tinta);
    overflow-x: auto;
    white-space: pre;
  }

  .insight-wrap { margin-top: auto; }

  @media (max-width: 768px) {
    .kg-row { grid-template-columns: 1fr; gap: 6px; padding: var(--spacing-md); }
  }
</style>
