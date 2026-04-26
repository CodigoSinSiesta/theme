<!--
  @codigosinsiesta/theme/components/TerminalLine.svelte
  V4 design — una línea individual de terminal con tipos semánticos.
  Pensado para componer dentro de un wrapper (caja negra con titlebar).

  Tipos:
    cmd      — `➜ ~ <text>` (verde + cielo + texto blanco)
    out      — texto gris monoespaciado, white-space pre
    ok       — texto verde (success line)
    err      — texto rojo (error line)
    comment  — `# <text>` cursiva slate-500

  Props:
    type: 'cmd' | 'out' | 'ok' | 'err' | 'comment'  (default: 'out')
    text: string                                     — contenido de la línea
-->

<script lang="ts">
  type LineType = 'cmd' | 'out' | 'ok' | 'err' | 'comment';
  let {
    type = 'out' as LineType,
    text = ''
  } = $props<{ type?: LineType; text?: string }>();
</script>

{#if type === 'cmd'}
  <div class="ln cmd">
    <span class="prompt-arrow">➜</span>
    <span class="prompt-tilde">~</span>
    <span class="cmd-text">{text}</span>
  </div>
{:else if type === 'ok'}
  <div class="ln ok">{text}</div>
{:else if type === 'err'}
  <div class="ln err">{text}</div>
{:else if type === 'comment'}
  <div class="ln comment"># {text}</div>
{:else}
  <div class="ln out">{text}</div>
{/if}

<style>
  .ln {
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.7;
    white-space: pre;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  .out     { color: #cbd5e1; }
  .ok      { color: var(--color-ok); }
  .err     { color: var(--color-err); }
  .comment { color: var(--color-tinta4); font-style: italic; }
  .prompt-arrow { color: var(--color-ok); }
  .prompt-tilde { color: var(--color-cielo); }
  .cmd-text     { color: #e2e8f0; }
</style>
