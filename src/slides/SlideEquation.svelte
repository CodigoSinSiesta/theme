<!--
  @codigosinsiesta/theme/slides/SlideEquation.svelte
  V4 design — slide-tesis tipo ecuación: term + op + term + op = outcome.
  Cada term es una caja glass con label mono pequeño + texto display grande.
  El último marcado como `outcome` recibe gradient azul→violeta + glow.
  Operadores (`+`, `=`, `→`, etc.) en gradiente highlight.
  Portado de "Equation hero" en codigo-sin-siesta-design-system/project/kits/slide-deck/deck.css
  + Slide deck UI kit · Patterns.html (slide 08).

  Props:
    eyebrow:        string                                    — kicker
    title:          string                                    — título debajo del eyebrow
    titleHighlight: string                                    — palabra del título a destacar
    terms:          Term[]                                    — término(s) y operador(es)
    note:           string                                    — párrafo lede al pie (opcional)

  Term =
    | { kind: 'term'; label?: string; value: string; outcome?: boolean }
    | { kind: 'op'; symbol: string }      // '+', '=', '→', etc.
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';

  type Term =
    | { kind: 'term'; label?: string; value: string; outcome?: boolean }
    | { kind: 'op'; symbol: string };

  let {
    eyebrow = '',
    title = '',
    titleHighlight = '',
    terms = [] as Term[],
    note = ''
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    terms?: Term[];
    note?: string;
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

  <div class="equation">
    {#each terms as t}
      {#if t.kind === 'op'}
        <span class="op" aria-hidden="true">{t.symbol}</span>
      {:else}
        <div class="term" class:is-outcome={t.outcome}>
          {#if t.label}<span class="term-label">{t.label}</span>{/if}
          <span class="term-value">{t.value}</span>
        </div>
      {/if}
    {/each}
  </div>

  {#if note}<p class="note">{@html renderInline(note)}</p>{/if}
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

  .equation {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    margin-top: var(--spacing-xl);
    font-family: var(--font-display);
  }

  .term {
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: 18px;
    background: rgba(30, 58, 138, 0.30);
    border: 1px solid rgba(96, 165, 250, 0.30);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.30);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .term-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--color-tinta3);
    letter-spacing: 0.20em;
    text-transform: uppercase;
  }
  .term-value {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(1.6rem, 3.5vw, 2.6rem);
    line-height: 1;
    color: var(--color-tinta);
    letter-spacing: -0.01em;
  }

  .term.is-outcome {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.30), rgba(167, 139, 250, 0.20));
    border-color: var(--color-electrico);
    box-shadow: 0 0 32px rgba(59, 130, 246, 0.30);
  }

  .op {
    font-family: var(--font-display);
    font-weight: 900;
    font-size: clamp(1.8rem, 4vw, 3rem);
    line-height: 1;
    background: linear-gradient(135deg, var(--color-electrico), var(--color-cielo));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    padding: 0 4px;
  }

  .note {
    margin: var(--spacing-xl) auto 0;
    font-size: clamp(1rem, 1.4vw, 1.15rem);
    line-height: 1.5;
    color: var(--color-tinta2);
    max-width: 880px;
    text-align: center;
  }
  .note :global(strong) { color: var(--color-tinta); }
  .note :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 1px 5px;
    background: rgba(96, 165, 250, 0.10);
    border-radius: 3px;
    color: var(--color-cielo);
  }
</style>
