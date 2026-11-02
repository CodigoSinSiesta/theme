/* rebuild-turns · vídeo 23 · el coste de reconstrucción como tira de turnos: los que gasta una sesión nueva antes de su
   primera edición, con su coste, el tropiezo que se repite y, debajo, lo que serían sin andamiaje: una conversación contigo.
   Datos: kicker, title, lane, turns (2–5), edit, tokens, cost, slip = { at (índice), t }, retry, plain = { k, t }.
   Pasos: 1 turnos y primera edición, 2 tokens, 3 coste, 4 tropiezo, 5 lo repite, 6 sin andamiaje. */
TPL['rebuild-turns'] = {
  def: {
    kicker: 'Coste de reconstrucción', title: 'Cuatro turnos [[antes de editar]]',
    lane: 'sesión nueva · oh my pi · DeepSeek V4 Pro', turns: 4, edit: 'primera edición',
    tokens: '≈ 48 000 tokens', cost: '≈ 0,3 céntimos',
    slip: { at: 0, t: 'bash: un parámetro que no tocaba' }, retry: 'lo repite',
    plain: { k: 'sin andamiaje', t: 'una conversación contigo' },
  },
  html(d, H) {
    const n = d.turns, gap = 24, W = Math.floor((1310 - gap * (n - 1)) / n), x = i => 120 + i * (W + gap), END = x(n - 1) + W;
    const bars = (i, step) => [80, 56].map((w, j) => `<i class="bx" data-i="${step}" style="position:absolute;left:${x(i) + 30}px;top:${452 + j * 24}px;width:${Math.round((W - 60) * w / 100)}px;height:12px;border-radius:6px;background:rgba(96,165,250,.35)"></i>`).join('');
    const turns = Array.from({ length: n }, (_, i) => `<div class="g r" data-i="1" style="left:${x(i)}px;top:380px;width:${W}px;height:170px;padding:24px 30px"><div class="k">turno ${i + 1}</div></div>${i === d.slip.at ? '' : bars(i, 1)}`).join('');
    const s = d.slip.at, r = Math.min(n - 1, s + 1);
    const bub = (i, right) => `<div class="abs flex" style="left:${x(i) + (right ? 70 : 24)}px;top:${right ? 870 : 800}px;width:${W - 94}px;height:56px;border-radius:16px;border:1.5px solid var(--line);background:rgba(15,23,42,.6);padding:0 18px;gap:12px">${right ? '' : H.GLYPH('user', 28)}<i style="display:block;flex:1;height:10px;border-radius:5px;background:rgba(147,197,253,.35)"></i></div>`;
    return `${H.HEAD(d)}
<div class="abs k cy" style="left:120px;top:330px">${H.esc(d.lane)}</div>
${turns}
<div class="g lit r flex" data-i="1" style="left:${END + 40}px;top:380px;width:${1800 - END - 40}px;height:170px;flex-direction:column;justify-content:center;gap:12px;padding:0 24px">${H.GLYPH('pencil-square', 48)}<span class="k cy" style="text-align:center">${H.esc(d.edit)}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="2" d="M122 574 V590 H${END - 2} V574"/><line class="draw" data-i="2" x1="${(120 + END) / 2}" y1="590" x2="${(120 + END) / 2}" y2="604"/></svg>
<div class="abs flex" style="left:120px;top:614px;width:${END - 120}px;justify-content:center;gap:60px"><span class="mono r" data-i="2" style="font-size:34px;color:var(--ink)">${H.esc(d.tokens)}</span><span class="mono r am" data-i="3" style="font-size:34px">${H.esc(d.cost)}</span></div>
<div class="abs r" data-i="4" style="left:${x(s)}px;top:380px;width:${W}px;height:170px;border-radius:22px;border:3px solid var(--red);background:rgba(248,113,113,.10)"></div>
<div class="abs r flex" data-i="4" style="left:${x(s) + 30}px;top:436px;width:${W - 60}px;gap:12px;align-items:flex-start"><span style="flex:none">${H.GLYPH('x-circle', 32, 'bad')}</span><span class="s bad" style="font-size:24px;line-height:1.25">${H.esc(d.slip.t)}</span></div>
<div class="abs r flex" data-i="5" style="left:${x(r) + 30}px;top:496px;gap:10px">${H.GLYPH('arrow-path', 30, 'am')}<span class="s am" style="font-size:24px">${H.esc(d.retry)}</span></div>
<div class="r" data-i="6"><div class="abs" style="left:120px;top:740px;width:1680px;height:220px;border-radius:22px;border:2px dashed var(--line);background:rgba(15,23,42,.35)"></div>
<div class="abs k" style="left:150px;top:756px">${H.esc(d.plain.k)}</div>
${Array.from({ length: n }, (_, i) => bub(i, false) + bub(i, true)).join('')}
<div class="abs t" style="left:${END + 40}px;top:810px;width:${1770 - END - 40}px;font-size:34px;line-height:1.2">${H.A(d.plain.t)}</div></div>`;
  },
};
