/* reload-teardown · vídeo 09 · /reload no actualiza en caliente: tira el entorno de extensiones con sus variables y crea uno nuevo
   desde cero. Datos: kicker, title, old / fresh = { k, file }, vars[] = { name, before, after } (2–4), action, gone, keep. Pasos: 1 entorno
   viejo, 2 /reload y derribo, 3 entorno nuevo, 4 «desaparece con él», 5 nota de qué hacer. */
TPL['reload-teardown'] = {
  def: {
    kicker: 'Barra reload', title: 'Tira el entorno [[y lo vuelve a crear]]',
    old: { k: 'entorno de extensiones', file: 'permisos.ts · factoría' },
    fresh: { k: 'entorno nuevo', file: 'permisos.ts · factoría' },
    vars: [
      { name: 'siempre', before: '{ edit README.md }', after: '{ }' },
      { name: 'aprobadas', before: '1', after: '0' },
      { name: 'bloqueadas', before: '0', after: '0' },
    ],
    action: '/reload', gone: 'desaparece con él',
    keep: 'Si algo tiene que sobrevivir, guárdalo [[fuera de la memoria del proceso]]',
  },
  html(d, H) {
    const n = d.vars.length, rowH = 84, vTop = 466;
    const rows = (key, cls, step) => d.vars.map((v, i) => `<div class="abs flex" style="left:0;top:${i * rowH}px;width:560px;height:72px;padding:0 24px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);justify-content:space-between">
<span class="mono" style="font-size:28px;color:var(--pale)">${H.esc(v.name)}</span><span class="mono ${cls}" style="font-size:28px">${H.esc(v[key])}</span></div>`).join('');
    const ph = 166 + n * rowH;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:640px;height:${ph}px"><div class="k">${H.A(d.old.k)}</div><div class="mono cy" style="font-size:26px;margin-top:22px">${H.esc(d.old.file)}</div></div>
<div class="abs r" data-i="1" style="left:160px;top:${vTop}px;width:560px;height:${n * rowH}px">${rows('before', '', 1)}</div>
<div class="abs r" data-i="2" style="left:120px;top:320px;width:640px;height:${ph}px;border-radius:22px;background:rgba(2,6,23,.5);border:3px solid var(--red)"></div>
<div class="abs r" data-i="2" style="left:680px;top:300px;width:64px;height:64px;border-radius:50%;background:var(--red);display:grid;place-items:center"><span class="t" style="font-size:36px;line-height:1;color:#0f172a">✕</span></div>
<div class="abs r" data-i="2" style="left:800px;top:${320 + ph / 2 - 40}px;width:320px;text-align:center"><span class="pill" style="font-size:30px;color:var(--ink);border-color:var(--cyan)">${H.esc(d.action)}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3"><path class="draw" data-i="3" d="M790 ${320 + ph / 2 + 60} H1140"/><path class="draw" data-i="3" d="M1124 ${320 + ph / 2 + 48} L1140 ${320 + ph / 2 + 60} L1124 ${320 + ph / 2 + 72}"/></svg>
<div class="g lit r" data-i="3" style="left:1160px;top:320px;width:640px;height:${ph}px"><div class="k cy">${H.A(d.fresh.k)}</div><div class="mono cy" style="font-size:26px;margin-top:22px">${H.esc(d.fresh.file)}</div></div>
<div class="abs r" data-i="3" style="left:1200px;top:${vTop}px;width:560px;height:${n * rowH}px">${rows('after', 'bad', 3)}</div>
<div class="abs r" data-i="4" style="left:120px;top:${320 + ph + 14}px;width:640px;text-align:center"><span class="mono bad" style="font-size:26px">${H.A(d.gone)}</span></div>
<div class="g r" data-i="5" style="left:120px;top:${Math.max(320 + ph + 70, 860)}px;width:1680px;height:96px;padding:0 34px;display:flex;align-items:center;gap:20px">${H.GLYPH('circle-stack', 44)}<span class="s" style="font-size:30px;color:var(--ink)">${H.A(d.keep)}</span></div>`;
  },
};
