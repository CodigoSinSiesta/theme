/* cache-warming · una barra por petición, hecha de segmentos proporcionales; los segmentos crecen con su fila.
   Datos: kicker, title, rows[] = { label, segs[] = { kind: 'write'|'cache'|'new', v } }, notes[] = { row, at?, dy?, text, kind: 'am'|'cy' }
   (text admite \n; se muestra con la fila `at`, por defecto `row`), legend[] (2 chips). 3–5 filas; la barra más larga mide 1100 px. */
TPL['cache-warming'] = {
  def: {
    kicker: 'Caché', title: 'El prefijo se paga [[una vez]]',
    rows: [
      { label: 'petición 1', segs: [{ kind: 'write', v: 1100 }] },
      { label: 'petición 2', segs: [{ kind: 'cache', v: 1000 }, { kind: 'new', v: 100 }] },
      { label: 'petición 3', segs: [{ kind: 'cache', v: 1000 }, { kind: 'new', v: 100 }] },
      { label: 'petición 4', segs: [{ kind: 'cache', v: 1000 }, { kind: 'new', v: 100 }] },
    ],
    notes: [
      { row: 0, dy: 14, text: 'escribe en caché', kind: 'am' },
      { row: 1, at: 3, dy: 60, text: 'lee de caché\n≈ 91 %', kind: 'cy' },
    ],
    legend: ['prefijo cacheado', 'lo nuevo'],
  },
  html(d, H) {
    const tot = r => r.segs.reduce((a, s) => a + s.v, 0), mx = Math.max(...d.rows.map(tot)), k = 1100 / mx;
    const sty = { write: 'background:rgba(251,191,36,.45);border:1.5px solid var(--amber)', cache: 'background:rgba(96,165,250,.3);border:1.5px solid var(--cyan)', new: 'background:var(--cyan)' };
    let out = '';
    d.rows.forEach((r, i) => {
      const top = 400 + i * 100; let x = 400;
      out += `<div class="abs k" style="left:120px;top:${top + 20}px">${H.A(r.label)}</div>`;
      r.segs.forEach((s, j) => {
        const w = Math.round(s.v * k), a = j === 0, z = j === r.segs.length - 1;
        out += `<i class="bx" data-i="${i + 1}" style="position:absolute;left:${x}px;top:${top}px;width:${w}px;height:64px;border-radius:${a ? 12 : 0}px ${z ? 12 : 0}px ${z ? 12 : 0}px ${a ? 12 : 0}px;${sty[s.kind] || sty.cache}"></i>`;
        x += w;
      });
    });
    const nx = 400 + Math.round(mx * k) + 20;
    (d.notes || []).forEach(o => {
      const multi = /\n/.test(o.text), txt = H.A(o.text).replace(/\n/g, '<br>');
      out += `<div class="abs mono ${o.kind === 'am' ? 'am' : 'cy'} r" data-i="${(o.at != null ? o.at : o.row) + 1}" style="left:${nx}px;top:${400 + o.row * 100 + (o.dy || 0)}px;font-size:24px${multi ? ';line-height:2' : ''}">${txt}</div>`;
    });
    const lg = d.legend || [];
    if (lg.length) out += `<div class="abs flex r" data-i="${d.rows.length + 1}" style="left:400px;top:${400 + d.rows.length * 100 + 30}px;gap:36px">`
      + lg.map((t, i) => `<span class="flex mono" style="gap:12px;font-size:24px"><i style="width:24px;height:24px;${i ? 'background:var(--cyan)' : 'background:rgba(96,165,250,.4);border:1.5px solid var(--cyan)'};border-radius:6px"></i>${H.A(t)}</span>`).join('') + '</div>';
    return `${H.HEAD(d)}\n${out}`;
  },
};
