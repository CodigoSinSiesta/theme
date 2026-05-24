import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import { tick } from 'svelte';
import SiteFooterFixture from './__fixtures__/SiteFooterFixture.svelte';

afterEach(cleanup);

describe('SiteFooter', () => {
  it('renderiza <footer> con clase csi-site-footer', async () => {
    const { container } = render(SiteFooterFixture);
    await tick();
    const footer = container.querySelector('footer');
    expect(footer).toBeTruthy();
    expect(footer.className.split(/\s+/)[0]).toBe('csi-site-footer');
  });

  it('renderiza copyright cuando se pasa', async () => {
    const { container } = render(SiteFooterFixture, {
      props: { copyright: '© 2026 Alejandro' }
    });
    await tick();
    const copyright = container.querySelector('.csi-site-footer__copyright');
    expect(copyright).toBeTruthy();
    expect(copyright.textContent).toBe('© 2026 Alejandro');
  });

  it('NO renderiza el bloque copyright cuando string vacío', async () => {
    const { container } = render(SiteFooterFixture);
    await tick();
    expect(container.querySelector('.csi-site-footer__copyright')).toBeNull();
  });

  it('renderiza tagline cuando se pasa', async () => {
    const { container } = render(SiteFooterFixture, {
      props: { tagline: 'Hecho con ♥' }
    });
    await tick();
    const tagline = container.querySelector('.csi-site-footer__tagline');
    expect(tagline).toBeTruthy();
    expect(tagline.textContent).toBe('Hecho con ♥');
  });

  it('NO renderiza tagline cuando vacío', async () => {
    const { container } = render(SiteFooterFixture);
    await tick();
    expect(container.querySelector('.csi-site-footer__tagline')).toBeNull();
  });

  it('renderiza N links cuando se pasan', async () => {
    const { container } = render(SiteFooterFixture, {
      props: {
        links: [
          { href: '#a', label: 'A' },
          { href: '#b', label: 'B' },
          { href: '#c', label: 'C' }
        ]
      }
    });
    await tick();
    const anchors = container.querySelectorAll('a.csi-site-footer__link');
    expect(anchors.length).toBe(3);
    expect(anchors[1].getAttribute('href')).toBe('#b');
  });

  it('NO renderiza el nav cuando links está vacío', async () => {
    const { container } = render(SiteFooterFixture);
    await tick();
    expect(container.querySelector('.csi-site-footer__links')).toBeNull();
  });

  it('links externos llevan target="_blank" + rel="noopener noreferrer"', async () => {
    const { container } = render(SiteFooterFixture, {
      props: {
        links: [
          { href: '#internal', label: 'Internal' },
          { href: 'https://github.com', label: 'GitHub' },
          { href: 'http://example.com', label: 'Example' }
        ]
      }
    });
    await tick();
    const anchors = container.querySelectorAll('a.csi-site-footer__link');
    expect(anchors[0].getAttribute('target')).toBeNull();
    expect(anchors[0].getAttribute('rel')).toBeNull();
    expect(anchors[1].getAttribute('target')).toBe('_blank');
    expect(anchors[1].getAttribute('rel')).toBe('noopener noreferrer');
    expect(anchors[2].getAttribute('target')).toBe('_blank');
    expect(anchors[2].getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('links internos (#, mailto:, tel:) NO llevan target/rel', async () => {
    const { container } = render(SiteFooterFixture, {
      props: {
        links: [
          { href: 'mailto:a@b.com', label: 'Email' },
          { href: 'tel:+34123', label: 'Tel' },
          { href: '/about', label: 'About' }
        ]
      }
    });
    await tick();
    const anchors = container.querySelectorAll('a.csi-site-footer__link');
    anchors.forEach((a) => {
      expect(a.getAttribute('target')).toBeNull();
      expect(a.getAttribute('rel')).toBeNull();
    });
  });

  it('link con icon renderiza <img> apuntando a /icons/{icon}.svg', async () => {
    const { container } = render(SiteFooterFixture, {
      props: {
        links: [
          { href: 'https://github.com', label: 'GitHub', icon: 'github' }
        ]
      }
    });
    await tick();
    const img = container.querySelector('img.csi-site-footer__icon');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('/icons/github.svg');
    expect(img.getAttribute('alt')).toBe('');
    expect(img.getAttribute('aria-hidden')).toBe('true');
  });

  it('link sin icon NO renderiza <img>', async () => {
    const { container } = render(SiteFooterFixture, {
      props: {
        links: [{ href: '#a', label: 'A' }]
      }
    });
    await tick();
    expect(container.querySelector('img.csi-site-footer__icon')).toBeNull();
  });
});
