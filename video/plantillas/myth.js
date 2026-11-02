/* myth · mito tachado frente a realidad, una fila por paso. En `real` usa [[énfasis]] (verde en negrita).
   Datos: kicker, title, tag (etiqueta del mito), rows[] = { myth, real, lit? }. 2–4 filas. */
TPL.myth = {
  def: {
    kicker: 'Mitos', title: 'Lo que se cree y [[lo que pasa]]', tag: 'mito',
    rows: [
      { myth: 'Un agente es solo un chat.', real: 'Un modelo con [[bucle y herramientas]].' },
      { myth: 'Más contexto es siempre mejor.', real: 'Pasado un punto, [[empeora]] la respuesta.' },
      { myth: 'Una skill es un prompt largo.', real: 'Es una carpeta que se [[carga a demanda]].', lit: true },
    ],
  },
  html(d, H) {
    const B = s => H.esc(s).replace(/\[\[(.+?)\]\]/g, '<b class="ok">$1</b>');
    const rows = d.rows.map((r, i) => `<div class="g${r.lit ? ' lit' : ''} r" data-i="${i + 1}" style="left:120px;top:${340 + i * 180}px;width:1680px;height:150px;padding:0 40px;display:flex;align-items:center;gap:40px"><span class="k bad" style="width:100px">${H.esc(d.tag)}</span><span class="s" style="width:640px;text-decoration:line-through;text-decoration-color:var(--red);color:var(--pale3)">${H.esc(r.myth)}</span><span class="cy t">→</span><span class="s" style="margin-left:auto;width:700px;color:var(--ink)">${B(r.real)}</span></div>`).join('');
    return H.HEAD(d) + rows;
  },
};
