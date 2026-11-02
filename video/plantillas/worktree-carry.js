/* worktree-carry · vídeo 18 · /wt copia los cambios y deja el origen; con worktree.cleanSource el origen se limpia y se pierde.
   Datos: kicker, title, from / to = { path, branch }, file, copy, setting, cmds[] (1–2), lost, advice.
   Pasos: 1 ajuste encendido, 2 origen marcado, 3 comandos, 4 se pierde, 5 consejo y ajuste apagado. */
TPL['worktree-carry'] = {
  def: {
    kicker: 'Cuidado', title: 'Limpiar el origen [[borra lo no commiteado]]',
    from: { path: '~/csn/tienda', branch: 'demo-18' }, to: { path: '~/.omp/profiles/demo/wt/demo-18-wt-6d997e8', branch: 'demo-18-wt' },
    file: 'M README.md', copy: 'copia', setting: 'worktree.cleanSource',
    cmds: ['git reset --hard', 'git clean'], lost: 'lo no commiteado se pierde', advice: 'déjalo apagado',
  },
  html(d, H) {
    const panel = (x, P, lbl, extra, i) => `<div class="g${i ? ' r' : ''}"${i ? ` data-i="${i}"` : ''} style="left:${x}px;top:480px;width:780px;height:400px;${extra}"><div class="flex" style="gap:16px">${H.GLYPH('folder', 40)}<span class="k">${H.esc(lbl)}</span></div>
<div class="mono" style="font-size:26px;margin-top:22px">${H.esc(P.path)}</div><div class="mono cy" style="font-size:24px;margin-top:10px">${H.esc(P.branch)}</div></div>`;
    const fileRow = x => `<div class="abs" style="left:${x + 34}px;top:694px;width:712px;height:76px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);display:flex;align-items:center;padding:0 24px"><span class="mono am" style="font-size:28px">${H.esc(d.file)}</span></div>`;
    return `${H.HEAD(d)}
<div class="abs flex r" data-i="1" data-off="5" style="left:560px;top:340px;width:800px;justify-content:center;gap:22px"><span class="mono" style="font-size:30px">${H.esc(d.setting)}</span><i class="tog yes" style="display:block"></i></div>
<div class="abs flex r" data-i="5" style="left:560px;top:340px;width:800px;justify-content:center;gap:22px"><span class="mono" style="font-size:30px">${H.esc(d.setting)}</span><i class="tog" style="display:block"></i><span class="pill" style="color:var(--ok);border-color:var(--ok)">${H.esc(d.advice)}</span></div>
${panel(120, d.from, 'origen')}
<div class="abs r" data-i="2" style="left:120px;top:480px;width:780px;height:400px;border:3px solid var(--red);border-radius:22px;box-shadow:0 0 30px rgba(248,113,113,.3)"></div>
${panel(1020, d.to, 'worktree')}
${fileRow(120)}${fileRow(1020)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3"><path d="M900 732 H1020" stroke-dasharray="10 8"/></svg>
<div class="abs k" style="left:900px;top:690px;width:120px;text-align:center">${H.esc(d.copy)}</div>
<div class="abs flex r" data-i="3" style="left:154px;top:796px;gap:14px">${d.cmds.map(c => `<span class="chip" style="color:var(--red);border-color:var(--red)">${H.esc(c)}</span>`).join('')}</div>
<div class="abs bx" data-i="4" style="left:174px;top:730px;width:672px;height:4px;background:var(--red);border-radius:2px"></div>
<div class="abs flex r" data-i="4" style="left:120px;top:910px;width:780px;justify-content:center;gap:14px">${H.GLYPH('exclamation-triangle', 36, 'bad')}<span class="s bad" style="font-size:28px">${H.esc(d.lost)}</span></div>`;
  },
};
