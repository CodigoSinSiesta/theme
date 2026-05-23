<!--
  Demo de SiteHeader. Tres variantes de logo + verifica atajos Alt+N
  con un log de pulsaciones detectadas + slot controls.
-->
<script>
  import SiteHeader from '../../../src/layout/SiteHeader.svelte';

  const links = [
    { href: '#hero',     label: 'Inicio' },
    { href: '#about',    label: 'Sobre mí' },
    { href: '#projects', label: 'Proyectos' },
    { href: '#contact',  label: 'Contacto' }
  ];

  let variant = $state('both');
  let activeHref = $state('#hero');
  let log = $state([]);

  // Sustituye el handler default (scrollIntoView que no funciona dentro del
  // demo box) por uno que solo registra qué link se activó.
  function recordActivation(href) {
    activeHref = href;
    log = [{ href, t: new Date().toLocaleTimeString() }, ...log.slice(0, 4)];
  }

  // Interceptamos clicks en los links del demo para no salir de la página.
  function onClick(ev) {
    const a = ev.target.closest('a.csi-site-header__link');
    if (!a) return;
    ev.preventDefault();
    recordActivation(a.getAttribute('href'));
  }
</script>

<div class="demo">
  <div class="config">
    <label>
      Logo:
      <select bind:value={variant}>
        <option value="both">both (default)</option>
        <option value="owl">owl</option>
        <option value="wordmark">wordmark</option>
      </select>
    </label>
    <span class="hint">Pulsa <kbd>Alt+1</kbd> .. <kbd>Alt+4</kbd> con el cursor fuera del select.</span>
  </div>

  <div class="header-host" onclick={onClick} role="presentation">
    {#key variant}
      <SiteHeader {links} {activeHref} logoVariant={variant}>
        {#snippet controls()}
          <button type="button" class="ctrl" aria-label="Cambiar tema">🌗</button>
          <button type="button" class="ctrl" aria-label="Accesibilidad">♿</button>
        {/snippet}
      </SiteHeader>
    {/key}
  </div>

  <div class="log-box">
    <h4>Atajos disparados</h4>
    {#if log.length === 0}
      <p class="empty">— ninguno todavía —</p>
    {:else}
      <ul>
        {#each log as entry}
          <li><code>{entry.href}</code> · <span>{entry.t}</span></li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .demo {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .config {
    display: flex;
    gap: 18px;
    align-items: center;
    flex-wrap: wrap;
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--color-tinta2);
  }
  .config select {
    padding: 6px 10px;
    background: var(--color-fondo-alt);
    border: 1px solid var(--color-borde);
    border-radius: 6px;
    color: var(--color-tinta);
    font-family: var(--font-mono);
    font-size: 13px;
  }
  .hint {
    color: var(--color-tinta3);
    font-size: 12px;
  }
  .hint kbd {
    background: var(--color-fondo-alt);
    padding: 1px 5px;
    border-radius: 3px;
    border: 1px solid var(--color-borde);
    color: var(--color-tinta);
    font-family: var(--font-mono);
    font-size: 11px;
  }
  .header-host {
    border: 1px solid var(--color-borde);
    border-radius: 10px;
    overflow: hidden;
  }
  .ctrl {
    padding: 6px 10px;
    background: transparent;
    border: 1px solid var(--color-borde);
    border-radius: 6px;
    color: var(--color-tinta2);
    cursor: pointer;
    font-size: 14px;
  }
  .ctrl:hover {
    border-color: var(--color-electrico);
    color: var(--color-cielo);
  }
  .log-box {
    background: var(--color-fondo);
    border: 1px solid var(--color-borde);
    border-radius: 10px;
    padding: 18px;
  }
  .log-box h4 {
    font-family: var(--font-display);
    font-weight: 700;
    color: var(--color-cielo);
    margin: 0 0 10px 0;
    font-size: 15px;
  }
  .empty {
    margin: 0;
    color: var(--color-tinta4);
    font-style: italic;
    font-size: 13px;
  }
  .log-box ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-family: var(--font-mono);
    font-size: 13px;
  }
  .log-box li {
    display: flex;
    justify-content: space-between;
    padding: 4px 8px;
    background: var(--color-fondo-alt);
    border-radius: 4px;
    color: var(--color-tinta2);
  }
  .log-box code {
    color: var(--color-cielo);
  }
  .log-box span {
    color: var(--color-tinta4);
  }
</style>
