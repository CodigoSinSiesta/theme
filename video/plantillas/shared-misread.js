/* shared-misread · vídeo 24 · una regla mal entendida da a la vez el código y la prueba: coinciden, la prueba pasa y
   «hecho» se cumple, pero lo que querías era otra cosa. Datos: kicker, title, belief = { k, t }, code = { k, t }, test = { k, t },
   match, run = { cmd, res }, done = { k, t }, want = { k, t, no }. Textos cortos (una línea). Pasos: 1 lo que cree, 2 código,
   3 prueba, 4 coinciden, 5 la prueba pasa, 6 hecho se cumple, 7 lo que querías (≠). */
TPL['shared-misread'] = {
  def: {
    kicker: 'El hueco', title: 'Código y prueba, [[el mismo error]]',
    belief: { k: 'El agente cree', t: 'El envío, sobre el subtotal' },
    code: { k: 'Código · con el error', t: 'envío sobre el subtotal' },
    test: { k: 'Prueba · el mismo error', t: 'envío sobre el subtotal' },
    match: 'coinciden',
    run: { cmd: 'npm test', res: 'pasa' },
    done: { k: 'Definición de hecho', t: 'se cumple' },
    want: { k: 'Lo que tú querías', t: 'El envío, sobre el total con cupón', no: 'Las pruebas no lo comprueban' },
  },
  html(d, H) {
    const box = (x, y, w, h, i, k, t, extra = '', cls = 'g') => `<div class="${cls} r" data-i="${i}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;${extra}"><div class="k">${H.A(k)}</div><div class="s" style="font-size:30px;color:var(--ink);margin-top:14px">${H.A(t)}</div></div>`;
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="2" d="M540 470 C590 470 590 405 640 405"/>
<path class="draw" data-i="3" d="M540 510 C590 510 590 595 640 595"/>
<path class="draw" data-i="4" d="M1100 405 H1140 V595 H1100"/>
<path class="draw" data-i="5" d="M1140 500 H1160"/>
<path class="draw" data-i="5" d="M1384 500 C1404 500 1400 405 1420 405"/>
<path class="draw" data-i="6" d="M1610 480 V520"/>
<path class="draw" data-i="7" d="M340 760 V600" stroke="#f87171" stroke-dasharray="10 10"/></svg>
${box(120, 380, 420, 220, 1, d.belief.k, d.belief.t, 'border-top:6px solid var(--amber)')}
${box(640, 330, 460, 150, 2, d.code.k, d.code.t)}
${box(640, 520, 460, 150, 3, d.test.k, d.test.t)}
<div class="abs r" data-i="4" style="left:1160px;top:474px"><span class="chip">= ${H.esc(d.match)}</span></div>
<div class="g lit r" data-i="5" style="left:1420px;top:330px;width:380px;height:150px;display:flex;align-items:center;gap:18px">${H.GLYPH('check-circle', 48, 'ok')}<div><div class="mono" style="font-size:30px">${H.esc(d.run.cmd)}</div><div class="k ok" style="margin-top:8px">${H.A(d.run.res)}</div></div></div>
<div class="g r" data-i="6" style="left:1420px;top:520px;width:380px;height:150px"><div class="s" style="font-size:28px;color:var(--ink)">${H.A(d.done.k)}</div><div class="k ok" style="margin-top:14px">${H.A(d.done.t)}</div></div>
<div class="abs t bad r" data-i="7" style="left:364px;top:646px;font-size:52px;line-height:60px">≠</div>
<div class="g r" data-i="7" style="left:120px;top:760px;width:1680px;height:170px;border-color:var(--red);display:flex;align-items:center;justify-content:space-between">
<div><div class="k bad">${H.A(d.want.k)}</div><div class="s" style="font-size:34px;color:var(--ink);margin-top:14px">${H.A(d.want.t)}</div></div>
<div class="flex" style="gap:16px">${H.GLYPH('x-circle', 44, 'bad')}<span class="s bad" style="font-size:30px">${H.A(d.want.no)}</span></div></div>`;
  },
};
