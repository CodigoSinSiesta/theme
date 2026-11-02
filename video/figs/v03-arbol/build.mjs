// Fig · Vídeo 03 · «La sesión es un árbol»: un fichero JSONL cuyas entradas apuntan a su padre (parentId). Del punto de
// bifurcación salen dos ramas: la abandonada (sigue en el fichero, no viaja) y la activa, que acaba en la hoja. La rama
// activa es el camino de la hoja a la raíz: lo que recibe el modelo. Grupos <g data-part> hermanos (sin anidar):
// entradas (con la raíz) · abandonada · hoja · rama. Mismas clases que capas (fg-sec, fg-ico, fg-t, fg-d, fg-core, fg-core2,
// fg-cd, fg-ring). Uso, desde motor/: node figs/v03-arbol/build.mjs
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const W = 1400, H = 780, R = 26, RL = 34;
const N = {                                  // nodos: tronco (y 400), rama abandonada (y 250), rama activa (y 550)
  raiz: [150, 400], e2: [330, 400], e3: [510, 400],
  a1: [700, 250], a2: [880, 250], a3: [1060, 250],
  b1: [700, 550], b2: [880, 550], hoja: [1060, 550],
};
const head = (x, y) => `<path class="fg-ico" d="M${x + 15} ${y - 10} L${x} ${y} L${x + 15} ${y + 10}"/>`;   // punta hacia la izquierda (hacia el padre)
function edge(c, p, rc = R) {                // del hijo al padre: el hijo guarda la referencia (parentId)
  const [cx, cy] = N[c], [px, py] = N[p], x0 = cx - rc - 6, x1 = px + R + 8;
  const d = cy === py ? `M${x0} ${cy} L${x1} ${py}` : `M${x0} ${cy} C${x0 - 90} ${cy} ${x1 + 90} ${py} ${x1} ${py}`;
  return `<path class="fg-ico" d="${d}"/>` + head(x1, py);
}
const node = (k) => `<circle class="fg-sec" cx="${N[k][0]}" cy="${N[k][1]}" r="${R}"/>`;
const T = (cls, x, y, s, a = "middle") => `<text class="${cls}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
const out = [];
// el fichero: marco y rótulo (sin data-part: nunca se atenúa)
out.push(`<rect class="fg-core2" x="30" y="60" width="1340" height="680" rx="28" style="fill:none"/>`);
out.push(T("fg-ring", 70, 118, "LA SESIÓN · UN FICHERO JSONL", "start"));
// rama activa: banda de la hoja a la raíz, por debajo de los nodos (las flechas de cada arista ya apuntan al padre)
const band = `M${N.hoja[0]} ${N.hoja[1]} L${N.b1[0]} ${N.b1[1]} C${N.b1[0] - 110} ${N.b1[1]} ${N.e3[0] + 110} ${N.e3[1]} ${N.e3[0]} ${N.e3[1]} L${N.raiz[0]} ${N.raiz[1]}`;
out.push(`<g data-part="rama"><path class="fg-core" d="${band}" style="fill:none;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.5"/>` +
  T("fg-t", 700, 652, "rama activa", "start") + T("fg-d", 700, 686, "de la hoja a la raíz: lo que recibe el modelo", "start") + `</g>`);
// la raíz: la primera entrada, sin padre (misma pieza que las entradas)
out.push(`<g data-part="entradas">${node("raiz")}${T("fg-t", N.raiz[0], 350, "raíz")}${T("fg-cd", N.raiz[0], 466, "f53893a8")}${T("fg-d", N.raiz[0], 498, "parentId: null")}</g>`);
// las entradas: tronco común y la rama activa hasta la hoja; cada una apunta a su padre
out.push(`<g data-part="entradas">${edge("e2", "raiz")}${edge("e3", "e2")}${edge("b1", "e3")}${edge("b2", "b1")}` +
  `${node("e2")}${node("e3")}${node("b1")}${node("b2")}${T("fg-cd", N.e2[0], 466, "a2faad55")}${T("fg-d", 240, 380, "parentId")}</g>`);
// la rama abandonada
out.push(`<g data-part="abandonada">${edge("a1", "e3")}${edge("a2", "a1")}${edge("a3", "a2")}${node("a1")}${node("a2")}${node("a3")}` +
  `${T("fg-t", 700, 172, "rama abandonada", "start")}${T("fg-d", 700, 205, "sigue en el fichero, pero no viaja", "start")}</g>`);
// la hoja: donde estás
out.push(`<g data-part="hoja">${edge("hoja", "b2", RL)}<circle class="fg-core" cx="${N.hoja[0]}" cy="${N.hoja[1]}" r="${RL}"/>` +
  `<circle class="fg-core2" cx="${N.hoja[0]}" cy="${N.hoja[1]}" r="${RL - 11}"/>${T("fg-t", 1114, 546, "hoja", "start")}${T("fg-d", 1114, 580, "donde estás", "start")}</g>`);
const svg = `<svg class="fg-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="La sesión como árbol en un fichero JSONL: cada entrada apunta a su padre; de un punto salen una rama abandonada, que sigue en el fichero, y la rama activa, que acaba en la hoja. El camino de la hoja a la raíz es lo que recibe el modelo.">${out.join("")}</svg>`;
writeFileSync(join(HERE, "..", "v03-arbol.fig.js"), `(window.FIGS = window.FIGS || {})['v03-arbol'] = ${JSON.stringify(svg)};\n`);
console.log("ok", svg.length);
