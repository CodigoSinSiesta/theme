// Fig · Vídeo 09 · «Leer la rama, no el fichero». Misma geometría y lenguaje que v03-arbol: un fichero JSONL cuyas
// entradas apuntan a su padre; del punto de bifurcación salen una rama de arriba (la que dejaste) y la activa, abajo,
// que acaba en la hoja. Dos variantes:
//   v09-leer       (c2-06): partes entradas · entries (getEntries: todas las entradas) · rama (getBranch: el camino).
//   v09-rebobinar  (c6-02): partes entradas · custom (la entrada de appendEntry, un rombo) · abandonada · rama.
// Para que una parte se lea entera cuando las demás se atenúan, sus nodos se repiten encima (anillos).
// Clases de capas / v03-arbol (fg-sec, fg-ico, fg-t, fg-d, fg-core, fg-core2, fg-cd, fg-ring). Uso, desde motor/:
//   node figs/v09-ramas/build.mjs
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const W = 1400, H = 780, R = 26, RL = 34;
const N = {                                  // tronco (y 420), rama de arriba (y 250), rama activa (y 590)
  raiz: [140, 420], e2: [300, 420], e3: [460, 420],
  a1: [640, 250], a2: [800, 250], a3: [960, 250],
  b1: [640, 590], b2: [800, 590], hoja: [960, 590],
};
const head = (x, y) => `<path class="fg-ico" d="M${x + 15} ${y - 10} L${x} ${y} L${x + 15} ${y + 10}"/>`;   // punta hacia el padre
function edge(c, p, rc = R) {                // del hijo al padre: el hijo guarda la referencia (parentId)
  const [cx, cy] = N[c], [px, py] = N[p], x0 = cx - rc - 6, x1 = px + R + 8;
  const d = cy === py ? `M${x0} ${cy} L${x1} ${py}` : `M${x0} ${cy} C${x0 - 80} ${cy} ${x1 + 80} ${py} ${x1} ${py}`;
  return `<path class="fg-ico" d="${d}"/>` + head(x1, py);
}
const node = (k) => `<circle class="fg-sec" cx="${N[k][0]}" cy="${N[k][1]}" r="${R}"/>`;
const ring = (k) => `<circle class="fg-core" cx="${N[k][0]}" cy="${N[k][1]}" r="${k === "hoja" ? RL : R}"/>`;
const hoja = () => `<circle class="fg-core" cx="${N.hoja[0]}" cy="${N.hoja[1]}" r="${RL}"/><circle class="fg-core2" cx="${N.hoja[0]}" cy="${N.hoja[1]}" r="${RL - 11}"/>`;
const T = (cls, x, y, s, a = "middle") => `<text class="${cls}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
const P = (...ks) => ks.map(k => N[k].join(" "));
// la rama activa: de la hoja a la raíz, pasando por la curva de la bifurcación
const bandD = `M${P("hoja")} L${P("b1")} C${N.b1[0] - 100} ${N.b1[1]} ${N.e3[0] + 100} ${N.e3[1]} ${P("e3")} L${P("raiz")}`;
const band = `<path class="fg-core" d="${bandD}" style="fill:none;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.5"/>`;
const frame = `<rect class="fg-core2" x="30" y="60" width="1340" height="680" rx="28" style="fill:none"/>` + T("fg-ring", 70, 118, "LA SESIÓN · UN FICHERO JSONL", "start");
const PATH = ["raiz", "e2", "e3", "b1", "b2", "hoja"];

function svgOf(out, label) {
  return `<svg class="fg-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${out.join("")}</svg>`;
}

// ── v09-leer: getEntries frente a getBranch
{
  const out = [frame];
  out.push(`<g data-part="rama">${band}</g>`);
  out.push(`<g data-part="entradas">` +
    edge("e2", "raiz") + edge("e3", "e2") + edge("a1", "e3") + edge("a2", "a1") + edge("a3", "a2") + edge("b1", "e3") + edge("b2", "b1") + edge("hoja", "b2", RL) +
    ["raiz", "e2", "e3", "a1", "a2", "a3", "b1", "b2"].map(node).join("") + hoja() +
    T("fg-t", N.raiz[0], 365, "raíz") + T("fg-cd", 110, 492, "id + parentId", "start") +
    T("fg-d", 1036, 258, "otra rama", "start") + T("fg-t", 1036, 598, "hoja", "start") + T("fg-d", 1036, 632, "donde estás", "start") + `</g>`);
  // getEntries: un marco con todas las entradas y sus nodos encendidos
  out.push(`<g data-part="entries"><rect class="fg-core" x="92" y="196" width="918" height="452" rx="22" style="fill:rgba(59,130,246,.05);stroke-dasharray:12 10"/>` +
    ["raiz", "e2", "e3", "a1", "a2", "a3", "b1", "b2", "hoja"].map(ring).join("") +
    T("fg-t", 1050, 400, "getEntries()", "start") + T("fg-d", 1050, 436, "todas las entradas,", "start") + T("fg-d", 1050, 464, "de todas las ramas", "start") + `</g>`);
  // getBranch: el camino de la raíz a la hoja
  out.push(`<g data-part="rama">${PATH.map(ring).join("")}` +
    T("fg-t", 640, 682, "getBranch()", "start") + T("fg-d", 640, 714, "de la raíz a donde estás", "start") + `</g>`);
  const svg = svgOf(out, "La sesión como árbol en un fichero JSONL: cada entrada guarda su id y el de su padre. getEntries devuelve todas las entradas, de todas las ramas; getBranch, solo el camino de la raíz a donde estás.");
  writeFileSync(join(HERE, "..", "v09-leer.fig.js"), `(window.FIGS = window.FIGS || {})['v09-leer'] = ${JSON.stringify(svg)};\n`);
  console.log("v09-leer", svg.length);
}

// ── v09-rebobinar: la entrada de appendEntry se queda en la rama que dejas y getBranch ya no la ve
{
  const out = [frame];
  out.push(`<g data-part="rama">${band}</g>`);
  const upD = `M${P("e3")} C${N.e3[0] + 100} ${N.e3[1]} ${N.a1[0] - 100} ${N.a1[1]} ${P("a1")} L${P("a3")}`;
  out.push(`<g data-part="abandonada"><path class="fg-sec" d="${upD}" style="fill:none;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.45"/>` +
    T("fg-t", 1036, 246, "la rama que dejas", "start") + T("fg-d", 1036, 282, "/tree: vuelves atrás", "start") + `</g>`);
  out.push(`<g data-part="entradas">` +
    edge("e2", "raiz") + edge("e3", "e2") + edge("a1", "e3") + edge("a2", "a1") + edge("b1", "e3") + edge("b2", "b1") + edge("hoja", "b2", RL) +
    ["raiz", "e2", "e3", "a1", "a2", "b1", "b2"].map(node).join("") + hoja() +
    T("fg-t", N.raiz[0], 365, "raíz") + T("fg-t", 1036, 598, "hoja", "start") + T("fg-d", 1036, 632, "donde estás", "start") + `</g>`);
  // la entrada custom: un rombo colgado del punto en que se tomó la decisión
  const [x, y] = N.a3, r = 36;
  out.push(`<g data-part="custom">${edge("a3", "a2", r)}<path class="fg-core" d="M${x} ${y - r} L${x + r} ${y} L${x} ${y + r} L${x - r} ${y} Z"/>` +
    `<path class="fg-core2" d="M${x} ${y - r + 12} L${x + r - 12} ${y} L${x} ${y + r - 12} L${x - r + 12} ${y} Z"/>` +
    T("fg-t", x, 172, "appendEntry") + T("fg-cd", x, 204, "permisos · siempre") + `</g>`);
  out.push(`<g data-part="rama">${PATH.map(ring).join("")}` +
    T("fg-t", 640, 682, "getBranch()", "start") + T("fg-d", 640, 714, "de la raíz a donde estás: ya no la ve", "start") + `</g>`);
  const svg = svgOf(out, "La entrada que guarda appendEntry cuelga del punto del árbol en que se tomó la decisión. Al volver atrás con /tree queda en la rama que dejas, y getBranch, que recorre el camino de la raíz a donde estás, ya no la ve.");
  writeFileSync(join(HERE, "..", "v09-rebobinar.fig.js"), `(window.FIGS = window.FIGS || {})['v09-rebobinar'] = ${JSON.stringify(svg)};\n`);
  console.log("v09-rebobinar", svg.length);
}
