<!--
  @codigosinsiesta/theme/components/ToolCard.svelte
  V4 design — card con accent bar superior + icon box + title + tag + subtitle + body + meta.

  Props:
    icon:    string                                     — emoji/glyph
    title:   string                                     — título display
    subtitle:string                                     — subtítulo opcional
    tag:     string                                     — pill superior derecha (opcional)
    accent:  string                                     — color de accent bar + icon box (default: electrico)
    body:    string                                     — texto principal (opcional, también via slot)
    meta:    string[]                                   — strip inferior con meta-data (opcional)
-->

<script lang="ts">
  let {
    icon = '',
    title = '',
    subtitle = '',
    tag = '',
    accent = '',
    body = '',
    meta = [] as string[],
    children
  } = $props<{
    icon?: string; title?: string; subtitle?: string;
    tag?: string; accent?: string; body?: string; meta?: string[];
    children?: import('svelte').Snippet;
  }>();

  const accentColor = $derived(accent || 'var(--color-electrico)');
  // Soft + border variants — color-mix produce los rgba derivados.
  const accentSoft = $derived(`color-mix(in srgb, ${accentColor} 13%, transparent)`);
  const accentBorder = $derived(`color-mix(in srgb, ${accentColor} 25%, transparent)`);
</script>

<div class="csi-toolcard">
  <div class="accent-bar" style:background={accentColor} aria-hidden="true"></div>
  <div class="inner">
    <div class="head">
      {#if icon}
        <div
          class="icon-box"
          style:background={accentSoft}
          style:color={accentColor}
          style:border-color={accentBorder}
          aria-hidden="true"
        >{icon}</div>
      {/if}
      <div class="title-col">
        <div class="title-row">
          <div class="title">{title}</div>
          {#if tag}
            <span
              class="tag"
              style:background={accentSoft}
              style:color={accentColor}
              style:border-color={accentBorder}
            >{tag}</span>
          {/if}
        </div>
        {#if subtitle}<div class="subtitle">{subtitle}</div>{/if}
      </div>
    </div>

    {#if body || children}
      <div class="body">
        {#if body}{body}{/if}
        {@render children?.()}
      </div>
    {/if}

    {#if meta.length > 0}
      <div class="meta">
        {#each meta as m}
          <span>{m}</span>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .csi-toolcard {
    background: var(--color-fondo-elev);
    border: 1px solid var(--color-borde);
    border-radius: 12px;
    overflow: hidden;
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.3),
      0 8px 24px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    font-family: var(--font-body);
  }
  .accent-bar { height: 5px; }
  .inner { padding: 18px 20px 20px; flex: 1; display: flex; flex-direction: column; }
  .head { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 10px; }
  .icon-box {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
    border: 1px solid;
  }
  .title-col { flex: 1; min-width: 0; }
  .title-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 18px;
    color: var(--color-tinta);
    line-height: 1.2;
  }
  .tag {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .subtitle {
    font-size: 13px;
    color: var(--color-tinta3);
    margin-top: 2px;
  }
  .body {
    font-size: 14px;
    color: var(--color-tinta2);
    line-height: 1.45;
    flex: 1;
  }
  .meta {
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid var(--color-borde);
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-tinta4);
    display: flex;
    justify-content: space-between;
  }
</style>
