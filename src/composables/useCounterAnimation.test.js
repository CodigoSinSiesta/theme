import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import { tick } from 'svelte';
import CounterFixture from './__fixtures__/CounterFixture.svelte';
import { easeOutCubic } from './useCounterAnimation.svelte.js';

beforeEach(() => {
  vi.useFakeTimers({
    toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance'],
  });
  globalThis.__setReducedMotion(false);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  delete window.__counter;
});

function readValue(el) {
  return Number(el.dataset.value);
}

describe('useCounterAnimation', () => {
  it('arranca en 0 con isActive=true (antes del primer frame)', async () => {
    const { getByTestId } = render(CounterFixture, {
      props: { target: 100, duration: 1000 },
    });
    await tick();
    const el = getByTestId('counter');
    expect(readValue(el)).toBe(0);
    expect(el.dataset.complete).toBe('false');
    expect(el.dataset.active).toBe('true');
  });

  it('avanza hasta target a lo largo de la duración con easing', async () => {
    const { getByTestId } = render(CounterFixture, {
      props: { target: 100, duration: 1000 },
    });
    await tick();
    const el = getByTestId('counter');

    vi.advanceTimersByTime(500);
    await tick();
    const mid = readValue(el);
    // easeOutCubic(0.5) ≈ 0.875 → ~88. Validamos rango por si rAF drifta.
    expect(mid).toBeGreaterThan(50);
    expect(mid).toBeLessThan(100);
    expect(el.dataset.complete).toBe('false');

    vi.advanceTimersByTime(1000);
    await tick();
    expect(readValue(el)).toBe(100);
    expect(el.dataset.complete).toBe('true');
  });

  it('respeta prefers-reduced-motion: salta a target inmediatamente', async () => {
    globalThis.__setReducedMotion(true);
    const { getByTestId } = render(CounterFixture, {
      props: { target: 42, duration: 2000 },
    });
    await tick();
    const el = getByTestId('counter');
    expect(readValue(el)).toBe(42);
    expect(el.dataset.complete).toBe('true');
  });

  it('isActive=false mantiene value=0', async () => {
    const { getByTestId } = render(CounterFixture, {
      props: { target: 100, duration: 1000, isActive: false },
    });
    await tick();
    vi.advanceTimersByTime(2000);
    await tick();
    const el = getByTestId('counter');
    expect(readValue(el)).toBe(0);
    expect(el.dataset.active).toBe('false');
  });

  it('setActive(true) arranca la animación; setActive(false) la detiene y resetea a 0', async () => {
    const { getByTestId } = render(CounterFixture, {
      props: { target: 100, duration: 1000, isActive: false },
    });
    await tick();
    const el = getByTestId('counter');

    window.__counter.setActive(true);
    vi.advanceTimersByTime(1000);
    await tick();
    expect(readValue(el)).toBe(100);

    window.__counter.setActive(false);
    await tick();
    expect(readValue(el)).toBe(0);
    expect(el.dataset.active).toBe('false');
  });

  it('setTarget cambia el target y resetea la animación', async () => {
    const { getByTestId } = render(CounterFixture, {
      props: { target: 100, duration: 1000 },
    });
    await tick();
    const el = getByTestId('counter');

    vi.advanceTimersByTime(1000);
    await tick();
    expect(readValue(el)).toBe(100);

    window.__counter.setTarget(50);
    await tick();
    expect(el.dataset.target).toBe('50');
    expect(readValue(el)).toBe(0);

    vi.advanceTimersByTime(1000);
    await tick();
    expect(readValue(el)).toBe(50);
  });

  it('reset() vuelve a 0 y rearranca si está activo', async () => {
    const { getByTestId } = render(CounterFixture, {
      props: { target: 100, duration: 1000 },
    });
    await tick();
    const el = getByTestId('counter');

    vi.advanceTimersByTime(1000);
    await tick();
    expect(readValue(el)).toBe(100);

    window.__counter.reset();
    await tick();
    expect(readValue(el)).toBe(0);

    vi.advanceTimersByTime(1000);
    await tick();
    expect(readValue(el)).toBe(100);
  });

  it('isActive como getter reactivo: cambia la prop y la animación arranca/para', async () => {
    const { getByTestId, rerender } = render(CounterFixture, {
      props: { target: 100, duration: 1000, isActive: false, useGetter: true },
    });
    await tick();
    const el = getByTestId('counter');
    expect(readValue(el)).toBe(0);

    await rerender({ target: 100, duration: 1000, isActive: true, useGetter: true });
    await tick();
    vi.advanceTimersByTime(1000);
    await tick();
    expect(readValue(el)).toBe(100);
  });

  it('easeOutCubic está dentro del rango esperado', () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
    expect(easeOutCubic(0.5)).toBeCloseTo(0.875, 3);
  });
});
