/* branch-state · paneles comparados (estado en memoria vs ligado a la rama): cadena de chips, rebobinado y resultado.
   Datos: kicker, title, panels[] = { kicker, tone: 'bad'|'ok', lit?, chain[], rewind, result, note }. 2–3 paneles (con 2: 800 y 820 px).
   Pasos: un panel por paso (1…n), luego un resultado por panel (n+1…2n). */
TPL['branch-state'] = {
  def: {
    kicker: 'Extensiones', title: 'Al rebobinar, [[el estado también]]',
    panels: [
      { kicker: 'estado en memoria', tone: 'bad', chain: ['n=1', 'n=2', 'n=3'], rewind: 'rebobinas al paso 1', result: 'n=3 ✗', note: 'el contador sigue donde lo dejó' },
      { kicker: 'estado ligado a la rama', tone: 'ok', lit: true, chain: ['n=1', 'n=2', 'n=3'], rewind: 'rebobinas al paso 1', result: 'n=1 ✓', note: 'se recalcula desde la rama activa' },
    ],
  },
  html(d, H) {
    const n = d.panels.length;
    const geo = i => n === 2 ? [[120, 800], [980, 820]][i] : (w => [120 + i * (w + 60), w])(Math.floor((1680 - 60 * (n - 1)) / n));
    const panels = d.panels.map((p, i) => {
      const [x, w] = geo(i), tone = p.tone === 'ok' ? 'ok' : 'bad', fs = n > 2 ? 'font-size:44px' : 'font-size:60px';
      return `<div class="g${p.lit ? ' lit' : ''} r" data-i="${i + 1}" style="left:${x}px;top:340px;width:${w}px;height:560px;border-top:6px solid var(--${tone === 'ok' ? 'ok' : 'red'})"><div class="k ${tone}">${H.A(p.kicker)}</div>
<div class="flex" style="gap:18px;margin-top:40px">${p.chain.map(c => `<span class="chip">${H.A(c)}</span>`).join('<span class="cy">›</span>')}</div>
<div class="s" style="margin-top:40px;font-size:28px"><span class="mono cy">⟲</span> ${H.A(p.rewind)}</div>
<div class="r" data-i="${n + i + 1}" style="margin-top:40px"><span class="t mono ${tone}" style="${fs}">${H.A(p.result)}</span><div class="s" style="font-size:24px;margin-top:10px">${H.A(p.note)}</div></div></div>`;
    }).join('');
    return `${H.HEAD(d)}\n${panels}`;
  },
};
