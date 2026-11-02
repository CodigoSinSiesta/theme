/* timeline · línea de tiempo con hitos alternos arriba/abajo; cada hito entra en un paso.
   Datos: kicker, title, items[] = { k (año/etiqueta), t (texto), lit? }. 2–6 hitos. */
TPL.timeline = {
  def: {
    kicker: 'Historia', title: 'Cuatro versiones, [[un giro]]',
    items: [
      { k: '2023', t: 'Prompts sueltos' }, { k: '2024', t: 'Herramientas' },
      { k: '2025', t: 'Skills y MCP' }, { k: '2026', t: 'Harness', lit: true },
    ],
  },
  html(d, H) {
    const n = d.items.length, step = n > 1 ? 1290 / (n - 1) : 0, x = i => n > 1 ? Math.round(280 + i * step) : 925;
    const dots = d.items.map((it, i) => `<div class="abs r" data-i="${i + 1}" style="left:${x(i)}px;top:560px"><i class="dot"${it.lit ? ' style="background:var(--ink);box-shadow:0 0 30px var(--sky)"' : ''}></i></div>`).join('');
    const cards = d.items.map((it, i) => `<div class="g${it.lit ? ' lit' : ''} r" data-i="${i + 1}" style="left:${x(i) - 180}px;top:${i % 2 ? 660 : 360}px;width:360px;padding:20px 26px"><div class="k">${H.esc(it.k)}</div><div class="t" style="font-size:36px">${H.A(it.t)}</div></div>`).join('');
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080"><line class="draw" x1="190" y1="600" x2="1730" y2="600" stroke="#60a5fa" stroke-width="4"/></svg>
${dots}${cards}`;
  },
};
