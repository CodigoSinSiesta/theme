/* equation · fórmula visual de términos con glifo (A + B + C = D). Cada operador entra con el término que sigue.
   Datos: kicker, title, terms[] = { glyph (director sub tool user model file vps), name, sub, lit? }, ops[] (n-1 signos). 2–5 términos. */
TPL.equation = {
  def: {
    kicker: 'Definición', title: 'Qué es [[un agente]]', ops: ['+', '+', '='],
    terms: [
      { glyph: 'model', name: 'Modelo', sub: 'piensa' },
      { glyph: 'tool', name: 'Herramientas', sub: 'actúan' },
      { glyph: 'sub', name: 'Bucle', sub: 'repite' },
      { glyph: 'director', name: 'Agente', sub: 'trabaja solo', lit: true },
    ],
  },
  html(d, H) {
    const n = d.terms.length, w = Math.min(330, Math.floor((1680 - (n - 1) * 90) / n));
    const parts = d.terms.map((t, i) => (i ? `<span class="t cy r" data-i="${i + 1}" style="font-size:90px">${H.esc(d.ops[i - 1] || '')}</span>` : '')
      + `<div class="g${t.lit ? ' lit' : ''} r" data-i="${i + 1}" style="position:relative;width:${w}px;height:380px;text-align:center">${H.GLYPH(t.glyph, 110)}<div class="t" style="margin-top:20px;font-size:38px">${H.esc(t.name)}</div><div class="s" style="font-size:24px">${H.esc(t.sub)}</div></div>`).join('');
    return `${H.HEAD(d)}
<div class="abs" style="left:120px;top:380px;width:1680px;display:flex;align-items:center;justify-content:space-between">${parts}</div>`;
  },
};
