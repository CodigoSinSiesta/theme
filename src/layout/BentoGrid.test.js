import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import { tick } from 'svelte';
import BentoGridFixture from './__fixtures__/BentoGridFixture.svelte';

afterEach(cleanup);

function getGrid(container) {
  return container.querySelector('section');
}

describe('BentoGrid', () => {
  it('renderiza un <section class="csi-bento-grid">', async () => {
    const { container } = render(BentoGridFixture);
    await tick();
    const section = getGrid(container);
    expect(section).toBeTruthy();
    expect(section.tagName).toBe('SECTION');
    // Svelte añade hashes scoped (.svelte-xxxxx) — comparamos solo el primer token.
    expect(section.className.split(/\s+/)[0]).toBe('csi-bento-grid');
  });

  it('renderiza los children dentro del section', async () => {
    const { container, getByTestId } = render(BentoGridFixture);
    await tick();
    const section = getGrid(container);
    const child1 = getByTestId('child-1');
    const child2 = getByTestId('child-2');
    expect(child1.textContent).toBe('A');
    expect(child2.textContent).toBe('B');
    expect(section.contains(child1)).toBe(true);
    expect(section.contains(child2)).toBe(true);
  });

  it('cols por defecto 12 → style contiene --csi-bento-cols: 12', async () => {
    const { container } = render(BentoGridFixture);
    await tick();
    const style = getGrid(container).getAttribute('style') || '';
    expect(style).toContain('--csi-bento-cols: 12');
  });

  it('cols=8 → style contiene --csi-bento-cols: 8', async () => {
    const { container } = render(BentoGridFixture, { props: { cols: 8 } });
    await tick();
    const style = getGrid(container).getAttribute('style') || '';
    expect(style).toContain('--csi-bento-cols: 8');
  });

  it('gap por defecto "20px" → style contiene --csi-bento-gap: 20px', async () => {
    const { container } = render(BentoGridFixture);
    await tick();
    const style = getGrid(container).getAttribute('style') || '';
    expect(style).toContain('--csi-bento-gap: 20px');
  });

  it('gap="32px" → style contiene --csi-bento-gap: 32px', async () => {
    const { container } = render(BentoGridFixture, { props: { gap: '32px' } });
    await tick();
    const style = getGrid(container).getAttribute('style') || '';
    expect(style).toContain('--csi-bento-gap: 32px');
  });

  it('dense=true (default) → tiene la clase csi-bento-grid--dense', async () => {
    const { container } = render(BentoGridFixture);
    await tick();
    const section = getGrid(container);
    const classes = section.className.split(/\s+/);
    expect(classes).toContain('csi-bento-grid--dense');
  });

  it('dense=false → NO tiene la clase csi-bento-grid--dense', async () => {
    const { container } = render(BentoGridFixture, { props: { dense: false } });
    await tick();
    const section = getGrid(container);
    const classes = section.className.split(/\s+/);
    expect(classes).not.toContain('csi-bento-grid--dense');
  });

  it('ariaLabel="Layout principal" → aplica aria-label', async () => {
    const { container } = render(BentoGridFixture, {
      props: { ariaLabel: 'Layout principal' }
    });
    await tick();
    expect(getGrid(container).getAttribute('aria-label')).toBe('Layout principal');
  });

  it('sin ariaLabel → atributo aria-label ausente', async () => {
    const { container } = render(BentoGridFixture);
    await tick();
    expect(getGrid(container).hasAttribute('aria-label')).toBe(false);
  });
});
