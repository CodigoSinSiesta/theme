// Dibuja las pantallas de terminal grabadas con demo.py (caps_raw/<nombre>.ansi, colores ANSI de tmux) como una ventana
// de terminal de 1383×868 CSS a 2× (el tamaño de las capturas del motor) y mide los resaltados sobre el texto.
// Especificación en terminales.json: [{ name, raw?, title?, from?, rows?, hl: [frases], blur: [frases o regex /…/] }]
//   from: texto (o /regex/) de la primera línea que se enseña; rows: cuántas líneas (por defecto, las que caben).
// uso: node render_terminal.mjs [nombre…]  → caps_clean/<nombre>.png y caps_clean/<nombre>.hl.json
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const here = process.cwd(), only = process.argv.slice(2);
const SPEC = JSON.parse(fs.readFileSync('terminales.json', 'utf8'));
const exe = process.env.CHROME || `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const FONT = 'file://' + path.join(here, 'fonts/JetBrainsMono.woff2');

// paleta tipo One Dark (la de las capturas del vídeo 01)
const BASE = ['#3f4451', '#e06c75', '#98c379', '#e5c07b', '#61afef', '#c678dd', '#56b6c2', '#d7dae0',
              '#4f5666', '#ff7b86', '#b5e890', '#ffd68a', '#7cc3ff', '#de8ef5', '#6fd1dd', '#ffffff'];
const xterm = n => { if (n < 16) return BASE[n]; if (n >= 232) { const v = 8 + (n - 232) * 10; return `rgb(${v},${v},${v})`; }
  n -= 16; const c = [0, 95, 135, 175, 215, 255]; return `rgb(${c[Math.floor(n / 36)]},${c[Math.floor(n / 6) % 6]},${c[n % 6]})`; };
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Cada carácter ocupa su celda de terminal, aunque la fuente no lo tenga (braille del logo, ☤ ⚠ ◎ ❯…): los que no son
// ASCII, Latin-1 ni cajas/bloques de JetBrains Mono van en una caja de 1ch (2ch los emoji, como los cuenta tmux).
const SAFE = c => c < 0x2500 ? (c < 0x2010 || (c >= 0x2010 && c <= 0x2027)) : c <= 0x259f;
const cells = s => [...s].map((ch, k, a) => { const c = ch.codePointAt(0);
  if (c === 0xfe0f) return ''; if (SAFE(c)) return esc(ch);
  const wide = c >= 0x1f000 || a[k + 1] === '\ufe0f';
  return `<span class="w${wide ? '2' : ''}">${esc(ch)}</span>`; }).join('');

function ansiToHtml(line) {
  let st = {}, out = '', i = 0; const re = /\x1b\[([0-9;:]*)m/g; let m;
  const open = () => { const css = []; let fg = st.fg, bg = st.bg; if (st.inv) [fg, bg] = [bg || '#282c34', fg || '#d7dae0'];
    if (fg) css.push(`color:${fg}`); if (bg) css.push(`background:${bg}`); if (st.b) css.push('font-weight:700');
    if (st.dim) css.push('opacity:.6'); if (st.it) css.push('font-style:italic'); if (st.ul) css.push('text-decoration:underline');
    return css.length ? `<span style="${css.join(';')}">` : '<span>'; };
  while ((m = re.exec(line))) {
    out += cells(line.slice(i, m.index)); i = re.lastIndex;
    const p = m[1].split(/[;:]/).map(x => (x === '' ? 0 : +x));
    for (let k = 0; k < p.length; k++) { const c = p[k];
      if (c === 0) st = {}; else if (c === 1) st.b = 1; else if (c === 2) st.dim = 1; else if (c === 3) st.it = 1; else if (c === 4) st.ul = 1;
      else if (c === 7) st.inv = 1; else if (c === 22) { st.b = 0; st.dim = 0; } else if (c === 23) st.it = 0; else if (c === 24) st.ul = 0; else if (c === 27) st.inv = 0;
      else if (c >= 30 && c <= 37) st.fg = BASE[c - 30]; else if (c >= 90 && c <= 97) st.fg = BASE[c - 82];
      else if (c >= 40 && c <= 47) st.bg = BASE[c - 40]; else if (c >= 100 && c <= 107) st.bg = BASE[c - 92];
      else if (c === 39) st.fg = null; else if (c === 49) st.bg = null;
      else if ((c === 38 || c === 48) && p[k + 1] === 5) { st[c === 38 ? 'fg' : 'bg'] = xterm(p[k + 2]); k += 2; }
      else if ((c === 38 || c === 48) && p[k + 1] === 2) { st[c === 38 ? 'fg' : 'bg'] = `rgb(${p[k + 2]},${p[k + 3]},${p[k + 4]})`; k += 4; } }
    out += '</span>' + open();
  }
  return '<span>' + out + cells(line.slice(i)) + '</span>';
}

const ROWS = 35;
const page = (title, lines) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: JBM; src: url(${FONT}) format('woff2'); font-weight: 100 800; }
html,body { margin:0; width:1383px; height:868px; background:#16181d; overflow:hidden; }
.win { position:absolute; inset:0; background:#282c34; }
.bar { height:34px; background:#1e2127; display:flex; align-items:center; gap:9px; padding:0 14px; border-bottom:1px solid #111; }
.dot { width:12px; height:12px; border-radius:50%; background:#3a3f4b; }
.tab { margin-left:22px; font:500 13px -apple-system,system-ui,sans-serif; color:#c9ccd3; background:#282c34; padding:7px 16px; border-radius:7px 7px 0 0; }
pre { margin:0; padding:12px 16px; font:400 18.4px/23.4px JBM, monospace; color:#d7dae0; white-space:pre; }
.blur { filter: blur(6px); }
.w, .w2 { display:inline-block; width:1ch; text-align:center; overflow:visible; white-space:pre; }
.w2 { width:2ch; }
</style></head><body><div class="win"><div class="bar"><i class="dot"></i><i class="dot"></i><i class="dot"></i><span class="tab">${esc(title)}</span></div>
<pre>${lines.map(ansiToHtml).join('\n')}</pre></div></body></html>`;

const strip = s => s.replace(/\x1b\[[0-9;:]*m/g, '');
const browser = await chromium.launch({ executablePath: exe, args: ['--allow-file-access-from-files'] });
const ctx = await browser.newContext({ viewport: { width: 1383, height: 868 }, deviceScaleFactor: 2 });
for (const s of SPEC) {
  if (only.length && !only.includes(s.name)) continue;
  let lines = fs.readFileSync(`caps_raw/${s.raw || s.name}.ansi`, 'utf8').replace(/\n+$/, '').split('\n');
  if (s.from) { const rx = s.from.startsWith('/') ? new RegExp(s.from.slice(1, -1)) : null;
    const k = lines.findIndex(l => (rx ? rx.test(strip(l)) : strip(l).includes(s.from))); if (k < 0) throw new Error(`${s.name}: no está «${s.from}»`); lines = lines.slice(k); }
  lines = lines.slice(0, s.rows || ROWS);
  const p = await ctx.newPage();
  const f = path.join('/private/tmp', `term-${s.name}.html`); fs.writeFileSync(f, page(s.title || 'csn@vps · ssh', lines));
  await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
  const res = await p.evaluate(({ hl, blur }) => {
    const find = (phrase) => {   // primer tramo de texto con la frase (o /regex/), como en capturar_docs.mjs
      const w = document.createTreeWalker(document.querySelector('pre'), NodeFilter.SHOW_TEXT), nodes = []; let full = '';
      for (let n; (n = w.nextNode());) { nodes.push([n, full.length]); full += n.data; }
      let i, len; if (phrase.startsWith('/')) { const m = new RegExp(phrase.slice(1, -1)).exec(full); if (!m) return null; i = m.index; len = m[0].length; }
      else { i = full.indexOf(phrase); len = phrase.length; } if (i < 0) return null;
      const at = k => { let j = nodes.length - 1; while (nodes[j][1] > k) j--; return [nodes[j][0], k - nodes[j][1]]; };
      const rg = document.createRange(), [a, ao] = at(i), [b, bo] = at(i + len - 1); rg.setStart(a, ao); rg.setEnd(b, bo + 1); return rg; };
    (blur || []).forEach(b => { const r = find(b); if (!r) return; const sp = document.createElement('span'); sp.className = 'blur'; r.surroundContents(sp); });
    return hl.map(p => { const r = find(p); if (!r) return { p, miss: true }; const b = r.getBoundingClientRect();
      return { p, box: [b.left - 6, b.top - 3, b.width + 12, b.height + 6].map(Math.round) }; });
  }, { hl: s.hl || [], blur: s.blur || [] });
  await p.screenshot({ path: `caps_clean/${s.name}.png` });
  fs.writeFileSync(`caps_clean/${s.name}.hl.json`, JSON.stringify(res, null, 1));
  const miss = res.filter(r => r.miss).map(r => r.p);
  console.log(`${miss.length ? '✗' : '✓'} ${s.name}${miss.length ? '  sin encontrar: ' + miss.join(' | ') : ''}`);
  await p.close();
}
await browser.close();
