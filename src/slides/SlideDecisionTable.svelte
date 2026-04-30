<!--
  @codigosinsiesta/theme/slides/SlideDecisionTable.svelte
  V4 design — tabla cuadrante glass con thead mono uppercase, fila resaltada y
  celdas yes/no/meh coloreadas.
  Portado de "Decision table" en codigo-sin-siesta-design-system/project/kits/slide-deck/deck.css
  + Slide deck UI kit · Patterns.html (slide 05).

  Props:
    eyebrow:        string                    — kicker
    title:          string                    — título
    titleHighlight: string                    — palabra del título a destacar
    columns:        string[]                  — cabeceras de columnas
    rows:           Row[]                     — filas
    highlightIndex: number | null             — índice 0-based de la fila a destacar
    rules:          string[]                  — bloque "reglas prácticas" debajo (opcional, lista numerada)
    rulesTitle:     string                    — título del bloque (default "Reglas prácticas")

  Row = { cells: Cell[] }
  Cell = string | { value: string; kind?: 'yes' | 'no' | 'meh' | 'plain'; align?: 'left' | 'center' | 'right' }

  Atajos: usar las strings literales '✓' / '✕' / '~' como cells aplica auto el kind correcto.
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';

  type Cell =
    | string
    | { value: string; kind?: 'yes' | 'no' | 'meh' | 'plain'; align?: 'left' | 'center' | 'right' };
  type Row = { cells: Cell[] };

  let {
    eyebrow = '',
    title = '',
    titleHighlight = '',
    columns = [] as string[],
    rows = [] as Row[],
    highlightIndex = null as number | null,
    rules = [] as string[],
    rulesTitle = 'Reglas prácticas'
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    columns?: string[];
    rows?: Row[];
    highlightIndex?: number | null;
    rules?: string[];
    rulesTitle?: string;
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

  function normalizeCell(c: Cell): { value: string; kind: 'yes' | 'no' | 'meh' | 'plain'; align: 'left' | 'center' | 'right' } {
    if (typeof c === 'string') {
      const v = c.trim();
      if (v === '✓') return { value: v, kind: 'yes', align: 'center' };
      if (v === '✕' || v === '✗' || v === 'x' || v === 'X') return { value: v, kind: 'no', align: 'center' };
      if (v === '~' || v === '≈' || v === '?') return { value: v, kind: 'meh', align: 'center' };
      return { value: c, kind: 'plain', align: 'left' };
    }
    return { value: c.value, kind: c.kind ?? 'plain', align: c.align ?? (c.kind && c.kind !== 'plain' ? 'center' : 'left') };
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
  </div>

  <table class="decision-table">
    <thead>
      <tr>
        {#each columns as h}
          <th>{h}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as r, i}
        <tr class:row-highlight={highlightIndex === i}>
          {#each r.cells as c}
            {@const n = normalizeCell(c)}
            <td class="cell-{n.kind}" style:text-align={n.align}>{n.value}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>

  {#if rules.length}
    <div class="rules">
      <Eyebrow>{rulesTitle}</Eyebrow>
      <ol>
        {#each rules as rule}
          <li>{@html renderInline(rule)}</li>
        {/each}
      </ol>
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

  .decision-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;
    font-family: var(--font-body);
  }
  .decision-table thead th {
    text-align: left;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-tinta3);
    padding: 0 18px 10px;
  }
  .decision-table tbody td {
    padding: 14px 18px;
    font-size: 1rem;
    color: var(--color-tinta);
    background: rgba(30, 58, 138, 0.18);
    border-top: 1px solid var(--color-borde);
    border-bottom: 1px solid var(--color-borde);
  }
  .decision-table tbody td:first-child {
    border-left: 1px solid var(--color-borde);
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    font-weight: 600;
  }
  .decision-table tbody td:last-child {
    border-right: 1px solid var(--color-borde);
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  .decision-table tbody tr.row-highlight td {
    background: rgba(59, 130, 246, 0.18);
    border-color: rgba(96, 165, 250, 0.55);
    box-shadow: inset 0 0 0 1px rgba(96, 165, 250, 0.30);
  }
  .decision-table tbody tr.row-highlight td:first-child {
    color: var(--color-cielo);
  }

  .cell-yes {
    color: var(--color-ok);
    font-family: var(--font-mono);
    font-weight: 700;
  }
  .cell-no {
    color: var(--color-err);
    font-family: var(--font-mono);
    font-weight: 700;
  }
  .cell-meh {
    color: var(--color-warn);
    font-family: var(--font-mono);
    font-weight: 700;
  }

  .rules {
    margin-top: var(--spacing-md);
    background: var(--color-fondo-elev);
    border: 1px solid var(--color-borde);
    border-radius: 12px;
    padding: var(--spacing-lg) var(--spacing-xl);
  }
  .rules ol {
    margin: var(--spacing-sm) 0 0 1.4em;
    padding: 0;
    color: var(--color-tinta2);
  }
  .rules li {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 6px;
  }
  .rules li:last-child { margin-bottom: 0; }
  .rules :global(strong) { color: var(--color-tinta); }
  .rules :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 1px 5px;
    background: rgba(96, 165, 250, 0.10);
    border-radius: 3px;
    color: var(--color-cielo);
  }

  @media (max-width: 768px) {
    .decision-table thead th, .decision-table tbody td { padding: 10px 12px; font-size: 0.85rem; }
  }
</style>
