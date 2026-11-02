/* sidecar-review · vídeo 14 · un segundo modelo en su propio carril lee cada turno del principal y a veces le devuelve una nota.
   Datos: kicker, title, main = { label, model }, rev = { label, model, read }, turns[] (3–5), noteAt (índice del turno), note, deny, footer.
   Pasos: 1 carriles y turnos, 2 lee cada turno, 3 nota, 4 lo que no hace, 5 cierre. Iconos: eye (lee), x-circle (lo que no hace). */
TPL['sidecar-review'] = {
  def: {
    kicker: '/advisor', title: 'Uno hace, [[otro revisa]]',
    main: { label: 'modelo principal', model: 'deepseek-flash' },
    rev: { label: 'advisor', model: 'deepseek-v4-pro', read: 'lee' },
    turns: ['turno 1', 'turno 2', 'turno 3', 'turno 4'], noteAt: 2, note: 'nota',
    deny: 'No aprueba acciones ni cambia nada', footer: 'Revisa y avisa, [[en paralelo]]',
  },
  html(d, H) {
    const n = d.turns.length, xa = 540, xb = 1760, gap = n > 4 ? 50 : 80, w = Math.round((xb - xa - gap * (n - 1)) / n);
    const cx = k => xa + k * (w + gap) + w / 2, ym = 470, ya = 744;
    const lane = (top, s, i, lit) => `<div class="g${lit ? ' lit' : ''} r" data-i="${i}" style="left:120px;top:${top}px;width:1680px;height:170px"><div class="k${lit ? ' cy' : ''}">${H.esc(s.label)}</div><div class="mono" style="font-size:28px;margin-top:10px">${H.esc(s.model)}</div></div>`;
    const turns = d.turns.map((t, k) => `<div class="abs r" data-i="1" style="left:${cx(k) - w / 2}px;top:380px;width:${w}px;height:90px;border-radius:14px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);display:grid;place-items:center"><span class="mono" style="font-size:28px">${H.esc(t)}</span></div>`).join('');
    const reads = d.turns.map((_, k) => `<div class="abs r" data-i="2" style="left:${cx(k) - w / 2}px;top:${ya + 6}px;width:${w}px;text-align:center"><span class="chip" style="font-size:22px">${H.GLYPH('eye', 26)} <span style="vertical-align:5px">${H.esc(d.rev.read)}</span></span></div>`).join('');
    const down = d.turns.map((_, k) => { const x = cx(k) - 34; return `<path class="draw" data-i="2" d="M${x} ${ym + 4} V${ya}"/><path class="draw" data-i="2" d="M${x - 11} ${ya - 14} L${x} ${ya} L${x + 11} ${ya - 14}"/>`; }).join('');
    const xu = cx(d.noteAt) + 34;
    return `${H.HEAD(d)}
${lane(340, d.main, 1)}
${lane(690, d.rev, 1, true)}
${turns}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${down}
<path class="draw" data-i="3" d="M${xu} ${ya} V${ym + 4}" stroke="#fbbf24"/><path class="draw" data-i="3" d="M${xu - 11} ${ym + 18} L${xu} ${ym + 4} L${xu + 11} ${ym + 18}" stroke="#fbbf24"/></svg>
${reads}
<div class="abs r" data-i="3" style="left:${xu + 20}px;top:580px"><span class="pill" style="color:var(--amber);border-color:var(--amber);font-size:24px;padding:8px 20px;background:rgba(15,23,42,.8)">${H.A(d.note)}</span></div>
<div class="g r" data-i="4" style="left:120px;top:900px;width:820px;height:90px;padding:0 30px;display:flex;align-items:center;gap:18px;border-color:var(--red)">${H.GLYPH('x-circle', 44, 'bad')}<span class="s" style="font-size:28px;color:var(--ink)">${H.A(d.deny)}</span></div>
<div class="g lit r" data-i="5" style="left:980px;top:900px;width:820px;height:90px;padding:0 30px;display:flex;align-items:center"><span class="s" style="font-size:30px;color:var(--ink)">${H.A(d.footer)}</span></div>`;
  },
};
