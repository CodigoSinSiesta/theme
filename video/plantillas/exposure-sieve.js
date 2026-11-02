/* exposure-sieve · vídeo 07 · un servidor con todas sus herramientas; las marcadas hidden se quedan y al modelo solo le llegan las demás.
   Datos: kicker, title, server = { label }, tools[] = { t, hidden? } (6–14, en dos columnas), hiddenTag, model = { label }, badge.
   Pasos: 1 servidor con sus herramientas, 2 lo que ve el modelo, 3 distintivo final. */
TPL['exposure-sieve'] = {
  def: {
    kicker: 'tool exposure · hidden', title: 'Catorce herramientas, [[solo lectura]]',
    server: { label: 'tienda-fs · 14 herramientas' },
    tools: [
      { t: 'read_file' }, { t: 'read_text_file' }, { t: 'read_media_file' }, { t: 'read_multiple_files' },
      { t: 'write_file', hidden: true }, { t: 'edit_file', hidden: true }, { t: 'create_directory', hidden: true },
      { t: 'list_directory' }, { t: 'list_directory_with_sizes' }, { t: 'directory_tree' }, { t: 'move_file', hidden: true },
      { t: 'search_files' }, { t: 'get_file_info' }, { t: 'list_allowed_directories' },
    ],
    hiddenTag: 'hidden',
    model: { label: 'el modelo puede usar' }, badge: 'solo lectura',
  },
  html(d, H) {
    const T = d.tools, rows = Math.ceil(T.length / 2), pitch = Math.min(72, 470 / rows);
    const chip = (t, k) => {
      const x = 160 + (k % 2) * 430, y = 420 + Math.floor(k / 2) * pitch;
      return t.hidden
        ? `<div class="abs" style="left:${x}px;top:${y}px"><span class="chip" style="font-size:22px;border-color:var(--red);color:var(--pale3);background:rgba(127,29,29,.25)"><span style="text-decoration:line-through;text-decoration-color:var(--red)">${H.esc(t.t)}</span> <span class="bad">${H.esc(d.hiddenTag)}</span></span></div>`
        : `<div class="abs" style="left:${x}px;top:${y}px"><span class="chip" style="font-size:22px">${H.esc(t.t)}</span></div>`;
    };
    const vis = T.filter(t => !t.hidden), lh = Math.min(40, 400 / vis.length);
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:330px;width:900px;height:620px;padding:28px 40px"><div class="flex" style="gap:16px">${H.GLYPH('server-stack', 40)}<span class="k">${H.A(d.server.label)}</span></div></div>
<div class="r" data-i="1">${T.map(chip).join('')}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3"><path class="draw" data-i="2" d="M1022 640 H1236"/><path class="draw" data-i="2" d="M1216 626 L1236 640 L1216 654"/></svg>
<div class="g lit r" data-i="2" style="left:1240px;top:330px;width:560px;height:620px;padding:28px 40px"><div class="flex" style="gap:16px">${H.GLYPH('cpu-chip', 40)}<span class="k">${H.A(d.model.label)}</span></div>
<div style="margin-top:22px">${vis.map(t => `<div class="mono" style="font-size:24px;line-height:${lh}px;color:var(--ink)">${H.esc(t.t)}</div>`).join('')}</div></div>
<div class="abs r" data-i="3" style="left:1280px;top:${420 + vis.length * lh + 22}px"><span class="pill ok" style="border-color:var(--ok)">✓ ${H.A(d.badge)}</span></div>`;
  },
};
