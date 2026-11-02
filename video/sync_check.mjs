// Comprueba la sincronía (palabras no encontradas, planos sin duración, elementos fuera de su plano) y que ningún
// texto se salga de su caja.
// uso: node sync_check.mjs
import { chromium } from 'playwright-core';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// Se ejecuta desde la carpeta work/ del vídeo (los ficheros del motor están enlazados allí).
const here = process.cwd();
const exe = process.env.CHROME || `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const browser = await chromium.launch({ executablePath: exe, args: ['--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.goto('file://' + path.join(here, 'pildora.html') + (process.env.SHOTS ? '?shots=' + encodeURIComponent(process.env.SHOTS) : ''));
await page.evaluate(() => window.ready);
const r = await page.evaluate(() => {
  const out = { missing: window.SYNC_MISSING, bad: [], rows: [] };
  FLAT.forEach(o => {
    const D = o._tb - o._ta;
    if (D < 1.5) out.bad.push(`${o._seg} plano de ${D.toFixed(2)} s`);
    for (const [k, v] of Object.entries(o._A || {})) v.forEach((x, i) => { if (x !== undefined) {
      if (x > D - 0.3) out.bad.push(`${o._seg} ${k}[${i}] a ${x.toFixed(1)} s de un plano de ${D.toFixed(1)} s`);
      out.rows.push(`${o._seg} ${String(k).padEnd(6)} ${i}  ${(o._ta + x).toFixed(1)}`); } });
    out.rows.push(`${o._seg} PLANO  ${o.type}:${o.img || o.name || ''}  ${o._ta.toFixed(1)}–${o._tb.toFixed(1)}`);
  });
  return out;
});
console.log(r.rows.join('\n'));
console.log('\nerrores de página:', errs.length ? errs : 'ninguno');
console.log('palabras no encontradas:', r.missing.length ? r.missing : 'ninguna');
console.log('avisos:', r.bad.length ? r.bad : 'ninguno');
const over = await page.evaluate(() => window.OVERFLOW ? window.OVERFLOW() : []);
console.log('textos fuera de su caja:', over.length ? over : 'ninguno');
await browser.close();
