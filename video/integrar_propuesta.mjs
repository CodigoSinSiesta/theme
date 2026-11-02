// Pasa a shots.js las entradas aprobadas de shots.propuesta.js (las del bloque Object.assign del final).
// Uso, desde work/:  node integrar_propuesta.mjs [cX-YY …]   (sin párrafos: todas las del bloque)
// Deja una copia de shots.js en shots.antes-alternativas.js la primera vez.
import fs from 'node:fs';
const only = process.argv.slice(2);
// devuelve [inicio, fin) del valor `[ … ]` de la clave 'key' en el texto src (fin incluye el corchete final)
function span(src, key, from = 0) {
  const k = src.indexOf(`'${key}': [`, from); if (k < 0) return null;
  let i = src.indexOf('[', k), depth = 0, q = null;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (q) { if (c === '\\') { j++; continue; } if (c === q) q = null; continue; }
    if (c === "'" || c === '"' || c === '`') { q = c; continue; }
    if (c === '[') depth++; else if (c === ']' && --depth === 0) return [k, j + 1];
  }
  return null;
}
const prop = fs.readFileSync('shots.propuesta.js', 'utf8'), at = prop.lastIndexOf('Object.assign(window.SHOTS');
const keys = [...prop.slice(at).matchAll(/^  '(c\d+-\d+)': \[/gm)].map(m => m[1]).filter(k => !only.length || only.includes(k));
if (!fs.existsSync('shots.antes-alternativas.js')) fs.copyFileSync('shots.js', 'shots.antes-alternativas.js');
let src = fs.readFileSync('shots.js', 'utf8');
for (const k of keys) {
  const p = span(prop, k, at), s = span(src, k);
  const val = prop.slice(p[0], p[1]);
  if (s) src = src.slice(0, s[0]) + val + src.slice(s[1]);
  else { const end = src.indexOf('\n};'); src = src.slice(0, end) + `\n  ${val},` + src.slice(end); }
}
fs.writeFileSync('shots.js', src);
console.log(keys.length, 'entradas integradas:', keys.join(' '));
