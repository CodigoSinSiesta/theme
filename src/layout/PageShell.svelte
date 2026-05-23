<!--
  @codigosinsiesta/theme/layout/PageShell

  Wrapper top-level para cualquier página CsS. Define:
   - Skip link integrado (`.csi-skip-link` apuntando a `#main`).
   - Estructura header / main / footer vía snippets opcionales.
   - `data-theme="dark" | "light"` aplicado al root del shell.
   - Barra opcional de scroll progress fija arriba.

  La prop `theme="light"` se acepta desde v0.9.0 aunque la variante light
  blueprint del theme no se implementa hasta v0.11.0 — cae a dark visualmente
  hasta entonces. Esto evita un breaking change cuando llegue light.

  Uso:
    <PageShell theme="dark" scrollProgress>
      {#snippet header()}<SiteHeader ... />{/snippet}
      {#snippet main()}<BentoGrid>...</BentoGrid>{/snippet}
      {#snippet footer()}<SiteFooter ... />{/snippet}
    </PageShell>
-->

<script lang="ts">
  import type { Snippet } from 'svelte';

  type Theme = 'dark' | 'light';
  let {
    theme = 'dark' as Theme,
    lang = 'es',
    scrollProgress = false,
    skipLinkLabel = 'Saltar al contenido',
    header,
    main,
    footer
  } = $props<{
    theme?: Theme;
    lang?: string;
    scrollProgress?: boolean;
    skipLinkLabel?: string;
    header?: Snippet;
    main?: Snippet;
    footer?: Snippet;
  }>();

  let progress = $state(0);

  $effect(() => {
    if (!scrollProgress || typeof window === 'undefined') return;
    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      progress = max > 0 ? doc.scrollTop / max : 0;
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  });
</script>

<div class="csi-page-shell" data-theme={theme} {lang}>
  <a class="csi-skip-link" href="#main">{skipLinkLabel}</a>

  {#if scrollProgress}
    <div
      class="csi-scroll-progress"
      role="presentation"
      aria-hidden="true"
      style="--csi-scroll-progress: {progress}"
    ></div>
  {/if}

  {#if header}
    <header class="csi-page-header">{@render header()}</header>
  {/if}

  <main id="main" class="csi-page-main" tabindex="-1">
    {#if main}{@render main()}{/if}
  </main>

  {#if footer}
    <footer class="csi-page-footer">{@render footer()}</footer>
  {/if}
</div>

<style>
  .csi-page-shell {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    background: var(--color-fondo);
    color: var(--color-tinta);
    font-family: var(--font-body);
  }
  .csi-page-main {
    flex: 1;
  }
  .csi-page-main:focus {
    outline: none;
  }
  .csi-scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 100%;
    transform-origin: left;
    transform: scaleX(var(--csi-scroll-progress, 0));
    background: linear-gradient(
      90deg,
      var(--color-cobalto),
      var(--color-electrico),
      var(--color-cielo)
    );
    z-index: 100;
    pointer-events: none;
  }
</style>
