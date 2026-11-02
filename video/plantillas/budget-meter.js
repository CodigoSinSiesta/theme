/* budget-meter · vídeo 15 · qué llena el presupuesto de un objetivo, qué no cuenta y qué pasa al llegar al límite (frena, no corta).
   Datos: kicker, title, segs[] = { t, w (px) } (2–4, suma ≤ 1100), limit = { label, value }, skip = { t, note }, reach, states[] = { k, t, mono? } (2–3).
   Pasos: uno por segmento (1…n), n+1 lo que no cuenta, n+2 llega al límite, luego un estado por paso. Icono: x-circle (no cuenta). */
TPL['budget-meter'] = {
  def: {
    kicker: 'Qué cuenta el presupuesto', title: 'Mide [[trabajo nuevo]]',
    segs: [{ t: 'entrada', w: 380 }, { t: 'escritura en caché', w: 300 }, { t: 'salida', w: 280 }],
    limit: { label: 'presupuesto', value: '200 000' },
    skip: { t: 'lecturas de caché', note: 'No cuentan' },
    reach: 'Al llegar al límite, no corta en seco',
    states: [{ k: 'el objetivo', t: 'budget limited', mono: true }, { k: 'el agente', t: 'Recibe un aviso para cerrar' }, { k: 'oh my pi', t: 'Deja de pedirle que continúe' }],
  },
  html(d, H) {
    const n = d.segs.length, x0 = 144, lim = 1440, tones = ['rgba(96,165,250,.6)', 'rgba(147,197,253,.42)', 'rgba(59,130,246,.75)', 'rgba(96,165,250,.3)'];
    let x = x0;
    const segs = d.segs.map((s, k) => { const o = `<i class="bx" data-i="${k + 1}" style="position:absolute;left:${x}px;top:402px;width:${s.w - 6}px;height:72px;border-radius:10px;background:${tones[k % 4]};border:1.5px solid var(--cyan)"></i><div class="abs s r" data-i="${k + 1}" style="left:${x}px;top:500px;font-size:26px;color:var(--ink)">${H.esc(s.t)}</div>`; x += s.w; return o; }).join('');
    const fill = `<i class="bx" data-i="${n + 2}" style="position:absolute;left:${x}px;top:402px;width:${lim - x - 4}px;height:72px;border-radius:10px;background:repeating-linear-gradient(135deg,rgba(251,191,36,.35) 0 14px,rgba(251,191,36,.12) 14px 28px);border:1.5px solid var(--amber)"></i>`;
    const m = d.states.length, sg = 110, sw = Math.round((1680 - sg * (m - 1)) / m), sx = k => 120 + k * (sw + sg), st = 790;
    const states = d.states.map((s, k) => `<div class="g${k ? '' : ' lit'} r" data-i="${n + 3 + k}" style="left:${sx(k)}px;top:${st}px;width:${sw}px;height:150px;padding:24px 30px${k ? '' : ';border-color:var(--amber);box-shadow:0 0 40px rgba(251,191,36,.25)'}"><div class="k">${H.esc(s.k)}</div><div class="${s.mono ? 'mono am' : 's'}" style="font-size:${s.mono ? 36 : 28}px;margin-top:12px;${s.mono ? 'font-weight:700' : 'color:var(--ink)'}">${H.A(s.t)}</div></div>`).join('');
    const arrows = d.states.slice(1).map((_, k) => { const a = sx(k) + sw + 14, b = sx(k + 1) - 14, yy = st + 75; return `<path class="draw" data-i="${n + 4 + k}" d="M${a} ${yy} H${b}"/><path class="draw" data-i="${n + 4 + k}" d="M${b - 14} ${yy - 12} L${b} ${yy} L${b - 14} ${yy + 12}"/>`; }).join('');
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:380px;width:${lim - 96}px;height:116px;padding:0"></div>
${segs}${fill}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
<line x1="${lim + 6}" y1="350" x2="${lim + 6}" y2="530" stroke="#fbbf24" stroke-width="5"/>${arrows}</svg>
<div class="abs" style="left:${lim + 40}px;top:392px"><div class="k">${H.esc(d.limit.label)}</div><div class="mono am" style="font-size:40px;font-weight:700;margin-top:8px">${H.esc(d.limit.value)}</div></div>
<div class="abs r" data-i="${n + 1}" style="left:${x0}px;top:580px;width:560px;height:72px;border:2px dashed rgba(148,163,184,.55);border-radius:10px;display:flex;align-items:center;padding:0 24px"><span class="mono" style="font-size:26px;color:var(--pale3);text-decoration:line-through;text-decoration-color:var(--red)">${H.esc(d.skip.t)}</span></div>
<div class="abs flex r" data-i="${n + 1}" style="left:${x0 + 600}px;top:584px;gap:16px">${H.GLYPH('x-circle', 44, 'bad')}<span class="s" style="font-size:28px;color:var(--ink)">${H.A(d.skip.note)}</span></div>
<div class="abs k am r" data-i="${n + 2}" style="left:120px;top:726px">${H.A(d.reach)}</div>
${states}`;
  },
};
