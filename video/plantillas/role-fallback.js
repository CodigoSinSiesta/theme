/* role-fallback · vídeo 14 · roles sin asignar que heredan en cadena hasta default, y qué arrastra cambiar uno de proveedor.
   Datos: kicker, title, target = { role, sub, logo? }, side = { role, sub } (hereda directo), chain[3] = { role, sub } (de lejos a cerca de target),
   swap = { label, effect }, note. Cadena fija de 3 + 1 lateral. Pasos: 1 smol/slow → default, 2 tiny, 3 memory, 4 otro proveedor, 5 efecto, 6 nota. */
TPL['role-fallback'] = {
  def: {
    kicker: 'Herencia', title: 'Lo que no asignas [[se hereda]]',
    target: { role: 'default', sub: 'con el que conversas', logo: 'deepseek' },
    side: { role: 'slow', sub: 'sin definir' },
    chain: [{ role: 'memory', sub: 'la memoria' }, { role: 'tiny', sub: 'títulos de sesión' }, { role: 'smol', sub: 'sin definir' }],
    swap: { label: 'smol en otro proveedor', effect: 'Los títulos de sesión [[también se van allí]]' },
    note: 'Un rol mal pensado mueve trabajo de fondo [[sin que lo veas en pantalla]].',
  },
  html(d, H) {
    const X = [120, 560, 1000], W = 320, top = 560, h = 140, tx = 1460, tw = 340;
    const node = (n, x, y, i, extra = '') => `<div class="g r" data-i="${i}" style="left:${x}px;top:${y}px;width:${W}px;height:${h}px;padding:26px 30px${extra}"><div class="mono cy" style="font-size:40px;font-weight:700">${H.esc(n.role)}</div><div class="s" style="font-size:24px;margin-top:6px">${H.A(n.sub)}</div></div>`;
    const steps = [3, 2, 1];
    const arrow = (x1, x2, y, i) => `<path class="draw" data-i="${i}" d="M${x1} ${y} H${x2 - 4}"/><path class="draw" data-i="${i}" d="M${x2 - 18} ${y - 12} L${x2 - 4} ${y} L${x2 - 18} ${y + 12}"/>`;
    const ym = top + h / 2;
    const T = d.target;
    return `${H.HEAD(d)}
<div class="abs r" data-i="4" style="left:96px;top:${top - 70}px;width:${X[2] + W - 72}px;height:${h + 94}px;border:3px dashed var(--amber);border-radius:26px"></div>
<div class="abs r" data-i="4" style="left:120px;top:${top - 58}px"><span class="pill" style="color:var(--amber);border-color:var(--amber);font-size:22px;padding:8px 18px">${H.A(d.swap.label)}</span></div>
${d.chain.map((n, k) => node(n, X[k], top, steps[k])).join('\n')}
${node(d.side, X[2], 320, 1)}
<div class="g lit r" data-i="1" style="left:${tx}px;top:${top - 30}px;width:${tw}px;height:${h + 60}px;padding:24px 30px"><div class="mono cy" style="font-size:44px;font-weight:700">${H.esc(T.role)}</div><div class="s" style="font-size:24px;margin-top:6px">${H.A(T.sub)}</div>${T.logo ? `<div class="flex" style="gap:14px;margin-top:14px">${H.ICO(T.logo, 44)}<span class="mono" style="font-size:22px;color:var(--pale)">${H.esc(T.logo)}</span></div>` : ''}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
${arrow(X[2] + W, tx, ym, 1)}${arrow(X[1] + W, X[2], ym, 2)}${arrow(X[0] + W, X[1], ym, 3)}
<path class="draw" data-i="1" d="M${X[2] + W} 390 H${tx + tw / 2 - 40} Q${tx + tw / 2} 390 ${tx + tw / 2} 430 V${top - 34}"/><path class="draw" data-i="1" d="M${tx + tw / 2 - 12} ${top - 48} L${tx + tw / 2} ${top - 34} L${tx + tw / 2 + 12} ${top - 48}"/></svg>
<div class="abs r" data-i="5" style="left:${X[1]}px;top:${top + h + 44}px;width:900px"><span class="s" style="font-size:30px;color:var(--ink)"><span class="am">↳</span> ${H.A(d.swap.effect)}</span></div>
<div class="g lit r" data-i="6" style="left:120px;top:880px;width:1680px;height:96px;padding:0 34px;display:flex;align-items:center"><span class="s" style="font-size:30px;color:var(--ink)">${H.A(d.note)}</span></div>`;
  },
};
