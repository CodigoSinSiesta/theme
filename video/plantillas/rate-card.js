/* rate-card · tarifa de lista frente a efectiva. Datos: kicker, title, cols[3], rows[] = { logo?, name, list, eff, lit?, struck? } (struck tacha la de lista),
   footer con [[acento]]. Una fila por paso, el pie al final. 1–4 filas. */
TPL['rate-card'] = {
  def: {
    kicker: 'Tarifas', title: 'Lo que dice el catálogo y [[lo que pagas]]',
    cols: ['Modelo', 'Lista · entrada / salida', 'Efectiva · entrada / salida'],
    rows: [
      { logo: 'deepseek', name: 'deepseek-flash', list: '0,30 / 1,20 $', eff: '0,30 / 1,20 $' },
      { logo: 'deepseek', name: 'deepseek-v4-pro', list: '1,32 / 3,96 $', eff: '0,30 / 1,20 $', lit: true, struck: true },
    ],
    footer: 'El capaz sale [[al precio del rápido]] desde el 14-09-2026.',
  },
  html(d, H) {
    const n = d.rows.length;
    const rows = d.rows.map((r, i) => `<tr class="r" data-i="${i + 1}"${r.lit ? ' style="background:rgba(96,165,250,.14)"' : ''}><td style="padding:30px 18px"><span class="flex" style="gap:18px">${r.logo ? H.ICO(r.logo, 60) : ''}<b style="font-family:var(--disp)"${r.lit ? ' class="cy"' : ''}>${H.esc(r.name)}</b></span></td>`
      + `<td align="center" class="mono"${r.struck ? ' style="text-decoration:line-through;text-decoration-color:var(--red);color:var(--pale3)"' : ''}>${H.esc(r.list)}</td><td align="center" class="mono ok">${H.esc(r.eff)}</td></tr>`).join('');
    const foot = H.esc(d.footer).replace(/\[\[(.+?)\]\]/g, '<span class="cy">$1</span>');
    return `${H.HEAD(d)}
<div class="g" style="left:120px;top:340px;width:1680px;padding:14px 20px"><table style="width:100%;border-collapse:collapse;font:500 32px var(--body)">
<tr class="k"><td style="padding:18px">${H.esc(d.cols[0])}</td><td align="center">${H.esc(d.cols[1])}</td><td align="center">${H.esc(d.cols[2])}</td></tr>${rows}</table></div>
<div class="abs r" data-i="${n + 1}" style="left:120px;top:${450 + n * 120}px;font:700 40px var(--disp)">${foot}</div>`;
  },
};
