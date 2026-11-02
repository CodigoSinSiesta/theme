/* hung-check · vídeo 24 · una verificación que no termina no ha pasado: dos ejecuciones de referencia (0 pasa, 1 falla)
   y una que se cuelga, choca con el tiempo agotado, vuelve sin código de salida y la puerta la trata como fallo.
   Datos: kicker, title, head = { run, code, gate }, refs[2] = { code, t, ok }, hung = { k, wall, code, sub, t }, note.
   Pasos: 1 se cuelga, 2 tiempo agotado, 3 sin código, 4 fallo y nota. */
TPL['hung-check'] = {
  def: {
    kicker: 'puerta.ts · pi.exec', title: 'Si no termina, [[no ha pasado]]',
    head: { run: 'pi.exec · ./verificar.sh', code: 'código', gate: 'la puerta' },
    refs: [{ code: '0', t: 'pasa', ok: true }, { code: '1', t: 'falla', ok: false }],
    hung: { k: 'se cuelga', wall: 'tiempo agotado', code: '—', sub: 'Pi no devuelve código', t: 'fallo' },
    note: 'Una verificación que no termina no ha pasado.',
  },
  html(d, H) {
    const cell = (x, w, y, h, inner, cls = 'g', i = '', extra = '') => `<div class="${cls}${i !== '' ? ' r' : ''}"${i !== '' ? ` data-i="${i}"` : ''} style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;padding:0 28px;display:flex;align-items:center;gap:16px;${extra}">${inner}</div>`;
    const ref = (r, k) => { const y = 380 + k * 120, w = 300 + k * 140;
      return `<i style="position:absolute;left:120px;top:${y + 33}px;width:${w}px;height:24px;border-radius:12px;background:rgba(96,165,250,.45)"></i>
${cell(1160, 220, y, 90, `<span class="mono ${r.ok ? 'ok' : 'bad'}" style="font-size:36px;font-weight:700">${H.esc(r.code)}</span>`)}
${cell(1430, 370, y, 90, `${H.GLYPH(r.ok ? 'check-circle' : 'x-circle', 38, r.ok ? 'ok' : 'bad')}<span class="s" style="font-size:30px;color:var(--ink)">${H.A(r.t)}</span>`)}`; };
    return `${H.HEAD(d)}
<div class="abs k" style="left:120px;top:326px">${H.esc(d.head.run)}</div>
<div class="abs k" style="left:1188px;top:326px">${H.A(d.head.code)}</div>
<div class="abs k" style="left:1458px;top:326px">${H.A(d.head.gate)}</div>
<div style="opacity:.6">${d.refs.map(ref).join('')}</div>
<div class="abs k am r" data-i="1" style="left:120px;top:628px">${H.A(d.hung.k)}</div>
<i class="bx" data-i="1" style="position:absolute;left:120px;top:672px;width:880px;height:24px;border-radius:12px;background:linear-gradient(90deg,rgba(251,191,36,.35),rgba(251,191,36,.85))"></i>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none"><path class="draw" data-i="2" d="M1010 610 V780" stroke="#fbbf24" stroke-width="4" stroke-dasharray="12 8"/></svg>
<div class="abs flex r" data-i="2" style="left:640px;top:726px;gap:12px">${H.GLYPH('clock', 34, 'am')}<span class="k am">${H.A(d.hung.wall)}</span></div>
${cell(1160, 220, 620, 130, `<div><div class="mono" style="font-size:36px;font-weight:700;color:var(--pale3)">${H.esc(d.hung.code)}</div></div>`, 'g', 3)}
<div class="abs s r" data-i="3" style="left:1050px;top:770px;width:360px;font-size:24px;text-align:right">${H.A(d.hung.sub)}</div>
${cell(1430, 370, 620, 130, `${H.GLYPH('x-circle', 44, 'bad')}<span class="s bad" style="font-size:34px">${H.A(d.hung.t)}</span>`, 'g', 4, 'border-color:var(--red)')}
<div class="g lit r" data-i="4" style="left:120px;top:850px;width:1680px;height:100px;padding:0 34px;display:flex;align-items:center"><span class="s" style="font-size:32px;color:var(--ink)">${H.A(d.note)}</span></div>`;
  },
};
