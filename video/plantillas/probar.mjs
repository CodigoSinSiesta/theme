// Comprobación de una o varias plantillas: node motor/plantillas/probar.mjs matrix [timeline …] [--out carpeta] [--t SEG]
// Abre la galería con ?solo=<nombre>&fin=1 (todo ya dentro), guarda <nombre>.png y avisa de errores de consola, peticiones
// fallidas (logos) y textos que se salen de su caja. Con --t SEG congela en ese segundo local en vez de al final.
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); if (i < 0) return d; const v = args[i + 1]; args.splice(i, 2); return v; };
const out = path.resolve(opt('--out', path.join(process.env.TMPDIR || '/tmp', 'probar-plantillas')));
const tFix = opt('--t', null);
const ref = args.includes('--ref') ? (args.splice(args.indexOf('--ref'), 1), true) : false;
const all = args.includes('--todas') ? (args.splice(args.indexOf('--todas'), 1), true) : false;
const names = all ? [...fs.readFileSync(path.join(here, 'manifiesto.js'), 'utf8').matchAll(/"n": "([^"]+)"/g)].map(m => m[1]) : args;
fs.mkdirSync(out, { recursive: true });
const exe = process.env.CHROME || ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(p => fs.existsSync(p));
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const page = await browser.newPage({ viewport: { width: 1000, height: 700 }, deviceScaleFactor: 1.5 });
let bad = 0;
for (const n of names) {
  const errs = [];
  const onErr = e => errs.push('pageerror: ' + e.message);
  const onFail = r => errs.push('petición fallida: ' + r.url().split('/').slice(-3).join('/'));
  const onCon = m => { if (m.type() === 'error') errs.push('consola: ' + m.text()); };
  page.on('pageerror', onErr); page.on('requestfailed', onFail); page.on('console', onCon);
  if (ref) {   // el original de la galería aprobada (origen.html), con todo ya dentro
    const man = fs.readFileSync(path.join(here, 'manifiesto.js'), 'utf8');
    const id = (man.match(new RegExp('"id": "([A-Z]\\d+)",\\s*"sec": "[A-Z]",\\s*"n": "' + n + '"')) || [])[1];
    if (!id) { console.log('✗ ' + n + ': no está en el manifiesto'); bad++; continue; }
    await page.goto('file://' + path.join(here, '../prototipo-plantillas/origen.html') + `?solo=${id}`);
    await page.waitForSelector('.stage', { timeout: 8000 });
    await page.waitForTimeout(600);
    const e0 = await page.$('.frame'); await e0.screenshot({ path: path.join(out, n + '.ref.png') });
    console.log(`ref ${n} (${id}) → ${path.join(out, n + '.ref.png')}`);
    continue;
  }
  await page.goto('file://' + path.join(here, '../prototipo-plantillas/index.html') + `?solo=${n}&fin=1`);
  await page.waitForSelector('figure.card .stage .tpl', { timeout: 8000 }).catch(() => errs.push('no se montó la plantilla (¿falta el módulo o lanza un error?)'));
  await page.waitForTimeout(400);
  if (tFix !== null) await page.evaluate(t => { const c = window.CARDS[0]; c.m.update(+t, 9, i => 0.5 + i * 0.7); window.CARDS.length = 0; }, tFix);
  const over = await page.evaluate(() => {
    const st = document.querySelector('.stage'); if (!st) return [];
    const box = st.getBoundingClientRect(), k = box.width / 1920, res = [];
    st.querySelectorAll('.tpl *').forEach(e => {
      if (e.closest('svg') && e.tagName !== 'svg') return;
      const r = e.getBoundingClientRect(); if (!r.width || !r.height) return;
      if (r.right > box.right + 2 || r.bottom > box.bottom + 2 || r.left < box.left - 2) res.push(`${e.tagName.toLowerCase()}.${e.className || ''} «${(e.textContent || '').trim().slice(0, 30)}» se sale del lienzo`);
      if (e.children.length === 0 && e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflow !== 'visible') res.push(`«${(e.textContent || '').trim().slice(0, 30)}» recortado`);
    });
    return res.slice(0, 8);
  });
  const el = await page.$('.frame');
  if (el) await el.screenshot({ path: path.join(out, n + '.png') });
  page.off('pageerror', onErr); page.off('requestfailed', onFail); page.off('console', onCon);
  const all = [...errs, ...over];
  if (all.length) bad++;
  console.log(`${all.length ? '✗' : '✓'} ${n}${all.length ? '\n   ' + all.join('\n   ') : ''}  → ${path.join(out, n + '.png')}`);
}
await browser.close();
process.exit(bad ? 1 : 0);
