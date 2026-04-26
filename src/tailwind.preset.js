/**
 * @codigosinsiesta/theme · tailwind.preset.js
 *
 * Preset de Tailwind con los tokens V4 mapeados a `theme.extend.colors.csi`.
 * Para uso directo en `tailwind.config.{js,mjs}` de cualquier deck:
 *
 *   import csiPreset from '@codigosinsiesta/theme/tailwind.preset.js';
 *   export default {
 *     presets: [csiPreset],
 *     content: [...]
 *   };
 *
 * Nombrespace `csi-*` usado para no chocar con nombres por defecto de Tailwind.
 * Ejemplo: `bg-csi-fondo`, `text-csi-cielo`, `border-csi-borde`.
 */

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        csi: {
          // Paleta azul
          cobalto:   '#1e3a8a',
          azul:      '#2563eb',
          electrico: '#3b82f6',
          cielo:     '#60a5fa',
          cielo2:    '#93c5fd',
          marino:    '#0c1e4f',

          // Neutros slate-navy
          fondo:     '#0f172a',
          fondoAlt:  '#1e293b',
          fondoElev: '#152033',
          borde:     '#334155',
          borde2:    '#475569',
          tinta:     '#f1f5f9',
          tinta2:    '#cbd5e1',
          tinta3:    '#94a3b8',
          tinta4:    '#64748b',

          // Semánticos
          ok:        '#34d399',
          warn:      '#fbbf24',
          err:       '#f87171',
        },
      },
      fontFamily: {
        csiDisplay: ['Space Grotesk', 'Inter', 'sans-serif'],
        csiBody:    ['Inter', 'system-ui', 'sans-serif'],
        csiMono:    ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      },
      backgroundImage: {
        'csi-accent-bar':
          'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
        'csi-highlight-text':
          'linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #a78bfa 100%)',
      },
      boxShadow: {
        'csi-card': '0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.15)',
        'csi-card-hover':
          '0 12px 40px 0 rgba(59,130,246,0.2), inset 0 1px 1px 0 rgba(96,165,250,0.25)',
      },
    },
  },
};
