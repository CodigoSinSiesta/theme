<!--
  @codigosinsiesta/theme/slides/SlidePipeline.svelte
  V4 design — pipeline horizontal de pasos numerados separados por flechas →,
  con icon box en gradient y h5 + p centrados. Último paso opcionalmente "success"
  (acento verde).
  Portado de "Pipeline" en codigo-sin-siesta-design-system/project/kits/slide-deck/deck.css
  + Slide deck UI kit · Patterns.html (slide 06).

  Props:
    eyebrow:        string                                  — kicker
    title:          string                                  — título
    titleHighlight: string                                  — palabra del título a destacar
    intro:          string                                  — párrafo intro (opcional)
    steps:          Step[]                                  — pasos (3-5 ideal)

  Step = {
    label?: string;     // micro-eyebrow mono uppercase (ej. "INPUT", "RUN", "RETURN")
    icon?: string;      // emoji o glifo (renderizado dentro del icon box gradient)
    iconImg?: string;   // URL/path SVG (ej. "/icons/cpu-chip.svg") — pintado como <img>
    title: string;      // h5
    body?: string;      // descripción (acepta **strong** y `code`)
    accent?: 'electrico' | 'ok';   // 'ok' marca el paso como success (verde)
  }
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';

  type Step = {
    label?: string;
    icon?: string;
    iconImg?: string;
    title: string;
    body?: string;
    accent?: 'electrico' | 'ok';
  };

  let {
    eyebrow = '',
    title = '',
    titleHighlight = '',
    intro = '',
    steps = [] as Step[]
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    intro?: string;
    steps?: Step[];
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

  <div class="pipeline">
    {#each steps as s, i}
      <div class="step" class:is-success={s.accent === 'ok'}>
        <div class="step-icon">
          {#if s.iconImg}
            <img src={s.iconImg} alt="" />
          {:else if s.icon}
            <span class="emoji">{s.icon}</span>
          {:else}
            <span class="num">{String(i + 1).padStart(2, '0')}</span>
          {/if}
        </div>
        {#if s.label}<span class="step-label">{s.label}</span>{/if}
        <h5>{s.title}</h5>
        {#if s.body}<p>{@html renderInline(s.body)}</p>{/if}
      </div>
      {#if i < steps.length - 1}
        <div class="arrow" aria-hidden="true">→</div>
      {/if}
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

  .pipeline {
    display: flex;
    align-items: stretch;
    gap: 0;
  }

  .step {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: var(--spacing-lg) var(--spacing-md);
    background: rgba(30, 58, 138, 0.20);
    border: 1px solid rgba(96, 165, 250, 0.22);
    border-radius: 16px;
  }

  .step-icon {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.30), rgba(167, 139, 250, 0.20));
    border: 1px solid rgba(96, 165, 250, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-cielo);
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 1.4rem;
  }
  .step-icon img {
    width: 32px;
    height: 32px;
    /* Tinta los SVG outline (currentColor stroke) en cielo */
    filter: brightness(0) saturate(100%) invert(72%) sepia(54%) saturate(615%) hue-rotate(186deg) brightness(101%) contrast(96%);
  }
  .step-icon .emoji { font-size: 1.6rem; }

  .step.is-success .step-icon {
    background: linear-gradient(135deg, rgba(52, 211, 153, 0.30), rgba(59, 130, 246, 0.18));
    border-color: rgba(52, 211, 153, 0.45);
    color: var(--color-ok);
  }

  .step-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.20em;
    text-transform: uppercase;
    color: var(--color-tinta3);
  }
  .step.is-success .step-label { color: var(--color-ok); }

  .step h5 {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--color-tinta);
    text-align: center;
    line-height: 1.2;
  }
  .step p {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.45;
    color: var(--color-tinta2);
    text-align: center;
  }
  .step :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 1px 5px;
    background: rgba(96, 165, 250, 0.10);
    border-radius: 3px;
    color: var(--color-cielo);
  }

  .arrow {
    flex: 0 0 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-cielo);
    opacity: 0.7;
    font-family: var(--font-mono);
    font-size: 1.6rem;
    font-weight: 700;
  }

  @media (max-width: 900px) {
    .pipeline { flex-direction: column; }
    .arrow { transform: rotate(90deg); padding: 6px 0; flex-basis: auto; }
  }
</style>
