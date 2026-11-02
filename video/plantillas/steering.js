/* steering · una fila por tecla con su barra de trabajo que crece (1 paso) y remates opcionales (un paso cada uno).
   Datos: kicker, title, rows[] = { label, w (ancho de la barra, máx. 1180), tag? = { text, x? }, end? = { kind: 'queue'|'stop', text } }.
   3–4 filas (separación 160 px desde y=400). */
TPL.steering = {
  def: {
    kicker: 'Dirigir', title: 'Hablarle [[mientras trabaja]]',
    rows: [
      { label: 'Enter · steering', w: 1180, tag: { text: 'tu mensaje se inserta aquí ↓', x: 880 } },
      { label: 'Alt+Enter · follow-up', w: 800, end: { kind: 'queue', text: 'tu petición, en cola' } },
      { label: 'Esc · parar', w: 520, end: { kind: 'stop', text: 'se detiene' } },
    ],
  },
  html(d, H) {
    let step = 0, out = '';
    d.rows.forEach((r, i) => {
      const top = 400 + i * 160, w = r.w || 1180, st = ++step, stop = r.end && r.end.kind === 'stop';
      out += `<div class="abs k" style="left:120px;top:${top + 20}px;width:380px">${H.A(r.label)}</div>`
        + `<i class="bx" data-i="${st}" style="position:absolute;left:520px;top:${top}px;width:${w}px;height:64px;border-radius:${stop ? '12px 0 0 12px' : '12px'};background:rgba(96,165,250,.35);border:1.5px solid var(--cyan)"></i>`;
      if (r.tag) out += `<div class="abs r" data-i="${++step}" style="left:${r.tag.x != null ? r.tag.x : 880}px;top:${top - 60}px"><span class="chip" style="font-size:22px;border-color:var(--cyan)">${H.A(r.tag.text)}</span></div>`;
      if (r.end) {
        const s2 = ++step, x = 520 + w + 20;
        out += stop
          ? `<div class="abs r bad" data-i="${s2}" style="left:${x}px;top:${top + 2}px;font:700 54px var(--mono)">✗</div><div class="abs k bad r" data-i="${s2}" style="left:${x + 80}px;top:${top + 22}px">${H.A(r.end.text)}</div>`
          : `<div class="abs r" data-i="${s2}" style="left:${x}px;top:${top - 6}px;min-width:${Math.max(200, 1700 - x)}px;box-sizing:border-box;padding:0 28px;height:76px;border:2px dashed var(--amber);border-radius:12px;display:grid;place-items:center;font:500 24px var(--mono);color:var(--amber)">${H.A(r.end.text)}</div>`;
      }
    });
    return `${H.HEAD(d)}\n${out}`;
  },
};
