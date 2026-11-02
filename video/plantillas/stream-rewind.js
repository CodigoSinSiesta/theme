/* stream-rewind · vídeo 19 · una regla vigila el stream: al aparecer el patrón corta antes de ejecutar, descarta lo
   escrito, inyecta el cuerpo de la regla y el modelo lo intenta otra vez. Datos: kicker, title, watch = { label, pattern, hit },
   first = { label, text, tool = { label, code, hit } }, cut, stop, discarded, notice = { label, text }, retry = { label, tool = { label, code } },
   run, rewind. Pasos: 1 intento, 2 argumentos, 3 patrón, 4 corte, 5 descarte, 6 aviso, 7 reintento, 8 vuelta atrás. */
TPL['stream-rewind'] = {
  def: {
    kicker: 'Time traveling stream rules', title: 'Corta, descarta [[y vuelve a empezar]]',
    watch: { label: 'condition', pattern: '\\.toFixed\\s*\\(', hit: 'encaja' },
    first: { label: 'intento 1', text: 'respuesta',
      tool: { label: 'edit · src/envio.js', code: "importe.toFixed(2).replace('.', ',')", hit: '.toFixed(' } },
    cut: 'corta', stop: 'no se ejecuta', discarded: 'descartado',
    notice: { label: 'aviso del sistema', text: 'Muestra con Intl.NumberFormat.' },
    retry: { label: 'intento 2', tool: { label: 'edit · src/envio.js', code: "Intl.NumberFormat('es-ES', …)" } },
    run: 'se ejecuta', rewind: 'vuelve a antes del error',
  },
  html(d, H) {
    const box = (x, y, w, h, extra = '') => `left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:14px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);padding:24px 26px;${extra}`;
    const code = d.first.tool.code, k = code.indexOf(d.first.tool.hit);
    const pre = k < 0 ? code : code.slice(0, k), hit = k < 0 ? '' : d.first.tool.hit, post = k < 0 ? '' : code.slice(k + hit.length);
    const mark = hit ? `<span style="position:relative">${H.esc(hit)}<i class="r" data-i="3" style="position:absolute;left:-3px;right:-3px;top:-2px;bottom:-2px;border-radius:6px;background:rgba(248,113,113,.2);box-shadow:0 0 0 2px var(--red)"></i></span>` : '';
    const bars = [86, 64].map((w, j) => `<i class="bx" data-i="1" style="display:block;height:14px;border-radius:6px;background:rgba(96,165,250,.35);margin-top:${j ? 12 : 18}px;width:${w}%"></i>`).join('');
    const tile = (x, y, w, glyph, tone, text, i, extra = '') => `<div class="abs r flex" data-i="${i}" style="${box(x, y, w, 136, 'gap:20px;' + extra)}">${H.GLYPH(glyph, 44, tone)}<div><div class="k">edit</div><div class="s ${tone}" style="font-size:26px;margin-top:4px">${H.esc(text)}</div></div></div>`;
    return `${H.HEAD(d)}
<div class="g flex" style="left:1160px;top:300px;width:640px;height:76px;padding:0 28px;gap:22px"><span class="k">${H.esc(d.watch.label)}</span><span class="mono cy" style="font-size:26px">${H.esc(d.watch.pattern)}</span></div>
<div class="abs r flex" data-i="3" style="left:1160px;top:300px;width:640px;height:76px;padding:0 28px;justify-content:flex-end;border-radius:22px;border:3px solid var(--red);box-shadow:0 0 30px rgba(248,113,113,.45)"><span class="k bad">✕ ${H.esc(d.watch.hit)}</span></div>
<div class="g r" data-i="1" style="left:120px;top:396px;width:1680px;height:220px"></div>
<div class="abs k r" data-i="1" style="left:1480px;top:412px;width:290px;text-align:right">${H.esc(d.first.label)}</div>
<div class="abs r" data-i="1" data-off="5" style="${box(150, 456, 380, 136)}"><div class="k">${H.esc(d.first.text)}</div>${bars}</div>
<div class="abs r" data-i="2" data-off="5" style="${box(560, 456, 680, 136)}"><div class="k">${H.esc(d.first.tool.label)}</div><div class="mono" style="font-size:26px;margin-top:18px;white-space:pre;color:var(--pale)">${H.esc(pre)}${mark}${H.esc(post)}</div></div>
<div class="abs r flex" data-i="5" style="left:150px;top:456px;width:1090px;height:136px;border-radius:14px;border:2px dashed var(--red);justify-content:center;gap:28px"><span class="pill" style="color:var(--red);border-color:var(--red)">✕ ${H.esc(d.discarded)}</span><span class="mono" style="font-size:26px;white-space:pre;color:var(--pale3);text-decoration:line-through;text-decoration-color:var(--red)">${H.esc(code)}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<line class="draw" data-i="4" x1="1270" y1="410" x2="1270" y2="606" stroke="#f87171" stroke-width="4"/></svg>
<div class="abs k bad r" data-i="4" style="left:1120px;top:412px;width:132px;text-align:right">${H.esc(d.cut)}</div>
${tile(1300, 456, 470, 'x-circle', 'bad', d.stop, 4, 'border:2px dashed var(--line)')}
<div class="g r" data-i="6" style="left:120px;top:690px;width:1680px;height:220px"></div>
<div class="abs k r" data-i="6" style="left:1480px;top:706px;width:290px;text-align:right">${H.esc(d.retry.label)}</div>
<div class="abs r" data-i="6" style="${box(150, 750, 620, 136, 'border:2px solid var(--amber)')}"><div class="flex" style="gap:12px">${H.GLYPH('exclamation-triangle', 28, 'am')}<span class="k am">${H.esc(d.notice.label)}</span></div><div class="s" style="font-size:26px;margin-top:14px;color:var(--ink)">${H.A(d.notice.text)}</div></div>
<div class="abs r" data-i="7" style="${box(800, 750, 600, 136, 'border-color:var(--ok)')}"><div class="k">${H.esc(d.retry.tool.label)}</div><div class="mono ok" style="font-size:26px;margin-top:18px;white-space:pre">${H.esc(d.retry.tool.code)}</div></div>
${tile(1430, 750, 340, 'check-circle', 'ok', d.run, 7)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="8" d="M1270 608 V620 C1270 646 1246 653 1210 653 H236 C206 653 190 668 190 690 V742"/>
<path class="draw" data-i="8" d="M176 726 L190 744 L204 726"/></svg>
<div class="abs r" data-i="8" style="left:520px;top:625px;width:440px;text-align:center"><span class="pill" style="background:rgba(15,23,42,.95);color:var(--cyan);border-color:var(--cyan)">${H.esc(d.rewind)}</span></div>`;
  },
};
