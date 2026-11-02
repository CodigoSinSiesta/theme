/* lap-context · vídeo 15 · qué le pasa al contexto entre vuelta y vuelta de un bucle, según el modo: crece, se compacta o se vacía.
   Datos: kicker, title, laps[] (rótulos de columna, 2–4), rows[] = { name, sub, cells[] (una por vuelta: cadena de 'm' vuelta y 's' resumen),
   tag? = { text, tone: 'am'|'ok', step } }, legend = { m, s }. Pasos: una fila por paso (1…n) y luego los tag en su `step`. */
TPL['lap-context'] = {
  def: {
    kicker: 'loop.mode', title: 'Entre vuelta y vuelta, [[el contexto]]',
    laps: ['vuelta 1', 'vuelta 2', 'vuelta 3'],
    rows: [
      { name: 'prompt', sub: 'de fábrica · el contexto crece', cells: ['m', 'mm', 'mmm'], tag: { text: 'basta', tone: 'ok', step: 5 } },
      { name: 'compact', sub: 'compacta antes · gasta modelo', cells: ['m', 'sm', 'sm'] },
      { name: 'reset', sub: 'de cero, como una sesión nueva', cells: ['m', 'm', 'm'], tag: { text: 'no en vibe', tone: 'am', step: 4 } },
    ],
    legend: { m: 'una vuelta', s: 'resumen' },
  },
  html(d, H) {
    const L = d.laps.length, c0 = 640, cw = Math.round(1160 / L), U = Math.min(110, Math.floor((cw - 40) / 3)), S = Math.round(U * 0.45);
    const y = r => 400 + r * 170, rh = 140;
    const seg = (ch, x, i, top) => `<i class="bx" data-i="${i}" style="position:absolute;left:${x}px;top:${top}px;width:${(ch === 's' ? S : U) - 6}px;height:56px;border-radius:10px;background:${ch === 's' ? 'rgba(251,191,36,.45)' : 'rgba(96,165,250,.45)'};border:1.5px solid ${ch === 's' ? 'var(--amber)' : 'var(--cyan)'}"></i>`;
    const cells = (r, k) => d.rows[r].cells.map((s, j) => { let x = c0 + j * cw + 20; return [...s].map(ch => { const o = seg(ch, x, k, y(r) + 42); x += ch === 's' ? S : U; return o; }).join(''); }).join('');
    const tag = t => t ? `<span class="pill r" data-i="${t.step}" style="margin-left:18px;font-size:22px;padding:8px 18px;color:var(--${t.tone === 'ok' ? 'ok' : 'amber'});border-color:var(--${t.tone === 'ok' ? 'ok' : 'amber'})">${H.A(t.text)}</span>` : '';
    const rows = d.rows.map((r, k) => `<div class="g r" data-i="${k + 1}" style="left:120px;top:${y(k)}px;width:1680px;height:${rh}px;padding:24px 34px"><div class="flex"><span class="mono cy" style="font-size:40px;font-weight:700">${H.esc(r.name)}</span>${tag(r.tag)}</div><div class="s" style="font-size:24px;margin-top:8px">${H.A(r.sub)}</div></div>`
      + (r.tag && r.tag.tone === 'ok' ? `<div class="abs r" data-i="${r.tag.step}" style="left:120px;top:${y(k)}px;width:1680px;height:${rh}px;border-radius:22px;border:2px solid var(--cyan);box-shadow:0 0 40px rgba(96,165,250,.35)"></div>` : '')).join('\n');
    const heads = d.laps.map((t, j) => `<div class="abs k" style="left:${c0 + j * cw + 20}px;top:350px">${H.esc(t)}</div>`).join('');
    const cols = d.laps.slice(1).map((_, j) => `<div class="abs" style="left:${c0 + (j + 1) * cw}px;top:390px;width:1.5px;height:${y(d.rows.length) - 410}px;background:var(--line)"></div>`).join('');
    const ly = y(d.rows.length) + 10;
    return `${H.HEAD(d)}
${rows}
<div class="r" data-i="1">${heads}${cols}</div>
${d.rows.map((_, k) => cells(k, k + 1)).join('\n')}
<div class="abs flex r" data-i="1" style="left:120px;top:${ly}px;gap:14px"><i style="display:block;width:44px;height:26px;border-radius:6px;background:rgba(96,165,250,.45);border:1.5px solid var(--cyan)"></i><span class="s" style="font-size:24px">${H.esc(d.legend.m)}</span></div>
<div class="abs flex r" data-i="2" style="left:420px;top:${ly}px;gap:14px"><i style="display:block;width:26px;height:26px;border-radius:6px;background:rgba(251,191,36,.45);border:1.5px solid var(--amber)"></i><span class="s" style="font-size:24px">${H.esc(d.legend.s)}</span></div>`;
  },
};
