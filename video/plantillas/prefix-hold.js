/* prefix-hold · vídeo 03 · el mensaje de sistema entero en la 1.ª petición; un cambio posterior va al final como diferencia y
   el principio, el que está en caché, no se toca. Datos: kicker, title, file, sys = { label, prompt, tools[] }, msgs[] (2), change,
   diff = { label, text }, req = { label, head, tail }, hold, cache. Pasos: 1 mensaje de sistema, 2 secciones, 3 herramientas,
   4 un cambio después, 5 solo la diferencia, 6 el principio no se toca, 7 en caché. */
TPL['prefix-hold'] = {
  def: {
    kicker: 'Todo queda guardado', title: 'Lo nuevo, al final: [[el principio no se toca]]',
    file: 'fichero de sesión',
    sys: { label: 'mensaje de sistema · 1.ª petición', prompt: 'secciones del prompt', tools: ['read', 'bash', 'edit', 'write'] },
    msgs: ['mensaje', 'respuesta'], change: 'activas una herramienta',
    diff: { label: 'solo la diferencia', text: '+ 1 herramienta' },
    req: { label: 'la petición siguiente', head: 'principio de la conversación', tail: 'la diferencia' },
    hold: 'no se toca', cache: 'en caché del proveedor',
  },
  html(d, H) {
    const box = (x, y, w, h, extra = '') => `left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:14px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);padding:24px 26px;${extra}`;
    const bar = (w, i, c = 'rgba(96,165,250,.45)') => `<i class="bx" data-i="${i}" style="display:inline-block;width:${w}px;height:16px;border-radius:6px;background:${c};margin-right:10px"></i>`;
    const msgs = d.msgs.map((m, j) => `<div class="abs r" data-i="4" style="${box(890 + j * 220, 372, 200, 236)}"><div class="k">${H.esc(m)}</div>
<i style="display:block;height:14px;border-radius:6px;background:rgba(96,165,250,.35);margin-top:22px;width:100%"></i><i style="display:block;height:14px;border-radius:6px;background:rgba(96,165,250,.35);margin-top:12px;width:70%"></i></div>`).join('');
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:300px;width:1680px;height:336px;padding:20px 30px"><div class="k">${H.esc(d.file)}</div></div>
<div class="abs r" data-i="1" style="${box(150, 372, 710, 236)}"><div class="k cy">${H.esc(d.sys.label)}</div>
<div class="r" data-i="2" style="margin-top:26px"><div class="s" style="font-size:24px">${H.esc(d.sys.prompt)}</div><div style="margin-top:10px">${bar(170, 2)}${bar(220, 2)}${bar(130, 2)}</div></div>
<div class="r flex" data-i="3" style="margin-top:22px;gap:10px">${d.sys.tools.map(t => `<span class="chip" style="font-size:24px;padding:6px 16px">${H.esc(t)}</span>`).join('')}</div></div>
${msgs}
<div class="abs r" data-i="4" style="${box(1330, 372, 440, 236, 'border:2px solid var(--amber)')}"><div class="flex" style="gap:14px"><span class="tog yes"></span><span class="s" style="font-size:24px;line-height:1.25">${H.esc(d.change)}</span></div>
<div class="r" data-i="5" style="margin-top:26px"><div class="k am">${H.esc(d.diff.label)}</div><div class="mono am" style="font-size:28px;margin-top:10px">${H.esc(d.diff.text)}</div></div></div>
<div class="g r" data-i="6" style="left:120px;top:660px;width:1680px;height:322px;padding:20px 30px"><div class="k">${H.esc(d.req.label)}</div></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="6" d="M152 770 V752 H1298 V770"/></svg>
<div class="abs r" data-i="6" style="left:575px;top:722px;width:300px;text-align:center"><span class="pill" style="display:inline-flex;align-items:center;gap:10px;background:rgba(15,23,42,.95);font-size:24px;padding:6px 20px">${H.GLYPH('lock-closed', 26)}<span>${H.esc(d.hold)}</span></span></div>
<div class="abs r flex" data-i="6" style="${box(150, 784, 1150, 92, 'border:2px solid var(--cyan);padding:0 26px')}"><span class="s" style="font-size:26px;color:var(--ink)">${H.esc(d.req.head)}</span></div>
<div class="abs r flex" data-i="6" style="${box(1330, 784, 440, 92, 'border:2px dashed var(--amber);padding:0 26px')}"><span class="s am" style="font-size:26px">${H.esc(d.req.tail)}</span></div>
<div class="abs r flex" data-i="7" style="left:150px;top:900px;gap:14px">${H.GLYPH('check-circle', 40, 'ok')}<span class="s ok" style="font-size:28px">${H.esc(d.cache)}</span></div>`;
  },
};
