// Fig · «El harness es todo lo que no son los pesos»: el modelo como núcleo y, alrededor, un anillo con las cinco piezas
// del harness, cada una con su icono y su nombre. Cada sector es un <g data-part> que el vídeo ilumina al nombrarlo.
// Uso: node figs/capas/build.mjs
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const W = 1400, H = 780, CX = 700, CY = 410, R0 = 128, R1 = 162, R2 = 292, GAP = 3.2;
const rad = (a) => (a - 90) * Math.PI / 180, pt = (r, a) => [CX + r * Math.cos(rad(a)), CY + r * Math.sin(rad(a))];
const f = (n) => n.toFixed(1);
function sector(a0, a1) {
  const [p0, p1, p2, p3] = [pt(R2, a0), pt(R2, a1), pt(R1, a1), pt(R1, a0)], big = a1 - a0 > 180 ? 1 : 0;
  return `M${f(p0[0])} ${f(p0[1])} A${R2} ${R2} 0 ${big} 1 ${f(p1[0])} ${f(p1[1])} L${f(p2[0])} ${f(p2[1])} A${R1} ${R1} 0 ${big} 0 ${f(p3[0])} ${f(p3[1])}Z`;
}
// iconos de 48×48 centrados en (0,0), trazo de línea
const ICON = {
  instrucciones: `<path d="M-14 -20h20l10 10v30h-30z M6 -20v10h10 M-8 -4h16 M-8 4h16 M-8 12h10"/>`,
  herramientas: `<path d="M12 -20a10 10 0 0 0 -11 14l-17 17a4 4 0 0 0 6 6l17 -17a10 10 0 0 0 14 -11l-6 6l-6 -2l-2 -6z"/>`,
  entorno: `<path d="M0 -20l18 10v20l-18 10l-18 -10v-20z M-18 -10l18 10l18 -10 M0 0v20"/>`,
  estado: `<ellipse cx="0" cy="-14" rx="17" ry="6"/><path d="M-17 -14v28a17 6 0 0 0 34 0v-28 M-17 0a17 6 0 0 0 34 0"/>`,
  feedback: `<circle r="19"/><path d="M-9 1l6 6l12 -13"/>`,
};
const PARTS = [["instrucciones", "Instrucciones", "lo que lee"], ["herramientas", "Herramientas", "lo que puede hacer"], ["entorno", "Entorno", "dónde se ejecuta"],
  ["estado", "Estado", "lo que conserva"], ["feedback", "Feedback", "cómo se comprueba"]];
const out = [];
PARTS.forEach(([id, t, d], i) => {
  const a0 = i * 72 + GAP, a1 = (i + 1) * 72 - GAP, am = (a0 + a1) / 2;
  const [ix, iy] = pt((R1 + R2) / 2, am), [lx, ly] = pt(R2 + 52, am), anchor = Math.abs(lx - CX) < 40 ? "middle" : lx > CX ? "start" : "end";
  out.push(`<g data-part="${id}"><path class="fg-sec" d="${sector(a0, a1)}"/>` +
    `<g class="fg-ico" transform="translate(${f(ix)} ${f(iy)}) scale(1.25)">${ICON[id]}</g>` +
    `<text class="fg-t" x="${f(lx)}" y="${f(ly - 4)}" text-anchor="${anchor}">${t}</text>` +
    `<text class="fg-d" x="${f(lx)}" y="${f(ly + 26)}" text-anchor="${anchor}">${d}</text></g>`);
});
out.push(`<g data-part="modelo"><circle class="fg-core" cx="${CX}" cy="${CY}" r="${R0}"/><circle class="fg-core2" cx="${CX}" cy="${CY}" r="${R0 - 14}"/>` +
  `<text class="fg-ct" x="${CX}" y="${CY + 2}" text-anchor="middle">modelo</text><text class="fg-cd" x="${CX}" y="${CY + 36}" text-anchor="middle">los pesos</text></g>`);
out.push(`<text class="fg-ring" x="${CX}" y="${CY - R2 - 72}" text-anchor="middle">HARNESS · LO QUE NO SON LOS PESOS</text>`);
const svg = `<svg class="fg-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="El modelo como núcleo, los pesos, rodeado por el harness: un anillo con cinco piezas, instrucciones, herramientas, entorno, estado y feedback.">${out.join("")}</svg>`;
writeFileSync(join(HERE, "..", "capas.fig.js"), `(window.FIGS = window.FIGS || {}).capas = ${JSON.stringify(svg)};\n`);
console.log("ok", svg.length);
