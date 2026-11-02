/* changelog · entradas con etiqueta. Datos: kicker, title, entries[] = { kind: 'new'|'chg'|'del', badge, ver, text (admite `código`), lit? }. Una por paso. 1–4 entradas. */
TPL.changelog = {
  def: {
    kicker: 'Versiones', title: 'Qué cambió [[entre versiones]]',
    entries: [
      { kind: 'new', badge: 'nuevo', ver: 'Pi 1.0', text: 'MCP de serie: `pi mcp add`, `/mcp`' },
      { kind: 'chg', badge: 'cambiado', ver: 'omp 18.8', text: 'Con `--profile`, el worktree va dentro del perfil' },
      { kind: 'del', badge: 'retirado', ver: 'omp 18.11', text: 'Ya no existe `find`: usa `read,grep,glob`', lit: true },
    ],
  },
  html(d, H) {
    return H.HEAD(d) + d.entries.map((e, i) => `<div class="g${e.lit ? ' lit' : ''} r flex" data-i="${i + 1}" style="left:120px;top:${340 + i * 170}px;width:1680px;height:140px;padding:0 40px;gap:36px"><span class="bdg ${H.esc(e.kind)}">${H.esc(e.badge)}</span><span class="mono cy" style="font-size:28px;width:200px">${H.esc(e.ver)}</span><span class="s">${H.A(e.text)}</span></div>`).join('');
  },
};
