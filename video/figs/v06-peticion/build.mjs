// Fig · vídeo 06 · «Qué lleva cada petición»: la petición al modelo como una caja con dos compartimentos. A la izquierda,
// el system prompt, con sus bloques en el orden en que Pi los monta: instrucciones de base, APPEND_SYSTEM.md, ficheros de
// contexto y descripciones de las skills. A la derecha, fuera del system prompt, las definiciones de las herramientas.
// Sobre las instrucciones de base, una etiqueta «SYSTEM.md la reemplaza» (parte aparte): SYSTEM cambia ese bloque y nada
// más; las herramientas siguen viajando igual. Cada bloque es un <g data-part> que el vídeo ilumina al nombrarlo.
// Uso, desde motor/: node figs/v06-peticion/build.mjs
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const W = 1500, H = 760;
// iconos de 48×48 centrados en (0,0), trazo de línea (mismo estilo que figs/capas)
const ICON = {
  herramientas: `<path d="M12 -20a10 10 0 0 0 -11 14l-17 17a4 4 0 0 0 6 6l17 -17a10 10 0 0 0 14 -11l-6 6l-6 -2l-2 -6z"/>`,
  doc: `<path d="M-14 -20h18l10 10v30h-28z M4 -20v10h10 M-8 0h16 M-8 9h16"/>`,
  mas: `<path d="M0 -14v28 M-14 0h28"/>`,
  libro: `<path d="M-18 -16h14a6 6 0 0 1 4 4v30a6 6 0 0 0 -4 -4h-14z M18 -16h-14a6 6 0 0 0 -4 4v30a6 6 0 0 1 4 -4h14z"/>`,
  base: `<path d="M-18 -14h36 M-18 -4h36 M-18 6h26 M-18 16h20"/>`,
};
const ico = (id, x, y, s = 1.1) => `<g class="fg-ico" transform="translate(${x} ${y}) scale(${s})">${ICON[id]}</g>`;
// marco: la petición entera y, dentro, el compartimento del system prompt
const SX = 70, SY = 96, SW = 960, SH = 624;           // system prompt
const TX = 1070, TY = 96, TW = 370, TH = 624;         // herramientas
const frame = `<rect class="fg-core2" x="30" y="20" width="${W - 60}" height="${H - 30}" rx="28"/>` +
  `<text class="fg-cd" x="62" y="66">PETICIÓN AL MODELO</text>` +
  `<rect class="fg-core2" x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="22"/>` +
  `<text class="fg-cd" x="${SX + 26}" y="${SY + 40}">SYSTEM PROMPT</text>`;
// un bloque del system prompt: icono, título y detalle
const BH = 112, BX = SX + 26, BW = SW - 52;
const block = (part, y, icon, t, d, cls = "fg-sec") => `<g data-part="${part}">` +
  `<rect class="${cls}" x="${BX}" y="${y}" width="${BW}" height="${BH}" rx="18"/>` + ico(icon, BX + 58, y + BH / 2) +
  `<text class="fg-t" x="${BX + 112}" y="${y + 50}">${t}</text>` +
  `<text class="fg-d" x="${BX + 112}" y="${y + 86}">${d}</text></g>`;
const y0 = SY + 66, gap = 20, Y = [0, 1, 2, 3].map(i => y0 + i * (BH + gap));
const out = [frame];
out.push(block("instr", Y[0], "base", "Instrucciones de base de Pi", "cómo trabajar y cómo usar las herramientas"));
out.push(block("append", Y[1], "mas", "APPEND_SYSTEM.md", "se suma a las instrucciones, sin quitar nada", "fg-core"));
out.push(block("contexto", Y[2], "doc", "Ficheros de contexto", "AGENTS.md y los que encuentre"));
out.push(block("skills", Y[3], "libro", "Descripciones de las skills", "solo nombre, descripción y ruta"));
// SYSTEM.md: etiqueta sobre el bloque de base (lo reemplaza; el resto queda igual)
{ const w = 240, x = BX + BW - w - 22, y = Y[0] + 22, h = BH - 44;
  out.push(`<g data-part="system"><rect class="fg-core" x="${x}" y="${y}" width="${w}" height="${h}" rx="14"/>` +
    `<text class="fg-cd" x="${x + w / 2}" y="${y + 30}" text-anchor="middle">SYSTEM.md</text>` +
    `<text class="fg-d" x="${x + w / 2}" y="${y + 58}" text-anchor="middle">lo reemplaza</text></g>`); }
// herramientas: fuera del system prompt, viajan igual
{ const cx = TX + TW / 2;
  out.push(`<g data-part="tools"><rect class="fg-sec" x="${TX}" y="${TY}" width="${TW}" height="${TH}" rx="22"/>` +
    ico("herramientas", cx, TY + 150, 1.6) +
    `<text class="fg-t" x="${cx}" y="${TY + 250}" text-anchor="middle">Herramientas</text>` +
    `<text class="fg-d" x="${cx}" y="${TY + 290}" text-anchor="middle">sus definiciones</text>` +
    ["read", "bash", "edit", "write"].map((t, i) => `<text class="fg-cd" x="${cx}" y="${TY + 380 + i * 50}" text-anchor="middle">${t}</text>`).join("") +
    `</g>`); }
const svg = `<svg class="fg-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="La petición al modelo: el system prompt (instrucciones de base, APPEND_SYSTEM.md, ficheros de contexto y descripciones de skills) y, aparte, las definiciones de las herramientas. SYSTEM.md reemplaza solo las instrucciones de base.">${out.join("")}</svg>`;
writeFileSync(join(HERE, "..", "v06-peticion.fig.js"), `(window.FIGS = window.FIGS || {})["v06-peticion"] = ${JSON.stringify(svg)};\n`);
console.log("ok", svg.length);
