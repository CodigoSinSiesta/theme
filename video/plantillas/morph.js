/* morph · un mismo bloque de texto que pasa de un estado al siguiente (el anterior sale al entrar el siguiente).
   Datos: kicker, title, file (cabecera), head (primera línea fija), states[] = { label, tone: 'bad'|'ok'|'' , lines[] }. 2–3 estados, hasta ~5 líneas. */
TPL.morph = {
  def: {
    kicker: 'Transformación', title: 'El mismo prompt, [[mejorado]]', file: 'SKILL.md', head: 'description:',
    states: [
      { label: '① así está hoy', tone: 'bad', lines: ['Hace informes'] },
      { label: '② así debería estar', tone: 'ok', lines: ['Genera el informe semanal en PDF.', 'Úsala cuando pidan «informe» o', '«resumen de la semana».'] },
    ],
  },
  html(d, H) {
    const n = d.states.length;
    const pre = d.states.map((s, i) => `<pre class="mono r" ${i ? `data-i="${i + 1}"` : ''}${i < n - 1 ? ` data-off="${i + 2}"` : ''} style="position:absolute;left:0;top:70px;font-size:34px;line-height:1.7;padding:26px 40px;color:var(--pale);white-space:pre-wrap">${H.esc(d.head)}
  <span class="${s.tone || ''}">${s.lines.map(H.esc).join('\n  ')}</span></pre>`).join('');
    const labs = d.states.map((s, i) => `<div class="abs k${i === n - 1 ? ' cy' : ''} r" data-i="${i + 1}"${i < n - 1 ? ` data-off="${i + 2}"` : ''} style="left:360px;top:890px">${H.esc(s.label)}</div>`).join('');
    return `${H.HEAD(d)}
<div class="g" style="left:360px;top:340px;width:1200px;height:520px;padding:0;overflow:hidden"><div class="k" style="padding:18px 30px;border-bottom:1px solid var(--line)">${H.esc(d.file)}</div>${pre}</div>${labs}`;
  },
};
