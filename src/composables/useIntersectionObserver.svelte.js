/**
 * @codigosinsiesta/theme/composables/useIntersectionObserver
 *
 * Composable runes-based (Svelte 5) que envuelve la API nativa de
 * IntersectionObserver y la expone como Svelte action.
 *
 * Patrón canónico:
 *   const observer = useIntersectionObserver({ threshold: 0.3, triggerOnce: true });
 *   <div use:observer.target class:visible={observer.isVisible}>...</div>
 *
 * La misma acción puede aplicarse a N nodos: `isVisible` será true mientras
 * cualquiera de ellos esté en viewport.
 */

/**
 * @typedef {Object} UseIntersectionObserverOptions
 * @property {number | number[]} [threshold=0]   - Igual que IntersectionObserverInit.threshold.
 * @property {string}            [rootMargin='0px'] - Margen alrededor del root.
 * @property {Element | null}    [root=null]      - Viewport ancestral.
 * @property {boolean}           [triggerOnce=false] - Si true, desconecta tras la primera intersección.
 */

/**
 * @param {UseIntersectionObserverOptions} [options]
 */
export function useIntersectionObserver(options = {}) {
  const {
    threshold = 0,
    rootMargin = '0px',
    root = null,
    triggerOnce = false,
  } = options;

  let isVisible = $state(false);
  /** @type {IntersectionObserverEntry | null} */
  let entry = $state(null);

  /** @type {Map<Element, IntersectionObserver>} */
  const observers = new Map();
  /** @type {Set<Element>} */
  const visibleNodes = new Set();

  /**
   * Svelte action — `use:observer.target`.
   * @param {Element} node
   */
  function target(node) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          entry = e;
          if (e.isIntersecting) {
            visibleNodes.add(e.target);
          } else {
            visibleNodes.delete(e.target);
          }
        }
        isVisible = visibleNodes.size > 0;

        if (triggerOnce && isVisible) {
          for (const [el, instance] of observers) {
            instance.disconnect();
            observers.delete(el);
          }
        }
      },
      { threshold, rootMargin, root }
    );
    io.observe(node);
    observers.set(node, io);

    return {
      destroy() {
        io.disconnect();
        observers.delete(node);
        visibleNodes.delete(node);
        isVisible = visibleNodes.size > 0;
      },
    };
  }

  return {
    target,
    get isVisible() {
      return isVisible;
    },
    get entry() {
      return entry;
    },
  };
}
