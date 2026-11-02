/* conversation-vs-disk · vídeo 03 · moverse en el árbol de la conversación no deshace lo que hay en el disco.
   Datos: kicker, title, conv = { k, nodes[] (3–5), from, to (índices: hoja antes y después), cmd, left }, disk = { k, file, state, undo, note }.
   Pasos: 1 los dos carriles, 2 la hoja salta con el comando y la rama queda atrás, 3 no se deshace en disco, 4 el fichero sigue igual. */
TPL['conversation-vs-disk'] = {
  def: {
    kicker: 'Aviso', title: '/tree mueve la conversación, [[no tus ficheros]]',
    conv: { k: 'árbol de Pi · la conversación', nodes: ['función de IVA', 'opción A: IVA antes del envío', 'edita carrito.js', 'diez pruebas pasan'], from: 3, to: 0, cmd: '/tree', left: 'rama que dejas' },
    disk: { k: 'disco · tus ficheros', file: 'src/carrito.js', state: 'con la opción A', undo: 'Pi no deshace', note: 'el código sigue como estaba' },
  },
  html(d, H) {
    const C = d.conv, n = C.nodes.length, x = i => Math.round(n > 1 ? 300 + i * (1320 / (n - 1)) : 960), y = 450;
    const lw = Math.min(340, Math.round(1320 / Math.max(1, n - 1)) - 30);
    const nodes = C.nodes.map((t, i) => `<div class="nd" style="left:${x(i)}px;top:${y}px"></div><div class="abs s" style="left:${x(i) - lw / 2}px;top:${y + 44}px;width:${lw}px;text-align:center;font-size:24px;line-height:1.25">${H.A(t)}</div>`).join('');
    const a = Math.min(C.from, C.to), b = Math.max(C.from, C.to);
    const dim = C.to < C.from ? `<div class="abs r" data-i="2" style="left:${x(C.to + 1) - lw / 2 - 10}px;top:${y - 44}px;width:${x(C.from) - x(C.to + 1) + lw + 20}px;height:184px;border:2px dashed var(--line);border-radius:18px;background:rgba(15,23,42,.55)"><span class="k" style="position:absolute;right:28px;bottom:22px">${H.A(C.left)}</span></div>` : '';
    const mid = (x(a) + x(b)) / 2;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:1680px;height:300px"><div class="k cy">${H.A(C.k)}</div></div>
<div class="r" data-i="1"><svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="rgba(96,165,250,.45)" stroke-width="3"><path d="M${x(0)} ${y} H${x(n - 1)}"/></svg>${nodes}</div>
${dim}
<div class="nd lit r" data-i="1" data-off="2" style="left:${x(C.from)}px;top:${y}px"></div>
<div class="nd lit r" data-i="2" style="left:${x(C.to)}px;top:${y}px"></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="2" d="M${x(C.from)} ${y - 34} C${x(C.from)} ${y - 80} ${x(C.to)} ${y - 80} ${x(C.to)} ${y - 36}"/>
<path class="draw" data-i="3" d="M${x(C.to)} 572 V760" stroke="#f87171"/></svg>
<div class="abs r" data-i="2" style="left:${mid - 80}px;top:${y - 100}px;width:160px;text-align:center"><span class="chip" style="border-color:var(--cyan);background:#16264a">${H.esc(C.cmd)}</span></div>
<div class="g r" data-i="1" style="left:120px;top:680px;width:1680px;height:260px"><div class="k am">${H.A(d.disk.k)}</div></div>
<div class="abs r flex" data-i="1" style="left:${x(C.to) - 60}px;top:770px;gap:24px"><span class="chip" style="font-size:30px">${H.esc(d.disk.file)}</span><span class="pill" style="color:var(--amber);border-color:var(--amber)">${H.A(d.disk.state)}</span></div>
<div class="abs t bad r" data-i="3" style="left:${x(C.to) - 16}px;top:614px;font-size:48px;line-height:60px">✕</div>
<div class="abs k bad r" data-i="3" style="left:${x(C.to) + 40}px;top:632px">${H.A(d.disk.undo)}</div>
<div class="abs r" data-i="4" style="left:${x(C.to) - 72}px;top:756px;width:${Math.min(660, 1700 - x(C.to))}px;height:92px;border:3px solid var(--amber);border-radius:16px;box-shadow:0 0 30px rgba(251,191,36,.35)"></div>
<div class="abs s r" data-i="4" style="left:${x(C.to) - 60}px;top:872px;color:var(--ink)">${H.A(d.disk.note)}</div>`;
  },
};
