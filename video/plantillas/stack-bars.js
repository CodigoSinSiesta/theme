/* stack-bars · barras apiladas (base a + extra b) escaladas por valor; la más larga mide `maxW` px (1200). Datos: kicker, title, rows[] = { label, a, b },
   legend = { a, b, note }. Una fila por paso, la leyenda al final. 1–4 filas. */
TPL['stack-bars'] = {
  def: {
    kicker: 'Prefijo', title: 'Cuánto pesa [[antes de empezar]]', maxW: 1200,
    rows: [
      { label: 'Pi · 4 herramientas', a: 793, b: 1178 },
      { label: 'Pi · 7 herramientas', a: 793, b: 1746 },
      { label: 'omp · de serie', a: 4427, b: 3560 },
    ],
    legend: { a: 'prompt base', b: 'herramientas', note: 'tokens del prefijo de «Di solo: hola»' },
  },
  html(d, H) {
    const fmt = v => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const max = Math.max(...d.rows.map(r => r.a + r.b)), k = d.maxW / max, X = 560, n = d.rows.length;
    let out = H.HEAD(d);
    d.rows.forEach((r, i) => {
      const y = 370 + i * 140, i1 = i + 1, wa = Math.round(r.a * k), wb = Math.round(r.b * k), tot = wa + wb, inside = tot > d.maxW * 0.9;
      out += `<div class="abs mono" style="left:120px;top:${y + 6}px;font-size:28px;line-height:56px;color:var(--pale);width:420px">${H.esc(r.label)}</div>`
        + `<i class="bx" data-i="${i1}" style="position:absolute;left:${X}px;top:${y}px;width:${wa}px;height:70px;background:var(--pale3);border-radius:10px 0 0 10px"></i>`
        + `<i class="bx" data-i="${i1}" style="position:absolute;left:${X + wa}px;top:${y}px;width:${wb}px;height:70px;background:var(--cyan);border-radius:0 10px 10px 0"></i>`
        + `<div class="abs mono r" data-i="${i1}" style="left:${inside ? X + tot - 200 : X + tot + 24}px;top:${y}px;font-size:28px;line-height:70px${inside ? ';color:#0f172a;font-weight:700' : ''}">${fmt(r.a + r.b)}</div>`;
    });
    const L = d.legend;
    return out + `<div class="abs flex r" data-i="${n + 1}" style="left:${X}px;top:${370 + (n - 1) * 140 + 170}px;gap:40px"><span class="flex mono" style="gap:12px;font-size:26px"><i style="width:26px;height:26px;background:var(--pale3);border-radius:6px"></i>${H.esc(L.a)}</span><span class="flex mono" style="gap:12px;font-size:26px"><i style="width:26px;height:26px;background:var(--cyan);border-radius:6px"></i>${H.esc(L.b)}</span><span class="k">${H.esc(L.note)}</span></div>`;
  },
};
