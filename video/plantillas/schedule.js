/* schedule · rejilla semanal de tareas programadas. Cada tarea entra en el paso `s` (varias pueden compartirlo).
   Datos: kicker, title, days[] (≤6), slots[] (horas, ≤3), events[] = { day (0…), slot (0…), t, s, lit? }. */
TPL.schedule = {
  def: {
    kicker: 'Automatización', title: 'Lo que hace [[sin que estés]]',
    days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'], slots: ['08:00', '13:00', '20:00'],
    events: [
      { day: 0, slot: 0, t: 'Resumen de PRs', s: 1 }, { day: 2, slot: 0, t: 'Informe semanal', s: 3, lit: true }, { day: 4, slot: 0, t: 'Resumen de PRs', s: 1 },
      { day: 1, slot: 1, t: 'Copia de seguridad', s: 2 }, { day: 3, slot: 2, t: 'Auditoría', s: 2 },
    ],
  },
  html(d, H) {
    const nd = d.days.length;
    const head = '<div></div>' + d.days.map(x => `<div class="k" style="text-align:center">${H.esc(x)}</div>`).join('');
    const body = d.slots.map((h, si) => `<div class="k mono" style="padding-top:20px">${H.esc(h)}</div>` + d.days.map((_, di) => {
      const e = d.events.find(v => v.day === di && v.slot === si);
      return e ? `<div class="g${e.lit ? ' lit' : ''} r" data-i="${e.s}" style="position:relative;padding:18px;height:150px"><div class="s" style="font-size:26px">${H.esc(e.t)}</div></div>` : '<div></div>';
    }).join('')).join('');
    return `${H.HEAD(d)}
<div class="abs" style="left:120px;top:340px;width:1680px;display:grid;grid-template-columns:150px repeat(${nd},1fr);gap:12px;align-items:stretch">${head}${body}</div>`;
  },
};
