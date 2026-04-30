<!--
  @codigosinsiesta/theme/slides/SlidePatternGrid.svelte
  V4 design — grid de cards-pattern con mini-SVG (~200×120) + título + descripción.
  Portado de "Pattern grid" en codigo-sin-siesta-design-system/project/kits/slide-deck/deck.css
  + Slide deck UI kit · Patterns.html (slide 02).

  Cinco SVGs built-in para los patrones agénticos típicos:
    'chain' | 'fan-out' | 'fan-in' | 'orchestrator-workers' | 'eval-loop'

  Cada pattern también puede traer su propio SVG inline (`svg: '<svg…>'`) para
  diagramas custom; built-in se usa si no se pasa.

  Props:
    eyebrow:        string                                — kicker
    title:          string                                — título
    titleHighlight: string                                — palabra del título a destacar
    intro:          string                                — párrafo intro (opcional)
    patterns:       Pattern[]                             — 3-6 patrones (cols 2/3/4)
    columns:        2 | 3 | 4                             — columnas (default 3)

  Pattern = {
    type?: 'chain' | 'fan-out' | 'fan-in' | 'orchestrator-workers' | 'eval-loop' | 'custom';
    svg?: string;                       // inline SVG markup, requerido si type='custom'
    title: string;                      // h4
    body: string;                       // descripción (acepta **strong** y `code`)
    accent?: boolean;                   // pinta el primer/principal node como --node-accent (violeta)
  }
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';

  type PatternType =
    | 'chain'
    | 'fan-out'
    | 'fan-in'
    | 'orchestrator-workers'
    | 'eval-loop'
    | 'custom';

  type Pattern = {
    type?: PatternType;
    svg?: string;
    title: string;
    body: string;
    accent?: boolean;
  };

  let {
    eyebrow = '',
    title = '',
    titleHighlight = '',
    intro = '',
    patterns = [] as Pattern[],
    columns = 3 as 2 | 3 | 4
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    intro?: string;
    patterns?: Pattern[];
    columns?: 2 | 3 | 4;
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

  function renderInline(s: string): string {
    return s
      .replaceAll(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replaceAll(/`([^`]+)`/g, '<code>$1</code>');
  }

  // SVGs built-in — viewBox 200×120, clases .node / .node-accent / .edge / .edge-arrow
  const ARROW_DEF = '<defs><marker id="csi-pg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="edge-arrow"/></marker></defs>';

  function builtinSvg(type: PatternType, accent: boolean): string {
    const a = accent ? 'node-accent' : 'node';
    if (type === 'chain') {
      return `<svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">${ARROW_DEF}
        <circle cx="30" cy="60" r="18" class="${a}"/>
        <line x1="48" y1="60" x2="82" y2="60" class="edge" marker-end="url(#csi-pg-arrow)"/>
        <circle cx="100" cy="60" r="18" class="node"/>
        <line x1="118" y1="60" x2="152" y2="60" class="edge" marker-end="url(#csi-pg-arrow)"/>
        <circle cx="170" cy="60" r="18" class="node"/>
      </svg>`;
    }
    if (type === 'fan-out') {
      return `<svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">${ARROW_DEF}
        <circle cx="30" cy="60" r="18" class="${a}"/>
        <path d="M48,60 Q90,20 152,28" class="edge" marker-end="url(#csi-pg-arrow)"/>
        <path d="M48,60 L152,60" class="edge" marker-end="url(#csi-pg-arrow)"/>
        <path d="M48,60 Q90,100 152,92" class="edge" marker-end="url(#csi-pg-arrow)"/>
        <circle cx="170" cy="28" r="14" class="node"/>
        <circle cx="170" cy="60" r="14" class="node"/>
        <circle cx="170" cy="92" r="14" class="node"/>
      </svg>`;
    }
    if (type === 'fan-in') {
      return `<svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">${ARROW_DEF}
        <circle cx="30" cy="28" r="14" class="node"/>
        <circle cx="30" cy="60" r="14" class="node"/>
        <circle cx="30" cy="92" r="14" class="node"/>
        <path d="M48,28 Q90,40 152,56" class="edge" marker-end="url(#csi-pg-arrow)"/>
        <path d="M48,60 L152,60" class="edge" marker-end="url(#csi-pg-arrow)"/>
        <path d="M48,92 Q90,80 152,64" class="edge" marker-end="url(#csi-pg-arrow)"/>
        <circle cx="170" cy="60" r="18" class="${a}"/>
      </svg>`;
    }
    if (type === 'orchestrator-workers') {
      return `<svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">${ARROW_DEF}
        <circle cx="100" cy="30" r="18" class="${a}"/>
        <path d="M88,46 Q60,70 42,92" class="edge" marker-end="url(#csi-pg-arrow)"/>
        <path d="M100,48 L100,82" class="edge" marker-end="url(#csi-pg-arrow)"/>
        <path d="M112,46 Q140,70 158,92" class="edge" marker-end="url(#csi-pg-arrow)"/>
        <circle cx="40" cy="100" r="13" class="node"/>
        <circle cx="100" cy="100" r="13" class="node"/>
        <circle cx="160" cy="100" r="13" class="node"/>
      </svg>`;
    }
    if (type === 'eval-loop') {
      return `<svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">${ARROW_DEF}
        <circle cx="55" cy="60" r="18" class="${a}"/>
        <line x1="73" y1="60" x2="125" y2="60" class="edge" marker-end="url(#csi-pg-arrow)"/>
        <circle cx="145" cy="60" r="18" class="node"/>
        <path d="M145,42 Q155,18 100,18 Q45,18 55,42" class="edge" marker-end="url(#csi-pg-arrow)" stroke-dasharray="4 4"/>
      </svg>`;
    }
    return '';
  }

  function svgFor(p: Pattern): string {
    if (p.type === 'custom' || (!p.type && p.svg)) return p.svg ?? '';
    return builtinSvg((p.type ?? 'chain') as PatternType, !!p.accent);
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

  <div class="pattern-grid" style:--cols={columns}>
    {#each patterns as p}
      <div class="pattern-card">
        <div class="diagram">{@html svgFor(p)}</div>
        <h4>{p.title}</h4>
        <p>{@html renderInline(p.body)}</p>
      </div>
    {/each}
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
  .intro {
    font-size: clamp(0.95rem, 1.4vw, 1.1rem);
    color: var(--color-tinta2);
    line-height: 1.6;
    max-width: 880px;
    margin: 0;
  }
  .intro :global(strong) { color: var(--color-tinta); }

  .pattern-grid {
    display: grid;
    grid-template-columns: repeat(var(--cols, 3), 1fr);
    gap: var(--spacing-xl);
  }

  .pattern-card {
    background: rgba(30, 58, 138, 0.20);
    border: 1px solid rgba(96, 165, 250, 0.22);
    border-radius: 18px;
    padding: var(--spacing-lg);
    backdrop-filter: blur(8px);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .diagram {
    width: 100%;
    aspect-ratio: 1.6 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(10, 22, 40, 0.45);
    border: 1px solid rgba(96, 165, 250, 0.12);
    border-radius: 12px;
    padding: 14px;
  }
  .diagram :global(svg) { width: 100%; height: 100%; }

  /* SVG diagram defaults (apply inside .diagram svg) */
  .diagram :global(.node) {
    fill: rgba(59, 130, 246, 0.30);
    stroke: var(--color-cielo);
    stroke-width: 2;
  }
  .diagram :global(.node-accent) {
    fill: rgba(167, 139, 250, 0.35);
    stroke: #a78bfa;
    stroke-width: 2;
  }
  .diagram :global(.edge) {
    fill: none;
    stroke: var(--color-cielo);
    stroke-width: 2;
    opacity: 0.7;
  }
  .diagram :global(.edge-arrow) { fill: var(--color-cielo); }

  .pattern-card h4 {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.15rem;
    color: var(--color-tinta);
    line-height: 1.2;
  }
  .pattern-card p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--color-tinta2);
  }
  .pattern-card :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 1px 5px;
    background: rgba(96, 165, 250, 0.10);
    border-radius: 3px;
    color: var(--color-cielo);
  }

  @media (max-width: 1024px) {
    .pattern-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .pattern-grid { grid-template-columns: 1fr; }
  }
</style>
