/* compaction-cut · vídeo 03 · cómo compacta: corte, resumen de lo anterior, entrada con firstKeptEntryId y lo que recibe el modelo.
   Datos: kicker, title, hist = { k, blocks[] (pesos de ancho, 6–14), cut (primer bloque conservado) }, cutLabel, keep, summary = { k, t },
   entry = { k, summary, first }, recv = { k, parts[3] }. Pasos: 1 corte, 2 resumen, 3 entrada, 4 lo que recibe el modelo. */
TPL['compaction-cut'] = {
  def: {
    kicker: 'Cómo compacta', title: 'Cortar, resumir y [[seguir desde el corte]]',
    hist: { k: 'la rama activa', blocks: [70, 110, 90, 140, 80, 120, 100, 90, 130, 80], cut: 6 },
    cutLabel: 'punto de corte', keep: '← tokens que se conservan',
    summary: { k: 'resumen estructurado', t: 'de todo lo anterior al corte' },
    entry: { k: 'entrada compaction', summary: 'summary: el resumen', first: 'firstKeptEntryId' },
    recv: { k: 'lo que recibe el modelo', parts: ['prompt de sistema', 'resumen', 'mensajes desde el corte'] },
  },
  html(d, H) {
    const B = d.hist.blocks, n = B.length, gap = 10, k = (1680 - gap * (n - 1)) / B.reduce((a, b) => a + b, 0);
    let x = 120; const pos = B.map(w => { const p = { x, w: Math.round(w * k) }; x += p.w + gap; return p; });
    const c = Math.max(1, Math.min(n - 1, d.hist.cut)), xc = pos[c].x - gap / 2, xk = pos[c].x + pos[c].w / 2;
    const blocks = pos.map((p, i) => `<div class="abs" style="left:${p.x}px;top:376px;width:${p.w}px;height:66px;border-radius:10px;${i < c ? 'background:rgba(148,163,184,.16);border:1.5px solid var(--line)' : 'background:rgba(96,165,250,.34);border:1.5px solid var(--cyan)'}"></div>`).join('');
    const funnel = pos.slice(0, c).map(p => `<path class="draw" data-i="2" d="M${p.x + p.w / 2} 444 C${p.x + p.w / 2} 520 430 510 430 586"/>`).join('');
    const P = d.recv.parts, pw = [380, 300, 1680 - 380 - 300 - 40];
    let px = 120; const parts = P.map((t, i) => { const s = `<div class="g${i === 2 ? ' lit' : ''}" style="left:${px}px;top:842px;width:${pw[i]}px;height:92px;padding:0 26px;display:flex;align-items:center;${i === 1 ? 'border-color:var(--amber)' : ''}"><span class="s${i === 1 ? ' am' : ''}" style="font-size:28px;${i === 1 ? '' : 'color:var(--ink)'}">${H.A(t)}</span></div>`; px += pw[i] + 20; return s; }).join('');
    return `${H.HEAD(d)}
<div class="abs k" style="left:120px;top:330px">${H.A(d.hist.k)}</div>
${blocks}
<div class="abs r" data-i="1" style="left:${xc - 2}px;top:350px;width:4px;height:120px;background:var(--amber);box-shadow:0 0 16px var(--amber)"></div>
<div class="abs k am r" data-i="1" style="left:${xc - 420}px;top:330px;width:400px;text-align:right">${H.A(d.cutLabel)}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="1" d="M1800 462 V472 H${xc + 6} V462"/>
${funnel}
<path class="draw" data-i="3" d="M740 664 H812"/><path class="draw" data-i="3" d="M798 652 L812 664 L798 676"/>
<path class="draw" data-i="3" d="M${xk} 600 V486" stroke="#fbbf24"/><path class="draw" data-i="3" d="M${xk - 12} 500 L${xk} 486 L${xk + 12} 500" stroke="#fbbf24"/></svg>
<div class="abs k cy r" data-i="1" style="left:${xc + 20}px;top:486px;width:${1780 - xc}px;text-align:right">${H.A(d.keep)}</div>
<div class="g r" data-i="2" style="left:120px;top:586px;width:620px;height:160px;border-color:var(--amber)"><div class="k am">${H.A(d.summary.k)}</div><div class="s" style="margin-top:14px;font-size:28px">${H.A(d.summary.t)}</div></div>
<div class="g lit r" data-i="3" style="left:820px;top:586px;width:980px;height:160px"><div class="k">${H.A(d.entry.k)}</div>
<div class="flex" style="gap:40px;margin-top:20px"><span class="mono" style="font-size:28px">${H.esc(d.entry.summary)}</span><span class="mono am" style="font-size:28px">${H.esc(d.entry.first)} ↑</span></div></div>
<div class="r" data-i="4"><div class="abs k" style="left:120px;top:796px">${H.A(d.recv.k)}</div>${parts}</div>`;
  },
};
