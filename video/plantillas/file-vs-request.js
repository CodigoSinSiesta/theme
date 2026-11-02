/* file-vs-request · vídeo 12 · el fichero guarda todas las ramas; la petición solo lleva el camino de la raíz a la hoja.
   Datos: kicker, title, file, request, trunk (entrada común), other[] (2, la rama que se queda), cur[] (2, la actual; la última es la hoja),
   leaf, tag, stop, note. Pasos: 1 fichero, 2 camino y petición, 3 etiqueta de la otra rama, 4 corte «no viaja», 5 nota. */
TPL['file-vs-request'] = {
  def: {
    kicker: 'Vídeo 03, otra vez', title: 'En el fichero, [[no en la petición]]',
    file: 'en el fichero · .jsonl', request: 'lo que ve el modelo',
    trunk: 'T1 · envio.js', other: ['T2 · gratis desde 50 €', 'T3 · +3 € urgente'], cur: ['T2 · 2,95 €', '¿la diferencia?'],
    leaf: 'hoja', tag: '[umbral-50] · a un Enter', stop: 'la rama de 50 € no viaja',
    note: 'Para que una rama sepa de la otra: [[cuéntaselo]], o pide el resumen al saltar.',
  },
  html(d, H) {
    const box = (x, y, w, t, extra = '') => `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:72px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);display:flex;align-items:center;padding:0 26px;font:500 26px/1.15 var(--body);white-space:nowrap;${extra}">${H.A(t)}</div>`;
    const lit = 'border:2px solid var(--cyan);box-shadow:0 0 24px rgba(96,165,250,.4)';
    const ring = (x, y, w) => `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:72px;border-radius:12px;${lit}"></div>`;
    const yO = 410, yT = 556, yC = 702;           // filas: otra rama, tronco, rama actual
    const req = [d.trunk, ...d.cur];
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:1010px;height:520px"><div class="k">${H.A(d.file)}</div></div>
<div class="g lit r" data-i="2" style="left:1250px;top:320px;width:550px;height:520px"><div class="k cy">${H.A(d.request)}</div></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="1" d="M400 ${yT + 36} C430 ${yT + 36} 420 ${yO + 36} 450 ${yO + 36}"/><path class="draw" data-i="1" d="M760 ${yO + 36} H800"/>
<path class="draw" data-i="1" d="M400 ${yT + 36} C430 ${yT + 36} 420 ${yC + 36} 450 ${yC + 36}"/><path class="draw" data-i="1" d="M760 ${yC + 36} H800"/>
<path class="draw" data-i="2" stroke-width="4" d="M1110 ${yC + 36} C1180 ${yC + 36} 1180 ${yC + 36} 1250 ${yC + 36}"/>
<path class="draw" data-i="4" stroke="#f87171" stroke-width="4" d="M1110 ${yO + 36} H1180"/></svg>
<div class="r" data-i="1">${box(140, yT, 260, d.trunk)}${box(450, yO, 310, d.other[0])}${box(800, yO, 310, d.other[1])}${box(450, yC, 310, d.cur[0])}${box(800, yC, 310, d.cur[1])}</div>
<div class="r" data-i="2">${ring(140, yT, 260)}${ring(450, yC, 310)}${ring(800, yC, 310)}
<div class="abs k cy" style="left:800px;top:${yC + 86}px">↑ ${H.A(d.leaf)}</div></div>
${req.map((t, i) => `<div class="r" data-i="2">${box(1290, 400 + i * 88, 470, t, 'border-color:var(--cyan)')}</div>`).join('')}
<div class="abs mono am r" data-i="3" style="left:800px;top:${yO + 88}px;font-size:24px">${H.A(d.tag)}</div>
<div class="abs t bad r" data-i="4" style="left:1186px;top:${yO + 6}px;font-size:48px;line-height:60px">✕</div>
<div class="abs k bad r" data-i="4" style="left:1290px;top:${400 + req.length * 88 + 12}px">✕ ${H.A(d.stop)}</div>
<div class="g lit r" data-i="5" style="left:120px;top:878px;width:1680px;height:96px;padding:0 34px;display:flex;align-items:center"><span class="s" style="font-size:30px;color:var(--ink)">${H.A(d.note)}</span></div>`;
  },
};
