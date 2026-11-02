/* profile-inherit · vídeo 11 · qué cruza del perfil por defecto a un perfil con nombre: todo es propio salvo un fichero.
   Datos: kicker, title, from = { label, path }, to = { label, path }, files[] (3–5, los propios), shared (el que se hereda), own, via,
   keys[] (2–4 atajos), keysNote. Pasos: 1 perfil por defecto y el fichero compartido, 2 perfil con nombre y sus ficheros propios,
   3 el fichero que cruza, 4 el teclado. */
TPL['profile-inherit'] = {
  def: {
    kicker: 'keybindings.yml', title: 'Lo único que [[hereda]] un perfil',
    from: { label: 'perfil por defecto', path: '~/.omp/agent/' },
    to: { label: 'perfil demo', path: '~/.omp/profiles/demo/agent/' },
    files: ['config.yml', 'agent.db', 'sessions/', 'cache/'], shared: 'keybindings.yml',
    own: 'propio', via: 'heredado',
    keys: ['Ctrl+P', 'Alt+M', 'Shift+Tab'], keysNote: 'Tu teclado no cambia de un perfil a otro.',
  },
  html(d, H) {
    const n = d.files.length, pitch = n > 4 ? 78 : 86, rh = pitch - 12, y = i => 450 + i * pitch, ys = y(n);
    const xL = 120, xR = 1060, W = 740;
    const row = (x, i, f, extra = '') => `<div class="abs flex" style="left:${x + 30}px;top:${y(i)}px;width:${W - 60}px;height:${rh}px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);padding:0 24px;gap:16px${extra}">${H.GLYPH(f.endsWith('/') ? 'folder' : 'document-text', 30)}<span class="mono" style="font-size:28px">${H.esc(f)}</span></div>`;
    const left = d.files.map((f, i) => row(xL, i, f)).join('');
    const right = d.files.map((f, i) => row(xR, i, f)).join('');
    const tags = d.files.map((f, i) => `<div class="abs" style="left:${xR + W - 210}px;top:${y(i) + (rh - 40) / 2}px;width:150px;text-align:right"><span class="bdg new">${H.esc(d.own)}</span></div>`).join('');
    const h = ys + rh + 30 - 320, ym = ys + rh / 2;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:${xL}px;top:320px;width:${W}px;height:${h}px"><div class="k">${H.esc(d.from.label)}</div><div class="mono" style="font-size:28px;margin-top:12px;color:var(--pale)">${H.esc(d.from.path)}</div></div>
<div class="r" data-i="1">${left}</div>
<div class="abs flex r" data-i="1" style="left:${xL + 30}px;top:${ys}px;width:${W - 60}px;height:${rh}px;border-radius:12px;background:rgba(30,58,138,.38);border:2px solid var(--cyan);box-shadow:0 0 30px rgba(96,165,250,.4);padding:0 24px;gap:16px">${H.GLYPH('document-text', 30)}<span class="mono" style="font-size:28px">${H.esc(d.shared)}</span></div>
<div class="g r" data-i="2" style="left:${xR}px;top:320px;width:${W}px;height:${h}px"><div class="k">${H.esc(d.to.label)}</div><div class="mono" style="font-size:28px;margin-top:12px;color:var(--pale)">${H.esc(d.to.path)}</div></div>
<div class="r" data-i="2">${right}${tags}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="3" d="M${xL + W - 30} ${ym} L${xR + 30} ${ym}"/><path class="draw" data-i="3" d="M${xR + 16} ${ym - 12} L${xR + 30} ${ym} L${xR + 16} ${ym + 12}"/></svg>
<div class="abs flex r" data-i="3" style="left:${xR + 30}px;top:${ys}px;width:${W - 60}px;height:${rh}px;border-radius:12px;border:2px dashed var(--cyan);padding:0 24px;gap:16px">${H.GLYPH('document-text', 30)}<span class="mono" style="font-size:28px">${H.esc(d.shared)}</span><span class="k cy" style="margin-left:auto">${H.esc(d.via)}</span></div>
<div class="abs flex r" data-i="4" style="left:120px;top:${ys + rh + 40}px;width:1680px;justify-content:center;gap:22px">${d.keys.map(k => `<span class="kc" style="font-size:28px;padding:16px 26px;border-bottom-width:6px">${H.esc(k)}</span>`).join('')}<span class="s" style="margin-left:18px">${H.A(d.keysNote)}</span></div>`;
  },
};
