<!--
  @codigosinsiesta/theme/slides/SlideStatement.svelte
  V4 design — una idea grande, palabra clave con gradiente, source/atribución.
  Portado de StatementSlide en codigo-sin-siesta/project/src/css-slides.jsx.

  Props:
    eyebrow:        string     — kicker arriba (opcional)
    eyebrowAccent:  'electrico' | 'ok' | 'warn' | 'err'  — color del bar (default electrico)
    statement:      string     — la idea, frase corta y rotunda
    highlight:      string     — substring de `statement` a destacar con gradiente
    source:         string     — atribución / fuente (opcional)
    align:          'left' | 'center'   — alineación del bloque (default left)
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';

  let {
    eyebrow = '',
    eyebrowAccent = 'electrico' as 'electrico' | 'ok' | 'warn' | 'err',
    statement = '',
    highlight = '',
    source = '',
    align = 'left' as 'left' | 'center'
  } = $props<{
    eyebrow?: string;
    eyebrowAccent?: 'electrico' | 'ok' | 'warn' | 'err';
    statement?: string;
    highlight?: string;
    source?: string;
    align?: 'left' | 'center';
  }>();

  const parts = $derived.by(() => {
    if (!highlight || !statement.includes(highlight)) return null;
    const idx = statement.indexOf(highlight);
    return {
      before: statement.slice(0, idx),
      highlight,
      after: statement.slice(idx + highlight.length)
    };
  });
</script>

<SlideShell bgPreset="identidad">
  <div class="statement-wrap" class:is-center={align === 'center'}>
    {#if eyebrow}<Eyebrow accent={eyebrowAccent}>{eyebrow}</Eyebrow>{/if}
    <h1 class="statement">
      {#if parts}
        {parts.before}<span class="highlight">{parts.highlight}</span>{parts.after}
      {:else}
        {statement}
      {/if}
    </h1>
    {#if source}
      <div class="source">
        <span class="rule" aria-hidden="true"></span>
        <span class="source-text">{source}</span>
      </div>
    {/if}
  </div>
</SlideShell>

<style>
  .statement-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-lg);
    min-height: 60vh;
    max-width: 1100px;
  }
  .statement-wrap.is-center {
    align-items: center;
    text-align: center;
    margin: 0 auto;
  }

  .statement {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(2.4rem, 6.5vw, 5.5rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--color-tinta);
  }
  .highlight {
    background: linear-gradient(135deg, var(--color-electrico), var(--color-cobalto));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .source {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: var(--spacing-md);
  }
  .rule {
    width: 40px;
    height: 2px;
    background: var(--color-electrico);
    flex-shrink: 0;
  }
  .source-text {
    font-family: var(--font-mono);
    font-size: 14px;
    color: var(--color-tinta2);
    letter-spacing: 0.02em;
  }

  @media (max-width: 768px) {
    .statement { font-size: clamp(1.8rem, 8vw, 2.8rem); }
  }
</style>
