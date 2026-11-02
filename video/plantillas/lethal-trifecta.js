/* lethal-trifecta · vídeo 05 · tres conjuntos que se solapan; en el centro, el peligro; al quitar uno, el centro desaparece.
   Datos: kicker, title, sets[3] = { t, icon (Heroicon), pi }, danger = { label, text }, piLabel, fix = { label, text }, removed (índice del conjunto que se quita).
   Pasos: 1–3 un círculo, 4 peligro, 5–7 una línea de «Pi, tal como viene», 8 se quita un conjunto. */
TPL['lethal-trifecta'] = {
  def: {
    kicker: 'La tríada letal · Simon Willison', title: 'Tres cosas que [[no deben juntarse]]',
    sets: [
      { t: 'Datos privados', icon: 'key', pi: 'Lee tus ficheros' },
      { t: 'Contenido no fiable', icon: 'document-text', pi: 'Lee lo que traiga el repositorio' },
      { t: 'Salida al exterior', icon: 'globe-alt', pi: 'Puede ejecutar curl' },
    ],
    danger: { label: 'si se dan las tres', text: 'Una instrucción inyectada puede leer tus datos y enviarlos fuera.' },
    piLabel: 'Pi, tal como viene', fix: { label: 'defenderse', text: 'Quita al menos una de las tres.' }, removed: 0,
  },
  html(d, H) {
    const C = [[700, 505], [568, 735], [832, 735]], R = 200, mx = 700, my = 658, rm = d.removed;
    const L = [[570, 380, 260], [400, 752, 230], [770, 752, 230]];
    const circles = C.map(([x, y], i) => `<circle class="r" data-i="${i + 1}"${i === rm ? ' data-off="8"' : ''} cx="${x}" cy="${y}" r="${R}" fill="rgba(96,165,250,.10)" stroke="#60a5fa" stroke-width="3"/>`).join('');
    const ghost = `<circle class="r" data-i="8" cx="${C[rm][0]}" cy="${C[rm][1]}" r="${R}" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="10 12"/>`;
    const lab = (s, i, dim) => `<div style="position:absolute;left:${L[i][0]}px;top:${L[i][1]}px;width:${L[i][2]}px;text-align:center;${dim ? 'opacity:.4' : ''}">${H.GLYPH(s.icon, 40)}<div class="t" style="font-size:28px;margin-top:6px">${H.A(s.t)}</div></div>`;
    const labels = d.sets.map((s, i) => `<div class="r" data-i="${i + 1}"${i === rm ? ' data-off="8"' : ''}>${lab(s, i)}</div>`).join('') + `<div class="r" data-i="8">${lab(d.sets[rm], rm, true)}</div>`;
    const rows = d.sets.map((s, i) => `<div class="flex r" data-i="${i + 5}" style="gap:18px;margin-top:${i ? 18 : 22}px">${H.GLYPH(s.icon, 34)}<span class="s" style="font-size:28px">${H.A(s.pi)}</span></div>`).join('');
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080">${circles}${ghost}</svg>
${labels}
<div class="abs r" data-i="4" data-off="8" style="left:${mx - 34}px;top:${my - 34}px;width:68px;height:68px;border-radius:50%;background:rgba(248,113,113,.25);border:2.5px solid var(--red);box-shadow:0 0 30px rgba(248,113,113,.55);display:grid;place-items:center">${H.GLYPH('exclamation-triangle', 38, 'bad')}</div>
<div class="abs r" data-i="8" style="left:${mx - 34}px;top:${my - 34}px;width:68px;height:68px;border-radius:50%;background:rgba(52,211,153,.18);border:2.5px solid var(--ok);display:grid;place-items:center">${H.GLYPH('shield-check', 38, 'ok')}</div>
<div class="g r" data-i="4" style="left:1120px;top:320px;width:680px;height:178px;border-color:var(--red)"><div class="flex" style="gap:14px">${H.GLYPH('exclamation-triangle', 32, 'bad')}<span class="k bad">${H.A(d.danger.label)}</span></div><div class="s" style="font-size:28px;margin-top:12px;color:var(--ink)">${H.A(d.danger.text)}</div></div>
<div class="g r" data-i="5" style="left:1120px;top:526px;width:680px;height:276px"><div class="k">${H.A(d.piLabel)}</div>${rows}</div>
<div class="g lit r" data-i="8" style="left:1120px;top:826px;width:680px;height:134px;border-color:var(--ok)"><div class="flex" style="gap:14px">${H.GLYPH('shield-check', 32, 'ok')}<span class="k ok">${H.A(d.fix.label)}</span></div><div class="s" style="font-size:28px;margin-top:8px;color:var(--ink)">${H.A(d.fix.text)}</div></div>`;
  },
};
