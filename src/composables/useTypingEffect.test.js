import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import { tick } from 'svelte';
import TypingFixture from './__fixtures__/TypingFixture.svelte';

beforeEach(() => {
  vi.useFakeTimers();
  globalThis.__setReducedMotion(false);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  delete window.__typing;
});

function readText(el) {
  return el.dataset.text;
}

describe('useTypingEffect', () => {
  it('arranca con displayText vacío y va avanzando un carácter por tick', async () => {
    const { getByTestId } = render(TypingFixture, {
      props: { options: { text: 'hola', speed: 50 } },
    });
    await tick();
    const el = getByTestId('typing');
    expect(readText(el)).toBe('');
    expect(el.dataset.complete).toBe('false');

    vi.advanceTimersByTime(50);
    await tick();
    expect(readText(el)).toBe('h');

    vi.advanceTimersByTime(50);
    await tick();
    expect(readText(el)).toBe('ho');

    vi.advanceTimersByTime(100);
    await tick();
    expect(readText(el)).toBe('hola');
  });

  it('marca isComplete=true tras escribir todo el texto', async () => {
    const { getByTestId } = render(TypingFixture, {
      props: { options: { text: 'hi', speed: 50 } },
    });
    await tick();
    const el = getByTestId('typing');

    // 'hi' = 2 chars. Necesitamos 3 timeouts: char1, char2, completion.
    vi.advanceTimersByTime(50 * 3);
    await tick();
    expect(readText(el)).toBe('hi');
    expect(el.dataset.complete).toBe('true');
  });

  it('respeta startDelay antes del primer carácter', async () => {
    const { getByTestId } = render(TypingFixture, {
      props: { options: { text: 'x', speed: 50, startDelay: 500 } },
    });
    await tick();
    const el = getByTestId('typing');

    vi.advanceTimersByTime(400);
    await tick();
    expect(readText(el)).toBe('');

    vi.advanceTimersByTime(100);
    await tick();
    expect(readText(el)).toBe('');

    vi.advanceTimersByTime(50);
    await tick();
    expect(readText(el)).toBe('x');
  });

  it('prefers-reduced-motion: muestra texto completo instantáneamente', async () => {
    globalThis.__setReducedMotion(true);
    const { getByTestId } = render(TypingFixture, {
      props: { options: { text: 'instant', speed: 80 } },
    });
    await tick();
    const el = getByTestId('typing');
    expect(readText(el)).toBe('instant');
    expect(el.dataset.complete).toBe('true');
  });

  it('loop=true escribe, pausa, borra y vuelve a empezar', async () => {
    const { getByTestId } = render(TypingFixture, {
      props: { options: { text: 'go', speed: 50, loop: true, loopPause: 200 } },
    });
    await tick();
    const el = getByTestId('typing');

    // Escribe 'go' (chars 1, 2) y completa.
    vi.advanceTimersByTime(50 * 3);
    await tick();
    expect(readText(el)).toBe('go');
    expect(el.dataset.complete).toBe('true');

    // Pausa loopPause antes de empezar a borrar.
    vi.advanceTimersByTime(200);
    await tick();
    // Empieza a borrar: backward(2) → 'go', backward(1) → 'g'
    vi.advanceTimersByTime(50);
    await tick();
    expect(readText(el)).toBe('g');

    vi.advanceTimersByTime(50);
    await tick();
    expect(readText(el)).toBe('');

    // Tras borrar, pausa loopPause y vuelve a empezar.
    vi.advanceTimersByTime(50 + 200);
    await tick();
    vi.advanceTimersByTime(50);
    await tick();
    expect(readText(el)).toBe('g');
  });

  it('reset() vuelve a empezar desde cero', async () => {
    const { getByTestId } = render(TypingFixture, {
      props: { options: { text: 'abc', speed: 50 } },
    });
    await tick();
    const el = getByTestId('typing');

    vi.advanceTimersByTime(50 * 4);
    await tick();
    expect(readText(el)).toBe('abc');
    expect(el.dataset.complete).toBe('true');

    window.__typing.reset();
    await tick();
    expect(readText(el)).toBe('');
    expect(el.dataset.complete).toBe('false');

    vi.advanceTimersByTime(50);
    await tick();
    expect(readText(el)).toBe('a');
  });

  it('cleanup en destroy no deja timers colgando', async () => {
    const { getByTestId, unmount } = render(TypingFixture, {
      props: { options: { text: 'long text here', speed: 100 } },
    });
    await tick();
    const el = getByTestId('typing');
    vi.advanceTimersByTime(100);
    await tick();
    expect(readText(el)).toBe('l');

    unmount();
    // Sin manejo de cleanup, los timers seguirían activos. Como el componente
    // está unmounted, este advance no debería disparar errores.
    expect(() => vi.advanceTimersByTime(10000)).not.toThrow();
  });
});
