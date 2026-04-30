<!--
  @codigosinsiesta/theme/slides/SlideSection.svelte
  V4 design — divisor de capítulo: número gigante con gradiente + label "parte ·
  sección" mono + h1 + hint. Centrado vertical y horizontalmente.
  Portado de SectionSlide en codigo-sin-siesta/project/src/css-slides.jsx.

  Props:
    number:    string   — número grande (ej. "01", "02", "03")
    label:     string   — micro-eyebrow mono (default 'parte · sección')
    title:     string   — h1 del capítulo
    hint:      string   — descripción del capítulo (acepta **strong** y `code`)
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';

  let {
    number = '01',
    label = 'parte · sección',
    title = '',
    hint = ''
  } = $props<{
    number?: string;
    label?: string;
    title?: string;
    hint?: string;
  }>();

  function renderInline(s: string): string {
    return s
      .replaceAll(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replaceAll(/`([^`]+)`/g, '<code>$1</code>');
  }
</script>

<SlideShell bgPreset="identidad">
  <div class="section-wrap">
    <div class="big-number">{number}</div>
    <div class="micro-label">{label}</div>
    <h1>{title}</h1>
    {#if hint}<p class="hint">{@html renderInline(hint)}</p>{/if}
  </div>
</SlideShell>

<style>
  .section-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    min-height: 65vh;
    max-width: 920px;
    margin: 0 auto;
    gap: var(--spacing-md);
  }

  .big-number {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(8rem, 22vw, 16rem);
    line-height: 0.85;
    letter-spacing: -0.04em;
    background: linear-gradient(135deg, var(--color-electrico), var(--color-cobalto));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0;
  }

  .micro-label {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--color-tinta2);
  }

  h1 {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(2.4rem, 6vw, 4.5rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--color-tinta);
  }

  .hint {
    font-size: clamp(1rem, 1.8vw, 1.25rem);
    line-height: 1.5;
    color: var(--color-tinta2);
    margin: 0;
    max-width: 720px;
  }
  .hint :global(strong) { color: var(--color-tinta); }
  .hint :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 1px 5px;
    background: rgba(96, 165, 250, 0.10);
    border-radius: 3px;
    color: var(--color-cielo);
  }
</style>
