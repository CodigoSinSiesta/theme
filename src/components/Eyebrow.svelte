<!--
  @codigosinsiesta/theme/components/Eyebrow.svelte
  V4 design — barra horizontal 24×2px + texto mono uppercase.

  Props:
    accent: 'electrico' | 'ok' | 'warn' | 'err'   — color del bar (default: electrico)
    color:  string                                  — color del texto (default: cielo)
    children: snippet                               — el texto del eyebrow
-->

<script lang="ts">
  type Accent = 'electrico' | 'ok' | 'warn' | 'err';
  let {
    accent = 'electrico' as Accent,
    color = '',
    children
  } = $props<{ accent?: Accent; color?: string; children?: import('svelte').Snippet }>();

  const barColors: Record<Accent, string> = {
    electrico: 'var(--color-electrico)',
    ok: 'var(--color-ok)',
    warn: 'var(--color-warn)',
    err: 'var(--color-err)'
  };
</script>

<div class="csi-eyebrow" style:color={color || 'var(--color-cielo)'}>
  <span class="bar" style:background={barColors[accent]} aria-hidden="true"></span>
  {@render children?.()}
</div>

<style>
  .csi-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  .bar {
    display: inline-block;
    width: 24px;
    height: 2px;
    border-radius: 1px;
    flex-shrink: 0;
  }
</style>
