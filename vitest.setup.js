import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

/**
 * Mock global de IntersectionObserver — jsdom no la implementa.
 * Captura el callback de cada instancia para que los tests puedan
 * disparar intersecciones manualmente vía `instance.__trigger(entries)`.
 */
class MockIntersectionObserver {
  constructor(callback, options = {}) {
    this.callback = callback;
    this.options = options;
    this.elements = new Set();
    this.disconnected = false;
    MockIntersectionObserver.instances.push(this);
  }
  observe(el) {
    this.elements.add(el);
  }
  unobserve(el) {
    this.elements.delete(el);
  }
  disconnect() {
    this.elements.clear();
    this.disconnected = true;
  }
  takeRecords() {
    return [];
  }
  /**
   * Helper para tests: dispara el callback con entries sintéticas.
   * @param {Array<{ target: Element, isIntersecting: boolean }>} entries
   */
  __trigger(entries) {
    const synthetic = entries.map((e) => ({
      target: e.target,
      isIntersecting: e.isIntersecting,
      intersectionRatio: e.isIntersecting ? 1 : 0,
      boundingClientRect: e.target.getBoundingClientRect(),
      intersectionRect: e.target.getBoundingClientRect(),
      rootBounds: null,
      time: performance.now(),
    }));
    this.callback(synthetic, this);
  }
}
MockIntersectionObserver.instances = [];
MockIntersectionObserver.reset = () => {
  MockIntersectionObserver.instances.length = 0;
};

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
globalThis.__MockIO = MockIntersectionObserver;
