// Uso, desde work/: node ../../../../motor/pasos_check.mjs
// Cuenta pasos reales de cada plano tpl (mayor data-i/data-off tras montar) frente a sus beats.
import fs from 'fs'; import path from 'path';
const work = process.argv[2] || process.cwd(), M = path.join(work, 'plantillas');
global.window = {}; global.TPL = {}; eval(fs.readFileSync(path.join(work, 'shots.js'), 'utf8'));
const merge = (a, b) => { if (Array.isArray(b) || typeof b !== 'object' || b === null) return b; const o = { ...a }; for (const k in b) o[k] = (a && typeof a[k] === 'object' && !Array.isArray(a[k])) ? merge(a[k], b[k]) : b[k]; return o; };
const H = { esc: s => String(s ?? ''), A: s => String(s ?? ''), ICO: () => '', GLYPH: () => '', HEAD: () => '', LOGOS: {} };
let bad = 0;
for (const [id, list] of Object.entries(window.SHOTS)) for (const o of list) {
  if (o.type !== 'tpl') continue;
  if (!TPL[o.tpl]) eval(fs.readFileSync(path.join(M, o.tpl + '.js'), 'utf8'));
  const html = TPL[o.tpl].html(merge(TPL[o.tpl].def, o.d || {}), H);
  const n = Math.max(0, ...[...html.matchAll(/data-(?:i|off)="(\d+)"/g)].map(m => +m[1]));
  const b = (o.beats || []).length;
  if (b < n) { bad++; console.log(`${id} ${o.tpl}: ${n} pasos, ${b} anclas`); }
}
console.log(bad ? `${bad} planos con anclas de menos` : 'todos los planos tienen un ancla por paso');
