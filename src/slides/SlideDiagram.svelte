<!--
  @codigosinsiesta/theme/slides/SlideDiagram.svelte
  V4 design — diagrama de arquitectura: cajas + flechas SVG + leyenda.
  Portado de DiagramSlide en codigo-sin-siesta/project/src/css-slides-extra.jsx.

  Coordenadas dentro del viewBox 1180×460 (como el handoff).
  Las flechas se dibujan con curvas Bézier horizontales right-edge → left-edge.

  Props:
    eyebrow:        string                  — kicker (opcional)
    title:          string                  — título del slide
    titleHighlight: string                  — palabra del título a destacar
    nodes:          Node[]                  — cajas con posición absoluta dentro del viewBox
    edges:          Edge[]                  — conexiones entre nodos por id
    legend:         Legend[]                — chips de leyenda al pie

  Node = {
    id: string;
    label: string;
    sub?: string;
    x: number; y: number; w: number; h: number;   // viewBox 1180×460
    color?: 'electrico'|'cobalto'|'cielo'|'ok'|'warn'|'err' | string;
    icon?: string;
  }
  Edge = { from: string; to: string; label?: string; dashed?: boolean }
  Legend = { color: string; label: string }
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';

  type Node = {
    id: string;
    label: string;
    sub?: string;
    x: number; y: number; w: number; h: number;
    color?: string;
    icon?: string;
  };
  type Edge = { from: string; to: string; label?: string; dashed?: boolean };
  type LegendItem = { color: string; label: string };

  let {
    eyebrow = '',
    title = '',
    titleHighlight = '',
    nodes = [] as Node[],
    edges = [] as Edge[],
    legend = [] as LegendItem[],
    viewBoxWidth = 1180,
    viewBoxHeight = 460
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    nodes?: Node[];
    edges?: Edge[];
    legend?: LegendItem[];
    viewBoxWidth?: number;
    viewBoxHeight?: number;
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

  function resolveColor(c: string | undefined): string {
    if (!c) return 'var(--color-borde)';
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

  const nodeMap = $derived(Object.fromEntries(nodes.map((n) => [n.id, n])));

  type EdgePath = { d: string; dashed: boolean; label?: string; lx: number; ly: number; lw: number };

  const edgePaths = $derived.by<EdgePath[]>(() => {
    return edges
      .map((e) => {
        const a = nodeMap[e.from];
        const b = nodeMap[e.to];
        if (!a || !b) return null;
        const ay = a.y + a.h / 2;
        const by = b.y + b.h / 2;
        const x1 = a.x + a.w;
        const y1 = ay;
        const x2 = b.x;
        const y2 = by;
        const mid = (x1 + x2) / 2;
        const d = `M${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;
        const lx = (x1 + x2) / 2;
        const ly = (y1 + y2) / 2 - 8;
        const lw = (e.label?.length || 0) * 7.2 + 16;
        return { d, dashed: !!e.dashed, label: e.label, lx, ly, lw };
      })
      .filter((p): p is EdgePath => p !== null);
  });
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

  <div class="diagram-stage" style:aspect-ratio="{viewBoxWidth} / {viewBoxHeight}">
    <svg
      class="diagram-svg"
      viewBox="0 0 {viewBoxWidth} {viewBoxHeight}"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <marker id="csi-diagram-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--color-electrico)" />
        </marker>
      </defs>
      {#each edgePaths as e}
        <path
          d={e.d}
          stroke="var(--color-electrico)"
          stroke-width="1.6"
          fill="none"
          stroke-dasharray={e.dashed ? '6 4' : ''}
          marker-end="url(#csi-diagram-arrow)"
        />
        {#if e.label}
          <g transform="translate({e.lx} {e.ly})">
            <rect x={-(e.lw / 2)} y={-10} width={e.lw} height={20} rx={4}
              fill="var(--color-fondo)" stroke="var(--color-borde)" stroke-width="1" />
            <text x="0" y="4" font-family="var(--font-mono)" font-size="11"
              fill="var(--color-tinta2)" text-anchor="middle">{e.label}</text>
          </g>
        {/if}
      {/each}
    </svg>

    {#each nodes as n}
      {@const nc = resolveColor(n.color)}
      <div
        class="node"
        style:left="{(n.x / viewBoxWidth) * 100}%"
        style:top="{(n.y / viewBoxHeight) * 100}%"
        style:width="{(n.w / viewBoxWidth) * 100}%"
        style:height="{(n.h / viewBoxHeight) * 100}%"
        style:--node-color={nc}
      >
        <div class="node-head">
          {#if n.icon}<span class="node-icon">{n.icon}</span>{/if}
          <span class="node-label">{n.label}</span>
        </div>
        {#if n.sub}<div class="node-sub">{n.sub}</div>{/if}
      </div>
    {/each}
  </div>

  {#if legend.length}
    <div class="legend">
      {#each legend as l}
        <div class="legend-item">
          <span class="legend-swatch" style:background={resolveColor(l.color)}></span>
          <span class="legend-label">{l.label}</span>
        </div>
      {/each}
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

  .diagram-stage {
    position: relative;
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
  }
  .diagram-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .node {
    position: absolute;
    background: var(--color-fondo-elev);
    border: 1.5px solid var(--node-color);
    border-radius: 10px;
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--node-color) 18%, transparent),
      0 6px 18px rgba(0, 0, 0, 0.25);
  }
  .node-head { display: flex; align-items: center; gap: 8px; }
  .node-icon { font-size: 18px; line-height: 1; }
  .node-label {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 15px;
    color: var(--color-tinta);
    line-height: 1.1;
  }
  .node-sub {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-tinta3);
    line-height: 1.3;
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-tinta3);
  }
  .legend-swatch {
    width: 14px;
    height: 14px;
    border-radius: 3px;
    border: 1px solid color-mix(in srgb, currentColor 50%, transparent);
  }

  @media (max-width: 768px) {
    .node-label { font-size: 12px; }
    .node-sub { font-size: 9px; }
  }
</style>
