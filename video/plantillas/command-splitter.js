/* command-splitter · vídeo 08 · un comando que «empieza bien» se corta por &&, ; o | y cada trozo se comprueba; basta uno
   inseguro (o una redirección) para que vaya a la pregunta. Datos: kicker, title, rows[] = { parts[] = { t, ok, why? } (1–3), seps[] (uno menos
   que parts), naive, verdict, tone: 'am'|'ok' } (1–3 filas; comando de hasta ~40 caracteres). Pasos: 1…n una fila, n+1 corte, n+2 marcas, n+3 veredicto. */
TPL['command-splitter'] = {
  def: {
    kicker: 'bashSeguro()', title: 'Mirar el principio [[no basta]]',
    rows: [
      { parts: [{ t: 'ls', ok: true }, { t: 'rm -rf', ok: false }], seps: ['&&'], naive: 'empieza por ls', verdict: 'pregunta', tone: 'am' },
      { parts: [{ t: 'cat algo > fichero', ok: false, why: 'redirección' }], seps: [], naive: 'empieza por cat', verdict: 'pregunta', tone: 'am' },
    ],
  },
  html(d, H) {
    const n = d.rows.length, pitch = n === 1 ? 440 : n === 2 ? 330 : 224, ph = pitch - 30, X0 = 170, cut = n + 1, mark = n + 2, ver = n + 3;
    const rows = d.rows.map((r, k) => {
      const top = 316 + k * pitch, mid = top + ph / 2;
      const cmd = r.parts.map((p, j) => p.t + (j < r.seps.length ? ` ${r.seps[j]} ` : '')).join('');
      const fs = Math.min(52, Math.floor(640 / (cmd.length * 0.6))), cw = fs * 0.6;
      let pos = 0; const seps = [];
      r.parts.forEach((p, j) => { pos += p.t.length; if (j < r.seps.length) { seps.push(pos + 1 + r.seps[j].length / 2); pos += r.seps[j].length + 2; } });
      const line = r.parts.map((p, j) => H.esc(p.t) + (j < r.seps.length ? ` <span class="cy">${H.esc(r.seps[j])}</span> ` : '')).join('');
      const head = r.parts[0].t.split(' ')[0].length, lh = Math.round(fs * 1.25), cmdTop = mid - (lh + 56) / 2;
      const cuts = seps.map(c => `<div class="abs r" data-i="${cut}" style="left:${Math.round(X0 + c * cw - 2)}px;top:${cmdTop - 12}px;width:4px;height:${lh + 24}px;background:repeating-linear-gradient(var(--red) 0 10px, transparent 10px 18px)"></div>`).join('');
      const m = r.parts.length, chH = 62, gap = n === 3 ? 6 : 14, cTop = mid - (m * chH + (m - 1) * gap) / 2;
      const chips = r.parts.map((p, j) => `<div class="abs r" data-i="${cut}" style="left:900px;top:${cTop + j * (chH + gap)}px"><span class="chip" style="font-size:28px;white-space:nowrap">${H.esc(p.t)}<span class="r ${p.ok ? 'ok' : 'bad'}" data-i="${mark}" style="margin-left:16px;font-weight:700">${p.ok ? '✓' : '✕'}${p.why ? ' ' + H.esc(p.why) : ''}</span></span></div>`).join('');
      const tone = r.tone === 'ok' ? 'ok' : 'amber';
      return `<div class="g r" data-i="${k + 1}" style="left:120px;top:${top}px;width:1680px;height:${ph}px;padding:0"></div>
<div class="abs mono r" data-i="${k + 1}" style="left:${X0}px;top:${cmdTop}px;font-size:${fs}px;line-height:${lh}px;white-space:pre;color:var(--ink)">${line}</div>
<div class="abs r" data-i="${k + 1}" style="left:${X0}px;top:${cmdTop + lh + 2}px;width:${Math.round(head * cw)}px;height:4px;background:var(--amber)"></div>
<div class="abs r" data-i="${k + 1}" style="left:${X0}px;top:${cmdTop + lh + 18}px"><span class="mono am" style="font-size:26px">${H.A(r.naive)} ✓</span></div>
${cuts}<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3"><path class="draw" data-i="${cut}" d="M820 ${mid} H880"/></svg>${chips}
<div class="abs r" data-i="${ver}" style="left:1440px;top:${mid - 34}px;width:320px;text-align:right"><span class="pill" style="font-size:30px;color:var(--${tone});border-color:var(--${tone})">→ ${H.A(r.verdict)}</span></div>`;
    }).join('\n');
    return `${H.HEAD(d)}\n${rows}`;
  },
};
