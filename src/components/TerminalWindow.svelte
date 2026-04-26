<!--
  @codigosinsiesta/theme/components/TerminalWindow.svelte
  V4 design — caja Mac-style con titlebar (3 dots + título central) + body.
  Acompañante natural de TerminalLine. Pásale lines como prop o usa el slot.

  Props:
    title: string                                                      — caption central de la titlebar (default: '~ · zsh')
    lines: { type: 'cmd'|'out'|'ok'|'err'|'comment'; text: string }[]  — opcional, se renderizan internamente
    showCursor: boolean                                                 — pinta cursor parpadeante al final (default: true)
    minHeight: number | string                                          — alto mínimo en px o cualquier unidad CSS (default: 480)
    children: snippet                                                   — alternativa a `lines`, mete tus <TerminalLine>s a mano
-->

<script lang="ts">
  import TerminalLine from './TerminalLine.svelte';

  type Line = { type: 'cmd' | 'out' | 'ok' | 'err' | 'comment'; text: string };
  let {
    title = '~ · zsh',
    lines = [] as Line[],
    showCursor = true,
    minHeight = 480 as number | string,
    children
  } = $props<{
    title?: string;
    lines?: Line[];
    showCursor?: boolean;
    minHeight?: number | string;
    children?: import('svelte').Snippet;
  }>();

  const minHeightCss = $derived(typeof minHeight === 'number' ? `${minHeight}px` : minHeight);
</script>

<div class="csi-terminal" role="img" aria-label={`Terminal · ${title}`} style:min-height={minHeightCss}>
  <div class="titlebar">
    <span class="dot dot-r"></span>
    <span class="dot dot-y"></span>
    <span class="dot dot-g"></span>
    <span class="title">{title}</span>
  </div>
  <div class="body">
    {#if lines.length > 0}
      {#each lines as l}
        <TerminalLine type={l.type} text={l.text} />
      {/each}
    {/if}
    {@render children?.()}
    {#if showCursor}
      <div class="ln-final">
        <span class="prompt-arrow">➜</span>
        <span class="prompt-tilde">~</span>
        <span class="cursor"></span>
      </div>
    {/if}
  </div>
</div>

<style>
  .csi-terminal {
    background: #000;
    border: 1px solid var(--color-borde);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    font-family: var(--font-mono);
  }
  .titlebar {
    background: #161b22;
    padding: 10px 14px;
    border-bottom: 1px solid var(--color-borde);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .dot { width: 11px; height: 11px; border-radius: 50%; flex-shrink: 0; }
  .dot-r { background: #ef4444; }
  .dot-y { background: #f59e0b; }
  .dot-g { background: #10b981; }
  .title {
    flex: 1;
    text-align: center;
    font-size: 11px;
    color: var(--color-tinta4);
  }
  .body {
    padding: 18px 22px;
    flex: 1;
    overflow: hidden;
    color: #e2e8f0;
  }
  .ln-final {
    font-size: 13px;
    line-height: 1.7;
  }
  .prompt-arrow { color: var(--color-ok); }
  .prompt-tilde { color: var(--color-cielo); }
  .cursor {
    display: inline-block;
    width: 9px;
    height: 16px;
    background: var(--color-cielo);
    margin-left: 6px;
    vertical-align: middle;
    animation: csi-cursor-blink 1s steps(2) infinite;
  }
  @keyframes csi-cursor-blink { 50% { opacity: 0; } }

  @media (max-width: 768px) {
    .body { padding: 14px 16px; }
  }
</style>
