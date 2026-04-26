<!--
  @codigosinsiesta/theme/slides/SlideHero.svelte
  V4 design — slide de portada: eyebrow + título grande + subtítulo + tools row + author card + 3 orbs.

  Props:
    eyebrow:  string                                    — eyebrow superior (default: 'Código Sin Siesta · 2026')
    title:    string                                    — título principal (puede contener \n)
    titleHighlight: string                              — palabra del título a renderizar con gradiente
    subtitle: string                                    — subtítulo (puede contener \n)
    intro:    string                                    — párrafo introductorio (opcional)
    tools:    { label: string; highlight?: boolean }[] — pills de stack
    author:   { name; role?; avatarUrl?; links?: {url; label}[] }   — opcional
    showOrbs: boolean                                   — pinta 3 orbs decorativos (default: true)
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';

  type Tool = { label: string; highlight?: boolean };
  type Link = { url: string; label: string };
  type Author = { name: string; role?: string; avatarUrl?: string; links?: Link[] };

  let {
    eyebrow = 'Código Sin Siesta · 2026',
    title = '',
    titleHighlight = '',
    subtitle = '',
    intro = '',
    tools = [] as Tool[],
    author = undefined as Author | undefined,
    showOrbs = true
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    intro?: string;
    tools?: Tool[];
    author?: Author;
    showOrbs?: boolean;
  }>();

  // Si titleHighlight aparece en title, lo separa para envolverlo en .highlight
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

<SlideShell bgPreset="identidad">
  <div class="csi-eyebrow-row">
    <span class="dot" aria-hidden="true"></span>
    <span class="eyebrow-text">{eyebrow}</span>
  </div>

  <h1 class="title">
    {#if titleParts}
      {titleParts.before}<span class="highlight">{titleParts.highlight}</span>{titleParts.after}
    {:else}
      {title}
    {/if}
    {#if subtitle}<span class="subtitle-inline">{subtitle}</span>{/if}
  </h1>

  {#if intro}
    <p class="intro">{intro}</p>
  {/if}

  {#if tools.length > 0}
    <div class="tools-row">
      {#each tools as t}
        <span class="tool-badge" class:highlight-badge={t.highlight}>{t.label}</span>
      {/each}
    </div>
  {/if}

  {#if author}
    <div class="author-card">
      {#if author.avatarUrl}
        <img src={author.avatarUrl} alt={author.name} class="author-avatar" />
      {/if}
      <div class="author-info">
        <p class="author-name">{author.name}</p>
        {#if author.role}<p class="author-role">{author.role}</p>{/if}
        {#if author.links && author.links.length > 0}
          <div class="author-links">
            {#each author.links as l}
              <a href={l.url} target="_blank" rel="noopener noreferrer" class="author-link">{l.label}</a>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}

  {#if showOrbs}
    <div class="orb orb-1" aria-hidden="true"></div>
    <div class="orb orb-2" aria-hidden="true"></div>
    <div class="orb orb-3" aria-hidden="true"></div>
  {/if}
</SlideShell>

<style>
  .csi-eyebrow-row {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--color-cielo);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .dot {
    width: 8px; height: 8px;
    background: var(--color-electrico);
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(59,130,246,0.8);
    animation: csi-hero-pulse 2s ease-in-out infinite;
  }
  @keyframes csi-hero-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.6; transform: scale(0.85); }
  }

  .title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 6.5rem);
    font-weight: 900;
    line-height: 1.05;
    color: var(--color-tinta);
    margin: 0;
  }
  .subtitle-inline {
    display: block;
    font-size: clamp(1rem, 2.2vw, 1.6rem);
    font-weight: 500;
    opacity: 0.85;
    margin-top: var(--spacing-sm);
    line-height: 1.3;
  }
  .highlight {
    background: linear-gradient(135deg, var(--color-electrico), var(--color-cielo), #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .intro {
    font-size: clamp(1.05rem, 2.1vw, 1.5rem);
    opacity: 0.8;
    line-height: 1.65;
    max-width: 780px;
    margin: 0;
  }

  .tools-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }
  .tool-badge {
    padding: var(--spacing-sm) var(--spacing-lg);
    font-family: var(--font-mono);
    font-size: 0.9rem;
    font-weight: 600;
    background: rgba(30,58,138,0.4);
    border: 1px solid rgba(96,165,250,0.25);
    border-radius: 999px;
    color: var(--color-cielo);
    letter-spacing: 0.05em;
    backdrop-filter: blur(4px);
  }
  .highlight-badge {
    background: rgba(59,130,246,0.2);
    border-color: var(--color-electrico);
    color: var(--color-tinta);
    box-shadow: 0 0 12px rgba(59,130,246,0.3);
  }

  .author-card {
    display: flex;
    align-items: center;
    gap: var(--spacing-xl);
    padding: var(--spacing-xl) var(--spacing-2xl);
    background: var(--color-fondo-elev);
    border: 1px solid var(--color-borde);
    border-radius: var(--radius-lg);
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.3),
      0 8px 24px rgba(0, 0, 0, 0.15);
  }
  .author-avatar {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    flex-shrink: 0;
    object-fit: cover;
  }
  .author-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-tinta);
    margin: 0;
  }
  .author-role {
    font-size: 1rem;
    color: var(--color-cielo);
    opacity: 0.85;
    font-family: var(--font-mono);
    margin: 4px 0 0 0;
  }
  .author-links {
    display: flex;
    gap: var(--spacing-md);
    margin-top: var(--spacing-sm);
  }
  .author-link {
    font-size: 1.2rem;
    text-decoration: none;
    opacity: 0.7;
    transition: opacity 150ms ease-out;
  }
  .author-link:hover { opacity: 1; }

  /* Decorative orbs */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }
  .orb-1 {
    width: 500px; height: 500px;
    background: rgba(59,130,246,0.08);
    top: -100px; right: -100px;
    animation: csi-orb-float 12s ease-in-out infinite;
  }
  .orb-2 {
    width: 300px; height: 300px;
    background: rgba(96,165,250,0.06);
    bottom: 50px; right: 200px;
    animation: csi-orb-float 9s ease-in-out infinite reverse;
  }
  .orb-3 {
    width: 200px; height: 200px;
    background: rgba(167,139,250,0.05);
    bottom: -50px; left: 100px;
    animation: csi-orb-float 15s ease-in-out infinite;
  }
  @keyframes csi-orb-float {
    0%, 100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-30px) scale(1.05); }
  }

  @media (max-width: 768px) {
    .title { font-size: clamp(2.5rem, 11vw, 4.5rem); text-align: center; }
    .intro { text-align: center; }
    .tools-row { justify-content: center; gap: var(--spacing-xs); }
    .author-card { padding: var(--spacing-md) var(--spacing-lg); }
  }
</style>
