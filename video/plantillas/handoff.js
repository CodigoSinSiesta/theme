/* handoff · un agente entrega contexto a otro y recibe el resultado (4 pasos).
   Datos: kicker, title, from/to = { glyph (director sub tool user model file vps), name, sub }, context = { label, lines[] }, result. */
TPL.handoff = {
  def: {
    kicker: 'Relevo', title: 'Pasar el trabajo [[con contexto]]',
    from: { glyph: 'director', name: 'Director', sub: 'planifica' },
    to: { glyph: 'tool', name: 'Ejecutor', sub: 'trabaja' },
    context: { label: 'contexto', lines: ['objetivo: arreglar login', 'ficheros: auth/*.py', 'límite: no tocar la BD'] },
    result: 'resultado + resumen',
  },
  html(d, H) {
    const side = (n, i, x) => `<div class="g r" data-i="${i}" style="left:${x}px;top:400px;width:480px;height:360px;text-align:center">${H.GLYPH(n.glyph, 90)}<div class="t" style="margin-top:16px">${H.A(n.name)}</div><div class="k" style="margin-top:8px">${H.A(n.sub)}</div></div>`;
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<line class="draw" data-i="2" x1="600" y1="580" x2="720" y2="580"/><line class="draw" data-i="3" x1="1200" y1="580" x2="1320" y2="580"/></svg>
${side(d.from, 1, 120)}
<div class="g lit r" data-i="2" style="left:720px;top:470px;width:480px;height:220px"><div class="k cy">${H.A(d.context.label)}</div><div class="mono" style="font-size:25px;line-height:1.8;margin-top:10px;color:var(--pale)">${d.context.lines.map(H.esc).join('<br>')}</div></div>
${side(d.to, 3, 1320)}
<div class="g r" data-i="4" style="left:720px;top:780px;width:480px;padding:18px 30px"><span class="ok mono" style="font-size:40px;vertical-align:middle">←</span> <span class="s" style="font-size:27px;vertical-align:middle">${H.A(d.result)}</span></div>`;
  },
};
