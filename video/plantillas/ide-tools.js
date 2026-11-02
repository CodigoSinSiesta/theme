/* ide-tools · nodo central con 2–6 herramientas a los lados (2 columnas, filas calculadas) unidas por líneas.
   Datos: kicker, title, hub = { logo, name }, tools[] = { name, text }. Herramienta i entra en el paso i+1. */
TPL['ide-tools'] = {
  def: { kicker: 'IDE', title: 'Un agente con [[herramientas de IDE]]', hub: { logo: 'omp', name: 'omp' },
    tools: [
      { name: 'LSP', text: 'Renombrar símbolos en todo el proyecto' }, { name: 'debug', text: 'Puntos de parada con js-debug' },
      { name: 'ast_edit', text: 'Editar el árbol de sintaxis, no el texto' }, { name: 'eval', text: 'Ejecutar y comprobar al momento' },
    ] },
  html(d, H) {
    const n = d.tools.length, rows = Math.ceil(n / 2), ys = rows === 1 ? [565] : rows === 2 ? [340, 790] : [340, 565, 790];
    const pos = d.tools.map((t, i) => ({ x: i % 2 ? 1280 : 120, y: ys[Math.floor(i / 2)] }));
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3" stroke-opacity=".7">
${pos.map((p, i) => `<line class="draw" data-i="${i + 1}" x1="960" y1="640" x2="${p.x === 120 ? 640 : 1280}" y2="${p.y + 75}"/>`).join('')}</svg>
<div class="g lit flex" style="left:760px;top:540px;width:400px;height:200px;gap:22px">${H.ICO(d.hub.logo, 100)}<span class="t" style="font-size:38px">${H.A(d.hub.name)}</span></div>
${d.tools.map((t, i) => `<div class="g r" data-i="${i + 1}" style="left:${pos[i].x}px;top:${pos[i].y}px;width:520px;height:150px;padding:24px 30px"><div class="mono cy" style="font-size:30px;font-weight:700">${H.esc(t.name)}</div><div class="s" style="font-size:24px;margin-top:6px">${H.A(t.text)}</div></div>`).join('\n')}`;
  },
};
