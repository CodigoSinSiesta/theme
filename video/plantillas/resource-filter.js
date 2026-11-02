/* resource-filter · vídeo 09 · qué carga cada filtro de un paquete: arriba lo que el paquete declara y, por fila, el valor del
   filtro y los recursos que quedan encendidos. Datos: kicker, title, pkg, key, items[] (2–4), rows[] = { v, t, keep[] (booleanos, uno por
   item) } (2–5), note. Pasos: 1 lo declarado, 2…n+1 una fila, n+2 la nota. */
TPL['resource-filter'] = {
  def: {
    kicker: 'Filtros en settings.json', title: 'Los filtros [[solo estrechan]]',
    pkg: 'csn-extensiones declara', key: 'extensions',
    items: ['hola.ts', 'tests.ts', 'permisos.ts'],
    rows: [
      { v: 'sin la clave', t: 'lo carga todo', keep: [true, true, true] },
      { v: '[]', t: 'no carga nada', keep: [false, false, false] },
      { v: '["*.ts", "!tests.ts"]', t: 'excluye un patrón', keep: [true, false, true] },
      { v: '["-hola.ts"]', t: 'quita una ruta', keep: [false, true, true] },
    ],
    note: 'No pueden cargar [[nada que el paquete no declare]].',
  },
  html(d, H) {
    const m = d.items.length, n = d.rows.length, cw = m > 3 ? 180 : 230, gx = 20, X = 1800 - m * cw - (m - 1) * gx;
    const pitch = n > 4 ? 92 : 108, rh = pitch - 16, y0 = 448;
    const head = d.items.map((t, j) => `<div class="abs flex" style="left:${X + j * (cw + gx)}px;top:330px;width:${cw}px;height:70px;justify-content:center;border-radius:12px;border:1.5px solid var(--cyan);background:rgba(30,58,138,.38)"><span class="mono" style="font-size:26px">${H.esc(t)}</span></div>`).join('');
    const rows = d.rows.map((r, i) => { const y = y0 + i * pitch;
      const cells = d.items.map((t, j) => r.keep[j]
        ? `<div class="abs flex" style="left:${X + j * (cw + gx)}px;top:${y}px;width:${cw}px;height:${rh}px;justify-content:center;border-radius:12px;border:1.5px solid var(--ok);background:rgba(52,211,153,.12)"><span class="mono ok" style="font-size:26px">✓ ${H.esc(t.replace(/\.ts$/, ''))}</span></div>`
        : `<div class="abs flex" style="left:${X + j * (cw + gx)}px;top:${y}px;width:${cw}px;height:${rh}px;justify-content:center;border-radius:12px;border:1.5px dashed var(--line)"><span class="mono" style="font-size:26px;color:var(--pale3)">—</span></div>`).join('');
      return `<div class="r" data-i="${i + 2}"><div class="abs flex" style="left:120px;top:${y}px;width:500px;height:${rh}px;padding:0 24px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line)"><span class="mono cy" style="font-size:28px">${H.esc(r.v)}</span></div>
<div class="abs flex" style="left:650px;top:${y}px;height:${rh}px;width:${X - 680}px"><span class="s" style="font-size:28px">${H.A(r.t)}</span></div>${cells}</div>`; }).join('\n');
    return `${H.HEAD(d)}
<div class="r" data-i="1"><div class="abs flex" style="left:120px;top:330px;height:70px;gap:18px">${H.GLYPH('cube', 40)}<span class="k" style="font-size:22px">${H.A(d.pkg)}</span></div>
<div class="abs flex" style="left:120px;top:404px;height:30px"><span class="mono" style="font-size:22px;color:var(--pale3)">"${H.esc(d.key)}":</span></div>${head}</div>
${rows}
<div class="g lit r" data-i="${n + 2}" style="left:120px;top:${y0 + n * pitch + 10}px;width:1680px;height:84px;padding:0 34px;display:flex;align-items:center"><span class="s" style="font-size:30px;color:var(--ink)">${H.A(d.note)}</span></div>`;
  },
};
