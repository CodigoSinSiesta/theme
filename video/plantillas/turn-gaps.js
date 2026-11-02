/* turn-gaps · vídeo 03 · dónde entra cada cosa en una ejecución: herramientas en paralelo dentro de un turno, el steering
   al acabar el turno en curso y el follow-up cuando ya no queda trabajo. Datos: kicker, title, turns[3], tools[] (2–3), par,
   steer / follow = { k, note }, axis. Fijo: tres turnos. Pasos: 1 turnos, 2 herramientas en paralelo, 3 steering, 4 follow-up. */
TPL['turn-gaps'] = {
  def: {
    kicker: 'Entre turno y turno', title: 'Dónde [[encaja]] cada mensaje',
    turns: ['turno 1', 'turno 2', 'turno 3'], tools: ['read', 'read', 'bash'], par: 'en paralelo',
    steer: { k: 'steering · Enter', note: 'al acabar el turno en curso' },
    follow: { k: 'follow-up · Alt+Enter', note: 'cuando ya no queda trabajo' },
    axis: 'tiempo →',
  },
  html(d, H) {
    const T = [[120, 640], [840, 400], [1440, 360]], top = 560, h = 230;
    const turns = T.map(([x, w], i) => `<div class="g${i === 2 ? ' lit' : ''}" style="left:${x}px;top:${top}px;width:${w}px;height:${h}px"><div class="k">${H.A(d.turns[i])}</div></div>`).join('');
    const tw = [0.86, 0.66, 0.78];
    const tools = d.tools.map((t, i) => `<div class="abs mono r" data-i="2" style="left:160px;top:${top + 70 + i * 50}px;width:80px;font-size:22px;line-height:38px;color:var(--ink)">${H.esc(t)}</div><div class="abs bx" data-i="2" style="left:250px;top:${top + 70 + i * 50}px;width:${Math.round(460 * tw[i % 3])}px;height:38px;border-radius:9px;background:rgba(96,165,250,.38);border:1.5px solid var(--cyan)"></div>`).join('');
    const one = `<div class="abs" style="left:880px;top:${top + 120}px;width:300px;height:38px;border-radius:9px;background:rgba(96,165,250,.38);border:1.5px solid var(--cyan)"></div><div class="abs r" data-i="4" style="left:1480px;top:${top + 120}px;width:260px;height:38px;border-radius:9px;background:rgba(251,191,36,.22);border:1.5px solid var(--amber)"></div>`;
    const gap = (cx, i, o) => `<div class="abs s r" data-i="${i}" style="left:${cx - 150}px;top:${top + h + 20}px;width:300px;text-align:center;font-size:24px;line-height:1.3;color:var(--ink)">${H.A(o.note)}</div>`;
    return `${H.HEAD(d)}
<div class="r" data-i="1">${turns}${one}</div>
${tools}
<div class="abs r" data-i="2" style="left:560px;top:${top + 18}px"><span class="pill" style="font-size:22px;padding:6px 16px">${H.A(d.par)}</span></div>
<div class="abs r" data-i="3" style="left:330px;top:340px"><span class="chip" style="border-color:var(--cyan)">${H.A(d.steer.k)}</span></div>
<div class="abs r" data-i="4" style="left:1010px;top:340px"><span class="chip" style="border-color:var(--amber);color:var(--amber)">${H.A(d.follow.k)}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4">
<path class="draw" data-i="3" d="M480 404 V470 H800 V548"/><path class="draw" data-i="3" d="M786 532 L800 548 L814 532"/>
<path class="draw" data-i="4" d="M1180 404 V470 H1340 V548" stroke="#fbbf24"/><path class="draw" data-i="4" d="M1326 532 L1340 548 L1354 532" stroke="#fbbf24"/></svg>
${gap(800, 3, d.steer)}${gap(1340, 4, d.follow)}
<div class="r" data-i="1"><div class="abs" style="left:120px;top:900px;width:1680px;height:2px;background:var(--line)"></div><div class="abs k" style="left:1600px;top:916px;width:200px;text-align:right">${H.A(d.axis)}</div></div>`;
  },
};
