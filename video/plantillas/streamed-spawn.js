/* streamed-spawn · vídeo 16 · una llamada por lotes que se escribe de arriba abajo: contexto común, encargos, y cada
   subagente arranca en cuanto su encargo está completo, antes de que se cierre la llamada. Datos: kicker, title, call, context,
   list, writer, close, sub, tasks[] = { name, agent, task } (2–3). Pasos: 1 llamada, 2 contexto, 3 encargos, 4 tarea/nombre/tipo,
   5 un subagente por encargo, 6 arrancan, 7 la llamada aún se escribe, 8 cada uno al completarse su encargo. */
TPL['streamed-spawn'] = {
  def: {
    kicker: 'task · por lotes', title: 'Arrancan antes de [[cerrar la llamada]]',
    call: 'task({', context: 'context: "Tienda de juguete…"', list: 'tasks: [', close: '})', writer: 'Pro escribe la llamada', sub: 'subagente',
    tasks: [
      { name: 'JSDocEnvio', agent: 'sonic', task: 'JSDoc en las funciones de envío' },
      { name: 'ScoutSubtotalEnvio', agent: 'scout', task: 'Dónde se calculan subtotal y envío' },
      { name: 'RevisorCarrito', agent: 'revisor-tests', task: 'Los tests del carrito' },
    ],
  },
  html(d, H) {
    const T = d.tasks.slice(0, 3), n = T.length, y = i => 472 + i * 146, cy = i => y(i) + 64;
    const xs = i => 1120 + i * 140, xe = 1120 + n * 140 + 60, xr = 1780;
    const entry = (t, i) => `<div class="abs k r" data-i="3" style="left:160px;top:${y(i) + 22}px;width:24px">${i + 1}</div>
<div class="abs r" data-i="3" style="left:200px;top:${y(i)}px;width:690px;height:128px;border-radius:16px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);padding:18px 26px">
<div class="flex" style="gap:18px;height:44px"><span class="mono" style="font-size:28px;color:var(--ink)">${H.esc(t.name)}</span><span class="chip r" data-i="4" style="font-size:24px;padding:6px 16px">${H.esc(t.agent)}</span></div>
<div class="flex r" data-i="4" style="gap:14px;margin-top:8px"><span class="k">task</span><span class="s" style="font-size:24px">${H.esc(t.task)}</span></div></div>`;
    const lane = (t, i) => `<line class="draw" data-i="5" x1="892" y1="${cy(i)}" x2="${xs(i)}" y2="${cy(i)}" stroke-dasharray="8 8" stroke-opacity=".7"/>`;
    const bar = (t, i) => `<div class="abs r" data-i="5" style="left:${xs(i) - 13}px;top:${cy(i) - 13}px;width:26px;height:26px;border-radius:50%;background:var(--cyan);box-shadow:0 0 18px var(--cyan)"></div>
<i class="bx" data-i="6" style="position:absolute;left:${xs(i)}px;top:${cy(i) - 18}px;width:${xr - xs(i)}px;height:36px;border-radius:12px;background:linear-gradient(90deg,rgba(96,165,250,.8),rgba(96,165,250,.3))"></i>`;
    const tag = (t, i) => `<div class="abs k r" data-i="6" style="left:${xr - 156}px;top:${cy(i) - 56}px;width:156px;text-align:right">${H.esc(d.sub)}</div>`;
    const tick = (t, i) => `<line class="draw" data-i="8" x1="${xs(i)}" y1="436" x2="${xs(i)}" y2="${cy(i) - 20}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="4 8"/>`;
    const tnum = (t, i) => `<div class="abs k r" data-i="8" style="left:${xs(i) - 12}px;top:404px;width:24px;text-align:center;color:var(--ink)">${i + 1}</div>`;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:300px;width:800px;height:${y(n) + 70 - 300}px;padding:0"></div>
<div class="abs mono r" data-i="1" style="left:160px;top:322px;font-size:28px">${H.esc(d.call)}</div>
<div class="abs mono cy r" data-i="2" style="left:196px;top:372px;font-size:26px">${H.esc(d.context)}</div>
<div class="abs mono r" data-i="3" style="left:196px;top:420px;font-size:26px">${H.esc(d.list)}</div>
${T.map(entry).join('')}
<div class="abs mono r" data-i="7" style="left:160px;top:${y(n) + 4}px;font-size:28px;color:var(--pale3)">${H.esc(d.close)}</div>
${T.map(bar).join('')}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
${T.map(lane).join('')}${T.map(tick).join('')}
<line class="draw" data-i="7" x1="${xe}" y1="352" x2="${xe}" y2="${cy(n - 1) + 44}" stroke="#fbbf24" stroke-dasharray="10 8"/></svg>
<div class="abs k r" data-i="7" style="left:980px;top:318px">${H.esc(d.writer)}</div>
<i class="bx" data-i="7" style="position:absolute;left:980px;top:360px;width:${xe - 980}px;height:22px;border-radius:11px;background:rgba(251,191,36,.55)"></i>
<div class="abs mono am r" data-i="7" style="left:${xe + 16}px;top:352px;font-size:30px">${H.esc(d.close)}</div>
${T.map(tnum).join('')}${T.map(tag).join('')}`;
  },
};
