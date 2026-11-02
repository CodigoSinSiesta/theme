// Complemento de sync_check.mjs: avisa de los elementos que se nombran ANTES de que empiece su plano, de los anclajes
// desordenados dentro de un plano y de los elementos sin ancla en planos de más de 5 s (entrarían a reparto, no con la voz).
// uso, desde work/: node orden_check.mjs
import { chromium } from 'playwright-core';
import path from 'node:path';
const exe = process.env.CHROME || `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const b = await chromium.launch({ executablePath: exe, args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto('file://' + path.join(process.cwd(), 'pildora.html')); await p.evaluate(() => window.ready);
console.log((await p.evaluate(() => { const out = [];
  FLAT.forEach(o => { const D = o._tb - o._ta, raw = kw => { if (!kw) return; const t = wordT(o._seg, Array.isArray(kw) ? kw[0] : kw); return t == null ? undefined : t - 0.25 - o._ta; };
    const L = { hl: o.hlAt || [], beats: o.beats || [], items: (o.items || []).map(c => c.at), chips: (o.chips || []).map(c => c.at) };
    for (const [k, v] of Object.entries(L)) { v.forEach((kw, i) => { const x = raw(kw); if (x !== undefined && x < -0.5) out.push(`${o._seg} ${o.tpl || o.type} ${k}[${i}] «${kw}» ${x.toFixed(1)} s ANTES del plano`); });
      const xs = v.map(raw).filter(x => x !== undefined); xs.forEach((x, i) => { if (i && x < xs[i - 1] - 0.01) out.push(`${o._seg} ${o.tpl || o.type} ${k} desordenado en ${i}`); }); }
    const n = { hl: (o.hl || []).length, items: (o.items || []).length };
    for (const [k, c] of Object.entries(n)) for (let i = 0; i < c; i++) if (o._A[k][i] === undefined && D > 5) out.push(`${o._seg} ${o.type} ${k}[${i}] sin ancla (plano ${D.toFixed(1)} s)`); });
  return out; })).join('\n') || 'todo en orden');
await b.close();
