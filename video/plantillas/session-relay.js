/* session-relay · sesión 1 → 1–3 ficheros de traspaso → sesión 2 (curvas calculadas). Paso 1 sesión 1, 2 ficheros, 3 sesión 2.
   Datos: kicker, title, files[] (nombre o { name, icon }; icono por defecto document-text), s1 / s2 = { label, mark, cls, items[] }. */
TPL['session-relay'] = {
  def: { kicker: 'Relevo', title: 'Dos sesiones, [[un mismo hilo]]', files: ['progreso.md', 'traspaso.md'],
    s1: { label: 'sesión 1', mark: '✓', cls: 'ok', items: ['trabaja ticket-001', 'escribe el traspaso', 'cierra'] },
    s2: { label: 'sesión 2', mark: '›', cls: 'cy', items: ['lee el traspaso', 'retoma ticket-002', 'sin que se lo expliques'] } },
  html(d, H) {
    const n = d.files.length, cys = d.files.map((_, i) => 595 + (i - (n - 1) / 2) * 200);
    const sys = d.files.map((_, i) => 630 + (i - (n - 1) / 2) * 140);
    const paths = cys.map((y, i) => `<path class="draw" data-i="2" d="M580 ${sys[i]} C660 ${sys[i]} 660 ${y} 760 ${y}"/>`).join('')
      + cys.map((y, i) => `<path class="draw" data-i="3" d="M1160 ${y} C1250 ${y} 1250 ${sys[i]} 1340 ${sys[i]}"/>`).join('');
    const card = (s, i, left, lit) => `<div class="g${lit ? ' lit' : ''} r" data-i="${i}" style="left:${left}px;top:360px;width:460px;height:540px"><div class="k${lit ? ' cy' : ''}">${H.A(s.label)}</div><div class="s" style="font-size:28px;margin-top:20px;line-height:1.8">${s.items.map(t => `<span class="${s.cls}">${H.esc(s.mark)}</span> ${H.A(t)}`).join('<br>')}</div></div>`;
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${paths}</svg>
${card(d.s1, 1, 120, false)}
${d.files.map((f, i) => `<div class="g r flex" data-i="2" style="left:760px;top:${cys[i] - 55}px;width:400px;height:110px;padding:0 28px;gap:20px">${H.GLYPH(f.icon || 'document-text', 40)}<span class="mono" style="font-size:28px">${H.esc(f.name || f)}</span></div>`).join('\n')}
${card(d.s2, 3, 1340, true)}`;
  },
};
