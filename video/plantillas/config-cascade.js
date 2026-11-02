/* config-cascade · vídeo 11 · capas de configuración apiladas de menor a mayor prioridad y, al lado, cómo se
   combinan: los objetos se fusionan y las listas se reemplazan. Datos: kicker, title, layers[] = { t, d } (de menor a mayor, 3–6),
   merge = { k, a, b, out }, replace = { k, a, b, out }, note. Pasos: una capa por paso (de abajo arriba), luego fusión, reemplazo y nota. */
TPL['config-cascade'] = {
  def: {
    kicker: 'Prioridad, de menor a mayor', title: 'Gana [[la capa de arriba]]',
    layers: [
      { t: 'Fábrica', d: 'valores por defecto' }, { t: 'Global', d: 'la de tu perfil · /settings' },
      { t: 'Proyecto', d: '.omp/config.yml' }, { t: '--config', d: 'un fichero, una ejecución' },
      { t: 'CLI', d: 'opciones de la línea de comandos' }, { t: 'Entorno', d: 'la variable propia de cada ajuste' }],
    merge: { k: 'Objetos · se fusionan', a: '{ a, b }', b: '{ c }', out: '{ a, b, c }' },
    replace: { k: 'Listas · se reemplazan enteras', a: '[ x, y ]', b: '[ z ]', out: '[ z ]' },
    note: 'Cuando un ajuste no hace caso, [[casi siempre es por esto]].',
  },
  html(d, H) {
    const L = d.layers, n = L.length, pitch = n > 5 ? 90 : 108, h = pitch - 14, bottom = 880, y = k => bottom - (k + 1) * pitch + 14;
    const rows = L.map((l, k) => { const top = k === n - 1;
      return `<div class="g${top ? ' lit' : ''} r flex" data-i="${k + 1}" style="left:200px;top:${y(k)}px;width:800px;height:${h}px;padding:0 30px;gap:24px"><span class="mono ${top ? 'cy' : ''}" style="font-size:28px;font-weight:700;width:200px">${H.esc(l.t)}</span><span class="s" style="font-size:24px">${H.A(l.d)}</span></div>`; }).join('');
    const eq = (o, cls, i, top) => `<div class="g r" data-i="${i}" style="left:1080px;top:${top}px;width:720px;height:200px;padding:26px 32px"><div class="k ${cls}">${H.A(o.k)}</div>
<div class="flex" style="margin-top:40px;gap:18px"><span class="chip">${H.esc(o.a)}</span><span class="t" style="font-size:36px">+</span><span class="chip">${H.esc(o.b)}</span><span class="t" style="font-size:36px">→</span><span class="chip" style="border-color:var(--cyan);color:var(--ink)">${H.esc(o.out)}</span></div></div>`;
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4"><defs><marker id="cc-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#60a5fa"/></marker></defs>
<line class="draw" data-i="1" x1="150" y1="${bottom - 10}" x2="150" y2="${y(n - 1) + 10}" marker-end="url(#cc-a)"/></svg>
${rows}
${eq(d.merge, 'ok', n + 1, 352)}${eq(d.replace, 'am', n + 2, 592)}
<div class="abs s r" data-i="${n + 3}" style="left:1090px;top:830px;width:710px;font-size:26px">${H.A(d.note)}</div>`;
  },
};
