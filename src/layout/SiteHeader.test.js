import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import { tick } from 'svelte';
import SiteHeaderFixture from './__fixtures__/SiteHeaderFixture.svelte';

afterEach(cleanup);

function press(key, options = {}) {
  const { target = document.body, ...mods } = options;
  const event = new KeyboardEvent('keydown', {
    key,
    altKey: mods.alt || false,
    ctrlKey: mods.ctrl || false,
    shiftKey: mods.shift || false,
    metaKey: mods.meta || false,
    bubbles: true,
    cancelable: true
  });
  target.dispatchEvent(event);
  return event;
}

describe('SiteHeader', () => {
  it('renderiza un <header> + nav semánticos', async () => {
    const { container } = render(SiteHeaderFixture);
    await tick();
    expect(container.querySelector('header.csi-site-header')).toBeTruthy();
    expect(container.querySelector('nav.csi-site-header__nav')).toBeTruthy();
  });

  it('renderiza los links pasados', async () => {
    const { container } = render(SiteHeaderFixture, {
      props: {
        links: [
          { href: '#a', label: 'Alpha' },
          { href: '#b', label: 'Beta' },
          { href: '#c', label: 'Gamma' }
        ]
      }
    });
    await tick();
    const links = container.querySelectorAll('a.csi-site-header__link');
    expect(links.length).toBe(3);
    expect(links[0].getAttribute('href')).toBe('#a');
    expect(links[1].textContent).toContain('Beta');
  });

  it('marca el link activo con aria-current="page"', async () => {
    const { container } = render(SiteHeaderFixture, {
      props: {
        links: [
          { href: '#one', label: 'Uno' },
          { href: '#two', label: 'Dos' }
        ],
        activeHref: '#two'
      }
    });
    await tick();
    const links = container.querySelectorAll('a.csi-site-header__link');
    expect(links[0].getAttribute('aria-current')).toBeNull();
    expect(links[1].getAttribute('aria-current')).toBe('page');
  });

  it('links externos llevan target="_blank" + rel="noopener noreferrer"', async () => {
    const { container } = render(SiteHeaderFixture, {
      props: {
        links: [
          { href: '#internal', label: 'Internal' },
          { href: 'https://github.com', label: 'GitHub' },
          { href: 'mailto:a@b.com', label: 'Email' }
        ]
      }
    });
    await tick();
    const links = container.querySelectorAll('a.csi-site-header__link');
    expect(links[0].getAttribute('target')).toBeNull();
    expect(links[0].getAttribute('rel')).toBeNull();
    expect(links[1].getAttribute('target')).toBe('_blank');
    expect(links[1].getAttribute('rel')).toBe('noopener noreferrer');
    expect(links[2].getAttribute('target')).toBe('_blank');
    expect(links[2].getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('registra Alt+N shortcuts y los dispara cuando se pulsan', async () => {
    const link2 = { href: '#two', label: 'Dos' };
    const link2El = document.createElement('div');
    link2El.id = 'two';
    link2El.scrollIntoView = vi.fn();
    document.body.appendChild(link2El);

    render(SiteHeaderFixture, {
      props: {
        links: [{ href: '#one', label: 'Uno' }, link2]
      }
    });
    await tick();

    press('2', { alt: true });
    expect(link2El.scrollIntoView).toHaveBeenCalled();
    document.body.removeChild(link2El);
  });

  it('keyboardShortcuts=false NO registra atajos', async () => {
    const el = document.createElement('div');
    el.id = 'one';
    el.scrollIntoView = vi.fn();
    document.body.appendChild(el);

    render(SiteHeaderFixture, {
      props: {
        links: [{ href: '#one', label: 'Uno' }],
        keyboardShortcuts: false
      }
    });
    await tick();

    press('1', { alt: true });
    expect(el.scrollIntoView).not.toHaveBeenCalled();
    document.body.removeChild(el);
  });

  it('solo registra atajos para los primeros 9 links', async () => {
    // Render con 12 links. El 10º (key='10') no debería matchear Alt+0 ni nada.
    const links = Array.from({ length: 12 }, (_, i) => {
      const el = document.createElement('div');
      el.id = `link-${i}`;
      el.scrollIntoView = vi.fn();
      document.body.appendChild(el);
      return { href: `#link-${i}`, label: `Link ${i}` };
    });

    render(SiteHeaderFixture, { props: { links } });
    await tick();

    // Verificamos que el 9º (i=8, key '9') sí dispara
    press('9', { alt: true });
    expect(document.querySelector('#link-8').scrollIntoView).toHaveBeenCalled();

    // El 10º (i=9, hypothetically '10') no debería disparar — no hay atajo para '10' como key
    press('0', { alt: true });
    expect(document.querySelector('#link-9').scrollIntoView).not.toHaveBeenCalled();

    links.forEach((_, i) => document.body.removeChild(document.querySelector(`#link-${i}`)));
  });

  it('renderiza el logoVariant="owl" sin wordmark', async () => {
    const { container } = render(SiteHeaderFixture, {
      props: { logoVariant: 'owl' }
    });
    await tick();
    expect(container.querySelector('.csi-site-header__owl')).toBeTruthy();
    expect(container.querySelector('.csi-site-header__wordmark')).toBeNull();
  });

  it('renderiza el logoVariant="wordmark" sin owl', async () => {
    const { container } = render(SiteHeaderFixture, {
      props: { logoVariant: 'wordmark' }
    });
    await tick();
    expect(container.querySelector('.csi-site-header__owl')).toBeNull();
    expect(container.querySelector('.csi-site-header__wordmark')).toBeTruthy();
  });

  it('logoVariant="both" (default) renderiza ambos', async () => {
    const { container } = render(SiteHeaderFixture);
    await tick();
    expect(container.querySelector('.csi-site-header__owl')).toBeTruthy();
    expect(container.querySelector('.csi-site-header__wordmark')).toBeTruthy();
  });

  it('renderiza el slot controls cuando se proporciona', async () => {
    const { queryByTestId } = render(SiteHeaderFixture, {
      props: { showControls: false }
    });
    await tick();
    expect(queryByTestId('control-btn')).toBeNull();

    cleanup();

    const { getByTestId } = render(SiteHeaderFixture, {
      props: { showControls: true }
    });
    await tick();
    expect(getByTestId('control-btn')).toBeTruthy();
  });

  it('el hamburger summary tiene aria-label accesible', async () => {
    const { container } = render(SiteHeaderFixture);
    await tick();
    const summary = container.querySelector('summary.csi-site-header__hamburger');
    expect(summary).toBeTruthy();
    expect(summary.getAttribute('aria-label')).toBe('Abrir menú');
  });
});
