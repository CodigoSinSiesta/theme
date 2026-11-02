/* compaction · historial largo → /compact → resumen + restos + espacio libre.
   Datos: kicker, title, before = { label, bars[] (anchos %) } (hasta ~10), action, arrow,
   after = { label, summary, bars[] (anchos %), free } (hasta ~4 barras). */
TPL.compaction = {
  def: {
    kicker: 'Compactar', title: 'Menos historial, [[mismo hilo]]',
    before: { label: 'antes', bars: [100, 84, 96, 70, 100, 90, 76, 98, 80] },
    action: '/compact', arrow: '→',
    after: { label: 'después', summary: 'Resumen de lo hecho y de lo pendiente', bars: [80, 96], free: 'espacio libre' },
  },
  html(d, H) {
    const bar = (w, mt, mb, h = 34) => `<i style="display:block;height:${h}px;${mt ? 'margin-top:' + mt + 'px;' : ''}${mb ? 'margin-bottom:' + mb + 'px;' : ''}border-radius:8px;background:rgba(96,165,250,.35);width:${+w}%"></i>`;
    const nb = d.before.bars.length, na = d.after.bars.length;
    const bs = nb > 10 ? Math.max(14, Math.floor(480 / nb) - 15) : 34;   // con muchas barras se achican
    const before = d.before.bars.map(w => bar(w, 0, 15, bs)).join('');
    const freeH = Math.max(80, 200 - Math.max(0, na - 2) * 49);
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:340px;width:560px;height:600px"><div class="k">${H.A(d.before.label)}</div><div style="margin-top:22px">${before}</div></div>
<div class="abs r" data-i="2" style="left:740px;top:560px;width:440px;text-align:center"><span class="chip" style="font-size:36px">${H.A(d.action)}</span><div class="t cy" style="font-size:70px;margin-top:10px">${H.A(d.arrow)}</div></div>
<div class="g lit r" data-i="3" style="left:1240px;top:340px;width:560px;height:600px"><div class="k">${H.A(d.after.label)}</div>
<div style="margin-top:22px;height:120px;border-radius:12px;background:rgba(96,165,250,.45);border:1.5px solid var(--cyan);padding:16px 22px" class="s">${H.A(d.after.summary)}</div>
${d.after.bars.map(w => bar(w, 15, 0)).join('')}
<div style="margin-top:20px;height:${freeH}px;border:2px dashed var(--line);border-radius:14px;display:grid;place-items:center" class="k">${H.A(d.after.free)}</div></div>`;
  },
};
