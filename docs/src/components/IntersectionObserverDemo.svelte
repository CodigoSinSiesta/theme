<!--
  Demo del composable useIntersectionObserver.
  Aparca el theme + chrome del docs site; aquí solo se muestra el comportamiento.
-->
<script>
  import { useIntersectionObserver } from '../../../src/composables/useIntersectionObserver.svelte.js';

  let { triggerOnce = false, threshold = 0.5 } = $props();
  const observer = useIntersectionObserver({ threshold, triggerOnce });
</script>

<div class="demo">
  <div class="status" data-visible={observer.isVisible}>
    <span class="dot" aria-hidden="true"></span>
    {observer.isVisible ? 'EN VIEWPORT' : 'fuera de viewport'}
  </div>

  <div class="scroller">
    <p class="hint">Haz scroll dentro de esta caja ↓</p>
    <div class="spacer">. . .</div>
    <div class="target" class:active={observer.isVisible} use:observer.target>
      <span class="label">target</span>
      <span class="state">{observer.isVisible ? '✓ visible' : '· oculto'}</span>
    </div>
    <div class="spacer">. . .</div>
  </div>
</div>

<style>
  .demo {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .status {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-mono);
    font-size: 13px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-tinta3);
    padding: 8px 14px;
    border: 1px solid var(--color-borde);
    border-radius: 999px;
    align-self: flex-start;
    transition: color 200ms ease-out, border-color 200ms ease-out;
  }
  .status[data-visible='true'] {
    color: var(--color-ok);
    border-color: color-mix(in oklab, var(--color-ok) 45%, transparent);
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-tinta4);
    transition: background 200ms ease-out, box-shadow 200ms ease-out;
  }
  .status[data-visible='true'] .dot {
    background: var(--color-ok);
    box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-ok) 25%, transparent);
  }
  .scroller {
    height: 280px;
    overflow-y: auto;
    background: var(--color-fondo);
    border: 1px solid var(--color-borde);
    border-radius: 10px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .hint {
    margin: 0;
    color: var(--color-tinta3);
    font-size: 13px;
    font-family: var(--font-mono);
  }
  .spacer {
    min-height: 240px;
    color: var(--color-tinta4);
    font-family: var(--font-mono);
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.4em;
  }
  .target {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 22px 20px;
    border-radius: 10px;
    background: var(--color-fondo-alt);
    border: 1px solid var(--color-borde);
    color: var(--color-tinta);
    font-family: var(--font-mono);
    font-size: 14px;
    transition: background 250ms ease-out, border-color 250ms ease-out, transform 250ms ease-out;
  }
  .target.active {
    background: color-mix(in oklab, var(--color-electrico) 18%, var(--color-fondo-alt));
    border-color: var(--color-electrico);
    transform: scale(1.01);
  }
  .label {
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-cielo);
  }
  .state {
    color: var(--color-tinta3);
  }
  .target.active .state {
    color: var(--color-ok);
  }
</style>
