/* test-grid · rejilla de casos de test: pasa (p), falla (f), flaky (w). Un paso por fila, y el último la leyenda con los recuentos reales.
   Datos: kicker, title, rows[] (cadenas o arrays de 'p'|'f'|'w', hasta 10 por fila y 7 filas), legend = { p, f, w } (texto tras el número; sin texto no se muestra). */
TPL['test-grid'] = {
  def: {
    kicker: 'Verificación', title: '50 casos, [[tres señales]]',
    rows: ['pppppppppp', 'ppwppppppp', 'ppppfppppp', 'ppppppfppw', 'pppppppppp'],
    legend: { p: 'pasan', f: 'fallan', w: 'flaky: a veces sí, a veces no' },
  },
  html(d, H) {
    const rows = d.rows.map(r => [...r]);
    const cnt = { p: 0, f: 0, w: 0 };
    rows.forEach(r => r.forEach(c => { if (c in cnt) cnt[c]++; }));
    const grid = rows.map((r, i) => `<div class="r" data-i="${i + 1}">${r.map(c => `<i class="cell ${c in cnt ? c : 'p'}"></i>`).join('')}</div>`).join('');
    const leg = ['p', 'f', 'w'].filter(k => d.legend[k]).map((k, i, a) =>
      `<div class="flex" style="gap:16px;${i < a.length - 1 ? 'margin-bottom:20px' : ''}"><i class="cell ${k}" style="margin:0;width:40px;height:40px"></i><span class="s">${cnt[k]} ${H.esc(d.legend[k])}</span></div>`).join('');
    return `${H.HEAD(d)}
<div class="abs" style="left:240px;top:350px;width:1000px">${grid}</div>
<div class="g r" data-i="${rows.length + 1}" style="left:1320px;top:350px;width:480px;height:420px">${leg}</div>`;
  },
};
