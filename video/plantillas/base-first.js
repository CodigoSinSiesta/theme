/* base-first · vídeo 23 · un script de arranque compartido y su regla: si la verificación de base falla al empezar,
   primero se arregla eso y no se apila trabajo nuevo encima; el mismo script lo usan varios. Datos: kicker, title,
   init = { cmd, t }, base = { k, cmd, res }, fix, work = { t, no }, users[3]. Pasos: 1 script, 2 la base falla, 3 primero eso,
   4 no se apila, 5–7 quién lo usa. */
TPL['base-first'] = {
  def: {
    kicker: 'init.sh · la regla de la plantilla', title: 'Si la base falla, [[primero eso]]',
    init: { cmd: './init.sh', t: 'el arranque deja de depender de la memoria de nadie' },
    base: { k: 'verificación de base', cmd: 'npm test', res: 'falla' },
    fix: 'primero se arregla eso',
    work: { t: 'trabajo nuevo', no: 'no se apila encima de un punto roto' },
    users: ['tú', 'el agente de mañana', 'la integración continua'],
  },
  html(d, H) {
    const uy = i => 360 + i * 160;
    const users = d.users.map((u, i) => `<div class="g r flex" data-i="${5 + i}" style="left:120px;top:${uy(i)}px;width:400px;height:120px;padding:0 30px"><span class="s" style="color:var(--ink)">${H.esc(u)}</span></div>`).join('');
    const ghost = (y, i) => `<div class="abs r flex" data-i="4" style="left:1240px;top:${y}px;width:560px;height:110px;border-radius:14px;border:2px dashed rgba(248,113,113,.6);background:rgba(15,23,42,.35);padding:0 30px;justify-content:space-between"><span class="s" style="color:var(--pale3);text-decoration:line-through;text-decoration-color:var(--red)">${H.esc(d.work.t)}</span><span style="flex:none">${H.GLYPH('x-circle', 36, 'bad')}</span></div>`;
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
${d.users.map((u, i) => `<path class="draw" data-i="${5 + i}" d="M522 ${uy(i) + 60} C566 ${uy(i) + 60} 560 540 618 540"/>`).join('')}
<path class="draw" data-i="2" d="M1142 600 C1200 600 1190 865 1238 865" stroke="#f87171"/>
<line class="draw" data-i="3" x1="1142" y1="865" x2="1236" y2="865" stroke="#fbbf24"/></svg>
<div class="g lit r" data-i="1" style="left:620px;top:420px;width:520px;height:240px"><div class="flex" style="gap:18px">${H.GLYPH('command-line', 48)}<span class="mono cy" style="font-size:38px">${H.esc(d.init.cmd)}</span></div><div class="s" style="font-size:28px;margin-top:22px">${H.A(d.init.t)}</div></div>
<div class="g r flex" data-i="3" style="left:620px;top:780px;width:520px;height:170px;border-color:var(--amber);gap:20px"><span style="flex:none">${H.GLYPH('wrench', 48, 'am')}</span><span class="t am" style="font-size:36px">${H.esc(d.fix)}</span></div>
<div class="abs flex r" data-i="4" style="left:1240px;top:476px;gap:12px"><span class="s bad" style="font-size:26px">${H.esc(d.work.no)}</span></div>
${ghost(540)}${ghost(670)}
<div class="g r" data-i="2" style="left:1240px;top:800px;width:560px;height:150px;border:2.5px solid var(--red);background:rgba(248,113,113,.10)"><div class="k bad">${H.esc(d.base.k)}</div><div class="flex" style="gap:16px;margin-top:16px"><span class="mono" style="font-size:30px">${H.esc(d.base.cmd)}</span><span style="flex:none">${H.GLYPH('x-circle', 34, 'bad')}</span><span class="s bad" style="font-size:28px">${H.esc(d.base.res)}</span></div></div>
${users}`;
  },
};
