/* trust-gate · vídeo 02 · la carpeta de configuración de un repositorio pasa una barrera de confianza antes de llegar al agente.
   Datos: kicker, title, repo = { k, dir, items[] (1–4) }, gate, agent = { logo, name }, yes[2] / no[2] (antes y después de la barrera),
   foot = { cmd, t, note }. Pasos: 1 repositorio, 2 barrera y carga con confianza, 3 sin confianza no pasa, 4 pie (desinstalar). */
TPL['trust-gate'] = {
  def: {
    kicker: 'Configuración del proyecto', title: 'La carpeta .pi/ [[espera tu confianza]]',
    repo: { k: 'repositorio clonado', dir: '.pi/', items: ['ajustes', 'extensiones', 'prompts'] },
    gate: '¿confías en el proyecto?',
    agent: { logo: 'pi', name: 'Tu agente' },
    yes: ['confías', 'se carga'], no: ['no confías', 'no se carga'],
    foot: { cmd: 'desinstalar Pi', t: 'no borra ~/.pi/agent', note: 'para empezar de cero, bórralo tú' },
  },
  html(d, H) {
    const chips = (x, i) => d.repo.items.map((t, k) => `<div class="abs${i ? ' r' : ''}"${i ? ` data-i="${i}"` : ''} style="left:${x}px;top:${490 + k * 66}px"><span class="chip">${H.esc(t)}</span></div>`).join('');
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:330px;width:560px;height:420px"><div class="k">${H.A(d.repo.k)}</div><div class="mono cy" style="font-size:46px;font-weight:700;margin-top:16px">${H.esc(d.repo.dir)}</div></div>
<div class="r" data-i="1">${chips(160, 0)}</div>
<div class="abs r" data-i="2" style="left:998px;top:390px;width:4px;height:360px;background:repeating-linear-gradient(var(--amber) 0 16px, transparent 16px 28px)"></div>
<div class="abs k am r" data-i="2" style="left:760px;top:334px;width:480px;text-align:center">${H.A(d.gate)}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke-width="4">
<path class="draw" data-i="2" d="M690 470 H1330" stroke="#34d399"/><path class="draw" data-i="3" d="M690 660 H975" stroke="#f87171"/></svg>
<div class="abs s ok r" data-i="2" style="left:720px;top:412px;font-size:28px">${H.A(d.yes[0])}</div>
<div class="abs s ok r" data-i="2" style="left:1030px;top:412px;font-size:28px">${H.A(d.yes[1])}</div>
<div class="abs s bad r" data-i="3" style="left:720px;top:602px;font-size:28px">${H.A(d.no[0])}</div>
<div class="abs t bad r" data-i="3" style="left:978px;top:626px;font-size:48px;line-height:60px">✕</div>
<div class="abs s bad r" data-i="3" style="left:1030px;top:632px;font-size:28px">${H.A(d.no[1])}</div>
<div class="g lit r" data-i="2" style="left:1340px;top:330px;width:460px;height:420px"><div class="flex" style="gap:22px">${H.ICO(d.agent.logo, 72)}<span class="t" style="font-size:38px">${H.A(d.agent.name)}</span></div></div>
${chips(1380, 2)}
<div class="g r flex" data-i="4" style="left:120px;top:810px;width:1680px;height:120px;gap:28px"><span class="mono am" style="font-size:30px">${H.A(d.foot.cmd)}</span><span class="s" style="color:var(--ink)">${H.A(d.foot.t)}</span><span class="s" style="font-size:28px;margin-left:auto">${H.A(d.foot.note)}</span></div>`;
  },
};
