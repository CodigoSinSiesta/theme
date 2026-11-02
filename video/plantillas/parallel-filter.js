/* parallel-filter · vídeo 07 · las dos ventajas de un script de codemode: lanza varias llamadas a la vez y espera a todas,
   y reduce un resultado enorme antes de que entre en el contexto. Datos: kicker, title, par = { k, call, tools[] (2–3), both, join,
   joined }, filt = { k, big, lines (6–12), keep (índices de líneas que se quedan), pick, ctx, ctxNote }, foot. Pasos: 1 script,
   2 llamadas a la vez, 3 espera a todas, 4 resultado enorme, 5 se queda con lo que interesa, 6 contexto, 7 modo por defecto. */
TPL['parallel-filter'] = {
  def: {
    kicker: 'Dos ventajas', title: 'Llamar a la vez, [[devolver poco]]',
    par: { k: '1 · paralelismo', call: 'await Promise.all([ … ])', tools: ['list_directory_with_sizes · src', 'list_directory_with_sizes · test'],
      both: 'a la vez', join: 'espera a todas', joined: 'las dos respuestas, juntas' },
    filt: { k: '2 · filtrado', big: 'resultado enorme', lines: 10, keep: [2, 5, 7, 8], pick: 'el script se queda con lo que interesa',
      ctx: 'contexto del modelo', ctxNote: 'solo eso entra' },
    foot: 'Por eso codemode es el modo [[por defecto]] para MCP',
  },
  html(d, H) {
    const P = d.par, F = d.filt, nt = P.tools.length, ty = i => 520 + i * 92;
    const bars = P.tools.map((t, i) => `<div class="abs flex" style="left:170px;top:${ty(i)}px;width:520px;height:76px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);padding:0 24px"><span class="mono" style="font-size:24px">${H.esc(t)}</span></div>
<i class="abs bx" style="left:712px;top:${ty(i) + 26}px;width:160px;height:24px;border-radius:8px;background:rgba(96,165,250,.55)"></i>`).join('');
    const yEnd = ty(nt - 1) + 76, yJ = yEnd + 30;
    const ln = i => 430 + i * 16, ws = [92, 70, 84, 60, 88, 76, 66, 90, 58, 80, 72, 86];
    const lines = Array.from({ length: F.lines }, (_, i) => `<i class="abs" style="left:1084px;top:${ln(i)}px;width:${ws[i % ws.length] * 6.2}px;height:10px;border-radius:5px;background:rgba(148,163,184,.32)"></i>`).join('');
    const keep = F.keep.map(i => `<i class="abs r" data-i="5" style="left:1084px;top:${ln(i) - 2}px;width:${ws[i % ws.length] * 6.2}px;height:14px;border-radius:6px;background:var(--cyan);box-shadow:0 0 14px rgba(96,165,250,.6)"></i>`).join('');
    const ctx = F.keep.map((i, k) => `<i class="abs" style="left:34px;top:${68 + k * 20}px;width:${ws[i % ws.length] * 6.2}px;height:12px;border-radius:6px;background:var(--cyan)"></i>`).join('');
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:800px;height:570px"><div class="k">${H.esc(P.k)}</div></div>
<div class="g lit r flex" data-i="1" style="left:170px;top:390px;width:700px;height:96px;padding:0 30px;gap:18px">${H.GLYPH('command-line', 36)}<span class="mono" style="font-size:30px">${H.esc(P.call)}</span></div>
<div class="r" data-i="2">${bars}<div class="abs k cy" style="left:712px;top:${ty(0) - 34}px">${H.esc(P.both)}</div></div>
<div class="g r" data-i="3" style="left:170px;top:${yJ}px;width:700px;height:124px;padding:24px 28px"><div class="k cy">${H.esc(P.join)}</div><div class="s" style="margin-top:8px;color:var(--ink)">${H.A(P.joined)}</div></div>
<div class="g r" data-i="4" style="left:1000px;top:320px;width:800px;height:570px"><div class="k">${H.esc(F.k)}</div></div>
<div class="r" data-i="4"><div class="abs k" style="left:1440px;top:352px;width:324px;text-align:right">${H.esc(F.big)}</div>
<div class="abs" style="left:1050px;top:410px;width:700px;height:${ln(F.lines - 1) + 26 - 410}px;border-radius:14px;background:rgba(15,23,42,.6);border:1.5px solid var(--line)"></div>${lines}</div>${keep}
<div class="abs flex r" data-i="5" style="left:1050px;top:${ln(F.lines - 1) + 40}px;width:700px;gap:14px">${H.GLYPH('funnel', 30)}<span class="s" style="font-size:26px">${H.A(F.pick)}</span></div>
<div class="g lit r" data-i="6" style="left:1050px;top:712px;width:700px;height:${68 + F.keep.length * 20 + 16}px;padding:24px 34px"><div class="flex" style="justify-content:space-between"><span class="k cy">${H.esc(F.ctx)}</span><span class="k">${H.esc(F.ctxNote)}</span></div>${ctx}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="3" d="M884 ${ty(0) + 38} L896 ${ty(0) + 38} L896 ${ty(nt - 1) + 38} L884 ${ty(nt - 1) + 38}"/><path class="draw" data-i="3" d="M896 ${ty(nt - 1) + 38} L896 ${yJ + 60} L884 ${yJ + 60}"/><path class="draw" data-i="3" d="M890 ${yJ + 50} L878 ${yJ + 60} L890 ${yJ + 70}"/>
<path class="draw" data-i="5" d="M1400 664 L1400 704"/><path class="draw" data-i="5" d="M1388 690 L1400 704 L1412 690"/></svg>
<div class="abs r" data-i="7" style="left:120px;top:918px;width:1680px;text-align:center"><span class="pill" style="font-family:var(--body);font-size:30px;color:var(--ink)">${H.A(d.foot)}</span></div>`;
  },
};
