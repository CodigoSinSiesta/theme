// Fig · Vídeo 22 · «El anfitrión decide, el sandbox ejecuta». Dos cajas: a la izquierda el anfitrión (quien decide),
// a la derecha el sandbox (quien ejecuta) y, en medio, lo que cruza de una a otra. Genera DOS figuras del mismo dibujo:
//  · v22-anfitrion (c8-01): anfitrión con sesión, modelo, política, aprobaciones y límites; una petición va al sandbox,
//    que solo ejecuta, y vuelve una salida acotada. Partes: anfitrion · sandbox (caja + petición) · salida.
//  · v22-lados (c8-07): qué va a cada lado y qué cruza la frontera, lo más estrecho posible.
//    Partes: anfitrion · sandbox · frontera.
// Grupos <g data-part> hermanos, sin anidar. Uso, desde motor/: node figs/v22-anfitrion/build.mjs
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const W = 1500, H = 760, BW = 470, LX = 20, RX = W - 20 - BW, TOP = 40, BH = 600;
const T = (cls, x, y, s, a = "start", st = "") => `<text class="${cls}" x="${x}" y="${y}" text-anchor="${a}"${st ? ` style="${st}"` : ""}>${s}</text>`;
const ICON = {
  herramientas: `<path d="M12 -20a10 10 0 0 0 -11 14l-17 17a4 4 0 0 0 6 6l17 -17a10 10 0 0 0 14 -11l-6 6l-6 -2l-2 -6z"/>`,
};
const ico = (id, x, y, s = 1.2) => `<g class="fg-ico" transform="translate(${x} ${y}) scale(${s})">${ICON[id]}</g>`;
const box = (x, label, sub, bh = BH) => `<rect class="fg-sec" x="${x}" y="${TOP}" width="${BW}" height="${bh}" rx="24"/>` +
  T("fg-cd", x + 30, TOP + 48, label) + T("fg-t", x + 30, TOP + 100, sub);
// filas de contenido dentro de una caja
const chips = (x, list, y0 = TOP + 150, step = 84) => list.map((t, i) => `<rect class="fg-core" x="${x + 30}" y="${y0 + i * step}" width="${BW - 60}" height="64" rx="16"/>` +
  T("fg-d", x + 56, y0 + i * step + 41, t, "start", "font-size:28px;fill:var(--ink)")).join("");
const arrowR = (x, y) => `<path class="fg-ico" d="M${x - 18} ${y - 13} L${x} ${y} L${x - 18} ${y + 13}"/>`;
const arrowL = (x, y) => `<path class="fg-ico" d="M${x + 18} ${y - 13} L${x} ${y} L${x + 18} ${y + 13}"/>`;
const L0 = LX + BW, R0 = RX, MX = (L0 + R0) / 2;

function anfitrion() {
  const out = [];
  out.push(`<g data-part="anfitrion">${box(LX, "ANFITRIÓN", "decide")}` +
    chips(LX, ["la sesión", "el modelo", "la política", "las aprobaciones", "los límites"]) + `</g>`);
  // el sandbox recibe una petición y solo ejecuta
  const yP = TOP + 230;
  out.push(`<g data-part="sandbox">${box(RX, "SANDBOX", "ejecuta")}` +
    ico("herramientas", RX + BW / 2, TOP + 330, 2) +
    T("fg-d", RX + BW / 2, TOP + 440, "solo lo que le piden", "middle", "font-size:28px") +
    `<path class="fg-ico" d="M${L0 + 14} ${yP} H${R0 - 14}"/>` + arrowR(R0 - 14, yP) +
    T("fg-d", MX, yP - 22, "petición", "middle", "font-size:28px") + `</g>`);
  // y devuelve una salida acotada
  const yS = TOP + 430;
  out.push(`<g data-part="salida"><path class="fg-ico" d="M${R0 - 14} ${yS} H${L0 + 14}"/>` + arrowL(L0 + 14, yS) +
    T("fg-t", MX, yS - 24, "salida", "middle", "font-size:30px") + T("fg-d", MX, yS + 44, "acotada", "middle", "font-size:28px") + `</g>`);
  return out.join("");
}

function lados() {
  const out = [];
  out.push(`<g data-part="anfitrion">${box(LX, "ANFITRIÓN", "decide", 560)}` +
    chips(LX, ["la sesión", "las claves del modelo", "la política de aprobaciones", "los límites"], TOP + 150, 96) + `</g>`);
  out.push(`<g data-part="sandbox">${box(RX, "SANDBOX", "ejecuta", 560)}` +
    chips(RX, ["la carpeta del proyecto", "las dependencias", "los comandos"], TOP + 150, 96) + `</g>`);
  // lo que cruza: un paso estrecho entre las dos cajas
  const px = L0 + 24, pw = R0 - L0 - 48, py = TOP + 130, ph = 380, cy = py + ph / 2, F = "font-size:26px";
  out.push(`<g data-part="frontera"><rect class="fg-core" x="${px}" y="${py}" width="${pw}" height="${ph}" rx="20"/>` +
    T("fg-cd", MX, py + 44, "LO QUE CRUZA", "middle") +
    T("fg-t", MX, py + 104, "lo más estrecho", "middle", "font-size:32px") +
    T("fg-d", MX, py + 172, "solo la carpeta necesaria", "middle", F) +
    T("fg-d", MX, py + 230, "credenciales de poco", "middle", F) +
    T("fg-d", MX, py + 264, "alcance y corta vida", "middle", F) +
    T("fg-d", MX, py + 322, "red, solo si hace falta", "middle", F) +
    `<path class="fg-ico" d="M${L0 + 2} ${cy} H${px - 2} M${px + pw + 2} ${cy} H${R0 - 2}"/>` + `</g>`);
  return out.join("");
}

const write = (name, body, label) => {
  const svg = `<svg class="fg-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${body}</svg>`;
  writeFileSync(join(HERE, "..", `${name}.fig.js`), `(window.FIGS = window.FIGS || {})['${name}'] = ${JSON.stringify(svg)};\n`);
  console.log("ok", name, svg.length);
};
write("v22-anfitrion", anfitrion(), "El anfitrión decide: tiene la sesión, el modelo, la política, las aprobaciones y los límites. Manda una petición al sandbox, que solo ejecuta lo que le piden y devuelve una salida acotada.");
write("v22-lados", lados(), "Qué va a cada lado: en el anfitrión, la sesión, las claves del modelo, la política de aprobaciones y los límites; en el sandbox, la carpeta del proyecto, las dependencias y los comandos. Lo que cruza, lo más estrecho posible: solo la carpeta necesaria, credenciales de poco alcance y corta vida, y red solo si hace falta.");
