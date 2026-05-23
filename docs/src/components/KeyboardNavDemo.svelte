<!--
  Demo de useKeyboardNav. Registra 4 shortcuts y muestra:
   - Lista renderizada (como panel de ayuda).
   - Log de últimas pulsaciones detectadas.
   - Input para verificar que NO dispara con foco editable.
-->
<script>
  import { useKeyboardNav } from '../../../src/composables/index.js';

  let log = $state([]);
  let counter = $state({ hero: 0, projects: 0, contact: 0, esc: 0 });

  function record(label) {
    counter[label] = counter[label] + 1;
    log = [
      { label, time: new Date().toLocaleTimeString() },
      ...log.slice(0, 4),
    ];
  }

  const nav = useKeyboardNav([
    {
      key: '1',
      modifier: 'alt',
      label: 'Ir a Hero',
      handler: () => record('hero'),
    },
    {
      key: '2',
      modifier: 'alt',
      label: 'Ir a Proyectos',
      handler: () => record('projects'),
    },
    {
      key: '3',
      modifier: 'alt',
      label: 'Ir a Contacto',
      handler: () => record('contact'),
    },
    {
      key: 'Escape',
      label: 'Cerrar diálogos',
      handler: () => record('esc'),
    },
  ]);
</script>

<div class="demo">
  <section class="block">
    <h3 class="block-title">Atajos activos</h3>
    <p class="hint">
      Pulsa cualquier combinación de abajo (asegúrate de tener el foco fuera de cualquier input).
    </p>
    <ul class="shortcuts">
      {#each nav.shortcuts as s}
        <li class="shortcut">
          <kbd>{s.modifier ? `${s.modifier}+` : ''}{s.key}</kbd>
          <span class="label">{s.label}</span>
          <span class="count">×{counter[
            s.label.includes('Hero') ? 'hero' :
            s.label.includes('Proyectos') ? 'projects' :
            s.label.includes('Contacto') ? 'contact' : 'esc'
          ]}</span>
        </li>
      {/each}
    </ul>
  </section>

  <section class="block">
    <h3 class="block-title">Últimas pulsaciones detectadas</h3>
    {#if log.length === 0}
      <p class="empty">— ningún atajo disparado todavía —</p>
    {:else}
      <ul class="log">
        {#each log as entry}
          <li><span class="log-label">{entry.label}</span> <span class="log-time">{entry.time}</span></li>
        {/each}
      </ul>
    {/if}
  </section>

  <section class="block">
    <h3 class="block-title">Verifica que NO dispara con foco editable</h3>
    <p class="hint">
      Haz click en este input y prueba a pulsar <kbd>Alt+1</kbd> — no debería disparar el handler porque el foco está en un form field.
    </p>
    <input type="text" placeholder="Foco aquí: los atajos no disparan…" />
  </section>
</div>

<style>
  .demo {
    display: flex;
    flex-direction: column;
    gap: 22px;
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
    margin: 0 0 12px 0;
    font-size: 17px;
  }
  .hint {
    margin: 0 0 14px 0;
    color: var(--color-tinta3);
    font-size: 13px;
  }
  .hint kbd {
    background: var(--color-fondo-alt);
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid var(--color-borde);
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-tinta);
  }
  .shortcuts {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .shortcut {
    display: grid;
    grid-template-columns: 130px 1fr auto;
    align-items: center;
    gap: 14px;
    padding: 10px 14px;
    background: var(--color-fondo-alt);
    border: 1px solid var(--color-borde);
    border-radius: 8px;
  }
  .shortcut kbd {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 700;
    color: var(--color-cielo);
    background: var(--color-fondo);
    padding: 4px 10px;
    border-radius: 5px;
    border: 1px solid var(--color-borde);
    text-align: center;
  }
  .label {
    color: var(--color-tinta);
    font-size: 14px;
  }
  .count {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-tinta3);
    background: var(--color-fondo);
    padding: 3px 8px;
    border-radius: 4px;
    border: 1px solid var(--color-borde);
  }
  .empty {
    margin: 0;
    color: var(--color-tinta4);
    font-style: italic;
    font-size: 13px;
  }
  .log {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 13px;
  }
  .log li {
    display: flex;
    justify-content: space-between;
    padding: 6px 10px;
    background: var(--color-fondo-alt);
    border-radius: 4px;
  }
  .log-label {
    color: var(--color-cielo);
    font-weight: 600;
  }
  .log-time {
    color: var(--color-tinta4);
  }
  input[type='text'] {
    width: 100%;
    padding: 10px 12px;
    background: var(--color-fondo-alt);
    border: 1px solid var(--color-borde);
    border-radius: 6px;
    color: var(--color-tinta);
    font-family: var(--font-mono);
    font-size: 13px;
  }
  input[type='text']:focus {
    outline: none;
    border-color: var(--color-electrico);
  }
</style>
