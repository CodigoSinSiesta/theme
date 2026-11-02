/* startup-wait · vídeo 07 · quién espera a quién al arrancar: los servidores conectan en segundo plano y el primer mensaje
   solo espera a los que tienen herramientas en direct; después, los límites de cada petición. Datos: kicker, title, start,
   lanes = { direct, other, msg } = { glyph, t }, ready, wait, sent, why, per, cards[3] = { glyph, big, num?, unit?, t }.
   Fijo: tres carriles y tres tarjetas. Pasos: 1 conexión de fondo, 2 el mensaje espera, 3 solo a los direct, 4–6 una tarjeta cada uno. */
TPL['startup-wait'] = {
  def: {
    kicker: 'Cómo conecta Pi', title: 'Conecta de fondo, [[espera poco]]',
    start: 'empieza la sesión',
    lanes: { direct: { glyph: 'server-stack', t: 'en direct' }, other: { glyph: 'server-stack', t: 'en codemode' }, msg: { glyph: 'chat-bubble-left', t: 'primer mensaje' } },
    ready: 'listo', wait: 'espera ≤ 10 s', sent: 'sale', why: 'Las herramientas en direct van declaradas en esa petición',
    per: 'en cada petición',
    cards: [
      { glyph: 'clock', big: '', num: 60, unit: ' s', t: 'límite por petición' },
      { glyph: 'arrow-path', big: '2 reintentos', t: 'errores pasajeros de red' },
      { glyph: 'x-circle', big: 'Se reconecta', t: 'si se cae, en la siguiente llamada' },
    ],
  },
  html(d, H) {
    const ly = [330, 448, 566], LH = 104, x0 = 480, xR = 900, xO = 1400;
    const mid = i => ly[i] + LH / 2;
    const label = (i, L) => `<div class="g flex" style="left:120px;top:${ly[i]}px;width:320px;height:${LH}px;padding:0 26px;gap:14px">${H.GLYPH(L.glyph, 34)}<span class="s" style="color:var(--ink)">${H.esc(L.t)}</span></div>`;
    const strip = i => `<div class="abs" style="left:460px;top:${ly[i]}px;width:1340px;height:${LH}px;border-radius:18px;background:rgba(30,58,138,.12);border:1.5px solid rgba(96,165,250,.14)"></div>`;
    const bar = (i, x1, col) => `<i class="abs bx" style="left:${x0}px;top:${mid(i) - 14}px;width:${x1 - x0}px;height:28px;border-radius:10px;background:${col}"></i>`;
    const ok = (i, x) => `<div class="abs flex" style="left:${x + 16}px;top:${mid(i) - 26}px;height:52px;gap:10px">${H.GLYPH('check-circle', 30, 'ok')}<span class="mono ok" style="font-size:26px">${H.esc(d.ready)}</span></div>`;
    const card = (c, i) => `<div class="g r" data-i="${i + 4}" style="left:${120 + i * 573}px;top:780px;width:534px;height:196px;padding:28px 34px">
<div class="flex" style="gap:16px">${H.GLYPH(c.glyph, 44, c.glyph === 'x-circle' ? 'bad' : 'cy')}<span class="t">${c.num != null ? `<span data-c="${c.num}">${c.num}</span>${H.esc(c.unit || '')}` : H.esc(c.big)}</span></div>
<div class="s" style="margin-top:14px">${H.A(c.t)}</div></div>`;
    return `${H.HEAD(d)}
${[0, 1, 2].map(strip).join('')}
${label(0, d.lanes.direct)}${label(1, d.lanes.other)}${label(2, d.lanes.msg)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path d="M${x0 - 10} 320 L${x0 - 10} 680" stroke-dasharray="6 8" opacity=".6"/>
<path class="draw" data-i="3" d="M${xR} ${ly[0] + 8} L${xR} ${ly[2] + LH - 8}" stroke="#fbbf24" stroke-dasharray="10 8"/></svg>
<div class="abs k" style="left:${x0 - 10}px;top:690px">${H.esc(d.start)}</div>
<div class="r" data-i="1">${bar(0, xR, 'rgba(96,165,250,.55)')}${bar(1, xO, 'rgba(96,165,250,.55)')}${ok(0, xR)}${ok(1, xO)}</div>
<div class="r" data-i="2"><i class="abs bx" style="left:${x0}px;top:${ly[2] + 20}px;width:${xR - x0}px;height:28px;border-radius:10px;background:rgba(251,191,36,.5)"></i>
<div class="abs mono am" style="left:${x0}px;top:${ly[2] + 58}px;font-size:24px">${H.esc(d.wait)}</div>
<div class="abs flex" style="left:${xR + 16}px;top:${mid(2) - 26}px;height:52px;gap:10px">${H.GLYPH('paper-airplane', 30)}<span class="mono cy" style="font-size:26px">${H.esc(d.sent)}</span></div></div>
<div class="abs s r" data-i="3" style="left:${xR + 140}px;top:${mid(2) - 22}px;width:${1780 - xR - 140}px;font-size:26px;color:var(--amber)">${H.A(d.why)}</div>
<div class="abs k r" data-i="4" style="left:120px;top:738px">${H.esc(d.per)}</div>
${d.cards.map(card).join('')}`;
  },
};
