<!--
  @codigosinsiesta/theme/slides/SlideHandsOn.svelte
  V4 design — slide canónica para talleres: eyebrow píldora `⚡ N min` (warning),
  pasos numerados verticales con uno marcado como `current` (warning glow), bloque
  pre/code opcional por paso.
  Portado de "Hands-on" en codigo-sin-siesta-design-system/project/kits/slide-deck/deck.css
  + Slide deck UI kit · Patterns.html (slide 11).

  Props:
    eyebrow:        string                                  — texto del workshop pill (ej. "Hands-on · 25 min")
    title:          string                                  — título del taller
    titleHighlight: string                                  — palabra del título a destacar
    intro:          string                                  — párrafo intro (opcional)
    steps:          Step[]                                  — pasos del hands-on
    current:        number | null                           — índice 0-based del paso destacado

  Step = {
    title: string;          // h4
    body: string;           // descripción (acepta **strong** y `code`)
    code?: string;          // bloque shell con `$` prefix (acepta líneas con `# comment` y `✓ ok`)
    codeLang?: string;      // etiqueta opcional (default 'shell')
  }
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';

  type Step = {
    title: string;
    body: string;
    code?: string;
    codeLang?: string;
  };

  let {
    eyebrow = 'Hands-on · 25 min',
    title = '',
    titleHighlight = '',
    intro = '',
    steps = [] as Step[],
    current = null as number | null
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    intro?: string;
    steps?: Step[];
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

  function renderInline(s: string): string {
    return s
      .replaceAll(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replaceAll(/`([^`]+)`/g, '<code>$1</code>');
  }

  // Highlight muy ligero del bloque shell:
  //   $ prefix → prompt azul
  //   # ...   → comment dimmed
  //   ✓ ok    → ok-line verde
  //   ✗ / !   → warning ámbar
  function renderShell(code: string): string {
    return code
      .split('\n')
      .map((line) => {
        const escaped = line
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;');
        if (/^\s*#/.test(line)) return `<span class="com">${escaped}</span>`;
        if (/^\s*✓/.test(line)) return `<span class="ok">${escaped}</span>`;
        if (/^\s*[✗!⚠]/.test(line)) return `<span class="warn">${escaped}</span>`;
        // prompt at start
        return escaped.replace(/^\$/, '<span class="prompt">$</span>');
      })
      .join('\n');
  }
</script>

<SlideShell bgPreset="naranja">
  <div class="header">
    <span class="workshop-pill">{eyebrow}</span>
    <h2>
      {#if titleParts}
        {titleParts.before}<span class="highlight">{titleParts.highlight}</span>{titleParts.after}
      {:else}
        {title}
      {/if}
    </h2>
    {#if intro}<p class="intro">{@html renderInline(intro)}</p>{/if}
  </div>

  <div class="handson-list">
    {#each steps as s, i}
      <div class="step" class:is-current={current === i}>
        <span class="step-num">{String(i + 1).padStart(2, '0')}</span>
        <div class="step-body">
          <h4>{s.title}</h4>
          <p>{@html renderInline(s.body)}</p>
          {#if s.code}
            <pre class="shell" data-lang={s.codeLang || 'shell'}><code>{@html renderShell(s.code)}</code></pre>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</SlideShell>

<style>
  .header { display: flex; flex-direction: column; gap: var(--spacing-md); align-items: flex-start; }

  .workshop-pill {
    padding: 8px 18px;
    background: linear-gradient(135deg, rgba(245, 166, 35, 0.20), rgba(251, 191, 92, 0.10));
    border: 1px solid rgba(251, 191, 92, 0.35);
    border-radius: 999px;
    color: var(--color-warn);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .workshop-pill::before {
    content: '⚡';
    font-size: 1rem;
  }

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
  .intro :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 1px 5px;
    background: rgba(96, 165, 250, 0.10);
    border-radius: 3px;
    color: var(--color-cielo);
  }

  .handson-list {
    display: grid;
    gap: 14px;
  }

  .step {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: var(--spacing-lg);
    padding: var(--spacing-lg) var(--spacing-xl);
    background: rgba(30, 58, 138, 0.18);
    border: 1px solid var(--color-borde);
    border-radius: 16px;
    align-items: start;
  }
  .step.is-current {
    background: linear-gradient(135deg, rgba(245, 166, 35, 0.18), rgba(30, 58, 138, 0.30));
    border-color: rgba(251, 191, 92, 0.45);
    box-shadow: 0 0 28px rgba(245, 166, 35, 0.20);
  }

  .step-num {
    font-family: var(--font-mono);
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--color-cielo);
    letter-spacing: 0.05em;
    line-height: 1.1;
  }
  .step.is-current .step-num { color: var(--color-warn); }

  .step-body { min-width: 0; }
  .step h4 {
    margin: 0 0 6px 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--color-tinta);
    line-height: 1.2;
  }
  .step p {
    margin: 0 0 12px 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--color-tinta2);
  }
  .step p:last-child { margin-bottom: 0; }
  .step p :global(strong) { color: var(--color-tinta); }
  .step p :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 1px 5px;
    background: rgba(96, 165, 250, 0.10);
    border-radius: 3px;
    color: var(--color-cielo);
  }

  pre.shell {
    margin: 0;
    background: #0B1020;
    border: 1px solid var(--color-borde);
    border-radius: 10px;
    padding: 14px 18px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    line-height: 1.55;
    color: var(--color-tinta);
    overflow-x: auto;
    white-space: pre;
  }
  pre.shell :global(.prompt) { color: var(--color-cielo); margin-right: 8px; }
  pre.shell :global(.com)    { color: var(--color-tinta3); }
  pre.shell :global(.ok)     { color: var(--color-ok); }
  pre.shell :global(.warn)   { color: var(--color-warn); }

  @media (max-width: 768px) {
    .step { grid-template-columns: 40px 1fr; padding: var(--spacing-md); gap: var(--spacing-md); }
    .step-num { font-size: 1.2rem; }
  }
</style>
