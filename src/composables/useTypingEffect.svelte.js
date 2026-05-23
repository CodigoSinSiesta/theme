/**
 * @codigosinsiesta/theme/composables/useTypingEffect
 *
 * Renderiza un texto carácter a carácter con efecto de máquina de escribir.
 * Soporta `loop` (escribir → pausa → borrar → pausa → repetir) y respeta
 * `prefers-reduced-motion` mostrando el texto completo instantáneamente.
 *
 * Uso a11y recomendado: envolver el contenedor en `aria-live="polite"` para
 * que screen readers anuncien el texto final una sola vez.
 *
 *   const typing = useTypingEffect({ text: 'Hola mundo', speed: 80 });
 *   <div aria-live="polite">
 *     <span>{typing.displayText}</span>
 *     <span class="csi-typing-cursor" aria-hidden="true"></span>
 *   </div>
 */

/**
 * @typedef {Object} UseTypingEffectOptions
 * @property {string}  text                  - Texto a escribir.
 * @property {number}  [speed=80]            - ms por carácter.
 * @property {number}  [startDelay=0]        - ms antes de empezar.
 * @property {boolean} [loop=false]          - Si true, borra y reescribe en bucle.
 * @property {number}  [loopPause=2000]      - ms de pausa entre fases en modo loop.
 */

/**
 * @param {UseTypingEffectOptions} options
 */
export function useTypingEffect(options) {
  const {
    text,
    speed = 80,
    startDelay = 0,
    loop = false,
    loopPause = 2000,
  } = options;

  let displayText = $state('');
  let isComplete = $state(false);

  let timeoutId = /** @type {ReturnType<typeof setTimeout> | null} */ (null);

  function prefersReducedMotion() {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function clear() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  function typeForward(index) {
    if (index > text.length) {
      isComplete = true;
      if (loop) {
        timeoutId = setTimeout(() => typeBackward(text.length), loopPause);
      }
      return;
    }
    displayText = text.slice(0, index);
    timeoutId = setTimeout(() => typeForward(index + 1), speed);
  }

  function typeBackward(index) {
    if (index < 0) {
      // Pequeña pausa con texto vacío antes de re-arrancar.
      timeoutId = setTimeout(() => {
        isComplete = false;
        typeForward(0);
      }, loopPause);
      return;
    }
    displayText = text.slice(0, index);
    timeoutId = setTimeout(() => typeBackward(index - 1), speed);
  }

  function start() {
    clear();
    displayText = '';
    isComplete = false;

    if (prefersReducedMotion()) {
      displayText = text;
      isComplete = true;
      return;
    }

    if (startDelay > 0) {
      timeoutId = setTimeout(() => typeForward(0), startDelay);
    } else {
      typeForward(0);
    }
  }

  /**
   * Reinicia desde cero — borra texto y vuelve a empezar (respetando startDelay).
   */
  function reset() {
    start();
  }

  start();

  return {
    get displayText() {
      return displayText;
    },
    get isComplete() {
      return isComplete;
    },
    reset,
  };
}
