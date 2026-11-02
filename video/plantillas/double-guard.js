/* double-guard · vídeo 19 · dos caminos hacia un fichero protegido, cada uno con su capa: la herramienta de edición
   choca con el hook y el atajo por bash cae en la política, que abre el diálogo. Datos: kicker, title, model, file = { name, note },
   edit = { tool, guard = { label, name }, result }, bash = { tool, guard = { label, name, note }, dialog = { label, text } }, layers,
   tags[2]. Pasos: 1 edición bloqueada, 2 atajo por bash, 3 política, 4 diálogo, 5 dos capas, 6 capa del hook, 7 capa de bash. */
TPL['double-guard'] = {
  def: {
    kicker: 'Dos capas', title: 'Una para cada [[camino]]',
    model: 'Pro', file: { name: 'AGENTS.md', note: 'protegido' },
    edit: { tool: 'edit', guard: { label: 'hook pre', name: 'rutas-protegidas.ts' }, result: 'block: true' },
    bash: { tool: 'bash · sed / echo', guard: { label: 'política', name: 'bash: prompt', note: 'sin patrón allow' }, dialog: { label: 'diálogo', text: 'Approve / Deny' } },
    layers: 'hacen falta las dos', tags: ['capa 1', 'capa 2'],
  },
  html(d, H) {
    const chip = (x, y, w, t, i) => `<div class="abs r" data-i="${i}" style="left:${x}px;top:${y}px;width:${w}px;text-align:center"><span class="chip" style="display:block">${H.esc(t)}</span></div>`;
    const ring = (y, i, tag) => `<div class="abs r" data-i="${i}" style="left:800px;top:${y}px;width:400px;height:180px;border-radius:22px;border:3px solid var(--cyan);box-shadow:0 0 40px rgba(96,165,250,.5)"></div><div class="abs k cy r" data-i="${i}" style="left:1040px;top:${y + 30}px;width:136px;text-align:right">${H.esc(tag)}</div>`;
    const head = (glyph, tone, label) => `<div class="flex" style="gap:12px">${H.GLYPH(glyph, 30, tone)}<span class="k">${H.esc(label)}</span></div>`;
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="1" d="M360 600 C420 600 400 420 460 420"/><line class="draw" data-i="1" x1="720" y1="420" x2="800" y2="420"/>
<line class="draw" data-i="1" x1="1200" y1="420" x2="1296" y2="420" stroke="#f87171"/>
<path class="draw" data-i="2" d="M360 660 C420 660 400 840 440 840"/><line class="draw" data-i="3" x1="760" y1="840" x2="800" y2="840"/>
<line class="draw" data-i="4" x1="1200" y1="840" x2="1230" y2="840" stroke="#fbbf24"/>
<path class="draw" data-i="4" d="M1520 840 C1545 840 1535 690 1560 690" stroke="#fbbf24"/>
<line class="draw" data-i="5" x1="1000" y1="520" x2="1000" y2="740" stroke-width="4"/></svg>
<div class="g r flex" data-i="1" style="left:120px;top:540px;width:240px;height:180px;flex-direction:column;justify-content:center;gap:12px;padding:0">${H.GLYPH('cpu-chip', 52)}<span class="t" style="font-size:34px">${H.esc(d.model)}</span></div>
<div class="g r flex" data-i="1" style="left:1560px;top:540px;width:240px;height:180px;flex-direction:column;justify-content:center;gap:10px;padding:0">${H.GLYPH('document-text', 52)}<span class="mono" style="font-size:26px">${H.esc(d.file.name)}</span><span class="k bad">${H.esc(d.file.note)}</span></div>
${chip(460, 388, 260, d.edit.tool, 1)}
<div class="g r" data-i="1" style="left:800px;top:330px;width:400px;height:180px">${head('lock-closed', 'cy', d.edit.guard.label)}<div class="mono" style="font-size:26px;margin-top:24px">${H.esc(d.edit.guard.name)}</div></div>
<div class="abs r" data-i="1" style="left:1298px;top:392px">${H.GLYPH('x-circle', 56, 'bad')}</div>
<div class="abs mono bad r" data-i="1" style="left:1196px;top:464px;width:264px;text-align:center;font-size:24px">${H.esc(d.edit.result)}</div>
${chip(440, 808, 320, d.bash.tool, 2)}
<div class="g r" data-i="3" style="left:800px;top:750px;width:400px;height:180px">${head('hand-raised', 'am', d.bash.guard.label)}<div class="mono" style="font-size:26px;margin-top:14px">${H.esc(d.bash.guard.name)}</div><div class="s" style="font-size:24px;margin-top:4px">${H.A(d.bash.guard.note)}</div></div>
<div class="abs r" data-i="4" style="left:1230px;top:780px;width:290px;height:120px;border-radius:14px;background:rgba(15,23,42,.6);border:2px solid var(--amber);padding:22px 26px"><div class="k am">${H.esc(d.bash.dialog.label)}</div><div class="mono" style="font-size:24px;margin-top:8px">${H.esc(d.bash.dialog.text)}</div></div>
<div class="abs r" data-i="5" style="left:820px;top:604px;width:360px;text-align:center"><span class="pill" style="background:rgba(15,23,42,.95);color:var(--cyan);border-color:var(--cyan)">${H.esc(d.layers)}</span></div>
${ring(330, 6, d.tags[0])}${ring(750, 7, d.tags[1])}`;
  },
};
