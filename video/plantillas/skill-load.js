/* skill-load · 3–5 etapas en tarjetas con una barra de contexto ocupado debajo de cada una.
   Datos: kicker, title, barLabel, stages[] = { t, s, pct (ancho de la barra, % de la tarjeta), lit? }. */
TPL['skill-load'] = {
  def: { kicker: 'Skills', title: 'Se carga [[solo lo que hace falta]]', barLabel: 'contexto que ocupa',
    stages: [
      { t: 'Descripción', s: 'Siempre en el contexto', pct: 15.4 },
      { t: 'Se activa', s: 'La tarea encaja con la descripción', pct: 15.4 },
      { t: 'Carga el cuerpo', s: 'Entran las instrucciones', pct: 92.3, lit: true },
      { t: 'Ejecuta', s: 'El script corre fuera: solo vuelve su salida', pct: 28.2 },
    ] },
  html(d, H) {
    const n = d.stages.length, gap = 40, w = (1680 - (n - 1) * gap) / n, num = '①②③④⑤⑥⑦⑧';
    return `${H.HEAD(d)}
${d.stages.map((s, i) => `<div class="g${s.lit ? ' lit' : ''} r" data-i="${i + 1}" style="left:${120 + i * (w + gap)}px;top:340px;width:${w}px;height:340px"><div class="t cy mono">${num[i] || i + 1}</div><div class="t" style="font-size:34px;margin-top:10px">${H.A(s.t)}</div><div class="s" style="font-size:25px;margin-top:10px">${H.A(s.s)}</div></div>`).join('\n')}
<div class="abs k" style="left:120px;top:730px">${H.A(d.barLabel)}</div>
${d.stages.map((s, i) => `<i class="bx" data-i="${i + 1}" style="position:absolute;left:${120 + i * (w + gap)}px;top:780px;width:${w * s.pct / 100}px;height:36px;background:var(--cyan);border-radius:8px"></i>`).join('\n')}`;
  },
};
