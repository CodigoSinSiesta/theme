import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import { tick } from 'svelte';
import BentoCardFixture from './__fixtures__/BentoCardFixture.svelte';

const MockIO = globalThis.__MockIO;

beforeEach(() => {
  MockIO.reset();
});

afterEach(cleanup);

function getArticle(container) {
  return container.querySelector('article');
}

function lastInstance() {
  return MockIO.instances[MockIO.instances.length - 1];
}

describe('BentoCard', () => {
  it('renderiza <article> con clase base csi-bento-card', async () => {
    const { container } = render(BentoCardFixture);
    await tick();
    const article = getArticle(container);
    expect(article).toBeTruthy();
    const classes = article.className.split(/\s+/);
    expect(classes).toContain('csi-bento-card');
  });

  it('size="md" (default) → clase csi-bento-card--md', async () => {
    const { container } = render(BentoCardFixture);
    await tick();
    const classes = getArticle(container).className.split(/\s+/);
    expect(classes).toContain('csi-bento-card--md');
  });

  it('size="xl" → clase csi-bento-card--xl', async () => {
    const { container } = render(BentoCardFixture, { props: { size: 'xl' } });
    await tick();
    const classes = getArticle(container).className.split(/\s+/);
    expect(classes).toContain('csi-bento-card--xl');
  });

  it('size="sm" y "lg" → clases correspondientes', async () => {
    const { container: c1 } = render(BentoCardFixture, { props: { size: 'sm' } });
    await tick();
    expect(getArticle(c1).className.split(/\s+/)).toContain('csi-bento-card--sm');
    cleanup();
    const { container: c2 } = render(BentoCardFixture, { props: { size: 'lg' } });
    await tick();
    expect(getArticle(c2).className.split(/\s+/)).toContain('csi-bento-card--lg');
  });

  it('ariaLabel se aplica al <article>', async () => {
    const { container } = render(BentoCardFixture, {
      props: { ariaLabel: 'Hero section' }
    });
    await tick();
    expect(getArticle(container).getAttribute('aria-label')).toBe('Hero section');
  });

  it('id="hero" → atributo id="hero"; sin id → atributo ausente', async () => {
    const { container: c1 } = render(BentoCardFixture, { props: { id: 'hero' } });
    await tick();
    expect(getArticle(c1).getAttribute('id')).toBe('hero');
    cleanup();
    const { container: c2 } = render(BentoCardFixture);
    await tick();
    expect(getArticle(c2).hasAttribute('id')).toBe(false);
  });

  it('keyboardHint="" (default) → NO renderiza <kbd>', async () => {
    const { container } = render(BentoCardFixture);
    await tick();
    expect(container.querySelector('kbd.csi-bento-card-hint')).toBeNull();
  });

  it('keyboardHint="Alt+1" → renderiza <kbd> con el texto', async () => {
    const { container } = render(BentoCardFixture, {
      props: { keyboardHint: 'Alt+1' }
    });
    await tick();
    const kbd = container.querySelector('kbd.csi-bento-card-hint');
    expect(kbd).toBeTruthy();
    expect(kbd.textContent).toBe('Alt+1');
    expect(kbd.getAttribute('aria-hidden')).toBe('true');
  });

  it('entryAnimation=true (default) → clase --animate + data-visible="false" inicial', async () => {
    const { container } = render(BentoCardFixture);
    await tick();
    const article = getArticle(container);
    expect(article.className.split(/\s+/)).toContain('csi-bento-card--animate');
    expect(article.getAttribute('data-visible')).toBe('false');
  });

  it('entryAnimation=false → NO clase --animate', async () => {
    const { container } = render(BentoCardFixture, {
      props: { entryAnimation: false }
    });
    await tick();
    expect(getArticle(container).className.split(/\s+/)).not.toContain(
      'csi-bento-card--animate'
    );
  });

  it('cuando el mock IO dispara intersección, data-visible pasa a "true"', async () => {
    const { container } = render(BentoCardFixture);
    await tick();
    const article = getArticle(container);
    expect(article.getAttribute('data-visible')).toBe('false');

    const io = lastInstance();
    io.__trigger([{ target: article, isIntersecting: true }]);
    await tick();

    expect(article.getAttribute('data-visible')).toBe('true');
  });

  it('triggerOnce: tras la primera intersección el observer queda desconectado', async () => {
    const { container } = render(BentoCardFixture);
    await tick();
    const article = getArticle(container);
    const io = lastInstance();

    expect(io.disconnected).toBe(false);
    io.__trigger([{ target: article, isIntersecting: true }]);
    await tick();
    expect(io.disconnected).toBe(true);
  });

  it('renderiza los children dentro del article', async () => {
    const { getByTestId } = render(BentoCardFixture);
    await tick();
    expect(getByTestId('card-content').textContent).toBe('Contenido');
  });
});
