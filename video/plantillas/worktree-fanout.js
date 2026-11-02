/* worktree-fanout · tarea → herramienta → 2–4 clones en paralelo → resultado fusionado (curvas calculadas).
   Datos: kicker, title, logo, cmd, task, tool (logo), toolLabel, clones[] (nombres), merge, mergeSub. */
TPL['worktree-fanout'] = {
  def: { kicker: 'Paralelo', title: 'Tres clones, [[una tarea]]', logo: 'omp', cmd: '/tan', task: 'una tarea', tool: 'git', toolLabel: 'worktrees',
    clones: ['wt-a', 'wt-b', 'wt-c'], merge: 'Fusionar y revisar', mergeSub: 'resultado único' },
  html(d, H) {
    const n = d.clones.length, big = n <= 3, pitch = big ? 155 : 130, h = big ? 150 : 115, cy0 = 590;
    const cys = d.clones.map((_, i) => cy0 + (i - (n - 1) / 2) * pitch);
    const near = y => Math.abs(y - cy0) < 1;
    const paths = '<line class="draw" data-i="2" x1="500" y1="590" x2="560" y2="590"/>'
      + cys.map(y => near(y) ? '<line class="draw" data-i="3" x1="660" y1="590" x2="800" y2="590"/>' : `<path class="draw" data-i="3" d="M660 590 C730 590 730 ${y} 800 ${y}"/>`).join('')
      + cys.map(y => near(y) ? '<line class="draw" data-i="4" x1="1220" y1="590" x2="1400" y2="590"/>' : `<path class="draw" data-i="4" d="M1220 ${y} C1310 ${y} 1310 590 1400 590"/>`).join('');
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${paths}</svg>
<div class="g r flex" data-i="1" style="left:120px;top:480px;width:380px;height:220px;flex-direction:column;justify-content:center;gap:10px">${H.ICO(d.logo, 80)}<span class="mono cy" style="font-size:30px">${H.esc(d.cmd)}</span><span class="s" style="font-size:24px">${H.A(d.task)}</span></div>
<div class="abs flex r" data-i="2" style="left:560px;top:540px;flex-direction:column;gap:8px">${H.ICO(d.tool, 100)}<span class="k" style="font-size:16px">${H.A(d.toolLabel)}</span></div>
${d.clones.map((c, i) => `<div class="g r flex" data-i="3" style="left:800px;top:${cys[i] - h / 2}px;width:420px;height:${h}px;padding:0 30px;gap:24px">${H.GLYPH('sub', 52)}<span class="mono t" style="font-size:32px">${H.esc(c)}</span></div>`).join('\n')}
<div class="g lit r" data-i="4" style="left:1400px;top:480px;width:400px;height:220px;text-align:center;padding:50px 20px"><div class="t" style="font-size:36px">${H.A(d.merge)}</div><div class="k" style="margin-top:14px">${H.A(d.mergeSub)}</div></div>`;
  },
};
