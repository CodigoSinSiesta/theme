/* test-replay · vídeo 18 · la misma prueba contra el código viejo y el corregido: con el viejo falla y el fallo se ve; la
   revisión no sustituye a la prueba, la señala. Datos: kicker, title, test = { file, name, call, want }, old / fix = { k, code, got },
   review = { from, to, no, yes }, next. Pasos: 1 prueba y código corregido que pasa, 2 código viejo que falla, 3 revisión y prueba,
   4 «señala», 5 vídeo siguiente. Iconos: beaker (la prueba), check-circle / x-circle (pasa o falla). */
TPL['test-replay'] = {
  def: {
    kicker: 'La prueba nueva', title: 'La que [[habría visto el fallo]]',
    test: { file: 'test/carrito.test.js', name: "test('el envío urgente calcula el umbral sin IVA')", call: 'totalUrgente([{ precio: 35, cantidad: 1 }])', want: '50.3' },
    old: { k: 'código viejo', code: 'envioUrgente(aplicarIVA(totalCupon, tipoIVA))', got: '45.35' },
    fix: { k: 'código corregido', code: 'envioUrgente(totalCupon)', got: '50.3' },
    review: { from: '/review', to: 'la prueba', no: 'sustituye', yes: 'la señala' },
    next: 'vídeo 24',
  },
  html(d, H) {
    const lane = (x, L, lit, i, ok) => `<div class="g${lit ? ' lit' : ''} r" data-i="${i}" style="left:${x}px;top:500px;width:800px;height:270px"><div class="k${lit ? ' cy' : ''}">${H.esc(L.k)}</div>
<div class="mono" style="font-size:24px;margin-top:16px;color:var(--pale)">${H.esc(L.code)}</div></div>`;
    const res = (x, L, i, ok) => `<div class="abs flex r" data-i="${i}" style="left:${x + 34}px;top:660px;gap:22px">${H.GLYPH(ok ? 'check-circle' : 'x-circle', 52, ok ? 'ok' : 'bad')}
<span class="mono ${ok ? 'ok' : 'bad'}" style="font-size:56px;font-weight:700">${H.esc(L.got)}</span><span class="mono" style="font-size:30px;color:var(--pale)">${ok ? '=' : '≠'} ${H.esc(d.test.want)}</span></div>`;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:300px;width:1680px;height:170px">
<div class="flex" style="gap:14px">${H.GLYPH('beaker', 32)}<span class="k">${H.esc(d.test.file)}</span></div>
<div class="mono" style="font-size:26px;margin-top:14px">${H.esc(d.test.name)}</div>
<div class="mono" style="font-size:26px;margin-top:6px"><span style="color:var(--pale)">assert.equal(</span>${H.esc(d.test.call)}<span style="color:var(--pale)">, </span><span class="cy">${H.esc(d.test.want)}</span><span style="color:var(--pale)">)</span></div></div>
${lane(120, d.old, false, 1)}${lane(1000, d.fix, true, 1)}
${res(1000, d.fix, 1, true)}${res(120, d.old, 2, false)}
<div class="abs r" data-i="2" style="left:120px;top:500px;width:800px;height:270px;border:3px solid var(--red);border-radius:22px;box-shadow:0 0 30px rgba(248,113,113,.3)"></div>
<div class="abs r" data-i="3" style="left:420px;top:850px"><span class="chip" style="font-size:30px">${H.esc(d.review.from)}</span></div>
<div class="abs flex r" data-i="3" style="left:1020px;top:850px;gap:14px"><span class="chip" style="font-size:30px;display:flex;align-items:center;gap:12px">${H.GLYPH('beaker', 30)}${H.esc(d.review.to)}</span></div>
<div class="abs s r" data-i="3" style="left:640px;top:930px;width:340px;text-align:center;font-size:26px;text-decoration:line-through;text-decoration-color:var(--red)">${H.esc(d.review.no)}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4"><path class="draw" data-i="4" d="M640 884 H990 M974 874 L990 884 L974 894"/></svg>
<div class="abs s cy r" data-i="4" style="left:640px;top:822px;width:340px;text-align:center;font-size:28px">${H.esc(d.review.yes)}</div>
<div class="abs r" data-i="5" style="left:1520px;top:852px"><span class="pill">${H.esc(d.next)}</span></div>`;
  },
};
