<!--
  @codigosinsiesta/theme/components/Callout.svelte
  V4 design — aside box con kind semántico (info/ok/warn/err).
  Border-left 3px + bg muy translúcido + icon + título + body.

  Props:
    kind:  'info' | 'ok' | 'warn' | 'err'   — paleta semántica (default: info)
    title: string                            — título del callout (opcional)
    icon:  string                            — emoji/glyph custom (opcional, default por kind)
    children: snippet                        — body content
-->

<script lang="ts">
  type Kind = 'info' | 'ok' | 'warn' | 'err';
  let {
    kind = 'info' as Kind,
    title = '',
    icon = '',
    children
  } = $props<{ kind?: Kind; title?: string; icon?: string; children?: import('svelte').Snippet }>();

  const palette: Record<Kind, { bg: string; bd: string; fg: string; ic: string }> = {
    info: { bg: 'rgba(96,165,250,0.10)', bd: 'var(--color-electrico)', fg: 'var(--color-cielo)', ic: '💡' },
    ok:   { bg: 'var(--color-ok-bg)',    bd: 'var(--color-ok)',         fg: 'var(--color-ok)',    ic: '✓'  },
    warn: { bg: 'var(--color-warn-bg)',  bd: 'var(--color-warn)',       fg: 'var(--color-warn)',  ic: '⚠️' },
    err:  { bg: 'var(--color-err-bg)',   bd: 'var(--color-err)',        fg: 'var(--color-err)',   ic: '✗'  }
  };
  const p = $derived(palette[kind]);
</script>

<div
  class="csi-callout"
  style:background={p.bg}
  style:border-left-color={p.bd}
  style:--bd-soft={`color-mix(in srgb, ${p.bd} 25%, transparent)`}
>
  <div class="icon" aria-hidden="true">{icon || p.ic}</div>
  <div class="body">
    {#if title}
      <div class="title" style:color={p.fg}>{title}</div>
    {/if}
    <div class="content">
      {@render children?.()}
    </div>
  </div>
</div>

<style>
  .csi-callout {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 14px 18px;
    border: 1px solid var(--bd-soft);
    border-left-width: 3px;
    border-radius: 0 8px 8px 0;
    font-family: var(--font-body);
  }
  .icon {
    font-size: 18px;
    line-height: 1.2;
    flex-shrink: 0;
  }
  .body {
    flex: 1;
    min-width: 0;
  }
  .title {
    font-weight: 700;
    margin-bottom: 4px;
    font-size: 14px;
  }
  .content {
    font-size: 14px;
    line-height: 1.5;
    color: var(--color-tinta2);
  }
  .content :global(strong) { color: var(--color-tinta); }
  .content :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 1px 6px;
    background: rgba(96, 165, 250, 0.10);
    border-radius: 3px;
    color: var(--color-cielo);
  }
</style>
