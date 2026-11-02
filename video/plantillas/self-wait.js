/* self-wait · vídeo 08 · por qué algunas operaciones de ctx son solo para comandos: llamadas desde un evento, Pi se espera a sí
   mismo; la salida es encolar el comando y que Pi lo ejecute al quedar libre. Datos: kicker, title, cmd / evt = { k }, ops[] (2–4),
   lock = { k, a, b, ea, eb, tag }, fix = { k, from, queue, item, to }. Pasos: 1 los dos ctx, uno por operación (2…n+1), n+2 bloqueo,
   n+3 encolar, n+4 Pi libre lo ejecuta. Iconos: check-circle / x-circle (puede o no), queue-list (la cola). */
TPL['self-wait'] = {
  def: {
    kicker: '2 · No todos los contextos son iguales', title: 'Desde un evento, [[Pi se esperaría a sí mismo]]',
    cmd: { k: 'ctx de un comando' }, evt: { k: 'ctx de un evento o herramienta' },
    ops: ['esperar a que el agente termine', 'recargar', 'navegar por el árbol', 'cambiar de sesión'],
    lock: { k: 'si se llamaran desde un evento', a: 'Pi', b: 'tu handler', ea: 'espera al handler', eb: 'espera a que Pi termine', tag: 'bloqueo' },
    fix: { k: 'la solución de reload-runtime.ts', from: 'herramienta', queue: 'cola', item: '/reload', to: 'Pi, libre' },
  },
  html(d, H) {
    const n = d.ops.length, rowH = 70, gap = 8, top = 300, panH = 76 + n * (rowH + gap) + 14;
    const row = (x, k, t, yes) => `<div class="abs r" data-i="${k + 2}" style="left:${x + 28}px;top:${top + 72 + k * (rowH + gap)}px;width:744px;height:${rowH}px;border-radius:12px;background:rgba(15,23,42,.55);border:1.5px solid ${yes ? 'var(--line)' : 'rgba(248,113,113,.35)'};display:flex;align-items:center;gap:16px;padding:0 24px">${H.GLYPH(yes ? 'check-circle' : 'x-circle', 32, yes ? 'ok' : 'bad')}<span style="font:500 26px/1 var(--body);color:${yes ? 'var(--ink)' : 'var(--pale)'}">${H.esc(t)}</span></div>`;
    const rows = d.ops.map((t, k) => row(120, k, t, true) + row(1000, k, t, false)).join('');
    const L = n + 2, Q = n + 3, F = n + 4, by = top + panH + 24; // franja de abajo
    const box = (x, y, w, h, inner, extra = '') => `<div class="abs flex" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:16px;background:rgba(15,23,42,.6);border:2px solid var(--line);justify-content:center;gap:14px;padding:0 24px;${extra}">${inner}</div>`;
    const ny = by + 100, nh = 88;
    const tri = (x, y, dir, c) => `<div class="abs" style="left:${x}px;top:${y}px;width:0;height:0;${dir === "r" ? `border-top:9px solid transparent;border-bottom:9px solid transparent;border-left:14px solid ${c}` : `border-left:9px solid transparent;border-right:9px solid transparent;border-${dir === "d" ? "top" : "bottom"}:14px solid ${c}`}"></div>`;
    return `${H.HEAD(d)}
<div class="g lit r" data-i="1" style="left:120px;top:${top}px;width:800px;height:${panH}px"><div class="k cy">${H.esc(d.cmd.k)}</div></div>
<div class="g r" data-i="1" style="left:1000px;top:${top}px;width:800px;height:${panH}px"><div class="k">${H.esc(d.evt.k)}</div></div>
${rows}
<div class="r" data-i="${L}">
<div class="abs k bad" style="left:120px;top:${by}px">${H.esc(d.lock.k)}</div>
${box(160, ny, 220, nh, `${H.ICO('pi', 48)}<span class="t" style="font-size:32px">${H.esc(d.lock.a)}</span>`, 'border-color:var(--red)')}
${box(620, ny, 260, nh, `<span class="mono" style="font-size:26px">${H.esc(d.lock.b)}</span>`, 'border-color:var(--red)')}
<div class="abs s bad" style="left:300px;top:${ny - 62}px;width:460px;text-align:center;font-size:24px">${H.esc(d.lock.ea)}</div>
<div class="abs s bad" style="left:300px;top:${ny + nh + 28}px;width:460px;text-align:center;font-size:24px">${H.esc(d.lock.eb)}</div>
${tri(741, ny - 16, "d", "var(--red)")}${tri(261, ny + nh + 2, "u", "var(--red)")}
<div class="abs" style="left:430px;top:${ny + 28}px;width:140px;text-align:center"><span class="pill" style="font-size:22px;padding:6px 16px;color:var(--red);border-color:var(--red)">${H.esc(d.lock.tag)}</span></div>
</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#f87171" stroke-width="3">
<path class="draw" data-i="${L}" d="M270 ${ny - 6} C 300 ${ny - 30}, 720 ${ny - 30}, 750 ${ny - 6}"/>
<path class="draw" data-i="${L}" d="M750 ${ny + nh + 6} C 720 ${ny + nh + 26}, 300 ${ny + nh + 26}, 270 ${ny + nh + 6}"/>
<line class="draw" data-i="${Q}" x1="1230" y1="${ny + nh / 2}" x2="1290" y2="${ny + nh / 2}" stroke="#60a5fa"/>
<line class="draw" data-i="${F}" x1="1530" y1="${ny + nh / 2}" x2="1590" y2="${ny + nh / 2}" stroke="#60a5fa"/></svg>
<div class="r" data-i="${Q}">
${tri(1278, ny + nh / 2 - 9, "r", "var(--cyan)")}
<div class="abs k cy" style="left:1000px;top:${by}px">${H.esc(d.fix.k)}</div>
${box(1000, ny, 230, nh, `<span class="mono" style="font-size:26px">${H.esc(d.fix.from)}</span>`)}
${box(1290, ny, 240, nh, `${H.GLYPH('queue-list', 34)}<span class="mono cy" style="font-size:28px">${H.esc(d.fix.item)}</span>`, 'border-color:var(--cyan)')}
<div class="abs k" style="left:1290px;top:${ny + nh + 18}px;width:240px;text-align:center">${H.esc(d.fix.queue)}</div>
</div>
<div class="r" data-i="${F}">${tri(1578, ny + nh / 2 - 9, "r", "var(--cyan)")}${box(1590, ny, 210, nh, `${H.GLYPH('check-circle', 32, 'ok')}<span class="t" style="font-size:28px">${H.esc(d.fix.to)}</span>`, 'border-color:var(--ok)')}</div>`;
  },
};
