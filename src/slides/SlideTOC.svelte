<!--
  @codigosinsiesta/theme/slides/SlideTOC.svelte
  V4 design — agenda con chapter cards en grid 2-cols.

  Props:
    eyebrow: string                                                      — default 'Agenda'
    title:   string                                                      — título del slide
    titleHighlight: string                                                — palabra del título a destacar con gradiente
    lead:    string                                                      — párrafo intro opcional
    chapters: { title: string; body?: string; duration?: string }[]      — items de la agenda
    current:  number | null                                              — índice 0-based del current; null = vista global
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';

  type Chapter = { title: string; body?: string; duration?: string };

  let {
    eyebrow = 'Agenda',
    title = '',
    titleHighlight = '',
    lead = '',
    chapters = [] as Chapter[],
    current = null as number | null
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    lead?: string;
    chapters?: Chapter[];
    current?: number | null;
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
</script>

<SlideShell bgPreset="azul">
  <div class="header">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2>
      {#if titleParts}
        {titleParts.before}<span class="highlight">{titleParts.highlight}</span>{titleParts.after}
      {:else}
        {title}
      {/if}
    </h2>
    {#if lead}<p class="lead">{@html lead}</p>{/if}
  </div>

  <div class="chapters">
    {#each chapters as c, i}
      {@const isCurrent = current === i}
      {@const isPast = current != null && i < current}
      <div class="chapter" class:is-current={isCurrent} class:is-past={isPast}>
        <div class="ch-num">{String(i + 1).padStart(2, '0')}</div>
        <div class="ch-body">
          <div class="ch-title">{c.title}</div>
          {#if c.body}<div class="ch-desc">{c.body}</div>{/if}
        </div>
        {#if c.duration}<div class="ch-duration">{c.duration}</div>{/if}
        {#if isPast}<div class="ch-check">✓</div>{/if}
      </div>
    {/each}
  </div>
</SlideShell>

<style>
  .header { display: flex; flex-direction: column; gap: var(--spacing-md); }
  h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.4rem);
    line-height: 1.1;
    color: var(--color-tinta);
  }
  .highlight {
    background: linear-gradient(135deg, var(--color-electrico), var(--color-cielo));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .lead {
    font-size: clamp(1rem, 1.5vw, 1.1rem);
    opacity: 0.85;
    max-width: 820px;
    margin: 0;
    line-height: 1.6;
    color: var(--color-tinta2);
  }
  .lead :global(strong) { color: var(--color-tinta); }

  .chapters { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .chapter {
    background: var(--color-fondo-elev);
    border: 1px solid var(--color-borde);
    border-radius: 10px;
    padding: 16px 20px;
    display: flex;
    gap: 14px;
    align-items: center;
    transition: border-color 300ms ease-out, box-shadow 300ms ease-out;
  }
  .chapter:hover {
    border-color: var(--color-electrico);
    box-shadow: 0 0 0 1px rgba(59,130,246,0.25);
  }
  .chapter.is-current {
    background: linear-gradient(135deg, var(--color-cobalto), var(--color-azul));
    border-color: var(--color-electrico);
    box-shadow: 0 0 0 1px var(--color-electrico), 0 12px 30px rgba(59,130,246,0.25);
  }
  .chapter.is-past { opacity: 0.5; }

  .ch-num {
    flex-shrink: 0;
    width: 44px; height: 44px;
    border-radius: 10px;
    background: rgba(51,65,85,0.5);
    color: var(--color-cielo);
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-borde2);
  }
  .chapter.is-current .ch-num {
    background: rgba(255,255,255,0.20);
    color: #fff;
    border-color: rgba(255,255,255,0.30);
  }

  .ch-body { flex: 1; min-width: 0; }
  .ch-title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 17px;
    color: var(--color-tinta);
    line-height: 1.2;
  }
  .ch-desc {
    font-size: 12px;
    color: var(--color-tinta3);
    margin-top: 3px;
    line-height: 1.45;
  }
  .chapter.is-current .ch-title { color: #fff; }
  .chapter.is-current .ch-desc { color: rgba(255,255,255,0.85); }

  .ch-duration {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-tinta3);
    border: 1px solid var(--color-borde);
    padding: 4px 10px;
    border-radius: 99px;
    flex-shrink: 0;
  }
  .chapter.is-current .ch-duration {
    color: rgba(255,255,255,0.85);
    border-color: rgba(255,255,255,0.30);
  }

  .ch-check { color: var(--color-ok); font-size: 18px; font-weight: 700; }

  @media (max-width: 768px) {
    .chapters { grid-template-columns: 1fr; }
    h2 { font-size: clamp(1.6rem, 6vw, 2.4rem); }
    .ch-num { width: 36px; height: 36px; font-size: 14px; }
    .ch-title { font-size: 15px; }
  }
</style>
