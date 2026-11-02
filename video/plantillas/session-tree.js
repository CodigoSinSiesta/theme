/* session-tree · árbol de sesión. Cada nodo entra en un paso (orden del array; el padre va antes que el hijo).
   Datos: kicker, title, nodes[] = { id, parent?, label, lit?, x?, y? }, notes[] = { node, text, dx, dy, cls? } (aparecen con su nodo), legend[].
   Layout: x = 300 + 260·profundidad; el primer hijo sigue la fila del padre, los demás abren fila nueva (220 px más abajo). Hasta ~6 niveles y 3 filas (con 3 filas la leyenda sube a y=330). */
TPL['session-tree'] = {
  def: {
    kicker: 'Sesión', title: 'Una sesión es [[un árbol]]',
    nodes: [
      { id: 'n1', label: 'U' }, { id: 'n2', parent: 'n1', label: 'A' }, { id: 'n3', parent: 'n2', label: 'U' },
      { id: 'n4', parent: 'n3', label: 'A' }, { id: 'n5', parent: 'n4', label: 'U' },
      { id: 'n6', parent: 'n2', label: 'U' }, { id: 'n7', parent: 'n6', label: 'A', lit: true },
    ],
    notes: [
      { node: 'n6', text: '/fork', dx: -420, dy: -100 },
      { node: 'n5', text: '/tree · salta a cualquier nodo', dx: -120, dy: -110 },
      { node: 'n7', text: '← hoja actual', dx: 80, dy: 25, cls: 'k cy' },
    ],
    legend: ['U · tu mensaje', 'A · respuesta del agente'],
  },
  html(d, H) {
    const P = {}, kids = {}; let rows = 0;
    d.nodes.forEach((n, i) => {
      const par = n.parent != null ? P[n.parent] : null;
      const depth = par ? par.depth + 1 : 0;
      let row = 0;
      if (par) { kids[n.parent] = (kids[n.parent] || 0) + 1; row = kids[n.parent] === 1 ? par.row : ++rows; }
      P[n.id] = { n, i, par, depth, row, x: n.x != null ? n.x : 300 + 260 * depth, y: n.y != null ? n.y : 520 + 220 * row };
    });
    let svg = '', nodes = '', maxY = 0;
    d.nodes.forEach(n => {
      const p = P[n.id], s = p.i + 1; maxY = Math.max(maxY, p.y);
      if (p.par) {
        const q = p.par;
        svg += q.y === p.y
          ? `<line class="draw" data-i="${s}" x1="${q.x}" y1="${q.y}" x2="${p.x}" y2="${p.y}"/>`
          : `<path class="draw" data-i="${s}" d="M${q.x} ${q.y} C${q.x} ${p.y} ${q.x + (p.x - q.x) / 2} ${p.y} ${p.x} ${p.y}"/>`;
      }
      nodes += `<div class="nd${n.lit ? ' lit' : ''} r" data-i="${s}" style="left:${p.x}px;top:${p.y}px">${H.A(n.label)}</div>`;
    });
    const notes = (d.notes || []).filter(o => P[o.node]).map(o => { const p = P[o.node]; return `<div class="abs ${o.cls || 'mono cy'} r" data-i="${p.i + 1}" style="left:${p.x + o.dx}px;top:${p.y + o.dy}px;${o.cls ? '' : 'font-size:28px'}">${H.A(o.text)}</div>`; }).join('');
    const last = d.nodes.length;
    const legend = (d.legend || []).length ? `<div class="abs flex r" data-i="${last}" style="left:300px;top:${maxY > 740 ? 330 : 890}px;gap:36px">${d.legend.map(t => `<span class="k">${H.A(t)}</span>`).join('')}</div>` : '';
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4">${svg}</svg>
${nodes}${notes}${legend}`;
  },
};
