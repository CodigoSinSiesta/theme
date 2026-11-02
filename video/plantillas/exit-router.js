/* exit-router · vídeo 24 · un bucle que se para por el código de salida de un comando: tras cada vuelta el harness
   lo ejecuta y el código decide (0 para, 1 sigue, otro apaga el bucle); abajo, por qué el script solo sale con 0 o 1.
   Datos: kicker, title, flag, lap = { k, t }, cmd = { k, t }, outs = { stop, more, off } (cada uno { code, t }), back,
   rule = { k, t }, typo = { k, t }, safe. Pasos: 1 opción, 2 vuelta, 3 comando, 4 sale con 0, 5 sale con 1 (vuelve),
   6 otro código, 7 el script solo da 0 o 1, 8 id que no existe, 9 no da verde. */
TPL['exit-router'] = {
  def: {
    kicker: 'Vídeo 15 · /loop --until', title: 'El código de salida [[decide]]',
    flag: '/loop --until ./verificar.sh',
    lap: { k: 'Cada vuelta', t: 'oh my pi reenvía el encargo' },
    cmd: { k: 'Lo ejecuta él', t: './verificar.sh' },
    outs: { stop: { code: '0', t: 'para' }, more: { code: '1', t: 'sigue' }, off: { code: 'otro', t: 'el bucle se apaga' } },
    back: 'otra vuelta',
    rule: { k: 'verificar.sh', t: 'Solo sale con 0 o con 1' },
    typo: { k: 'Un id que no existe', t: 'falla: sale con 1' },
    safe: 'Un error de tecleo no da verde',
  },
  html(d, H) {
    const out = (y, i, o, icon, cls) => `<div class="g r" data-i="${i}" style="left:1240px;top:${y}px;width:560px;height:110px;padding:0 30px;display:flex;align-items:center;gap:22px">
<span class="mono ${cls}" style="font-size:40px;font-weight:700;min-width:96px">${H.esc(o.code)}</span>${H.GLYPH(icon, 40, cls)}<span class="s" style="font-size:30px;color:var(--ink)">${H.A(o.t)}</span></div>`;
    return `${H.HEAD(d)}
<div class="abs r" data-i="1" style="left:120px;top:304px"><span class="chip">${H.esc(d.flag)}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="3" d="M560 480 H680"/>
<path class="draw" data-i="4" d="M1100 480 C1170 480 1170 385 1240 385" stroke="#34d399"/>
<path class="draw" data-i="5" d="M1100 480 C1170 480 1170 665 1240 665" stroke="#fbbf24"/>
<path class="draw" data-i="5" d="M1520 720 V746 H340 V570" stroke="#fbbf24" stroke-dasharray="12 10"/>
<path class="draw" data-i="6" d="M1100 480 C1160 480 1180 525 1240 525" stroke="#f87171"/></svg>
<div class="g r" data-i="2" style="left:120px;top:390px;width:440px;height:180px"><div class="flex k" style="gap:12px">${H.GLYPH('arrow-path', 30)}${H.A(d.lap.k)}</div><div class="s" style="font-size:30px;color:var(--ink);margin-top:14px">${H.A(d.lap.t)}</div></div>
<div class="g lit r" data-i="3" style="left:680px;top:400px;width:420px;height:160px"><div class="k">${H.A(d.cmd.k)}</div><div class="mono" style="font-size:32px;margin-top:18px">${H.esc(d.cmd.t)}</div></div>
${out(330, 4, d.outs.stop, 'stop-circle', 'ok')}
${out(470, 6, d.outs.off, 'power', 'bad')}
${out(610, 5, d.outs.more, 'arrow-path', 'am')}
<div class="abs k am r" data-i="5" style="left:700px;top:700px">${H.A(d.back)}</div>
<div class="g r" data-i="7" style="left:120px;top:790px;width:1680px;height:170px;padding:0;display:flex;align-items:center">
<div style="width:560px;padding:24px 34px"><div class="k">${H.A(d.rule.k)}</div><div class="s" style="font-size:30px;color:var(--ink);margin-top:12px">${H.A(d.rule.t)}</div></div>
<div class="r" data-i="8" style="width:540px;padding:24px 34px;border-left:1.5px solid var(--line)"><div class="k">${H.A(d.typo.k)}</div><div class="s" style="font-size:30px;color:var(--ink);margin-top:12px">${H.A(d.typo.t)}</div></div>
<div class="r flex" data-i="9" style="width:580px;padding:24px 34px;gap:16px;border-left:1.5px solid var(--line)">${H.GLYPH('x-circle', 40, 'bad')}<span class="s" style="font-size:30px;color:var(--ink)">${H.A(d.safe)}</span></div></div>`;
  },
};
