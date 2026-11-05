/* report-payload · vídeo 18 · qué viaja con cada queja: lo que dice el diálogo, lo que añade el código, el texto libre y el bloqueo.
   Datos: kicker, title, label, fields[] = { t, src: 'dialog'|'code' } (4–7), srcLabels, free (índice), freeNote, dest, deny.
   Pasos: 1 sobre, campos del diálogo y destino; uno por campo 'code'; luego texto libre; luego bloqueo (aquí 7). */
TPL['report-payload'] = {
  def: {
    kicker: 'Qué viaja con cada queja', title: 'Más de lo que [[dice el diálogo]]',
    label: 'cada queja',
    fields: [{ t: 'herramienta', src: 'dialog' }, { t: 'queja', src: 'dialog' }, { t: 'modelo', src: 'code' }, { t: 'versión', src: 'code' },
      { t: 'sistema', src: 'code' }, { t: 'id de instalación', src: 'code' }],
    srcLabels: { dialog: 'el diálogo', code: 'el código' }, free: 1,
    freeNote: 'Texto libre del modelo: puede citar una ruta o un comando.',
    dest: 'servidor de oh my pi', deny: 'perfil demo · denegado',
  },
  html(d, H) {
    const n = d.fields.length, pitch = n > 6 ? 76 : 86, y = k => 420 + k * pitch;
    let s = 1; const step = d.fields.map(f => f.src === 'code' ? ++s : 1);
    const fr = s + 1, bl = s + 2, bottom = y(n) + 20;
    const rows = d.fields.map((f, k) => { const code = f.src === 'code';
      return `<div class="abs flex${step[k] > 1 ? ' r' : ''}"${step[k] > 1 ? ` data-i="${step[k]}"` : ''} style="left:150px;top:${y(k)}px;width:860px;height:${pitch - 16}px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid ${code ? 'var(--amber)' : 'var(--line)'};padding:0 24px;justify-content:space-between">
<span class="mono" style="font-size:26px">${H.esc(f.t)}</span><span class="k ${code ? 'am' : 'cy'}" style="font-size:22px">${H.esc(code ? d.srcLabels.code : d.srcLabels.dialog)}</span></div>`; }).join('');
    const fy = y(d.free);
    return `${H.HEAD(d)}
<div class="g lit r" data-i="1" style="left:120px;top:330px;width:920px;height:${bottom - 330}px"><div class="flex" style="gap:14px">${H.GLYPH('envelope', 36)}<span class="k">${H.esc(d.label)}</span></div></div>
<div class="r" data-i="1">${rows}</div>
<div class="abs r" data-i="${fr}" style="left:150px;top:${fy}px;width:860px;height:${pitch - 16}px;border-radius:12px;border:3px solid var(--cyan);box-shadow:0 0 26px rgba(96,165,250,.45)"></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="1" d="M1040 476 H1300"/><path class="draw" data-i="${fr}" d="M1010 ${fy + (pitch - 16) / 2} C1150 ${fy + (pitch - 16) / 2} 1150 725 1300 725"/></svg>
<div class="g r" data-i="1" style="left:1300px;top:420px;width:500px;height:112px;display:flex;align-items:center"><div class="flex" style="gap:16px">${H.GLYPH('server', 44)}<span class="s" style="font-size:28px;color:var(--ink)">${H.esc(d.dest)}</span></div></div>
<div class="abs t bad r" data-i="${bl}" style="left:1146px;top:442px;font-size:48px;line-height:60px">✕</div>
<div class="abs r" data-i="${bl}" style="left:1300px;top:560px;width:500px;text-align:center"><span class="pill" style="color:var(--ok);border-color:var(--ok)">${H.esc(d.deny)}</span></div>
<div class="g r" data-i="${fr}" style="left:1300px;top:650px;width:500px;height:150px;border-color:var(--cyan)"><span class="s" style="font-size:26px">${H.esc(d.freeNote)}</span></div>`;
  },
};
