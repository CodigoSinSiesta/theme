<!--
  @codigosinsiesta/theme/layout/SiteHeader

  Top bar del sitio: logo (owl + wordmark de v0.6.0), nav links, slot
  opcional para controles (a11y/palette), y atajos de teclado `Alt+1..9`
  registrados automáticamente para los primeros 9 links vía `useKeyboardNav`.

  Responsive: en `<= 768px` colapsa el nav dentro de un `<details>` nativo
  (sin JS custom de hamburger) con icono `bars-3` de v0.6.0.

  Sticky top con glassmorphism — backdrop-filter blur sobre fondo-alt.

  Uso:
    const links = [
      { href: '#hero',    label: 'Inicio' },
      { href: '#about',   label: 'Sobre mí' },
      { href: '#projects', label: 'Proyectos' }
    ];

    <SiteHeader {links} activeHref="#hero" logoVariant="both">
      {#snippet controls()}
        <button>🌗 Light</button>
        <button aria-label="Accesibilidad">♿</button>
      {/snippet}
    </SiteHeader>
-->

<script lang="ts">
  import type { Snippet } from 'svelte';
  import owlSvg from '../assets/logo-owl-electric.svg?raw';
  import wordmarkSvg from '../assets/logo-wordmark.svg?raw';
  import barsSvg from '../icons/bars-3.svg?raw';
  import { useKeyboardNav } from '../composables/useKeyboardNav.svelte.js';

  type Link = { href: string; label: string };
  type LogoVariant = 'owl' | 'wordmark' | 'both';

  let {
    links = [] as Link[],
    activeHref = '',
    logoVariant = 'both' as LogoVariant,
    homeHref = '/',
    keyboardShortcuts = true,
    ariaLabel = 'Navegación principal',
    controls,
    logo
  } = $props<{
    links?: Link[];
    activeHref?: string;
    logoVariant?: LogoVariant;
    homeHref?: string;
    keyboardShortcuts?: boolean;
    ariaLabel?: string;
    controls?: Snippet;
    logo?: Snippet;
  }>();

  function isExternal(href: string): boolean {
    return /^(https?:|mailto:|tel:)/i.test(href);
  }

  function activateLink(href: string) {
    if (typeof window === 'undefined') return;
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el && 'scrollIntoView' in el) {
        (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.location.href = href;
    }
  }

  // Registra Alt+1..9 para los primeros 9 links. Getter para que el array
  // reactivo siga propagando cambios al composable.
  useKeyboardNav(() =>
    keyboardShortcuts
      ? links.slice(0, 9).map((link, i) => ({
          key: String(i + 1),
          modifier: 'alt',
          label: `Ir a ${link.label}`,
          handler: () => activateLink(link.href)
        }))
      : []
  );
</script>

<header class="csi-site-header">
  <div class="csi-site-header__inner">
    <a class="csi-site-header__brand" href={homeHref} aria-label="Inicio">
      {#if logo}
        {@render logo()}
      {:else}
        {#if logoVariant === 'owl' || logoVariant === 'both'}
          <span class="csi-site-header__owl" aria-hidden="true">{@html owlSvg}</span>
        {/if}
        {#if logoVariant === 'wordmark' || logoVariant === 'both'}
          <span class="csi-site-header__wordmark" aria-hidden="true">{@html wordmarkSvg}</span>
        {/if}
      {/if}
    </a>

    <!--
      Desktop: nav + controls inline (siempre visibles).
      Mobile: ambos colapsan dentro de <details> nativo.
      Renderizamos los nodos dos veces porque el UA stylesheet de details
      oculta non-summary children cuando no está [open], y `display: contents`
      en el details no override esa regla de forma fiable cross-browser.
      Coste DOM mínimo (links son <a> simples).
    -->
    <nav class="csi-site-header__nav csi-site-header__nav--desktop" aria-label={ariaLabel}>
      {#each links.slice(0, 9) as link, i (link.href)}
        {@const external = isExternal(link.href)}
        <a
          class="csi-site-header__link"
          href={link.href}
          aria-current={activeHref === link.href ? 'page' : undefined}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          <span>{link.label}</span>
          {#if keyboardShortcuts}
            <kbd class="csi-site-header__kbd" aria-hidden="true">Alt+{i + 1}</kbd>
          {/if}
        </a>
      {/each}
    </nav>

    {#if controls}
      <div class="csi-site-header__controls csi-site-header__controls--desktop">
        {@render controls()}
      </div>
    {/if}

    <details class="csi-site-header__menu csi-site-header__menu--mobile">
      <summary class="csi-site-header__hamburger" aria-label="Abrir menú">
        <span class="csi-site-header__hamburger-icon" aria-hidden="true">{@html barsSvg}</span>
      </summary>

      <nav class="csi-site-header__nav csi-site-header__nav--mobile" aria-label="{ariaLabel} (mobile)">
        {#each links.slice(0, 9) as link, i (link.href)}
          {@const external = isExternal(link.href)}
          <a
            class="csi-site-header__link"
            href={link.href}
            aria-current={activeHref === link.href ? 'page' : undefined}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            <span>{link.label}</span>
            {#if keyboardShortcuts}
              <kbd class="csi-site-header__kbd" aria-hidden="true">Alt+{i + 1}</kbd>
            {/if}
          </a>
        {/each}
      </nav>

      {#if controls}
        <div class="csi-site-header__controls csi-site-header__controls--mobile">
          {@render controls()}
        </div>
      {/if}
    </details>
  </div>
</header>

<style>
  .csi-site-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: color-mix(in oklab, var(--color-fondo-alt) 75%, transparent);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--color-borde);
  }
  .csi-site-header__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 14px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .csi-site-header__brand {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: var(--color-tinta);
    flex-shrink: 0;
  }
  .csi-site-header__owl :global(svg) {
    height: 32px;
    width: auto;
    display: block;
  }
  .csi-site-header__wordmark :global(svg) {
    height: 22px;
    width: auto;
    display: block;
  }

  /* Desktop layout — nav + controls inline, mobile details oculto. */
  .csi-site-header__nav--desktop {
    display: flex;
    gap: 4px;
    align-items: center;
    flex-wrap: wrap;
  }
  .csi-site-header__controls--desktop {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .csi-site-header__menu--mobile {
    display: none;
  }

  /* Shared nav styles (apply to both desktop + mobile copies) */
  .csi-site-header__nav {
    align-items: center;
  }
  .csi-site-header__link {
    color: var(--color-tinta2);
    text-decoration: none;
    padding: 8px 14px;
    border-radius: 6px;
    font-family: var(--font-body);
    font-size: 14px;
    transition: color 150ms ease-out, background 150ms ease-out;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .csi-site-header__link:hover {
    color: var(--color-cielo);
    background: color-mix(in oklab, var(--color-electrico) 12%, transparent);
  }
  .csi-site-header__link[aria-current='page'] {
    color: var(--color-cielo);
    background: color-mix(in oklab, var(--color-electrico) 18%, transparent);
  }
  .csi-site-header__kbd {
    font-family: var(--font-mono);
    font-size: 10px;
    /* WCAG 2.1 AA texto pequeño: ratio >= 4.5:1. tinta4 (#64748b) sobre
       fondo (#0f172a) da 3.75 — insuficiente. tinta3 (#94a3b8) da 6.5 — OK. */
    color: var(--color-tinta3);
    background: var(--color-fondo);
    padding: 2px 5px;
    border-radius: 3px;
    border: 1px solid var(--color-borde);
  }
  /* Mobile — details collapses; summary becomes the hamburger toggle. */
  @media (max-width: 768px) {
    .csi-site-header__nav--desktop,
    .csi-site-header__controls--desktop {
      display: none;
    }
    .csi-site-header__menu--mobile {
      display: block;
      position: relative;
    }
    .csi-site-header__hamburger {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      padding: 8px;
      color: var(--color-tinta);
      list-style: none;
      border-radius: 6px;
    }
    .csi-site-header__hamburger::-webkit-details-marker {
      display: none;
    }
    .csi-site-header__hamburger::marker {
      content: '';
    }
    .csi-site-header__hamburger:hover {
      background: var(--color-fondo);
    }
    .csi-site-header__hamburger-icon :global(svg) {
      width: 22px;
      height: 22px;
      display: block;
    }
    .csi-site-header__menu--mobile[open] {
      /* Absolute positioned dropdown panel — anchored al header inner */
    }
    .csi-site-header__menu--mobile[open] .csi-site-header__nav--mobile {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 2px;
      background: var(--color-fondo-alt);
      border: 1px solid var(--color-borde);
      border-radius: 8px;
      padding: 8px;
      min-width: 220px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
      z-index: 90;
    }
    .csi-site-header__menu--mobile[open] .csi-site-header__controls--mobile {
      display: flex;
      flex-direction: row;
      gap: 8px;
      align-items: center;
      justify-content: flex-end;
      padding: 8px 0 0 0;
      margin-top: 8px;
      border-top: 1px solid var(--color-borde);
    }
    .csi-site-header__menu--mobile:not([open]) .csi-site-header__nav--mobile,
    .csi-site-header__menu--mobile:not([open]) .csi-site-header__controls--mobile {
      display: none;
    }
    .csi-site-header__kbd {
      display: none;
    }
  }
</style>
