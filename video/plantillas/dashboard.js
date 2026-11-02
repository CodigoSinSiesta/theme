/* dashboard · tarjetas de métricas + gráfico de barras. Pasos: 1…n una tarjeta, n+1 el gráfico.
   Datos: kicker, title, kpis[] = { label, value, lit? } (2–5), chartTitle, bars[] (valores; altura relativa al máximo, que ocupa el 90 %), peak (índice resaltado; por defecto el máximo). 3–16 barras. */
TPL.dashboard = {
  def: {
    kicker: 'Métricas', title: 'Cómo fue [[la sesión]]',
    kpis: [{ label: 'tokens', value: '142k' }, { label: 'coste', value: '1,6 ¢' }, { label: 'herramientas', value: '38 s' }, { label: 'aprobaciones', value: '5', lit: true }],
    chartTitle: 'tokens por turno',
    bars: [30, 44, 38, 62, 55, 90, 70, 48, 40, 52],
  },
  html(d, H) {
    const n = d.kpis.length, step = n > 1 ? (1680 - 420) / (n - 1) : 0, w = n > 1 ? step - 30 : 1680;
    const kpis = d.kpis.map((k, i) => `<div class="g kpi${k.lit ? ' lit' : ''} r" data-i="${i + 1}" style="left:${120 + i * step}px;top:340px;width:${i === n - 1 && n > 1 ? 420 : w}px"><div class="k">${H.esc(k.label)}</div><div class="t mono" style="font-size:60px;margin-top:14px">${H.esc(k.value)}</div></div>`).join('');
    const max = Math.max(...d.bars, 1), peak = d.peak != null ? d.peak : d.bars.indexOf(Math.max(...d.bars));
    const bars = d.bars.map((v, i) => `<i style="flex:1;height:${(Math.max(v, 0) / max * 90).toFixed(1)}%;background:var(--${i === peak ? 'sky' : 'cyan'});border-radius:6px"></i>`).join('');
    return `${H.HEAD(d)}${kpis}
<div class="g r" data-i="${n + 1}" style="left:120px;top:570px;width:1680px;height:350px"><div class="k">${H.esc(d.chartTitle)}</div>
<div class="abs" style="left:40px;bottom:36px;width:1600px;height:210px;display:flex;align-items:flex-end;gap:26px">${bars}</div></div>`;
  },
};
