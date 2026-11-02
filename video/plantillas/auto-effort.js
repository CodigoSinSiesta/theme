/* auto-effort · vídeo 14 · el esfuerzo en auto: antes de cada turno un clasificador (rol judge, otra llamada a un modelo)
   estima la dificultad y elige el nivel; con la palabra ultrathink, ese turno va al tope. Datos: kicker, title, ask = { k, t, s },
   judge = { k, t, role, cost }, levels[] (3–5, de menor a mayor; el último es el tope), scaleK, pick, magic = { k, before, word, after, s },
   top. Pasos: 1 petición, 2 clasificador, 3 elige nivel, 4 rol judge, 5 ultrathink, 6 tope. */
TPL['auto-effort'] = {
  def: {
    kicker: 'auto, que Pi no tiene', title: 'Un clasificador [[elige el esfuerzo]]',
    ask: { k: 'effort: auto', t: 'Tu petición', s: 'antes de cada turno' },
    judge: { k: 'clasificador', t: 'Estima la dificultad', role: 'rol judge', cost: 'también es una llamada a un modelo' },
    levels: ['off', 'low', 'high', 'max'], scaleK: 'niveles del modelo', pick: 'elige el de este turno',
    magic: { k: 'tu mensaje', before: '… ', word: 'ultrathink', after: ' …', s: 'con auto activo' },
    top: 'ese turno, al tope del modelo',
  },
  html(d, H) {
    const n = d.levels.length, x0 = 1190, W = 610, gap = 12, bw = (W - gap * (n - 1)) / n, bx = i => x0 + i * (bw + gap);
    const scale = (y, i, lit) => d.levels.map((l, k) => `<div class="abs${lit && k === n - 1 ? ` r" data-off="${lit}` : ''}" style="left:${bx(k)}px;top:${y}px;width:${bw}px;height:84px;border-radius:14px;border:1.5px solid var(--line);background:var(--glass);display:grid;place-items:center"><span class="mono" style="font-size:28px;color:var(--pale)">${H.esc(l)}</span></div>`).join('')
      + (lit ? `<div class="abs r" data-i="${lit}" style="left:${bx(n - 1)}px;top:${y}px;width:${bw}px;height:84px;border-radius:14px;border:2px solid var(--cyan);background:rgba(96,165,250,.35);box-shadow:0 0 30px rgba(96,165,250,.5);display:grid;place-items:center"><span class="mono" style="font-size:28px;font-weight:700">${H.esc(d.levels[n - 1])}</span></div>` : '');
    const y1 = 400, y2 = 760;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:340px;width:420px;height:210px"><div class="k cy">${H.esc(d.ask.k)}</div><div class="t" style="margin-top:12px">${H.esc(d.ask.t)}</div><div class="s" style="font-size:26px;margin-top:4px">${H.A(d.ask.s)}</div></div>
<div class="g r" data-i="2" style="left:620px;top:340px;width:490px;height:210px"><div class="k">${H.esc(d.judge.k)}</div><div class="s" style="color:var(--ink);margin-top:14px">${H.A(d.judge.t)}</div>
<div class="flex r" data-i="4" style="gap:14px;margin-top:18px">${H.GLYPH('cpu-chip', 36)}<span class="pill" style="padding:6px 20px">${H.esc(d.judge.role)}</span></div></div>
<div class="abs s r" data-i="4" style="left:620px;top:566px;width:490px;font-size:26px;color:var(--amber)">${H.A(d.judge.cost)}</div>
<div class="r" data-i="3"><div class="abs k" style="left:${x0}px;top:${y1 - 50}px">${H.esc(d.scaleK)}</div>${scale(y1, 0)}
<div class="abs" style="left:${x0}px;top:${y1 + 98}px;width:${W}px;height:14px;border:2px dashed var(--cyan);border-top:none;border-radius:0 0 10px 10px"></div>
<div class="abs s cy" style="left:${x0}px;top:${y1 + 122}px;width:${W}px;text-align:center;font-size:26px">${H.A(d.pick)}</div></div>
<div class="g r" data-i="5" style="left:120px;top:${y2 - 58}px;width:760px;height:200px"><div class="k">${H.esc(d.magic.k)}</div>
<div class="mono" style="font-size:36px;margin-top:16px;white-space:pre">${H.esc(d.magic.before)}<span style="color:var(--amber);background:rgba(251,191,36,.16);border-radius:8px;padding:2px 10px;box-shadow:0 0 0 2px var(--amber)">${H.esc(d.magic.word)}</span>${H.esc(d.magic.after)}</div>
<div class="s" style="font-size:26px;margin-top:12px">${H.A(d.magic.s)}</div></div>
<div class="r" data-i="5">${scale(y2, 0, 6)}</div>
<div class="abs s r" data-i="6" style="left:${x0}px;top:${y2 + 104}px;width:${W}px;text-align:right;font-size:26px;color:var(--ink)">${H.A(d.top)}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="2" d="M546 440 L612 440"/><path class="draw" data-i="2" d="M600 428 L612 440 L600 452"/>
<path class="draw" data-i="3" d="M1116 440 L1182 440"/><path class="draw" data-i="3" d="M1170 428 L1182 440 L1170 452"/>
<path class="draw" data-i="6" d="M886 ${y2 + 42} L1182 ${y2 + 42}"/><path class="draw" data-i="6" d="M1170 ${y2 + 30} L1182 ${y2 + 42} L1170 ${y2 + 54}"/></svg>`;
  },
};
