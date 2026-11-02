/* every-request · vídeo 06 · lo que cuesta cada sitio repetido petición a petición: AGENTS.md viaja entero en todas; una skill
   es una línea hasta la petición que la usa. Datos: kicker, title, n (8–12 peticiones), use (índice de la que la usa), axis,
   agents = { name, note, base, proc }, skill = { name, note, line, body }, once, pay. Pasos: 1 peticiones, 2 lo de casi todas las
   tareas, 3 la línea de la skill, 4 la skill se usa, 5 el procedimiento en AGENTS.md, 6 se usa una vez, 7 se paga en todas. */
TPL['every-request'] = {
  def: {
    kicker: '¿Skill o AGENTS.md?', title: 'Lo que pagas [[petición a petición]]', n: 10, use: 6, axis: 'peticiones →',
    agents: { name: 'AGENTS.md', note: 'se carga siempre', base: 'casi todas las tareas', proc: 'procedimiento de 20 pasos' },
    skill: { name: 'skill', note: 'una línea hasta que se usa', line: 'nombre y descripción', body: 'entera, al usarla' },
    once: 'una vez al mes', pay: 'pagado sin usarse',
  },
  html(d, H) {
    const n = d.n, W = 104, G = Math.floor((1240 - n * W) / (n - 1)), x = k => 560 + k * (W + G);
    const L1 = 380, L2 = 700, CH = 240;                   // arriba de cada fila de peticiones y su alto
    const blk = (k, top, h, bg, bd, i, extra = '') => `<div class="abs r" data-i="${i}" style="left:${x(k) + 8}px;top:${top}px;width:${W - 16}px;height:${h}px;border-radius:8px;background:${bg};border:2px solid ${bd};${extra}"></div>`;
    const frames = [L1, L2].map(t => Array.from({ length: n }, (_, k) => `<div class="abs" style="left:${x(k)}px;top:${t}px;width:${W}px;height:${CH}px;border-radius:12px;border:1.5px dashed var(--line);background:rgba(15,23,42,.45)"></div>`).join('')).join('');
    const bot1 = L1 + CH - 8, bot2 = L2 + CH - 8;
    const base = Array.from({ length: n }, (_, k) => blk(k, bot1 - 50, 50, 'rgba(96,165,250,.35)', 'var(--cyan)', 2)).join('');
    const proc = Array.from({ length: n }, (_, k) => blk(k, bot1 - 50 - 10 - 150, 150, 'rgba(251,191,36,.25)', 'var(--amber)', 5)).join('');
    const waste = Array.from({ length: n }, (_, k) => k === d.use ? '' : blk(k, bot1 - 50 - 10 - 150, 150, 'rgba(248,113,113,.28)', 'var(--red)', 7)).join('');
    const line = Array.from({ length: n }, (_, k) => blk(k, bot2 - 14, 14, 'rgba(96,165,250,.35)', 'var(--cyan)', 3)).join('');
    const sq = (bg, bd, h = 28) => `<i style="display:inline-block;width:28px;height:${h}px;border-radius:6px;background:${bg};border:2px solid ${bd};flex:none"></i>`;
    const key = (i, s, t) => `<div class="flex r" data-i="${i}" style="gap:14px;margin-top:12px">${s}<span class="s" style="font-size:24px">${H.A(t)}</span></div>`;
    const ring = (top, h) => `<div class="abs r" data-i="6" style="left:${x(d.use) + 2}px;top:${top}px;width:${W - 4}px;height:${h}px;border-radius:12px;border:3px solid var(--cyan);box-shadow:0 0 28px rgba(96,165,250,.5)"></div>`;
    return `${H.HEAD(d)}
<div class="r" data-i="1">${frames}</div>
<div class="g r" data-i="1" style="left:120px;top:${L1}px;width:400px;height:${CH}px;padding:24px 28px"><div class="mono cy" style="font-size:34px;font-weight:700">${H.esc(d.agents.name)}</div>
<div class="s" style="font-size:24px;margin-top:4px">${H.A(d.agents.note)}</div>${key(2, sq('rgba(96,165,250,.35)', 'var(--cyan)'), d.agents.base)}${key(5, sq('rgba(251,191,36,.25)', 'var(--amber)'), d.agents.proc)}</div>
<div class="g r" data-i="1" style="left:120px;top:${L2}px;width:400px;height:${CH}px;padding:24px 28px"><div class="mono cy" style="font-size:34px;font-weight:700">${H.esc(d.skill.name)}</div>
<div class="s" style="font-size:24px;margin-top:4px">${H.A(d.skill.note)}</div>${key(3, sq('rgba(96,165,250,.35)', 'var(--cyan)', 10), d.skill.line)}${key(4, sq('rgba(251,191,36,.25)', 'var(--amber)'), d.skill.body)}</div>
${base}${line}${blk(d.use, bot2 - 14 - 10 - 150, 150, 'rgba(251,191,36,.25)', 'var(--amber)', 4)}${proc}${waste}
${ring(L1 - 4, CH + 8)}${ring(L2 - 4, CH + 8)}
<div class="abs k cy r" data-i="6" style="left:${x(d.use) + W / 2 - 150}px;top:${L1 - 46}px;width:300px;text-align:center">${H.A(d.once)}</div>
<div class="abs r" data-i="7" style="left:560px;top:${L1 + CH + 14}px;width:1240px;text-align:center"><span class="pill" style="display:inline-block;color:var(--red);border-color:var(--red)">${H.A(d.pay)}</span></div>
<div class="abs k r" data-i="1" style="left:560px;top:${L2 + CH + 14}px;width:1240px;text-align:right">${H.A(d.axis)}</div>`;
  },
};
