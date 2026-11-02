// Fig · Vídeo 25 · «El grafo de la condición varios» (c6-04). El principal reparte con task; dos nodos en paralelo
// (uno implementa src/desglose.js y otro escribe test/desglose.test.js sin ver la implementación); una arista los junta
// en el principal, que integra y ejecuta ./verificar.sh; una arista de vuelta si el script falla; el commit al final,
// que pasa por la puerta. Debajo, el estado compartido: la carpeta de trabajo, con un fichero por nodo.
// Grupos <g data-part> hermanos, sin anidar: paralelo · integra · vuelta · commit · estado (el nodo «reparte» va fuera
// de los grupos y se ve siempre). Uso, desde motor/: node figs/v25-grafo/build.mjs
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const W = 1500, H = 760;
const T = (cls, x, y, s, a = "start", st = "") => `<text class="${cls}" x="${x}" y="${y}" text-anchor="${a}"${st ? ` style="${st}"` : ""}>${s}</text>`;
const box = (cls, x, y, w, h, st = "") => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="22"${st ? ` style="${st}"` : ""}/>`;
const nodo = (x, y, w, h, eti, t, d, cls = "fg-sec") => box(cls, x, y, w, h) +
  T("fg-cd", x + 28, y + 42, eti) + T("fg-t", x + 28, y + 88, t) + T("fg-d", x + 28, y + 124, d, "start", "font-size:24px");
// punta de flecha al final de un trazo que llega con ángulo a
const head = (x, y, a) => { const L = 18, w = .6, p = s => `${(x - L * Math.cos(a + s * w)).toFixed(1)} ${(y - L * Math.sin(a + s * w)).toFixed(1)}`;
  return `<path class="fg-ico" d="M${p(1)} L${x} ${y} L${p(-1)}"/>`; };
const curva = (x0, y0, x1, y1) => { const mx = (x0 + x1) / 2;
  return `<path class="fg-ico" d="M${x0} ${y0} C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}"/>` + head(x1, y1, 0); };

const R = { x: 20, y: 250, w: 250, h: 150 };             // principal: reparte
const I = { x: 400, y: 80, w: 410, h: 150 };             // subagente: implementa
const P = { x: 400, y: 420, w: 410, h: 150 };            // subagente: pruebas
const G = { x: 940, y: 250, w: 290, h: 150 };            // principal: integra y verifica
const C = { x: 1300, y: 250, w: 180, h: 150 };           // commit
const cy = o => o.y + o.h / 2;
const out = [];
out.push(nodo(R.x, R.y, R.w, R.h, "PRINCIPAL", "reparte", "con task"));
// 1 · dos nodos en paralelo, con el abanico que los abre
out.push(`<g data-part="paralelo">` + curva(R.x + R.w + 6, cy(R) - 20, I.x - 8, cy(I)) + curva(R.x + R.w + 6, cy(R) + 20, P.x - 8, cy(P)) +
  nodo(I.x, I.y, I.w, I.h, "SUBAGENTE", "implementa", "src/desglose.js") +
  nodo(P.x, P.y, P.w, P.h, "SUBAGENTE", "escribe las pruebas", "sin ver la implementación") + `</g>`);
// 2 · una arista que los junta en el principal, que integra y ejecuta verificar.sh
out.push(`<g data-part="integra">` + curva(I.x + I.w + 6, cy(I), G.x - 8, cy(G) - 20) + curva(P.x + P.w + 6, cy(P), G.x - 8, cy(G) + 20) +
  nodo(G.x, G.y, G.w, G.h, "PRINCIPAL", "integra", "./verificar.sh", "fg-core") + `</g>`);
// 3 · la arista de vuelta, si el script falla
const xb = G.x + G.w / 2, xi = I.x + I.w * .62, yb = 34;
out.push(`<g data-part="vuelta"><path class="fg-ico" d="M${xb} ${G.y - 8} V${yb} H${xi} V${I.y - 8}" style="stroke-dasharray:10 10"/>` +
  head(xi, I.y - 8, Math.PI / 2) + T("fg-d", I.x + I.w + 24, yb + 36, "si verificar.sh falla", "start", "font-size:26px") + `</g>`);
// 4 · el commit al final, que pasa por la puerta
out.push(`<g data-part="commit"><path class="fg-ico" d="M${G.x + G.w + 6} ${cy(G)} H${C.x - 8}"/>` + head(C.x - 8, cy(G), 0) +
  nodo(C.x, C.y, C.w, C.h, "AL FINAL", "commit", "por la puerta") + `</g>`);
// 5 · el estado compartido: la carpeta de trabajo, un fichero por nodo
const chip = (x, s) => `<rect class="fg-core" x="${x}" y="664" width="${s.length * 15 + 44}" height="52" rx="14"/>` + T("fg-d", x + 22, 699, s, "start", "font-family:'JetBrains Mono',monospace;font-size:24px;fill:var(--ink)");
out.push(`<g data-part="estado">` + box("fg-sec", 20, 620, 1460, 120) + T("fg-cd", 50, 664, "ESTADO COMPARTIDO") +
  T("fg-d", 50, 706, "la carpeta de trabajo", "start", "font-size:28px") + chip(560, "src/desglose.js") + chip(900, "test/desglose.test.js") +
  T("fg-d", 1290, 699, "uno por nodo", "start", "font-size:24px") + `</g>`);

const svg = `<svg class="fg-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="El grafo de la condición varios: el principal reparte con task a dos subagentes en paralelo, uno implementa src/desglose.js y otro escribe las pruebas sin ver la implementación; una arista los junta en el principal, que integra y ejecuta verificar.sh; si falla, una arista vuelve a implementar; al final, el commit pasa por la puerta. El estado compartido es la carpeta de trabajo, con un fichero por nodo.">${out.join("")}</svg>`;
writeFileSync(join(HERE, "..", "v25-grafo.fig.js"), `(window.FIGS = window.FIGS || {})['v25-grafo'] = ${JSON.stringify(svg)};\n`);
console.log("ok v25-grafo", svg.length);
