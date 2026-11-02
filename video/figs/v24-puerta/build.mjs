// Fig · Vídeo 24 · «La puerta entre el agente y funcionalidades.json» (c5-02). Tres columnas: lo que pide el modelo,
// lo que hace puerta.ts y el resultado. Dos recorridos:
//  · protegidas: edit/write sobre la rúbrica, la aceptación o verificar.sh → bloqueo sin preguntar.
//  · compara → verifica → (pasa | deshace): una edición de funcionalidades.json se compara antes y después; si aparece
//    una funcionalidad nueva en «pasa», la puerta ejecuta ./verificar.sh; con 0 el marcado se queda, con 1 se deshace
//    y el resultado de la herramienta vuelve como error, con la salida del script.
// Grupos <g data-part> hermanos, sin anidar. Uso, desde motor/: node figs/v24-puerta/build.mjs
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const W = 1500, H = 760, CW = 430, GAP = (W - 40 - 3 * CW) / 2, TOP = 10, BH = 660;
const X = [20, 20 + CW + GAP, 20 + 2 * (CW + GAP)];
const T = (cls, x, y, s, a = "start", st = "") => `<text class="${cls}" x="${x}" y="${y}" text-anchor="${a}"${st ? ` style="${st}"` : ""}>${s}</text>`;
const col = (i, label, sub) => `<rect class="fg-sec" x="${X[i]}" y="${TOP}" width="${CW}" height="${BH}" rx="24"/>` +
  T("fg-cd", X[i] + 28, TOP + 46, label) + T("fg-d", X[i] + 28, TOP + 86, sub, "start", "font-size:26px");
const CH = 112;
const chip = (i, y, t, d, st = "") => `<rect class="fg-core" x="${X[i] + 22}" y="${y}" width="${CW - 44}" height="${CH}" rx="18"${st ? ` style="${st}"` : ""}/>` +
  T("fg-t", X[i] + 46, y + 48, t, "start", "font-size:32px") + T("fg-d", X[i] + 46, y + 88, d, "start", "font-size:25px");
const arrowR = (x0, x1, y) => `<path class="fg-ico" d="M${x0} ${y} H${x1} M${x1 - 16} ${y - 12} L${x1} ${y} L${x1 - 16} ${y + 12}"/>`;
const arrowL = (x0, x1, y) => `<path class="fg-ico" d="M${x0} ${y} H${x1} M${x1 + 16} ${y - 12} L${x1} ${y} L${x1 + 16} ${y + 12}"/>`;
// flecha entre dos puntos cualesquiera
const arrow = (x0, y0, x1, y1) => { const a = Math.atan2(y1 - y0, x1 - x0), L = 18, w = .6;
  const p = s => `${(x1 - L * Math.cos(a + s * w)).toFixed(1)} ${(y1 - L * Math.sin(a + s * w)).toFixed(1)}`;
  return `<path class="fg-ico" d="M${x0} ${y0} L${x1} ${y1} M${p(1)} L${x1} ${y1} L${p(-1)}"/>`; };
const arrowD = (x, y0, y1) => `<path class="fg-ico" d="M${x} ${y0} V${y1} M${x - 12} ${y1 - 16} L${x} ${y1} L${x + 12} ${y1 - 16}"/>`;
const R0 = i => X[i] + CW - 22, L0 = i => X[i] + 22;   // bordes de los chips

const yA = 128, yB = 290, yC = 440, y0 = 360, y1 = 530, yD = 700;
const out = [];
out.push(col(0, "EL MODELO", "pide una herramienta"));
out.push(col(1, "PUERTA.TS", "decide el harness"));
out.push(col(2, "RESULTADO", "lo que recibe el modelo"));
// 1 · rutas protegidas: se bloquean sin preguntar
out.push(`<g data-part="protegidas">` + chip(0, yA, "edit · write", "rúbrica, aceptación, script") +
  arrowR(R0(0) + 6, L0(1) - 6, yA + CH / 2) + chip(1, yA, "✕ bloquea", "sin preguntar") +
  arrowR(R0(1) + 6, L0(2) - 6, yA + CH / 2) + chip(2, yA, "ruta protegida", "el fichero no cambia") + `</g>`);
// 2 · edición de funcionalidades.json: compara antes y después
out.push(`<g data-part="compara">` + chip(0, yB, "edit", "funcionalidades.json") +
  arrowR(R0(0) + 6, L0(1) - 6, yB + CH / 2) + chip(1, yB, "compara", "antes y después") + `</g>`);
// 3 · si hay una nueva en «pasa», ejecuta verificar.sh; con 0 el marcado se queda
out.push(`<g data-part="verifica">` + arrowD(X[1] + CW / 2, yB + CH + 6, yC - 6) + chip(1, yC, "./verificar.sh", "lo ejecuta ella") +
  arrow(R0(1) + 6, yC + CH / 2 - 14, L0(2) - 6, y0 + CH / 2) + chip(2, y0, "sale con 0", "el marcado se queda") + `</g>`);
// 4 · con 1, deshace el marcado y devuelve un error con la salida del script
const xr = X[2] + CW / 2, xl = X[0] + CW / 2;
out.push(`<g data-part="deshace">` + arrow(R0(1) + 6, yC + CH / 2 + 14, L0(2) - 6, y1 + CH / 2) + chip(2, y1, "sale con 1", "lo deshace", "stroke:rgba(248,113,113,.9)") +
  `<path class="fg-ico" d="M${xr} ${y1 + CH + 6} V${yD} H${xl} V${yB + CH + 8}"/>` + arrow(xl, yB + CH + 30, xl, yB + CH + 8) +
  T("fg-d", (xl + xr) / 2, yD + 44, "resultado con error: la salida del script, con su porqué y su cómo", "middle", "font-size:26px") + `</g>`);

const svg = `<svg class="fg-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="La puerta entre el modelo y funcionalidades.json: bloquea sin preguntar las ediciones de la rúbrica, la aceptación y el script; compara funcionalidades.json antes y después de una edición y, si aparece una nueva en pasa, ejecuta verificar.sh: con 0 el marcado se queda, con 1 lo deshace y devuelve un error con la salida del script.">${out.join("")}</svg>`;
writeFileSync(join(HERE, "..", "v24-puerta.fig.js"), `(window.FIGS = window.FIGS || {})['v24-puerta'] = ${JSON.stringify(svg)};\n`);
console.log("ok v24-puerta", svg.length);
