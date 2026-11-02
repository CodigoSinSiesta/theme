// Fig · Vídeo 16 · «Un reparto con task»: a la izquierda, el agente principal con su conversación; la herramienta task
// manda un contexto común y un encargo a cada subagente (sesiones hijas, con su modelo, herramientas y contexto propio);
// cada uno devuelve su resultado con yield, que llega al principal como un resumen. La conversación no se hereda. Debajo,
// el árbol de trabajo que comparten todos, con AGENTS.md. Grupos <g data-part> hermanos (sin anidar): principal ·
// conversacion · task · sub (los tres) · yield · arbol · agentsmd. Uso, desde motor/: node figs/v16-reparto/build.mjs
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const W = 1500, H = 760;
const T = (cls, x, y, s, a = "start") => `<text class="${cls}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
const arrowR = (x, y) => `<path class="fg-ico" d="M${x - 16} ${y - 11} L${x} ${y} L${x - 16} ${y + 11}"/>`;
const arrowU = (x, y) => `<path class="fg-ico" d="M${x - 11} ${y + 16} L${x} ${y} L${x + 11} ${y + 16}"/>`;
const SX = 880, SW = 600, SH = 150, SY = [20, 205, 390], SC = SY.map(y => y + SH / 2), BUS = 620;
const out = [];
// el agente principal: marco y rótulo
out.push(`<g data-part="principal"><rect class="fg-sec" x="20" y="20" width="420" height="540" rx="24"/>` +
  T("fg-cd", 46, 62, "AGENTE PRINCIPAL") + `</g>`);
// su conversación: burbujas y aviso de que no viaja
out.push(`<g data-part="conversacion">` +
  [[50, 100, 250], [150, 168, 250], [50, 236, 300], [130, 304, 270]].map(([x, y, w]) => `<rect class="fg-core" x="${x}" y="${y}" width="${w}" height="48" rx="18"/>`).join("") +
  T("fg-t", 46, 430, "conversación") + `<text class="fg-d" x="46" y="474" style="font-size:28px">✕ no se hereda</text>` + `</g>`);
// task: del principal sale un lote; el bus reparte un encargo a cada subagente
out.push(`<g data-part="task"><path class="fg-ico" d="M440 ${SC[1]} H${BUS} M${BUS} ${SC[0]} V${SC[2]} ` +
  SC.map(y => `M${BUS} ${y} H${SX - 8}`).join(" ") + `"/>` + SC.map(y => arrowR(SX - 8, y)).join("") +
  T("fg-t", 462, SC[1] - 18, "task") + T("fg-d", BUS + 22, 196, "contexto común") + T("fg-d", BUS + 22, 228, "+ un encargo") + T("fg-d", BUS + 22, 260, "por agente") + `</g>`);
// los subagentes: tres sesiones hijas (misma pieza)
SY.forEach(y => out.push(`<g data-part="sub"><rect class="fg-sec" x="${SX}" y="${y}" width="${SW}" height="${SH}" rx="20"/>` +
  T("fg-cd", SX + 24, y + 40, "SUBAGENTE") + T("fg-d", SX + 24, y + 78, "su modelo, sus herramientas e instrucciones") +
  `<rect class="fg-core" x="${SX + 24}" y="${y + 98}" width="180" height="26" rx="8"/>` + T("fg-d", SX + 222, y + 119, "contexto propio") + `</g>`));
// yield: el resultado vuelve al principal como un resumen
out.push(`<g data-part="yield"><path class="fg-ico" d="M${SX + 300} ${SY[2] + SH + 2} V582 H230 V${560 + 8}"/>` + arrowU(230, 566) +
  T("fg-t", 520, 564, "yield") + T("fg-d", 628, 562, "→ un resumen") + `</g>`);
// el árbol de trabajo: compartido por todos
out.push(`<g data-part="arbol"><rect class="fg-sec" x="20" y="610" width="1460" height="130" rx="20"/>` +
  T("fg-cd", 50, 662, "ÁRBOL DE TRABAJO · COMPARTIDO") + T("fg-d", 50, 704, "los mismos ficheros para todos, a la vez") + `</g>`);
// AGENTS.md: los ficheros de contexto, que sí reciben
out.push(`<g data-part="agentsmd"><g class="fg-ico" transform="translate(1110 675)"><path d="M-16 -24 H8 L20 -12 V24 H-16 Z M8 -24 V-12 H20 M-8 0 H12 M-8 10 H12"/></g>` +
  T("fg-t", 1146, 688, "AGENTS.md") + `</g>`);
const svg = `<svg class="fg-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Un reparto con task: el agente principal, con su conversación, manda un contexto común y un encargo a tres subagentes, cada uno con su modelo, herramientas y contexto propio. La conversación no se hereda. Cada subagente devuelve un resumen con yield. Todos trabajan sobre el mismo árbol de ficheros, con AGENTS.md.">${out.join("")}</svg>`;
writeFileSync(join(HERE, "..", "v16-reparto.fig.js"), `(window.FIGS = window.FIGS || {})['v16-reparto'] = ${JSON.stringify(svg)};\n`);
console.log("ok", svg.length);
