<!--
  Demo de BentoGrid. Sliders para cols + gap + toggle dense, y un grid de
  8 hijos de tamaños variados simulando lo que serán BentoCards.

  Nota: BentoCard llega en su propio PR. Aquí los hijos son simplemente
  divs estilizados con `grid-column: span N; grid-row: span M;` inline
  para mostrar el comportamiento del container.
-->
<script>
  import BentoGrid from '../../../src/layout/BentoGrid.svelte';

  let cols = $state(12);
  let gapPx = $state(20);
  let dense = $state(true);

  const gap = $derived(`${gapPx}px`);

  // 8 cards de tamaños mixtos — total spans ~36 col-units. Con dense
  // activado se compactan en filas más densas.
  const cards = [
    { label: 'Hero', tone: 'cielo',     colSpan: 8, rowSpan: 2 },
    { label: 'KPI 1', tone: 'electrico', colSpan: 4, rowSpan: 1 },
    { label: 'KPI 2', tone: 'cobalto',   colSpan: 4, rowSpan: 1 },
    { label: 'About', tone: 'tinta3',    colSpan: 6, rowSpan: 2 },
    { label: 'Stat', tone: 'ok',        colSpan: 3, rowSpan: 1 },
    { label: 'Stat', tone: 'warn',      colSpan: 3, rowSpan: 1 },
    { label: 'Tag', tone: 'cobalto',    colSpan: 3, rowSpan: 1 },
    { label: 'CTA', tone: 'electrico',  colSpan: 9, rowSpan: 1 }
  ];
</script>

<div class="demo">
  <div class="config">
    <label>
      cols: <output>{cols}</output>
      <input type="range" min="4" max="12" step="1" bind:value={cols} />
    </label>
    <label>
      gap: <output>{gapPx}px</output>
      <input type="range" min="0" max="48" step="2" bind:value={gapPx} />
    </label>
    <label class="check">
      <input type="checkbox" bind:checked={dense} />
      dense (grid-auto-flow)
    </label>
  </div>

  <div class="preview">
    <BentoGrid {cols} {gap} {dense} ariaLabel="Demo bento grid">
      {#each cards as c, i (i)}
        <div
          class="mock-card tone-{c.tone}"
          style="grid-column: span {Math.min(c.colSpan, cols)}; grid-row: span {c.rowSpan};"
        >
          <span class="mock-card-label">{c.label}</span>
          <span class="mock-card-meta">span {c.colSpan}×{c.rowSpan}</span>
        </div>
      {/each}
    </BentoGrid>
  </div>

  <p class="note">
    Los hijos de este demo son <code>&lt;div&gt;</code>s simulando cards —
    <code>BentoCard</code> llega en un PR aparte y encapsulará el patrón de
    <code>grid-column: span N</code> via su prop <code>size</code>.
  </p>
</div>

<style>
  .demo {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .config {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    padding: 12px 16px;
    background: var(--color-fondo-alt);
    border: 1px solid var(--color-borde);
    border-radius: 8px;
  }
  .config label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-tinta3);
    min-width: 160px;
  }
  .config label.check {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
  .config output {
    color: var(--color-cielo);
    font-weight: 600;
  }
  .config input[type='range'] {
    accent-color: var(--color-electrico);
  }
  .preview {
    padding: 16px;
    border: 1px dashed var(--color-borde);
    border-radius: 10px;
    background: color-mix(in oklab, var(--color-fondo) 60%, transparent);
    min-height: 240px;
  }
  .mock-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 14px 16px;
    min-height: 80px;
    border-radius: 8px;
    background: var(--color-fondo-alt);
    border: 1px solid var(--color-borde);
    color: var(--color-tinta);
    transition: border-color 150ms ease-out, transform 150ms ease-out;
  }
  .mock-card:hover {
    border-color: var(--color-electrico);
    transform: translateY(-1px);
  }
  .mock-card-label {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 14px;
    color: var(--color-tinta);
  }
  .mock-card-meta {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-tinta4);
  }
  .tone-cielo      { border-color: color-mix(in oklab, var(--color-cielo) 50%, var(--color-borde)); }
  .tone-electrico  { border-color: color-mix(in oklab, var(--color-electrico) 50%, var(--color-borde)); }
  .tone-cobalto    { border-color: color-mix(in oklab, var(--color-cobalto) 60%, var(--color-borde)); }
  .tone-tinta3     { border-color: var(--color-borde); }
  .tone-ok         { border-color: color-mix(in oklab, var(--color-ok) 50%, var(--color-borde)); }
  .tone-warn       { border-color: color-mix(in oklab, var(--color-warn) 50%, var(--color-borde)); }
  .note {
    color: var(--color-tinta3);
    font-size: 13px;
    line-height: 1.55;
    margin: 0;
  }
  .note code {
    background: var(--color-fondo-alt);
    padding: 1px 5px;
    border-radius: 3px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-cielo);
  }
</style>
