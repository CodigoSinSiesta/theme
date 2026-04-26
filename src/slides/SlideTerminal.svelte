<!--
  @codigosinsiesta/theme/slides/SlideTerminal.svelte
  V4 design — Hands-on con TerminalWindow + narración paso a paso lateral.

  Props:
    eyebrow:        string                                           — texto del eyebrow (opcional)
    eyebrowAccent:  'electrico' | 'ok' | 'warn' | 'err'              — color del bar del eyebrow (default 'ok' para hands-on)
    title:          string                                           — título del slide
    titleHighlight: string                                           — palabra del título a destacar
    lead:           string                                           — párrafo intro (puede contener <code> y <strong>)
    terminalTitle:  string                                           — caption central del terminal (default '~ · zsh')
    lines:          { type; text }[]                                 — líneas del terminal
    steps:          string[]                                         — pasos numerados (puede contener `code` y **strong**)
    tip:            string                                           — pro-tip al final (opcional)
    tipTitle:       string                                           — title del callout pro-tip (default 'Pro tip')
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';
  import Callout from '../components/Callout.svelte';
  import TerminalWindow from '../components/TerminalWindow.svelte';

  type Line = { type: 'cmd' | 'out' | 'ok' | 'err' | 'comment'; text: string };

  let {
    eyebrow = '',
    eyebrowAccent = 'ok' as 'electrico' | 'ok' | 'warn' | 'err',
    title = '',
    titleHighlight = '',
    lead = '',
    terminalTitle = '~ · zsh',
    lines = [] as Line[],
    steps = [] as string[],
    tip = '',
    tipTitle = 'Pro tip'
  } = $props<{
    eyebrow?: string;
    eyebrowAccent?: 'electrico' | 'ok' | 'warn' | 'err';
    title?: string;
    titleHighlight?: string;
    lead?: string;
    terminalTitle?: string;
    lines?: Line[];
    steps?: string[];
    tip?: string;
    tipTitle?: string;
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

  // Render simple de markdown inline: **strong** y `code`
  function renderInline(s: string): string {
    return s
      .replaceAll(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replaceAll(/`([^`]+)`/g, '<code>$1</code>');
  }
</script>

<SlideShell bgPreset="verde" maxWidth={1280}>
  <div class="header">
    {#if eyebrow}<Eyebrow accent={eyebrowAccent}>{eyebrow}</Eyebrow>{/if}
    <h2>
      {#if titleParts}
        {titleParts.before}<span class="highlight">{titleParts.highlight}</span>{titleParts.after}
      {:else}
        {title}
      {/if}
    </h2>
    {#if lead}<p class="lead">{@html lead}</p>{/if}
  </div>

  <div class="terminal-row">
    <TerminalWindow title={terminalTitle} lines={lines} minHeight={480} />

    <div class="narration">
      <Eyebrow>narración paso a paso</Eyebrow>
      {#each steps as step, i}
        <div class="step">
          <div class="step-num">{i + 1}</div>
          <div class="step-text">{@html renderInline(step)}</div>
        </div>
      {/each}
      {#if tip}
        <div class="tip-wrap">
          <Callout kind="info" title={tipTitle}>{tip}</Callout>
        </div>
      {/if}
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
    color: var(--color-tinta);
  }
  .highlight {
    background: linear-gradient(135deg, var(--color-electrico), var(--color-cielo));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .lead {
    font-size: clamp(0.95rem, 1.4vw, 1.05rem);
    opacity: 0.85;
    margin: 0;
    line-height: 1.6;
    max-width: 820px;
    color: var(--color-tinta2);
  }
  .lead :global(code) {
    font-family: var(--font-mono);
    padding: 2px 6px;
    background: rgba(96,165,250,0.1);
    border-radius: 4px;
    color: var(--color-cielo);
  }
  .lead :global(strong) { color: var(--color-tinta); }

  .terminal-row {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: var(--spacing-xl);
    align-items: stretch;
  }

  .narration { display: flex; flex-direction: column; gap: 12px; }
  .step { display: flex; gap: 12px; align-items: flex-start; }
  .step-num {
    flex-shrink: 0;
    width: 28px; height: 28px;
    border-radius: 50%;
    background: rgba(59,130,246,0.13);
    color: var(--color-cielo);
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(59,130,246,0.4);
  }
  .step-text {
    font-size: 13px;
    color: var(--color-tinta2);
    line-height: 1.5;
    padding-top: 4px;
  }
  .step-text :global(code) {
    font-family: var(--font-mono);
    font-size: 11px;
    padding: 1px 5px;
    background: rgba(96,165,250,0.1);
    border-radius: 3px;
    color: var(--color-cielo);
  }
  .step-text :global(strong) { color: var(--color-tinta); }
  .tip-wrap { margin-top: auto; }

  @media (max-width: 1024px) {
    .terminal-row { grid-template-columns: 1fr; }
  }
  @media (max-width: 768px) {
    h2 { font-size: clamp(1.6rem, 6vw, 2.2rem); }
  }
</style>
