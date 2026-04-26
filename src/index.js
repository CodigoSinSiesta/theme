/**
 * @codigosinsiesta/theme · index.js
 *
 * Punto de entrada JS para consumidores que quieren los tokens en runtime
 * (raros — la mayoría de decks importan los CSS files directamente).
 *
 * Mantiene paridad 1:1 con tokens.css.
 */

export const tokens = {
  // Paleta azul
  cobalto: '#1e3a8a',
  azul: '#2563eb',
  electrico: '#3b82f6',
  cielo: '#60a5fa',
  cielo2: '#93c5fd',
  marino: '#0c1e4f',

  // Neutros
  fondo: '#0f172a',
  fondoAlt: '#1e293b',
  fondoElev: '#152033',
  borde: '#334155',
  borde2: '#475569',
  tinta: '#f1f5f9',
  tinta2: '#cbd5e1',
  tinta3: '#94a3b8',
  tinta4: '#64748b',

  // Semánticos
  ok: '#34d399',
  warn: '#fbbf24',
  err: '#f87171',

  // Tipografía
  fontDisplay: '"Space Grotesk", "Inter", sans-serif',
  fontBody: '"Inter", system-ui, -apple-system, sans-serif',
  fontMono: '"JetBrains Mono", "IBM Plex Mono", monospace',

  // Slide canvas
  slideWidth: 1280,
  slideHeight: 720,
};

export default tokens;
