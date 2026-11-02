/* diffstat · cambios por fichero con barras de más/menos escaladas a los valores reales (la mayor ocupa 1000 px). Un paso por fichero, y el último el total.
   Datos: kicker, title, files[] = { name, add, del } (1–6), total (texto; por defecto «N ficheros»). Totales +/− calculados. */
TPL.diffstat = {
  def: {
    kicker: 'Cambios', title: 'Qué se llevó [[el commit]]',
    files: [
      { name: 'src/app.py', add: 42, del: 8 },
      { name: 'tests/test_app.py', add: 30, del: 0 },
      { name: 'viejo.py', add: 0, del: 120 },
    ],
    total: '',
  },
  html(d, H) {
    const n = d.files.length, pitch = n > 4 ? 80 : 100;
    const max = Math.max(...d.files.map(f => (f.add || 0) + (f.del || 0)), 1);
    let names = '', rest = '', A = 0, D = 0;
    d.files.forEach((f, i) => {
      const a = f.add || 0, m = f.del || 0, tot = Math.max(a + m, 1), top = 370 + i * pitch;
      A += a; D += m;
      const w = Math.max(24, Math.round((a + m) / max * 1000));
      const bg = !m ? 'var(--ok)' : !a ? 'var(--red)' : `linear-gradient(90deg,var(--ok) ${(a / tot * 100).toFixed(1)}%,var(--red) ${(a / tot * 100).toFixed(1)}%)`;
      names += `<div class="r" data-i="${i + 1}">${H.esc(f.name)}</div>`;
      rest += `<div class="abs mono r" data-i="${i + 1}" style="left:620px;top:${top}px;font-size:28px;line-height:${pitch}px">${a ? `<span class="ok">+${a}</span>` : ''}${a && m ? ' ' : ''}${m ? `<span class="bad">−${m}</span>` : ''}</div>`
        + `<i class="bx" data-i="${i + 1}" style="position:absolute;left:780px;top:${top + 35 - (100 - pitch) / 2}px;width:${w}px;height:30px;background:${bg};border-radius:6px"></i>`;
    });
    const label = d.total || `${n} ${n === 1 ? 'fichero' : 'ficheros'}`;
    return `${H.HEAD(d)}
<div class="abs mono" style="left:120px;top:370px;font-size:30px;line-height:${pitch}px;color:var(--pale)">${names}</div>${rest}
<div class="g lit r" data-i="${n + 1}" style="left:120px;top:${370 + n * pitch + 70}px;width:1680px;height:130px;padding:0 40px;display:flex;align-items:center;gap:40px"><span class="t" style="font-size:36px">${H.esc(label)}</span><span class="mono ok" style="font-size:34px">+${A}</span><span class="mono bad" style="font-size:34px">−${D}</span></div>`;
  },
};
