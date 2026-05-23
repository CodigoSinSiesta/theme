<!--
  Demo de PageShell. Tres variantes mostradas como mini-páginas embebidas:
   - dark default
   - dark + scrollProgress
   - light (con disclaimer de v0.11.0)

  Cada una se renderiza en un `<iframe>`-style box con scrolling propio
  para que el skip link y la barra de progreso se vean en contexto sin
  contaminar el docs site real.
-->
<script>
  import PageShell from '../../../src/layout/PageShell.svelte';

  const variants = [
    { theme: 'dark',  scrollProgress: false, label: 'dark (default)' },
    { theme: 'dark',  scrollProgress: true,  label: 'dark + scrollProgress' },
    { theme: 'light', scrollProgress: false, label: 'light (placeholder hasta v0.11.0)' }
  ];

  let selected = $state(0);
  const current = $derived(variants[selected]);
</script>

<div class="demo">
  <div class="tabs" role="tablist">
    {#each variants as v, i}
      <button
        type="button"
        role="tab"
        aria-selected={selected === i}
        class:active={selected === i}
        onclick={() => (selected = i)}
      >
        {v.label}
      </button>
    {/each}
  </div>

  <div class="preview">
    <div class="hint">↓ pulsa <kbd>Tab</kbd> dentro del preview para revelar el skip link</div>

    {#key selected}
      <div class="frame" data-light={current.theme === 'light'}>
        <PageShell theme={current.theme} scrollProgress={current.scrollProgress}>
          {#snippet header()}
            <div class="mock-header">
              <span class="mock-logo">código sin siesta</span>
              <nav class="mock-nav">
                <a href="#a">Inicio</a>
                <a href="#b">Proyectos</a>
                <a href="#c">Contacto</a>
              </nav>
            </div>
          {/snippet}

          {#snippet main()}
            <div class="mock-main">
              <h1>Bienvenido</h1>
              <p>Contenido scrollable para ver la barra de progreso en acción.</p>
              {#each Array(8) as _, i (i)}
                <p class="filler">Línea de relleno {i + 1} — sigue haciendo scroll dentro de esta caja.</p>
              {/each}
              <p class="filler last">Fin del contenido. La barra debería estar al 100%.</p>
            </div>
          {/snippet}

          {#snippet footer()}
            <div class="mock-footer">© 2026 Código Sin Siesta · Hecho con ♥</div>
          {/snippet}
        </PageShell>
      </div>
    {/key}

    {#if current.theme === 'light'}
      <p class="disclaimer">
        ⚠ <code>data-theme="light"</code> ya está aplicado, pero la variante <strong>light blueprint</strong> del theme se entrega en <strong>v0.11.0</strong>. Hasta entonces se renderiza con tokens dark.
      </p>
    {/if}
  </div>
</div>

<style>
  .demo {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .tabs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    border-bottom: 1px solid var(--color-borde);
    padding-bottom: 12px;
  }
  .tabs button {
    padding: 8px 14px;
    background: var(--color-fondo);
    color: var(--color-tinta3);
    border: 1px solid var(--color-borde);
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 12px;
    cursor: pointer;
    transition: all 150ms ease-out;
  }
  .tabs button:hover {
    color: var(--color-cielo);
    border-color: var(--color-electrico);
  }
  .tabs button.active {
    background: var(--color-electrico);
    color: var(--color-fondo);
    border-color: var(--color-electrico);
  }
  .hint {
    margin-bottom: 8px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-tinta3);
  }
  .hint kbd {
    background: var(--color-fondo-alt);
    padding: 1px 6px;
    border-radius: 3px;
    border: 1px solid var(--color-borde);
    color: var(--color-tinta);
  }
  .frame {
    height: 480px;
    overflow-y: auto;
    border: 1px solid var(--color-borde);
    border-radius: 10px;
    position: relative;
    /* Necesario para que position:fixed del scroll-progress se ancle al frame */
    transform: translateZ(0);
  }
  .frame[data-light='true'] {
    border-color: color-mix(in oklab, var(--color-warn) 35%, var(--color-borde));
  }
  .mock-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 22px;
    border-bottom: 1px solid var(--color-borde);
    background: color-mix(in oklab, var(--color-fondo-alt) 80%, transparent);
    backdrop-filter: blur(6px);
    position: sticky;
    top: 0;
    z-index: 50;
  }
  .mock-logo {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-cielo);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .mock-nav {
    display: flex;
    gap: 16px;
  }
  .mock-nav a {
    color: var(--color-tinta2);
    font-size: 13px;
    text-decoration: none;
    font-family: var(--font-mono);
  }
  .mock-nav a:hover {
    color: var(--color-cielo);
  }
  .mock-main {
    padding: 22px;
  }
  .mock-main h1 {
    font-family: var(--font-display);
    color: var(--color-tinta);
    margin: 0 0 12px 0;
  }
  .filler {
    color: var(--color-tinta3);
    line-height: 1.7;
    margin: 14px 0;
  }
  .filler.last {
    color: var(--color-ok);
    font-weight: 600;
  }
  .mock-footer {
    padding: 16px 22px;
    text-align: center;
    color: var(--color-tinta4);
    font-size: 12px;
    border-top: 1px solid var(--color-borde);
  }
  .disclaimer {
    padding: 12px 16px;
    background: color-mix(in oklab, var(--color-warn) 12%, var(--color-fondo-alt));
    border: 1px solid color-mix(in oklab, var(--color-warn) 35%, var(--color-borde));
    border-radius: 8px;
    color: var(--color-tinta2);
    font-size: 13px;
    line-height: 1.55;
    margin: 0;
  }
  .disclaimer code {
    background: var(--color-fondo);
    padding: 1px 5px;
    border-radius: 3px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-cielo);
  }
</style>
