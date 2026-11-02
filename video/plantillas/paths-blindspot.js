/* paths-blindspot · vídeo 20 · una edición de varios ficheros llega con una lista de rutas y sin ruta suelta; la
   comprobación que solo lee la ruta suelta ve una cadena vacía y deja pasar el fichero protegido. Datos: kicker, title,
   call = { k, tool, files[] (2–3) }, input = { k, key, missing }, check = { k, code, result }, verdict = { text, note }.
   Pasos: 1 la llamada, 2 lo que entrega oh my pi, 3 la comprobación y el veredicto. */
TPL['paths-blindspot'] = {
  def: {
    kicker: 'Límite 2', title: 'Una lista de rutas, [[no una ruta]]',
    call: { k: 'una sola llamada', tool: 'edit', files: ['src/envio.js', 'AGENTS.md'] },
    input: { k: 'lo que entrega oh my pi', key: 'paths', missing: 'path' },
    check: { k: 'permisos.ts · vídeo 08', code: 'event.input.path ?? ""', result: 'ruta = ""' },
    verdict: { text: 'AGENTS.md pasa sin que la protección lo vea', note: 'la ruta vacía no coincide con AGENTS.md ni con .git/' },
  },
  html(d, H) {
    const C = d.call, I = d.input, K = d.check, V = d.verdict, n = C.files.length;
    const files = C.files.map(f => `<div class="flex" style="gap:14px;margin-top:16px">${H.GLYPH('document-text', 32)}<span class="mono" style="font-size:26px">${H.esc(f)}</span></div>`).join('');
    const list = C.files.map((f, i) => `<div style="white-space:pre">    "${H.esc(f)}"${i < n - 1 ? ',' : ''}</div>`).join('');
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<line class="draw" data-i="2" x1="560" y1="480" x2="620" y2="480"/><line class="draw" data-i="3" x1="1180" y1="480" x2="1240" y2="480"/>
<path class="draw" data-i="3" d="M1520 640 V700" stroke="#f87171"/></svg>
<div class="g r" data-i="1" style="left:120px;top:340px;width:440px;height:300px"><div class="k">${H.A(C.k)}</div><div class="mono t cy" style="font-size:40px;margin-top:14px">${H.esc(C.tool)}</div>${files}</div>
<div class="g r" data-i="2" style="left:620px;top:340px;width:560px;height:300px"><div class="k">${H.A(I.k)}</div>
<div class="mono" style="font-size:26px;margin-top:18px;line-height:1.55;color:var(--pale)"><div style="white-space:pre">{ <span class="cy">${H.esc(I.key)}</span>: [</div>${list}<div style="white-space:pre">  ] }</div></div>
<div class="flex" style="gap:12px;margin-top:10px">${H.GLYPH('x-circle', 30, 'bad')}<span class="mono bad" style="font-size:24px">sin ${H.esc(I.missing)}</span></div></div>
<div class="g r" data-i="3" style="left:1240px;top:340px;width:560px;height:300px"><div class="k">${H.A(K.k)}</div><div class="s" style="font-size:26px;margin-top:16px">solo mira una</div>
<div class="mono" style="font-size:26px;margin-top:14px;white-space:pre">${H.esc(K.code)}</div><div class="mono am" style="font-size:30px;margin-top:20px;white-space:pre">${H.esc(K.result)}</div></div>
<div class="g r" data-i="3" style="left:120px;top:700px;width:1680px;height:176px;border-color:var(--red)"><div class="flex" style="gap:18px">${H.GLYPH('exclamation-triangle', 44, 'bad')}<span class="t" style="font-size:38px">${H.A(V.text)}</span></div>
<div class="s" style="font-size:28px;margin-top:20px;padding-left:62px">${H.A(V.note)}</div></div>`;
  },
};
