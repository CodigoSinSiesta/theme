/* diff · dos paneles de código (antes / después) con líneas resaltadas; uno por paso.
   Datos: kicker, title, before / after = { label, lines[] } (marca un tramo con [[...]]; rojo en antes, verde en después). Hasta ~9 líneas por panel. */
TPL.diff = {
  def: {
    kicker: 'Cambio', title: 'Un prompt, [[antes y después]]',
    before: { label: 'antes · SKILL.md', lines: ['---', 'name: informe', 'description: [[Hace informes]]', '---', 'Escribe el informe.', '[[Usa el formato que quieras.]]'] },
    after: { label: 'después · SKILL.md', lines: ['---', 'name: informe', 'description: [[Genera el informe semanal en PDF]]', '---', 'Escribe el informe.', '[[Usa la plantilla de assets/.]]'] },
  },
  html(d, H) {
    const pane = (p, i, left, w, lit, bg, fg) => `<div class="g${lit ? ' lit' : ''} r" data-i="${i}" style="left:${left}px;top:340px;width:${w}px;height:560px;padding:0;overflow:hidden"><div class="k" style="padding:18px 28px;border-bottom:1px solid var(--line)">${H.esc(p.label)}</div>
<pre class="mono" style="font-size:27px;line-height:1.7;padding:22px 28px;color:var(--pale);white-space:pre-wrap">${p.lines.map(l => H.esc(l).replace(/\[\[(.+?)\]\]/g, `<span style="background:${bg};color:${fg}">$1</span>`)).join('\n')}</pre></div>`;
    return H.HEAD(d) + '\n' + pane(d.before, 1, 120, 800, false, 'rgba(248,113,113,.22)', '#fecaca') + '\n' + pane(d.after, 2, 980, 820, true, 'rgba(52,211,153,.2)', '#a7f3d0');
  },
};
