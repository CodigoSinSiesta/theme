<!--
  @codigosinsiesta/theme/slides/SlideCode.svelte
  V4 design — terminal/window con código + columna de notas a pie por línea + callout final.
  Portado de CodeSlide en codigo-sin-siesta/project/src/css-slides.jsx.

  Props:
    eyebrow:        string                                — kicker (opcional)
    title:          string                                — título del slide
    titleHighlight: string                                — palabra del título a destacar
    language:       string                                — etiqueta arriba-derecha (default 'ts')
    code:           string                                — bloque entero, con \n
    annotations:    { line: number; text: string }[]      — notas L{n} en columna lateral
    callout:        { kind?, title?, body? } | null       — callout informativo al pie
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';
  import Callout from '../components/Callout.svelte';

  type CalloutKind = 'info' | 'ok' | 'warn' | 'err';
  type Annotation = { line: number; text: string };

  let {
    eyebrow = '',
    title = '',
    titleHighlight = '',
    language = 'ts',
    code = '',
    annotations = [] as Annotation[],
    callout = null as { kind?: CalloutKind; title?: string; body?: string } | null
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    language?: string;
    code?: string;
    annotations?: Annotation[];
    callout?: { kind?: CalloutKind; title?: string; body?: string } | null;
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

  const lines = $derived(code.split('\n'));

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

  <div class="code-row">
    <div class="window">
      <div class="window-bar" aria-hidden="true">
        <span class="dot dot-r"></span>
        <span class="dot dot-y"></span>
        <span class="dot dot-g"></span>
        <span class="lang">{language}</span>
      </div>
      <div class="code-area">
        <div class="gutter" aria-hidden="true">
          {#each lines as _, i}
            <div class="ln">{i + 1}</div>
          {/each}
        </div>
        <pre class="code"><code>{code}</code></pre>
      </div>
    </div>

    <aside class="notes">
      <div class="notes-header">notas a pie</div>
      {#each annotations as a}
        <div class="note">
          <div class="note-tag">L{a.line}</div>
          <div class="note-text">{@html renderInline(a.text)}</div>
        </div>
      {/each}
      {#if callout && callout.body}
        <div class="callout-wrap">
          <Callout kind={callout.kind || 'info'} title={callout.title}>
            {@html renderInline(callout.body)}
          </Callout>
        </div>
      {/if}
    </aside>
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

  .code-row {
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
    gap: var(--spacing-xl);
    align-items: stretch;
  }

  .window {
    background: #000;
    border: 1px solid var(--color-borde);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 380px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  }
  .window-bar {
    background: #161b22;
    border-bottom: 1px solid var(--color-borde);
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    position: relative;
  }
  .dot { width: 11px; height: 11px; border-radius: 50%; }
  .dot-r { background: #ef4444; }
  .dot-y { background: #f59e0b; }
  .dot-g { background: #10b981; }
  .lang {
    margin-left: auto;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-tinta3);
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .code-area {
    display: grid;
    grid-template-columns: 48px 1fr;
    flex: 1;
    min-height: 0;
  }
  .gutter {
    text-align: right;
    color: #475569;
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.6;
    padding: 16px 8px 16px 0;
    user-select: none;
    background: #000;
    border-right: 1px solid rgba(51, 65, 85, 0.4);
  }
  .ln { padding-right: 4px; }
  pre.code {
    margin: 0;
    padding: 16px 18px;
    overflow: auto;
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 1.6;
    color: #e2e8f0;
    background: transparent;
    white-space: pre;
  }
  pre.code code { font-family: inherit; color: inherit; background: transparent; padding: 0; }

  .notes {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
  }
  .notes-header {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-electrico);
    font-weight: 600;
    margin-bottom: 4px;
  }
  .note { display: flex; gap: 12px; }
  .note-tag {
    flex-shrink: 0;
    width: 36px;
    height: 24px;
    background: rgba(59, 130, 246, 0.15);
    color: var(--color-cielo);
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: 1px solid rgba(59, 130, 246, 0.30);
  }
  .note-text {
    font-size: 14px;
    line-height: 1.45;
    color: var(--color-tinta);
  }
  .note-text :global(strong) { color: var(--color-tinta); }
  .note-text :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 1px 5px;
    background: rgba(96, 165, 250, 0.10);
    border-radius: 3px;
    color: var(--color-cielo);
  }

  .callout-wrap { margin-top: auto; }

  @media (max-width: 1024px) {
    .code-row { grid-template-columns: 1fr; }
  }
</style>
