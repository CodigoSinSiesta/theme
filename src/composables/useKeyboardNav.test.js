import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import { tick } from 'svelte';
import KeyboardNavFixture from './__fixtures__/KeyboardNavFixture.svelte';

afterEach(() => {
  cleanup();
  delete window.__nav;
});

/**
 * Dispara un KeyboardEvent('keydown') en el target especificado (default body).
 */
function press(key, options = {}) {
  const { target = document.body, ...modifiers } = options;
  const event = new KeyboardEvent('keydown', {
    key,
    altKey: modifiers.alt || false,
    ctrlKey: modifiers.ctrl || false,
    shiftKey: modifiers.shift || false,
    metaKey: modifiers.meta || false,
    bubbles: true,
    cancelable: true,
  });
  target.dispatchEvent(event);
  return event;
}

describe('useKeyboardNav', () => {
  it('dispara el handler cuando la tecla matchea (sin modifier)', async () => {
    const handler = vi.fn();
    render(KeyboardNavFixture, {
      props: { shortcuts: [{ key: 'Escape', label: 'cerrar', handler }] },
    });
    await tick();

    press('Escape');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('NO dispara si la tecla no matchea', async () => {
    const handler = vi.fn();
    render(KeyboardNavFixture, {
      props: { shortcuts: [{ key: 'Escape', label: 'cerrar', handler }] },
    });
    await tick();

    press('Enter');
    expect(handler).not.toHaveBeenCalled();
  });

  it('matchea modifier "alt" exactamente (alt sí, ctrl no)', async () => {
    const handler = vi.fn();
    render(KeyboardNavFixture, {
      props: {
        shortcuts: [{ key: '1', modifier: 'alt', label: 'hero', handler }],
      },
    });
    await tick();

    press('1', { alt: true });
    expect(handler).toHaveBeenCalledTimes(1);

    press('1');
    press('1', { ctrl: true });
    press('1', { alt: true, ctrl: true });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('matchea modifier combinado "altShift"', async () => {
    const handler = vi.fn();
    render(KeyboardNavFixture, {
      props: {
        shortcuts: [{ key: 'k', modifier: 'altShift', label: 'cmd', handler }],
      },
    });
    await tick();

    press('k', { alt: true, shift: true });
    expect(handler).toHaveBeenCalledTimes(1);

    press('k', { alt: true });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('match de tecla case-insensitive para letras', async () => {
    const handler = vi.fn();
    render(KeyboardNavFixture, {
      props: { shortcuts: [{ key: 'a', label: 'a', handler }] },
    });
    await tick();

    press('A');
    press('a');
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it('NO dispara cuando el foco está en input (sin forceTrigger)', async () => {
    const handler = vi.fn();
    const { getByTestId } = render(KeyboardNavFixture, {
      props: { shortcuts: [{ key: 'a', label: 'a', handler }] },
    });
    await tick();
    const input = getByTestId('input');

    press('a', { target: input });
    expect(handler).not.toHaveBeenCalled();
  });

  it('NO dispara cuando el foco está en contenteditable', async () => {
    const handler = vi.fn();
    const { getByTestId } = render(KeyboardNavFixture, {
      props: { shortcuts: [{ key: 'a', label: 'a', handler }] },
    });
    await tick();
    const editable = getByTestId('editable');

    press('a', { target: editable });
    expect(handler).not.toHaveBeenCalled();
  });

  it('forceTrigger=true SÍ dispara aunque el foco esté en input', async () => {
    const handler = vi.fn();
    const { getByTestId } = render(KeyboardNavFixture, {
      props: {
        shortcuts: [
          { key: 'Escape', label: 'cerrar', handler, forceTrigger: true },
        ],
      },
    });
    await tick();
    const input = getByTestId('input');

    press('Escape', { target: input });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('preventDefault: true por defecto, false respeta el navegador', async () => {
    const handlerPrev = vi.fn();
    const handlerNoPrev = vi.fn();
    render(KeyboardNavFixture, {
      props: {
        shortcuts: [
          { key: 'a', label: 'a', handler: handlerPrev },
          { key: 'b', label: 'b', handler: handlerNoPrev, preventDefault: false },
        ],
      },
    });
    await tick();

    const ev1 = press('a');
    expect(ev1.defaultPrevented).toBe(true);

    const ev2 = press('b');
    expect(ev2.defaultPrevented).toBe(false);
  });

  it('cleanup on destroy elimina el listener', async () => {
    const handler = vi.fn();
    const { unmount } = render(KeyboardNavFixture, {
      props: { shortcuts: [{ key: 'a', label: 'a', handler }] },
    });
    await tick();

    press('a');
    expect(handler).toHaveBeenCalledTimes(1);

    unmount();
    press('a');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('múltiples instancias coexisten sin pisarse', async () => {
    const h1 = vi.fn();
    const h2 = vi.fn();

    render(KeyboardNavFixture, {
      props: { shortcuts: [{ key: '1', label: 'one', handler: h1 }] },
    });
    render(KeyboardNavFixture, {
      props: { shortcuts: [{ key: '2', label: 'two', handler: h2 }] },
    });
    await tick();

    press('1');
    press('2');
    expect(h1).toHaveBeenCalledTimes(1);
    expect(h2).toHaveBeenCalledTimes(1);
  });

  it('shortcuts como getter: cambios en la prop se reflejan reactivamente', async () => {
    const h1 = vi.fn();
    const h2 = vi.fn();
    const { rerender } = render(KeyboardNavFixture, {
      props: {
        shortcuts: [{ key: 'a', label: 'a', handler: h1 }],
        useGetter: true,
      },
    });
    await tick();

    press('a');
    expect(h1).toHaveBeenCalledTimes(1);

    await rerender({
      shortcuts: [{ key: 'b', label: 'b', handler: h2 }],
      useGetter: true,
    });
    await tick();

    press('a');
    press('b');
    expect(h1).toHaveBeenCalledTimes(1);
    expect(h2).toHaveBeenCalledTimes(1);
  });
});
