/* abrupt-cut · vídeo 23 · la rutina de salida es una instrucción: si la sesión termina bien escribe lo suyo, pero un corte
   de golpe no deja nada; la siguiente sesión lo detecta y reconstruye sin traspaso, y una red automática tiene su propio riesgo.
   Datos: kicker, title, ok = { k, steps[3] }, cut = { k, causes[2], none }, next = { k, checks[2], found, lost, rebuild },
   net = { k, items[2], warn }. Pasos: 1 sesión que termina bien, 2 corte, 3–4 causas, 5 sin rutina, 6 nada escrito,
   7 la siguiente lo detecta, 8 sin traspaso, 9 la red automática. */
TPL['abrupt-cut'] = {
  def: {
    kicker: 'Límite 1', title: 'Son [[instrucciones]]',
    ok: { k: 'hoy · las siguieron', steps: ['trabajo', 'rutina de salida', 'lista · progreso · traspaso · commit'] },
    cut: { k: 'corte de golpe', causes: ['Esc', 'contexto agotado'], none: 'no se escribe nada' },
    next: { k: 'siguiente sesión', checks: ['git status', './init.sh'], found: 'lo detecta', lost: 'traspaso.md', rebuild: 'reconstruye sin traspaso' },
    net: { k: 'Pi · extensiones de ejemplo', items: ['commit al salir', 'vigilar el repo sucio'], warn: 'una red automática tiene que entender bien cuándo actúa' },
  },
  html(d, H) {
    const box = (x, y, w, h, extra = '') => `left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:14px;border:1.5px solid var(--line);background:rgba(15,23,42,.6);${extra}`;
    const node = (x, y, w, t, i, extra = '', cls = '') => `<div class="abs flex r" data-i="${i}" style="${box(x, y, w, 72, 'padding:0 22px;justify-content:center;' + extra)}"><span class="s ${cls}" style="font-size:26px;white-space:nowrap">${H.esc(t)}</span></div>`;
    const yA = 372, yB = 562;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:300px;width:1240px;height:160px"><div class="k ok">${H.esc(d.ok.k)}</div></div>
${node(150, yA, 200, d.ok.steps[0], 1)}${node(410, yA, 290, d.ok.steps[1], 1)}
<div class="abs flex r" data-i="1" style="left:760px;top:${yA}px;gap:14px;height:72px">${H.GLYPH('check-circle', 36, 'ok')}<span class="s ok" style="font-size:26px;white-space:nowrap">${H.esc(d.ok.steps[2])}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<line class="draw" data-i="1" x1="352" y1="${yA + 36}" x2="408" y2="${yA + 36}"/><line class="draw" data-i="1" x1="702" y1="${yA + 36}" x2="756" y2="${yA + 36}"/>
</svg>
<div class="g r" data-i="2" style="left:120px;top:490px;width:1240px;height:220px;border-color:rgba(248,113,113,.55)"><div class="k bad">${H.esc(d.cut.k)}</div></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<line class="draw" data-i="2" x1="380" y1="${yB - 4}" x2="380" y2="${yB + 136}" stroke="#f87171" stroke-width="5"/>
<path class="draw" data-i="7" d="M1362 ${yB + 36} H1404"/></svg>
${node(150, yB, 200, d.ok.steps[0], 2)}
<div class="abs r flex" data-i="3" style="left:150px;top:${yB + 86}px;width:200px;justify-content:center"><span class="chip" style="color:var(--ink);font-size:24px;border-bottom-width:5px">${H.esc(d.cut.causes[0])}</span></div>
<div class="abs r" data-i="4" style="left:410px;top:${yB + 86}px"><span class="chip" style="color:var(--red);font-size:24px">${H.esc(d.cut.causes[1])}</span></div>
${node(410, yB, 290, d.ok.steps[1], 5, 'border:2px dashed rgba(248,113,113,.6);background:none', 'bad')}
<i class="abs r" data-i="5" style="left:420px;top:${yB + 35}px;width:270px;height:3px;background:var(--red)"></i>
<div class="abs flex r" data-i="6" style="left:760px;top:${yB}px;gap:14px;height:72px">${H.GLYPH('x-circle', 36, 'bad')}<span class="s bad" style="font-size:26px;white-space:nowrap">${H.esc(d.cut.none)}</span></div>
<div class="g r" data-i="7" style="left:1404px;top:300px;width:396px;height:410px"><div class="k">${H.esc(d.next.k)}</div>
${d.next.checks.map(c => `<div class="flex" style="gap:12px;margin-top:14px">${H.GLYPH('command-line', 30)}<span class="mono" style="font-size:26px">${H.esc(c)}</span></div>`).join('')}
<div class="s ok" style="font-size:26px;margin-top:10px">${H.esc(d.next.found)}</div>
<div class="r" data-i="8" style="margin-top:22px"><div class="flex" style="gap:12px">${H.GLYPH('document-text', 30, 'bad')}<span class="mono bad" style="font-size:24px;text-decoration:line-through">${H.esc(d.next.lost)}</span></div><div class="s am" style="font-size:24px;margin-top:6px">${H.esc(d.next.rebuild)}</div></div></div>
<div class="g r" data-i="9" style="left:120px;top:740px;width:1680px;height:220px"><div class="k">${H.esc(d.net.k)}</div>
<div class="flex" style="gap:20px;margin-top:20px">${d.net.items.map(t => `<span class="chip">${H.esc(t)}</span>`).join('')}</div>
<div class="flex" style="gap:14px;margin-top:22px"><span style="flex:none">${H.GLYPH('exclamation-triangle', 34, 'am')}</span><span class="s" style="font-size:27px;color:var(--ink)">${H.A(d.net.warn)}</span></div></div>`;
  },
};
