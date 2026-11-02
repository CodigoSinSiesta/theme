/* pinned-update · vídeo 09 · orígenes de pi install, qué queda fijado y a qué llega cada actualización: pi update --extensions
   pone al día los paquetes sin fijar y deja quietos los fijados; pi update a secas actualiza Pi y no toca los paquetes.
   Datos: kicker, title, kInstall, rows[3] = { k, src, pin? (sufijo fijado) }, pinTag, pinNote, ext = { cmd, free, pinned, up, stay },
   bare = { cmd, pi, pkgs }. Pasos: 1–3 una fila de origen cada uno, 4 fijadas, 5 --extensions y el paquete sin fijar,
   6 el fijado se queda, 7 pi update a secas. */
TPL['pinned-update'] = {
  def: {
    kicker: 'Orígenes y versiones', title: 'Lo fijado [[no se mueve]]',
    kInstall: 'pi install ‹origen›',
    rows: [
      { k: 'ruta local', src: './pi-tools' },
      { k: 'npm:', src: 'npm:@ejemplo/pi-tools', pin: '@1.0.0' },
      { k: 'git:', src: 'git:github.com/ejemplo/pi-tools', pin: '@v1' },
    ],
    pinTag: 'fijada', pinNote: 'Una versión en npm, o una etiqueta o un commit en git, [[queda fijada]].',
    ext: { cmd: 'pi update --extensions', free: 'npm:@ejemplo/pi-tools', pinned: 'npm:@ejemplo/pi-tools@1.0.0', up: 'sin fijar: ↑ se pone al día', stay: 'fijada: se queda' },
    bare: { cmd: 'pi update', pi: 'Actualiza Pi', pkgs: 'Tus paquetes, no' },
  },
  html(d, H) {
    const ry = i => 410 + i * 140;
    const code = (r, extra = '') => `<span class="mono" style="font-size:24px;${extra}">${H.esc(r.src)}${r.pin ? `<span class="am">${H.esc(r.pin)}</span>` : ''}</span>`;
    const lock = t => `<span class="pill flex" style="display:inline-flex;gap:8px;padding:8px 20px;font-size:24px;color:var(--amber);border-color:var(--amber)">${H.GLYPH('lock-closed', 26, 'am')}${H.A(t)}</span>`;
    const rows = d.rows.map((r, i) => `<div class="r" data-i="${i + 1}"><div class="abs" style="left:154px;top:${ry(i)}px;width:520px"><div class="k">${H.A(r.k)}</div><div style="margin-top:10px">${code(r)}</div></div></div>`
      + (r.pin ? `<div class="abs r" data-i="4" style="left:720px;top:${ry(i) + 26}px">${lock(d.pinTag)}</div>` : '')).join('');
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:940px;height:660px"><div class="mono cy" style="font-size:26px">${H.esc(d.kInstall)}</div></div>
${rows}
<div class="abs s r" data-i="4" style="left:154px;top:830px;width:872px;font-size:28px">${H.A(d.pinNote)}</div>
<div class="g lit r" data-i="5" style="left:1100px;top:320px;width:700px;height:350px"><div class="mono cy" style="font-size:28px">${H.esc(d.ext.cmd)}</div>
  <div style="margin-top:34px"><div class="mono" style="font-size:24px">${H.esc(d.ext.free)}</div><div class="ok mono" style="font-size:26px;margin-top:10px">${H.A(d.ext.up)}</div></div>
  <div class="r" data-i="6" style="margin-top:24px"><div class="flex" style="gap:18px"><span class="mono" style="font-size:24px">${H.esc(d.ext.pinned)}</span></div><div style="margin-top:10px">${lock(d.ext.stay)}</div></div>
</div>
<div class="g r" data-i="7" style="left:1100px;top:700px;width:700px;height:280px;border-top:6px solid var(--red)"><div class="mono bad" style="font-size:28px">${H.esc(d.bare.cmd)}</div>
  <div class="flex" style="gap:18px;margin-top:30px">${H.ICO('pi', 48)}<span class="s" style="color:var(--ink)">${H.A(d.bare.pi)}</span></div>
  <div class="flex" style="gap:18px;margin-top:22px">${H.GLYPH('cube', 48, 'bad')}<span class="s bad">✕ ${H.A(d.bare.pkgs)}</span></div>
</div>`;
  },
};
