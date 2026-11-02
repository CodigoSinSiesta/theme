/* swiss-cheese · vídeo 26 · capas en fila, cada una con su hueco: un defecto las cruza hasta que una lo encuentra.
   Datos: kicker, title, bug, layers[] = { name, note, tone: 'ok'|'bad'|'am'|'', i (paso en que entra), stop? (la que lo
   encuentra), glyph? } (4–6, en el orden real; los pasos pueden ir en otro orden), pair[2] (índices de las dos que apuntan al
   mismo hueco), pairLabel, pairStep. El trazo del defecto se dibuja en el paso de la capa stop. */
TPL['swiss-cheese'] = {
  def: {
    kicker: 'Más de una mirada · el cupón sin valor', title: 'Ningún revisor [[es la puerta]]',
    bug: '{ importe: undefined }',
    layers: [
      { name: 'rúbrica', note: 'no lo pedía', tone: 'am', i: 2 },
      { name: 'plan · Pro', note: 'lo vio · fuera de alcance', tone: 'am', i: 6, glyph: 'eye' },
      { name: 'verificar.sh', note: 'en verde', tone: '', i: 3 },
      { name: 'revisor · Pro', note: 'no lo vio', tone: 'bad', i: 1 },
      { name: 'prueba oculta', note: 'no lo mira', tone: '', i: 4 },
      { name: 'CI · Pi', note: 'lo encuentra', tone: 'ok', i: 5, stop: true, glyph: 'magnifying-glass' },
    ],
    pair: [1, 5], pairLabel: 'dos miradas, el mismo hueco', pairStep: 6,
  },
  html(d, H) {
    const L = d.layers, n = L.length, pitch = Math.min(256, Math.floor(1420 / Math.max(1, n - 1))), cx = k => 380 + k * pitch;
    const Y0 = 420, Y1 = 760, HY = 590, HG = 34, W = 120;
    const stopK = Math.max(0, L.findIndex(l => l.stop)), xEnd = cx(stopK) - W / 2 - 4, stopI = (L[stopK] || {}).i || n;
    const part = (k, top, h, ring) => `<div class="abs" style="left:${cx(k) - W / 2}px;top:${top}px;width:${W}px;height:${h}px;border-radius:18px;background:${ring ? 'rgba(30,58,138,.45)' : 'var(--glass)'};border:2px solid ${ring ? 'var(--ok)' : 'var(--line)'}"></div>`;
    const slices = L.map((l, k) => `<div class="r" data-i="${l.i}">${l.stop ? part(k, Y0, Y1 - Y0, true) : part(k, Y0, HY - HG - Y0, false) + part(k, HY + HG, Y1 - HY - HG, false)}
<div class="abs" style="left:${cx(k) - 118}px;top:${Y1 + 28}px;width:236px;text-align:center"><div class="mono" style="font-size:24px;color:var(--ink)">${H.esc(l.name)}</div><div class="s ${l.tone || ''}" style="font-size:24px;margin-top:6px;line-height:1.3">${l.glyph ? H.GLYPH(l.glyph, 26, l.tone || 'cy') + ' ' : ''}${H.A(l.note)}</div></div></div>`).join('');
    const ring = k => `<div class="abs r" data-i="${d.pairStep}" style="left:${cx(k) - W / 2 - 14}px;top:${Y0 - 14}px;width:${W + 28}px;height:${Y1 - Y0 + 28}px;border-radius:26px;border:3px solid var(--cyan);box-shadow:0 0 36px rgba(96,165,250,.5)"></div>`;
    return `${H.HEAD(d)}
<div class="abs r" data-i="1" style="left:120px;top:330px"><span class="chip" style="border-color:var(--red);color:#fecaca;font-size:26px">${H.esc(d.bug)}</span></div>
${slices}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#f87171" stroke-width="4">
<path class="draw" data-i="${stopI}" d="M200 396 C200 520 230 ${HY} 290 ${HY} H${xEnd}"/><path class="draw" data-i="${stopI}" d="M${xEnd - 16} ${HY - 13} L${xEnd} ${HY} L${xEnd - 16} ${HY + 13}"/></svg>
${(d.pair || []).map(ring).join('')}
<div class="abs r" data-i="${d.pairStep}" style="left:1100px;top:330px;width:700px;text-align:right"><span class="pill" style="display:inline-block;color:var(--cyan);border-color:var(--cyan)">${H.esc(d.pairLabel)}</span></div>`;
  },
};
