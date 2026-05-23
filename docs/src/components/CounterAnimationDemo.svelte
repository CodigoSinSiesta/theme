<!--
  Demo de useCounterAnimation. Tres ejemplos:
   1) Disparo manual con botón.
   2) Combinación con useIntersectionObserver (auto-start al hacer scroll).
   3) Cambio de target en caliente.
-->
<script>
  import {
    useCounterAnimation,
    useIntersectionObserver,
  } from '../../../src/composables/index.js';

  // Demo 1 — disparo manual.
  let manualTarget = $state(1024);
  const manual = useCounterAnimation({
    target: 1024,
    duration: 1500,
    isActive: false,
  });
  function fireManual() {
    manual.setTarget(manualTarget);
    manual.setActive(true);
    // Pequeña re-arranque para repetir el efecto si se pulsa varias veces.
    manual.reset();
  }

  // Demo 2 — combo con IntersectionObserver. Patrón canónico del portfolio.
  const inView = useIntersectionObserver({ threshold: 0.5 });
  const auto = useCounterAnimation({
    target: 42,
    duration: 2000,
    isActive: () => inView.isVisible,
  });
</script>

<div class="demo">
  <section class="block">
    <h3 class="block-title">Disparo manual</h3>
    <div class="row">
      <div class="big-number">{manual.value}</div>
      <div class="controls">
        <label class="field">
          <span>Target</span>
          <input type="number" bind:value={manualTarget} min="0" max="999999" />
        </label>
        <button type="button" onclick={fireManual} class="btn">Animar →</button>
      </div>
    </div>
  </section>

  <section class="block">
    <h3 class="block-title">Auto-start al entrar en viewport</h3>
    <p class="hint">Haz scroll dentro de esta caja para activar el contador.</p>
    <div class="scroller">
      <div class="spacer">. . .</div>
      <div class="target-card" use:inView.target>
        <div class="big-number" data-visible={inView.isVisible}>{auto.value}+</div>
        <span class="label">proyectos completados</span>
      </div>
      <div class="spacer">. . .</div>
    </div>
  </section>
</div>

<style>
  .demo {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .block {
    background: var(--color-fondo);
    border: 1px solid var(--color-borde);
    border-radius: 12px;
    padding: 22px;
  }
  .block-title {
    font-family: var(--font-display);
    font-weight: 700;
    color: var(--color-cielo);
    margin: 0 0 14px 0;
    font-size: 17px;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }
  .big-number {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 64px;
    line-height: 1;
    color: var(--color-tinta);
    min-width: 160px;
    font-variant-numeric: tabular-nums;
    background: linear-gradient(135deg, var(--color-cielo), var(--color-electrico));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .controls {
    display: flex;
    align-items: end;
    gap: 12px;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-tinta3);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .field input {
    width: 110px;
    padding: 8px 10px;
    background: var(--color-fondo-alt);
    border: 1px solid var(--color-borde);
    border-radius: 6px;
    color: var(--color-tinta);
    font-family: var(--font-mono);
    font-size: 14px;
  }
  .field input:focus {
    outline: none;
    border-color: var(--color-electrico);
  }
  .btn {
    padding: 10px 16px;
    background: var(--color-electrico);
    color: var(--color-fondo);
    border: none;
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 150ms ease-out;
  }
  .btn:hover {
    background: var(--color-cielo);
  }
  .hint {
    margin: 0 0 12px 0;
    color: var(--color-tinta3);
    font-size: 13px;
    font-family: var(--font-mono);
  }
  .scroller {
    height: 260px;
    overflow-y: auto;
    background: var(--color-fondo-alt);
    border: 1px solid var(--color-borde);
    border-radius: 10px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .spacer {
    min-height: 220px;
    color: var(--color-tinta4);
    font-family: var(--font-mono);
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.4em;
  }
  .target-card {
    padding: 28px 24px;
    border-radius: 10px;
    background: var(--color-fondo);
    border: 1px solid var(--color-borde);
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    transition: border-color 250ms ease-out;
  }
  .target-card:has([data-visible='true']) {
    border-color: var(--color-electrico);
  }
  .label {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-tinta3);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
</style>
