// Fig · Vídeo 12 · Las ramas de la sesión de hoy. Mismo lenguaje que v03-arbol y v09-ramas: entradas que apuntan a su
// padre (flecha hacia la izquierda) dentro de un fichero JSONL. Dos variantes:
//   v12-ramas (c4-01, c4-05): un fichero; tras la primera respuesta («el mismo punto») salen la rama del umbral de 50
//     (T2 gratis desde 50 € y T3 +3 € urgente) y su hermana, T2′ (2,95 € entre 25 y 40). Partes: fichero · tronco ·
//     vieja · punto · nueva.
//   v12-fork  (c6-06): /fork copia el fichero entero; en la copia, /tree elige una rama y las otras siguen en el fichero
//     sin viajar al modelo. Partes: original · copia · rama · otras · sdk.
// Clases de capas / v03-arbol (fg-sec, fg-ico, fg-t, fg-d, fg-core, fg-core2, fg-cd, fg-ring). Uso, desde motor/:
//   node figs/v12-ramas/build.mjs
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const W = 1400, H = 780;
const T = (cls, x, y, s, a = "middle") => `<text class="${cls}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
const head = (x, y, k = 1) => `<path class="fg-ico" d="M${x + 15 * k} ${y - 10 * k} L${x} ${y} L${x + 15 * k} ${y + 10 * k}"/>`;   // punta hacia el padre
function mk(N, R) {
  const edge = (c, p, rc = R) => {           // del hijo al padre: el hijo guarda la referencia (parentId)
    const [cx, cy] = N[c], [px, py] = N[p], x0 = cx - rc - 6, x1 = px + R + 8, k = R / 26;
    const d = cy === py ? `M${x0} ${cy} L${x1} ${py}` : `M${x0} ${cy} C${x0 - 80 * k} ${cy} ${x1 + 80 * k} ${py} ${x1} ${py}`;
    return `<path class="fg-ico" d="${d}"/>` + head(x1, py, k);
  };
  const node = (k) => `<circle class="fg-sec" cx="${N[k][0]}" cy="${N[k][1]}" r="${R}"/>`;
  const ring = (k) => `<circle class="fg-core" cx="${N[k][0]}" cy="${N[k][1]}" r="${R}"/>`;
  return { edge, node, ring };
}
const svgOf = (out, label) => `<svg class="fg-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${out.join("")}</svg>`;
const bandStyle = "fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.5";

// ── v12-ramas: rebobinar deja la rama vieja y cuelga una hermana del mismo punto
{
  const R = 26, RL = 34;
  const N = {
    t1: [140, 420], r1: [300, 420],
    a1: [480, 250], a2: [640, 250], a3: [800, 250], a4: [960, 250],
    b1: [480, 590], hoja: [640, 590],
  };
  const { edge, node } = mk(N, R);
  const out = [];
  out.push(`<g data-part="fichero"><rect class="fg-core2" x="30" y="60" width="1340" height="680" rx="28" style="fill:none"/>` +
    T("fg-ring", 70, 118, "LA SESIÓN · UN SOLO FICHERO JSONL", "start") + `</g>`);
  out.push(`<g data-part="tronco">${edge("r1", "t1")}${node("t1")}${node("r1")}` +
    T("fg-t", N.t1[0], 365, "T1") + T("fg-d", N.t1[0], 482, "resumen") + `</g>`);
  out.push(`<g data-part="vieja">${edge("a1", "r1")}${edge("a2", "a1")}${edge("a3", "a2")}${edge("a4", "a3")}` +
    ["a1", "a2", "a3", "a4"].map(node).join("") +
    T("fg-t", 560, 180, "T2 · gratis desde 50 €") + T("fg-t", 880, 330, "T3 · +3 € urgente") +
    T("fg-d", 1030, 244, "la rama del", "start") + T("fg-d", 1030, 272, "umbral de 50", "start") + `</g>`);
  out.push(`<g data-part="nueva">${edge("b1", "r1")}${edge("hoja", "b1", RL)}${node("b1")}` +
    `<circle class="fg-core" cx="${N.hoja[0]}" cy="${N.hoja[1]}" r="${RL}"/><circle class="fg-core2" cx="${N.hoja[0]}" cy="${N.hoja[1]}" r="${RL - 11}"/>` +
    T("fg-t", 450, 680, "T2′ · 2,95 € entre 25 y 40", "start") + T("fg-d", 710, 584, "su hermana:", "start") + T("fg-d", 710, 612, "la rama nueva", "start") + `</g>`);
  out.push(`<g data-part="punto"><circle class="fg-core" cx="${N.r1[0]}" cy="${N.r1[1]}" r="${R + 14}" style="fill:none;stroke-width:4"/>` +
    T("fg-t", 60, 566, "el mismo punto", "start") + T("fg-d", 60, 600, "antes de la segunda petición", "start") + `</g>`);
  const svg = svgOf(out, "La sesión en un solo fichero JSONL: tras la primera respuesta salen dos ramas hermanas. Arriba, la del umbral de 50 euros con su recargo urgente; abajo, la nueva petición de 2,95 euros entre 25 y 40. Rebobinar no borra nada.");
  writeFileSync(join(HERE, "..", "v12-ramas.fig.js"), `(window.FIGS = window.FIGS || {})['v12-ramas'] = ${JSON.stringify(svg)};\n`);
  console.log("v12-ramas", svg.length);
}

// ── v12-fork: /fork copia el fichero entero; en la copia, /tree elige la rama
{
  const R = 20;
  const tree = (ox) => ({
    t1: [ox + 70, 400], r1: [ox + 175, 400],
    a1: [ox + 300, 285], a2: [ox + 410, 285], a3: [ox + 520, 285],
    b1: [ox + 300, 515], b2: [ox + 410, 515],
  });
  const L = tree(30), C = tree(760);
  const out = [];
  const frame = (x, title, sub) => `<rect class="fg-core2" x="${x}" y="150" width="610" height="480" rx="24" style="fill:none"/>` +
    T("fg-ring", x + 30, 198, title, "start") + T("fg-d", x + 305, 668, sub);
  const all = (N, cls) => { const { edge, node } = mk(N, R);
    return edge("r1", "t1") + edge("a1", "r1") + edge("a2", "a1") + edge("a3", "a2") + edge("b1", "r1") + edge("b2", "b1") +
      Object.keys(N).map(node).join(""); };
  // original: el fichero de partida, entero
  out.push(`<g data-part="original">${frame(30, "ORIGINAL", "20 líneas · todas las ramas")}${all(L)}</g>`);
  // la copia: mismo árbol en un fichero nuevo, y la flecha de /fork
  out.push(`<g data-part="copia">${frame(760, "FORK · FICHERO NUEVO", "20 líneas · copia completa")}${all(C)}` +
    `<path class="fg-ico" d="M650 400 L738 400"/><path class="fg-ico" d="M722 388 L740 400 L722 412"/>` +
    T("fg-t", 695, 372, "/fork") + `</g>`);
  // en la copia: /tree elige la rama de abajo (banda de la hoja a la raíz)
  const { ring } = mk(C, R);
  const bandD = `M${C.b2.join(" ")} L${C.b1.join(" ")} C${C.b1[0] - 70} ${C.b1[1]} ${C.r1[0] + 70} ${C.r1[1]} ${C.r1.join(" ")} L${C.t1.join(" ")}`;
  out.push(`<g data-part="rama"><path class="fg-core" d="${bandD}" style="${bandStyle};stroke-width:24"/>` +
    ["t1", "r1", "b1", "b2"].map(ring).join("") +
    T("fg-t", C.b2[0] + 40, 512, "/tree", "start") + T("fg-d", C.b2[0] + 40, 544, "sigues desde aquí", "start") + `</g>`);
  // las otras ramas: siguen en el fichero, no viajan
  out.push(`<g data-part="otras">${["a1", "a2", "a3"].map(k => `<circle class="fg-core2" cx="${C[k][0]}" cy="${C[k][1]}" r="${R + 8}"/>`).join("")}` +
    T("fg-d", C.a1[0] - 30, 244, "las otras: en el fichero, no viajan", "start") + `</g>`);
  // nota: bifurcar desde una entrada concreta
  out.push(`<g data-part="sdk">${T("fg-d", 700, 728, "¿Desde una entrada concreta? Modo RPC y SDK · vídeo 21")}</g>`);
  const svg = svgOf(out, "/fork copia el fichero de sesión entero, con todas sus ramas, a un fichero nuevo. En la copia, /tree lleva a la rama que quieres y sigues desde ella; las otras siguen en el fichero pero no viajan al modelo.");
  writeFileSync(join(HERE, "..", "v12-fork.fig.js"), `(window.FIGS = window.FIGS || {})['v12-fork'] = ${JSON.stringify(svg)};\n`);
  console.log("v12-fork", svg.length);
}
