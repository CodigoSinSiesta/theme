import { describe, it, expect, beforeEach } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import { tick } from 'svelte';
import IOFixture from './__fixtures__/IOFixture.svelte';

const MockIO = globalThis.__MockIO;

beforeEach(() => {
  MockIO.reset();
  cleanup();
});

function lastInstance() {
  return MockIO.instances[MockIO.instances.length - 1];
}

describe('useIntersectionObserver', () => {
  it('arranca con isVisible = false hasta que el observer dispara', () => {
    const { getByTestId } = render(IOFixture);
    expect(getByTestId('visible-state').dataset.visible).toBe('false');
  });

  it('propaga las opciones a IntersectionObserver', () => {
    render(IOFixture, {
      props: { options: { threshold: 0.5, rootMargin: '10px' } },
    });
    const io = lastInstance();
    expect(io.options.threshold).toBe(0.5);
    expect(io.options.rootMargin).toBe('10px');
  });

  it('pone isVisible = true cuando un target entra en viewport', async () => {
    const { getByTestId } = render(IOFixture);
    const target = getByTestId('target-0');

    lastInstance().__trigger([{ target, isIntersecting: true }]);
    await tick();

    expect(getByTestId('visible-state').dataset.visible).toBe('true');
  });

  it('vuelve a false cuando el único target sale del viewport', async () => {
    const { getByTestId } = render(IOFixture);
    const target = getByTestId('target-0');
    const io = lastInstance();

    io.__trigger([{ target, isIntersecting: true }]);
    await tick();
    expect(getByTestId('visible-state').dataset.visible).toBe('true');

    io.__trigger([{ target, isIntersecting: false }]);
    await tick();
    expect(getByTestId('visible-state').dataset.visible).toBe('false');
  });

  it('triggerOnce desconecta tras la primera intersección', async () => {
    const { getByTestId } = render(IOFixture, {
      props: { options: { triggerOnce: true } },
    });
    const target = getByTestId('target-0');
    const io = lastInstance();

    io.__trigger([{ target, isIntersecting: true }]);
    await tick();

    expect(io.disconnected).toBe(true);
    expect(getByTestId('visible-state').dataset.visible).toBe('true');
  });

  it('isVisible = true mientras CUALQUIER target esté intersectando (multi-node)', async () => {
    const { getByTestId } = render(IOFixture, { props: { count: 3 } });
    const t0 = getByTestId('target-0');
    const t1 = getByTestId('target-1');
    const t2 = getByTestId('target-2');

    // Cada nodo crea su propia instancia de IO (uno por use:)
    const ios = MockIO.instances.slice(-3);

    ios[1].__trigger([{ target: t1, isIntersecting: true }]);
    await tick();
    expect(getByTestId('visible-state').dataset.visible).toBe('true');

    ios[1].__trigger([{ target: t1, isIntersecting: false }]);
    await tick();
    expect(getByTestId('visible-state').dataset.visible).toBe('false');

    ios[0].__trigger([{ target: t0, isIntersecting: true }]);
    ios[2].__trigger([{ target: t2, isIntersecting: true }]);
    await tick();
    expect(getByTestId('visible-state').dataset.visible).toBe('true');
  });

  it('limpia el observer cuando el componente se destruye', () => {
    const { unmount } = render(IOFixture);
    const io = lastInstance();
    expect(io.disconnected).toBe(false);
    unmount();
    expect(io.disconnected).toBe(true);
  });
});
