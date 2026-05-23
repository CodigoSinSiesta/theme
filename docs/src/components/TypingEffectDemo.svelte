<!--
  Demo de useTypingEffect. Dos modos: single (escribe una vez) y loop
  (escribe, pausa, borra, repite). Incluye botón de reset y opción para
  cambiar el texto en caliente.
-->
<script>
  import { useTypingEffect } from '../../../src/composables/index.js';

  // Demo 1 — single (con reset).
  const single = useTypingEffect({
    text: 'Technical Leader Specialist',
    speed: 60,
  });

  // Demo 2 — loop con tres lemas rotando.
  const loopText = 'código sin siesta';
  const loop = useTypingEffect({
    text: loopText,
    speed: 80,
    loop: true,
    loopPause: 1200,
  });
</script>

<div class="demo">
  <section class="block">
    <h3 class="block-title">Single — escribe una vez</h3>
    <div class="text-box" aria-live="polite">
      <span class="text">{single.displayText}</span>
      <span class="csi-typing-cursor" aria-hidden="true"></span>
    </div>
    <div class="meta">
      <span class="badge" data-state={single.isComplete ? 'done' : 'typing'}>
        {single.isComplete ? '✓ completo' : '✏ escribiendo'}
      </span>
      <button type="button" class="btn" onclick={() => single.reset()}>Reset →</button>
    </div>
  </section>

  <section class="block">
    <h3 class="block-title">Loop — escribe, pausa, borra, repite</h3>
    <div class="text-box" aria-live="off">
      <span class="text">{loop.displayText}</span>
      <span class="csi-typing-cursor" aria-hidden="true"></span>
    </div>
    <p class="hint">
      En loop, mantén <code>aria-live="off"</code> para no spammear screen readers.
    </p>
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
  .text-box {
    font-family: var(--font-display);
    font-size: 28px;
    color: var(--color-tinta);
    min-height: 44px;
    display: flex;
    align-items: center;
    padding: 12px 18px;
    background: var(--color-fondo-alt);
    border: 1px solid var(--color-borde);
    border-radius: 8px;
  }
  .text {
    background: linear-gradient(135deg, var(--color-cielo), var(--color-electrico));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }
  .csi-typing-cursor {
    color: var(--color-electrico);
  }
  .meta {
    margin-top: 14px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .badge {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 5px 10px;
    border-radius: 999px;
    border: 1px solid var(--color-borde);
    color: var(--color-tinta3);
  }
  .badge[data-state='done'] {
    color: var(--color-ok);
    border-color: color-mix(in oklab, var(--color-ok) 45%, transparent);
  }
  .btn {
    padding: 8px 14px;
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
  .btn:hover {
    background: var(--color-cielo);
  }
  .hint {
    margin: 10px 0 0 0;
    font-size: 12px;
    color: var(--color-tinta3);
  }
  .hint code {
    background: var(--color-fondo-alt);
    padding: 1px 5px;
    border-radius: 3px;
    font-family: var(--font-mono);
    font-size: 11px;
  }
</style>
