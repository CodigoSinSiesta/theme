/* swimlane · carriles por actor con mensajes (flechas verticales) en orden; cada mensaje es un paso.
   Datos: lanes[] (nombres, 2–5), messages[] = { from, to (índices de carril), label, dashed?, side?: 'left', x? }.
   x se reparte solo entre 560 y 1660 si no se da. 3–7 mensajes. */
TPL.swimlane = {
  def: {
    kicker: 'Secuencia', title: 'Quién habla [[con quién]]',
    lanes: ['Tú', 'Agente', 'Herramienta', 'Modelo'],
    messages: [
      { from: 0, to: 1, label: 'pide', x: 560 },
      { from: 1, to: 3, label: 'prompt', x: 860 },
      { from: 3, to: 1, label: 'llama a bash', x: 1140, dashed: true },
      { from: 1, to: 2, label: 'ejecuta', x: 1400 },
      { from: 1, to: 0, label: 'respuesta', x: 1660, side: 'left' },
    ],
  },
  html(d, H) {
    const top = i => 330 + i * 150, y = i => top(i) + 65, n = d.messages.length;
    const X = (m, i) => m.x != null ? m.x : Math.round(n === 1 ? 1110 : 560 + i * 1100 / (n - 1));
    const lanes = d.lanes.map((l, i) => `<div class="lane" style="top:${top(i)}px"></div><div class="abs k" style="left:150px;top:${top(i) + 50}px">${H.A(l)}</div>`).join('');
    const lines = d.messages.map((m, i) => `<line marker-end="url(#ah)" class="draw" data-i="${i + 1}" x1="${X(m, i)}" y1="${y(m.from)}" x2="${X(m, i)}" y2="${y(m.to)}"${m.dashed ? ' stroke-dasharray="10 8"' : ''}/>`).join('');
    const labels = d.messages.map((m, i) => {
      const x = X(m, i), mid = m.to > m.from ? y(m.from) + 8 : y(m.from) - 38;   // dentro del carril de origen, no sobre la raya
      const pos = m.side === 'left' ? `left:${x - 190}px;width:180px;text-align:right` : `left:${x + 20}px`;
      return `<div class="abs mono cy r" data-i="${i + 1}" style="${pos};top:${mid}px;font-size:24px">${H.A(m.label)}</div>`;
    }).join('');
    return `${H.HEAD(d)}
${lanes}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4"><defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#60a5fa" stroke="none"/></marker></defs>${lines}</svg>
${labels}`;
  },
};
