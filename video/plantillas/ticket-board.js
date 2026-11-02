/* ticket-board · tablero de tickets en columnas de estado. Un paso por ticket, en orden de columnas.
   Datos: kicker, title, cols[] = { name, tickets[] = { id, text, state?: 'lit'|'ok' } }. 2–4 columnas, hasta 3 tickets por columna. */
TPL['ticket-board'] = {
  def: {
    kicker: 'Estado', title: 'Qué falta [[por hacer]]',
    cols: [
      { name: 'sin_empezar', tickets: [{ id: 'ticket-003', text: 'Aplicar cupón al total' }] },
      { name: 'en_curso', tickets: [{ id: 'ticket-002', text: 'Validar cupones caducados', state: 'lit' }] },
      { name: 'pasa', tickets: [{ id: 'ticket-001 ✓', text: 'Crear el modelo de cupón', state: 'ok' }] },
    ],
  },
  html(d, H) {
    const n = d.cols.length, gap = 60, w = (1680 - gap * (n - 1)) / n;
    let step = 0, out = H.HEAD(d);
    d.cols.forEach((c, ci) => {
      const x = 120 + ci * (w + gap);
      out += `<div class="k abs" style="left:${x}px;top:330px">${H.esc(c.name)}</div>`
        + `<div class="abs" style="left:${x}px;top:380px;width:${w}px;height:540px;border:1.5px dashed var(--line);border-radius:20px"></div>`;
      c.tickets.forEach((t, ti) => {
        step++;
        const lit = t.state === 'lit', ok = t.state === 'ok';
        out += `<div class="g${lit ? ' lit' : ''} r" data-i="${step}" style="left:${x + 30}px;top:${410 + ti * 150}px;width:${w - 60}px;height:130px;padding:22px 28px${ok ? ';border-color:var(--ok)' : ''}">`
          + `<div class="mono ${ok ? 'ok' : 'cy'}" style="font-size:28px">${H.esc(t.id)}</div><div class="s" style="font-size:26px">${H.esc(t.text)}</div></div>`;
      });
    });
    return out;
  },
};
