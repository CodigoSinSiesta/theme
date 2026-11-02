/* timeout-escape · vídeo 22 · un tope de tiempo acota lo que pide el modelo y el valor por defecto, pero un timeout de 0
   pasa por encima: el límite duro tiene que vivir fuera del modelo. Esquemático: sin cifra para el tope. Datos: kicker, title,
   cap, rows[3] = { name, note, len (px de lo que pediría, 0 = sin límite) } (la 3.ª es la que se escapa), hard = { k, wall },
   outs[2] = { c, t }. Pasos: 1 tope, 2 lo que pide el modelo, 3 por defecto, 4 timeout 0, 5 límite duro, 6 --max-time, 7 CI. */
TPL['timeout-escape'] = {
  def: {
    kicker: 'tools.maxTimeout · la letra pequeña', title: 'Con [[timeout: 0]] no hay tope',
    cap: 'tope',
    rows: [
      { name: 'lo que pide el modelo', note: 'acotado', len: 900 },
      { name: 'por defecto · 5 min', note: 'acotado', len: 760 },
      { name: 'timeout: 0', note: 'sin límite, con tope o sin él', len: 0 },
    ],
    hard: { k: 'límite duro · fuera del modelo' },
    outs: [{ c: '--max-time', t: 'toda la sesión, como en medir.sh' }, { c: 'CI', t: 'el límite de tu integración continua' }],
  },
  html(d, H) {
    const X0 = 560, CAP = 1100, END = 1690, WALL = 1740, cy = i => 420 + i * 120;
    const row = (r, i) => {
      const y = cy(i), esc = !r.len, step = i + 2;
      const label = `<div class="abs r" data-i="${step}" style="left:120px;top:${y - 40}px;width:410px;text-align:right"><div class="mono" style="font-size:28px;line-height:40px;color:var(--ink)">${H.esc(r.name)}</div><div class="s ${esc ? 'bad' : 'ok'}" style="font-size:24px;line-height:32px">${H.esc(r.note)}</div></div>`;
      if (esc) return label + `<i class="bx" data-i="${step}" style="position:absolute;left:${X0}px;top:${y - 26}px;width:${END - X0}px;height:52px;border-radius:10px 0 0 10px;background:rgba(248,113,113,.55)"></i>
<svg class="abs r" data-i="${step}" style="left:${END}px;top:${y - 38}px" width="40" height="76"><path d="M0 0 L36 38 L0 76 Z" fill="rgba(248,113,113,.85)"/></svg>`;
      return label + `<i class="bx" data-i="${step}" style="position:absolute;left:${X0}px;top:${y - 26}px;width:${CAP - X0}px;height:52px;border-radius:10px 0 0 10px;background:rgba(96,165,250,.55)"></i>
<div class="abs r" data-i="${step}" style="left:${CAP}px;top:${y - 26}px;width:${X0 + r.len - CAP}px;height:52px;border:2px dashed var(--line);border-left:none;border-radius:0 10px 10px 0;background:rgba(15,23,42,.35)"></div>`;
    };
    return `${H.HEAD(d)}
${d.rows.map(row).join('')}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none">
<line class="draw" data-i="1" x1="${CAP}" y1="352" x2="${CAP}" y2="${cy(2) + 62}" stroke="#60a5fa" stroke-width="5"/>
<line class="draw" data-i="5" x1="${WALL}" y1="352" x2="${WALL}" y2="${cy(2) + 62}" stroke="#34d399" stroke-width="7"/></svg>
<div class="abs r flex" data-i="1" style="left:${CAP - 110}px;top:300px;width:220px;justify-content:center;gap:12px">${H.GLYPH('clock', 34)}<span class="mono cy" style="font-size:28px">${H.esc(d.cap)}</span></div>
<div class="abs k ok r" data-i="5" style="left:120px;top:768px">${H.esc(d.hard.k)}</div>
${d.outs.map((o, i) => `<div class="g r flex" data-i="${6 + i}" style="left:${120 + i * 860}px;top:812px;width:820px;height:140px;padding:0 34px;gap:30px;border-color:var(--ok)"><span class="mono ok" style="font-size:34px;white-space:nowrap">${H.esc(o.c)}</span><span class="s" style="font-size:27px">${H.A(o.t)}</span></div>`).join('')}`;
  },
};
