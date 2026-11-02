/* pattern-capture · vídeo 17 · un patrón de ast_grep con un hueco ($X) y las líneas que casan, con lo que atrapa el
   hueco resaltado. Datos: kicker, title, label, pattern = { pre, hole, post }, rows[] = { line, pre, x, post, s } (2–4; s = paso
   en que entra, 2…), note, off, on (pastillas arriba a la derecha). Pasos: 1 patrón, filas según s, luego nota, aviso de fábrica y perfil (tres últimos). */
TPL['pattern-capture'] = {
  def: {
    kicker: 'ast_grep · por estructura', title: 'Un patrón [[con huecos]]',
    label: 'patrón', pattern: { pre: 'Math.round(', hole: '$X', post: ' * 100) / 100' },
    rows: [
      { line: 32, pre: 'Math.round(', x: 'total', post: ' * 100) / 100', s: 2 },
      { line: 9, pre: 'Math.round(', x: 'importe * (1 + tipo / 100)', post: ' * 100) / 100', s: 2 },
      { line: 43, pre: 'Math.round(', x: '(aplicarIVA(totalCupon, tipoIVA) + envio)', post: ' * 100) / 100', s: 3 },
    ],
    note: 'espacios y saltos de línea: dan igual', off: 'apagada de fábrica', on: 'activada en el perfil demo',
  },
  html(d, H) {
    const n = d.rows.length, last = Math.max(...d.rows.map(r => r.s)), y = k => 536 + k * 116;
    const P = d.pattern;
    const rows = d.rows.map((r, k) => `<div class="g r flex" data-i="${r.s}" style="left:120px;top:${y(k)}px;width:1680px;height:84px;padding:0 30px;gap:30px;border-radius:14px">
<span class="k" style="width:110px">L${+r.line}</span><span class="mono" style="font-size:30px;white-space:nowrap">${H.esc(r.pre)}<span class="chip" style="display:inline;padding:6px 10px;font:inherit;border:2px solid var(--cyan);border-radius:8px;background:rgba(96,165,250,.22);color:var(--ink)">${H.esc(r.x)}</span>${H.esc(r.post)}</span></div>`).join('\n');
    const yb = y(n) + 16;
    return `${H.HEAD(d)}
<div class="g lit r" data-i="1" style="left:120px;top:330px;width:1680px;height:160px;padding:26px 40px"><div class="k">${H.esc(d.label)}</div>
<div class="mono" style="font-size:54px;margin-top:14px;white-space:nowrap">${H.esc(P.pre)}<span class="chip cy" style="display:inline;padding:8px 14px;font:inherit;color:var(--cyan);border:3px dashed var(--cyan);border-radius:12px;background:none">${H.esc(P.hole)}</span>${H.esc(P.post)}</div></div>
${rows}
<div class="abs r" data-i="${last + 1}" style="left:120px;top:${yb}px"><span class="chip">${H.esc(d.note)}</span></div>
<div class="abs" style="left:1300px;top:346px;width:480px;display:flex;flex-direction:column;align-items:flex-end;gap:12px"><span class="pill r" data-i="${last + 2}" style="color:var(--amber);border-color:var(--amber);background:rgba(15,23,42,.6)">${H.esc(d.off)}</span><span class="pill r" data-i="${last + 3}" style="color:var(--ok);border-color:var(--ok);background:rgba(15,23,42,.6)">${H.esc(d.on)}</span></div>`;
  },
};
