/* holdout-ratchet · vídeo 21 · /ratchet en dos tiempos: construye la evaluación con tres aprobaciones, reparte los casos
   en dos grupos congelados (uno reservado que el agente no ve) y, ronda a ronda, mantiene un cambio solo si mejora en los
   reservados. Datos: kicker, title, build = { k, text }, approvals[3], groups[2], dots (casos por grupo, esquemático, 4–8),
   freeze, hidden, rounds = { k, step, rows[] = { name, keep } (2–4, esquemático), keep, revert, rule }. Pasos: 1 evaluación,
   2 aprobaciones, 3 reparto, 4 congelado, 5 reservado oculto, 6 rondas, 7 qué se mantiene. */
TPL['holdout-ratchet'] = {
  def: {
    kicker: '/ratchet · dos tiempos', title: 'Solo cuenta [[lo que no ha visto]]',
    build: { k: '1 · construye una evaluación', text: 'Lee tu código y pregunta qué flujo, qué casos y qué objetivo.' },
    approvals: ['casos', 'evaluador', 'plan'], groups: ['trabaja', 'reservados'], dots: 6,
    freeze: 'reparto congelado', hidden: 'el agente nunca lo ve',
    rounds: { k: '2 · en cada ronda', step: 'propone un solo cambio', rows: [{ name: 'ronda 1', keep: true }, { name: 'ronda 2', keep: false }, { name: 'ronda 3', keep: true }],
      keep: 'se mantiene', revert: 'se revierte', rule: 'Lo mantiene solo si mejora en los casos reservados.' },
  },
  html(d, H) {
    const n = Math.max(4, Math.min(8, d.dots)), R = d.rounds;
    const dots = Array.from({ length: n }, () => `<span style="display:inline-block;width:30px;height:30px;border-radius:50%;margin:0 12px 12px 0;background:rgba(96,165,250,.45);border:2px solid var(--cyan)"></span>`).join('');
    const grp = (x, i, extra) => `<div class="g" style="left:${x}px;top:620px;width:260px;height:200px;padding:24px 26px;${extra || ''}"><div class="k">${H.esc(d.groups[i])}</div><div style="margin-top:16px;line-height:0">${dots}</div></div>`;
    const rows = R.rows.slice(0, 4).map((r, i) => { const y = 420 + i * 108;
      return `<div class="abs flex r" data-i="6" style="left:810px;top:${y}px;width:960px;height:88px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);padding:0 26px;gap:26px"><span class="mono cy" style="font-size:26px;width:130px">${H.esc(r.name)}</span><span class="s" style="font-size:26px">${H.A(R.step)}</span></div>`
        + `<div class="abs r" data-i="7" style="left:1520px;top:${y + 26}px;width:226px;text-align:right"><span class="bdg ${r.keep ? 'new' : 'del'}">${H.esc(r.keep ? R.keep : R.revert)}</span></div>`; }).join('');
    const yr = 420 + Math.min(4, R.rows.length) * 108 + 10;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:330px;width:580px;height:250px"><div class="k">${H.A(d.build.k)}</div><div class="s" style="font-size:26px;margin-top:12px">${H.A(d.build.text)}</div>
<div class="r flex" data-i="2" style="gap:12px;margin-top:20px">${H.GLYPH('check-circle', 30, 'ok')}${d.approvals.map(a => `<span class="chip">${H.esc(a)}</span>`).join('')}</div></div>
<div class="r" data-i="3">${grp(120, 0)}</div><div class="r" data-i="3">${grp(440, 1, 'border-color:var(--amber)')}</div>
<div class="abs r" data-i="4" style="left:390px;top:700px">${H.GLYPH('lock-closed', 40, 'am')}</div>
<div class="abs r s am" data-i="4" style="left:120px;top:876px;width:260px;font-size:24px;text-align:center">${H.A(d.freeze)}</div>
<div class="abs r flex" data-i="5" style="left:440px;top:836px;width:260px;flex-direction:column;gap:8px">${H.GLYPH('eye-slash', 32, 'am')}<span class="s am" style="font-size:24px;text-align:center">${H.A(d.hidden)}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3"><path class="draw" data-i="7" d="M700 720 C740 720 740 ${yr + 40} 780 ${yr + 40}" stroke="#fbbf24"/></svg>
<div class="g r" data-i="6" style="left:780px;top:330px;width:1020px;height:${yr - 330 + 90}px"><div class="k">${H.A(R.k)}</div></div>
${rows}
<div class="abs r flex" data-i="7" style="left:810px;top:${yr + 16}px;width:960px;gap:14px">${H.GLYPH('scale', 32, 'am')}<span class="s" style="font-size:27px;color:var(--ink)">${H.A(R.rule)}</span></div>`;
  },
};
