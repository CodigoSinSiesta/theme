/* terminal · sesión de terminal que se escribe línea a línea (una línea por paso).
   Datos: kicker, title, bar (título de la ventana), lines[] = { p?: '$'|'›' prompt, text, kind?: 'out' (gris) | 'res' (resultado ✓ resaltado) | 'cursor' (añade ▍) }.
   Cabe hasta ~7 líneas. */
TPL.terminal = {
  def: {
    kicker: 'Demo', title: 'Un comando, [[en directo]]', bar: '~/proyecto — zsh',
    lines: [
      { p: '$', text: 'hermes chat' },
      { kind: 'out', text: '▸ cargando memoria… 14 recuerdos' },
      { p: '›', text: 'resume los PRs abiertos' },
      { kind: 'res', text: '3 PRs · 1 necesita revisión' },
      { p: '›', kind: 'cursor', text: '' },
    ],
  },
  html(d, H) {
    const dot = '<i class="dot" style="margin:0;width:18px;height:18px;box-shadow:none;opacity:.5"></i>';
    const ls = d.lines.map((l, i) => {
      const k = l.kind || '';
      const st = k === 'out' ? ' style="color:var(--pale3)"' : k === 'res' ? ' style="background:rgba(96,165,250,.16);border-radius:8px;padding:2px 12px;display:inline-block"' : '';
      const pre = k === 'res' ? '<span class="ok">✓</span> ' : l.p ? `<span class="cy">${H.esc(l.p)}</span> ` : '';
      const post = k === 'cursor' ? `${l.text ? ' ' : ''}<span class="cy">▍</span>` : '';
      return `<div class="r" data-i="${i + 1}"${st}>${pre}${H.esc(l.text || '')}${post}</div>`;
    }).join('');
    return `${H.HEAD(d)}
<div class="g" style="left:120px;top:340px;width:1680px;height:600px;padding:0;overflow:hidden">
<div class="flex" style="gap:10px;padding:20px 28px;border-bottom:1px solid var(--line)">${dot}${dot}${dot}<span class="k" style="margin-left:22px">${H.esc(d.bar)}</span></div>
<div class="mono" style="font-size:34px;line-height:1.85;padding:28px 44px">${ls}</div></div>`;
  },
};
