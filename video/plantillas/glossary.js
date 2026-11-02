/* glossary · términos a la izquierda y definición a la derecha; una fila por paso.
   Datos: kicker, title, rows[] = { w (término), s (definición) }. 2–5 filas (cada una ocupa ~130px; 2 líneas de definición máx.). */
TPL.glossary = {
  def: {
    kicker: 'Vocabulario', title: 'Cuatro palabras [[para empezar]]',
    rows: [
      { w: 'harness', s: 'El programa que rodea al modelo: bucle, herramientas y permisos.' },
      { w: 'skill', s: 'Carpeta con instrucciones que el agente carga cuando la necesita.' },
      { w: 'subagent', s: 'Otro agente con su propio contexto al que se le delega una tarea.' },
      { w: 'context', s: 'Lo que el modelo ve en este momento; tiene un límite.' },
    ],
  },
  html(d, H) {
    return `${H.HEAD(d)}<div class="abs" style="left:120px;top:340px;width:1680px">${d.rows.map((r, i) => `<div class="row r" data-i="${i + 1}"${i === d.rows.length - 1 ? ' style="border:0"' : ''}><span class="w">${H.esc(r.w)}</span><span class="s">${H.A(r.s)}</span></div>`).join('')}</div>`;
  },
};
