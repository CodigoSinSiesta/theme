/* config · panel de ajustes con desplegables, valores e interruptores; una fila por paso y botón final.
   Datos: kicker, title, rows[] = { label, v? (texto del desplegable, añade ▾ si `menu`), menu?, w? (ancho mín.), tog?: true, on? }, button. 3–6 filas. */
TPL.config = {
  def: {
    kicker: 'Ajustes', title: 'Settings → Model → [[Subagents]]', button: 'Apply',
    rows: [
      { label: 'Proveedor', v: 'Anthropic', menu: true },
      { label: 'Modelo', v: 'sonnet', menu: true },
      { label: 'Límite de pasos', v: '30', w: 140 },
      { label: 'Subagentes en paralelo', tog: true, on: true },
      { label: 'Pedir confirmación', tog: true },
    ],
  },
  html(d, H) {
    const n = d.rows.length, last = n - 1, ph = Math.max(530, 106 * n);
    const rows = d.rows.map((r, i) => `<div class="r flex" data-i="${i + 1}" style="justify-content:space-between;padding:${r.tog ? 26 : 22}px 44px${i < last ? ';border-bottom:1px solid var(--line)' : ''}"><span class="s">${H.esc(r.label)}</span>${r.tog ? `<span class="tog${r.on ? ' yes' : ''}"></span>` : `<span class="sel"${r.w ? ` style="min-width:${r.w}px;text-align:center"` : ''}>${H.esc(r.v)}${r.menu ? ' ▾' : ''}</span>`}</div>`).join('');
    return `${H.HEAD(d)}
<div class="g" style="left:360px;top:330px;width:1200px;height:${ph}px;padding:0;overflow:hidden">${rows}</div>
<div class="abs r" data-i="${n + 1}" style="left:1400px;top:${330 + ph + 30}px"><span class="chip" style="background:var(--cyan);color:#0f172a;font-weight:700;border-color:var(--cyan);box-shadow:0 0 30px rgba(96,165,250,.5)">${H.esc(d.button)}</span></div>`;
  },
};
