// Fig · vídeo 05 · «Tres formas de ejecutar Pi»: tres máquinas (tu host) una al lado de otra y, en cada una, qué queda
// dentro de la frontera y qué fuera. 1) Pi directamente con tu usuario: la frontera es tu usuario, casi todo queda dentro.
// 2) Pi entero en un contenedor: Pi y sus herramientas dentro, el resto del host fuera y protegido. 3) Pi en el host y
// solo sus herramientas en un entorno aislado. Cada máquina es un <g data-part> que el vídeo ilumina al nombrarla.
// Uso, desde motor/: node figs/v05-frontera/build.mjs
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const W = 1500, H = 760, PW = 440, GAP = 50, X0 = (W - 3 * PW - 2 * GAP) / 2, TOP = 40, HB = 470;
// iconos de 48×48 centrados en (0,0), trazo de línea (mismo estilo que figs/capas)
const ICON = {
  herramientas: `<path d="M12 -20a10 10 0 0 0 -11 14l-17 17a4 4 0 0 0 6 6l17 -17a10 10 0 0 0 14 -11l-6 6l-6 -2l-2 -6z"/>`,
  candado: `<rect x="-15" y="-4" width="30" height="24" rx="4"/><path d="M-9 -4v-8a9 9 0 0 1 18 0v8 M0 5v6"/>`,
};
const ico = (id, x, y, s = 1.2) => `<g class="fg-ico" transform="translate(${x} ${y}) scale(${s})">${ICON[id]}</g>`;
const pi = (x, y) => `<circle class="fg-sec" cx="${x}" cy="${y}" r="50"/><text class="fg-t" x="${x}" y="${y + 12}" text-anchor="middle">Pi</text>`;
const tools = (x, y) => ico("herramientas", x, y - 14) + `<text class="fg-d" x="${x}" y="${y + 40}" text-anchor="middle">herramientas</text>`;
const lock = (x, y, t) => ico("candado", x, y, 1) + `<text class="fg-d" x="${x + 30}" y="${y + 10}">${t}</text>`;
const host = (px) => `<rect class="fg-sec" x="${px}" y="${TOP}" width="${PW}" height="${HB}" rx="24"/>` +
  `<text class="fg-cd" x="${px + 26}" y="${TOP + 42}">TU MÁQUINA</text>`;
const zone = (cls, x, y, w, h, label) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="16"/>` +
  `<text class="fg-cd" x="${x + 18}" y="${y + 34}">${label}</text>`;
const foot = (px, t, d1, d2) => { const cx = px + PW / 2, y = TOP + HB + 70;
  return `<text class="fg-t" x="${cx}" y="${y}" text-anchor="middle">${t}</text>` +
    `<text class="fg-d" x="${cx}" y="${y + 38}" text-anchor="middle">${d1}</text>` +
    `<text class="fg-d" x="${cx}" y="${y + 68}" text-anchor="middle">${d2}</text>`; };
const P = [0, 1, 2].map(i => X0 + i * (PW + GAP));
const out = [];
// 1 · directamente: la frontera es tu usuario y abarca casi toda la máquina
{ const px = P[0];
  out.push(`<g data-part="directo">${host(px)}` +
    zone("fg-core2", px + 26, TOP + 70, PW - 52, 290, "TU USUARIO") +
    pi(px + 130, TOP + 225) + tools(px + 300, TOP + 225) +
    lock(px + 46, TOP + 412, "lo que tu usuario no puede tocar") +
    foot(px, "Directamente", "protege solo lo que tu", "usuario no puede tocar") + `</g>`); }
// 2 · Pi entero dentro: el contenedor encierra a Pi y sus herramientas; el resto del host queda fuera
{ const px = P[1];
  out.push(`<g data-part="contenedor">${host(px)}` +
    zone("fg-core", px + 40, TOP + 70, PW - 80, 230, "CONTENEDOR · VM") +
    pi(px + 140, TOP + 195) + tools(px + 300, TOP + 195) +
    lock(px + 66, TOP + 370, "el resto del host") +
    foot(px, "Pi entero dentro", "protege todo lo del host", "que no expongas") + `</g>`); }
// 3 · solo herramientas dentro: Pi sigue en el host y delega sus herramientas en un entorno aislado
{ const px = P[2], bx = px + 210, by = TOP + 90, bw = 200, bh = 230;
  out.push(`<g data-part="herramientas">${host(px)}` +
    pi(px + 100, TOP + 205) +
    `<path class="fg-ico" d="M${px + 156} ${TOP + 205} H${bx - 12} M${bx - 26} ${TOP + 193} l14 12 l-14 12"/>` +
    zone("fg-core", bx, by, bw, bh, "AISLADO") + tools(bx + bw / 2, by + 125) +
    foot(px, "Herramientas dentro", "Pi fuera: un aislamiento", "más estrecho") + `</g>`); }
const svg = `<svg class="fg-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tres formas de ejecutar Pi: directamente con tu usuario, Pi entero dentro de un contenedor, o Pi en el host con solo sus herramientas en un entorno aislado.">${out.join("")}</svg>`;
writeFileSync(join(HERE, "..", "v05-frontera.fig.js"), `(window.FIGS = window.FIGS || {})["v05-frontera"] = ${JSON.stringify(svg)};\n`);
console.log("ok", svg.length);
