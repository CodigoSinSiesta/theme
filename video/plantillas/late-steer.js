/* late-steer · vídeo 02 · una carrera contra el reloj: el modelo acaba antes de que llegue la corrección, que entra como un
   mensaje normal en vez de como steering. Datos: kicker, title, lanes = { model, us }, at (segundos de la corrección), msg,
   work[] = { t, w, mono?, ok?, join? (mismo paso que la anterior) } (2–4, anchos en px, suma ≤ 1060), late, after = { t, s }, axis = { start, end }.
   Pasos: 1 eje y carriles, 2 la corrección, una por tarea del modelo (3…), luego llegó tarde y mensaje normal. Icono: cpu-chip (modelo). */
TPL['late-steer'] = {
  def: {
    kicker: 'El modelo fue más rápido que nosotros', title: 'La corrección [[llegó tarde]]',
    lanes: { model: 'modelo', us: 'nosotros' }, at: 6,
    msg: '«cambio, el envío es gratis a partir de cuarenta euros, no de cincuenta»',
    work: [{ t: 'escribe los dos ficheros', w: 380 }, { t: 'ejecuta las pruebas', w: 290 }, { t: '5 de 5', w: 160, mono: true, ok: true }, { t: 'terminado', w: 180, ok: true, join: true }],
    late: 'llegó tarde', after: { t: 'mensaje normal', s: 'no como steering' }, axis: { start: '0 s', end: 'después →' },
  },
  html(d, H) {
    const T0 = 320, T6 = 1400, YM = 350, YU = 530, LH = 150, UH = 180;
    let x = T0 + 10, st = 2;
    const blocks = d.work.map(b => { if (!b.join) st++; const h = `<div class="abs r" data-i="${st}" style="left:${x}px;top:${YM + 32}px;width:${b.w - 14}px;height:${LH - 64}px;border-radius:12px;display:grid;place-items:center;padding:0 20px;background:${b.ok ? 'rgba(52,211,153,.14)' : 'rgba(96,165,250,.22)'};border:2px solid ${b.ok ? 'var(--ok)' : 'var(--cyan)'}"><span class="${b.mono ? 'mono ' : ''}${b.ok ? 'ok' : ''}" style="font:${b.mono ? '700 28px var(--mono)' : '500 26px var(--body)'}">${H.A(b.t)}</span></div>`; x += b.w; return h; }).join('');
    const n = st - 2;
    const lane = (y, h, label, icon) => `<div class="g r" data-i="1" style="left:120px;top:${y}px;width:1680px;height:${h}px;padding:0 24px;display:flex;align-items:center;gap:12px">${icon ? H.GLYPH(icon, 30) : ''}<span class="k">${H.A(label)}</span></div>`;
    return `${H.HEAD(d)}
${lane(YM, LH, d.lanes.model, 'cpu-chip')}${lane(YU, UH, d.lanes.us)}
${blocks}
<div class="abs r" data-i="1" style="left:${T6 - 2}px;top:330px;width:4px;height:${YU + UH - 330 + 60}px;background:repeating-linear-gradient(var(--cyan) 0 14px, transparent 14px 26px)"></div>
<div class="abs r" data-i="1" style="left:${T0}px;top:780px;width:${1800 - T0}px;height:3px;background:var(--line)"></div>
<div class="abs k r" data-i="1" style="left:${T0}px;top:796px">${H.A(d.axis.start)}</div>
<div class="abs k cy r" data-i="1" style="left:${T6 - 100}px;top:796px;width:200px;text-align:center">${d.at} s</div>
<div class="abs k r" data-i="1" style="left:1500px;top:796px;width:300px;text-align:right">${H.A(d.axis.end)}</div>
<div class="abs r" data-i="2" style="left:${T6 + 20}px;top:${YU + 14}px;width:${1780 - T6 - 20}px;height:${UH - 28}px;padding:18px 24px;border-radius:12px;background:rgba(251,191,36,.10);border:2px solid var(--amber)"><span class="s" style="font-size:23px;line-height:1.3;color:var(--ink)">${H.A(d.msg)}</span></div>
<div class="abs r" data-i="${n + 3}" style="left:${T6 - 360}px;top:${YU + 62}px;width:330px;text-align:right"><span class="pill" style="display:inline-block;color:var(--amber);border-color:var(--amber)">${H.A(d.late)}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="${n + 4}" d="M1600 ${YU + 12} V${YM + 138}"/><path class="draw" data-i="${n + 4}" d="M1588 ${YM + 150} L1600 ${YM + 138} L1612 ${YM + 150}"/></svg>
<div class="abs r" data-i="${n + 4}" style="left:${T6 + 20}px;top:${YM + 10}px;width:${1780 - T6 - 20}px;height:120px;padding:0 22px;border-radius:12px;border:2px dashed var(--cyan);display:flex;flex-direction:column;justify-content:center"><span class="t" style="font-size:30px">${H.A(d.after.t)}</span><span class="s" style="font-size:24px">${H.A(d.after.s)}</span></div>`;
  },
};
