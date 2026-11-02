// Antes/después de una propuesta de planos, sin renderizar el vídeo.
// Uso, desde work/:  node comparar.mjs <propuesta.js> [cX-YY …]
// Sin párrafos, compara todos los que cambian entre shots.js y la propuesta. Cada plano se fotografía al final de su
// tiempo (cuando ya ha entrado todo). Deja comparar/<párrafo>.<antes|despues>.<k>.png y comparar/indice.json.
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
const exe = process.env.CHROME || `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const [prop, ...only] = process.argv.slice(2);
if (!prop) { console.error('uso: node comparar.mjs <propuesta.js> [cX-YY …]'); process.exit(1); }
const here = process.cwd(), out = path.join(here, 'comparar');
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: exe, args: ['--allow-file-access-from-files'] });
async function open(shots) {
  const p = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.error('PAGEERROR', shots, e.message));
  await p.goto('file://' + path.join(here, 'pildora.html') + (shots ? '?shots=' + encodeURIComponent(shots) : ''));
  await p.evaluate(() => window.ready);
  return p;
}
const A = await open(null), D = await open(prop);
const info = p => p.evaluate(() => ({ shots: Object.fromEntries(Object.entries(window.SHOTS).map(([k, v]) => [k, JSON.stringify(v)])),
  flat: FLAT.map(o => ({ seg: o._seg, type: o.type + (o.name ? ':' + o.name : ''), ta: o._ta, tb: o._tb })),
  txt: Object.fromEntries(TL.segments.map(s => [s.id, s.txt])), missing: window.SYNC_MISSING }));
const ia = await info(A), id = await info(D);
const segs = only.length ? only : [...new Set([...Object.keys(ia.shots), ...Object.keys(id.shots)])].filter(k => ia.shots[k] !== id.shots[k]).sort();
const idx = [];
for (const seg of segs) {
  const e = { seg, txt: ia.txt[seg], antes: [], despues: [] };
  for (const [p, I, tag] of [[A, ia, 'antes'], [D, id, 'despues']]) {
    const list = I.flat.filter(o => o.seg === seg);
    for (let k = 0; k < list.length; k++) {
      const o = list[k], t = Math.max(o.ta + 0.8, o.tb - 0.45), f = `${seg}.${tag}.${k}.png`;
      await p.evaluate(t => window.seek(t), t); await p.screenshot({ path: path.join(out, f), type: 'png' });
      e[tag].push({ f, type: o.type });
    }
  }
  idx.push(e); console.log(seg, e.antes.map(x => x.type).join('+'), '→', e.despues.map(x => x.type).join('+'));
}
fs.writeFileSync(path.join(out, 'indice.json'), JSON.stringify(idx, null, 1));
if (id.missing.length) console.log('palabras no encontradas en la propuesta:', id.missing);
await browser.close();
