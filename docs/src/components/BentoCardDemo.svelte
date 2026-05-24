<!--
  Demo de BentoCard. Renderiza un BentoGrid mock con 4 cards (una por
  size) + toggles para entryAnimation y keyboardHint. Botón para re-
  renderizar el grid completo (forzar nueva intersección y volver a ver
  la entry animation).
-->
<script>
  import BentoGrid from '../../../src/layout/BentoGrid.svelte';
  import BentoCard from '../../../src/layout/BentoCard.svelte';

  let entryAnimation = $state(true);
  let keyboardHint = $state(true);
  let nonce = $state(0);

  const sizes = ['sm', 'md', 'lg', 'xl'];
</script>

<div class="demo">
  <div class="controls">
    <label>
      <input type="checkbox" bind:checked={entryAnimation} />
      <span>entryAnimation</span>
    </label>
    <label>
      <input type="checkbox" bind:checked={keyboardHint} />
      <span>keyboardHint</span>
    </label>
    <button type="button" class="reset-btn" onclick={() => (nonce += 1)}>
      Reset grid →
    </button>
  </div>

  <div class="frame">
    {#key nonce + (entryAnimation ? 'a' : 'b') + (keyboardHint ? 'k' : 'n')}
      <BentoGrid cols={12} gap="16px" dense>
        {#each sizes as size, i (size)}
          <BentoCard
            {size}
            ariaLabel="Card {size}"
            id={`card-${size}`}
            entryAnimation={entryAnimation}
            keyboardHint={keyboardHint ? `Alt+${i + 1}` : ''}
          >
            <div class="card-content">
              <span class="card-size">size = "{size}"</span>
              <span class="card-span">
                span {size === 'sm' ? '3×1' : size === 'md' ? '4×1' : size === 'lg' ? '6×2' : '8×2'}
              </span>
              <p class="card-body">
                Contenido del bloque. {size === 'xl' ? 'Hero, About largo, o feature destacada.' : size === 'lg' ? 'Project showcase, gallery.' : size === 'md' ? 'Section secundaria.' : 'Stat compacto, KPI o badge.'}
              </p>
            </div>
          </BentoCard>
        {/each}
      </BentoGrid>
    {/key}
  </div>

  <p class="hint">
    Pulsa <strong>Reset grid</strong> para volver a montar las cards y ver la entry animation desde cero. Activa el toggle <code>keyboardHint</code> para ver los badges <kbd>Alt+N</kbd> en cada esquina.
  </p>
</div>

<style>
  .demo {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .controls {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
    padding: 12px 14px;
    background: var(--color-fondo);
    border: 1px solid var(--color-borde);
    border-radius: 8px;
  }
  .controls label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--color-tinta2);
    cursor: pointer;
  }
  .controls input[type='checkbox'] {
    accent-color: var(--color-electrico);
  }
  .reset-btn {
    margin-left: auto;
    padding: 6px 14px;
    background: var(--color-electrico);
    color: var(--color-fondo);
    border: none;
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 150ms ease-out;
  }
  .reset-btn:hover {
    background: var(--color-cielo);
  }
  .frame {
    padding: 16px;
    background: var(--color-fondo);
    border: 1px solid var(--color-borde);
    border-radius: 10px;
    min-height: 480px;
  }
  .card-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 100%;
  }
  .card-size {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-cielo);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .card-span {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--color-tinta4);
  }
  .card-body {
    margin: 4px 0 0 0;
    color: var(--color-tinta3);
    font-size: 13px;
    line-height: 1.5;
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
  .hint kbd {
    background: var(--color-fondo);
    padding: 1px 5px;
    border-radius: 3px;
    border: 1px solid var(--color-borde);
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-cielo);
  }
</style>
