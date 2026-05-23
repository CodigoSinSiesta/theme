/**
 * @codigosinsiesta/theme/composables/useCounterAnimation
 *
 * Anima un valor numérico de 0 → `target` durante `duration` ms con
 * `requestAnimationFrame`. Respeta `prefers-reduced-motion`: con motion
 * reducido, salta directo al target sin interpolar.
 *
 * Sinergia natural con `useIntersectionObserver` — pasa el getter de
 * isVisible y el counter arranca solo al entrar en viewport:
 *
 *   const inView  = useIntersectionObserver({ threshold: 0.5 });
 *   const counter = useCounterAnimation({
 *     target: 42,
 *     isActive: () => inView.isVisible
 *   });
 *   <div use:inView.target>{counter.value}+</div>
 */

/**
 * easeOutCubic — curva por defecto. Arranque rápido, frenada suave.
 * @param {number} t - normalizado 0..1
 * @returns {number}
 */
export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * @typedef {Object} UseCounterAnimationOptions
 * @property {number}                            target              - Valor final.
 * @property {number}                            [duration=2000]     - Duración total ms.
 * @property {boolean | (() => boolean)}         [isActive=true]     - Boolean literal (one-shot) o getter (reactivo via $effect).
 * @property {(t: number) => number}             [easing=easeOutCubic] - Función de easing.
 */

/**
 * @param {UseCounterAnimationOptions} options
 */
export function useCounterAnimation(options) {
  const {
    target,
    duration = 2000,
    isActive: isActiveOption = true,
    easing = easeOutCubic,
  } = options;

  const isActiveIsGetter = typeof isActiveOption === 'function';
  const initialActive = isActiveIsGetter
    ? Boolean(isActiveOption())
    : Boolean(isActiveOption);

  let currentTarget = $state(target);
  let isActive = $state(initialActive);
  let value = $state(0);
  let isComplete = $state(false);

  let rafId = /** @type {number | null} */ (null);
  let startTime = /** @type {number | null} */ (null);

  function prefersReducedMotion() {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function cancel() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    startTime = null;
  }

  function step(timestamp) {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const t = Math.min(1, elapsed / duration);
    value = Math.round(easing(t) * currentTarget);
    if (t < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      value = currentTarget;
      isComplete = true;
      rafId = null;
      startTime = null;
    }
  }

  function start() {
    cancel();
    isComplete = false;
    if (prefersReducedMotion()) {
      value = currentTarget;
      isComplete = true;
      return;
    }
    value = 0;
    rafId = requestAnimationFrame(step);
  }

  function stop() {
    cancel();
    value = 0;
    isComplete = false;
  }

  /**
   * Reinicia desde 0. Si está activo, vuelve a arrancar.
   */
  function reset() {
    cancel();
    value = 0;
    isComplete = false;
    if (isActive) start();
  }

  /**
   * Cambia el target. Resetea la animación.
   * @param {number} next
   */
  function setTarget(next) {
    if (next === currentTarget) return;
    currentTarget = next;
    reset();
  }

  /**
   * Setter imperativo para `isActive`. Útil cuando el caller no pasa un
   * getter como option pero quiere arrancar/parar a mano.
   * @param {boolean} next
   */
  function setActive(next) {
    if (isActive === next) return;
    isActive = next;
    if (next) start();
    else stop();
  }

  // Si isActive llegó como getter, suscribimos vía $effect para reaccionar
  // a sus cambios. Esto cubre el caso canónico:
  //   isActive: () => inView.isVisible
  if (isActiveIsGetter) {
    $effect(() => {
      const next = Boolean(isActiveOption());
      if (next !== isActive) {
        isActive = next;
        if (next) start();
        else stop();
      }
    });
  } else if (initialActive) {
    // Auto-start si arrancó activo en modo literal.
    start();
  }

  return {
    get value() {
      return value;
    },
    get isComplete() {
      return isComplete;
    },
    get target() {
      return currentTarget;
    },
    get isActive() {
      return isActive;
    },
    reset,
    setTarget,
    setActive,
  };
}
