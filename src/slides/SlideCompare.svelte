<!--
  @codigosinsiesta/theme/slides/SlideCompare.svelte
  V4 design — A vs B con cards do/don't (rojo vs verde por defecto).
  Portado de CompareSlide en codigo-sin-siesta/project/src/css-slides.jsx.

  Props:
    eyebrow:        string                                   — kicker (opcional)
    title:          string                                   — título del slide
    titleHighlight: string                                   — palabra del título a destacar
    left:           CompareSide                              — lado izquierdo (por convención: "bad" / err)
    right:          CompareSide                              — lado derecho (por convención: "good" / ok)
    leftKind:       'err' | 'ok' | 'electrico' | 'neutral'   — accent del lado izquierdo (default err)
    rightKind:      'err' | 'ok' | 'electrico' | 'neutral'   — accent del lado derecho (default ok)

  CompareSide = { label, headline, items: string[], icon? }
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';

  type Kind = 'err' | 'ok' | 'electrico' | 'neutral';
  type Side = { label: string; headline: string; items: string[]; icon?: string };

  let {
    eyebrow = '',
    title = '',
    titleHighlight = '',
    left = { label: '', headline: '', items: [] } as Side,
    right = { label: '', headline: '', items: [] } as Side,
    leftKind = 'err' as Kind,
    rightKind = 'ok' as Kind
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    left?: Side;
    right?: Side;
    leftKind?: Kind;
    rightKind?: Kind;
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

  function defaultIcon(kind: Kind): string {
    if (kind === 'err') return '❌';
    if (kind === 'ok') return '✅';
    return '·';
  }
  function bullet(kind: Kind): string {
    if (kind === 'err') return '–';
    if (kind === 'ok') return '+';
    return '·';
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

  <div class="compare-row">
    <div class="card kind-{leftKind}">
      <div class="card-head">
        <span class="card-icon">{left.icon || defaultIcon(leftKind)}</span>
        <div>
          <div class="card-label">{left.label}</div>
          <div class="card-headline">{left.headline}</div>
        </div>
      </div>
      <ul class="items">
        {#each left.items as item}
          <li><span class="bullet">{bullet(leftKind)}</span><span>{item}</span></li>
        {/each}
      </ul>
    </div>

    <div class="vs-wrap" aria-hidden="true">
      <div class="vs">vs</div>
    </div>

    <div class="card kind-{rightKind}">
      <div class="card-head">
        <span class="card-icon">{right.icon || defaultIcon(rightKind)}</span>
        <div>
          <div class="card-label">{right.label}</div>
          <div class="card-headline">{right.headline}</div>
        </div>
      </div>
      <ul class="items">
        {#each right.items as item}
          <li><span class="bullet">{bullet(rightKind)}</span><span>{item}</span></li>
        {/each}
      </ul>
    </div>
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

  .compare-row {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--spacing-lg);
    align-items: stretch;
  }

  .card {
    background: var(--color-fondo-elev);
    border: 1px solid var(--color-borde);
    border-radius: 14px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  }
  .card-head {
    padding: 16px 22px;
    border-bottom: 1px solid var(--color-borde);
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .card-icon { font-size: 24px; line-height: 1; }
  .card-label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 600;
  }
  .card-headline {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 22px;
    color: var(--color-tinta);
    margin-top: 2px;
    line-height: 1.15;
  }

  .items {
    list-style: none;
    padding: 18px 22px;
    margin: 0;
    font-size: 15px;
    line-height: 1.5;
    color: var(--color-tinta);
    flex: 1;
  }
  .items li {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    align-items: flex-start;
  }
  .items li:last-child { margin-bottom: 0; }
  .bullet { font-weight: 700; margin-top: 2px; flex-shrink: 0; }

  /* ── Variantes por kind ── */
  .kind-err .card-head { background: var(--color-err-bg); }
  .kind-err .card-label, .kind-err .bullet { color: var(--color-err); }

  .kind-ok .card-head { background: var(--color-ok-bg); }
  .kind-ok .card-label, .kind-ok .bullet { color: var(--color-ok); }

  .kind-electrico .card-head { background: rgba(59,130,246,0.10); }
  .kind-electrico .card-label, .kind-electrico .bullet { color: var(--color-electrico); }

  .kind-neutral .card-head { background: var(--color-fondo-alt); }
  .kind-neutral .card-label, .kind-neutral .bullet { color: var(--color-tinta3); }

  /* ── pill central VS ── */
  .vs-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .vs {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--color-fondo-elev);
    border: 2px solid var(--color-borde);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 20px;
    color: var(--color-tinta2);
  }

  @media (max-width: 900px) {
    .compare-row {
      grid-template-columns: 1fr;
      gap: var(--spacing-md);
    }
    .vs-wrap { padding: 4px 0; }
    .vs { width: 48px; height: 48px; font-size: 16px; }
  }
</style>
