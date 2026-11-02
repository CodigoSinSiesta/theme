/* model-routes · vídeo 04 · el mismo modelo llega a Pi por dos caminos (proveedores) con límites distintos; lo que cambia, en fichas.
   Datos: kicker, title, model = { label, name }, target = { logo, name }, routes[2] = { logo, name, id, ctx, out }, labels[2] (contexto, salida),
   changesLabel, changes[] (2–4 fichas), limitsAt (índice de la ficha que resalta la salida), note. Pasos: 1 modelo y caminos, 2…n+1 una ficha, n+2 nota. */
TPL['model-routes'] = {
  def: {
    kicker: 'El camino importa', title: 'El mismo modelo, [[dos caminos]]',
    model: { label: 'el mismo modelo', name: 'deepseek-flash' },
    target: { logo: 'pi', name: 'Pi' },
    routes: [
      { logo: 'deepseek', name: 'DeepSeek · directo', id: 'deepseek-flash', ctx: '1M', out: '384K' },
      { logo: 'openrouter', name: 'OpenRouter', id: '~deepseek/deepseek-flash-latest', ctx: '1.0M', out: '943.7K' },
    ],
    labels: ['contexto', 'salida'],
    changesLabel: 'cambia', changes: ['el precio', 'los límites', 'quién ve tus datos', 'la fiabilidad'], limitsAt: 1,
    note: 'Elegir proveedor es tan importante [[como elegir modelo]].',
  },
  html(d, H) {
    const n = d.changes.length, ry = [320, 560], lim = d.limitsAt + 2;
    const route = (r, i) => `<div class="g r" data-i="1" style="left:620px;top:${ry[i]}px;width:680px;height:206px;padding:24px 30px">
<div class="flex" style="gap:18px">${H.ICO(r.logo, 52)}<span class="t" style="font-size:34px">${H.A(r.name)}</span></div>
<div class="mono" style="font-size:24px;color:var(--pale3);margin-top:12px">${H.esc(r.id)}</div>
<div class="flex" style="gap:40px;margin-top:12px;font:500 26px var(--mono)"><span>${H.esc(d.labels[0])} <b class="cy">${H.esc(r.ctx)}</b></span><span style="position:relative">${H.esc(d.labels[1])} <b class="cy">${H.esc(r.out)}</b><i class="r" data-i="${lim}" style="position:absolute;left:-12px;right:-12px;top:-8px;bottom:-8px;border:2.5px solid var(--amber);border-radius:10px"></i></span></div></div>`;
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="1" d="M500 540 C560 540 560 420 620 420"/><path class="draw" data-i="1" d="M500 540 C560 540 560 660 620 660"/>
<path class="draw" data-i="1" d="M1300 420 C1360 420 1360 540 1420 540"/><path class="draw" data-i="1" d="M1300 660 C1360 660 1360 540 1420 540"/></svg>
<div class="g lit r" data-i="1" style="left:120px;top:440px;width:380px;height:200px"><div class="flex" style="gap:14px">${H.GLYPH('cpu-chip', 40)}<span class="k">${H.A(d.model.label)}</span></div><div class="mono cy" style="font-size:32px;font-weight:700;margin-top:26px">${H.esc(d.model.name)}</div></div>
${d.routes.map(route).join('')}
<div class="g r flex" data-i="1" style="left:1420px;top:440px;width:380px;height:200px;gap:24px">${H.ICO(d.target.logo, 80)}<span class="t">${H.A(d.target.name)}</span></div>
<div class="g r" data-i="2" style="left:120px;top:810px;width:1680px;height:96px;padding:0 30px;display:flex;align-items:center;gap:20px"><span class="k am" style="margin-right:10px">${H.A(d.changesLabel)}</span>${d.changes.map((c, i) => `<span class="chip r" data-i="${i + 2}"${i + 2 === lim ? ' style="border-color:var(--amber);color:var(--amber)"' : ''}>${H.A(c)}</span>`).join('')}</div>
<div class="abs s r" data-i="${n + 2}" style="left:120px;top:928px;width:1680px;text-align:center;font-size:32px;color:var(--ink)">${H.A(d.note)}</div>`;
  },
};
