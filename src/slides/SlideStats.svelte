<!--
  @codigosinsiesta/theme/slides/SlideStats.svelte
  V4 design — big numbers row con cards (top accent), trend opcional, callout final.
  Portado de StatsSlide en codigo-sin-siesta/project/src/css-slides.jsx.

  Props:
    eyebrow:        string                    — kicker (opcional)
    title:          string                    — título del slide
    titleHighlight: string                    — palabra del título a destacar
    intro:          string                    — párrafo intro (puede contener `code` y **strong**)
    stats:          Stat[]                    — 2-4 stats grandes
    callout:        { kind?, title?, body? } | null  — callout opcional al pie

  Stat = {
    value: string;             // "55%", "2.1×", "-12%"
    label: string;             // micro-caption mono uppercase
    trend?: string;            // "↑ tareas atómicas" — auto-coloreado por prefijo (↑ ok / ↓ err)
    color?: 'electrico'|'ok'|'warn'|'err'|'cielo'|string;
    note?: string;             // descripción debajo del número
  }
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';
  import Callout from '../components/Callout.svelte';

  type Stat = {
    value: string;
    label: string;
    trend?: string;
    color?: string;
    note?: string;
  };
  type CalloutKind = 'info' | 'ok' | 'warn' | 'err';

  let {
    eyebrow = '',
    title = '',
    titleHighlight = '',
    intro = '',
    stats = [] as Stat[],
    callout = null as { kind?: CalloutKind; title?: string; body?: string } | null
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    intro?: string;
    stats?: Stat[];
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

  // Resuelve un nombre de token o devuelve el valor literal
  function resolveColor(c: string | undefined): string {
    if (!c) return 'var(--color-electrico)';
    const known: Record<string, string> = {
      electrico: 'var(--color-electrico)',
      cobalto:   'var(--color-cobalto)',
      cielo:     'var(--color-cielo)',
      cielo2:    'var(--color-cielo2)',
      ok:        'var(--color-ok)',
      warn:      'var(--color-warn)',
      err:       'var(--color-err)'
    };
    return known[c] || c;
  }

  function trendKind(trend: string | undefined): 'up' | 'down' | 'flat' {
    if (!trend) return 'flat';
    if (trend.startsWith('↑')) return 'up';
    if (trend.startsWith('↓')) return 'down';
    return 'flat';
  }

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
    {#if intro}<p class="intro">{@html renderInline(intro)}</p>{/if}
  </div>

  <div class="stats-grid" style:--cols={stats.length}>
    {#each stats as s}
      {@const c = resolveColor(s.color)}
      <div class="stat-card" style:--accent={c}>
        <div class="stat-value">{s.value}</div>
        <div class="stat-label">{s.label}</div>
        {#if s.trend}
          <div class="stat-trend" data-trend={trendKind(s.trend)}>{s.trend}</div>
        {/if}
        {#if s.note}<div class="stat-note">{s.note}</div>{/if}
      </div>
    {/each}
  </div>

  {#if callout && callout.body}
    <div class="callout-wrap">
      <Callout kind={callout.kind || 'info'} title={callout.title}>
        {@html renderInline(callout.body)}
      </Callout>
    </div>
  {/if}
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
  .intro {
    font-size: clamp(1rem, 1.5vw, 1.15rem);
    color: var(--color-tinta2);
    line-height: 1.6;
    max-width: 880px;
    margin: 0;
  }
  .intro :global(strong) { color: var(--color-tinta); }
  .intro :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 1px 6px;
    background: rgba(96,165,250,0.10);
    border-radius: 3px;
    color: var(--color-cielo);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(var(--cols, 4), 1fr);
    gap: var(--spacing-xl);
  }

  .stat-card {
    background: var(--color-fondo-elev);
    border: 1px solid var(--color-borde);
    border-top: 4px solid var(--accent);
    border-radius: 12px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .stat-value {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(2.2rem, 4.5vw, 3.4rem);
    line-height: 1;
    letter-spacing: -0.02em;
    color: var(--accent);
  }
  .stat-label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-tinta3);
    margin-top: 6px;
  }
  .stat-trend {
    font-size: 13px;
    margin-top: 2px;
    color: var(--color-tinta3);
  }
  .stat-trend[data-trend='up']   { color: var(--color-ok); }
  .stat-trend[data-trend='down'] { color: var(--color-err); }
  .stat-note {
    font-size: 13px;
    color: var(--color-tinta2);
    line-height: 1.45;
    margin-top: 10px;
  }

  .callout-wrap { margin-top: auto; }

  @media (max-width: 900px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); gap: var(--spacing-md); }
  }
  @media (max-width: 520px) {
    .stats-grid { grid-template-columns: 1fr; }
  }
</style>
