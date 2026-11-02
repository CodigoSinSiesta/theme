// Prueba propuestas de planos sin tocar el guion: antes (shots.js) y después (shots.js + sustituciones), en imágenes.
// uso: node motor/propuestas.mjs <carpeta work/ del vídeo> <carpeta de la propuesta>
// La carpeta de la propuesta tiene propuestas.json y, si hay plantillas nuevas, nuevas/<nombre>.js (TPL['nombre'] = {…}).
// propuestas.json: { "propuestas": [ { "id": "p1", "seg": "c1-02", "tipo": "existente" | "nueva", "plantilla": "timeline",
//   "nota": "por qué", "shots": [ {…plano…}, … ] } ] }   · "shots" sustituye ENTERO el párrafo seg.
// Deja en la carpeta de la propuesta: <id>.antes-<k>.jpg, <id>.medio-<k>.jpg, <id>.fin-<k>.jpg e informe.json.
// No escribe shots.js: usa shots.prop.js (temporal) con pildora.html?shots=. Crea los enlaces plantillas/ y figs/ si faltan
// y los quita al terminar.
import { chromium } from 'playwright-core';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const motor = path.dirname(fileURLToPath(import.meta.url));
const work = path.resolve(process.argv[2]), prop = path.resolve(process.argv[3]);
const P = JSON.parse(fs.readFileSync(path.join(prop, 'propuestas.json'), 'utf8')).propuestas;
// Chromium de Playwright si está; si no, Chrome instalado (como probar.mjs). CHROME fuerza otro ejecutable.
const exe = process.env.CHROME || [`${process.env.HOME}/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(f => fs.existsSync(f));

// enlaces temporales a las plantillas y figuras del motor
const made = [];
for (const d of ['plantillas', 'figs']) { const l = path.join(work, d); if (!fs.existsSync(l)) { fs.symlinkSync(path.relative(work, path.join(motor, d)), l); made.push(l); } }
const tmp = path.join(work, 'shots.prop.js');
const nuevasDir = path.join(prop, 'nuevas');
const nuevas = fs.existsSync(nuevasDir) ? fs.readdirSync(nuevasDir).filter(f => f.endsWith('.js')).map(f => fs.readFileSync(path.join(nuevasDir, f), 'utf8')).join('\n') : '';
const base = fs.readFileSync(path.join(work, 'shots.js'), 'utf8');
// iconos de la propuesta (Heroicons como glifos: H.GLYPH('magnifying-glass')), en <carpeta de propuestas>/_comun/iconos.js
const iconosF = path.join(path.dirname(prop), '_comun', 'iconos.js');
const iconos = !fs.existsSync(path.join(motor, 'plantillas', 'iconos.js')) && fs.existsSync(iconosF) ? fs.readFileSync(iconosF, 'utf8') : '';
const cleanup = () => { try { fs.unlinkSync(tmp); } catch {} made.forEach(l => { try { fs.unlinkSync(l); } catch {} }); };
process.on('exit', cleanup);

const browser = await chromium.launch({ executablePath: exe, args: ['--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });

async function load(shotsFile) {
  const errs = [];
  const onE = e => errs.push('pageerror: ' + e.message);
  page.on('pageerror', onE);
  await page.goto('file://' + path.join(work, 'pildora.html') + (shotsFile ? '?shots=' + shotsFile : ''));
  await page.evaluate(() => window.ready);
  page.off('pageerror', onE);
  return errs;
}
// planos del párrafo: [{k, type, tpl, a, b}]
const shotsOf = seg => page.evaluate(seg => FLAT.map((o, i) => ({ i, seg: o._seg, type: o.type, tpl: o.tpl || o.name || o.img || '', a: o._ta, b: o._tb }))
  .filter(o => o.seg === seg), seg);
async function grab(t, file) { await page.evaluate(t => window.seek(t), t); await page.screenshot({ path: file, type: 'jpeg', quality: 88 }); }
// avisos del párrafo: palabras que faltan, textos fuera de su caja, anclas desordenadas o antes del plano, planos cortos
const checks = seg => page.evaluate(seg => {
  const out = [];
  (window.SYNC_MISSING || []).filter(m => m.startsWith(seg + ':')).forEach(m => out.push('palabra no encontrada ' + m));
  (window.OVERFLOW ? window.OVERFLOW() : []).filter(m => m.startsWith(seg + ' ')).forEach(m => out.push(m));
  FLAT.filter(o => o._seg === seg).forEach(o => {
    const D = o._tb - o._ta; if (D < 1.5) out.push(`plano ${o.tpl || o.type} de ${D.toFixed(2)} s`);
    const raw = kw => { if (!kw) return; const t = wordT(o._seg, Array.isArray(kw) ? kw[0] : kw); return t == null ? undefined : t - 0.25 - o._ta; };
    const L = { beats: o.beats || [], hl: o.hlAt || [], items: (o.items || []).map(c => c.at) };
    for (const [k, v] of Object.entries(L)) {
      const xs = v.map(raw);
      xs.forEach((x, i) => { if (x !== undefined && x < -0.5) out.push(`${o.tpl || o.type} ${k}[${i}] «${v[i]}» antes del plano`); if (x !== undefined && x > D - 0.3) out.push(`${o.tpl || o.type} ${k}[${i}] «${v[i]}» al final del plano`); });
      const ok = xs.filter(x => x !== undefined); ok.forEach((x, i) => { if (i && x < ok[i - 1] - 0.01) out.push(`${o.tpl || o.type} ${k} desordenado en ${i}`); });
    }
    if (o.type === 'tpl' && o._m && o._m.steps && o.beats && o.beats.length !== o._m.steps) out.push(`${o.tpl}: ${o.beats.length} beats para ${o._m.steps} pasos`);
  });
  return out;
}, seg);

// maquetación (con el plano en su estado final): texto a menos de 16 px del borde interior de su caja o fuera de ella,
// y textos de cajas distintas que se pisan. Caja = .g, .chip, .pill, .sel o cualquier elemento con borde visible.
const layout = i => page.evaluate(i => {
  const o = FLAT[i], root = o._el, out = [], MIN = 16;
  if (o.type !== 'tpl') return out;
  const isBox = e => e.matches('.g, .chip, .pill, .sel') || ['Top', 'Right', 'Bottom', 'Left'].some(k => parseFloat(getComputedStyle(e)['border' + k + 'Width']) > 0.5 && getComputedStyle(e)['border' + k + 'Style'] !== 'none');
  const vis = e => { for (let x = e; x && x !== root; x = x.parentElement) if (+getComputedStyle(x).opacity < 0.5 || getComputedStyle(x).visibility === 'hidden') return false; return true; };
  const texts = [];
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n; (n = tw.nextNode());) {
    if (!n.data.trim() || n.parentElement.closest('svg')) continue;
    const el = n.parentElement; if (!vis(el)) continue;
    const rg = document.createRange(); rg.selectNodeContents(n);
    const R = [...rg.getClientRects()].filter(r => r.width > 1 && r.height > 1); if (!R.length) continue;
    const r = { left: Math.min(...R.map(x => x.left)), right: Math.max(...R.map(x => x.right)), top: Math.min(...R.map(x => x.top)), bottom: Math.max(...R.map(x => x.bottom)) };
    let box = el; while (box && box !== root && !isBox(box)) box = box.parentElement;
    texts.push({ t: n.data.trim().slice(0, 32), r, el, box: box && box !== root ? box : null });
  }
  texts.forEach(x => {
    if (!x.box) return;
    const B = x.box.getBoundingClientRect(), cs = getComputedStyle(x.box);
    const L = B.left + parseFloat(cs.borderLeftWidth), Rr = B.right - parseFloat(cs.borderRightWidth), T = B.top + parseFloat(cs.borderTopWidth), Bo = B.bottom - parseFloat(cs.borderBottomWidth);
    const gap = Math.min(x.r.left - L, Rr - x.r.right, x.r.top - T, Bo - x.r.bottom);
    if (gap < 0) out.push(`«${x.t}» se sale de su caja`);
    else if (gap < MIN && !x.box.matches('.chip, .pill, .sel')) out.push(`«${x.t}» a ${gap.toFixed(0)} px del borde de su caja`);
    else if (gap < 6) out.push(`«${x.t}» a ${gap.toFixed(0)} px del borde de su etiqueta`);
  });
  for (let a = 0; a < texts.length; a++) for (let b = a + 1; b < texts.length; b++) {
    const A = texts[a], Bt = texts[b]; if (A.el === Bt.el || A.el.contains(Bt.el) || Bt.el.contains(A.el)) continue;
    const ix = Math.min(A.r.right, Bt.r.right) - Math.max(A.r.left, Bt.r.left), iy = Math.min(A.r.bottom, Bt.r.bottom) - Math.max(A.r.top, Bt.r.top);
    if (ix > 2 && iy > 2) out.push(`«${A.t}» y «${Bt.t}» se pisan`);
  }
  return [...new Set(out)].slice(0, 12);
}, i);

const informe = [];
try {
  // antes: estado final de cada plano original del párrafo
  const e0 = await load(null);
  for (const p of P) {
    const S = await shotsOf(p.seg);
    if (!S.length) { informe.push({ id: p.id, error: 'párrafo no encontrado: ' + p.seg }); continue; }
    for (const [k, s] of S.entries()) await grab(s.a + (s.b - s.a) * 0.97, path.join(prop, `${p.id}.antes-${k + 1}.jpg`));
    p._antes = S.map(s => `${s.type}:${s.tpl}`);
  }
  // después: una carga por propuesta, con solo su párrafo sustituido
  for (const p of P) {
    if (!p._antes) continue;
    fs.writeFileSync(tmp, iconos + '\nwindow.TPL = window.TPL || {};\n' + nuevas + '\n' + base + `\n;Object.assign(window.SHOTS, ${JSON.stringify({ [p.seg]: p.shots })});\n`);
    const errs = await load('shots.prop.js');
    const S = await shotsOf(p.seg), lay = [];
    for (const [k, s] of S.entries()) {
      await grab(s.a + (s.b - s.a) * 0.55, path.join(prop, `${p.id}.medio-${k + 1}.jpg`));
      await grab(s.a + (s.b - s.a) * 0.97, path.join(prop, `${p.id}.fin-${k + 1}.jpg`));
      lay.push(...(await layout(s.i)).map(m => `${s.type}:${s.tpl} ${m}`));
    }
    const avisos = [...errs, ...(await checks(p.seg)), ...lay];
    informe.push({ id: p.id, seg: p.seg, tipo: p.tipo, plantilla: p.plantilla, nota: p.nota, antes: p._antes, despues: S.map(s => `${s.type}:${s.tpl} ${(s.b - s.a).toFixed(1)} s`), avisos });
    console.log(`${avisos.length ? '✗' : '✓'} ${p.id} ${p.seg} ${p.plantilla}  [${p._antes.join(', ')}] → [${S.map(s => s.type + ':' + s.tpl).join(', ')}]${avisos.length ? '\n   ' + avisos.join('\n   ') : ''}`);
  }
  if (e0.length) console.log('errores de la página original:', e0);
} finally {
  fs.writeFileSync(path.join(prop, 'informe.json'), JSON.stringify(informe, null, 1));
  await browser.close();
  cleanup();
}
