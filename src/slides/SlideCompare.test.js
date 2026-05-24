import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import { tick } from 'svelte';
import SlideCompareFixture from './__fixtures__/SlideCompareFixture.svelte';

afterEach(cleanup);

describe('SlideCompare', () => {
  it('renderiza eyebrow + título con highlight', async () => {
    const { container } = render(SlideCompareFixture);
    await tick();
    expect(container.querySelector('h2')).toBeTruthy();
    expect(container.querySelector('h2 .highlight').textContent).toBe('prácticas');
  });

  it('subtitle="" (default) → NO renderiza .subtitle', async () => {
    const { container } = render(SlideCompareFixture);
    await tick();
    expect(container.querySelector('.subtitle')).toBeNull();
  });

  it('subtitle con texto → renderiza .subtitle con markdown inline aplicado', async () => {
    const { container } = render(SlideCompareFixture, {
      props: { subtitle: 'El agente es tan **bueno** como el `dev`.' }
    });
    await tick();
    const sub = container.querySelector('.subtitle');
    expect(sub).toBeTruthy();
    expect(sub.querySelector('strong').textContent).toBe('bueno');
    expect(sub.querySelector('code').textContent).toBe('dev');
  });

  it('insight=null (default) → NO renderiza aside.insight', async () => {
    const { container } = render(SlideCompareFixture);
    await tick();
    expect(container.querySelector('aside.insight')).toBeNull();
  });

  it('insight con icon + body → renderiza icon y body con markdown', async () => {
    const { container } = render(SlideCompareFixture, {
      props: { insight: { icon: '🤖', body: 'Tú eres **Tony Stark**.' } }
    });
    await tick();
    const aside = container.querySelector('aside.insight');
    expect(aside).toBeTruthy();
    expect(aside.querySelector('.insight-icon').textContent).toBe('🤖');
    expect(aside.querySelector('.insight-body strong').textContent).toBe('Tony Stark');
  });

  it('insight sin icon → renderiza body pero NO icon', async () => {
    const { container } = render(SlideCompareFixture, {
      props: { insight: { body: 'Solo texto, sin icono.' } }
    });
    await tick();
    expect(container.querySelector('aside.insight .insight-icon')).toBeNull();
    expect(container.querySelector('aside.insight .insight-body').textContent).toContain('Solo texto');
  });

  it('renderiza los items de cada lado en el orden correcto', async () => {
    const { container } = render(SlideCompareFixture);
    await tick();
    const cards = container.querySelectorAll('.card');
    expect(cards.length).toBe(2);
    const leftItems = cards[0].querySelectorAll('.items li');
    const rightItems = cards[1].querySelectorAll('.items li');
    expect(leftItems.length).toBe(2);
    expect(rightItems.length).toBe(2);
    expect(rightItems[0].textContent).toContain('Hacer X');
  });

  it('items soportan **strong** y `code` inline (markdown ligero)', async () => {
    const { container } = render(SlideCompareFixture, {
      props: {
        right: {
          label: 'OK',
          items: ['Usa `CLAUDE.md` para **codificar** las reglas']
        }
      }
    });
    await tick();
    const rightCard = container.querySelectorAll('.card')[1];
    const li = rightCard.querySelector('.items li');
    expect(li.querySelector('code').textContent).toBe('CLAUDE.md');
    expect(li.querySelector('strong').textContent).toBe('codificar');
  });

  it('sin headline → renderiza h3.card-title (patrón sobrio)', async () => {
    const { container } = render(SlideCompareFixture);
    await tick();
    const titles = container.querySelectorAll('h3.card-title');
    expect(titles.length).toBe(2);
    expect(titles[0].textContent).toBe('Evita esto');
    expect(titles[1].textContent).toBe('Hazlo');
    expect(container.querySelector('.card-headline')).toBeNull();
  });

  it('con headline → renderiza card-label + card-headline (patrón elaborado)', async () => {
    const { container } = render(SlideCompareFixture, {
      props: {
        left: { label: 'EVITA', headline: 'Recetas para el desastre', items: ['x'] },
        right: { label: 'HAZ', headline: 'El flujo que funciona', items: ['y'] }
      }
    });
    await tick();
    expect(container.querySelector('h3.card-title')).toBeNull();
    expect(container.querySelectorAll('.card-headline').length).toBe(2);
    expect(container.querySelectorAll('.card-headline')[0].textContent).toBe('Recetas para el desastre');
  });
});
