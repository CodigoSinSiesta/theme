// Comprueba que el motor y FRAME.md siguen los valores de la marca (src/tokens.css), y que ninguna plantilla baja de 22 px.
// Uso: node video/comprobar_marca.mjs   → sale con código 1 si algo se separa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const video = path.dirname(fileURLToPath(import.meta.url));
const lee = f => fs.readFileSync(path.join(video, f), 'utf8');
const norm = v => v.toLowerCase().replace(/\s+/g, '').replace(/,0\./g, ',.').replace(/["']/g, '');
const tokens = Object.fromEntries([...fs.readFileSync(path.join(video, '../src/tokens.css'), 'utf8').matchAll(/--([\w-]+):\s*([^;]+);/g)].map(m => [m[1], norm(m[2])]));
const vars = t => Object.fromEntries([...t.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(m => [m[1], norm(m[2])]));
const pildora = vars(lee('pildora.html')), tpl = vars(lee('plantillas/tpl.css'));
const frame = Object.fromEntries([...lee('FRAME.md').split('\n---')[0].matchAll(/^\s{2}([\w-]+): "([^"]+)"/gm)].map(m => [m[1], norm(m[2])]));

// [dónde, nombre, valor, token de src/tokens.css]
const pares = [
  ...[['navy', 'color-fondo'], ['navy2', 'color-fondo-elev'], ['cyan', 'color-cielo'], ['teal', 'color-electrico'], ['blue', 'color-cobalto'],
    ['pale', 'color-tinta2'], ['pale3', 'color-tinta3'], ['ink', 'color-tinta'], ['red', 'color-err'], ['amber', 'color-warn'], ['ok', 'color-ok'],
    ['glass', 'color-glass'], ['line', 'color-linea']].map(([v, t]) => ['pildora.html', v, pildora[v], t]),
  ...[['glass', 'color-glass'], ['line', 'color-linea'], ['sky', 'color-cielo2'], ['blue', 'color-electrico'], ['deep', 'color-cobalto']].map(([v, t]) => ['tpl.css', v, tpl[v], t]),
  ...[['bg', 'color-fondo'], ['bg-elev', 'color-fondo-elev'], ['ink', 'color-tinta'], ['ink-2', 'color-tinta2'], ['ink-3', 'color-tinta3'], ['accent', 'color-cielo'],
    ['accent-2', 'color-cielo2'], ['electrico', 'color-electrico'], ['cobalto', 'color-cobalto'], ['glass', 'color-glass'], ['line', 'color-linea'],
    ['ok', 'color-ok'], ['warn', 'color-warn'], ['err', 'color-err']].map(([v, t]) => ['FRAME.md', v, frame[v], t]),
];
const fallos = pares.filter(([, , v, t]) => v !== tokens[t]).map(([d, n, v, t]) => `${d} ${n} = ${v}; src/tokens.css ${t} = ${tokens[t]}`);
if (!/--body:'IBM Plex Sans'/.test(lee('plantillas/tpl.css')) || !tokens['font-body'].startsWith('ibmplexsans')) fallos.push('el cuerpo no es IBM Plex Sans');

const dir = path.join(video, 'plantillas');
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js') && !['iconos.js', 'manifiesto.js', 'runtime.js'].includes(f))) {
  for (const [, px] of fs.readFileSync(path.join(dir, f), 'utf8').matchAll(/font-size:(\d+)px/g)) if (+px < 22) fallos.push(`${f}: letra de ${px} px`);
}

if (fallos.length) { console.log(fallos.join('\n')); process.exit(1); }
console.log(`marca al día: ${pares.length} tokens iguales que src/tokens.css y ninguna plantilla por debajo de 22 px`);
