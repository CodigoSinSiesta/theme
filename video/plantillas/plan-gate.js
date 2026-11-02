/* plan-gate · cadena fija de 4 pasos: comando de plan → revisión por secciones (teclas) → aprobar → comando de ejecución.
   Datos: kicker, title, logo, plan, reviewLabel, keys[] = { k, t } (2–4 recomendado), approve, goal, goalText. */
TPL['plan-gate'] = {
  def: { kicker: 'Planificar', title: 'Primero el plan, [[luego el código]]', logo: 'omp', plan: '/plan', reviewLabel: 'revisión por secciones',
    keys: [{ k: 'a', t: 'aceptar' }, { k: 'e', t: 'editar' }, { k: 'd', t: 'descartar' }, { k: 'u', t: 'deshacer' }],
    approve: 'Aprobar', goal: '/goal', goalText: 'Ejecuta con presupuesto: pasos y coste máximos' },
  html(d, H) {
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4">
<line class="draw" data-i="2" x1="420" y1="600" x2="460" y2="600"/><line class="draw" data-i="3" x1="1020" y1="600" x2="1060" y2="600"/><line class="draw" data-i="4" x1="1340" y1="600" x2="1380" y2="600"/></svg>
<div class="g r flex" data-i="1" style="left:120px;top:480px;width:300px;height:240px;flex-direction:column;justify-content:center;gap:12px">${H.ICO(d.logo, 80)}<span class="mono cy" style="font-size:34px;font-weight:700">${H.esc(d.plan)}</span></div>
<div class="g r" data-i="2" style="left:460px;top:420px;width:560px;height:360px"><div class="k">${H.A(d.reviewLabel)}</div><div class="flex" style="flex-wrap:wrap;gap:16px;margin-top:30px">${d.keys.map(k => `<span><span class="kc" style="font-size:30px;padding:16px 26px">${H.esc(k.k)}</span> <span class="s" style="font-size:24px">${H.A(k.t)}</span></span>`).join('')}</div></div>
<div class="g r" data-i="3" style="left:1060px;top:480px;width:280px;height:240px;text-align:center;padding:70px 10px"><div class="t ok" style="font-size:38px">${H.A(d.approve)}</div></div>
<div class="g lit r" data-i="4" style="left:1380px;top:440px;width:420px;height:320px"><div class="mono cy" style="font-size:34px;font-weight:700">${H.esc(d.goal)}</div><div class="s" style="font-size:26px;margin-top:14px">${H.A(d.goalText)}</div></div>`;
  },
};
