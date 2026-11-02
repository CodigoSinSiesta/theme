/* fallback-chain · vídeo 13 · una lista de métodos que se prueba en orden: si uno no está disponible o falla, pasa al siguiente.
   Datos: kicker, title, setting, methods[] = { name, sub } (3–5), skip, note. Pasos: 1 ajuste, 2…n+1 un método cada uno,
   n+2 saltos al siguiente, n+3 nota. */
TPL['fallback-chain'] = {
  def: {
    kicker: 'Cómo compacta', title: 'Una lista, [[en orden]]', setting: 'compaction.methodOrder · de fábrica',
    methods: [{ name: 'remote', sub: 'el del proveedor' }, { name: 'snapcompact', sub: 'en imágenes' }, { name: 'handoff', sub: 'un traspaso' },
      { name: 'shake', sub: 'sin modelo' }, { name: 'soft', sub: 'resumen local' }],
    skip: 'no está disponible o falla → pasa al siguiente',
    note: 'Cada nombre, [[una forma distinta]] de adelgazar.',
  },
  html(d, H) {
    const n = d.methods.length, gap = 44, w = Math.floor((1680 - gap * (n - 1)) / n), x = i => 120 + i * (w + gap), cx = i => x(i) + w / 2;
    const top = 430, hgt = 230, by = top + hgt;
    const hops = d.methods.slice(1).map((_, i) => `<path class="draw" data-i="${n + 2}" stroke="#fbbf24" stroke-dasharray="10 8" d="M${cx(i)} ${by + 10} C${cx(i)} ${by + 90} ${cx(i + 1)} ${by + 90} ${cx(i + 1)} ${by + 16}"/>`
      + `<path class="draw" data-i="${n + 2}" stroke="#fbbf24" d="M${cx(i + 1) - 10} ${by + 30} L${cx(i + 1)} ${by + 14} L${cx(i + 1) + 10} ${by + 30}"/>`).join('');
    const arrows = d.methods.slice(1).map((_, i) => `<div class="abs t cy r" data-i="${i + 3}" style="left:${x(i) + w}px;top:${top + hgt / 2 - 30}px;width:${gap}px;text-align:center;font-size:44px;line-height:60px">›</div>`).join('');
    return `${H.HEAD(d)}
<div class="abs r" data-i="1" style="left:120px;top:330px"><span class="chip" style="font-size:28px;border-color:var(--cyan)">${H.A(d.setting)}</span></div>
${d.methods.map((m, i) => `<div class="g${i === 0 ? ' lit' : ''} r" data-i="${i + 2}" style="left:${x(i)}px;top:${top}px;width:${w}px;height:${hgt}px;padding:24px 26px">
<div class="k">${i + 1}</div><div class="mono cy" style="font-size:36px;margin-top:22px;white-space:nowrap">${H.esc(m.name)}</div><div class="s" style="font-size:26px;margin-top:12px">${H.A(m.sub)}</div></div>`).join('')}
${arrows}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke-width="3">${hops}</svg>
<div class="abs s am r" data-i="${n + 2}" style="left:120px;top:${by + 100}px;width:1680px;text-align:center;font-size:30px;color:var(--amber)">${H.A(d.skip)}</div>
<div class="g lit r" data-i="${n + 3}" style="left:120px;top:880px;width:1680px;height:96px;padding:0 34px;display:flex;align-items:center"><span class="s" style="font-size:30px;color:var(--ink)">${H.A(d.note)}</span></div>`;
  },
};
