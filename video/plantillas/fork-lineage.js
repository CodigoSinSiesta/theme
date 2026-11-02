/* fork-lineage · origen → fork con etiqueta «fork» y fichas de tecnología (1–2) y dos resúmenes.
   Datos: kicker, title, from/to = { logo, name, sub }, fork, tags[] = { logo, label } (1–2), inherits/adds = { label, text }. */
TPL['fork-lineage'] = {
  def: {
    kicker: 'Linaje', title: 'De Pi a [[oh my pi]]',
    from: { logo: 'pi', name: 'Pi', sub: 'mínimo y maleable' },
    fork: 'fork',
    to: { logo: 'omp', name: 'oh my pi', sub: 'baterías incluidas' },
    tags: [{ logo: 'bun', label: 'runtime' }, { logo: 'rust', label: 'núcleo' }],
    inherits: { label: 'hereda', text: 'sesiones · skills · extensiones' },
    adds: { label: 'añade', text: '85 comandos · memoria · subagentes · IDE' },
  },
  html(d, H) {
    const n = Math.max(1, Math.min(2, d.tags.length)), gap = 40, h = Math.round((400 - gap * (n - 1)) / n);
    const tags = d.tags.slice(0, 2).map((t, i) => `<div class="g r flex" data-i="4" style="left:1540px;top:${350 + i * (h + gap)}px;width:260px;height:${h}px;flex-direction:column;justify-content:center;gap:10px">${H.ICO(t.logo, n === 1 ? 110 : 80)}<span class="k">${H.A(t.label)}</span></div>`).join('');
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4"><line class="draw" data-i="2" x1="640" y1="550" x2="990" y2="550"/></svg>
<div class="g r" data-i="1" style="left:120px;top:350px;width:520px;height:400px;text-align:center">${H.ICO(d.from.logo, 130)}<div class="t" style="margin-top:20px">${H.A(d.from.name)}</div><div class="k" style="margin-top:8px">${H.A(d.from.sub)}</div></div>
<div class="abs k cy r" data-i="2" style="left:740px;top:495px">${H.A(d.fork)}</div>
<div class="g lit r" data-i="3" style="left:1000px;top:350px;width:480px;height:400px;text-align:center">${H.ICO(d.to.logo, 130)}<div class="t" style="margin-top:20px">${H.A(d.to.name)}</div><div class="k" style="margin-top:8px">${H.A(d.to.sub)}</div></div>
${tags}
<div class="g r" data-i="5" style="left:120px;top:800px;width:820px;padding:20px 30px"><span class="k ok">${H.A(d.inherits.label)}</span> <span class="s" style="font-size:26px">${H.A(d.inherits.text)}</span></div>
<div class="g r" data-i="5" style="left:1000px;top:800px;width:800px;padding:20px 30px"><span class="k cy">${H.A(d.adds.label)}</span> <span class="s" style="font-size:26px">${H.A(d.adds.text)}</span></div>`;
  },
};
