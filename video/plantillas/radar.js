/* radar · polígonos de perfil sobre 3–6 ejes (calculados en JS). Cada serie entra en un paso con su ficha a la derecha.
   Datos: kicker, title, axes[] (3–6 nombres), series[] = { name, logo?, lit?, vals[] 0–1 (uno por eje) }. Hasta 3 series. */
TPL.radar = {
  def: {
    kicker: 'Perfil', title: 'Dos herramientas, [[cinco ejes]]',
    axes: ['Autonomía', 'Memoria', 'Control', 'Coste', 'Ecosistema'],
    series: [
      { name: 'Pi', logo: 'pi', vals: [0.4, 0.3, 0.95, 0.9, 0.6] },
      { name: 'Hermes', logo: 'hermes', lit: true, vals: [0.9, 0.8, 0.6, 0.7, 0.9] },
    ],
  },
  html(d, H) {
    const cx = 960, cy = 640, R = 300, n = d.axes.length, f = v => +v.toFixed(1);
    const ang = k => (-90 + k * 360 / n) * Math.PI / 180;
    const pt = (k, r) => [f(cx + r * Math.cos(ang(k))), f(cy + r * Math.sin(ang(k)))];
    const poly = r => d.axes.map((_, k) => pt(k, r).join(',')).join(' ');
    const ring = s => `<polygon points="${poly(R)}" transform="translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})"/>`;
    const spokes = d.axes.map((_, k) => `M${cx} ${cy} L${pt(k, R).join(' ')}`).join(' ');
    const tones = [['rgba(148,163,184,.18)', '#94a3b8'], ['rgba(96,165,250,.28)', '#60a5fa'], ['rgba(52,211,153,.24)', '#34d399']];
    const shapes = d.series.map((s, i) => { const t = tones[i % 3];
      return `<g class="r" data-i="${i + 1}" style="transform:none"><polygon points="${d.axes.map((_, k) => pt(k, R * Math.max(0.02, Math.min(1, s.vals[k] ?? 0))).join(',')).join(' ')}" fill="${t[0]}" stroke="${t[1]}" stroke-width="4"/></g>`; }).join('');
    const labels = d.axes.map((a, k) => { const [x, y] = pt(k, R + 40), c = Math.cos(ang(k));
      const tx = Math.abs(c) < 0.3 ? '-50%' : c > 0 ? '0' : '-100%';
      return `<div class="abs k" style="left:${x}px;top:${y}px;transform:translate(${tx},-50%);white-space:nowrap">${H.esc(a)}</div>`; }).join('');
    const cards = d.series.map((s, i) => `<div class="g${s.lit ? ' lit' : ''} r" data-i="${i + 1}" style="left:1450px;top:${430 + i * 130}px;width:350px;padding:18px 26px"><div class="flex" style="gap:16px">${s.logo ? H.ICO(s.logo, 50) : ''}<span class="t" style="font-size:34px">${H.esc(s.name)}</span></div></div>`).join('');
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none">
<g stroke="#60a5fa" stroke-opacity=".3" stroke-width="2" vector-effect="non-scaling-stroke">${ring(1)}${ring(.66)}${ring(.33)}<path d="${spokes}"/></g>${shapes}</svg>${labels}${cards}`;
  },
};
