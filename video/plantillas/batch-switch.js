/* batch-switch · vídeo 04 · el mismo trabajo en dos órdenes: agrupado (varias tareas con el barato y una revisión con el caro,
   un solo cambio de modelo) frente a ir y venir en cada paso (un cambio entre cada par). Cada cambio, una marca ámbar.
   Datos: kicker, title, legend, cheap, dear, good = { k, seq[] } , bad = { k, seq[] } (seq: 'c' barato · 'd' caro, 2–6 cada una),
   work, review, one, many, session = { t, cmd }. Pasos: 1 leyenda, 2 carril agrupado, 3 tareas con el barato, 4 revisión y su
   cambio, 5 carril de ida y vuelta, 6 /session. */
TPL['batch-switch'] = {
  def: {
    kicker: 'Conclusión práctica', title: 'Agrupa el trabajo, [[no vayas y vuelvas]]',
    legend: 'cambio de modelo: la primera petición del nuevo se paga entera',
    cheap: 'flash', dear: 'v4 pro', work: 'tarea', review: 'revisión',
    good: { k: 'agrupa el trabajo', seq: ['c', 'c', 'c', 'd'] },
    bad: { k: 'ir y venir en cada paso', seq: ['c', 'd', 'c', 'd', 'c', 'd'] },
    one: 'cambio', many: 'cambios',
    session: { t: 'Y cuando dudes, mira', cmd: '/session' },
  },
  html(d, H) {
    const lanes = [{ L: d.good, y: 380, tone: 'ok' }, { L: d.bad, y: 640, tone: 'red' }];
    const X0 = 470, X1 = 1770, BH = 120;
    const lane = ({ L, y, tone }, li) => {
      const n = L.seq.length, gap = 48, w = Math.min(230, Math.floor((X1 - X0 - (n - 1) * gap) / n));
      const st = (j) => li === 0 ? (L.seq[j] === 'c' ? 3 : 4) : 5;
      const blocks = L.seq.map((m, j) => `<div class="g${m === 'd' ? ' lit' : ''} r" data-i="${st(j)}" style="left:${X0 + j * (w + gap)}px;top:${y + 55}px;width:${w}px;height:${BH}px;padding:0 24px;display:flex;flex-direction:column;justify-content:center;gap:6px">
  <span class="mono" style="font-size:28px">${H.esc(m === 'c' ? d.cheap : d.dear)}</span><span class="k">${H.A(m === 'c' ? d.work : d.review)}</span></div>`).join('');
      const marks = L.seq.map((m, j) => j && m !== L.seq[j - 1] ? `<div class="abs r" data-i="${st(j)}" style="left:${X0 + j * (w + gap) - gap / 2 - 4}px;top:${y + 45}px;width:8px;height:${BH + 20}px;border-radius:4px;background:var(--amber);box-shadow:0 0 16px rgba(251,191,36,.6)"></div>` : '').join('');
      const k = L.seq.filter((m, j) => j && m !== L.seq[j - 1]).length;
      return `<div class="g r" data-i="${li ? 5 : 2}" style="left:120px;top:${y}px;width:1680px;height:230px;border-left:6px solid var(--${tone})"></div>
<div class="abs k ${tone === 'ok' ? 'ok' : 'bad'} r" data-i="${li ? 5 : 2}" style="left:154px;top:${y + 34}px;width:270px;line-height:1.35">${H.A(L.k)}</div>
<div class="abs r" data-i="${li ? 5 : 4}" style="left:154px;top:${y + 130}px;width:270px"><span class="t ${tone === 'ok' ? 'ok' : 'bad'}">${k}</span><span class="s" style="margin-left:14px">${H.A(k === 1 ? d.one : d.many)}</span></div>
${blocks}${marks}`;
    };
    return `${H.HEAD(d)}
<div class="abs flex r" data-i="1" style="left:120px;top:318px;gap:16px"><i style="display:block;width:8px;height:40px;border-radius:4px;background:var(--amber)"></i><span class="s" style="font-size:26px">${H.A(d.legend)}</span></div>
${lanes.map(lane).join('')}
<div class="abs flex r" data-i="6" style="left:120px;top:906px;gap:18px"><span class="s" style="color:var(--ink)">${H.A(d.session.t)}</span><span class="chip" style="font-size:28px">${H.esc(d.session.cmd)}</span></div>`;
  },
};
