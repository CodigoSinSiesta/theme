// Fig · vídeo 07 · «Codemode por dentro»: el modelo escribe un script; el script corre en un sandbox QuickJS (sin Node,
// ficheros, red ni temporizadores) y solo toca el exterior a través de las herramientas, a las que llama en paralelo.
// Los resultados, grandes, vuelven al sandbox, el script los filtra y al modelo solo le llega la salida.
// Partes (<g data-part>): script · sandbox · herramientas (llamadas en paralelo + herramientas) · salida (resultados,
// filtro y salida hacia el modelo). El modelo no es una parte: queda siempre visible como referencia.
// Uso, desde motor/: node figs/v07-codemode/build.mjs
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const W = 1500, H = 760;
const ICON = {
  herramientas: `<path d="M12 -20a10 10 0 0 0 -11 14l-17 17a4 4 0 0 0 6 6l17 -17a10 10 0 0 0 14 -11l-6 6l-6 -2l-2 -6z"/>`,
};
const ico = (id, x, y, s = 1) => `<g class="fg-ico" transform="translate(${x} ${y}) scale(${s})">${ICON[id]}</g>`;
// flecha: trazo + punta (en la dirección del último tramo)
const head = (x, y, dir) => ({ r: `M${x - 14} ${y - 11} L${x} ${y} L${x - 14} ${y + 11}`, l: `M${x + 14} ${y - 11} L${x} ${y} L${x + 14} ${y + 11}`,
  u: `M${x - 11} ${y + 14} L${x} ${y} L${x + 11} ${y + 14}` })[dir];
const arrow = (d, hx, hy, dir, w = 2.4) => `<path class="fg-ico" style="stroke-width:${w}" d="${d} ${head(hx, hy, dir)}"/>`;
// caja del sandbox y del script
const SB = { x: 370, y: 30, w: 700, h: 700 }, SC = { x: 420, y: 112, w: 300, h: 330 };
const TX = 1150, TW = 310, TH = 92, TY = [112, 232, 352];
const out = [];
// el modelo (siempre visible)
out.push(`<rect class="fg-sec" x="30" y="250" width="250" height="170" rx="22"/>` +
  `<text class="fg-t" x="155" y="345" text-anchor="middle">Modelo</text>`);
// sandbox: el marco, su nombre y lo que no tiene
out.push(`<g data-part="sandbox"><rect class="fg-core" x="${SB.x}" y="${SB.y}" width="${SB.w}" height="${SB.h}" rx="28"/>` +
  `<text class="fg-cd" x="${SB.x + 26}" y="${SB.y + 50}">SANDBOX · QUICKJS</text>` +
  `<text class="fg-d" x="${SB.x + SB.w / 2}" y="${SB.y + SB.h - 28}" text-anchor="middle">sin Node · sin ficheros · sin red · sin temporizadores</text></g>`);
// script: lo escribe el modelo
{ const code = ["await Promise.all([", "  tools.a(…),", "  tools.b(…),", "  tools.c(…),", "])", "return resumen"];
  out.push(`<g data-part="script">` + arrow(`M282 300 H${SC.x - 8}`, SC.x - 8, 300, "r") +
    `<text class="fg-d" x="326" y="282" text-anchor="middle">escribe</text>` +
    `<rect class="fg-sec" x="${SC.x}" y="${SC.y}" width="${SC.w}" height="${SC.h}" rx="16"/>` +
    `<text class="fg-t" x="${SC.x + 24}" y="${SC.y + 52}">script</text>` +
    code.map((l, i) => `<text class="fg-cd" xml:space="preserve" x="${SC.x + 24}" y="${SC.y + 110 + i * 38}">${l}</text>`).join("") + `</g>`); }
// herramientas: tres llamadas en paralelo que salen del sandbox
{ const names = ["tienda-fs", "read", "bash"];
  out.push(`<g data-part="herramientas">` +
    TY.map(y => arrow(`M${SC.x + SC.w + 10} ${y + TH / 2} H${TX - 10}`, TX - 10, y + TH / 2, "r")).join("") +
    `<text class="fg-d" x="${(SC.x + SC.w + TX) / 2 - 20}" y="${TY[0] + TH / 2 + 62}" text-anchor="middle">en paralelo</text>` +
    `<text class="fg-cd" x="${TX}" y="${SB.y + 50}">HERRAMIENTAS</text>` +
    TY.map((y, i) => `<rect class="fg-sec" x="${TX}" y="${y}" width="${TW}" height="${TH}" rx="16"/>` + ico("herramientas", TX + 46, y + TH / 2, 1) +
      `<text class="fg-t" x="${TX + 92}" y="${y + TH / 2 + 12}">${names[i]}</text>`).join("") + `</g>`); }
// salida: resultados grandes → filtro → solo la salida, hacia el modelo
{ const bx0 = 980, by0 = 500, by1 = 600, cx = 1265, fx = 870, mid = (by0 + by1) / 2;
  out.push(`<g data-part="salida">` +
    `<path class="fg-sec" d="M${cx} ${TY[2] + TH + 8} H${cx + 90} V${by1} H${bx0} V${by0} H${cx} Z"/>` +
    `<text class="fg-d" x="${cx + 45}" y="${by1 + 40}" text-anchor="middle">resultados grandes</text>` +
    `<path class="fg-core" d="M${bx0} ${by0} L${bx0} ${by1} L${fx} ${mid + 8} L${fx} ${mid - 8} Z"/>` +
    `<text class="fg-d" x="${(bx0 + fx) / 2}" y="${by1 + 40}" text-anchor="middle">filtra</text>` +
    arrow(`M${fx - 6} ${mid} H155 V430`, 155, 428, "u", 3) +
    `<text class="fg-t" x="${(fx + SB.x) / 2 + 40}" y="${mid - 22}" text-anchor="middle">solo la salida</text></g>`); }
const svg = `<svg class="fg-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Codemode: el modelo escribe un script que corre en un sandbox QuickJS, llama en paralelo a las herramientas, filtra sus resultados y devuelve al modelo solo la salida.">${out.join("")}</svg>`;
writeFileSync(join(HERE, "..", "v07-codemode.fig.js"), `(window.FIGS = window.FIGS || {})["v07-codemode"] = ${JSON.stringify(svg)};\n`);
console.log("ok", svg.length);
