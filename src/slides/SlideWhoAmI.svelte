<!--
  @codigosinsiesta/theme/slides/SlideWhoAmI.svelte
  V4 design — speaker card grande con avatar circular + bio + tags + handles +
  callout opcional. Layout 2-cols (avatar | contenido).
  Portado de WhoAmISlide en codigo-sin-siesta/project/src/css-slides.jsx.

  Props:
    speaker:        Speaker            — datos del ponente
    eyebrow:        string             — kicker (default '¿quién soy?')
    headlineFallback: string           — h1 si speaker.headline está vacío

  Speaker = {
    name:        string;
    role?:       string;
    avatarUrl?:  string;             // si presente, se usa como <img>; si no, iniciales
    headline?:   string;             // h1 grande; si vacío usa headlineFallback
    bio?:        string;             // párrafo principal (acepta **strong** y `code`)
    tags?:       string[];           // chips #tag al pie de la bio
    handles?:    { icon: string; value: string; url?: string }[];
    callout?:    { kind?: 'info' | 'ok' | 'warn' | 'err'; title?: string; body: string };
  }
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';
  import Callout from '../components/Callout.svelte';

  type CalloutKind = 'info' | 'ok' | 'warn' | 'err';
  type Handle = { icon: string; value: string; url?: string };
  type Speaker = {
    name: string;
    role?: string;
    avatarUrl?: string;
    headline?: string;
    bio?: string;
    tags?: string[];
    handles?: Handle[];
    callout?: { kind?: CalloutKind; title?: string; body: string };
  };

  let {
    speaker = { name: '' } as Speaker,
    eyebrow = '¿quién soy?',
    headlineFallback = 'Construyo software con criterio.'
  } = $props<{
    speaker?: Speaker;
    eyebrow?: string;
    headlineFallback?: string;
  }>();

  const initials = $derived(
    (speaker.name || '')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0])
      .join('')
      .toUpperCase() || '·'
  );

  function renderInline(s: string): string {
    return s
      .replaceAll(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replaceAll(/`([^`]+)`/g, '<code>$1</code>');
  }
</script>

<SlideShell bgPreset="identidad">
  <div class="whoami">
    <div class="avatar-col">
      <div class="avatar">
        {#if speaker.avatarUrl}
          <img src={speaker.avatarUrl} alt={speaker.name} />
        {:else}
          <span class="initials">{initials}</span>
        {/if}
      </div>
      <div class="name-block">
        <div class="name">{speaker.name}</div>
        {#if speaker.role}<div class="role">{speaker.role}</div>{/if}
      </div>
      {#if speaker.handles?.length}
        <div class="handles">
          {#each speaker.handles as h}
            {#if h.url}
              <a class="handle" href={h.url} target="_blank" rel="noopener">
                <span class="icon">{h.icon}</span>
                <span class="value">{h.value}</span>
              </a>
            {:else}
              <span class="handle">
                <span class="icon">{h.icon}</span>
                <span class="value">{h.value}</span>
              </span>
            {/if}
          {/each}
        </div>
      {/if}
    </div>

    <div class="bio-col">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{speaker.headline || headlineFallback}</h1>
      {#if speaker.bio}<p class="bio">{@html renderInline(speaker.bio)}</p>{/if}
      {#if speaker.tags?.length}
        <div class="tags">
          {#each speaker.tags as t}
            <span class="tag">#{t}</span>
          {/each}
        </div>
      {/if}
      {#if speaker.callout}
        <div class="callout-wrap">
          <Callout kind={speaker.callout.kind || 'info'} title={speaker.callout.title}>
            {@html renderInline(speaker.callout.body)}
          </Callout>
        </div>
      {/if}
    </div>
  </div>
</SlideShell>

<style>
  .whoami {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: var(--spacing-2xl);
    align-items: center;
    min-height: 60vh;
  }

  .avatar-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
  }

  .avatar {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-electrico), var(--color-cobalto));
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: 700;
    box-shadow:
      0 4px 24px rgba(59, 130, 246, 0.4),
      0 0 0 3px var(--color-fondo-alt);
    overflow: hidden;
  }
  .avatar img { width: 100%; height: 100%; object-fit: cover; }
  .initials { font-size: 4.5rem; }

  .name-block { text-align: center; }
  .name {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.4rem;
    color: var(--color-tinta);
  }
  .role {
    font-size: 0.9rem;
    color: var(--color-tinta2);
    margin-top: 4px;
  }

  .handles {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }
  .handle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 11px;
    border: 1px solid var(--color-borde);
    border-radius: 999px;
    background: var(--color-fondo-elev);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--color-tinta2);
    text-decoration: none;
    transition: border-color var(--transition-base);
  }
  .handle:hover { border-color: var(--color-electrico); color: var(--color-cielo); }
  .handle .icon { font-size: 0.9rem; }

  .bio-col { display: flex; flex-direction: column; gap: var(--spacing-md); }

  h1 {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(1.8rem, 4.5vw, 3rem);
    line-height: 1.1;
    color: var(--color-tinta);
    letter-spacing: -0.015em;
  }
  .bio {
    margin: 0;
    font-size: clamp(0.95rem, 1.4vw, 1.1rem);
    line-height: 1.6;
    color: var(--color-tinta2);
    max-width: 640px;
  }
  .bio :global(strong) { color: var(--color-tinta); }
  .bio :global(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 1px 5px;
    background: rgba(96, 165, 250, 0.10);
    border-radius: 3px;
    color: var(--color-cielo);
  }

  .tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .tag {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(96, 165, 250, 0.12);
    color: var(--color-cielo);
    border: 1px solid rgba(96, 165, 250, 0.30);
  }

  .callout-wrap { margin-top: var(--spacing-sm); }

  @media (max-width: 900px) {
    .whoami { grid-template-columns: 1fr; gap: var(--spacing-xl); }
    .avatar { width: 150px; height: 150px; }
    .initials { font-size: 3rem; }
  }
</style>
