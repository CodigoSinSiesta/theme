/* anchored-edit · vídeo 17 · edición anclada (hashline): la edición cita la etiqueta de la última lectura y números
   de línea; si el fichero cambió, la etiqueta no coincide y no se aplica a ciegas. Datos: kicker, title, file, tag, newTag,
   lines[] (números, 5–8), range = [desde, hasta], op, oldText, refuse, note. Pasos: 1 sin texto viejo, 2 etiqueta, 3 líneas, 4 fichero cambiado, 5 no aplica, 6 nota. */
TPL['anchored-edit'] = {
  def: {
    kicker: 'Edición anclada', title: 'Edita por etiqueta [[y número de línea]]',
    file: 'fichero', tag: '#A', newTag: '#B', lines: [10, 11, 12, 13, 14, 15, 16], range: [12, 14], op: 'PUT 12-14',
    oldText: 'copiar el texto viejo', refuse: 'no aplica a ciegas',
    note: 'Solo lo recupera si puede [[demostrar]] que el resultado es seguro.',
  },
  html(d, H) {
    const n = d.lines.length, pitch = n > 7 ? 46 : 52, y0 = 470, ys = k => y0 + k * pitch;
    const inR = v => v >= d.range[0] && v <= d.range[1];
    const widths = [86, 64, 78, 52, 90, 70, 60, 82];
    const rows = (x, changed) => d.lines.map((v, k) => `<div class="abs mono" style="left:${x}px;top:${ys(k)}px;width:60px;text-align:right;font-size:24px;line-height:${pitch - 14}px;color:var(--pale3)">${+v}</div>`
      + `<i class="abs" style="left:${x + 84}px;top:${ys(k) + 8}px;height:${pitch - 30}px;width:${Math.round(widths[k % 8] * 3.6)}px;border-radius:7px;background:${changed && k === 3 ? 'rgba(251,191,36,.55)' : 'rgba(96,165,250,.32)'}"></i>`).join('');
    const hi = d.lines.map((v, k) => inR(v) ? k : -1).filter(k => k >= 0);
    const hiBox = hi.length ? `<div class="abs r" data-i="3" style="left:132px;top:${ys(hi[0]) - 6}px;width:556px;height:${hi.length * pitch - 2}px;border:2.5px solid var(--cyan);border-radius:12px;box-shadow:0 0 26px rgba(96,165,250,.45)"></div>` : '';
    const note = H.esc(d.note).replace(/\[\[(.+?)\]\]/g, '<span class="cy">$1</span>');
    const bottom = ys(n) + 10;
    return `${H.HEAD(d)}
<div class="g" style="left:120px;top:330px;width:580px;height:${bottom - 330}px"><div class="k">última lectura</div></div>
<div class="abs flex" style="left:154px;top:392px;gap:16px"><span class="mono" style="font-size:28px">${H.esc(d.file)}</span><span class="chip" style="color:var(--cyan);border-color:var(--cyan)">${H.esc(d.tag)}</span></div>
${rows(140, false)}${hiBox}
<div class="g r" data-i="4" style="left:1220px;top:330px;width:580px;height:${bottom - 330}px;border-color:var(--amber)"><div class="k am">el fichero ahora</div></div>
<div class="abs flex r" data-i="4" style="left:1254px;top:392px;gap:16px"><span class="mono" style="font-size:28px">${H.esc(d.file)}</span><span class="chip" style="color:var(--amber);border-color:var(--amber)">${H.esc(d.newTag)}</span></div>
<div class="r" data-i="4">${rows(1240, true)}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="2" d="M700 420 C740 420 740 520 770 520"/><path class="draw" data-i="4" d="M1150 600 C1190 600 1190 420 1220 420" stroke="#fbbf24"/></svg>
<div class="abs r" data-i="1" style="left:740px;top:340px;width:440px;text-align:center"><span class="chip" style="white-space:nowrap;text-decoration:line-through;text-decoration-color:var(--red);color:var(--pale3)">${H.esc(d.oldText)}</span></div>
<div class="g lit r" data-i="2" style="left:770px;top:440px;width:380px;height:240px;padding:24px 28px"><div class="k">la edición</div>
<div class="mono cy" style="font-size:40px;font-weight:700;margin-top:22px">${H.esc(d.tag)}</div>
<div class="mono r" data-i="3" style="font-size:34px;margin-top:18px">${H.esc(d.op)}</div></div>
<div class="abs r" data-i="4" style="left:740px;top:712px;width:440px;text-align:center"><span class="mono" style="font-size:40px;font-weight:700"><span class="cy">${H.esc(d.tag)}</span> <span class="bad">≠</span> <span class="am">${H.esc(d.newTag)}</span></span></div>
<div class="abs r" data-i="5" style="left:740px;top:790px;width:440px;text-align:center"><span class="pill" style="white-space:nowrap;color:var(--red);border-color:var(--red)">✕ ${H.esc(d.refuse)}</span></div>
<div class="g lit r" data-i="6" style="left:120px;top:${bottom + 40}px;width:1680px;height:96px;padding:0 34px;display:flex;align-items:center"><span class="s" style="font-size:30px;color:var(--ink)">${note}</span></div>`;
  },
};
