/* model-baton · vídeo 14 · una sesión que cambia de modelo una sola vez: el capaz hasta el disparador y el rápido desde ahí.
   Datos: kicker, title, from/to = { role, model }, before[] = { t, icon } (1–3 acciones), trigger = { t, icon }, after[] = { t, icon } (1–3), handoff, think, exec, flag.
   Iconos (Heroicons): magnifying-glass explora, list-bullet lista de tareas, pencil-square edición, bolt el rápido sigue.
   Pasos: 1 banda del capaz y 1.ª acción, 2 resto de acciones previas, 3 disparador y corte, 4 banda del rápido, 5 leyendas, 6 aviso. */
TPL['model-baton'] = {
  def: {
    kicker: '/prewalk', title: 'Un traspaso, [[en la primera edición]]',
    from: { role: 'activo', model: 'deepseek-v4-pro' }, to: { role: 'smol', model: 'deepseek-flash' },
    before: [{ t: 'explora', icon: 'magnifying-glass' }, { t: 'lista de tareas', icon: 'list-bullet' }], trigger: { t: 'primera edición', icon: 'pencil-square' },
    after: [{ t: 'sigue desde ahí', icon: 'bolt' }],
    handoff: 'traspaso único', think: 'El capaz [[piensa el plan]]', exec: 'El rápido [[lo ejecuta]]', flag: 'apagado de serie',
  },
  html(d, H) {
    const x0 = 160, xs = 1000, x1 = 1760, ty = 640;
    const spread = (a, b, n) => Array.from({ length: n }, (_, k) => Math.round(a + (b - a) * (k + 1) / (n + 1)));
    const bx = spread(x0, xs, d.before.length), ax = spread(xs, x1, d.after.length);
    const ev = (x, e, i, lit) => `<div class="abs r" data-i="${i}" style="left:${x - 36}px;top:${ty - 36}px;width:72px;height:72px;border-radius:50%;background:${lit ? 'rgba(96,165,250,.35)' : '#16264a'};border:3px solid ${lit ? 'var(--cyan)' : 'var(--sky)'};display:grid;place-items:center;${lit ? 'box-shadow:0 0 26px var(--cyan)' : ''}">${H.GLYPH(e.icon, 38, lit ? 'cy' : '')}</div>
<div class="abs r" data-i="${i}" style="left:${x - 200}px;top:${ty + 56}px;width:400px;text-align:center"><span class="chip" style="font-size:24px${lit ? ';border-color:var(--cyan);color:var(--ink)' : ''}">${H.esc(e.t)}</span></div>`;
    const band = (x, w, s, i, tone) => `<i class="bx" data-i="${i}" style="position:absolute;left:${x}px;top:430px;width:${w}px;height:96px;border-radius:16px;background:${tone === 'ok' ? 'rgba(52,211,153,.18)' : 'rgba(96,165,250,.24)'};border:2px solid ${tone === 'ok' ? 'var(--ok)' : 'var(--cyan)'}"></i>
<div class="abs r" data-i="${i}" style="left:${x + 30}px;top:448px"><div class="k ${tone === 'ok' ? 'ok' : 'cy'}" style="font-size:22px">${H.esc(s.role)}</div><div class="mono" style="font-size:28px;margin-top:4px">${H.esc(s.model)}</div></div>`;
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4">
<line x1="${x0}" y1="${ty}" x2="${x1}" y2="${ty}" stroke="rgba(96,165,250,.35)"/>
<line class="draw" data-i="3" x1="${xs}" y1="400" x2="${xs}" y2="${ty - 38}" stroke="#fbbf24"/></svg>
${band(x0, xs - x0 - 8, d.from, 1, 'cy')}
${band(xs + 8, x1 - xs - 8, d.to, 4, 'ok')}
${bx.map((x, k) => ev(x, d.before[k], k ? 2 : 1)).join('\n')}
${ev(xs, d.trigger, 3, true)}
${ax.map((x, k) => ev(x, d.after[k], 4)).join('\n')}
<div class="abs r" data-i="3" style="left:${xs - 200}px;top:340px;width:400px;text-align:center"><span class="pill" style="color:var(--amber);border-color:var(--amber);font-size:22px;padding:8px 18px">${H.A(d.handoff)}</span></div>
<div class="g r" data-i="5" style="left:${x0}px;top:820px;width:${xs - x0 - 20}px;height:110px;padding:0 30px;display:flex;align-items:center"><span class="s" style="font-size:32px;color:var(--ink)">${H.A(d.think)}</span></div>
<div class="g r" data-i="5" style="left:${xs + 20}px;top:820px;width:${x1 - xs - 20}px;height:110px;padding:0 30px;display:flex;align-items:center;border-color:var(--ok)"><span class="s" style="font-size:32px;color:var(--ink)">${H.A(d.exec)}</span></div>
<div class="abs r" data-i="6" style="left:1440px;top:340px;width:320px;text-align:right"><span class="pill" style="font-size:22px;padding:8px 18px">${H.A(d.flag)}</span></div>`;
  },
};
