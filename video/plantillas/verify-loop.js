/* verify-loop · 3–5 etapas en fila unidas por flechas + camino de retorno en ángulos rectos + aviso arriba.
   Datos: kicker, title, stages[] = { t, sub?, w, gap (hueco previo, def. 100), lit?, ok? (verde) }, loop = { from, to, label }
   (índices de etapa; el trazo sale por debajo de `from` y vuelve a `to`), warn (admite **negrita**). Suma de anchos y huecos ≤ 1680. */
TPL['verify-loop'] = {
  def: { kicker: 'Verificar', title: 'No basta con [[que lo diga]]',
    stages: [
      { t: 'Implementar', w: 340 }, { t: 'Verificar', sub: 'tests reales', w: 340, gap: 100, lit: true },
      { t: '¿Pasa?', w: 280, gap: 100 }, { t: 'Entregar', w: 400, gap: 120, ok: true },
    ],
    loop: { from: 2, to: 0, label: 'no → arreglar y repetir' },
    warn: 'Si el agente puede ver el test, puede optimizar **el test** en vez del problema.' },
  html(d, H) {
    let x = 120; const S = d.stages.map((s, i) => { if (i) x += s.gap == null ? 100 : s.gap; const o = { ...s, x }; x += s.w; return o; });
    const n = S.length;
    const lines = S.slice(1).map((s, i) => { const p = S[i]; return `<line class="draw" data-i="${i + 2}" x1="${p.x + p.w}" y1="590" x2="${s.x}" y2="590"${s.ok ? ' stroke="#34d399"' : ''}/>`; }).join('');
    const a = S[d.loop.from], b = S[d.loop.to], xa = a.x + a.w / 2, xb = b.x + b.w / 2;
    const warn = H.esc(d.warn).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4">${lines}
<path class="draw" data-i="${n + 1}" d="M${xa} 680 V830 H${xb} V680" stroke="#f87171"/></svg>
${S.map((s, i) => `<div class="g${s.lit ? ' lit' : ''} r" data-i="${i + 1}" style="left:${s.x}px;top:510px;width:${s.w}px;height:160px;text-align:center;padding:${s.sub ? 36 : 50}px 10px${s.ok ? ';border-color:var(--ok)' : ''}"><span class="t${s.ok ? ' ok' : ''}" style="font-size:36px">${H.A(s.t)}</span>${s.sub ? `<div class="k" style="margin-top:6px">${H.A(s.sub)}</div>` : ''}</div>`).join('\n')}
<div class="abs mono bad r" data-i="${n + 1}" style="left:${Math.min(xa, xb) + 270}px;top:850px;font-size:28px">${H.A(d.loop.label)}</div>
<div class="g r" data-i="${n + 2}" style="left:120px;top:340px;width:1680px;height:110px;padding:0 36px;display:flex;align-items:center;gap:24px;border-color:var(--amber)"><span class="am t">⚠</span><span class="s" style="font-size:28px">${warn}</span></div>`;
  },
};
