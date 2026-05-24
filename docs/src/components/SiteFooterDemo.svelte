<!--
  Demo de SiteFooter. 3 variantes en tabs:
   - completo: copyright + tagline + links con iconos sociales
   - sin tagline
   - sin links
-->
<script>
  import SiteFooter from '../../../src/layout/SiteFooter.svelte';

  const variants = [
    {
      label: 'completo',
      props: {
        copyright: '© 2026 Alejandro de la Fuente',
        tagline: 'Hecho con ♥ · parte de Código Sin Siesta',
        links: [
          { href: 'https://github.com/TellMeAlex', label: 'GitHub', icon: 'github' },
          { href: 'https://linkedin.com/in/alejandro', label: 'LinkedIn', icon: 'linkedin' },
          { href: 'mailto:alex@tellmealex.dev', label: 'Email', icon: 'envelope' }
        ]
      }
    },
    {
      label: 'sin tagline',
      props: {
        copyright: '© 2026 Alejandro de la Fuente',
        links: [
          { href: 'https://github.com/TellMeAlex', label: 'GitHub', icon: 'github' },
          { href: 'mailto:alex@tellmealex.dev', label: 'Email', icon: 'envelope' }
        ]
      }
    },
    {
      label: 'sin links',
      props: {
        copyright: '© 2026 Alejandro de la Fuente',
        tagline: 'Hecho con ♥ · parte de Código Sin Siesta'
      }
    }
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

  <div class="frame">
    {#key selected}
      <SiteFooter {...current.props} />
    {/key}
  </div>

  <p class="hint">
    Los iconos (<code>/icons/github.svg</code>, <code>linkedin.svg</code>, <code>envelope.svg</code>) los carga el browser desde la ruta absoluta — en este Storybook se sirven desde <code>/theme/icons/</code> via Astro. En tu sitio, copia los SVG a <code>public/icons/</code> o configura el path como prefieras.
  </p>
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
  .frame {
    border: 1px solid var(--color-borde);
    border-radius: 10px;
    overflow: hidden;
  }
  .hint {
    margin: 0;
    padding: 12px 14px;
    background: color-mix(in oklab, var(--color-electrico) 8%, var(--color-fondo-alt));
    border-left: 3px solid var(--color-electrico);
    border-radius: 6px;
    color: var(--color-tinta2);
    font-size: 12px;
    line-height: 1.55;
  }
  .hint code {
    background: var(--color-fondo);
    padding: 1px 5px;
    border-radius: 3px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-cielo);
  }
</style>
