/* matrix · tabla comparativa N×M. Cada fila entra en un paso (beats[i-1]).
   Datos: kicker, title, cols[] (4 máx. recomendado), rows[] = { name, lit?, logo?, cells[] }.
   Celda: 'ok' → ✓ verde · 'no' → ✗ rojo · cualquier otro texto → ámbar. Hasta 6 filas. */
TPL.matrix = {
  def: {
    kicker: 'Comparativa', title: 'Qué hace [[cada herramienta]]',
    cols: ['Skills', 'Subagentes', 'MCP', 'Memoria'],
    rows: [
      { name: 'Pi', cells: ['ok', 'no', 'ok', 'plugin'] },
      { name: 'Hermes', lit: true, cells: ['ok', 'ok', 'ok', 'ok'] },
      { name: 'Claude Code', cells: ['ok', 'ok', 'ok', 'fichero'] },
      { name: 'Codex', cells: ['parcial', 'no', 'ok', 'no'] },
    ],
  },
  html(d, H) {
    const cell = c => c === 'ok' ? '<td align="center" class="ok">✓</td>' : c === 'no' ? '<td align="center" class="bad">✗</td>' : `<td align="center" class="am">${H.esc(c)}</td>`;
    const rows = d.rows.map((r, i) => `<tr class="r" data-i="${i + 1}"${r.lit ? ' style="background:rgba(96,165,250,.14)"' : ''}>`
      + `<td style="padding:22px 18px;font-weight:700;font-family:var(--disp)"${r.lit ? ' class="cy"' : ''}>${r.logo ? `<span class="flex" style="gap:16px">${H.ICO(r.logo, 52)}${H.esc(r.name)}</span>` : H.esc(r.name)}</td>`
      + r.cells.map(cell).join('') + '</tr>').join('');
    return `${H.HEAD(d)}
<div class="g" style="left:120px;top:340px;width:1680px;padding:14px 20px"><table style="width:100%;border-collapse:collapse;font:500 34px var(--body)">
<tr class="k" style="text-align:center"><td style="text-align:left;padding:18px"></td>${d.cols.map(c => `<td>${H.esc(c)}</td>`).join('')}</tr>${rows}</table></div>`;
  },
};
