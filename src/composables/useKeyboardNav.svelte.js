/**
 * @codigosinsiesta/theme/composables/useKeyboardNav
 *
 * Gestiona atajos de teclado a nivel de app/página. Acepta una lista de
 * shortcuts (literal o getter) y registra un listener global de `keydown`.
 *
 * - No dispara cuando el foco está en input/textarea/contenteditable
 *   (salvo `forceTrigger: true` en el shortcut).
 * - `preventDefault: true` por defecto al matchear.
 * - Múltiples instancias pueden coexistir — cada una tiene su propio
 *   listener y filtra solo sus shortcuts.
 *
 * Uso:
 *   const nav = useKeyboardNav([
 *     { key: '1', modifier: 'alt', label: 'Ir a Hero',  handler: () => scrollTo('#hero') },
 *     { key: 'a', modifier: 'alt', label: 'Panel a11y', handler: openA11y },
 *     { key: 'Escape',             label: 'Cerrar',     handler: closeAll }
 *   ]);
 *
 *   {#each nav.shortcuts as s}
 *     <kbd>{s.modifier ? s.modifier + '+' : ''}{s.key}</kbd> — {s.label}
 *   {/each}
 */

/**
 * @typedef {Object} Shortcut
 * @property {string}                              key             - Tecla: 'a', '1', 'Escape', 'ArrowLeft'... (case-insensitive para letras).
 * @property {string}                              [modifier]      - 'alt' | 'ctrl' | 'shift' | 'meta' o combinaciones: 'altShift', 'ctrlShift'...
 * @property {string}                              label           - Descripción para panel de ayuda.
 * @property {(e: KeyboardEvent) => void}          handler         - Función a ejecutar.
 * @property {boolean}                             [preventDefault=true]
 * @property {boolean}                             [forceTrigger=false] - Si true, dispara también con foco en form fields.
 */

/**
 * Comprueba que los modifiers pulsados en el evento coinciden EXACTAMENTE con
 * los declarados en el shortcut. Si `mod` es undefined/empty, exige que NO
 * haya modifiers pulsados.
 *
 * @param {string | undefined} mod
 * @param {KeyboardEvent} e
 */
function modifiersMatch(mod, e) {
  const m = (mod || '').toLowerCase();
  return (
    m.includes('alt') === e.altKey &&
    m.includes('ctrl') === e.ctrlKey &&
    m.includes('shift') === e.shiftKey &&
    m.includes('meta') === e.metaKey
  );
}

/**
 * @param {Element | EventTarget | null} target
 * @returns {boolean}
 */
function isEditableTarget(target) {
  if (!target || !(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (target.isContentEditable) return true;
  // Fallback — jsdom no implementa isContentEditable de forma fiable, así
  // que también miramos el atributo HTML por si lo activan a mano.
  const attr = target.getAttribute('contenteditable');
  if (attr === '' || attr === 'true' || attr === 'plaintext-only') return true;
  return false;
}

/**
 * @param {Shortcut[] | (() => Shortcut[])} shortcutsOption
 */
export function useKeyboardNav(shortcutsOption) {
  const isGetter = typeof shortcutsOption === 'function';
  let shortcuts = $state(isGetter ? shortcutsOption() : shortcutsOption);

  if (isGetter) {
    $effect(() => {
      shortcuts = shortcutsOption();
    });
  }

  /** @param {KeyboardEvent} e */
  function onKeyDown(e) {
    const editable = isEditableTarget(e.target);
    for (const s of shortcuts) {
      if (e.key.toLowerCase() !== s.key.toLowerCase()) continue;
      if (!modifiersMatch(s.modifier, e)) continue;
      if (editable && !s.forceTrigger) continue;
      if (s.preventDefault !== false) e.preventDefault();
      s.handler(e);
      // Solo disparamos el primer match. Si el usuario quiere disparar
      // varios handlers en la misma tecla, los compone en uno.
      break;
    }
  }

  $effect(() => {
    if (typeof document === 'undefined') return;
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  });

  return {
    get shortcuts() {
      return shortcuts;
    },
  };
}
