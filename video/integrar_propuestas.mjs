// Pasa a shots.js los planos de las propuestas aprobadas (_propuestas/<vídeo>/propuestas.json, campo `shots` de cada una).
// Uso, desde work/:  node integrar_propuestas.mjs <carpeta de la propuesta> [id …]   (sin ids: todas)
// Cada propuesta sustituye entero su párrafo `seg`. Deja una copia de shots.js en shots.antes-plantillas.js la primera vez.
import fs from 'node:fs';
import path from 'node:path';
const [dir, ...only] = process.argv.slice(2);
if (!dir) { console.error('uso: node integrar_propuestas.mjs <carpeta de la propuesta> [id …]'); process.exit(1); }
const props = JSON.parse(fs.readFileSync(path.join(dir, 'propuestas.json'), 'utf8')).propuestas.filter(p => !only.length || only.includes(p.id));
// [inicio, fin) del valor `[ … ]` de la clave 'key' en src (fin incluye el corchete final); mismo análisis que integrar_propuesta.mjs
function span(src, key) {
  const k = src.indexOf(`'${key}': [`); if (k < 0) return null;
  let i = src.indexOf('[', k), depth = 0, q = null;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (q) { if (c === '\\') { j++; continue; } if (c === q) q = null; continue; }
    if (c === "'" || c === '"' || c === '`') { q = c; continue; }
    if (c === '[') depth++; else if (c === ']' && --depth === 0) return [k, j + 1];
  }
  return null;
}
if (!fs.existsSync('shots.antes-plantillas.js')) fs.copyFileSync('shots.js', 'shots.antes-plantillas.js');
let src = fs.readFileSync('shots.js', 'utf8');
const done = [];
for (const p of props) {
  const s = span(src, p.seg);
  if (!s) { console.error(`✗ ${p.id}: no está el párrafo ${p.seg}`); process.exitCode = 1; continue; }
  // un plano por línea; la propuesta queda anotada para encontrarla luego
  const val = `'${p.seg}': [  // propuesta ${p.id} · ${p.plantilla}\n    ` + p.shots.map(o => JSON.stringify(o)).join(',\n    ') + ']';
  src = src.slice(0, s[0]) + val + src.slice(s[1]);
  done.push(`${p.id}:${p.seg}`);
}
fs.writeFileSync('shots.js', src);
console.log(done.length, 'propuestas integradas:', done.join(' '));
