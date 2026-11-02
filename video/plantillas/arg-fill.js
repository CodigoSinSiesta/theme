/* arg-fill · vídeo 06 · una línea de template con hueco ${1:-…}: con argumento se rellena, sin él sale el valor por defecto; abajo, las demás variables.
   Datos: kicker, title, file, line = { pre, def, post }, withArg = { label, cmd, arg }, noArg = { label, cmd }, quote, vars[] = { c, t } (1–3).
   Pasos: 1 línea, 2 con argumento, 3 sin argumento, 4… una variable por paso, último las comillas. Comando con argumento ≤ 40 caracteres. */
TPL['arg-fill'] = {
  def: {
    kicker: 'Sustituciones', title: 'El argumento, [[o el valor por defecto]]',
    file: 'review.md',
    line: { pre: 'Céntrate en ', def: 'errores, casos límite y pruebas que falten', post: '.' },
    withArg: { label: 'con argumento', cmd: '/review', arg: 'las pruebas y los comentarios' },
    noArg: { label: 'sin argumento', cmd: '/review' },
    quote: 'entre comillas: un solo argumento',
    vars: [{ c: '$1  $2  …', t: 'argumentos sueltos' }, { c: '$@', t: 'todos juntos' }, { c: '${@:2}', t: 'rangos' }],
  },
  html(d, H) {
    const L = d.line, nv = d.vars.length, cw = 26 * 0.6;
    const yA = 480, yB = 680, rowH = 120;
    const row = (y, i, label, cmd, out) => `<div class="g r" data-i="${i}" style="left:120px;top:${y}px;width:720px;height:${rowH}px;padding:18px 30px"><div class="k" style="font-size:22px">${H.esc(label)}</div><div class="mono" style="font-size:26px;margin-top:14px;white-space:nowrap">${cmd}</div></div>
<div class="abs t cy r" data-i="${i}" style="left:858px;top:${y + 30}px;font-size:48px">→</div>
<div class="g lit r" data-i="${i}" style="left:930px;top:${y}px;width:870px;height:${rowH}px;padding:0 30px;display:flex;align-items:center"><span class="s" style="font-size:28px;color:var(--ink)">${out}</span></div>`;
    const A = d.withArg, q = `"${A.arg}"`;
    const cmdA = `${H.esc(A.cmd)} <span class="cy">${H.esc(q)}</span>`;
    const qx = 150 + (A.cmd.length + 1) * cw, qw = q.length * cw;
    const gap = 40, vw = (1680 - (nv - 1) * gap) / nv;
    const vars = d.vars.map((v, k) => `<div class="g r" data-i="${k + 4}" style="left:${120 + k * (vw + gap)}px;top:880px;width:${vw}px;height:100px;padding:0 30px;display:flex;align-items:center;gap:26px"><span class="mono cy" style="font-size:32px;font-weight:700;white-space:nowrap">${H.esc(v.c)}</span><span class="s" style="font-size:26px">${H.esc(v.t)}</span></div>`).join('');
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:1680px;height:110px;padding:0 34px;display:flex;align-items:center;gap:34px"><span class="k" style="font-size:22px;white-space:nowrap">${H.esc(d.file)}</span>
<span class="mono" style="font-size:30px;white-space:nowrap">${H.esc(L.pre)}<span style="color:var(--cyan);background:rgba(96,165,250,.16);border-radius:10px;padding:6px 10px">\${1:-<span class="am">${H.esc(L.def)}</span>}</span>${H.esc(L.post)}</span></div>
${row(yA, 2, A.label, cmdA, `${H.esc(L.pre)}<b class="cy">${H.esc(A.arg)}</b>${H.esc(L.post)}`)}
${row(yB, 3, d.noArg.label, H.esc(d.noArg.cmd), `${H.esc(L.pre)}<b class="am">${H.esc(L.def)}</b>${H.esc(L.post)}`)}
${vars}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3"><path class="draw" data-i="${nv + 4}" d="M${qx} ${yA + rowH + 6} v12 H${qx + qw} v-12"/></svg>
<div class="abs mono cy r" data-i="${nv + 4}" style="left:${qx}px;top:${yA + rowH + 24}px;font-size:22px;white-space:nowrap">${H.esc(d.quote)}</div>`;
  },
};
