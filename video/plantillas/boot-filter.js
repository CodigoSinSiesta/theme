/* boot-filter · vídeo 05 · la confianza decide en el arranque y luego deja de contar: con o sin ella, las herramientas
   corren igual con tus permisos; y sessionDir se lee antes de decidir. Datos: kicker, title, phases[2], lanes[2] = { t, ok },
   gate, tools[] (2–4), perms, same, early = { t, s }, boot, notWall. Pasos: 1 carriles y decisión, 2 sesión en marcha,
   3 herramientas, 4 con tus permisos, 5 igual en los dos, 6 sessionDir antes de decidir, 7 filtro de arranque. Icono: user (tu usuario). */
TPL['boot-filter'] = {
  def: {
    kicker: 'La confianza actúa al arrancar', title: 'Decide al arrancar, [[luego no cuenta]]',
    phases: ['arranque', 'sesión en marcha'],
    lanes: [{ t: 'con confianza', ok: true }, { t: 'sin confianza', ok: false }],
    gate: 'confianza', tools: ['read', 'bash', 'edit', 'write'], perms: 'con los permisos de tu usuario',
    same: 'igual, confíes o no', early: { t: 'sessionDir', s: 'se lee antes' },
    boot: 'filtro de arranque', notWall: 'no una frontera',
  },
  html(d, H) {
    const Y = [380, 640], LH = 170, X = 800;              // carriles y frontera entre arranque y sesión
    const lane = (L, j) => {
      const y = Y[j];
      return `<div class="g r" data-i="1" style="left:120px;top:${y}px;width:1680px;height:${LH}px;padding:22px 30px"><div class="k">${H.A(L.t)}</div></div>
<div class="abs r" data-i="1" style="left:490px;top:${y + 30}px;width:270px;height:${LH - 60}px;border-radius:14px;border:2px solid ${L.ok ? 'var(--ok)' : 'var(--red)'};background:rgba(15,23,42,.6);display:flex;align-items:center;justify-content:center;gap:16px">
<span class="mono" style="font-size:26px">${H.A(d.gate)}</span><span class="t ${L.ok ? 'ok' : 'bad'}" style="font-size:44px">${L.ok ? '✓' : '✕'}</span></div>
<div class="abs flex r" data-i="6" style="left:150px;top:${y + 76}px;width:310px;gap:12px"><span class="chip" style="font-size:22px;padding:6px 14px;color:var(--amber);border-color:var(--amber)">${H.esc(d.early.t)}</span><span class="s" style="font-size:22px">${H.A(d.early.s)}</span></div>
<div class="abs flex r" data-i="3" style="left:${X + 40}px;top:${y + 28}px;gap:14px">${d.tools.map(t => `<span class="chip" style="color:var(--ink)">${H.esc(t)}</span>`).join('')}</div>
<div class="abs flex r" data-i="4" style="left:${X + 40}px;top:${y + 100}px;gap:14px">${H.GLYPH('user', 34)}<span class="s" style="font-size:26px">${H.A(d.perms)}</span></div>`;
    };
    return `${H.HEAD(d)}
<div class="abs k r" data-i="1" style="left:150px;top:330px">${H.A(d.phases[0])}</div>
<div class="abs k cy r" data-i="2" style="left:${X + 40}px;top:330px">${H.A(d.phases[1])} →</div>
${d.lanes.map(lane).join('')}
<div class="abs r" data-i="2" style="left:${X - 2}px;top:330px;width:4px;height:520px;background:repeating-linear-gradient(var(--cyan) 0 14px, transparent 14px 26px)"></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
${Y.map(y => `<path class="draw" data-i="2" d="M762 ${y + LH / 2} H${X + 24}"/>`).join('')}</svg>
<div class="abs r" data-i="5" style="left:${X + 40}px;top:${Y[0] + LH + 14}px;width:960px;text-align:center"><span class="pill" style="display:inline-block;color:var(--ink);border-color:var(--cyan)">= ${H.A(d.same)}</span></div>
<div class="abs r" data-i="7" style="left:120px;top:${Y[1] + LH + 30}px;width:${X - 140}px;text-align:center"><span class="pill" style="display:inline-block;color:var(--cyan);border-color:var(--cyan)">${H.A(d.boot)}</span></div>
<div class="abs r" data-i="7" style="left:${X + 40}px;top:${Y[1] + LH + 30}px;width:960px;text-align:center"><span class="pill" style="display:inline-block;color:var(--red);border-color:var(--red)">${H.A(d.notWall)}</span></div>`;
  },
};
