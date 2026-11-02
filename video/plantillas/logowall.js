/* logowall · cuadrícula de logos (4 columnas) que entran uno a uno; `lit` ilumina el que se nombra.
   Datos: kicker, title, items[] = { logo, name, lit? } (logo = nombre de H.LOGOS). De 1 a 12 fichas (3 filas). */
TPL.logowall = {
  def: {
    kicker: 'Ecosistema', title: 'Las herramientas [[de las que hablamos]]',
    items: [
      { logo: 'pi', name: 'Pi' }, { logo: 'hermes', name: 'Hermes', lit: true }, { logo: 'claude', name: 'Claude' },
      { logo: 'claude-code', name: 'Claude Code' }, { logo: 'codex', name: 'Codex' }, { logo: 'opencode', name: 'OpenCode' },
      { logo: 'gemini-cli', name: 'Gemini CLI' }, { logo: 'mcp', name: 'MCP' },
    ],
  },
  html(d, H) {
    const cols = Math.min(4, d.items.length), rows = Math.ceil(d.items.length / 4), h = Math.min(270, Math.floor((680 - 34 * (rows - 1)) / rows));
    const W = cols === 4 ? 1680 : cols * 400 + 34 * (cols - 1);   // con menos de 4 logos, fichas de 400 px centradas
    const tiles = d.items.map((it, i) => `<div class="g${it.lit ? ' lit' : ''} tile r" data-i="${i + 1}" style="height:${h}px">${H.ICO(it.logo, 96)}<div class="t" style="font-size:38px">${H.esc(it.name)}</div></div>`).join('');
    return `${H.HEAD(d)}
<div class="abs" style="left:${120 + (1680 - W) / 2}px;top:340px;width:${W}px;display:grid;grid-template-columns:repeat(${cols},1fr);gap:34px">${tiles}</div>`;
  },
};
