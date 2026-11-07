import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import jsQR from 'jsqr';
import QRCode from './QRCode.svelte';

const ESCALA = 6;

/** Pinta el trazado del SVG en píxeles y lo escanea con un lector real. */
function leer(container) {
  const svg = container.querySelector('svg');
  const lado = Number(svg.getAttribute('viewBox').split(' ')[2]);
  const ancho = lado * ESCALA;
  const pixeles = new Uint8ClampedArray(ancho * ancho * 4).fill(255);

  const celdas = svg.querySelector('path').getAttribute('d').matchAll(/M(\d+) (\d+)h1v1h-1z/g);
  for (const [, x, y] of celdas) {
    for (let fila = 0; fila < ESCALA; fila++) {
      for (let columna = 0; columna < ESCALA; columna++) {
        const i = ((Number(y) * ESCALA + fila) * ancho + Number(x) * ESCALA + columna) * 4;
        pixeles.fill(0, i, i + 3);
      }
    }
  }
  return jsQR(pixeles, ancho, ancho)?.data;
}

describe('QRCode', () => {
  it('genera un código que un lector real descifra', () => {
    const url = 'https://github.com/CodigoSinSiesta/taller-kit-junior-starter';
    const { container } = render(QRCode, { props: { url } });
    expect(leer(container)).toBe(url);
  });

  it('abre con https las direcciones sin esquema', () => {
    const { container } = render(QRCode, { props: { url: 'codigosinsiesta.github.io/theme' } });
    expect(leer(container)).toBe('https://codigosinsiesta.github.io/theme');
  });

  it('respeta otros esquemas', () => {
    const { container } = render(QRCode, { props: { url: 'mailto:hola@ejemplo.es' } });
    expect(leer(container)).toBe('mailto:hola@ejemplo.es');
  });

  it('enseña la dirección tal como se escribió', () => {
    const { getByText } = render(QRCode, { props: { url: 'codigosinsiesta.github.io/theme' } });
    expect(getByText('codigosinsiesta.github.io/theme')).toBeTruthy();
  });

  it('cambia el código si cambia la dirección', async () => {
    const { container, rerender } = render(QRCode, { props: { url: 'https://a.example' } });
    await rerender({ url: 'https://b.example' });
    expect(leer(container)).toBe('https://b.example');
  });

  it('no dibuja ningún código sin dirección', () => {
    const { container } = render(QRCode, { props: { title: 'Escanea' } });
    expect(container.querySelector('svg')).toBeNull();
  });
});
