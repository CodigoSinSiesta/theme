/* setting-landing · vídeo 11 · dónde cae cada escritura de ajustes: el panel en el perfil, el fichero del proyecto (que solo
   se busca en la carpeta de arranque, no en las superiores) y --config, que vale una ejecución y no se guarda. Datos: kicker, title,
   panel / hand / once = { k, src, dest, path? , note? }, root, sub, okNote, noNote. Fijo: tres filas. Pasos: 1 panel, 2 a mano,
   3 arranque en la raíz, 4 arranque en una subcarpeta, 5 --config, 6 no se guarda. */
TPL['setting-landing'] = {
  def: {
    kicker: 'Dónde se escribe un ajuste', title: 'Cada escritura [[cae en su sitio]]',
    panel: { k: 'el panel', src: '/settings', dest: 'global · tu perfil', path: '~/.omp/profiles/demo/agent/config.yml' },
    hand: { k: 'a mano', src: 'Ajustes solo para un repositorio', dest: 'proyecto · en la raíz', path: 'tienda/.omp/config.yml' },
    root: 'tienda $ omp', sub: 'tienda/src $ omp', okNote: 'lo lee', noNote: 'no sube a buscarlo',
    once: { k: 'una ejecución', src: '--config fichero', dest: 'solo esta ejecución', note: 'no se guarda nunca' },
  },
  html(d, H) {
    const xs = 120, ws = 440, xd = 660, wd = 1140;
    const arrow = (y, i) => `<path class="draw" data-i="${i}" d="M${xs + ws + 8} ${y} L${xd - 8} ${y}"/><path class="draw" data-i="${i}" d="M${xd - 22} ${y - 11} L${xd - 8} ${y} L${xd - 22} ${y + 11}"/>`;
    const term = (y, i, cmd, ok, note) => `<div class="abs flex r" data-i="${i}" style="left:${xd + 34}px;top:${y}px;width:${wd - 68}px;height:72px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid ${ok ? 'var(--line)' : 'rgba(248,113,113,.55)'};padding:0 24px;gap:18px">
<span class="mono" style="font-size:28px;width:420px;white-space:pre">${H.esc(cmd)}</span>${H.GLYPH(ok ? 'check-circle' : 'x-circle', 32, ok ? 'ok' : 'bad')}<span class="s ${ok ? 'ok' : 'bad'}" style="font-size:28px">${H.esc(note)}</span></div>`;
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${arrow(390, 1)}${arrow(560, 2)}${arrow(905, 5)}</svg>
<div class="g r" data-i="1" style="left:${xs}px;top:320px;width:${ws}px;height:140px"><div class="k">${H.esc(d.panel.k)}</div><div class="mono cy" style="font-size:36px;margin-top:14px">${H.esc(d.panel.src)}</div></div>
<div class="g lit r" data-i="1" style="left:${xd}px;top:320px;width:${wd}px;height:140px"><div class="k cy">${H.esc(d.panel.dest)}</div><div class="mono" style="font-size:30px;margin-top:14px">${H.esc(d.panel.path)}</div></div>
<div class="g r" data-i="2" style="left:${xs}px;top:490px;width:${ws}px;height:310px"><div class="k">${H.esc(d.hand.k)}</div><div class="s" style="margin-top:14px">${H.A(d.hand.src)}</div></div>
<div class="g r" data-i="2" style="left:${xd}px;top:490px;width:${wd}px;height:310px"><div class="k">${H.esc(d.hand.dest)}</div><div class="mono" style="font-size:30px;margin-top:14px">${H.esc(d.hand.path)}</div></div>
${term(620, 3, d.root, true, d.okNote)}
${term(708, 4, d.sub, false, d.noNote)}
<div class="g r" data-i="5" style="left:${xs}px;top:830px;width:${ws}px;height:150px"><div class="k">${H.esc(d.once.k)}</div><div class="mono cy" style="font-size:32px;margin-top:14px">${H.esc(d.once.src)}</div></div>
<div class="g r" data-i="5" style="left:${xd}px;top:830px;width:${wd}px;height:150px;border-style:dashed"><div class="k">${H.esc(d.once.dest)}</div>
<div class="flex r" data-i="6" style="gap:16px;margin-top:18px">${H.GLYPH('x-circle', 34, 'am')}<span class="s am">${H.A(d.once.note)}</span></div></div>`;
  },
};
