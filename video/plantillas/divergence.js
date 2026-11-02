/* divergence · dos curvas que se separan (p. ej. la métrica sube y la calidad baja). Pasos: 1…n una curva, n+1 el recuadro.
   Datos: kicker, title, series[] = { label, color: 'blue'|'red', points[] (0–1, de abajo a arriba, repartidos en el eje X; 3–8) },
   note = { pre, hi, post } (hi en acento), axis. Pensado para 2 series (1–3). */
TPL.divergence = {
  def: {
    kicker: 'Goodhart', title: 'Cuando la métrica [[se vuelve el objetivo]]',
    series: [
      { label: 'tests que pasan ↑', color: 'blue', points: [0.143, 0.307, 0.53, 0.721, 0.857] },
      { label: 'calidad real ↓', color: 'red', points: [0.821, 0.78, 0.621, 0.377, 0.107] },
    ],
    note: { pre: 'El agente aprende a ', hi: 'contentar al test', post: ', no a resolver el problema.' },
    axis: 'tiempo →',
  },
  html(d, H) {
    const X0 = 300, X1 = 1640, YB = 900, YH = 560;
    const COL = { blue: ['#60a5fa', 'cy'], red: ['#f87171', 'bad'] };
    const f = v => Math.round(v * 10) / 10;
    // curva suave (Catmull-Rom → Bézier) por los puntos
    const path = pts => {
      const P = pts.map((v, i) => [X0 + (X1 - X0) * i / (pts.length - 1), YB - Math.min(1, Math.max(0, v)) * YH]);
      let s = `M${f(P[0][0])} ${f(P[0][1])}`;
      for (let i = 0; i < P.length - 1; i++) {
        const a = P[i - 1] || P[i], b = P[i], c = P[i + 1], e = P[i + 2] || c;
        s += ` C${f(b[0] + (c[0] - a[0]) / 6)} ${f(b[1] + (c[1] - a[1]) / 6)} ${f(c[0] - (e[0] - b[0]) / 6)} ${f(c[1] - (e[1] - b[1]) / 6)} ${f(c[0])} ${f(c[1])}`;
      }
      return s;
    };
    const n = d.series.length;
    const paths = d.series.map((s, i) => `<path class="draw" data-i="${i + 1}" d="${path(s.points)}" stroke="${(COL[s.color] || COL.blue)[0]}" stroke-width="7"/>`).join('');
    const labels = d.series.map((s, i) => {
      const p = s.points, end = YB - p[p.length - 1] * YH, up = p[p.length - 1] >= p[0];
      return `<div class="abs mono ${(COL[s.color] || COL.blue)[1]} r" data-i="${i + 1}" style="left:${up ? 1400 : 1380}px;top:${Math.round(up ? end - 60 : end + 20)}px;font-size:30px;font-weight:700">${H.esc(s.label)}</div>`;
    }).join('');
    const nt = d.note ? `<div class="g lit r" data-i="${n + 1}" style="left:700px;top:700px;width:560px;padding:20px 28px"><div class="s" style="font-size:28px">${H.esc(d.note.pre || '')}<b class="cy">${H.esc(d.note.hi || '')}</b>${H.esc(d.note.post || '')}</div></div>` : '';
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none">
<path d="M300 340 V900 H1700" stroke="#64748b" stroke-width="3"/>${paths}</svg>${labels}${nt}
<div class="abs k" style="left:300px;top:920px">${H.esc(d.axis)}</div>`;
  },
};
