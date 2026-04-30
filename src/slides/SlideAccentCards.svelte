<!--
  @codigosinsiesta/theme/slides/SlideAccentCards.svelte
  V4 design — grid de cards con border-top de color custom por card. Cada card
  lleva icon box (tinted con el accent), tag mono uppercase, h4, body.
  Variante más colorimétrica que ToolCard, pensada para "categorías distintas"
  (MCP primitives, capas, tipos de tool).
  Portado de "Border-top accent cards" en codigo-sin-siesta-design-system/project/kits/slide-deck/deck.css
  + Slide deck UI kit · Patterns.html (slide 12).

  Props:
    eyebrow:        string                                    — kicker
    title:          string                                    — título
    titleHighlight: string                                    — palabra del título a destacar
    cards:          AccentCard[]                              — 3-4 cards
    columns:        2 | 3 | 4                                 — columnas (default 4)

  AccentCard = {
    accent: string;     // '#60A5FA' | 'electrico' | 'ok' | 'warn' | 'err' | 'cielo' | 'cobalto' | 'violeta'
    icon?: string;      // letra/emoji renderizado en icon box (ej. 'T', 'R', '🔧')
    iconImg?: string;   // path SVG, p.ej. /icons/cpu-chip.svg
    tag?: string;       // pequeño mono uppercase
    title: string;      // h4
    body: string;       // descripción (acepta **strong** y `code`)
  }
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';

  type AccentCard = {
    accent: string;
    icon?: string;
    iconImg?: string;
    tag?: string;
    title: string;
    body: string;
  };

  let {
    eyebrow = '',
    title = '',
    titleHighlight = '',
    cards = [] as AccentCard[],
    columns = 4 as 2 | 3 | 4
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    cards?: AccentCard[];
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

  function resolveAccent(c: string): string {
    const known: Record<string, string> = {
      electrico: 'var(--color-electrico)',
      cobalto:   'var(--color-cobalto)',
      cielo:     'var(--color-cielo)',
      cielo2:    'var(--color-cielo2)',
      ok:        'var(--color-ok)',
      warn:      'var(--color-warn)',
      err:       'var(--color-err)',
      violeta:   '#a78bfa'
    };
    return known[c] || c;
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

  <div class="accent-grid" style:--cols={columns}>
    {#each cards as c}
      {@const accent = resolveAccent(c.accent)}
      <div class="card" style:--accent={accent}>
        <div class="icon-box">
          {#if c.iconImg}
            <img src={c.iconImg} alt="" />
          {:else if c.icon}
            <span>{c.icon}</span>
          {/if}
        </div>
        {#if c.tag}<span class="tag">{c.tag}</span>{/if}
        <h4>{c.title}</h4>
        <p>{@html renderInline(c.body)}</p>
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

  .accent-grid {
    display: grid;
    grid-template-columns: repeat(var(--cols, 4), 1fr);
    gap: var(--spacing-lg);
  }

  .card {
    position: relative;
    background: rgba(30, 58, 138, 0.20);
    border: 1px solid rgba(96, 165, 250, 0.22);
    border-top: 4px solid var(--accent);
    border-radius: 14px;
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: transform var(--transition-base), border-color var(--transition-base);
  }
  .card:hover { transform: translateY(-2px); }

  .icon-box {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: color-mix(in srgb, var(--accent) 22%, transparent);
    border: 1px solid color-mix(in srgb, var(--accent) 50%, transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 1.05rem;
    color: var(--accent);
  }
  .icon-box img {
    width: 22px;
    height: 22px;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
  }

  h4 {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.15rem;
    color: var(--color-tinta);
    line-height: 1.2;
  }
  p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--color-tinta);
    opacity: 0.78;
  }
  p :global(strong) { color: var(--color-tinta); opacity: 1; }
  p :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 1px 5px;
    background: rgba(96, 165, 250, 0.10);
    border-radius: 3px;
    color: var(--color-cielo);
  }

  @media (max-width: 1024px) {
    .accent-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .accent-grid { grid-template-columns: 1fr; }
  }
</style>
