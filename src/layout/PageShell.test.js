import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import { tick } from 'svelte';
import PageShellFixture from './__fixtures__/PageShellFixture.svelte';

afterEach(cleanup);

function getShell(container) {
  return container.querySelector('.csi-page-shell');
}

describe('PageShell', () => {
  it('renderiza el skip link como primer elemento focusable', async () => {
    const { container } = render(PageShellFixture);
    await tick();
    const skip = container.querySelector('.csi-skip-link');
    expect(skip).toBeTruthy();
    expect(skip.getAttribute('href')).toBe('#main');
    expect(skip.textContent.trim()).toBe('Saltar al contenido');
  });

  it('aplica data-theme="dark" por defecto', async () => {
    const { container } = render(PageShellFixture);
    await tick();
    expect(getShell(container).getAttribute('data-theme')).toBe('dark');
  });

  it('aplica data-theme="light" cuando se pasa como prop', async () => {
    const { container } = render(PageShellFixture, {
      props: { theme: 'light' },
    });
    await tick();
    expect(getShell(container).getAttribute('data-theme')).toBe('light');
  });

  it('main tiene id="main" matcheando el href del skip link', async () => {
    const { container } = render(PageShellFixture);
    await tick();
    const main = container.querySelector('main');
    expect(main).toBeTruthy();
    expect(main.getAttribute('id')).toBe('main');
    expect(main.getAttribute('tabindex')).toBe('-1');
  });

  it('renderiza los snippets header/main/footer', async () => {
    const { getByTestId } = render(PageShellFixture);
    await tick();
    expect(getByTestId('header-content').textContent).toBe('HEADER');
    expect(getByTestId('main-content').textContent).toBe('MAIN');
    expect(getByTestId('footer-content').textContent).toBe('FOOTER');
  });

  it('NO renderiza la barra de scroll progress si scrollProgress=false (default)', async () => {
    const { container } = render(PageShellFixture);
    await tick();
    expect(container.querySelector('.csi-scroll-progress')).toBeNull();
  });

  it('renderiza la barra de scroll progress si scrollProgress=true', async () => {
    const { container } = render(PageShellFixture, {
      props: { scrollProgress: true },
    });
    await tick();
    const bar = container.querySelector('.csi-scroll-progress');
    expect(bar).toBeTruthy();
    expect(bar.getAttribute('aria-hidden')).toBe('true');
    expect(bar.getAttribute('role')).toBe('presentation');
  });

  it('aplica lang al contenedor (default "es")', async () => {
    const { container } = render(PageShellFixture);
    await tick();
    expect(getShell(container).getAttribute('lang')).toBe('es');
  });

  it('respeta lang custom', async () => {
    const { container } = render(PageShellFixture, {
      props: { lang: 'en' },
    });
    await tick();
    expect(getShell(container).getAttribute('lang')).toBe('en');
  });

  it('estructura DOM en orden: skip-link → (progress) → header → main → footer', async () => {
    const { container } = render(PageShellFixture, {
      props: { scrollProgress: true },
    });
    await tick();
    const shell = getShell(container);
    const children = Array.from(shell.children);
    // Svelte añade hashes scoped a clases con estilo en el <style> del
    // componente (.csi-scroll-progress, .csi-page-main). Comparamos solo
    // el primer token canónico de cada className.
    const classes = children.map((el) => (el.className || el.tagName).split(/\s+/)[0]);
    expect(classes).toEqual([
      'csi-skip-link',
      'csi-scroll-progress',
      'csi-page-header',
      'csi-page-main',
      'csi-page-footer',
    ]);
  });
});
