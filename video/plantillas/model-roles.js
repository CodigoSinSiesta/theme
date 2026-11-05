/* model-roles · una tarjeta por rol con logo y chip de modelo en posición fija (centrados y alineados entre tarjetas).
   Datos: kicker, title, cards[] = { role, desc, logo, model, lit? }. 2–5 tarjetas (ancho 300 con 5, hasta 420 con menos, centradas). */
TPL['model-roles'] = {
  def: {
    kicker: 'Roles', title: 'Cada tarea, [[su modelo]]',
    cards: [
      { role: 'default', desc: 'El de cada turno', logo: 'deepseek', model: 'deepseek-flash' },
      { role: 'smol', desc: 'Tareas pequeñas y baratas', logo: 'deepseek', model: 'deepseek-flash' },
      { role: 'slow', desc: 'Razonamiento largo', logo: 'deepseek', model: 'deepseek-v4-pro' },
      { role: 'plan', desc: 'Planificar antes de tocar', logo: 'deepseek', model: 'deepseek-v4-pro', lit: true },
      { role: 'advisor', desc: 'Segunda opinión', logo: 'deepseek', model: 'deepseek-v4-pro' },
    ],
  },
  html(d, H) {
    const n = d.cards.length, gap = 45, w = Math.min(420, Math.floor((1680 - gap * (n - 1)) / n)), x0 = 120 + Math.round((1680 - (n * w + gap * (n - 1))) / 2);
    const cards = d.cards.map((c, i) => `<div class="g${c.lit ? ' lit' : ''} r" data-i="${i + 1}" style="left:${x0 + i * (w + gap)}px;top:340px;width:${w}px;height:560px"><div class="mono cy" style="font-size:34px;font-weight:700">${H.A(c.role)}</div><div class="s" style="font-size:24px;margin-top:10px">${H.A(c.desc)}</div>`
      + `<div style="position:absolute;left:0;right:0;top:300px;height:110px;display:flex;justify-content:center">${H.ICO(c.logo, 110)}</div>`
      + `<div style="position:absolute;left:0;right:0;top:438px;display:flex;justify-content:center"><div class="chip" style="font-size:22px;padding:8px 16px;white-space:nowrap">${H.A(c.model)}</div></div></div>`).join('');
    return `${H.HEAD(d)}\n${cards}`;
  },
};
